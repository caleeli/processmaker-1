<?php

class ScreenPostProcess
{
    // custom css
    const COLUMN_HORIZONTAL = <<<'CSS'
        [selector="horizontal"] > div > div {
            border: 1px solid red;
            display: flex;
            flex-direction: row;
        }
        [selector="horizontal"] > div > div > div {
            margin-left: 1rem;
        }
        [selector="horizontal"] > div > div > div:first-child {
            margin-left: 0rem;
        }
        CSS;

    // post process the text output
    public function __invoke($output, $params)
    {
        // load as DOM quietly
        $dom = new DOMDocument();
        @$dom->loadXML("<form>$output</form>");
        $screen = new stdClass();
        $screen->id = uniqid("screen_", true);
        $screen->title = $params['title'];
        $screen->type = 'FORM';
        $screen->description = $params['description'];
        $page = new stdClass();
        $page->name = $params['title'];
        $page->items = [];
        $screen->config = [
            $page,
        ];
        $screen->screen_category_id = null;
        $screen->computed = [];
        $screen->custom_css = '';
        $screen->created_at = now()->toDateTimeString();
        $screen->updated_at = now()->toDateTimeString();
        $screen->status = 'ACTIVE';
        $screen->key = null;
        $screen->watchers = [];
        $screen->categories = [];

        $screenPackage = new stdClass();
        $screenPackage->type = 'screen_package';
        $screenPackage->version = '2';
        $screenPackage->screens = [
            $screen,
        ];
        $this->processNodes($dom->firstElementChild->childNodes, $screen->config[0]->items, $screenPackage);
        return $screenPackage;
    }

    public function addCss($css, $newCss)
    {
        // check if already exists
        if (strpos($css, $newCss) === false) {
            $css .= $newCss;
        }

        return $css;
    }

    public function processNodes(DOMNodeList $nodes, array &$items, $root)
    {
        foreach ($nodes as $node) {
            $dom = $node->ownerDocument;
            if ($node->nodeType === XML_ELEMENT_NODE) {
                $this->processNode($node, $items, $root);
            }
        }
    }

