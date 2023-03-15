// AVAILABLE FUNCTIONS:
const engine = {
  /**

  A function to start an event with the specified name and role.
  @param {string} name - The name of the event to start.
  @param {string} role - The role associated with the event.
  @returns {ID} - The ID of the event.
  */
  startEvent(name, role) {},
  /**

  A function to create a user task with the specified name, role, and output variables.
  @param {string} name - The name of the user task.
  @param {string} role - The role associated with the user task.
  @param {string[]} outputVariables - An array of output variable names.
  @returns {ID} - The ID of the user task.
  */
  userTask(name, role, outputVariables) {},
  /**

   A function to create a script task with the specified name.
   @param {string} name - The name of the script task.
   @param {string} role - The role associated with the user task.
   @returns {ID} - The ID of the script task.
   */
  scriptTask(name, role) {},
  /**

  A function to create a service task with the specified name, URL, and HTTP method.
  @param {string} name - The name of the service task.
  @param {string} url - The URL associated with the service task.
  @param {string} method - The HTTP method associated with the service task.
  @returns {ID} - The ID of the service task.
  */
  serviceTask(name, url, method) {},
  /**

   A function to create a email task with the specified name and role.
   @param {string} name - The name of the service task.
   @param {string} role - The role associated with the user task.
   @param {string} to - The user email that will receive the email.
   @param {string} subject - The subject of the email
   @returns {ID} - The ID of the service task.
   */
  emailTask(name, role, to, subject) {},
  /**

  A function to create an end event with the specified name and cancellation status.
  @param {string} name - The name of the end event.
  @param {boolean} cancelProcess - Whether to cancel the process when the event is triggered. Default is false.
  @returns {ID} - The ID of the end event.
  */
  endEvent(name, cancelProcess = false) {},
  /**

  A function to create a flow based on the value of a specified variable.
  @param {string} variable - The name of the variable to check.
  @param {Array<{ value: any, cb: () => void, goBackTo: ID | undefined }>} cases - An array of objects representing the different cases of the variable and their corresponding actions.
  @returns {ID} - The ID of the flow.
  */
  ifVariable(variable, cases) {},
};

// EXAMPLES:

/*
  The Administrative Department start a Charge Request and fill out the form.
  The Bursar Office review the request.
  If approved the Student receives an Approval Notification and the requests ends.
  If not approved the requests ends.
*/
engine.startEvent("Start Charge Request", "Administrative Department");
engine.userTask("Fill Out Charge Form", "Administrative Department", ["charge", "student.email"]);
engine.userTask("Review Charge", "Bursar", ["approved"]);
ifVariable("approved", [
    {
        value: true, cb: () => {
            engine.emailTask("Approval Notification", "Student", "{{student.email}}" , "This is the Approval Notification");
            engine.endEvent("Charge Approved", false);
        }
    },
    { value: false, cb: () => { engine.endEvent("Charge Rejected", true); } }
]);
// END.

/*
  The Student requests a change of major and fill a form.
  The Academic Advisor receives a notification to review the request.
  If the request is approved, the Registrar updates the Student Information System, the Student receives an Approval Notification and the request ends.
  If the request is rejected, the Student receives an Rejection Notification and the request ends.
*/
engine.startEvent("Start Change Of Major Request", "Student");
engine.userTask("Fill Out Change Of Major Form", "Student", ["change", "student.email"]);
engine.emailTask("Change Of Major Review Notification", "Academic Advisor", "{{student.email}}", "This is the Change Of Major Review Notification");
engine.userTask("Review Change Of Major Request", "Academic Advisor", ["approved"]);
ifVariable("approved", [
    {
        value: true, cb: () => {
            engine.userTask("Change Of Major In Student Information System", "Registrar", );
            engine.emailTask("Approval Notification", "Student", "{{student.email}}", "This is the Approval Notification");
            engine.endEvent("Change Of Major Approved", false);
        }
    },
    {
        value: false, cb: () => {
            engine.emailTask("Rejection Notification", "Student", "{{student.email}}", "This is the Rejection Notification");
            engine.endEvent("Change Of Major Rejected", true);
        }
    }
]);
// END.

