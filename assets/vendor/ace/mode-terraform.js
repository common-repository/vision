define("ace/mode/terraform_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";function n(){this.$rules={start:[{token:["storage.function.terraform"],regex:"\\b(output|resource|data|variable|module|export)\\b"},{token:"variable.terraform",regex:"\\$\\s",push:[{token:"keyword.terraform",regex:"(-var-file|-var)"},{token:"variable.terraform",regex:"\\n|$",next:"pop"},{include:"strings"},{include:"variables"},{include:"operators"},{defaultToken:"text"}]},{token:"language.support.class",regex:"\\b(timeouts|provider|connection|provisioner|lifecycleprovider|atlas)\\b"},{token:"singleline.comment.terraform",regex:"#(.)*$"},{token:"multiline.comment.begin.terraform",regex:"^\\s*\\/\\*",push:"blockComment"},{token:"storage.function.terraform",regex:"^\\s*(locals|terraform)\\s*{"},{token:"paren.lpar",regex:"[[({]"},{token:"paren.rpar",regex:"[\\])}]"},{include:"constants"},{include:"strings"},{include:"operators"},{include:"variables"}],blockComment:[{regex:"^\\s*\\/\\*",token:"multiline.comment.begin.terraform",push:"blockComment"},{regex:"\\*\\/\\s*$",token:"multiline.comment.end.terraform",next:"pop"},{defaultToken:"comment"}],constants:[{token:"constant.language.terraform",regex:"\\b(true|false|yes|no|on|off|EOF)\\b"},{token:"constant.numeric.terraform",regex:"(\\b([0-9]+)([kKmMgG]b?)?\\b)|(\\b(0x[0-9A-Fa-f]+)([kKmMgG]b?)?\\b)"}],variables:[{token:["variable.assignment.terraform","keyword.operator"],regex:"\\b([a-zA-Z_]+)(\\s*=)"}],interpolated_variables:[{token:"variable.terraform",regex:"\\b(var|self|count|path|local)\\b(?:\\.*[a-zA-Z_-]*)?"}],strings:[{token:"punctuation.quote.terraform",regex:"'",push:[{token:"punctuation.quote.terraform",regex:"'",next:"pop"},{include:"escaped_chars"},{defaultToken:"string"}]},{token:"punctuation.quote.terraform",regex:'"',push:[{token:"punctuation.quote.terraform",regex:'"',next:"pop"},{include:"interpolation"},{include:"escaped_chars"},{defaultToken:"string"}]}],escaped_chars:[{token:"constant.escaped_char.terraform",regex:"\\\\."}],operators:[{token:"keyword.operator",regex:"\\?|:|==|!=|>|<|>=|<=|&&|\\|\\||!|%|&|\\*|\\+|\\-|/|="}],interpolation:[{token:"punctuation.interpolated.begin.terraform",regex:"\\$?\\$\\{",push:[{token:"punctuation.interpolated.end.terraform",regex:"\\}",next:"pop"},{include:"interpolated_variables"},{include:"operators"},{include:"constants"},{include:"strings"},{include:"functions"},{include:"parenthesis"},{defaultToken:"punctuation"}]}],functions:[{token:"keyword.function.terraform",regex:"\\b(abs|basename|base64decode|base64encode|base64gzip|base64sha256|base64sha512|bcrypt|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|coalesce|coalescelist|compact|concat|contains|dirname|distinct|element|file|floor|flatten|format|formatlist|indent|index|join|jsonencode|keys|length|list|log|lookup|lower|map|matchkeys|max|merge|min|md5|pathexpand|pow|replace|rsadecrypt|sha1|sha256|sha512|signum|slice|sort|split|substr|timestamp|timeadd|title|transpose|trimspace|upper|urlencode|uuid|values|zipmap)\\b"}],parenthesis:[{token:"paren.lpar",regex:"\\["},{token:"paren.rpar",regex:"\\]"}]},this.normalizeRules()}var o=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;o.inherits(n,e),t.TerraformHighlightRules=n}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var n=e("../../lib/oop"),g=e("../../range").Range,e=e("./fold_mode").FoldMode,t=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};n.inherits(t,e),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var n=e.getLine(r);if(this.singleLineBlockCommentRe.test(n)&&!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return"";r=this._getFoldWidgetBase(e,t,r);return!r&&this.startRegionRe.test(n)?"start":r},this.getFoldWidgetRange=function(e,t,r,n){var o=e.getLine(r);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,r);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],r,a);var s=e.getCommentFoldRange(r,a+i[0].length,1);return s&&!s.isMultiLine()&&(n?s=this.getSectionRange(e,r):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(i=o.match(this.foldingStopMarker))){a=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],r,a):e.getCommentFoldRange(r,a,-1)}},this.getSectionRange=function(e,t){for(var r=(s=e.getLine(t)).search(/\S/),n=t,o=s.length,i=t+=1,a=e.getLength();++t<a;){var s,l=(s=e.getLine(t)).search(/\S/);if(-1!==l){if(l<r)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=n)break;if(c.isMultiLine())t=c.end.row;else if(r==l)break}i=t}}return new g(n,o,i,e.getLine(i).length)},this.getCommentRegionBlock=function(e,t,r){for(var n=t.search(/\s*$/),o=e.getLength(),i=r,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++r<o;){t=e.getLine(r);var l=a.exec(t);if(l&&(l[1]?s--:s++,!s))break}if(i<r)return new g(i,n,r,t.length)}}.call(t.prototype)}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,r){"use strict";function n(){}var o=e("../range").Range;(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var r=e.getLine(t).match(/^(\s*\})/);if(!r)return 0;var n=r[1].length,r=e.findMatchingBracket({row:t,column:n});if(!r||r.row==t)return 0;r=this.$getIndent(e.getLine(r.row));e.replace(new o(t,0,t,n-1),r)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(n.prototype),t.MatchingBraceOutdent=n}),define("ace/mode/terraform",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/terraform_highlight_rules","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],function(e,t,r){"use strict";function n(){i.call(this),this.HighlightRules=a,this.$outdent=new c,this.$behaviour=new s,this.foldingRules=new l}var o=e("../lib/oop"),i=e("./text").Mode,a=e("./terraform_highlight_rules").TerraformHighlightRules,s=e("./behaviour/cstyle").CstyleBehaviour,l=e("./folding/cstyle").FoldMode,c=e("./matching_brace_outdent").MatchingBraceOutdent;o.inherits(n,i),function(){this.$id="ace/mode/terraform"}.call(n.prototype),t.Mode=n}),window.require(["ace/mode/terraform"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});