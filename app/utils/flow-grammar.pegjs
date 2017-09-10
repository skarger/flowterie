FlowStatementList
 = flowStmts:(FlowStatement)* {
    return flowStmts.reduce(
      function(acc, cur) { return acc.concat(cur) }, []
    );
   }

FlowStatement
 = Transition / taskDecl:TaskDecl { return [taskDecl]; }

Transition
 = from:TransitionStart to:TransitionTarget {
   return [
     from,
     {
      type: "transition",
      from: from.id,
      to: to[0].id,
     }
   ].concat(to);
 }

TransitionStart
 = from:TaskDecl { return from; }

TransitionTarget
 = TransitionOp to:TaskDecl andThenTo:TransitionTarget? {
    var rv = [to];
    if (andThenTo !== null) {
      rv = rv.concat({ type: "transition", from: to.id, to: andThenTo[0].id });
      rv = rv.concat(andThenTo);
    }
    return rv;
   }

TransitionOp
 = _ '->' _

TaskDecl
 = id:TaskId label:TaskLabel? start:Start? {
     label === null ? label = id : label = label;
     start !== null ? start = true : start = false;
     var rv = {
      type: "task_decl",
      id: id,
      label: label
     };
     if (start) {
       rv['start'] = true;
     }
     return rv;
   }

Start
 = "start" _

TaskId
 = chars:TaskIdChars+ _ { return chars.join("") }

TaskLabel
  = '"'chars:TaskLabelChars+'"' _ { return chars.join(""); }
  / "'"chars:TaskLabelChars+"'" _ { return chars.join(""); }

TaskIdChars
 = [-_0-9A-Za-z:]

 TaskLabelChars
 = TaskIdChars / ' '

_ "whitespace"
  = [ \t\n\r]*
