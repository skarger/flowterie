export default function flowGraphviz(flowStatements) {
  let graphvizDot = ''

  if (flowStatements.length > 0) {
    graphvizDot += 'digraph Flow { rankdir="LR"\n';
  }

  flowStatements.forEach(function(flowStatement) {
    if (flowStatement.type === 'task_decl') {
      graphvizDot += flowStatement.id + ' [label="' + flowStatement.label + '"]\n';
    }
    if (flowStatement.type === 'transition') {
      graphvizDot += flowStatement.from + ' -> ' + flowStatement.to + '\n';
    }
  });

  if (flowStatements.length > 0) { graphvizDot += '}'; }

  return graphvizDot;
}
