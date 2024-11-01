define("ace/mode/lua_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";function r(){var e=this.createKeywordMapper({keyword:"break|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while|or|and|not","support.function":"string|xpcall|package|tostring|print|os|unpack|require|getfenv|setmetatable|next|assert|tonumber|io|rawequal|collectgarbage|getmetatable|module|rawset|math|debug|pcall|table|newproxy|type|coroutine|_G|select|gcinfo|pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|load|error|loadfile|sub|upper|len|gfind|rep|find|match|char|dump|gmatch|reverse|byte|format|gsub|lower|preload|loadlib|loaded|loaders|cpath|config|path|seeall|exit|setlocale|date|getenv|difftime|remove|time|clock|tmpname|rename|execute|lines|write|close|flush|open|output|type|read|stderr|stdin|input|stdout|popen|tmpfile|log|max|acos|huge|ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|gethook|setmetatable|setlocal|traceback|setfenv|getinfo|setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|foreachi|maxn|foreach|concat|sort|remove|resume|yield|status|wrap|create|running|__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber","keyword.deprecated":"setn|foreach|foreachi|gcinfo|log10|maxn","constant.library":"string|package|os|io|math|debug|table|coroutine","constant.language":"true|false|nil|_G|_VERSION","variable.language":"self"},"identifier");this.$rules={start:[{stateName:"bracketedComment",onMatch:function(e,t,n){return n.unshift(this.next,e.length-2,t),"comment"},regex:/\-\-\[=*\[/,next:[{onMatch:function(e,t,n){return e.length==n[1]?(n.shift(),n.shift(),this.next=n.shift()):this.next="","comment"},regex:/\]=*\]/,next:"start"},{defaultToken:"comment"}]},{token:"comment",regex:"\\-\\-.*$"},{stateName:"bracketedString",onMatch:function(e,t,n){return n.unshift(this.next,e.length,t),"string.start"},regex:/\[=*\[/,next:[{onMatch:function(e,t,n){return e.length==n[1]?(n.shift(),n.shift(),this.next=n.shift()):this.next="","string.end"},regex:/\]=*\]/,next:"start"},{defaultToken:"string"}]},{token:"string",regex:'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:"(?:(?:(?:(?:\\d+)?(?:\\.\\d+))|(?:(?:\\d+)\\.)))"},{token:"constant.numeric",regex:"(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[xX][\\dA-Fa-f]+))\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+|\\w+"}]},this.normalizeRules()}var o=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;o.inherits(r,e),t.LuaHighlightRules=r}),define("ace/mode/folding/lua",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"],function(e,t,n){"use strict";var r=e("../../lib/oop"),o=e("./fold_mode").FoldMode,g=e("../../range").Range,d=e("../../token_iterator").TokenIterator,t=t.FoldMode=function(){};r.inherits(t,o),function(){this.foldingStartMarker=/\b(function|then|do|repeat)\b|{\s*$|(\[=*\[)/,this.foldingStopMarker=/\bend\b|^\s*}|\]=*\]/,this.getFoldWidget=function(e,t,n){var r=e.getLine(n),o=this.foldingStartMarker.test(r),i=this.foldingStopMarker.test(r);if(o&&!i){if("then"==(l=r.match(this.foldingStartMarker))[1]&&/\belseif\b/.test(r))return;if(l[1]){if("keyword"===e.getTokenAt(n,l.index+1).type)return"start"}else{if(!l[2])return"start";if("bracketedComment"==(a=e.bgTokenizer.getState(n)||"")[0]||"bracketedString"==a[0])return"start"}}if("markbeginend"!=t||!i||o&&i)return"";var a,l=r.match(this.foldingStopMarker);{if("end"!==l[0])return"]"!==l[0][0]||"bracketedComment"==(a=e.bgTokenizer.getState(n-1)||"")[0]||"bracketedString"==a[0]?"end":void 0;if("keyword"===e.getTokenAt(n,l.index+1).type)return"end"}},this.getFoldWidgetRange=function(e,t,n){var r=e.doc.getLine(n),o=this.foldingStartMarker.exec(r);return o?o[1]?this.luaBlock(e,n,o.index+1):o[2]?e.getCommentFoldRange(n,o.index+1):this.openingBracketBlock(e,"{",n,o.index):(o=this.foldingStopMarker.exec(r))?"end"===o[0]&&"keyword"===e.getTokenAt(n,o.index+1).type?this.luaBlock(e,n,o.index+1):"]"===o[0][0]?e.getCommentFoldRange(n,o.index+1):this.closingBracketBlock(e,"}",n,o.index+o[0].length):void 0},this.luaBlock=function(e,t,n){var r=new d(e,t,n),o={function:1,do:1,then:1,elseif:-1,end:-1,repeat:1,until:-1},i=r.getCurrentToken();if(i&&"keyword"==i.type){var a=i.value,l=[a],s=o[a];if(s){n=-1===s?r.getCurrentTokenColumn():e.getLine(t).length,a=t;for(r.step=-1===s?r.stepBackward:r.stepForward;i=r.step();)if("keyword"===i.type){var u=s*o[i.value];if(0<u)l.unshift(i.value);else if(u<=0){if(l.shift(),!l.length&&"elseif"!=i.value)break;0==u&&l.unshift(i.value)}}t=r.getCurrentTokenRow();return-1===s?new g(t,e.getLine(t).length,a,n):new g(a,n,t,r.getCurrentTokenColumn())}}}}.call(t.prototype)}),define("ace/mode/lua",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/lua_highlight_rules","ace/mode/folding/lua","ace/range","ace/worker/worker_client"],function(e,t,n){"use strict";function r(){this.HighlightRules=a,this.foldingRules=new l,this.$behaviour=this.$defaultBehaviour}var o=e("../lib/oop"),i=e("./text").Mode,a=e("./lua_highlight_rules").LuaHighlightRules,l=e("./folding/lua").FoldMode,s=e("../range").Range,u=e("../worker/worker_client").WorkerClient;o.inherits(r,i),function(){function a(e){for(var t=0,n=0;n<e.length;n++){var r=e[n];"keyword"==r.type?r.value in o&&(t+=o[r.value]):"paren.lparen"==r.type?t+=r.value.length:"paren.rparen"==r.type&&(t-=r.value.length)}return t<0?-1:0<t?1:0}this.lineCommentStart="--",this.blockComment={start:"--[",end:"]--"};var o={function:1,then:1,do:1,else:1,elseif:1,repeat:1,end:-1,until:-1},r=["else","elseif","end","until"];this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),o=0,i=this.getTokenizer().getLineTokens(t,e).tokens;return 0<(o="start"==e?a(i):o)?r+n:o<0&&r.substr(r.length-n.length)==n&&!this.checkOutdent(e,t,"\n")?r.substr(0,r.length-n.length):r},this.checkOutdent=function(e,t,n){if("\n"!=n&&"\r"!=n&&"\r\n"!=n)return!1;if(t.match(/^\s*[\)\}\]]$/))return!0;e=this.getTokenizer().getLineTokens(t.trim(),e).tokens;return!(!e||!e.length)&&("keyword"==e[0].type&&-1!=r.indexOf(e[0].value))},this.autoOutdent=function(e,t,n){var r=t.getLine(n-1),o=this.$getIndent(r).length,r=this.getTokenizer().getLineTokens(r,"start").tokens,r=o+t.getTabString().length*a(r);this.$getIndent(t.getLine(n)).length<=r||t.outdentRows(new s(n,0,n+2,0))},this.createWorker=function(t){var e=new u(["ace"],"ace/mode/lua_worker","Worker");return e.attachToDocument(t.getDocument()),e.on("annotate",function(e){t.setAnnotations(e.data)}),e.on("terminate",function(){t.clearAnnotations()}),e},this.$id="ace/mode/lua"}.call(r.prototype),t.Mode=r}),window.require(["ace/mode/lua"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});