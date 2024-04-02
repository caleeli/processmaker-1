<?php

namespace ProcessMaker\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use ProcessMaker\Http\Controllers\Controller;
use ProcessMaker\Http\Resources\ApiResource;
use ProcessMaker\Models\Embed;
use ProcessMaker\Models\Media;
use ProcessMaker\Models\Process;
use ProcessMaker\Models\ProcessLaunchpad;

class ProcessLaunchpadController extends Controller
{
    public function index(Request $request, Process $process)
    {
        // Get the processes launchpad configuration
        // Get the images related
        // Get the embed related
        $processes = Process::with('launchpad')
            ->with('media')
            ->with('embed')
            ->where('id', $process->id)
            ->get()
            ->collect();

        return new ApiResource($processes);
    }

    public function store(Request $request, Process $process)
    {
        $launch = new ProcessLaunchpad();
        $properties = $request->input('launchpad_properties');
        try {
            // Store the launchpad configuration
            $newLaunch = $launch->updateOrCreate([
                'process_id' => $process->id,
            ], [
                'user_id' => Auth::user()->id,
                'launchpad_properties' => $properties,
            ]);
            $launch->newId = $newLaunch->id;
            // If there are configure the carousel
            if ($request->has('imagesCarousel')) {
                $this->saveContentCarousel($request, $process);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

        return new ApiResource($launch->refresh());
    }

    public function destroy(ProcessLaunchpad $launch)
    {
        // Delete launchpad configuration
        $launch->delete();

        return response([], 204);
    }

   /**
    * Store the elements related to the carousel [IMAGE, EMBED URL]
    */
    public function saveContentCarousel(Request $request, Process $process)
    {
        $contentCarousel = $request->input('imagesCarousel');
        if (!empty($contentCarousel)) {
            foreach ($contentCarousel as $row) {
                $content = !empty($row['url']) ? $row['url'] : '';
                switch ($content) {
                    case 'image':
                        // Store the images related into the Media table
                        $media = new Media();
                        $media->saveProcessMedia($process, $row, 'uuid');
                        break;
                    case 'embed':
                        // Store the embed related into the Embed table
                        $embed = new Embed();
                        $embed->saveProcessEmbed($process, $row, 'uuid');
                        break;
                    default:
                        // Nothing
                        break;
                }

            }
        }
    }
}
