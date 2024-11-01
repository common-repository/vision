define("ace/mode/batchfile_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,o){"use strict";function i(){this.$rules={start:[{token:"keyword.command.dosbatch",regex:"\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b",caseInsensitive:!0},{token:"keyword.control.statement.dosbatch",regex:"\\b(?:goto|call|exit)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.if.dosbatch",regex:"\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b",caseInsensitive:!0},{token:"keyword.control.conditional.dosbatch",regex:"\\b(?:if|else)\\b",caseInsensitive:!0},{token:"keyword.control.repeat.dosbatch",regex:"\\bfor\\b",caseInsensitive:!0},{token:"keyword.operator.dosbatch",regex:"\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b"},{token:["doc.comment","comment"],regex:"(?:^|\\b)(rem)($|\\s.*$)",caseInsensitive:!0},{token:"comment.line.colons.dosbatch",regex:"::.*$"},{include:"variable"},{token:"punctuation.definition.string.begin.shell",regex:'"',push:[{token:"punctuation.definition.string.end.shell",regex:'"',next:"pop"},{include:"variable"},{defaultToken:"string.quoted.double.dosbatch"}]},{token:"keyword.operator.pipe.dosbatch",regex:"[|]"},{token:"keyword.operator.redirect.shell",regex:"&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>"}],variable:[{token:"constant.numeric",regex:"%%\\w+|%[*\\d]|%\\w+%"},{token:"constant.numeric",regex:"%~\\d+"},{token:["markup.list","constant.other","markup.list"],regex:"(%)(\\w+)(%?)"}]},this.normalizeRules()}var n=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;i.metaData={name:"Batch File",scopeName:"source.dosbatch",fileTypes:["bat"]},n.inherits(i,e),t.BatchFileHighlightRules=i}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,o){"use strict";var i=e("../../lib/oop"),d=e("../../range").Range,e=e("./fold_mode").FoldMode,t=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(t,e),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,o){var i=e.getLine(o);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";o=this._getFoldWidgetBase(e,t,o);return!o&&this.startRegionRe.test(i)?"start":o},this.getFoldWidgetRange=function(e,t,o,i){var n=e.getLine(o);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,o);var r=n.match(this.foldingStartMarker);if(r){var s=r.index;if(r[1])return this.openingBracketBlock(e,r[1],o,s);var a=e.getCommentFoldRange(o,s+r[0].length,1);return a&&!a.isMultiLine()&&(i?a=this.getSectionRange(e,o):"all"!=t&&(a=null)),a}if("markbegin"!==t&&(r=n.match(this.foldingStopMarker))){s=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],o,s):e.getCommentFoldRange(o,s,-1)}},this.getSectionRange=function(e,t){for(var o=(a=e.getLine(t)).search(/\S/),i=t,n=a.length,r=t+=1,s=e.getLength();++t<s;){var a,l=(a=e.getLine(t)).search(/\S/);if(-1!==l){if(l<o)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i)break;if(c.isMultiLine())t=c.end.row;else if(o==l)break}r=t}}return new d(i,n,r,e.getLine(r).length)},this.getCommentRegionBlock=function(e,t,o){for(var i=t.search(/\s*$/),n=e.getLength(),r=o,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++o<n;){t=e.getLine(o);var l=s.exec(t);if(l&&(l[1]?a--:a++,!a))break}if(r<o)return new d(r,i,o,t.length)}}.call(t.prototype)}),define("ace/mode/batchfile",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/batchfile_highlight_rules","ace/mode/folding/cstyle"],function(e,t,o){"use strict";function i(){this.HighlightRules=s,this.foldingRules=new a,this.$behaviour=this.$defaultBehaviour}var n=e("../lib/oop"),r=e("./text").Mode,s=e("./batchfile_highlight_rules").BatchFileHighlightRules,a=e("./folding/cstyle").FoldMode;n.inherits(i,r),function(){this.lineCommentStart="::",this.blockComment="",this.$id="ace/mode/batchfile"}.call(i.prototype),t.Mode=i}),window.require(["ace/mode/batchfile"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});