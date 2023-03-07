@extends('layouts.layout')

@section('content')
<b-tabs>
    <b-tab title="Context">
        <b-form-group>
            <monaco-editor
                ref="monaco"
                :options="monacoLargeOptions"
                v-model="form.context"
                :language="form.contextLang"
                style="border:1px solid gray; min-height:400px"
            ></monaco-editor>
        </b-form-group>
    </b-tab>
    <b-tab title="Examples">
        <b-form-group>
            <monaco-editor
                ref="monaco"
                :options="monacoLargeOptions"
                v-model="form.examples"
                :language="form.examplesLang"
                style="border:1px solid gray; min-height:400px"
            ></monaco-editor>
        </b-form-group>
    </b-tab>
    <b-tab title="Template">
        <b-form-group>
            <monaco-editor
                ref="monaco"
                :options="monacoLargeOptions"
                v-model="form.template"
                :language="form.templateLang"
                style="border:1px solid gray; min-height:400px"
            ></monaco-editor>
        </b-form-group>
    </b-tab>
    <b-tab title="Test">
        <b-form-group
            v-for="variable in form.variables"
            :label="variable"
            label-cols="2"
        >
            <b-textarea
                v-model="form.test[variable]"
                rows="2"
                max-rows="6"
                res
            />
        </b-form-group>
        <!-- buttons -->
        <div class="d-flex">
            <div class="mr-auto">
                <b-button
                    v-for="(choice, choiceI) in choices"
                    :key="`choice-${choiceI}`"
                    variant="secondary"
                    @click="selectChoice(choice)"
                >
                    @{{choiceI}}
                </b-button>
            </div>
            <div class="text-right mt-3">
                <b-button
                    variant="primary"
                    @click="testTemplate"
                >
                    <i v-if="processing" class="fas fa-spinner fa-spin"></i>
                    {{__('Test')}}
                </b-button>
            </div>
        </div>
        <div class="d-flex" v-if="testOutputObj">
            <vue-form-renderer
                :config="testOutputObj.screenPackage.screens[0].config"
                :computed="testOutputObj.screenPackage.screens[0].computed"
                :custom-css="testOutputObj.screenPackage.screens[0].customCSS"
                :watchers="testOutputObj.screenPackage.screens[0].watchers"
                :show-errors="false"
            />
            <div>
                <monaco-editor
                    :options="monacoLargeOptions"
                    v-model="testOutput"
                    language="HTML"
                    style="border:1px solid gray; min-height:400px"
                />
            </div>
        </div>
    </b-tab>
</b-tabs>
@endsection

@section('js')
<script src="{{mix('js/processes/ai.js')}}"></script>
<script>
    window.PM4ConfigOverrides = {
        getScreenEndpoint: "/ai-maker/run/screen",
    };
    new Vue({
        el: '#main',
        data: {
            processing: false,
            form: {
                context: @json($context),
                examples: @json($examples),
                template: @json($template),
                contextLang: @json($contextLang),
                examplesLang: @json($examplesLang),
                templateLang: @json($templateLang),
                variables: @json($variables),
                test: @json($test),
                model: @json($model),
            },
            testOutputId: '',
            testOutput: '',
            testOutputObj: null,
            choices: [],
            monacoLargeOptions: {
                minimap: {
                    enabled: false
                },
                automaticLayout: true,
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                wordWrapColumn: 80,
                wordWrapMinified: true,
                wrappingIndent: 'indent',
                lineNumbers: 'on',
                lineNumbersMinChars: 5,
                lineDecorationsWidth: 10,
                glyphMargin: true,
                folding: true,
                foldingStrategy: 'indentation',
                renderLineHighlight: 'all',
                scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible',
                    useShadows: false,
                    verticalHasArrows: true,
                    horizontalHasArrows: true,
                    verticalScrollbarSize: 14,
                    horizontalScrollbarSize: 14,
                    arrowSize: 30
                },
                overviewRulerBorder: false,
                overviewRulerLanes: 2,
                cursorBlinking: 'blink',
                cursorSmoothCaretAnimation: true,
                cursorStyle: 'line',
                cursorWidth: 2,
                hideCursorInOverviewRuler: false,
                mouseWheelZoom: true,
                multiCursorMergeOverlapping: true,
                multiCursorModifier: 'ctrlCmd',
                multiCursorPaste: 'spread',
                quickSuggestions: true,
                quickSuggestionsDelay: 10,
                parameterHints: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                acceptSuggestionOnCommitCharacter: true,
                snippetSuggestions: 'top',
                wordBasedSuggestions: true,
                suggestSelection: 'first',
                suggestFontSize: 0,
                suggestLineHeight: 0,
                suggestOnTriggerCharacters: true,
                suggest: {
                    snippetsPreventQuickSuggestions: false,
                    shareSuggestSelections: true,
                    showIcons: true,
                    showMethods: true,
                    showFunctions: true,
                    showConstructors: true,
                    showFields: true,
                    showVariables: true,
                    showClasses: true,
                    showStructs: true,
                    showInterfaces: true,
                    showModules: true,
                    showProperties: true,
                    showEvents: true,
                    showOperators: true,
                    showUnits: true,
                },
                selectionHighlight: true,
            },
        },
        methods: {
            selectChoice(choice) {
                this.testOutputId = choice.id;
                this.testOutput = choice.text;
                this.testOutputObj = choice;
            },
            async testTemplate() {
                this.testOutput = '';
                this.processing = true;
                ProcessMaker.apiClient.post(`ai-maker/test/${this.form.model}`, this.form.test, {
                        timeout: 360000,
                    })
                    .then(response => {
                        this.choices = response.data.choices;
                        this.testOutputId = this.choices[0].id;
                        this.testOutput = this.choices[0].text;
                        this.testOutputObj = this.choices[0];
                    })
                    .catch(error => {
                        ProcessMaker.alert(error, 'danger');
                    }).
                    finally(() => {
                        this.processing = false;
                    });
            },
            // function executed to post process the text output
            postProcessText(text) {
                return text;
            },
        },
    });
</script>
@endsection
