FlowStatementList
 = (FlowStatement)*

FlowStatement
 = TaskDecl

TaskDecl
 = id:TaskId label:TaskLabel? {
     label == null ? label = id : label = label;
     return {
      type: "task_decl",
      id: id,
      label: label
     };
   }

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
