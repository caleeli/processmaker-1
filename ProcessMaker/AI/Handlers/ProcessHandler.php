<?php

namespace ProcessMaker\AI\Handlers;

use OpenAI\Client;

class ProcessHandler extends OpenAIHandler
{
    protected $config = [
        'model' => 'text-davinci-003',
        'max_tokens' => 1256,
        'temperature' => 1,
        'top_p' => 1,
        'n' => 4,
        'frequency_penalty' => 0,
        'presence_penalty' => 0,
        'stop' => '// END.',
    ];

    public function getConfig()
    {
        return $this->config;
    }

    public function setModel(String $model)
    {
        return $this->config['model'] = $model;
    }

    public function setMaxTokens(int $maxTokens)
    {
        return $this->config['max_token'] = $maxTokens;
    }

    public function setTemperature(float $temperature)
    {
        return $this->config['temperature'] = $temperature;
    }

    public function setTopP(float $topP)
    {
        return $this->config['top_p'] = $topP;
    }

    public function setN(int $n)
    {
        return $this->config['n'] = $n;
    }

    public function setStop(String $stop)
    {
        return $this->config['stop'] = $stop;
    }

    public function setFrequencyPenalty(float $frequencyPenalty)
    {
        return $this->config['frequency_penalty'] = $frequencyPenalty;
    }

    public function setPresencePenalty(float $presencePenalty)
    {
        return $this->config['presence_penalty'] = $presencePenalty;
    }

    public function execute()
    {
        $client = app(Client::class);
        $response = $client
            ->completions()
            ->create($this->config);

        foreach ($response->choices as $choice) {
            $options[] = $choice->text;
        }

        $response->options = $options;

        return $response;
    }

    public function generatePrompt($description)
    {
        $description = trim($description);
        $code = file_get_contents(resource_path('ai/createProcess.js'));

        return $this->config['prompt'] = str_replace('{{description}}', $description, $code);
    }
}
