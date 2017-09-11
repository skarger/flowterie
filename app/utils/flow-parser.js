export default function flowParser(flowDefinition) {
  var result = {
      flow: [],
      errors: []
  };
  try {
    result['flow'] = dedupe(FlowGrammar.parse(flowDefinition));
  }
  catch(e) {
      result['errors'] = [{
          title: "Line " + e.location.start.line + ": syntax error",
          detail: e.message
      }];
  }
  return result;
}

function dedupe(parsedFlow) {
  let dedupedFlow = [];
  let taskIds = {};
  let transitions = {};
  parsedFlow.forEach(function(flowStatement) {
    if (flowStatement.type === "transition") {
      let transitionId = flowStatement.from + '->' + flowStatement.to;
      if (transitionId in transitions) {
        return;
      } else {
        transitions[transitionId] = true;
      }
    }
    if (flowStatement.type === "task_decl") {
      let taskId = flowStatement.id;
      if (taskId in taskIds) {
        if (flowStatement.label !== taskId) {
          taskIds[taskId].label = flowStatement.label;
        }
        if (flowStatement.start) {
          taskIds[taskId].start = true;
        }
        return;
      } else {
        taskIds[taskId] = flowStatement;
      }
    }
    dedupedFlow.push(flowStatement);
  });
  return dedupedFlow;
}
