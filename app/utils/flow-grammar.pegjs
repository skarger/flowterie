FlowStatementList
 = flow_stmts:(FlowStatement)* {
    return flow_stmts.reduce(
      function(acc, cur) { return acc.concat(cur) }, []
    );
   }

FlowStatement
 = Transition / task_decl:TaskDecl { return [task_decl]; }

Transition
 = from:TransitionStart to:TransitionTarget {
   return [
     from,
     {
      type: "transition",
      from: from.id,
      to: to.id,
     },
     to
   ];
 }

TransitionStart
 = from:TaskDecl { return from; }

TransitionTarget
 = TransitionOp to:TaskDecl { return to; }

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
