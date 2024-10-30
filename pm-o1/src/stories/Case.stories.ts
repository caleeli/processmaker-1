import type { Meta, StoryObj } from '@storybook/vue3';

import Case from './Case.vue';

// Mock data for API calls if your component makes any

const meta = {
    title: 'Example/Case',
    component: Case,
    render: (args: any) => ({
        components: { Case },
        setup() {
            return { args };
        },
        template: '<Case v-bind="args" />',
    }),
    parameters: {
        layout: 'fullscreen',
        mockData: [
            // Mock API response if needed
            {
                url: '/api/1.1/tasks?page=1&process_request_id=undefined&per_page=15&order_by=id&order_direction=desc&include=user',
                method: 'GET',
                status: 200,
                response: {
                    data: {
                        "data": [
                            {
                                "id": 2699187,
                                "uuid": "101bce9e-98bd-4603-882a-65e1b4f49213",
                                "user_id": 1,
                                "process_id": 10,
                                "process_request_id": 180,
                                "subprocess_request_id": null,
                                "element_id": "node_679",
                                "element_type": "task",
                                "element_name": "Allocated for Validation",
                                "status": "ACTIVE",
                                "element_index": 0,
                                "subprocess_start_event_id": null,
                                "completed_at": null,
                                "due_at": "2024-04-19T13:25:49+00:00",
                                "due_notified": 1,
                                "initiated_at": null,
                                "riskchanges_at": "2024-04-18T15:25:49+00:00",
                                "created_at": "2024-04-16T13:25:49+00:00",
                                "updated_at": "2024-10-27T17:56:48+00:00",
                                "version_id": 443,
                                "version_type": "ProcessMaker\\Models\\ScreenVersion",
                                "is_self_service": 0,
                                "self_service_groups": [],
                                "token_properties": [],
                                "is_priority": false,
                                "is_actionbyemail": 0,
                                "user_viewed_at": "2024-10-28 10:33:16",
                                "advanceStatus": "overdue",
                                "process_request": {
                                    "id": 180,
                                    "uuid": "9bd243bb-84b7-4923-ac0a-9494b09c2425",
                                    "process_id": 10,
                                    "process_collaboration_id": null,
                                    "collaboration_uuid": "9d529a2e-5075-4ed9-ada6-253f3033d1b7",
                                    "user_id": 1,
                                    "parent_request_id": null,
                                    "participant_id": null,
                                    "callable_id": "ProcessId",
                                    "status": "ACTIVE",
                                    "name": "Client Instruction Process",
                                    "do_not_sanitize": [
                                        "fieldsValidation.messageParty",
                                        "fieldsValidation.validationMessageDocumentForm",
                                        "fieldsValidation.diligenceMessage"
                                    ],
                                    "errors": null,
                                    "completed_at": null,
                                    "initiated_at": "2024-04-16T13:23:37+00:00",
                                    "created_at": "2024-04-16T13:23:38+00:00",
                                    "updated_at": "2024-10-24T14:43:16+00:00",
                                    "process_version_id": 2466,
                                    "signal_events": [],
                                    "case_title": "Case #3",
                                    "case_number": 3,
                                    "case_title_formatted": "Case #<b>3</b>",
                                    "process": {
                                        "id": 10,
                                        "uuid": "99b948d0-f649-4c1f-a159-b3bfd6a8784c",
                                        "process_category_id": "2",
                                        "user_id": 1,
                                        "description": "Based on the Intembeko services a client has chosen and their internal integration capabilities, there maybe variations to the path the instruction takes. In the paths reflected below, the first path is the same for Coronation and PPSI because they are able to integrate with us through their workflow and they have both opted for a minimal validation service offering. \r\nIn the second workflow path scenario, Namibia Asset Managers (NAM) and PPSI UT, do not currently have the capability to integrate with the Intembeko (IntIA) workflow application and thus IntIA has enabled the capability for the client to create new cases within the IntIA workflow and index them, which thereafter take the same path as Coronation and PPSI (as indicated above) as they too have opted for minimal validation service offering.\r\nIn the last scenario, the new client has opted for the full service offering (comprehensive validation services), which takes a different workflow path to those mentioned above, there is also no integration requirement at this stage as IntIA are responsible for receipt of investor instructions (sent via email or instructed via the online platform) and thus the full process as indicated. \r\nIt’s also important to note that there may be certain client instruction types that also follow a different workflow path eg. an investor query, an investor complaint. These would not necessarily require capturing / authorising.",
                                        "name": "Client Instruction Process",
                                        "cancel_screen_id": null,
                                        "request_detail_screen_id": null,
                                        "status": "ACTIVE",
                                        "is_valid": 1,
                                        "package_key": null,
                                        "pause_timer_start": 0,
                                        "deleted_at": null,
                                        "created_at": "2023-07-24T14:58:16+00:00",
                                        "updated_at": "2024-10-24T14:45:32+00:00",
                                        "updated_by": null,
                                        "start_events": [
                                            {
                                                "id": "node_339",
                                                "name": "Manual Start Event",
                                                "config": "{\"web_entry\":null}",
                                                "assignment": "group",
                                                "assignedUsers": "",
                                                "assignedGroups": "4",
                                                "ownerProcessId": "ProcessId",
                                                "eventDefinitions": [],
                                                "ownerProcessName": "ProcessName",
                                                "allowInterstitial": "true",
                                                "interstitialScreenRef": ""
                                            },
                                            {
                                                "id": "test",
                                                "name": "Client Email Inbox Test",
                                                "config": "{\"web_entry\":{\"require_valid_session\":false,\"screen_id\":48,\"completed_action\":\"SCREEN\",\"completed_screen_id\":null,\"completed_url\":null,\"enable_query_params\":false,\"password\":null,\"enable_password_protect\":false,\"exclude_data\":[],\"embed\":{\"position\":\"full\",\"title\":\"Form\",\"icon\":\"question-circle\",\"color\":null},\"webentryRouteConfig\":{\"nodeId\":\"test\",\"nodeType\":null,\"processId\":10,\"parameters\":[],\"firstUrlSegment\":null,\"urlType\":\"standard-url\",\"entryUrl\":\"https://intembeko.cloud.processmaker.net/webentry/10/test\"}}}",
                                                "assignment": "user",
                                                "assignedUsers": "2",
                                                "assignedGroups": "",
                                                "ownerProcessId": "ProcessId",
                                                "eventDefinitions": [],
                                                "ownerProcessName": "ProcessName",
                                                "allowInterstitial": "false"
                                            },
                                            {
                                                "id": "node_2041",
                                                "name": "Start From Email Listener",
                                                "config": "{\"web_entry\":null}",
                                                "assignment": "user",
                                                "assignedUsers": "1",
                                                "assignedGroups": "",
                                                "ownerProcessId": "ProcessId",
                                                "eventDefinitions": [],
                                                "ownerProcessName": "ProcessName",
                                                "allowInterstitial": "false"
                                            },
                                            {
                                                "id": "start_event_clone",
                                                "name": "Start Event (Clone)",
                                                "config": "{\"web_entry\":null}",
                                                "assignment": "user",
                                                "assignedUsers": "1",
                                                "assignedGroups": "",
                                                "ownerProcessId": "ProcessId",
                                                "eventDefinitions": [],
                                                "ownerProcessName": "ProcessName",
                                                "allowInterstitial": "false"
                                            },
                                            {
                                                "id": "node_2480",
                                                "name": "Start Event (Integration)",
                                                "ownerProcessId": "ProcessId",
                                                "eventDefinitions": [
                                                    {
                                                        "$type": "signalEventDefinition",
                                                        "signalRef": "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                                    }
                                                ],
                                                "ownerProcessName": "ProcessName"
                                            }
                                        ],
                                        "warnings": null,
                                        "self_service_tasks": [],
                                        "signal_events": [
                                            "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                        ],
                                        "conditional_events": [],
                                        "properties": {
                                            "manager_id": 3,
                                            "manager_can_cancel_request": false
                                        },
                                        "is_template": 0,
                                        "case_title": null,
                                        "launchpad_properties": "{\"icon\": \"\", \"icon_label\": \"\", \"saved_chart_id\": \"\", \"saved_chart_title\": \"\"}",
                                        "asset_type": null,
                                        "alternative": "A",
                                        "default_anon_web_language": null,
                                        "has_timer_start_events": false,
                                        "projects": "[]"
                                    }
                                },
                                "process": {
                                    "id": 10,
                                    "uuid": "99b948d0-f649-4c1f-a159-b3bfd6a8784c",
                                    "process_category_id": "2",
                                    "user_id": 1,
                                    "description": "Based on the Intembeko services a client has chosen and their internal integration capabilities, there maybe variations to the path the instruction takes. In the paths reflected below, the first path is the same for Coronation and PPSI because they are able to integrate with us through their workflow and they have both opted for a minimal validation service offering. \r\nIn the second workflow path scenario, Namibia Asset Managers (NAM) and PPSI UT, do not currently have the capability to integrate with the Intembeko (IntIA) workflow application and thus IntIA has enabled the capability for the client to create new cases within the IntIA workflow and index them, which thereafter take the same path as Coronation and PPSI (as indicated above) as they too have opted for minimal validation service offering.\r\nIn the last scenario, the new client has opted for the full service offering (comprehensive validation services), which takes a different workflow path to those mentioned above, there is also no integration requirement at this stage as IntIA are responsible for receipt of investor instructions (sent via email or instructed via the online platform) and thus the full process as indicated. \r\nIt’s also important to note that there may be certain client instruction types that also follow a different workflow path eg. an investor query, an investor complaint. These would not necessarily require capturing / authorising.",
                                    "name": "Client Instruction Process",
                                    "cancel_screen_id": null,
                                    "request_detail_screen_id": null,
                                    "status": "ACTIVE",
                                    "is_valid": 1,
                                    "package_key": null,
                                    "pause_timer_start": 0,
                                    "deleted_at": null,
                                    "created_at": "2023-07-24T14:58:16+00:00",
                                    "updated_at": "2024-10-24T14:45:32+00:00",
                                    "updated_by": null,
                                    "start_events": [
                                        {
                                            "id": "node_339",
                                            "name": "Manual Start Event",
                                            "config": "{\"web_entry\":null}",
                                            "assignment": "group",
                                            "assignedUsers": "",
                                            "assignedGroups": "4",
                                            "ownerProcessId": "ProcessId",
                                            "eventDefinitions": [],
                                            "ownerProcessName": "ProcessName",
                                            "allowInterstitial": "true",
                                            "interstitialScreenRef": ""
                                        },
                                        {
                                            "id": "test",
                                            "name": "Client Email Inbox Test",
                                            "config": "{\"web_entry\":{\"require_valid_session\":false,\"screen_id\":48,\"completed_action\":\"SCREEN\",\"completed_screen_id\":null,\"completed_url\":null,\"enable_query_params\":false,\"password\":null,\"enable_password_protect\":false,\"exclude_data\":[],\"embed\":{\"position\":\"full\",\"title\":\"Form\",\"icon\":\"question-circle\",\"color\":null},\"webentryRouteConfig\":{\"nodeId\":\"test\",\"nodeType\":null,\"processId\":10,\"parameters\":[],\"firstUrlSegment\":null,\"urlType\":\"standard-url\",\"entryUrl\":\"https://intembeko.cloud.processmaker.net/webentry/10/test\"}}}",
                                            "assignment": "user",
                                            "assignedUsers": "2",
                                            "assignedGroups": "",
                                            "ownerProcessId": "ProcessId",
                                            "eventDefinitions": [],
                                            "ownerProcessName": "ProcessName",
                                            "allowInterstitial": "false"
                                        },
                                        {
                                            "id": "node_2041",
                                            "name": "Start From Email Listener",
                                            "config": "{\"web_entry\":null}",
                                            "assignment": "user",
                                            "assignedUsers": "1",
                                            "assignedGroups": "",
                                            "ownerProcessId": "ProcessId",
                                            "eventDefinitions": [],
                                            "ownerProcessName": "ProcessName",
                                            "allowInterstitial": "false"
                                        },
                                        {
                                            "id": "start_event_clone",
                                            "name": "Start Event (Clone)",
                                            "config": "{\"web_entry\":null}",
                                            "assignment": "user",
                                            "assignedUsers": "1",
                                            "assignedGroups": "",
                                            "ownerProcessId": "ProcessId",
                                            "eventDefinitions": [],
                                            "ownerProcessName": "ProcessName",
                                            "allowInterstitial": "false"
                                        },
                                        {
                                            "id": "node_2480",
                                            "name": "Start Event (Integration)",
                                            "ownerProcessId": "ProcessId",
                                            "eventDefinitions": [
                                                {
                                                    "$type": "signalEventDefinition",
                                                    "signalRef": "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                                }
                                            ],
                                            "ownerProcessName": "ProcessName"
                                        }
                                    ],
                                    "warnings": null,
                                    "self_service_tasks": [],
                                    "signal_events": [
                                        "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                    ],
                                    "conditional_events": [],
                                    "properties": {
                                        "manager_id": 3,
                                        "manager_can_cancel_request": false
                                    },
                                    "is_template": 0,
                                    "case_title": null,
                                    "launchpad_properties": "{\"icon\": \"\", \"icon_label\": \"\", \"saved_chart_id\": \"\", \"saved_chart_title\": \"\"}",
                                    "asset_type": null,
                                    "alternative": "A",
                                    "default_anon_web_language": null,
                                    "has_timer_start_events": false,
                                    "projects": "[]"
                                },
                                "user": {
                                    "id": 1,
                                    "uuid": "9c87dac7-06f3-4cb7-b9b1-ed9f995ec857",
                                    "email": "admin@processmaker.com",
                                    "firstname": "Admin",
                                    "lastname": "User",
                                    "username": "admin",
                                    "status": "ACTIVE",
                                    "address": null,
                                    "city": null,
                                    "state": null,
                                    "postal": null,
                                    "country": null,
                                    "phone": null,
                                    "fax": null,
                                    "cell": null,
                                    "title": null,
                                    "birthdate": null,
                                    "timezone": "America/Los_Angeles",
                                    "datetime_format": "m/d/Y H:i",
                                    "language": "en",
                                    "meta": {
                                        "pinnedControls": [
                                            {
                                                "id": "nodeType_150",
                                                "icon": "http://pm4.local:8089/js/img/start-event.27ee6b1c.svg",
                                                "rank": 10,
                                                "type": "processmaker-modeler-start-event",
                                                "items": [
                                                    {
                                                        "id": "processmaker-modeler-start-event",
                                                        "icon": "http://pm4.local:8089/js/img/start-event.27ee6b1c.svg",
                                                        "rank": 10,
                                                        "type": "processmaker-modeler-start-event",
                                                        "label": "Start Event",
                                                        "control": true,
                                                        "bpmnType": "bpmn:StartEvent"
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-message-start-event",
                                                        "icon": "http://pm4.local:8089/js/img/message-start-event.e2d5addf.svg",
                                                        "rank": 11,
                                                        "type": "processmaker-modeler-message-start-event",
                                                        "label": "Message Start Event",
                                                        "control": true,
                                                        "bpmnType": "bpmn:StartEvent"
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-conditional-start-event",
                                                        "icon": "http://pm4.local:8089/js/img/conditional-start-event.485aa22f.svg",
                                                        "rank": 12,
                                                        "type": "processmaker-modeler-conditional-start-event",
                                                        "label": "Conditional Start Event",
                                                        "control": true,
                                                        "bpmnType": "bpmn:StartEvent"
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-signal-start-event",
                                                        "icon": "http://pm4.local:8089/js/img/signal-start-event.4239bcab.svg",
                                                        "rank": 13,
                                                        "type": "processmaker-modeler-signal-start-event",
                                                        "label": "Signal Start Event",
                                                        "control": true,
                                                        "bpmnType": "bpmn:StartEvent"
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-start-timer-event",
                                                        "icon": "http://pm4.local:8089/js/img/timer-start-event.c354a032.svg",
                                                        "rank": 14,
                                                        "type": "processmaker-modeler-start-timer-event",
                                                        "label": "Start Timer Event",
                                                        "control": true,
                                                        "bpmnType": "bpmn:StartEvent"
                                                    }
                                                ],
                                                "label": "Start Event",
                                                "bpmnType": "bpmn:StartEvent"
                                            },
                                            {
                                                "id": "nodeType_153",
                                                "icon": "http://pm4.local:8089/js/img/end-event.484eed9c.svg",
                                                "rank": 30,
                                                "type": "processmaker-modeler-end-event",
                                                "items": [
                                                    {
                                                        "id": "processmaker-modeler-end-event",
                                                        "icon": "http://pm4.local:8089/js/img/end-event.484eed9c.svg",
                                                        "rank": 31,
                                                        "type": "processmaker-modeler-end-event",
                                                        "label": "End Event",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-message-end-event",
                                                        "icon": "http://pm4.local:8089/js/img/message-end-event.6b25bec9.svg",
                                                        "rank": 32,
                                                        "type": "processmaker-modeler-message-end-event",
                                                        "label": "Message End Event",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-error-end-event",
                                                        "icon": "http://pm4.local:8089/js/img/error-end-event.be1352e7.svg",
                                                        "rank": 33,
                                                        "type": "processmaker-modeler-error-end-event",
                                                        "label": "Error End Event",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-signal-end-event",
                                                        "icon": "http://pm4.local:8089/js/img/signal-end-event.e6feb2d5.svg",
                                                        "rank": 34,
                                                        "type": "processmaker-modeler-signal-end-event",
                                                        "label": "Signal End Event",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-terminate-end-event",
                                                        "icon": "http://pm4.local:8089/js/img/terminate-end-event.53b2871d.svg",
                                                        "rank": 35,
                                                        "type": "processmaker-modeler-terminate-end-event",
                                                        "label": "Terminate End Event",
                                                        "control": true
                                                    }
                                                ],
                                                "label": "End Event",
                                                "bpmnType": "bpmn:EndEvent"
                                            },
                                            {
                                                "id": "nodeType_154",
                                                "icon": "http://pm4.local:8089/js/img/task.9eaeba47.svg",
                                                "rank": 40,
                                                "type": "processmaker-modeler-task",
                                                "items": [
                                                    {
                                                        "id": "processmaker-modeler-task",
                                                        "icon": "http://pm4.local:8089/js/img/task.9eaeba47.svg",
                                                        "rank": 41,
                                                        "type": "processmaker-modeler-task",
                                                        "label": "Form Task",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-manual-task",
                                                        "icon": "http://pm4.local:8089/js/img/manual-task.166f9f35.svg",
                                                        "rank": 42,
                                                        "type": "processmaker-modeler-manual-task",
                                                        "label": "Manual Task",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-script-task",
                                                        "icon": "http://pm4.local:8089/js/img/script-task.8d648d88.svg",
                                                        "rank": 43,
                                                        "type": "processmaker-modeler-script-task",
                                                        "label": "Script Task",
                                                        "control": true
                                                    },
                                                    {
                                                        "id": "processmaker-modeler-call-activity",
                                                        "icon": "http://pm4.local:8089/js/img/sub-task.255eb842.svg",
                                                        "rank": 44,
                                                        "type": "processmaker-modeler-call-activity",
                                                        "label": "Sub Process",
                                                        "control": true
                                                    }
                                                ],
                                                "label": "Task",
                                                "bpmnType": [
                                                    "bpmn:Task",
                                                    "bpmn:UserTask",
                                                    "bpmn:GlobalTask",
                                                    "bpmn:SubProcess"
                                                ]
                                            }
                                        ]
                                    },
                                    "connected_accounts": null,
                                    "is_administrator": true,
                                    "is_system": 0,
                                    "expires_at": null,
                                    "loggedin_at": "2024-10-27T17:30:55+00:00",
                                    "active_at": "2024-10-28T10:40:16+00:00",
                                    "remember_token": null,
                                    "created_at": "2024-07-15T19:50:49+00:00",
                                    "updated_at": "2024-10-25T09:33:20+00:00",
                                    "deleted_at": null,
                                    "delegation_user_id": null,
                                    "manager_id": null,
                                    "schedule": null,
                                    "force_change_password": 0,
                                    "avatar": "https://pm4.local:8092/storage/profile/34/img.png",
                                    "password_changed_at": null,
                                    "preferences_2fa": [],
                                    "fullname": "Admin User"
                                },
                                "draft": null,
                                "can_view_parent_request": false
                            },
                            {
                                "id": 2699138,
                                "uuid": "17f12028-95f8-4065-b792-bc2278dd0512",
                                "user_id": 1,
                                "process_id": 10,
                                "process_request_id": 180,
                                "subprocess_request_id": null,
                                "element_id": "node_679",
                                "element_type": "task",
                                "element_name": "Allocated for Validation",
                                "status": "ACTIVE",
                                "element_index": 0,
                                "subprocess_start_event_id": null,
                                "completed_at": null,
                                "due_at": "2024-04-19T13:25:49+00:00",
                                "due_notified": 1,
                                "initiated_at": null,
                                "riskchanges_at": "2024-04-18T15:25:49+00:00",
                                "created_at": "2024-04-16T13:25:49+00:00",
                                "updated_at": "2024-10-27T17:56:48+00:00",
                                "version_id": 443,
                                "version_type": "ProcessMaker\\Models\\ScreenVersion",
                                "is_self_service": 0,
                                "self_service_groups": [],
                                "token_properties": [],
                                "is_priority": false,
                                "is_actionbyemail": 0,
                                "user_viewed_at": null,
                                "advanceStatus": "overdue",
                                "process_request": {
                                  "id": 180,
                                  "uuid": "9bd243bb-84b7-4923-ac0a-9494b09c2425",
                                  "process_id": 10,
                                  "process_collaboration_id": null,
                                  "collaboration_uuid": "9d529a2e-5075-4ed9-ada6-253f3033d1b7",
                                  "user_id": 1,
                                  "parent_request_id": null,
                                  "participant_id": null,
                                  "callable_id": "ProcessId",
                                  "status": "ACTIVE",
                                  "name": "Client Instruction Process",
                                  "do_not_sanitize": [
                                    "fieldsValidation.messageParty",
                                    "fieldsValidation.validationMessageDocumentForm",
                                    "fieldsValidation.diligenceMessage"
                                  ],
                                  "errors": null,
                                  "completed_at": null,
                                  "initiated_at": "2024-04-16T13:23:37+00:00",
                                  "created_at": "2024-04-16T13:23:38+00:00",
                                  "updated_at": "2024-10-24T14:43:16+00:00",
                                  "process_version_id": 2466,
                                  "signal_events": [],
                                  "case_title": "Case #3",
                                  "case_number": 3,
                                  "case_title_formatted": "Case #<b>3</b>",
                                  "process": {
                                    "id": 10,
                                    "uuid": "99b948d0-f649-4c1f-a159-b3bfd6a8784c",
                                    "process_category_id": "2",
                                    "user_id": 1,
                                    "description": "Based on the Intembeko services a client has chosen and their internal integration capabilities, there maybe variations to the path the instruction takes. In the paths reflected below, the first path is the same for Coronation and PPSI because they are able to integrate with us through their workflow and they have both opted for a minimal validation service offering. \r\nIn the second workflow path scenario, Namibia Asset Managers (NAM) and PPSI UT, do not currently have the capability to integrate with the Intembeko (IntIA) workflow application and thus IntIA has enabled the capability for the client to create new cases within the IntIA workflow and index them, which thereafter take the same path as Coronation and PPSI (as indicated above) as they too have opted for minimal validation service offering.\r\nIn the last scenario, the new client has opted for the full service offering (comprehensive validation services), which takes a different workflow path to those mentioned above, there is also no integration requirement at this stage as IntIA are responsible for receipt of investor instructions (sent via email or instructed via the online platform) and thus the full process as indicated. \r\nIt’s also important to note that there may be certain client instruction types that also follow a different workflow path eg. an investor query, an investor complaint. These would not necessarily require capturing / authorising.",
                                    "name": "Client Instruction Process",
                                    "cancel_screen_id": null,
                                    "request_detail_screen_id": null,
                                    "status": "ACTIVE",
                                    "is_valid": 1,
                                    "package_key": null,
                                    "pause_timer_start": 0,
                                    "deleted_at": null,
                                    "created_at": "2023-07-24T14:58:16+00:00",
                                    "updated_at": "2024-10-24T14:45:32+00:00",
                                    "updated_by": null,
                                    "start_events": [
                                      {
                                        "id": "node_339",
                                        "name": "Manual Start Event",
                                        "config": "{\"web_entry\":null}",
                                        "assignment": "group",
                                        "assignedUsers": "",
                                        "assignedGroups": "4",
                                        "ownerProcessId": "ProcessId",
                                        "eventDefinitions": [],
                                        "ownerProcessName": "ProcessName",
                                        "allowInterstitial": "true",
                                        "interstitialScreenRef": ""
                                      },
                                      {
                                        "id": "test",
                                        "name": "Client Email Inbox Test",
                                        "config": "{\"web_entry\":{\"require_valid_session\":false,\"screen_id\":48,\"completed_action\":\"SCREEN\",\"completed_screen_id\":null,\"completed_url\":null,\"enable_query_params\":false,\"password\":null,\"enable_password_protect\":false,\"exclude_data\":[],\"embed\":{\"position\":\"full\",\"title\":\"Form\",\"icon\":\"question-circle\",\"color\":null},\"webentryRouteConfig\":{\"nodeId\":\"test\",\"nodeType\":null,\"processId\":10,\"parameters\":[],\"firstUrlSegment\":null,\"urlType\":\"standard-url\",\"entryUrl\":\"https://intembeko.cloud.processmaker.net/webentry/10/test\"}}}",
                                        "assignment": "user",
                                        "assignedUsers": "2",
                                        "assignedGroups": "",
                                        "ownerProcessId": "ProcessId",
                                        "eventDefinitions": [],
                                        "ownerProcessName": "ProcessName",
                                        "allowInterstitial": "false"
                                      },
                                      {
                                        "id": "node_2041",
                                        "name": "Start From Email Listener",
                                        "config": "{\"web_entry\":null}",
                                        "assignment": "user",
                                        "assignedUsers": "1",
                                        "assignedGroups": "",
                                        "ownerProcessId": "ProcessId",
                                        "eventDefinitions": [],
                                        "ownerProcessName": "ProcessName",
                                        "allowInterstitial": "false"
                                      },
                                      {
                                        "id": "start_event_clone",
                                        "name": "Start Event (Clone)",
                                        "config": "{\"web_entry\":null}",
                                        "assignment": "user",
                                        "assignedUsers": "1",
                                        "assignedGroups": "",
                                        "ownerProcessId": "ProcessId",
                                        "eventDefinitions": [],
                                        "ownerProcessName": "ProcessName",
                                        "allowInterstitial": "false"
                                      },
                                      {
                                        "id": "node_2480",
                                        "name": "Start Event (Integration)",
                                        "ownerProcessId": "ProcessId",
                                        "eventDefinitions": [
                                          {
                                            "$type": "signalEventDefinition",
                                            "signalRef": "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                          }
                                        ],
                                        "ownerProcessName": "ProcessName"
                                      }
                                    ],
                                    "warnings": null,
                                    "self_service_tasks": [],
                                    "signal_events": [
                                      "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                    ],
                                    "conditional_events": [],
                                    "properties": {
                                      "manager_id": 3,
                                      "manager_can_cancel_request": false
                                    },
                                    "is_template": 0,
                                    "case_title": null,
                                    "launchpad_properties": "{\"icon\": \"\", \"icon_label\": \"\", \"saved_chart_id\": \"\", \"saved_chart_title\": \"\"}",
                                    "asset_type": null,
                                    "alternative": "A",
                                    "default_anon_web_language": null,
                                    "has_timer_start_events": false,
                                    "projects": "[]"
                                  },
                                  "parent_request": null
                                },
                                "process": {
                                  "id": 10,
                                  "uuid": "99b948d0-f649-4c1f-a159-b3bfd6a8784c",
                                  "process_category_id": "2",
                                  "user_id": 1,
                                  "description": "Based on the Intembeko services a client has chosen and their internal integration capabilities, there maybe variations to the path the instruction takes. In the paths reflected below, the first path is the same for Coronation and PPSI because they are able to integrate with us through their workflow and they have both opted for a minimal validation service offering. \r\nIn the second workflow path scenario, Namibia Asset Managers (NAM) and PPSI UT, do not currently have the capability to integrate with the Intembeko (IntIA) workflow application and thus IntIA has enabled the capability for the client to create new cases within the IntIA workflow and index them, which thereafter take the same path as Coronation and PPSI (as indicated above) as they too have opted for minimal validation service offering.\r\nIn the last scenario, the new client has opted for the full service offering (comprehensive validation services), which takes a different workflow path to those mentioned above, there is also no integration requirement at this stage as IntIA are responsible for receipt of investor instructions (sent via email or instructed via the online platform) and thus the full process as indicated. \r\nIt’s also important to note that there may be certain client instruction types that also follow a different workflow path eg. an investor query, an investor complaint. These would not necessarily require capturing / authorising.",
                                  "name": "Client Instruction Process",
                                  "cancel_screen_id": null,
                                  "request_detail_screen_id": null,
                                  "status": "ACTIVE",
                                  "is_valid": 1,
                                  "package_key": null,
                                  "pause_timer_start": 0,
                                  "deleted_at": null,
                                  "created_at": "2023-07-24T14:58:16+00:00",
                                  "updated_at": "2024-10-24T14:45:32+00:00",
                                  "updated_by": null,
                                  "start_events": [
                                    {
                                      "id": "node_339",
                                      "name": "Manual Start Event",
                                      "config": "{\"web_entry\":null}",
                                      "assignment": "group",
                                      "assignedUsers": "",
                                      "assignedGroups": "4",
                                      "ownerProcessId": "ProcessId",
                                      "eventDefinitions": [],
                                      "ownerProcessName": "ProcessName",
                                      "allowInterstitial": "true",
                                      "interstitialScreenRef": ""
                                    },
                                    {
                                      "id": "test",
                                      "name": "Client Email Inbox Test",
                                      "config": "{\"web_entry\":{\"require_valid_session\":false,\"screen_id\":48,\"completed_action\":\"SCREEN\",\"completed_screen_id\":null,\"completed_url\":null,\"enable_query_params\":false,\"password\":null,\"enable_password_protect\":false,\"exclude_data\":[],\"embed\":{\"position\":\"full\",\"title\":\"Form\",\"icon\":\"question-circle\",\"color\":null},\"webentryRouteConfig\":{\"nodeId\":\"test\",\"nodeType\":null,\"processId\":10,\"parameters\":[],\"firstUrlSegment\":null,\"urlType\":\"standard-url\",\"entryUrl\":\"https://intembeko.cloud.processmaker.net/webentry/10/test\"}}}",
                                      "assignment": "user",
                                      "assignedUsers": "2",
                                      "assignedGroups": "",
                                      "ownerProcessId": "ProcessId",
                                      "eventDefinitions": [],
                                      "ownerProcessName": "ProcessName",
                                      "allowInterstitial": "false"
                                    },
                                    {
                                      "id": "node_2041",
                                      "name": "Start From Email Listener",
                                      "config": "{\"web_entry\":null}",
                                      "assignment": "user",
                                      "assignedUsers": "1",
                                      "assignedGroups": "",
                                      "ownerProcessId": "ProcessId",
                                      "eventDefinitions": [],
                                      "ownerProcessName": "ProcessName",
                                      "allowInterstitial": "false"
                                    },
                                    {
                                      "id": "start_event_clone",
                                      "name": "Start Event (Clone)",
                                      "config": "{\"web_entry\":null}",
                                      "assignment": "user",
                                      "assignedUsers": "1",
                                      "assignedGroups": "",
                                      "ownerProcessId": "ProcessId",
                                      "eventDefinitions": [],
                                      "ownerProcessName": "ProcessName",
                                      "allowInterstitial": "false"
                                    },
                                    {
                                      "id": "node_2480",
                                      "name": "Start Event (Integration)",
                                      "ownerProcessId": "ProcessId",
                                      "eventDefinitions": [
                                        {
                                          "$type": "signalEventDefinition",
                                          "signalRef": "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                        }
                                      ],
                                      "ownerProcessName": "ProcessName"
                                    }
                                  ],
                                  "warnings": null,
                                  "self_service_tasks": [],
                                  "signal_events": [
                                    "CREATE_REQUEST_INTEGRATION_SIGNAL"
                                  ],
                                  "conditional_events": [],
                                  "properties": {
                                    "manager_id": 3,
                                    "manager_can_cancel_request": false
                                  },
                                  "is_template": 0,
                                  "case_title": null,
                                  "launchpad_properties": "{\"icon\": \"\", \"icon_label\": \"\", \"saved_chart_id\": \"\", \"saved_chart_title\": \"\"}",
                                  "asset_type": null,
                                  "alternative": "A",
                                  "default_anon_web_language": null,
                                  "has_timer_start_events": false,
                                  "projects": "[]"
                                },
                                "user": {
                                  "id": 1,
                                  "uuid": "9c87dac7-06f3-4cb7-b9b1-ed9f995ec857",
                                  "email": "admin@processmaker.com",
                                  "firstname": "Admin",
                                  "lastname": "User",
                                  "username": "admin",
                                  "status": "ACTIVE",
                                  "address": null,
                                  "city": null,
                                  "state": null,
                                  "postal": null,
                                  "country": null,
                                  "phone": null,
                                  "fax": null,
                                  "cell": null,
                                  "title": null,
                                  "birthdate": null,
                                  "timezone": "America/Los_Angeles",
                                  "datetime_format": "m/d/Y H:i",
                                  "language": "en",
                                  "meta": {
                                    "pinnedControls": [
                                      {
                                        "id": "nodeType_150",
                                        "icon": "http://pm4.local:8089/js/img/start-event.27ee6b1c.svg",
                                        "rank": 10,
                                        "type": "processmaker-modeler-start-event",
                                        "items": [
                                          {
                                            "id": "processmaker-modeler-start-event",
                                            "icon": "http://pm4.local:8089/js/img/start-event.27ee6b1c.svg",
                                            "rank": 10,
                                            "type": "processmaker-modeler-start-event",
                                            "label": "Start Event",
                                            "control": true,
                                            "bpmnType": "bpmn:StartEvent"
                                          },
                                          {
                                            "id": "processmaker-modeler-message-start-event",
                                            "icon": "http://pm4.local:8089/js/img/message-start-event.e2d5addf.svg",
                                            "rank": 11,
                                            "type": "processmaker-modeler-message-start-event",
                                            "label": "Message Start Event",
                                            "control": true,
                                            "bpmnType": "bpmn:StartEvent"
                                          },
                                          {
                                            "id": "processmaker-modeler-conditional-start-event",
                                            "icon": "http://pm4.local:8089/js/img/conditional-start-event.485aa22f.svg",
                                            "rank": 12,
                                            "type": "processmaker-modeler-conditional-start-event",
                                            "label": "Conditional Start Event",
                                            "control": true,
                                            "bpmnType": "bpmn:StartEvent"
                                          },
                                          {
                                            "id": "processmaker-modeler-signal-start-event",
                                            "icon": "http://pm4.local:8089/js/img/signal-start-event.4239bcab.svg",
                                            "rank": 13,
                                            "type": "processmaker-modeler-signal-start-event",
                                            "label": "Signal Start Event",
                                            "control": true,
                                            "bpmnType": "bpmn:StartEvent"
                                          },
                                          {
                                            "id": "processmaker-modeler-start-timer-event",
                                            "icon": "http://pm4.local:8089/js/img/timer-start-event.c354a032.svg",
                                            "rank": 14,
                                            "type": "processmaker-modeler-start-timer-event",
                                            "label": "Start Timer Event",
                                            "control": true,
                                            "bpmnType": "bpmn:StartEvent"
                                          }
                                        ],
                                        "label": "Start Event",
                                        "bpmnType": "bpmn:StartEvent"
                                      },
                                      {
                                        "id": "nodeType_153",
                                        "icon": "http://pm4.local:8089/js/img/end-event.484eed9c.svg",
                                        "rank": 30,
                                        "type": "processmaker-modeler-end-event",
                                        "items": [
                                          {
                                            "id": "processmaker-modeler-end-event",
                                            "icon": "http://pm4.local:8089/js/img/end-event.484eed9c.svg",
                                            "rank": 31,
                                            "type": "processmaker-modeler-end-event",
                                            "label": "End Event",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-message-end-event",
                                            "icon": "http://pm4.local:8089/js/img/message-end-event.6b25bec9.svg",
                                            "rank": 32,
                                            "type": "processmaker-modeler-message-end-event",
                                            "label": "Message End Event",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-error-end-event",
                                            "icon": "http://pm4.local:8089/js/img/error-end-event.be1352e7.svg",
                                            "rank": 33,
                                            "type": "processmaker-modeler-error-end-event",
                                            "label": "Error End Event",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-signal-end-event",
                                            "icon": "http://pm4.local:8089/js/img/signal-end-event.e6feb2d5.svg",
                                            "rank": 34,
                                            "type": "processmaker-modeler-signal-end-event",
                                            "label": "Signal End Event",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-terminate-end-event",
                                            "icon": "http://pm4.local:8089/js/img/terminate-end-event.53b2871d.svg",
                                            "rank": 35,
                                            "type": "processmaker-modeler-terminate-end-event",
                                            "label": "Terminate End Event",
                                            "control": true
                                          }
                                        ],
                                        "label": "End Event",
                                        "bpmnType": "bpmn:EndEvent"
                                      },
                                      {
                                        "id": "nodeType_154",
                                        "icon": "http://pm4.local:8089/js/img/task.9eaeba47.svg",
                                        "rank": 40,
                                        "type": "processmaker-modeler-task",
                                        "items": [
                                          {
                                            "id": "processmaker-modeler-task",
                                            "icon": "http://pm4.local:8089/js/img/task.9eaeba47.svg",
                                            "rank": 41,
                                            "type": "processmaker-modeler-task",
                                            "label": "Form Task",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-manual-task",
                                            "icon": "http://pm4.local:8089/js/img/manual-task.166f9f35.svg",
                                            "rank": 42,
                                            "type": "processmaker-modeler-manual-task",
                                            "label": "Manual Task",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-script-task",
                                            "icon": "http://pm4.local:8089/js/img/script-task.8d648d88.svg",
                                            "rank": 43,
                                            "type": "processmaker-modeler-script-task",
                                            "label": "Script Task",
                                            "control": true
                                          },
                                          {
                                            "id": "processmaker-modeler-call-activity",
                                            "icon": "http://pm4.local:8089/js/img/sub-task.255eb842.svg",
                                            "rank": 44,
                                            "type": "processmaker-modeler-call-activity",
                                            "label": "Sub Process",
                                            "control": true
                                          }
                                        ],
                                        "label": "Task",
                                        "bpmnType": [
                                          "bpmn:Task",
                                          "bpmn:UserTask",
                                          "bpmn:GlobalTask",
                                          "bpmn:SubProcess"
                                        ]
                                      }
                                    ]
                                  },
                                  "connected_accounts": null,
                                  "is_administrator": true,
                                  "is_system": 0,
                                  "expires_at": null,
                                  "loggedin_at": "2024-10-27T17:30:55+00:00",
                                  "active_at": "2024-10-28T10:40:16+00:00",
                                  "remember_token": null,
                                  "created_at": "2024-07-15T19:50:49+00:00",
                                  "updated_at": "2024-10-25T09:33:20+00:00",
                                  "deleted_at": null,
                                  "delegation_user_id": null,
                                  "manager_id": null,
                                  "schedule": null,
                                  "force_change_password": 0,
                                  "avatar": "https://pm4.local:8092/storage/profile/34/img.png",
                                  "password_changed_at": null,
                                  "preferences_2fa": [],
                                  "fullname": "Admin User"
                                },
                                "draft": null,
                                "can_view_parent_request": false
                              },
                        ],
                        "meta": {
                            "filter": "",
                            "sort_by": "due_at",
                            "sort_order": "asc",
                            "count": 15,
                            "total_pages": 19,
                            "in_overdue": 15,
                            "current_page": 1,
                            "from": 1,
                            "last_page": 19,
                            "links": [],
                            "per_page": 15,
                            "to": 15,
                            "total": 272
                        }
                    },
                },
            },
        ],
    },
    args: {
        caseData: {
            case_title: 'Contract with Zender Company',
            status: 'Active',
            user: {
                fullname: 'Alex Smith',
                avatar: 'https://i.pravatar.cc/150?u=Alex+Smith',
            },
            name: 'Contract Management',
            process_id: 1,
            process_version_id: 150,
            updated_at: '2024-11-07T10:40:16-04:00',
            created_at: '2024-11-07T10:40:16-04:00',
            participants: [
                { fullname: 'Alice', avatar: 'https://i.pravatar.cc/150?u=Alice' },
                { fullname: 'Bob', avatar: 'https://i.pravatar.cc/150?u=Bob' },
                { fullname: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=Charlie' },
                { fullname: 'Dana', avatar: 'https://i.pravatar.cc/150?u=Dana' },
                { fullname: 'Eve', avatar: 'https://i.pravatar.cc/150?u=Eve' },
            ],
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Case>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        // You can override default args here if needed
    },
};
