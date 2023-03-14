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
            'description' => 'Create a user task',
        ]);

        $response->assertStatus(200);
    }
}
