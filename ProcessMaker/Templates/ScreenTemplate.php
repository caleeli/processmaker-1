<?php

namespace ProcessMaker\Templates;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use ProcessMaker\Http\Controllers\Api\ExportController;
use ProcessMaker\ImportExport\Exporter;
use ProcessMaker\ImportExport\Exporters\ScreenExporter;
use ProcessMaker\ImportExport\Importer;
use ProcessMaker\ImportExport\Options;
use ProcessMaker\Models\Screen;
use ProcessMaker\Models\ScreenCategory;
use ProcessMaker\Models\ScreenTemplates;
use ProcessMaker\Models\Template;
use ProcessMaker\Traits\HasControllerAddons;
use ProcessMaker\Traits\HideSystemResources;
use SebastianBergmann\CodeUnit\Exception;
use Tests\Feature\ImportExport\HelperTrait;

/**
 * Summary of ScreenTemplate
 */
class ScreenTemplate implements TemplateInterface
{
    use HasControllerAddons;
    use HideSystemResources;

    const PROJECT_ASSET_MODEL_CLASS = 'ProcessMaker\Package\Projects\Models\ProjectAsset';

    /**
     * List process templates
     *
     * @param Request $request The request object.
     *
     * @return array An array containing the list of screen templates.
     */
    public function index(Request $request)
    {
        $orderBy = $this->getRequestSortBy($request, 'name');
        $include = $this->getRequestInclude($request);
        $screenType = (string) $request->input('screen_type');
        $isPublic = (int) $request->input('is_public', false);
        $templates = ScreenTemplates::nonSystem()->with($include)
            ->where('is_public', $isPublic);
        $pmql = $request->input('pmql', '');
        $filter = $request->input('filter');

        if (!empty($screenType)) {
            $templates->where('screen_type', $screenType);
        }

        if (!empty($pmql)) {
            try {
                $templates->pmql($pmql);
            } catch (\ProcessMaker\Query\SyntaxError $e) {
                return response(['error' => 'PMQL error'], 400);
            }
        }

        $templates = $templates->select('screen_templates.*')
            ->leftJoin('screen_categories as category', 'screen_templates.screen_category_id', '=', 'category.id')
            ->leftJoin('users as user', 'screen_templates.user_id', '=', 'user.id')
            ->orderBy(...$orderBy)
            ->where(function ($query) use ($filter) {
                $query->where('screen_templates.name', 'like', '%' . $filter . '%')
                    ->orWhere('screen_templates.description', 'like', '%' . $filter . '%')
                    ->orWhere('user.firstname', 'like', '%' . $filter . '%')
                    ->orWhere('user.lastname', 'like', '%' . $filter . '%')
                    ->orWhereIn('screen_templates.id', function ($qry) use ($filter) {
                        $qry->select('assignable_id')
                            ->from('category_assignments')
                            ->leftJoin('screen_categories', function ($join) {
                                $join->on('screen_categories.id', '=', 'category_assignments.category_id');
                                $join->where('category_assignments.category_type', '=', ScreenCategory::class);
                                $join->where('category_assignments.assignable_type', '=', ScreenTemplates::class);
                            })
                            ->where('screen_categories.name', 'like', '%' . $filter . '%');
                    });
            })->paginate($request->input('per_page', 10));

        return $templates;
    }

    /**
     * Show screen template in screen builder
     *
     * @param mixed $request Request object
     * @return array Returns an array with the screen ID
     */
    public function show($request) : array
    {
        $template = ScreenTemplates::find($request->id);
        $screen = Screen::where('uuid', $template->editing_process_uuid)->where('is_template', 1)->first();

        if ($screen) {
            return ['id' => $screen->id];
        }
        // Otherwise we need to import the template and create a new screen
        $payload = json_decode($template->manifest, true);
        $options = new Options([]);
        $importer = new Importer($payload, $options);
        $importer->doImport();

        $screen = Screen::where('uuid', $importer->payload['root'])->first();
        ScreenTemplates::where('id', $template->id)->update(['editing_screen_uuid' => $screen->uuid]);

        // Return an array with the process ID
        return ['id' => $screen->id];
    }

    /**
     * Save new screen template
     * @param mixed $request The HTTP request containing the template data
     * @return JsonResponse The JSON response with the saved template model
     */
    public function save($request) : JsonResponse
    {
        $data = $request->all();

        $screen = Screen::select('custom_css')->where('id', $data['asset_id'])->first();
        $screenCustomCss = $screen['custom_css'];

        // Get the screen manifest
        $manifest = $this->getManifest('screen', $data['asset_id']);
        if (array_key_exists('error', $manifest)) {
            return response()->json($manifest, 400);
        }

        // Create a new screen template
        $screenTemplate = $this->createScreenTemplate($data, $manifest, $screenCustomCss);

        // Save thumbnails
        $this->saveThumbnails($screenTemplate, $data['thumbnails']);

        return response()->json(['model' => $screenTemplate]);
    }

    /**
     * Create a screen from the selected screen template
     *
     * @param mixed $request The HTTP request data
     * @return JsonResponse The JSON response containing the new screen ID
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException if the screen template is not found
     */
    // public function create($request) : JsonResponse
    // {
    //     // TODO: Implement creating a screen from a selected screen template
    // }

    /**
     *  Publish a Screen Template to display in the Public Templates tab
     * @param mixed $request
     * @return JsonResponse
     */
    public function publishTemplate($request) : JsonResponse
    {
        $id = (int) $request->id;
        $template = ScreenTemplates::where('id', $id)->firstOrFail();
        $template->is_public = true;
        $template->saveOrFail();

        return response()->json();
    }

