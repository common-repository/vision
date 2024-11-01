define("ace/mode/haskell_cabal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";function o(){this.$rules={start:[{token:"comment",regex:"^\\s*--.*$"},{token:["keyword"],regex:/^(\s*\w.*?)(:(?:\s+|$))/},{token:"constant.numeric",regex:/[\d_]+(?:(?:[\.\d_]*)?)/},{token:"constant.language.boolean",regex:"(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"},{token:"markup.heading",regex:/^(\w.*)$/}]}}var n=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules;n.inherits(o,e),t.CabalHighlightRules=o}),define("ace/mode/folding/haskell_cabal",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,i){"use strict";var o=e("../../lib/oop"),n=e("./fold_mode").FoldMode,r=e("../../range").Range,t=t.FoldMode=function(){};o.inherits(t,n),function(){this.isHeading=function(e,t){e=e.getTokens(t)[0];return 0==t||e&&0===e.type.lastIndexOf("markup.heading",0)},this.getFoldWidget=function(e,t,i){if(this.isHeading(e,i))return"start";if("markbeginend"===t&&!/^\s*$/.test(e.getLine(i))){for(var o=e.getLength();++i<o&&/^\s*$/.test(e.getLine(i)););if(i==o||this.isHeading(e,i))return"end"}return""},this.getFoldWidgetRange=function(e,t,i){var o=e.getLine(i).length,n=e.getLength(),l=i,a=i;if(this.isHeading(e,i)){for(;++i<n;)if(this.isHeading(e,i)){i--;break}if(l<(a=i))for(;l<a&&/^\s*$/.test(e.getLine(a));)a--;if(l<a){var s=e.getLine(a).length;return new r(l,o,a,s)}}else if("end"===this.getFoldWidget(e,t,i)){for(a=i,s=e.getLine(a).length;0<=--i&&!this.isHeading(e,i););o=e.getLine(i).length;return new r(i,o,a,s)}}}.call(t.prototype)}),define("ace/mode/haskell_cabal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/haskell_cabal_highlight_rules","ace/mode/folding/haskell_cabal"],function(e,t,i){"use strict";function o(){this.HighlightRules=a,this.foldingRules=new s,this.$behaviour=this.$defaultBehaviour}var n=e("../lib/oop"),l=e("./text").Mode,a=e("./haskell_cabal_highlight_rules").CabalHighlightRules,s=e("./folding/haskell_cabal").FoldMode;n.inherits(o,l),function(){this.lineCommentStart="--",this.blockComment=null,this.$id="ace/mode/haskell_cabal"}.call(o.prototype),t.Mode=o}),window.require(["ace/mode/haskell_cabal"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});