import DataLoading from "../common/DataLoading";

export default {
  components: {
    DataLoading,
  },
  data() {
    return {
      processActions: [
        {
          value: "unpause-start-timer",
          content: "Unpause Start Timer Events",
          icon: "fas fa-play",
          conditional: "if(has_timer_start_events and pause_timer_start, true, false)",
          permission: "view-additional-asset-actions",
        },
        {
          value: "pause-start-timer",
          content: "Pause Start Timer Events",
          icon: "fas fa-pause",
          conditional: "if(has_timer_start_events and not(pause_timer_start), true, false)",
          permission: "view-additional-asset-actions",
        },
        {
          value: "open-launchpad",
          content: "Open Launchpad",
          link: true,
          href: "/process-browser/{{id}}",
          permission: ["edit-processes", "create-projects", "view-projects"],
          icon: "fas fa-file-export",
          conditional: "if(status == 'ACTIVE', true, false)"
        },
        {
          value: "open-in-modeler",
          content: "Open in Modeler",
          link: true,
          href: "/modeler/{{id}}",
          permission: ["edit-processes", "view-additional-asset-actions"],
          icon: "fas fa-edit",
          conditional: "if(status == 'ACTIVE' or status == 'INACTIVE', true, false)"
        },
        {
          value: "edit-launchpad",
          content: "Edit in Launchpad",
          permission: ["edit-processes", "view-additional-asset-actions"],
          icon: "fas fa-edit",
          conditional: "if(status == 'ACTIVE', true, false)"
        },
        {
          value: "create-template",
          content: "Save as Template",
          permission: ["create-process-templates"],
          icon: "fas fa-layer-group",
        },
        {
          value: "create-pm-block",
          content: "Save as PM Block",
          permission: ["create-pm-blocks"],
          icon: "fas nav-icon fa-cube",
        },
        {
          value: "add-to-project",
          content: "Add to Project",
          icon: "fas fa-folder-plus",
          permission: 'create-projects',
        },
        {
          value: "edit-item",
          content: "Configure",
          link: true,
          href: "/processes/{{id}}/edit",
          permission: ["edit-processes", "view-additional-asset-actions"],
          icon: "fas fa-cog",
          conditional: "if(status == 'ACTIVE' or status == 'INACTIVE', true, false)"},
        {
          value: "view-documentation",
          content: "View Documentation",
          link: true,
          href: "/modeler/{{id}}/print",
          permission: ["view-processes", "view-additional-asset-actions"],
          icon: "fas fa-sign",
          conditional: "isDocumenterInstalled",
        },
        {
          value: "archive-item",
          content: "Archive",
          permission: ["archive-processes", "view-additional-asset-actions"],
          icon: "fas fa-archive",
          conditional: "if(status == 'ACTIVE' or status == 'INACTIVE', true, false)"
        },
        { value: "divider" },
        {
          value: "export-item",
          content: "Export",
          link: true,
          href: "/processes/{{id}}/export",
          permission: ["export-processes", "view-additional-asset-actions"],
          icon: "fas fa-file-export",
        },
        {
          value: "restore-item",
          content: "Restore",
          permission: ["archive-processes", "view-additional-asset-actions"],
          icon: "fas fa-upload",
          conditional: "if(status == 'ARCHIVED', true, false)",
        },
        {
          value: "download-bpmn",
          content: "Download BPMN",
          permission: ["view-processes", "view-additional-asset-actions"],
          icon: "fas fa-file-download",
        },
      ],
      screenActions: [
        {
          value: "edit-screen",
          content: "Edit Screen",
          link: true,
          href: "/designer/screen-builder/{{id}}/edit",
          permission: ["edit-screens", "view-additional-asset-actions"],
          icon: "fas fa-pen-square",
        },
        {
          value: "edit-item",
          content: "Configure",
          link: true,
          href: "/designer/screens/{{id}}/edit",
          permission: ["edit-screens", "view-additional-asset-actions"],
          icon: "fas fa-cog",
        },
        {
          value: "add-to-project",
          content: "Add to Project",
          icon: "fas fa-folder-plus",
          permission: "create-projects",
        },
        {
          value: "create-template",
          content: "Save as Template",
          icon: "fas fa-file-image",
        },
        {
          value: "duplicate-item",
          content: "Copy",
          permission: ["create-screens", "view-additional-asset-actions"],
          icon: "fas fa-copy",
        },
        {
          value: "export-item",
          content: "Export",
          link: true,
          href: "/designer/screens/{{id}}/export",
          permission: ["export-screens", "view-additional-asset-actions"],
          icon: "fas fa-file-export",
        },
        {
          value: "remove-screen",
          content: "Delete",
          permission: ["delete-screens", "view-additional-asset-actions"],
          icon: "fas fa-trash-alt",
        },
      ],
      scriptActions: [
        {
          value: "edit-script",
          content: "Edit Script",
          link: true,
          href: "/designer/scripts/{{id}}/builder",
          permission: ["edit-scripts", "view-additional-asset-actions"],
          icon: "fas fa-pen-square",
        },
        {
          value: "edit-item",
          content: "Configure",
          link: true,
          href: "/designer/scripts/{{id}}/edit",
          permission: ["edit-scripts", "view-additional-asset-actions"],
          icon: "fas fa-cog",
        },
        {
          value: "add-to-project",
          content: "Add to Project",
          icon: "fas fa-folder-plus",
          permission: "create-projects",
        },
        {
          value: "duplicate-item",
          content: "Copy",
          permission: ["create-scripts", "view-additional-asset-actions"],
          icon: "fas fa-copy",
        },
        {
          value: "remove-script",
          content: "Delete",
          permission: ["delete-scripts", "view-additional-asset-actions"],
          icon: "fas fa-trash-alt",
        },
      ],
      dataSourceActions: [
        {
          value: "edit-item",
          content: "Edit",
          icon: "fas fa-cog",
          permission: [
            "edit-data-sources",
            "view-data-sources",
            "view-additional-asset-actions"
          ],
        },
        {
          value: "add-to-project",
          content: "Add to Project",
          icon: "fas fa-folder-plus",
          permission: "create-projects",
        },
        {
          value: "remove-item",
          content: "Delete",
          icon: "fas fa-trash",
          permission: ["delete-data-sources", "view-additional-asset-actions"]
        },
      ],
      decisionTableActions: [
        {
          value: "edit-item",
          content: "Edit",
          icon: "fas fa-pen-square",
          permission: [
            "edit-decision_tables",
            "view-additional-asset-actions"
          ]
        },
        {
          value: "configure-item",
          content: "Configure",
          icon: "fas fa-cog",
          permission: [
            "edit-decision_tables",
            "view-additional-asset-actions"
          ]
        },
        {
          value: "add-to-project",
          content: "Add to Project",
          icon: "fas fa-folder-plus",
          permission: "create-projects",
        },
        {
          value: "export-item",
          content: "Export",
          icon: "fas fa-file-export",
          permission: ["export-decision_tables", "view-additional-asset-actions"]
        },
        {
          value: "remove-item",
          content: "Delete",
          icon: "fas fa-trash",
          permission: ["delete-decision_tables", "view-additional-asset-actions"]
        },
      ],
      myTemplateActions: [
        //TODO: Update My Template Ellipsis Menu Actions
        {
          value: "edit-template",
          content: "Edit Template",
          permission: ["edit-screens"],
          icon: "fas fa-pen-square",
        },
        {
          value: "make-public",
          content: "Make Public",
          link: true,
          href: "/designer/screens/{{id}}/edit",
          permission: "publish-screen-templates",
          icon: "fas fa-globe",
        },
        {
          value: "export-item",
          content: "Export Template",
          link: true,
          href: "/designer/screens/{{id}}/export",
          permission: ["export-screens"],
          icon: "fas fa-file-export",
        },
        {
          value: "delete-template",
          content: "Delete Template",
          permission: ["delete-screens"],
          icon: "fas fa-trash-alt",
        },
      ],
      publicTemplateActions: [
        //TODO: Update Public Template Ellipsis Menu Actions
        {
          value: "edit-template",
          content: "Edit Template",
          permission: ["edit-screens"],
          icon: "fas fa-pen-square",
        },
        {
          value: "export-item",
          content: "Export Template",
          link: true,
          href: "/designer/screens/{{id}}/export",
          permission: ["export-screens"],
          icon: "fas fa-file-export",
        },
        {
          value: "delete-template",
          content: "Delete Template",
          permission: ["publish-screen-templates"],
          icon: "fas fa-trash-alt",
        },
      ],
    };
  },
};
