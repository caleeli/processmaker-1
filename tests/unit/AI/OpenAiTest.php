<?php

namespace ProcessMaker;

use Tests\Feature\Shared\RequestHelper;
use Tests\TestCase;

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

        dd($response);
    }
}
