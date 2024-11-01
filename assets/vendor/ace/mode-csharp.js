define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";function i(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},i.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:!0}]}}var o=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;o.inherits(i,e),i.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},i.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},i.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=i}),define("ace/mode/csharp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";function i(){var e=this.createKeywordMapper({"variable.language":"this",keyword:"abstract|async|await|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|partial|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic","constant.language":"null|true|false"},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},r.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/},{token:"string",start:'"',end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"string",start:'@"',end:'"',next:[{token:"constant.language.escape",regex:'""'}]},{token:"string",start:/\$"/,end:'"|$',next:[{token:"constant.language.escape",regex:/\\(:?$)|{{/},{token:"constant.language.escape",regex:/\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},{token:"invalid",regex:/\\./}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"keyword",regex:"^\\s*#(if|else|elif|endif|define|undef|warning|error|line|region|endregion|pragma)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]},this.embedRules(r,"doc-",[r.getEndRule("start")]),this.normalizeRules()}var o=e("../lib/oop"),r=e("./doc_comment_highlight_rules").DocCommentHighlightRules,e=e("./text_highlight_rules").TextHighlightRules;o.inherits(i,e),t.CSharpHighlightRules=i}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";function i(){}var o=e("../range").Range;(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var i=n[1].length,n=e.findMatchingBracket({row:t,column:i});if(!n||n.row==t)return 0;n=this.$getIndent(e.getLine(n.row));e.replace(new o(t,0,t,i-1),n)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var i=e("../../lib/oop"),l=e("../../range").Range,e=e("./fold_mode").FoldMode,t=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(t,e),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";n=this._getFoldWidgetBase(e,t,n);return!n&&this.startRegionRe.test(i)?"start":n},this.getFoldWidgetRange=function(e,t,n,i){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var r=o.match(this.foldingStartMarker);if(r){var a=r.index;if(r[1])return this.openingBracketBlock(e,r[1],n,a);var s=e.getCommentFoldRange(n,a+r[0].length,1);return s&&!s.isMultiLine()&&(i?s=this.getSectionRange(e,n):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(r=o.match(this.foldingStopMarker))){a=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],n,a):e.getCommentFoldRange(n,a,-1)}},this.getSectionRange=function(e,t){for(var n=(s=e.getLine(t)).search(/\S/),i=t,o=s.length,r=t+=1,a=e.getLength();++t<a;){var s,g=(s=e.getLine(t)).search(/\S/);if(-1!==g){if(g<n)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i)break;if(c.isMultiLine())t=c.end.row;else if(n==g)break}r=t}}return new l(i,o,r,e.getLine(r).length)},this.getCommentRegionBlock=function(e,t,n){for(var i=t.search(/\s*$/),o=e.getLength(),r=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++n<o;){t=e.getLine(n);var g=a.exec(t);if(g&&(g[1]?s--:s++,!s))break}if(r<n)return new l(r,i,n,t.length)}}.call(t.prototype)}),define("ace/mode/folding/csharp",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var i=e("../../lib/oop"),c=e("../../range").Range,e=e("./cstyle").FoldMode,t=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(t,e),function(){this.usingRe=/^\s*using \S/,this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=this.getFoldWidgetBase(e,t,n);if(!i){var o=e.getLine(n);if(/^\s*#region\b/.test(o))return"start";t=this.usingRe;if(t.test(o)){o=e.getLine(n-1),n=e.getLine(n+1);if(!t.test(o)&&t.test(n))return"start"}}return i},this.getFoldWidgetRange=function(e,t,n){t=this.getFoldWidgetRangeBase(e,t,n);if(t)return t;t=e.getLine(n);return this.usingRe.test(t)?this.getUsingStatementBlock(e,t,n):/^\s*#region\b/.test(t)?this.getRegionBlock(e,t,n):void 0},this.getUsingStatementBlock=function(e,t,n){for(var i=t.match(this.usingRe)[0].length-1,o=e.getLength(),r=n,a=n;++n<o;)if(t=e.getLine(n),!/^\s*$/.test(t)){if(!this.usingRe.test(t))break;a=n}if(r<a){var s=e.getLine(a).length;return new c(r,i,a,s)}},this.getRegionBlock=function(e,t,n){for(var i=t.search(/\s*$/),o=e.getLength(),r=n,a=/^\s*#(end)?region\b/,s=1;++n<o;){t=e.getLine(n);var g=a.exec(t);if(g&&(g[1]?s--:s++,!s))break}if(r<n)return new c(r,i,n,t.length)}}.call(t.prototype)}),define("ace/mode/csharp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/csharp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/behaviour/cstyle","ace/mode/folding/csharp"],function(e,t,n){"use strict";function i(){this.HighlightRules=a,this.$outdent=new s,this.$behaviour=new g,this.foldingRules=new c}var o=e("../lib/oop"),r=e("./text").Mode,a=e("./csharp_highlight_rules").CSharpHighlightRules,s=e("./matching_brace_outdent").MatchingBraceOutdent,g=e("./behaviour/cstyle").CstyleBehaviour,c=e("./folding/csharp").FoldMode;o.inherits(i,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),o=this.getTokenizer().getLineTokens(t,e).tokens;return o.length&&"comment"==o[o.length-1].type||"start"==e&&t.match(/^.*[\{\(\[]\s*$/)&&(i+=n),i},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){return null},this.$id="ace/mode/csharp"}.call(i.prototype),t.Mode=i}),window.require(["ace/mode/csharp"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});