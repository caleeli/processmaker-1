
export default {
    data() {
        return {
            task: null,
            currentUserId: null,
            formData: {},
        }
    },
    methods: {
        async getHelperProcessStartEvent(triggeredBy = null) {
            if (triggeredBy === 'wizard-details-modal') {
                this.startEvents = this.template.process.start_events.filter(event => !event.eventDefinitions || event.eventDefinitions.length === 0);
                this.helperProcessId = this.template.process.id;
                
                this.triggerHelperProcessStartEvent();
            } else {
                if (this.wizardTemplateUuid !== null) {
                    const response = await ProcessMaker.apiClient.get(`wizard-templates/${this.wizardTemplateUuid}/get-helper-process`);
                    if (response.data) {
                        this.helperProcessId = response.data.helper_process_id;
                        this.startEvents = JSON.parse(response.data.start_events).filter(event => !event.eventDefinitions || event.eventDefinitions.length === 0);
                        
                        this.triggerHelperProcessStartEvent();
                    }
                }
            }            
        },
        async triggerHelperProcessStartEvent() {
            try {
                
                const startEventId = this.startEvents[0].id;
                const url = `/process_events/${this.helperProcessId}?event=${startEventId}`;

                // Start the helper process
                const response = await window.ProcessMaker.apiClient.post(url);
                const processRequestId = response.data.id;

                this.getNextTask(processRequestId);
            } catch (err) {
                const data = err.response?.data;
                if (data && data.message) {
                    ProcessMaker.alert(data.message, 'danger');
                }
            }
        },
        async getNextTask(processRequestId) {
            try {
                const response = await ProcessMaker.apiClient.get(`tasks`, {
                params: {
                    page: 1,
                    include: 'user,assignableUsers',
                    process_request_id: processRequestId,
                    status: 'ACTIVE',
                    per_page: 10,
                    order_by: 'due_at',
                    order_direction: 'asc'
                }
                });

                const taskData = response.data.data;

                if (taskData.length > 0) {
                    this.task = taskData[0];
                    this.currentUserId = parseInt(document.head.querySelector('meta[name="user-id"]').content);
                    this.$bvModal.show('processWizard');    
                    this.showHelperProcess = true;
                } else {
                    if (this.shouldImportProcessTemplate) {
                        this.importProcessTemplate();
                    } else {
                        this.showHelperProcess = false;
                        this.close();
                    }
                    
                }
            } catch (error) {
                if (error && error.message) {
                    ProcessMaker.alert(error.message, 'danger');
                }
            }
        },
        close() {
            this.$bvModal.hide('processWizard');
            // Cancels the associated process request to prevent orphaned processes.
            this.cancelHelperProcessRequest();
        },
        async cancelHelperProcessRequest() {
            const {process_request_id: processRequestId } = this.task;

            try {
                await ProcessMaker.apiClient.put(`requests/${processRequestId}`, {
                    status: "CANCELED"
                });
                this.showHelperProcess = false;
            } catch (error) {
                if (data && data.message) {
                    ProcessMaker.alert(data.message, 'danger');
                }
            }
        },
        taskUpdated(task) {
            this.task = task;
        },
        async submit(task) {
            const { id: taskId, process_request_id: processRequestId } = task;

            try {
                await ProcessMaker.apiClient.put(`tasks/${taskId}`, {
                status: "COMPLETED",
                data: this.formData
                });

                // Successfully completed task, get the next one
                await this.getNextTask(processRequestId);
            } catch (error) {
                if (error && error.message) {
                ProcessMaker.alert(error.message, 'danger');
                }
            }
        },
        completed(processRequestId) {
            console.log("task completed", processRequestId);
        },
        error(processRequestId) {
            console.error('error', processRequestId);
        },
        async importProcessTemplate() {
            const response = await ProcessMaker.apiClient.post(`template/create/process/${this.template.process_template_id}`, {
                name: this.template.name,
                description: this.template.description,
                version: '1.0.0', // TODO: Wizards should have a versions property 
                process_category_id: this.template.process.process_category_id,
                projects: null,
                wizardTemplateUuid: this.template.uuid,
            });
        
            if (response.data?.existingAssets) {
                this.handleExistingAssets(response.data);
            } else {
                // redirect to the new process launchpad
                window.location = `/processes-catalogue/${response.data.processId}`;
            }
        },
        handleExistingAssets(data) {
            const assets = JSON.stringify(data.existingAssets);
            const responseId = data.id;
            const request = JSON.stringify(data.request);
            window.history.pushState(
                {
                assets,
                name: this.template.name,
                responseId,
                request,
                redirectTo: 'process-launchpad',
                wizardTemplateUuid: this.template.uuid,
                },
                "",
                "/template/assets",
            );
            window.location = "/template/assets";
        }
   },
}
