<?php

namespace ProcessMaker\Http\Controllers;

use Illuminate\Http\Request;
use Mustache_Engine;
use ProcessMaker\Managers\AIManager;

class ScreenMakerController extends Controller
{
    private $monacoLanguage = [
        'md' => 'Markdown',
        'json' => 'JSON',
        'js' => 'JavaScript',
    ];

    // Page to create a new screen
    public function create($model)
    {
        $definitionsPath = resource_path('ai/'.$model.'/definitions.json');
        $path = resource_path('ai/'.$model);
        $definitions = json_decode(file_get_contents($definitionsPath), true);
        $context = file_get_contents($path . '/' . $definitions['context']);
        $examples = file_get_contents($path . '/' . $definitions['examples']);
        $template = file_get_contents($path . '/' . $definitions['template']);
        $contextLang = $this->languageByExtension($definitions['context']);
        $examplesLang = $this->languageByExtension($definitions['examples']);
        $templateLang = $this->languageByExtension($definitions['template']);
        $variables = $this->getMustacheVariables($template);
        $test = [];
        foreach ($variables as $variable) {
            $test[$variable] = '';
        }

        return view('ai-maker.create', compact(
            'context', 'examples', 'template',
            'contextLang', 'examplesLang', 'templateLang',
            'variables', 'test', 'model',
        ));
    }

    public function test($model)
    {
        $definitionsPath = resource_path('ai/'.$model.'/definitions.json');
        $path = resource_path('ai/'.$model);
        $definitions = json_decode(file_get_contents($definitionsPath), true);
        $context = file_get_contents($path . '/' . $definitions['context']);
        $examples = file_get_contents($path . '/' . $definitions['examples']);
        $template = file_get_contents($path . '/' . $definitions['template']);
        $post = request()->all();
        $ai = new AIManager($context, $examples, $template);
        $result = $ai->generate($post);
        $processor = require(resource_path('ai/'.$model.'/processor.php'));
        $screenChoices = [];
        foreach ($result['choices'] as $choice) {
            $screenPackage = $processor($choice['text'], $post);
            $screenChoices[] = [
                'screenPackage' => $screenPackage,
                'text' => $choice['text'],
            ];
            foreach($screenPackage->screens as $screen) {
                $this->storeScreen($screen);
            }
        }
        return [
            'choices' => $screenChoices,
        ];
    }

    // Temporally store the screen in Cache by id
    private function storeScreen($screen)
    {
        $id = "ai-screen-" . $screen->id;
        cache([$id => $screen], 60 * 60);
        return $id;
    }

    public function resource_get($model, $id)
    {
        if ($model === 'screen') {
            $id = 'ai-screen-' . $id;
            $screen = cache($id);
            return $screen;
        }
    }

    private function languageByExtension($filename)
    {
        $ext = pathinfo($filename, PATHINFO_EXTENSION);

        return $this->monacoLanguage[$ext];
    }

    private function getMustacheVariables($template)
    {
        $variables = [];
        $matches = [];
        preg_match_all('/{{(.*?)}}/', $template, $matches);
        foreach ($matches[1] as $match) {
            $variables[] = trim($match);
        }
        return $variables;
    }
}
