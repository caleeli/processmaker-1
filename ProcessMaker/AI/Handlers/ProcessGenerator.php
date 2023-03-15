<?php

namespace ProcessMaker\AI\Handlers;

use Spatie\Browsershot\Browsershot;
use stdClass;

class ProcessGenerator
{
    public function generate(string $userPrompt)
    {
        $handler = new ProcessHandler();
        $handler->generatePrompt($userPrompt);
        $response = $handler->execute();
        // $response = $this->getDummyResponse();

        $svg = $this->convertScriptToSvg($response->options[0]);

        return [
            'choices' => [
                [
                    'process_id' => 2,
                    'svg' => $svg,
                ],
            ],
        ];
    }

    private function convertScriptToSvg(string $text): string
    {
        Browsershot::url(route('processes.ai-converter', compact('text')))
            ->waitUntilNetworkIdle()
            ->bodyHtml();

        return file_get_contents(storage_path('app/process.svg'));
    }

    private function getDummyResponse(): stdClass
    {
        $text = <<<'EOF'
            engine.startEvent("Start Leave Of Absence Request", "Employee");
            engine.userTask("Fill Out Leave Of Absence Form", "Employee", ["leaveOfAbsence"]);
            engine.userTask("Review Leave Of Absence Request", "Manager", ["approved"]);
            ifVariable("approved", [
                {
                    value: true, cb: () => {
                        engine.userTask("Add to Leave System", "HR");
                        engine.emailTask("Leave Of Absence Approval Notification", "Employee");
                        engine.endEvent("Employee On Leave Approved", false);
                    }
                },
                {
                    value: false, cb: () => {
                        engine.emailTask("Leave Of Absence Rejection Notification", "Employee");
                        engine.endEvent("Employee On Leave Rejected", true);
                    }
                }
            ]);
            // END
        EOF;

        $response = new stdClass();
        $response->options = [$text];

        return $response;
    }
}
