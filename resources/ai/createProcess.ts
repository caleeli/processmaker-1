// a role can start a process
function startEvent(name: string, role: string): ID { }
// // display a screen to a role so he can do an action, or select an option
function userTask(name: string, role: string, outputVariables: string[]): ID { }
function scriptTask(name: string): ID { }
function serviceTask(name: string, url: string, method: string): ID { }
function endEvent(name: string, cancelProcess: boolean = false): ID { }
function ifVariable(variable: string, cases: { value: any, cb: () => void, goBackTo: ID | undefined }[]): ID { }
/*
  Simple process example

  A student can register to a course, then the coordinator can approve or reject the registration
*/
// START:
startEvent("Start", "Student");
userTask("Register to course", "Student", ["course"]);
let approveRegistration = userTask("Approve registration", "Coordinator", ["approved"]);
ifVariable("approved", [
    { value: true, cb: () => { serviceTask("Send confirmation email", "http://localhost:3000/email", "POST"); } },
    { value: false, cb: () => { serviceTask("Send rejection email", "http://localhost:3000/email", "POST"); }, goBackTo: approveRegistration }
]);
endEvent("End", "Student");
// END.

/*
  {{title}}

  {{description}}
*/