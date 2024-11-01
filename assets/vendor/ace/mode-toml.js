define("ace/mode/toml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,o){"use strict";function i(){var e=this.createKeywordMapper({"constant.language.boolean":"true|false"},"identifier");this.$rules={start:[{token:"comment.toml",regex:/#.*$/},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[\\[([^\\]]+)\\]\\])"},{token:["variable.keygroup.toml"],regex:"(?:^\\s*)(\\[([^\\]]+)\\])"},{token:e,regex:"[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b"},{token:"support.date.toml",regex:"\\d{4}-\\d{2}-\\d{2}(T)\\d{2}:\\d{2}:\\d{2}(Z)"},{token:"constant.numeric.toml",regex:"-?\\d+(\\.?\\d+)?"}],qqstring:[{token:"string",regex:"\\\\$",next:"qqstring"},{token:"constant.language.escape",regex:'\\\\[0tnr"\\\\]'},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}]}}var n=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;n.inherits(i,e),t.TomlHighlightRules=i}),define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,o){"use strict";var i=e("../../lib/oop"),h=e("../../range").Range,e=e("./fold_mode").FoldMode,t=t.FoldMode=function(){};i.inherits(t,e),function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/,this.getFoldWidgetRange=function(e,t,o){var i=this.foldingStartMarker,n=e.getLine(o),r=n.match(i);if(r){for(var l=r[1]+".",a=n.length,g=e.getLength(),s=o,d=o;++o<g;)if(n=e.getLine(o),!/^\s*$/.test(n)){if((r=n.match(i))&&0!==r[1].lastIndexOf(l,0))break;d=o}if(s<d){var u=e.getLine(d).length;return new h(s,a,d,u)}}}}.call(t.prototype)}),define("ace/mode/toml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/toml_highlight_rules","ace/mode/folding/ini"],function(e,t,o){"use strict";function i(){this.HighlightRules=l,this.foldingRules=new a,this.$behaviour=this.$defaultBehaviour}var n=e("../lib/oop"),r=e("./text").Mode,l=e("./toml_highlight_rules").TomlHighlightRules,a=e("./folding/ini").FoldMode;n.inherits(i,r),function(){this.lineCommentStart="#",this.$id="ace/mode/toml"}.call(i.prototype),t.Mode=i}),window.require(["ace/mode/toml"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});