    /**
     *  Update process template configurations
     * @param Request
     * @return JsonResponse
     */
    public function updateTemplateConfigs($request) : JsonResponse
    {
        $id = (int) $request->id;
        $template = ScreenTemplates::where('id', $id)->firstOrFail();
        $template->fill($request->except('id'));
        $template->user_id = Auth::user()->id;

        try {
            $template->saveOrFail();

            return response()->json();
        } catch (\Exception $e) {
            return response([
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Update the manifest of a screen template.
     *
     * @param  int  $screenId  The ID of the screen
     * @param  Illuminate\Http\Request  $request  The HTTP request containing the updated template data
     * @return JsonResponse  The JSON response indicating the success of the update
     */
    public function updateTemplateManifest(int $screenId, $request)  : JsonResponse
    {
        $data = $request->all();

        // Get the screen manifest
        $manifest = $this->getManifest('screen', $screenId);
        if (array_key_exists('error', $manifest)) {
            return response()->json($manifest, 400);
        }

        // Update the screen template manifest
        $this->updateScreenTemplateData($data, $manifest);

        // Save screen template thumbnails
        $this->saveThumbnails($data['name'], $data['thumbnails']);

        return response()->json();
    }

    /**
     * Displays Template Configurations
     *
     * @param int $id ID of the process template
     * @return array An array containing the template object, addons, and categories
     * @throws Illuminate\Database\Eloquent\ModelNotFoundException If no template is found with the given ID
     */
    public function configure(int $id) : array
    {
        // TODO: Implement showing selected screen template configurations
    }

    /**
     *  Delete process template
     * @param mixed $request
     * @return bool
     */
    public function destroy(int $id) : bool
    {
        return ScreenTemplates::where('id', $id)->delete();
    }

    /**
     * Check if an existing process template with the same name exists.
     * If exists, return an array with the existing template ID and name.
     * Otherwise, return null.
     * @param Request $request
     *
     * @return array|null Array containing the existing template ID and name or null if no existing template found
     */
    public function existingTemplate($request) : ?array
    {
        $templateId = $request->id;
        $name = $request->name;

        $template = ScreenTemplates::where(['name' => $name])->where('id', '!=', $templateId)->first();
        if ($template !== null) {
            // If same asset has been Saved as Template previously,
            // offer to choose between “Update Template” and “Save as New Template”
            return ['id' => $template->id, 'name' => $name];
        }

        return null;
    }

    /**
     * Get process template manifest.
     *
     * @param string $type
     * @param Request $request
     * @return array
     */
    public function getManifest(string $type, int $id) : array
    {
        $response = (new ExportController)->manifest($type, $id);

        return json_decode($response->getContent(), true);
    }

    /**
     * Get included relationships.
     *
     * @param Request $request
     * @return array
     */
    protected function getRequestSortBy(Request $request, $default) : array
    {
        $column = $request->input('order_by', $default);
        $direction = $request->input('order_direction', 'asc');

        return [$column, $direction];
    }

    /**
     * Get included relationships.
     *
     * @param Request $request
     * @return array
     */
    protected function getRequestInclude(Request $request) : array
    {
        $include = $request->input('include');

        return $include ? explode(',', $include) : [];
    }

    /**
     * Create a new screen template.
     *
     * @param  array  $data  The data for creating the screen template
     * @param  array  $payload  The payload for the screen template
     * @return \App\Models\ScreenTemplates  The created screen template
     */
    protected function createScreenTemplate(array $data, array $payload, $customCss) : ScreenTemplates
    {
        $screenTemplate = ScreenTemplates::make($data)->fill([
            'manifest' => json_encode($payload),
            'user_id' => auth()->id(),
            'screen_type' => $data['screenType'],
            'screen_custom_css' => $customCss,
            'media_collection' => '',
            'is_public' =>  $data['is_public'] ? 1 : 0,
        ]);
        $screenTemplate->saveOrFail();
        $screenTemplate->media_collection = 'st-' . $screenTemplate->uuid . '-media';
        $screenTemplate->saveOrFail();

        return $screenTemplate;
    }

    private function updateScreenTemplateData(array $data, array $payload)
    {
        ScreenTemplates::where('name', $data['name'])->update([
            'description' => $data['description'],
            'is_public' => $data['make_public'] ? 1 : 0,
            'screen_category_id' => $data['screen_category_id'],
            'manifest' => json_encode($payload),
            'user_id' => auth()->id(),
        ]);
    }

    protected function saveThumbnails($screenTemplate, string $thumbnails)
    {
        $screenTemplate = $this->resolveScreenTemplate($screenTemplate);

        $thumbnails = json_decode($thumbnails, true);

        foreach ($thumbnails as $thumbnail) {
            $screenTemplate
                ->addMediaFromBase64($thumbnail['url'])
                ->toMediaCollection($screenTemplate->media_collection);
        }

        $screenTemplate->saveOrFail();
    }

    /**
     * Resolve the screen template from the given input.
     *
     * @param  mixed  $screenTemplate  The screen template name or model
     * @return \App\Models\ScreenTemplates  The resolved screen template model
     */
    protected function resolveScreenTemplate($screenTemplate): ScreenTemplates
    {
        if ($screenTemplate instanceof ScreenTemplates) {
            return $screenTemplate;
        }

        return ScreenTemplates::where('name', $screenTemplate)->firstOrFail();
    }
}
