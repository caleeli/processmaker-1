<?php

namespace ProcessMaker\Traits;

use Illuminate\Support\Str;

trait DebounceJobTrait
{
    private $delayedJobUid;

    private $delayedJobSuffix;

    private function debounceJob($suffix, $time = 20)
    {
        $this->delayedJobSuffix = $suffix;
        $this->delayedJobUid = Str::uuid()->toString();
        $this->setLastDispatchedJob($this->delayedJobUid);
        $this->delay($time);
    }

    /**
     * Return true if debounced job is ready to be executed
     *
     * @return bool
     */
    private function isDebounceReady()
    {
        // Get last dispatched job
        $lastDispatched = $this->getLastDispatched();
        $ready = $lastDispatched === $this->delayedJobUid;

        return $ready;
    }

    private function getLastDispatched()
    {
        $key = $this->getDebounceJobKey();

        return cache()->get($key);
    }

    private function setLastDispatchedJob($uid)
    {
        $key = $this->getDebounceJobKey();
        cache()->forever($key, $uid);
    }

    private function getDebounceJobKey()
    {
        return get_class($this) . $this->delayedJobSuffix;
    }
}
