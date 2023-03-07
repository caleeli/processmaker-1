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
  @returns {ID} - The ID of the script task.
  */
  scriptTask(name) {},
  /**

  A function to create a service task with the specified name, URL, and HTTP method.
  @param {string} name - The name of the service task.
  @param {string} url - The URL associated with the service task.
  @param {string} method - The HTTP method associated with the service task.
  @returns {ID} - The ID of the service task.
  */
  serviceTask(name, url, method) {},
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
  Register to a course, be approved by a coordinator and send an email to the student
*/
engine.startEvent("Start", "Student");
engine.userTask("Register to course", "Student", ["course"]);
let approveRegistration = engine.userTask("Approve registration", "Coordinator", ["approved"]);
ifVariable("approved", [
    { value: true, cb: () => { engine.serviceTask("Send confirmation email", "/email", "POST"); } },
    { value: false, cb: () => { engine.serviceTask("Send rejection email", "/email", "POST"); }, goBackTo: approveRegistration }
]);
// END.

/*
  The account opening process flow involves collecting information from the customer, verifying their identity, and setting up the account in the bank's systems. This typically includes completing an application, providing identification documents, and setting up any required account services, such as a debit card or online banking access.
*/
engine.startEvent("Start", "Customer");
engine.userTask("Collect information", "Customer", ["information"]);
engine.userTask("Verify identity", "Bank", ["verified"]);
ifVariable("verified", [
    { value: true, cb: () => { engine.serviceTask("Set up account", "/account", "POST"); } },
    { value: false, cb: () => { engine.serviceTask("Reject application", "/application", "POST"); } }
]);
engine.endEvent("End", false);
// END.

/*
  {{description}}
*/