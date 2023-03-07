<?php

namespace ProcessMaker\Managers;

use Illuminate\Support\Facades\Auth;
use Mustache_Engine;
use ProcessMaker\Models\ProcessRequest;
use ProcessMaker\Models\ProcessRequestToken;
use ProcessMaker\Nayra\Contracts\Bpmn\ActivityInterface;

class AIManager
{
    private $context;

    private $examples;

    private $template;

    public function __construct($context, $examples, $template)
    {
        $this->context = $context;
        $this->examples = $examples;
        $this->template = $template;
    }

    public function generate($variables)
    {
        $context = $this->context;
        $examples = $this->examples;
        $template = $this->template;
        list($template, $stop) = explode("\n<COMPLETE_SNIPPET>\n", $template);
        $mustache = app(Mustache_Engine::class);
        $request = $mustache->render($template, $variables);

        $prompt = $context . "\n" . $examples . "\n" . $request;
        $body = [
            'model' => 'text-davinci-003',
            'prompt' => $prompt,
            'max_tokens' => 1256,
            'temperature' => 0.5,
            'top_p' => 1,
            'n' => 4,
            'frequency_penalty' => 0,
            'presence_penalty' => 0,
            'stop' => [$stop],
        ];

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://api.openai.com/v1/completions',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($body),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . env('OPENAI_TOKEN'),
            ],
        ]);

        $response = curl_exec($curl);
        $response = json_decode($response, true);
        curl_close($curl);

        return $response;
    }
}
