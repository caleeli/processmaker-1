<?php

namespace ProcessMaker;

use ProcessMaker\AI\Handlers\ProcessGenerator;
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
