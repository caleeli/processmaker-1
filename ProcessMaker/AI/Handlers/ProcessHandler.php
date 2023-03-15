<?php

namespace ProcessMaker\AI\Handlers;

use OpenAI\Client;
use ProcessMaker\Models\AiConfig;
use ProcessMaker\Models\ProcessAICache;

class ProcessHandler extends OpenAIHandler
{
    private $config = [
        'model' => 'text-davinci-003',
        'max_tokens' => 1256,
        'temperature' => 0,
        'top_p' => 1,
        'n' => 4,
        'frequency_penalty' => 0,
        'presence_penalty' => 0,
        'stop' => '// END.',
    ];

    private $industry = '';

    private $question = '';

    public function getConfig()
    {
        $config = AiConfig::where('industry', $this->industry)
            ->latest()
            ->first();

        if ($config) {
            $this->config = array_merge($this->config, $config->config);
        }

        foreach ($this->config as $key => $value) {
            if ($key !== 'model' && $key !== 'stop' && $key !== 'max_tokens' && $key !== 'prompt') {
                $this->config[$key] = floatval($value);
            }

            if ($key === 'max_tokens') {
                $this->config[$key] = intval($value);
            }
        }

        return $this->config;
    }

    public function getModel()
    {
        return file_get_contents(resource_path('ai/Prompts/createProcess.js'));
    }

    public function getIndustry()
    {
        return $this->industry;
    }

    public function setIndustry(String $industry)
    {
        $this->industry = $industry;
    }

    public function setModel(String $model)
    {
        $this->config['model'] = $model;
    }

    public function setMaxTokens(int $maxTokens)
    {
        $this->config['max_token'] = $maxTokens;
    }

    public function setTemperature(float $temperature)
    {
        $this->config['temperature'] = $temperature;
    }

    public function setTopP(float $topP)
    {
        $this->config['top_p'] = $topP;
    }

    public function setN(int $n)
    {
        $this->config['n'] = $n;
    }

    public function setStop(String $stop)
    {
        $this->config['stop'] = $stop;
    }

    public function setFrequencyPenalty(float $frequencyPenalty)
    {
        $this->config['frequency_penalty'] = $frequencyPenalty;
    }

    public function setPresencePenalty(float $presencePenalty)
    {
        $this->config['presence_penalty'] = $presencePenalty;
    }

    public function generatePrompt(String $description) : Object
    {
        $this->question = $description;
        $description = trim($description);
        $model = file_get_contents(resource_path('ai/Prompts/createProcess.js'));

        $this->config['prompt'] = str_replace('{{description}}', $description, $model);

        return $this;
    }

    public function execute()
    {
        $client = app(Client::class);
        $response = $client
            ->completions()
            ->create(array_merge($this->getConfig()));

        foreach ($response->choices as $choice) {
            $options[] = $choice->text;
        }

        $response->question = $this->question;
        $response->options = $options;

        $this->setCacheOptions($response);

        return $response;
    }

    private function setCacheOptions($response)
    {
        $hash = md5($this->config['prompt']);

        foreach ($response->options as $option) {
            ProcessAICache::firstOrCreate([
                'hash' => $hash,
                'code' => $option
            ]);
        }
    }
}
