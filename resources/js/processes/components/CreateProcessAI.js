export default function createProcessAI(code) {
  // Declare variables
  let currentCol = 0;
  let previousElement = "";
  let connectionCondition = "";
  // let goClosestNextRow = false;
  const connections = [];
  let bpmn;
  // let definitions: any;
  let processName;
  let process;
  let collaboration;
  let participant;
  let laneSet;
  let diagram;
  let plane;
  let participantShape;
  let participantBounds;
  const lanes = [];
  const elementsIndex = [];
  let inc = 0;
  function autoInc() {
    inc += 1;
    return inc;
  }
  function createBpmn() {
    const doc = document.implementation.createDocument(
      "http://www.omg.org/spec/BPMN/20100524/MODEL",
      "definitions",
    );
    const root = doc.documentElement;
    root.setAttribute("xmlns:bpmndi", "http://www.omg.org/spec/BPMN/20100524/DI");
    root.setAttribute("xmlns:dc", "http://www.omg.org/spec/DD/20100524/DC");
    root.setAttribute("xmlns:di", "http://www.omg.org/spec/DD/20100524/DI");
    root.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    root.setAttribute("targetNamespace", "http://bpmn.io/schema/bpmn");
    root.setAttribute(
      "xsi:schemaLocation",
      "http://www.omg.org/spec/BPMN/20100524/MODEL http://bpmn.sourceforge.net/schemas/BPMN20.xsd",
    );
    return doc;
  }
  function nameToId(name) {
    return name.replace(/\W/g, "_");
  }
  function findOrCreateLane(role) {
    const found = lanes.find((lane) => lane.role === role);
    if (!found) {
      const id = nameToId(role);
      // create lane
      const lane = bpmn.createElement("lane");
      lane.setAttribute("id", id);
      lane.setAttribute("name", role);
      laneSet.appendChild(lane);
      // create BPMNShape for participant
      const laneShape = bpmn.createElement("bpmndi:BPMNShape");
      laneShape.setAttribute("id", `${id}Shape`);
      laneShape.setAttribute("bpmnElement", id);
      const bounds = bpmn.createElement("dc:Bounds");
      laneShape.appendChild(bounds);
      plane.appendChild(laneShape);
      const newLane = {
        role,
        currentRow: 0,
        bounds,
        items: [],
      };
      lanes.push(newLane);
      return newLane;
    }
    return found;
  }
  function findPreviousRole() {
    const allItems = lanes
      .map((lane) => lane.items)
      .reduce((a, b) => a.concat(b), []);
    const elementItem = allItems.find((item) => item.id === previousElement);
    const role = elementItem ? elementItem.role : "";
    return role;
  }
  function checkId(idOrName) {
    let element = bpmn.getElementById(idOrName);
    if (!element) {
      const elementId = elementsIndex.find((item) => item.name === idOrName).id;
      element = bpmn.getElementById(elementId);
    }
    return element.getAttribute("id");
  }
  function connectWithCondition(source, target, condition = "", isGoBack = false) {
    const targetElement = bpmn.getElementById(target);
    const sourceElement = bpmn.getElementById(source);
    // check if source is not an end event
    if (sourceElement.tagName === "endEvent") {
      return;
    }
    // check if target is not a start event
    if (targetElement.tagName === "startEvent") {
      return;
    }
    const id = nameToId(source + target);
    const sequenceFlow = bpmn.createElement("sequenceFlow");
    sequenceFlow.setAttribute("id", id);
    sequenceFlow.setAttribute("sourceRef", source);
    sequenceFlow.setAttribute("targetRef", target);
    // add conditionExpression
    if (condition) {
      sequenceFlow.setAttribute("name", condition);
      const conditionExpression = bpmn.createElement("conditionExpression");
      conditionExpression.setAttribute("xsi:type", "tFormalExpression");
      conditionExpression.textContent = condition;
      sequenceFlow.appendChild(conditionExpression);
    }
    process.appendChild(sequenceFlow);
    // create BPMNEdge for sequence flow
    const sequenceFlowEdge = bpmn.createElement("bpmndi:BPMNEdge");
    sequenceFlowEdge.setAttribute("id", `${id}Edge`);
    sequenceFlowEdge.setAttribute("bpmnElement", id);
    plane.appendChild(sequenceFlowEdge);
    connections.push({
      source,
      target,
      edge: sequenceFlowEdge,
      isGoBack,
    });
  }
  function addToLane(id, name, role, item, previousElements = null) {
    elementsIndex.push({ id, name, role, bounds: item });
    const lane = findOrCreateLane(role);
    const itemAdded = {
      id, role, row: lane.currentRow, col: currentCol, item,
    };
    // check if (row, col) in lane is already occupied
    while (
      lane.items.find(
        (itm) => itm.row === itemAdded.row && itm.col === itemAdded.col,
      )
    ) {
      // if so, go to next row
      lane.currentRow += 1;
      itemAdded.row = lane.currentRow;
    }
    lane.items.push(itemAdded);
    currentCol += 1;
    if (previousElements) {
      previousElements.forEach((prevElem) => {
        connectWithCondition(prevElem, id, connectionCondition);
      });
      connectionCondition = "";
    } else if (previousElement) {
      connectWithCondition(previousElement, id, connectionCondition);
      connectionCondition = "";
    }
    previousElement = id;
  }
  // a role can start a process
  function startEvent(name, role) {
    const id = nameToId(name + role + autoInc());
    const width = 36;
    const height = 36;
    // create start event
    const startEventNode = bpmn.createElement("startEvent");
    startEventNode.setAttribute("id", id);
    startEventNode.setAttribute("name", name);
    process.appendChild(startEventNode);
    // create BPMNShape for start event
    const startEventShape = bpmn.createElement("bpmndi:BPMNShape");
    startEventShape.setAttribute("id", `${id}Shape`);
    startEventShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    startEventShape.appendChild(bounds);
    plane.appendChild(startEventShape);
    addToLane(id, name, role, bounds);
    return id;
  }
  // display a screen to a role so he can do an action, or select an option
  function userTask(name, role, outputVariables) {
    const id = nameToId(name + role + autoInc());
    const width = 100;
    const height = 80;
    // create user task
    const userTaskNode = bpmn.createElement("userTask");
    userTaskNode.setAttribute("id", id);
    userTaskNode.setAttribute("name", name);
    process.appendChild(userTaskNode);
    // create BPMNShape for user task
    const userTaskShape = bpmn.createElement("bpmndi:BPMNShape");
    userTaskShape.setAttribute("id", `${id}Shape`);
    userTaskShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    userTaskShape.appendChild(bounds);
    plane.appendChild(userTaskShape);
    addToLane(id, name, role, bounds);
    return id;
  }
  function scriptTask(name) {
    const role = findPreviousRole();
    const id = nameToId(name + role + autoInc());
    const width = 100;
    const height = 80;
    // create script task
    const scriptTaskNode = bpmn.createElement("scriptTask");
    scriptTaskNode.setAttribute("id", id);
    scriptTaskNode.setAttribute("name", name);
    process.appendChild(scriptTaskNode);
    // create BPMNShape for script task
    const scriptTaskShape = bpmn.createElement("bpmndi:BPMNShape");
    scriptTaskShape.setAttribute("id", `${id}Shape`);
    scriptTaskShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    scriptTaskShape.appendChild(bounds);
    plane.appendChild(scriptTaskShape);
    addToLane(id, name, role, bounds);
    return id;
  }
  function emailTask(name, role, subject) {
    const rolePrevious = findPreviousRole();
    const id = nameToId(name + rolePrevious + autoInc());
    const width = 100;
    const height = 80;
    // create script task
    const emailTaskNode = bpmn.createElement("serviceTask");
    emailTaskNode.setAttribute("id", id);
    emailTaskNode.setAttribute("name", name);
    emailTaskNode.setAttribute("implementation", "connector-send-email/processmaker-communication-email-send");
    emailTaskNode.setAttribute("pm:config", "{&#34;emailServer&#34;:&#34;&#34;,&#34;type&#34;:&#34;text&#34;,&#34;subject&#34;:&#34;Confirmation Email&#34;,&#34;textBody&#34;:&#34;Confirmation Email&#34;,&#34;screenRef&#34;:null,&#34;users&#34;:[],&#34;groups&#34;:[],&#34;toRecipients&#34;:[],&#34;ccRecipients&#34;:[],&#34;bccRecipients&#34;:[],&#34;i&#34;:2}");
    process.appendChild(emailTaskNode);
    // create BPMNShape for script task
    const emailTaskShape = bpmn.createElement("bpmndi:BPMNShape");
    emailTaskShape.setAttribute("id", `${id}Shape`);
    emailTaskShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    emailTaskShape.appendChild(bounds);
    plane.appendChild(emailTaskShape);
    addToLane(id, name, rolePrevious, bounds);
    return id;
  }
  function serviceTask(name, url, method) {
    const role = findPreviousRole();
    const id = nameToId(name + role + autoInc());
    const width = 100;
    const height = 80;
    // create service task
    const serviceTaskNode = bpmn.createElement("serviceTask");
    serviceTaskNode.setAttribute("id", id);
    serviceTaskNode.setAttribute("name", name);
    serviceTaskNode.setAttribute("implementation", url);
    process.appendChild(serviceTaskNode);
    // create BPMNShape for service task
    const serviceTaskShape = bpmn.createElement("bpmndi:BPMNShape");
    serviceTaskShape.setAttribute("id", `${id}Shape`);
    serviceTaskShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    serviceTaskShape.appendChild(bounds);
    plane.appendChild(serviceTaskShape);
    addToLane(id, name, role, bounds);
    return id;
  }
  function endEvent(name, killAllThreads = false) {
    const role = findPreviousRole();
    const id = nameToId(name + role + autoInc());
    const width = 36;
    const height = 36;
    // create end event
    const endEventNode = bpmn.createElement("endEvent");
    endEventNode.setAttribute("id", id);
    endEventNode.setAttribute("name", name);
    process.appendChild(endEventNode);
    // create BPMNShape for end event
    const endEventShape = bpmn.createElement("bpmndi:BPMNShape");
    endEventShape.setAttribute("id", `${id}Shape`);
    endEventShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    endEventShape.appendChild(bounds);
    // add terminateEventDefinition if killAllThreads is true
    if (killAllThreads) {
      const cancelEventDefinition = bpmn.createElement("terminateEventDefinition");
      endEventNode.appendChild(cancelEventDefinition);
      process.appendChild(endEventNode);
    }
    plane.appendChild(endEventShape);
    addToLane(id, name, role, bounds);
    return id;
  }
  function exitProcess(name) {
    const role = findPreviousRole();
    const id = nameToId(name + role + autoInc());
    const width = 36;
    const height = 36;
    // create end event
    const endEventNode = bpmn.createElement("endEvent");
    endEventNode.setAttribute("id", id);
    endEventNode.setAttribute("name", name);
    // add cancelEventDefinition
    const cancelEventDefinition = bpmn.createElement("terminateEventDefinition");
    endEventNode.appendChild(cancelEventDefinition);
    process.appendChild(endEventNode);
    // create BPMNShape for end event
    const endEventShape = bpmn.createElement("bpmndi:BPMNShape");
    endEventShape.setAttribute("id", `${id}Shape`);
    endEventShape.setAttribute("bpmnElement", id);
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    endEventShape.appendChild(bounds);
    plane.appendChild(endEventShape);
    addToLane(id, name, role, bounds);
    return id;
  }
  function waitAnyOneOf(callback) {
    const option = callback();
    return option;
  }
  function ifValue(value, role, cases) { }
  function addGateway(id, role, variable, previousElements = null) {
    const width = 50;
    const height = 50;
    // create exclusive gateway
    const exclusiveGateway = bpmn.createElement("exclusiveGateway");
    exclusiveGateway.setAttribute("id", id);
    if (variable) {
      exclusiveGateway.setAttribute("name", variable);
    }
    process.appendChild(exclusiveGateway);
    // create BPMNShape for exclusive gateway
    const exclusiveGatewayShape = bpmn.createElement("bpmndi:BPMNShape");
    exclusiveGatewayShape.setAttribute("id", `${id}Shape`);
    exclusiveGatewayShape.setAttribute("bpmnElement", id);
    exclusiveGatewayShape.setAttribute("isMarkerVisible", "true");
    const bounds = bpmn.createElement("dc:Bounds");
    bounds.setAttribute("width", String(width));
    bounds.setAttribute("height", String(height));
    exclusiveGatewayShape.appendChild(bounds);
    plane.appendChild(exclusiveGatewayShape);
    addToLane(id, name, role, bounds, previousElements);
    return id;
  }
  function goBack(id) {
    if (previousElement) {
      connectWithCondition(previousElement, id, connectionCondition, true);
      connectionCondition = "";
      previousElement = null;
    }
  }
  function ifVariable(variable, cases) {
    // get role of the previous element
    // const element = bpmn.getElementById(previousElement);
    const allItems = lanes
      .map((lane) => lane.items)
      .reduce((a, b) => a.concat(b), []);
    const elementItem = allItems.find((item) => item.id === previousElement);
    const role = elementItem ? elementItem.role : "";
    const id = nameToId(variable + role + autoInc());
    addGateway(id, role, variable);
    const alignCol = currentCol + 1;
    const lastElements = [];
    let maxCol = alignCol;
    cases.forEach(({ value, cb, goBackTo }, index) => {
      currentCol = alignCol;
      previousElement = id;
      if (typeof value === "string" && value.startsWith(">")) {
        connectionCondition = `${variable}${value}`;
      } else if (typeof value === "string" && value.startsWith("<")) {
        connectionCondition = `${variable}${value}`;
      } else if (typeof value === "string" && value.startsWith("==")) {
        connectionCondition = `${variable}${value}`;
      } else if (typeof value === "string" && value.startsWith("=")) {
        connectionCondition = `${variable}=${value}`;
      } else {
        connectionCondition = `${variable}==${JSON.stringify(value)}`;
      }
      cb();
      if (goBackTo) {
        goBack(checkId(goBackTo));
      }
      // check if previousElement is not an endEvent
      if (previousElement) {
        const elem = bpmn.getElementById(previousElement);
        if (elem.tagName !== "endEvent") {
          lastElements.push(previousElement);
        }
      }
      if (currentCol > maxCol) {
        maxCol = currentCol;
      }
    });
    // add merge gateway
    currentCol = maxCol;
    if (lastElements.length > 1) {
      addGateway(`${id}Merge`, role, "", lastElements);
    } else if (lastElements.length === 1) {
      [previousElement] = lastElements;
    }
    return id;
  }
  function saveProcess() {
    // arrange items in lanes
    let laneY = 0;
    let maxCol = 0;
    lanes.forEach((lane) => {
      lane.items.forEach((item) => {
        if (item.col > maxCol) {
          maxCol = item.col;
        }
      });
    });
    const poolTitleWidth = 30;
    const marginLeft = 30;
    const marginTop = 30;
    lanes.forEach((lane) => {
      let maxRow = 0;
      lane.items.forEach((item) => {
        const width = parseInt(item.item.getAttribute("width"), 10);
        const height = parseInt(item.item.getAttribute("height"), 10);
        item.item.setAttribute(
          "x",
          String(marginLeft + (item.col + 0.5) * 150 - width / 2),
        );
        item.item.setAttribute(
          "y",
          String(marginTop + laneY + (item.row + 0.5) * 100 - height / 2),
        );
        if (item.col > maxCol) {
          maxCol = item.col;
        }
        if (item.row > maxRow) {
          maxRow = item.row;
        }
      });
      lane.bounds.setAttribute("x", String(poolTitleWidth));
      lane.bounds.setAttribute("y", String(laneY));
      lane.bounds.setAttribute("width", String(marginLeft + (maxCol + 1) * 150));
      lane.bounds.setAttribute("height", String(marginTop + (maxRow + 1) * 100));
      laneY += marginTop + (maxRow + 1) * 100;
    });
    const totalWidth = poolTitleWidth + marginLeft + (maxCol + 1) * 150;
    const totalHeight = laneY;
    participantBounds.setAttribute("width", String(totalWidth));
    participantBounds.setAttribute("height", String(totalHeight));
    // add waypoints to connections
    connections.forEach(({ source, target, edge, isGoBack }) => {
      // add waypoints
      const allItems = lanes
        .map((lane) => lane.items)
        .reduce((a, b) => a.concat(b), []);
      const sourceItem = allItems.find((item) => item.id === source);
      const targetItem = allItems.find((item) => item.id === target);
      const sourceX = parseInt(sourceItem.item.getAttribute("x"), 10)
        + parseInt(sourceItem.item.getAttribute("width"), 10);
      const sourceY = parseInt(sourceItem.item.getAttribute("y"), 10)
        + parseInt(sourceItem.item.getAttribute("height"), 10) / 2;
      const targetX = parseInt(targetItem.item.getAttribute("x"), 10);
      const targetHeight = parseInt(targetItem.item.getAttribute("height"), 10);
      const targetWidth = parseInt(targetItem.item.getAttribute("width"), 10);
      const targetY = parseInt(targetItem.item.getAttribute("y"), 10)
        + targetHeight / 2;
      const waypoint1 = bpmn.createElement("di:waypoint");
      waypoint1.setAttribute("x", String(sourceX));
      waypoint1.setAttribute("y", String(sourceY));
      edge.appendChild(waypoint1);
      if (isGoBack) {
        const eight = marginTop / 2;
        const waypointPlus8 = bpmn.createElement("di:waypoint");
        waypointPlus8.setAttribute("x", String(sourceX + eight));
        waypointPlus8.setAttribute("y", String(sourceY));
        edge.appendChild(waypointPlus8);
        const waypointSourcePlus8TargetMinus8 = bpmn.createElement("di:waypoint");
        waypointSourcePlus8TargetMinus8.setAttribute("x", String(sourceX + eight));
        waypointSourcePlus8TargetMinus8.setAttribute("y", String(targetY - targetHeight / 2 - eight));
        edge.appendChild(waypointSourcePlus8TargetMinus8);
        const waypointTargetMinus8 = bpmn.createElement("di:waypoint");
        waypointTargetMinus8.setAttribute("x", String(targetX + targetWidth / 2));
        waypointTargetMinus8.setAttribute("y", String(targetY - targetHeight / 2 - eight));
        const waypointTargetMinus8Target = bpmn.createElement("di:waypoint");
        waypointTargetMinus8Target.setAttribute("x", String(targetX + targetWidth / 2));
        waypointTargetMinus8Target.setAttribute("y", String(targetY - targetHeight / 2 - eight));
        edge.appendChild(waypointTargetMinus8);

        const waypoint2 = bpmn.createElement("di:waypoint");
        waypoint2.setAttribute("x", String(targetX + targetWidth / 2));
        waypoint2.setAttribute("y", String(targetY - targetHeight / 2));
        edge.appendChild(waypoint2);
      } else {
        if (sourceY !== targetY) {
          const waypoint1_1 = bpmn.createElement("di:waypoint");
          const middleX = (sourceX + targetX) / 2;
          waypoint1_1.setAttribute("x", String(middleX));
          waypoint1_1.setAttribute("y", String(sourceY));
          edge.appendChild(waypoint1_1);
          const waypoint2_2 = bpmn.createElement("di:waypoint");
          waypoint2_2.setAttribute("x", String(middleX));
          waypoint2_2.setAttribute("y", String(targetY));
          edge.appendChild(waypoint2_2);
        }
        const waypoint2 = bpmn.createElement("di:waypoint");
        waypoint2.setAttribute("x", String(targetX));
        waypoint2.setAttribute("y", String(targetY));
        edge.appendChild(waypoint2);
      }
    });
    // save code
    let bpmnCode = new XMLSerializer().serializeToString(bpmn);
    bpmnCode = bpmnCode.replace(/xmlns=""/g, "");
    return { bpmn: bpmnCode, width: totalWidth, height: totalHeight };
  }
  function catchMessageEvent(name, role) { }
  function catchTimerEvent(name, role, isoDuration) { }
  function initProcess() {
    currentCol = 0;
    previousElement = "";
    connectionCondition = "";
    //  goClosestNextRow = false;
    connections.splice(0, connections.length);
    // create bpmn
    bpmn = createBpmn();
    //  definitions = bpmn.documentElement;
    // create default process
    processName = "process";
    process = bpmn.createElement("process");
    process.setAttribute("id", processName);
    process.setAttribute("isExecutable", "true");
    bpmn.documentElement.appendChild(process);
    // create collaboration
    collaboration = bpmn.createElement("collaboration");
    collaboration.setAttribute("id", "collaboration");
    collaboration.setAttribute("isClosed", "false");
    bpmn.documentElement.appendChild(collaboration);
    // create participant
    participant = bpmn.createElement("participant");
    participant.setAttribute("id", `${processName}Participant`);
    participant.setAttribute("name", `${processName}Participant`);
    participant.setAttribute("processRef", String(process.getAttribute("id")));
    collaboration.appendChild(participant);
    // create laneSet
    laneSet = bpmn.createElement("laneSet");
    laneSet.setAttribute("id", "laneSet");
    process.appendChild(laneSet);
    // create Diagram
    diagram = bpmn.createElement("bpmndi:BPMNDiagram");
    diagram.setAttribute("id", "diagram");
    bpmn.documentElement.appendChild(diagram);
    // create BPMNPlane
    plane = bpmn.createElement("bpmndi:BPMNPlane");
    plane.setAttribute("id", "plane");
    plane.setAttribute("bpmnElement", "collaboration");
    diagram.appendChild(plane);
    // create BPMNShape for participant
    participantShape = bpmn.createElement("bpmndi:BPMNShape");
    participantShape.setAttribute("id", `${processName}ParticipantShape`);
    participantShape.setAttribute(
      "bpmnElement",
      String(participant.getAttribute("id")),
    );
    participantShape.setAttribute("isHorizontal", "true");
    participantShape.setAttribute("isExpanded", "true");
    participantBounds = bpmn.createElement("dc:Bounds");
    participantBounds.setAttribute("x", "0");
    participantBounds.setAttribute("y", "0");
    participantShape.appendChild(participantBounds);
    plane.appendChild(participantShape);
  }
  initProcess();
  // Create a Proxy to catch all calls to the engine
  const engine = new Proxy(
    {
      startEvent: startEvent,
      endEvent: endEvent,
      userTask: userTask,
      serviceTask: serviceTask,
      scriptTask: scriptTask,
      ifVariable: ifVariable,
      emailTask: emailTask,
    },
    {
      get(target, propKey, receiver) {
        const origMethod = target[propKey];
        if (origMethod === undefined) {
          console.log(`Method ${propKey} does not exist`);
        }
        return origMethod;
      },
    }
  );
  // eslint-disable-next-line no-eval
  eval(code);
  return saveProcess();
}
