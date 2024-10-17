<?php

namespace ProcessMaker\Helpers;

use Exception;
use Illuminate\Contracts\Container\BindingResolutionException;

class ViteHelper
{
    protected static $manifest = null;
    private $styles = [];
    private $scripts = [];

    /**
     * Register the assets for a Vite entry point.
     *
     * @param string $entry Vite asset entry point
     */
    public function register(string $entry)
    {
        if (is_null(self::$manifest)) {
            $manifestPath = base_path('pm-o1/public/pm-o1/.vite/manifest.json');
            if (!file_exists($manifestPath)) {
                throw new Exception('El archivo de manifiesto de Vite no existe. Por favor, ejecuta "npm run build".');
            }

            $manifestContent = file_get_contents($manifestPath);
            self::$manifest = json_decode($manifestContent, true);
        }

        if (!isset(self::$manifest[$entry])) {
            throw new Exception("No se pudo encontrar el punto de entrada '{$entry}' en el manifiesto.");
        }

        $processed = [];

        $addAssets = function ($entry) use (&$addAssets, &$processed) {
            if (isset($processed[$entry])) {
                return;
            }
            $processed[$entry] = true;

            $entryData = self::$manifest[$entry];

            // Procesar las importaciones primero
            if (isset($entryData['imports'])) {
                foreach ($entryData['imports'] as $import) {
                    $addAssets($import);
                }
            }

            // Agregar los archivos CSS
            if (isset($entryData['css'])) {
                foreach ($entryData['css'] as $cssFile) {
                    if (!in_array($cssFile, $this->styles)) {
                        $this->styles[] = $cssFile;
                    }
                }
            }

            // Agregar el archivo del punto de entrada actual
            if (isset($entryData['file']) && !in_array($entryData['file'], $this->scripts)) {
                $this->scripts[] = $entryData['file'];
            }
        };

        $addAssets($entry);
    }

    /**
     * Render the css style assets.
     *
     * @return string
     */
    public function renderStyleAssets()
    {
        // Generar las etiquetas de link para CSS
        $html = '';
        foreach ($this->styles as $style) {
            $style = '/pm-o1/' . $style;
            $html .= '<link rel="stylesheet" href="' . asset($style) . '">' . "\n";
        }

        return $html;
    }

    /**
     * Render the script assets.
     *
     * @return string
     */
    public function renderScriptAssets()
    {
        // Generar las etiquetas de script con type="module"
        $html = '';
        foreach ($this->scripts as $script) {
            $script = '/pm-o1/' . $script;
            $html .= '<script type="module" src="' . asset($script) . '"></script>' . "\n";
        }

        return $html;
    }

    public static function renderVue($componentName, $selector, array $props = [])
    {
        $propsJson = json_encode($props, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT);

        return <<<EOT
        <script type="module">
            window.ProcessMaker.mountComponent('{$componentName}', '{$selector}', {$propsJson});
        </script>
        EOT;
    }
}
