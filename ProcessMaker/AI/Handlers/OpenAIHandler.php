<?php

namespace ProcessMaker\AI\Handlers;

use OpenAI\Client;

abstract class OpenAIHandler
{
    abstract public function getConfig();

    abstract public function getModel();

    abstract public function setModel(String $model);

    abstract public function setMaxTokens(int $val);

    abstract public function setTemperature(float $val);

    abstract public function setTopP(float $val);

    abstract public function setN(int $val);

    abstract public function setStop(String $stop);

    abstract public function setFrequencyPenalty(float $val);

    abstract public function setPresencePenalty(float $val);

    abstract public function generatePrompt(String $description);

    abstract public function execute();
}
