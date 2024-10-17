<?php

namespace ProcessMaker\Managers;

use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;
use ProcessMaker\Models\Setting;

class SettingsCacheManager
{
    /**
     * The storage disk to use.
     *
     * @var string
     */
    protected $storageDisk = 'system_settings';

    /**
     * The directory where compiled screens are stored.
     *
     * @var string
     */
    protected $storagePath = 'settings/';

    /**
     * Store compiled content for a given screen ID.
     *
     * @param  string  $key
     * @param  mixed   $content
     * @return void
     */
    public function store(string $key, $content)
    {
        try {
            $filename = $this->getFilename($key);
            $serializedContent = serialize($content);

            Storage::disk($this->storageDisk)->put(
                $this->storagePath . $filename,
                $serializedContent
            );
        } catch (InvalidArgumentException $e) {
            // Do nothing
        }
    }

    /**
     * Retrieve compiled content by screen ID.
     *
     * @param  string  $key
     * @return mixed|null
     */
    public function load(string $key)
    {
        try {
            $filename = $this->getFilename($key);

            if (Storage::disk($this->storageDisk)->exists($this->storagePath . $filename)) {
                $serializedContent = Storage::disk($this->storageDisk)->get(
                    $this->storagePath . $filename
                );

                return unserialize($serializedContent);
            }
        } catch (InvalidArgumentException $e) {
            return null;
        }

        return null;
    }

    public function cache(string $key, callable $callback)
    {
        $content = $this->load($key);

        if ($content === null) {
            $content = $callback();

            $this->store($key, $content);
        }

        return $content;
    }

    public function resetWhen(string $event, callable $callback)
    {
        Setting::$event($callback);
    }

    /**
     * Clear all compiled assets from storage.
     *
     * @return void
     */
    public function clear()
    {
        Storage::disk($this->storageDisk)->deleteDirectory($this->storagePath);

        // Recreate the directory to ensure it exists after deletion
        Storage::disk($this->storageDisk)->makeDirectory($this->storagePath);
    }

    public function clearBy(string $search)
    {
        $files = Storage::disk($this->storageDisk)->files($this->storagePath);

        foreach ($files as $file) {
            if (strpos($file, $search) !== false) {
                Storage::disk($this->storageDisk)->delete($file);
            }
        }
    }

    /**
     * Generate a filename based on the screen ID.
     *
     * @param  string  $key
     * @return string
     */
    protected function getFilename(string $key)
    {
        return $key . '.bin';
    }
}
