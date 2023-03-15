<?php

namespace ProcessMaker;

use ProcessMaker\AI\Handlers\ProcessGenerator;
use ProcessMaker\Models\AiConfig;
use Tests\Feature\Shared\RequestHelper;
use Tests\TestCase;
use Illuminate\Support\Arr;

class OpenAiTest extends TestCase
{
    use RequestHelper;

    public function testSuggestDiagram()
    {
        $route = route('api.processes.suggestedDiagrams');
        $response = $this->apiCall('POST', $route, [
            'industry' => 'banking',
            'description' => 'Create a process for a leave of absence request',
        ]);

        $response->assertStatus(200);
    }

    public function testSuggestDiagramWithConfigInDB()
    {
        $config = new AiConfig();
        $config->industry = 'banking';
        $config->config = '{
            "n": 4,
            "stop": "// END.",
            "model": "text-davinci-002",
            "top_p": 1,
            "max_tokens": 1256,
            "temperature": 0,
            "presence_penalty": 0,
            "frequency_penalty": 0
        }';
        $config->save();

        $route = route('api.processes.suggestedDiagrams');
        $response = $this->apiCall('POST', $route, [
            'industry' => 'banking',
            'description' => 'Create a process for a leave of absence request',
        ]);

        $response->assertStatus(200);
    }

    public function testProcessGenerator()
    {
        $promt = 'Create a process for a leave of absence request';
        
        $response = resolve(ProcessGenerator::class)->generate($promt);

        $this->assertNotEmpty(Arr::get($response, 'choices.0.svg'));
    }
}
