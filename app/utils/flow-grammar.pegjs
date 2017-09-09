FlowStatementList
 = (FlowStatement)*

FlowStatement
 = TaskDecl

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
