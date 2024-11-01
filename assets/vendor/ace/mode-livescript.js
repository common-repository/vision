define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";function r(){}var o=e("../range").Range;(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,n=e.findMatchingBracket({row:t,column:r});if(!n||n.row==t)return 0;n=this.$getIndent(e.getLine(n.row));e.replace(new o(t,0,t,r-1),n)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/livescript",["require","exports","module","ace/tokenizer","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/text"],function(t,e,n){var r,o,i;function a(){var e;this.$tokenizer=new(t("../tokenizer").Tokenizer)(a.Rules),(e=t("../mode/matching_brace_outdent"))&&(this.$outdent=new e.MatchingBraceOutdent),this.$id="ace/mode/livescript",this.$behaviour=new(t("./behaviour/cstyle").CstyleBehaviour)}function s(){}r="(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*",e.Mode=(function(e,t){var n,r={}.hasOwnProperty;for(n in t)r.call(t,n)&&(e[n]=t[n]);return e}(a,o=t("../mode/text").Mode).displayName="LiveScriptMode",s.prototype=((e=a).superclass=o=o).prototype,(e.prototype=new s).constructor=e,"function"==typeof o.extended&&o.extended(e),e=e.prototype,i=RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*"+r+")?))\\s*$"),e.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e).tokens;return o.length&&"comment"===o[o.length-1].type||"start"!==e||!i.test(t)||(r+=n),r},e.lineCommentStart="#",e.blockComment={start:"###",end:"###"},e.checkOutdent=function(e,t,n){var r;return null!=(r=this.$outdent)?r.checkOutdent(t,n):void 0},e.autoOutdent=function(e,t,n){var r;return null!=(r=this.$outdent)?r.autoOutdent(t,n):void 0},a),a.Rules={start:[{token:"keyword",regex:"(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)"+(e="(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))")},{token:"constant.language",regex:"(?:true|false|yes|no|on|off|null|void|undefined)"+e},{token:"invalid.illegal",regex:"(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)"+e},{token:"language.support.class",regex:"(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)"+e},{token:"language.support.function",regex:"(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)"+e},{token:"variable.language",regex:"(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)"+e},{token:"identifier",regex:r+"\\s*:(?![:=])"},{token:"variable",regex:r},{token:"keyword.operator",regex:"(?:\\.{3}|\\s+\\?)"},{token:"keyword.variable",regex:"(?:@+|::|\\.\\.)",next:"key"},{token:"keyword.operator",regex:"\\.\\s*",next:"key"},{token:"string",regex:"\\\\\\S[^\\s,;)}\\]]*"},{token:"string.doc",regex:"'''",next:"qdoc"},{token:"string.doc",regex:'"""',next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',next:"qqstring"},{token:"string",regex:"`",next:"js"},{token:"string",regex:"<\\[",next:"words"},{token:"string.regex",regex:"//",next:"heregex"},{token:"comment.doc",regex:"/\\*",next:"comment"},{token:"comment",regex:"#.*"},{token:"string.regex",regex:"\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",next:"key"},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"},{token:"lparen",regex:"[({[]"},{token:"rparen",regex:"[)}\\]]",next:"key"},{token:"keyword.operator",regex:"[\\^!|&%+\\-]+"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:".*?//[gimy$?]{0,4}",next:"start"},{token:"string.regex",regex:"\\s*#{"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{defaultToken:"string.regex"}],key:[{token:"keyword.operator",regex:"[.?@!]+"},{token:"identifier",regex:r,next:"start"},{token:"text",regex:"",next:"start"}],comment:[{token:"comment.doc",regex:".*?\\*/",next:"start"},{defaultToken:"comment.doc"}],qdoc:[{token:"string",regex:".*?'''",next:"key"},r={defaultToken:"string"}],qqdoc:[{token:"string",regex:'.*?"""',next:"key"},r],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",next:"key"},r],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',next:"key"},r],js:[{token:"string",regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"key"},r],words:[{token:"string",regex:".*?\\]>",next:"key"},r]}}),window.require(["ace/mode/livescript"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});