    public function processNode(DOMElement $node, array &$items, $root)
    {
        $components = [
            'form-input' => function ($node, array &$items) {
                $obj = new stdClass();
                $obj->component = 'FormInput';
                $obj->{'editor-control'} = 'FormInput';
                $obj->{'editor-component'} = 'FormInput';
                $obj->config = new stdClass();
                $obj->config->name = $node->getAttribute('name');
                $obj->config->label = $node->getAttribute('label') ?: '';
                $obj->config->type = $node->getAttribute('type') ?: 'text';
                $obj->config->readonly = $node->getAttribute('readonly') ?: false;
                $obj->inspector = [];
                $items[] = $obj;
            },
            'form-button' => function ($node, array &$items) {
                $obj = new stdClass();
                $obj->component = 'FormButton';
                $obj->{'editor-control'} = 'FormSubmit';
                $obj->{'editor-component'} = 'FormButton';
                $obj->config = new stdClass();
                $obj->config->name = $node->getAttribute('name');
                $obj->config->label = $node->getAttribute('label') ?: '';
                $obj->config->variant = $node->getAttribute('variant') ?: 'primary';
                if ($node->getAttribute('type') === 'link') {
                    $obj->config->type = 'script';
                    $obj->config->variant = 'link';
                } elseif ($node->getAttribute('type') === 'button') {
                    $obj->config->type = 'script';
                } else {
                    $obj->config->type = 'submit';
                }
                $obj->inspector = [];
                $items[] = $obj;
            },
            'form-image' => function ($node, array &$items) {
                $obj = new stdClass();
                $obj->component = 'FormImage';
                $obj->{'editor-control'} = 'FormImage';
                $obj->{'editor-component'} = 'FormImage';
                $obj->label = $node->getAttribute('label') ?: '';
                $obj->config = new stdClass();
                $obj->inspector = [];
                $obj->config->name = $node->getAttribute('name');
                $obj->config->label = $node->getAttribute('label') ?: '';
                $src = $node->getAttribute('src');
                // load image from src if exists and convert to base64
                if ($src) {
                    // download $src file in /tmp
                    $content = @file_get_contents($src);
                    if ($content) {
                        $tmp = tempnam(sys_get_temp_dir(), 'img');
                        file_put_contents($tmp, $content);
                        $mime = @mime_content_type($tmp);
                        if ($mime) {
                            $obj->config->image = 'data:' . $mime . ';base64,' . base64_encode($content);
                        }
                    }
                }
                $items[] = $obj;
            },
            'row' => function ($node, array &$items, $root) {
                $obj = new stdClass();
                $obj->component = 'FormMultiColumn';
                $obj->{'editor-control'} = 'FormMultiColumn';
                $obj->{'editor-component'} = 'MultiColumn';
                $obj->items = [];
                $obj->container = true;
                $obj->inspector = [];
                $options = [];
                // count columns in row
                $columns = 0;
                foreach ($node->childNodes as $child) {
                    if ($child->nodeType === XML_ELEMENT_NODE && $child->tagName == 'column') {
                        $obj->items[] = [];
                        $this->processNodes($child->childNodes, $obj->items[$columns], $root);
                        $columns++;
                    }
                }
                $maxColumns = 12;
                $size = floor($maxColumns / $columns);
                for ($i = 0; $i < $columns; $i++) {
                    $options[] = [
                        'value' => ($i + 1),
                        'content' => $size,
                    ];
                }
                if ($columns * $size < $maxColumns) {
                    $options[$columns - 1]['content'] += $maxColumns - ($columns * $size);
                }
                $obj->config = new stdClass();
                $obj->config->options = $options;
                $items[] = $obj;
            },
            'tabs' => function ($node, array &$items, $root) {
                $nested = new stdClass();
                $nested->id = uniqid("screen_", true);
                $nested->type = 'FORM';
                $nested->screen_category_id = null;
                $nested->config = [];
                $nested->computed = [];
                $nested->custom_css = '';
                $nested->created_at = now()->toDateTimeString();
                $nested->updated_at = now()->toDateTimeString();
                $nested->status = 'ACTIVE';
                $nested->key = null;
                $nested->watchers = [];
                $nested->categories = [];
                // for each tab in tabs create a new page
                foreach ($node->childNodes as $child) {
                    if ($child->nodeType === XML_ELEMENT_NODE && $child->tagName == 'tab') {
                        $nested->config[] = $page = (object) [
                            'name' => $child->getAttribute('name'),
                            'items' => [],
                        ];
                        // Add navigation buttons (row > horizontal column)
                        $page->items[] = $row = (object) [
                            'component' => 'FormMultiColumn',
                            'editor-control' => 'FormMultiColumn',
                            'editor-component' => 'MultiColumn',
                            'config' => (object) [
                                'customCssSelector' => 'horizontal',
                                'options' => [
                                    (object) [
                                        'value' => 1,
                                        'content' => 12,
                                    ],
                                ],
                            ],
                            'items' => [],
                            'inspector' => [],
                            'container' => true,
                        ];
                        $navIndex = 0;
                        foreach ($node->childNodes as $nav) {
                            if ($nav->tagName == 'tab') {
                                $tab = $nav->getAttribute('name');
                                $title = $nav->getAttribute('title') ?: '';
                                $row->items[] = (object) [
                                    'component' => 'FormButton',
                                    'editor-control' => 'FormSubmit',
                                    'editor-component' => 'FormButton',
                                    'config' => (object) [
                                        'name' => $tab,
                                        'label' => $title,
                                        'event' => 'pageNavigate',
                                        'variant' => 'secondary',
                                        'eventData' => $navIndex,
                                    ],
                                    'inspector' => [],
                                ];
                                $navIndex++;
                            }
                        }
                        $this->processNodes($child->childNodes, $page->items, $root);
                        $nested->custom_css = $this->addCss($nested->custom_css, self::COLUMN_HORIZONTAL);
                    }
                }
                // Add nested to $items
                $items[] = (object) [
                    'label' => $node->getAttribute('label') ?: '',
                    'component' => 'FormNestedScreen',
                    'editor-control' => 'FormNestedScreen',
                    'editor-component' => 'NestedScreen',
                    'config' => (object) [
                        'name' => $node->getAttribute('name'),
                        'label' => $node->getAttribute('label') ?: '',
                        'screen' => $nested->id,
                    ],
                    'inspector' => [],
                ];
                $root->screens[] = $nested;
            },
        ];
        $tagName = $node->tagName;
        if (isset($components[$tagName])) {
            $components[$tagName]($node, $items, $root);
        }
    }
}

return new ScreenPostProcess;
