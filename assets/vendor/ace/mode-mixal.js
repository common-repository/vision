define("ace/mode/mixal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";function l(){function r(e){return e&&-1<e.search(/^[A-Z\u0394\u03a0\u03a30-9]{1,10}$/)&&-1<e.search(/[A-Z\u0394\u03a0\u03a3]/)}function n(e){return e&&-1<["NOP","ADD","FADD","SUB","FSUB","MUL","FMUL","DIV","FDIV","NUM","CHAR","HLT","SLA","SRA","SLAX","SRAX","SLC","SRC","MOVE","LDA","LD1","LD2","LD3","LD4","LD5","LD6","LDX","LDAN","LD1N","LD2N","LD3N","LD4N","LD5N","LD6N","LDXN","STA","ST1","ST2","ST3","ST4","ST5","ST6","STX","STJ","STZ","JBUS","IOC","IN","OUT","JRED","JMP","JSJ","JOV","JNOV","JL","JE","JG","JGE","JNE","JLE","JAN","JAZ","JAP","JANN","JANZ","JANP","J1N","J1Z","J1P","J1NN","J1NZ","J1NP","J2N","J2Z","J2P","J2NN","J2NZ","J2NP","J3N","J3Z","J3P","J3NN","J3NZ","J3NP","J4N","J4Z","J4P","J4NN","J4NZ","J4NP","J5N","J5Z","J5P","J5NN","J5NZ","J5NP","J6N","J6Z","J6P","J6NN","J6NZ","J6NP","JXAN","JXZ","JXP","JXNN","JXNZ","JXNP","INCA","DECA","ENTA","ENNA","INC1","DEC1","ENT1","ENN1","INC2","DEC2","ENT2","ENN2","INC3","DEC3","ENT3","ENN3","INC4","DEC4","ENT4","ENN4","INC5","DEC5","ENT5","ENN5","INC6","DEC6","ENT6","ENN6","INCX","DECX","ENTX","ENNX","CMPA","FCMP","CMP1","CMP2","CMP3","CMP4","CMP5","CMP6","CMPX","EQU","ORIG","CON","ALF","END"].indexOf(e)}function a(e){return e&&-1==e.search(/[^ A-Z\u0394\u03a0\u03a30-9.,()+*/=$<>@;:'-]/)}this.$rules={start:[{token:"comment.line.character",regex:/^ *\*.*$/},{token:function(e,t,i,l,N,o){return[r(e)?"variable.other":"invalid.illegal","text","keyword.control","text",a(N)?"text":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(ALF)(  )(.{5})(\s+.*)?$/},{token:function(e,t,i,l,N,o){return[r(e)?"variable.other":"invalid.illegal","text","keyword.control","text",a(N)?"text":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(ALF)( )(\S.{4})(\s+.*)?$/},{token:function(e,t,i,l){return[r(e)?"variable.other":"invalid.illegal","text",n(i)?"keyword.control":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(\S+)(?:\s*)$/},{token:function(e,t,i,l,N,o){return[r(e)?"variable.other":"invalid.illegal","text",n(i)?"keyword.control":"invalid.illegal","text",a(N)?"text":"invalid.illegal","comment.line.character"]},regex:/^(\S+)?( +)(\S+)( +)(\S+)(\s+.*)?$/},{defaultToken:"text"}]}}var N=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;N.inherits(l,e),t.MixalHighlightRules=l}),define("ace/mode/mixal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/mixal_highlight_rules"],function(e,t,i){"use strict";function l(){this.HighlightRules=r}var N=e("../lib/oop"),o=e("./text").Mode,r=e("./mixal_highlight_rules").MixalHighlightRules;N.inherits(l,o),function(){this.$id="ace/mode/mixal",this.lineCommentStart="*"}.call(l.prototype),t.Mode=l}),window.require(["ace/mode/mixal"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});