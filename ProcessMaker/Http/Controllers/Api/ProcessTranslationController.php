<?php

namespace ProcessMaker\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use ProcessMaker\Http\Controllers\Controller;
use ProcessMaker\ImportExport\Utils;
use ProcessMaker\Models\Process;
use ProcessMaker\Models\Screen;
use ProcessMaker\ProcessTranslations\Languages;
use ProcessMaker\ProcessTranslations\ProcessTranslation;

class ProcessTranslationController extends Controller
{
    public function index(Request $request)
    {
        $processId = $request->input('process_id', '');
        $filter = $request->input('filter', '');

        $process = Process::findOrFail($processId);

        $processTranslation = new ProcessTranslation($process);
        $screensTranslations = $processTranslation->getTranslations();
        $languageList = $processTranslation->getLanguageList($screensTranslations);

        if ($filter != '') {
            $languageList = array_values(collect($languageList)->filter(function ($item) use ($filter) {
                return false !== stristr($item['human_language'], $filter);
            })->toArray());
        }

        return response()->json([
            'translatedLanguages' => $languageList,
        ]);
    }

    public function getAvailableLanguages()
    {
        foreach (Languages::ALL as $key => $value) {
            $availableLanguages[] = [
                'humanLanguage' => $value,
                'language' => $key,
            ];
        }

        return response()->json([
            'availableLanguages' => $availableLanguages,
        ]);
    }
}
