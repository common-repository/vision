define("ace/mode/turtle_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";function i(){this.$rules={start:[{include:"#comments"},{include:"#strings"},{include:"#base-prefix-declarations"},{include:"#string-language-suffixes"},{include:"#string-datatype-suffixes"},{include:"#relative-urls"},{include:"#xml-schema-types"},{include:"#rdf-schema-types"},{include:"#owl-types"},{include:"#qnames"},{include:"#punctuation-operators"}],"#base-prefix-declarations":[{token:"keyword.other.prefix.turtle",regex:/@(?:base|prefix)/}],"#comments":[{token:["punctuation.definition.comment.turtle","comment.line.hash.turtle"],regex:/(#)(.*$)/}],"#owl-types":[{token:"support.type.datatype.owl.turtle",regex:/owl:[a-zA-Z]+/}],"#punctuation-operators":[{token:"keyword.operator.punctuation.turtle",regex:/;|,|\.|\(|\)|\[|\]/}],"#qnames":[{token:"entity.name.other.qname.turtle",regex:/(?:[a-zA-Z][-_a-zA-Z0-9]*)?:(?:[_a-zA-Z][-_a-zA-Z0-9]*)?/}],"#rdf-schema-types":[{token:"support.type.datatype.rdf.schema.turtle",regex:/rdfs?:[a-zA-Z]+|(?:^|\s)a(?:\s|$)/}],"#relative-urls":[{token:"string.quoted.other.relative.url.turtle",regex:/</,push:[{token:"string.quoted.other.relative.url.turtle",regex:/>/,next:"pop"},{defaultToken:"string.quoted.other.relative.url.turtle"}]}],"#string-datatype-suffixes":[{token:"keyword.operator.datatype.suffix.turtle",regex:/\^\^/}],"#string-language-suffixes":[{token:["keyword.operator.language.suffix.turtle","constant.language.suffix.turtle"],regex:/(?!")(@)([a-z]+(?:\-[a-z0-9]+)*)/}],"#strings":[{token:"string.quoted.triple.turtle",regex:/"""/,push:[{token:"string.quoted.triple.turtle",regex:/"""/,next:"pop"},{defaultToken:"string.quoted.triple.turtle"}]},{token:"string.quoted.double.turtle",regex:/"/,push:[{token:"string.quoted.double.turtle",regex:/"/,next:"pop"},{token:"invalid.string.newline",regex:/$/},{token:"constant.character.escape.turtle",regex:/\\./},{defaultToken:"string.quoted.double.turtle"}]}],"#xml-schema-types":[{token:"support.type.datatype.xml.schema.turtle",regex:/xsd?:[a-z][a-zA-Z]+/}]},this.normalizeRules()}var o=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;i.metaData={fileTypes:["ttl","nt"],name:"Turtle",scopeName:"source.turtle"},o.inherits(i,e),t.TurtleHighlightRules=i}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var i=e("../../lib/oop"),g=e("../../range").Range,e=e("./fold_mode").FoldMode,t=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};i.inherits(t,e),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var i=e.getLine(r);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";r=this._getFoldWidgetBase(e,t,r);return!r&&this.startRegionRe.test(i)?"start":r},this.getFoldWidgetRange=function(e,t,r,i){var o=e.getLine(r);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,r);var n=o.match(this.foldingStartMarker);if(n){var l=n.index;if(n[1])return this.openingBracketBlock(e,n[1],r,l);var s=e.getCommentFoldRange(r,l+n[0].length,1);return s&&!s.isMultiLine()&&(i?s=this.getSectionRange(e,r):"all"!=t&&(s=null)),s}if("markbegin"!==t&&(n=o.match(this.foldingStopMarker))){l=n.index+n[0].length;return n[1]?this.closingBracketBlock(e,n[1],r,l):e.getCommentFoldRange(r,l,-1)}},this.getSectionRange=function(e,t){for(var r=(s=e.getLine(t)).search(/\S/),i=t,o=s.length,n=t+=1,l=e.getLength();++t<l;){var s,a=(s=e.getLine(t)).search(/\S/);if(-1!==a){if(a<r)break;var u=this.getFoldWidgetRange(e,"all",t);if(u){if(u.start.row<=i)break;if(u.isMultiLine())t=u.end.row;else if(r==a)break}n=t}}return new g(i,o,n,e.getLine(n).length)},this.getCommentRegionBlock=function(e,t,r){for(var i=t.search(/\s*$/),o=e.getLength(),n=r,l=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,s=1;++r<o;){t=e.getLine(r);var a=l.exec(t);if(a&&(a[1]?s--:s++,!s))break}if(n<r)return new g(n,i,r,t.length)}}.call(t.prototype)}),define("ace/mode/turtle",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/turtle_highlight_rules","ace/mode/folding/cstyle"],function(e,t,r){"use strict";function i(){this.HighlightRules=l,this.foldingRules=new s}var o=e("../lib/oop"),n=e("./text").Mode,l=e("./turtle_highlight_rules").TurtleHighlightRules,s=e("./folding/cstyle").FoldMode;o.inherits(i,n),function(){this.$id="ace/mode/turtle"}.call(i.prototype),t.Mode=i}),window.require(["ace/mode/turtle"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});