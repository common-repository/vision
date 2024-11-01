define("ace/mode/ruby_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";function r(){var e=this.$keywords=this.createKeywordMapper({keyword:"alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield","constant.language":"true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING","variable.language":"$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|$!|root_url|flash|session|cookies|params|request|response|logger|self","support.function":"abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|gsub!|get_via_redirect|host!|https?|https!|include|Integer|lambda|link_to|link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|validates_inclusion_of|validates_numericality_of|validates_with|validates_each|authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|translate|localize|extract_locale_from_tld|caches_page|expire_page|caches_action|expire_action|cache|expire_fragment|expire_cache_for|observe|cache_sweeper|has_many|has_one|belongs_to|has_and_belongs_to_many","invalid.deprecated":"debugger"},"identifier");this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"comment",regex:"^=begin(?:$|\\s.*$)",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},[{regex:"[{}]",onMatch:function(e,t,n){return this.next="{"==e?this.nextState:"","{"==e&&n.length?(n.unshift("start",t),"paren.lparen"):"}"==e&&n.length&&(n.shift(),this.next=n.shift(),-1!=this.next.indexOf("string"))?"paren.end":"{"==e?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.start",regex:/"/,push:[{token:"constant.language.escape",regex:/\\(?:[nsrtvfbae'"\\]|c.|C-.|M-.(?:\\C-.)?|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4})/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/"/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/`/,push:[{token:"constant.language.escape",regex:/\\(?:[nsrtvfbae'"\\]|c.|C-.|M-.(?:\\C-.)?|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4})/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/`/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/'/,push:[{token:"constant.language.escape",regex:/\\['\\]/},{token:"string.end",regex:/'/,next:"pop"},{defaultToken:"string"}]}],{token:"text",regex:"::"},{token:"variable.instance",regex:"@{1,2}[a-zA-Z_\\d]+"},{token:"support.class",regex:"[A-Z][a-zA-Z_\\d]+"},a,o,i,{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"punctuation.separator.key-value",regex:"=>"},{stateName:"heredoc",onMatch:function(e,t,n){var r="-"==e[2]?"indentedHeredoc":"heredoc",e=e.split(this.splitRegex);return n.push(r,e[3]),[{type:"constant",value:e[1]},{type:"string",value:e[2]},{type:"support.class",value:e[3]},{type:"string",value:e[4]}]},regex:"(<<-?)(['\"`]?)([\\w]+)(['\"`]?)",rules:{heredoc:[{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}],indentedHeredoc:[{token:"string",regex:"^ +"},{onMatch:function(e,t,n){return e===n[1]?(n.shift(),n.shift(),this.next=n[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(e,t){return"heredoc"===t[0]||"indentedHeredoc"===t[0]?t[0]:e}},{token:"string.character",regex:"\\B\\?."},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"^=end(?:$|\\s.*$)",next:"start"},{token:"comment",regex:".+"}]},this.normalizeRules()}var s=e("../lib/oop"),e=e("./text_highlight_rules").TextHighlightRules,a=t.constantOtherSymbol={token:"constant.other.symbol.ruby",regex:"[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"},o=(t.qString={token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},t.qqString={token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},t.tString={token:"string",regex:"[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"},t.constantNumericHex={token:"constant.numeric",regex:"0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"}),i=t.constantNumericFloat={token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"};t.instanceVariable={token:"variable.instance",regex:"@{1,2}[a-zA-Z_\\d]+"};s.inherits(r,e),t.RubyHighlightRules=r}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";function r(){}var s=e("../range").Range;(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,n=e.findMatchingBracket({row:t,column:r});if(!n||n.row==t)return 0;n=this.$getIndent(e.getLine(n.row));e.replace(new s(t,0,t,r-1),n)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r}),define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,n){"use strict";var r=e("../../lib/oop"),s=e("./fold_mode").FoldMode,d=e("../../range").Range,t=t.FoldMode=function(){};r.inherits(t,s),function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var s=/\S/,a=(l=e.getLine(n)).search(s);if(-1!=a&&"#"==l[a]){for(var o=l.length,i=e.getLength(),r=n,c=n;++n<i;){var l,_=(l=e.getLine(n)).search(s);if(-1!=_){if("#"!=l[_])break;c=n}}if(r<c){a=e.getLine(c).length;return new d(r,o,c,a)}}},this.getFoldWidget=function(e,t,n){var r=e.getLine(n),s=r.search(/\S/),a=e.getLine(n+1),o=e.getLine(n-1),i=o.search(/\S/),c=a.search(/\S/);if(-1==s)return e.foldWidgets[n-1]=-1!=i&&i<c?"start":"","";if(-1==i){if(s==c&&"#"==r[s]&&"#"==a[s])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(i==s&&"#"==r[s]&&"#"==o[s]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="";return e.foldWidgets[n-1]=-1!=i&&i<s?"start":"",s<c?"start":""}}.call(t.prototype)}),define("ace/mode/ruby",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ruby_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/coffee"],function(e,t,n){"use strict";function r(){this.HighlightRules=o,this.$outdent=new i,this.$behaviour=new l,this.foldingRules=new _}var s=e("../lib/oop"),a=e("./text").Mode,o=e("./ruby_highlight_rules").RubyHighlightRules,i=e("./matching_brace_outdent").MatchingBraceOutdent,c=e("../range").Range,l=e("./behaviour/cstyle").CstyleBehaviour,_=e("./folding/coffee").FoldMode;s.inherits(r,a),function(){this.lineCommentStart="#",this.getNextLineIndent=function(e,t,n){var r,s=this.$getIndent(t),a=this.getTokenizer().getLineTokens(t,e).tokens;return a.length&&"comment"==a[a.length-1].type||"start"==e&&(r=t.match(/^.*[\{\(\[]\s*$/),a=t.match(/^\s*(class|def|module)\s.*$/),e=t.match(/.*do(\s*|\s+\|.*\|\s*)$/),t=t.match(/^\s*(if|else|when)\s*/),(r||a||e||t)&&(s+=n)),s},this.checkOutdent=function(e,t,n){return/^\s+(end|else)$/.test(t+n)||this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){var r=t.getLine(n);if(/}/.test(r))return this.$outdent.autoOutdent(t,n);var s=this.$getIndent(r),a=t.getLine(n-1),r=this.$getIndent(a),a=t.getTabString();r.length<=s.length&&s.slice(-a.length)==a&&t.remove(new c(n,s.length-a.length,n,s.length))},this.$id="ace/mode/ruby"}.call(r.prototype),t.Mode=r}),window.require(["ace/mode/ruby"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)});