/*
  The HR start a Onboarding Request and fill out the Checklist Form.
  The IR work on IT Checklist Task.
  The Facility work on Facility Checklist Task.
  The HR review the Onboarding Information.
  The new Employee receives an email with the Onboarding Information and the request ends.
*/
engine.startEvent("Start Onboarding Request", "HR");
engine.userTask("Fill Out Checklist Form", "HR", ["itChecklist", "facilityChecklist", "employee.email"]);
engine.userTask("IT Checklist", "IT", ["itChecklist"]);
engine.userTask("Facility Checklist", "Facility", ["facilityChecklist"]);
engine.userTask("Review", "HR", ["facilityChecklist"]);
engine.emailTask("Onboard Information", "Employee", "{{employee.email}}", "Welcome, Job Onboarding is done!");
engine.endEvent("Employee Onboarded", false);
// END.

/*
  The HR start a Offboarding Request and fill out the Checklist Form.
  The IT work on IT Checklist Task.
  The service task will call some external api to unsubscribe the user
  The Facility work on Facility Checklist Task.
  The HR review the Onboarding Information.
  The new Employee receives an email with the Onboarding Information and the request ends.
*/
engine.startEvent("Start Onboarding Request", "HR");
engine.userTask("Initiate Offboarding", "HR", ["itChecklist", "facilityChecklist"]);
engine.userTask("IT Checklist Verification", "IT", ["itChecklist"]);
engine.serviceTask("Delete user from Google", "/users/{userKey}", "DELETE");
engine.userTask("Facility Checklist Verification", "Facility", ["facilityChecklist"]);
engine.userTask("HR checklist Verification", "HR", ["facilityChecklist"]);
engine.endEvent("Employee Offboarding", false);
// END.

/*
 This process coordinates the necessary actions for opening an account between a banker, customer, branch and system.
 The Banker starts a request and fill the Business Account Information Form.
 Then the System processes in a script this information and the Banker fills in the Application Form
 The Banker decides how to complete the consumer's registration.
 If the Banker decides to Send To Customer, then the Customer fills the Create User Profile Form, the Complete Application Form and People Associated.
 If the Banker decides to complete In Person, the customer fill the People Associated Form.
 The System process in a script the account application information.
 Then the Banker Review the Application.
 If the Banker approves the application, then the Branch create the account, the System runs a script that Streaming the Data and runs another script that Save Data to Collections, then the Customer will receive an Welcome Email and the application ends as approved.
 If the Banker declines the application, then the Customer will receive an Declines Notification and the request ends as cancelled.
*/
engine.startEvent("Start Account Opening", "Banker");
engine.userTask("Fill Out Business Account Information", "Banker", ["accountInformation", "account.email"]);
engine.scriptTask("Process Business Account Information Data", "System");
engine.userTask("Banker Fills Application", "Banker", ["howToComplete"]);
engine.ifVariable("howToComplete", [
    {
        value: "Sent To Customer", cb: () => {
            engine.userTask("Create User Profile", "Customer", ["userProfile"]);
            engine.userTask("Complete Application", "Customer", ["accountInformation"]);
            engine.userTask("People Associated", "Customer", ["peopleAssociated"]);
        }
    },
    {
        value: "In-Person", cb: () => {
            engine.userTask("People Associated", "Customer", ["peopleAssociated"]);
        }
    }
]);
engine.scriptTask("Process Account Application", "System");
engine.userTask("Review Application", "Banker", ["approved"]);
engine.ifVariable("approved", [
    {
        value: true, cb: () => {
            engine.userTask("Board Account", "Branch", ["accountInformation"]);
            engine.scriptTask("Streaming Data", "System");
            engine.scriptTask("Save Data To Collections", "System");
            engine.emailTask("Welcome Email", "Customer", "{{account.email}}", "Your application was approved");
            engine.endEvent("Application Approved", false);
        }
    },
    {
        value: false, cb: () => {
            engine.emailTask("Declined Notification", "Customer", "{{account.email}}", "Your application was declined");
            engine.endEvent("Application Declined", true);
        }
    }
]);
// END.

/*
  {{description}}
*/