Tasks
 = (TaskId / TaskLabel)*

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
