export default function flowParser(flowDefinition) {
  var result = {
      flow: [],
      errors: []
  };
  try {
    result['flow'] = FlowGrammar.parse(flowDefinition);
  }
  catch(e) {
      result['errors'] = [{
          title: "Line " + e.location.start.line + ": syntax error",
          detail: e.message
      }];
  }
  return result;
}
