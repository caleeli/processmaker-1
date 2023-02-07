<?php

namespace ProcessMaker\Traits;

use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;

trait ThrottleJobTrait
{
    private $delayedJobUid;

    private $delayedJobSuffix;

    private function throttleJob($key, $time = 20)
    {
        Redis::throttle('key')->allow(10)->every(60)->then(function () {
            // Job logic...
        }, function () {
            // Could not obtain lock...
            return $this->release(10);
        });
    
        $this->delayedJobSuffix = $key;
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
