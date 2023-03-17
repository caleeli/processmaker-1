@extends('layouts.layout')

@section('title')
{{__('AI configs')}}
@endsection

@section('sidebar')
@include('layouts.sidebar', ['sidebar'=> Menu::get('sidebar_processes')])
@endsection

@section('breadcrumbs')
@include('shared.breadcrumbs', ['routes' => [
__('Admin') => route('admin.index'),
__('AI configs') => null,
]])
@endsection
@section('content')
<div id="ai-configs" class="px-3">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-item nav-link active" id="nav-users-tab" data-toggle="tab" href="#nav-users" role="tab"
                onclick="loadUsers()" aria-controls="nav-users" aria-selected="true">
                {{ __('Create Process Model') }}
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-item nav-link" id="nav-deleted-users-tab" data-toggle="tab" href="#nav-deleted-users"
                role="tab" onclick="loadDeletedUsers()" aria-controls="nav-deleted-users" aria-selected="true">
                {{ __('Create a Data Connector') }}
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-item nav-link" id="nav-deleted-users-tab" data-toggle="tab" href="#nav-deleted-users"
                role="tab" onclick="loadDeletedUsers()" aria-controls="nav-deleted-users" aria-selected="true">
                {{ __('Identify high-priority emails') }}
            </a>
        </li>
    </ul>

    <div>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
                <ai-configs></ai-configs>

                <div  class="card col-6 offset-3 mt-3 p-0">
                    <div  class="card-body">
                        <div  class="ai-configs">
                            <h5 >Models ratings</h5>
                            <table  class="table">
                                <thead >
                                    <tr >
                                        <th  scope="col">Model</th>
                                        <th  scope="col">Version</th>
                                        <th  scope="col">F1 Score</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr >
                                        <th scope="col">Create-Process</th>
                                        <th scope="col">v1</th>
                                        <th scope="col">90%</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="card col-8 offset-2 mt-2 p-0">
                    <div class="card-body">
                        <div class="ai-configs">
                            <h5>Prompt Examples</h5>
                            <table class="table" style="width:100%">
                                <thead>
                                    <tr>
                                        <th scope="col">Description</th>
                                        <th scope="col">Process</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <small>
                                                <p><b>Category:</b> Banking</p>
                                                <p><b>Simplified Account opening</b></p>
                                                This process coordinates the necessary actions for opening an account
                                                between a banker, customer, branch and system.
                                                The Banker starts a request and fill the Business Account Information
                                                Form.
                                                Then the System processes in a script this information and the Banker
                                                fills in the Application Form
                                                The Banker decides how to complete the consumer's registration.
                                                If the Banker decides to Send To Customer, then the Customer fills the
                                                Create User Profile Form, the Complete Application Form and People
                                                Associated.
                                                If the Banker decides to complete In Person, the customer fill the
                                                People Associated Form.
                                                The System process in a script the account application information.
                                                Then the Banker Review the Application.
                                                If the Banker approves the application, then the Branch create the
                                                account, the System runs a script that Streaming the Data and runs
                                                another script that Save Data to Collections, then the Customer will
                                                receive an Welcome Email and the application ends as approved.
                                                If the Banker declines the application, then the Customer will receive
                                                an Declines Notification and the request ends as cancelled.
                                            </small>
                                        </td>
                                        <td>
                                            <h5>Pseudo code</h5>
                                            <pre style="font-size:8pt; width: 30rem; overflow:auto">
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
            engine.emailTask("Welcome Email", "Customer", "{ {account.email} }", "Your application was approved");
            engine.endEvent("Application Approved", false);
        }
    },
    {
        value: false, cb: () => {
            engine.emailTask("Declined Notification", "Customer", "{ {account.email} }", "Your application was declined");
            engine.endEvent("Application Declined", true);
        }
    }
]);
<b class="badge badge-success">// END.</b>
</pre>
                                            <img src="/processes-img/Banking-SimplifiedAccountOpening.png" width="340">
                                        </td>
                                    </tr>


                                    <tr>
                                        <td>
                                            <small>
                                                <p><b>Category:</b> Human Resources</p>
                                                <p><b>Employee Onboarding</b></p>
                                                The HR start a Onboarding Request and fill out the Checklist Form.
                                                The IR work on IT Checklist Task.
                                                The Facility work on Facility Checklist Task.
                                                The HR review the Onboarding Information.
                                                The new Employee receives an email with the Onboarding Information and
                                                the request ends.
                                            </small>
                                        </td>
                                        <td>
                                            <h5>Pseudo code</h5>
                                            <pre style="font-size:8pt; width: 30rem; overflow:auto">
engine.startEvent("Start Onboarding Request", "HR");
engine.userTask("Fill Out Checklist Form", "HR", ["itChecklist", "facilityChecklist", "employee.email"]);
engine.userTask("IT Checklist", "IT", ["itChecklist"]);
engine.userTask("Facility Checklist", "Facility", ["facilityChecklist"]);
engine.userTask("Review", "HR", ["facilityChecklist"]);
engine.emailTask("Onboard Information", "Employee", "{ { employee.email } }", "Welcome, Job Onboarding is done!");
engine.endEvent("Employee Onboarded", false);
<b class="badge badge-success">// END.</b>
</pre>
                                            <img src="/processes-img/HR-EmployeeOnboarding.png" width="340">
                                        </td>
                                    </tr>


                                    <tr>
                                        <td>
                                            <small>
                                                <p><b>Category:</b> Education</p>
                                                <p><b>Student Charge Creation</b></p>
                                                <ol>
                                                    <li>I want to create a process to charge students.</li>
                                                    <li>This process creates a request to charge students. The Bursar's
                                                        office should review and approve or cancel the request. After
                                                        approved, the student receives an email with the charge details.
                                                    </li>
                                                    <li>Administrative departments can request the creation of a charge
                                                        for a student to the Bursar's office, such as to charge fees
                                                        related with Registration, Meals, Tuitions, and Housing. After a
                                                        request is submitted, the Bursar's office can approve or cancel
                                                        the request. If approved, the student receives an email with new
                                                        charge details.</li>
                                                    <li> The Administrative Department start a Charge Request and fill
                                                        out the form.</li>
                                                    The Bursar Office review the request.
                                                    If approved the Student receives an Approval Notification and the
                                                    requests ends.
                                                    If not approved the requests ends.
                                            </small>
                                        </td>
                                        <td>
                                            <h5>Pseudo code</h5>
                                            <pre style="font-size:8pt; width: 30rem; overflow:auto">
engine.startEvent("Start Onboarding Request", "HR");
engine.userTask("Fill Out Checklist Form", "HR", ["itChecklist", "facilityChecklist", "employee.email"]);
engine.userTask("IT Checklist", "IT", ["itChecklist"]);
engine.userTask("Facility Checklist", "Facility", ["facilityChecklist"]);
engine.userTask("Review", "HR", ["facilityChecklist"]);
engine.emailTask("Onboard Information", "Employee", "{ { employee.email } }", "Welcome, Job Onboarding is done!");
engine.endEvent("Employee Onboarded", false);
<b class="badge badge-success">// END.</b>
</pre>
                                            <img src="/processes-img/HR-EmployeeOnboarding.png" width="340">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade show" id="nav-deleted-users" role="tabpanel"
                aria-labelledby="nav-deleted-users-tab">
                <div class="card card-body p-3 border-top-0">
                    TODO...
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script src="{{mix('js/admin/ai/index.js')}}"></script>
@endsection