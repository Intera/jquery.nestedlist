jQuery.fn.shift=function(t,n){var i=parseInt(this.css("left")),e=isNaN(i)?t:i+t;this.animate({left:e},n)},jQuery.fn.nestedList=function(t){function n(){return!1}function e(t,n){for(var i,e=t.find(n||"li:not(.leaf) > a:first-of-type"),o=e.length;o--;)i=e.eq(o),i.replaceWith(i.html())}function o(t,n){t.find(n||".leaf a:first-of-type").each(function(){var t=$(this);t.parent().parent().click(function(){return document.location.href=t.attr("href"),!1}).css("cursor","pointer")})}function s(s){function f(t,n){var e=n.children(),o=e.filter("li"),r=0;for(i=0;i<o.length;i+=1)r+=o.outerHeight();return s.height(r),o}function a(){return u(s,v),!1}function l(){g.off("click",a),g.click(n)}function c(t){v&&v.removeClass("active"),v=t.addClass("active")}function h(n,i){if(nextList=i.children("ul"),t.onBeforeChange(1,nextList,n),c(i),nextList.length){nextList.show(),t.upButtonShow(g,nextList);var e=i.siblings(),o=nextList.find("li");e.length+1>o.length&&e.slice(-0,e.length-o.length).hide(),l(),t.shiftAnimation.complete=function(){g.click(a),t.onAfterChange(1,nextList,n)},n.shift(-C,t.shiftAnimation),f(n,nextList)}}function u(n,i){if(v){var e=i.children("ul"),o=i.parent("ul");t.onBeforeChange(-1,o,n),i.siblings().show(),o.hasClass(d)?v=!1:(t.upButtonShow(g,o),c(o.parent("li"))),f(n,o),l(),t.shiftAnimation.complete=function(){g.click(a),e.hide(),t.onAfterChange(-1,o,n)},n.shift(C,t.shiftAnimation)}}function p(t){var n=$(this);return s.is(":animated")?!1:(h(s,n),void t.stopPropagation())}var d=r();s.addClass(d);var g,v=!1;t&&t.upButtonSelector?g="string"==typeof g?$(t.upButtonSelector):t.upButtonSelector:(g=s.nextAll(".nestedlist-up"),1==g.length?g.remove():g=$("<li>back</li>").addClass("nestedlist-up"));var m={upButtonShow:function(t,n){n.prepend(t)},onBeforeChange:function(){},onAfterChange:function(){},shiftAnimation:{}};t="object"==typeof t?$.extend(m,t):m;var C=s.children("li:first").outerWidth();s.css({position:"relative"}),s.find("ul").css({position:"absolute",left:C+"px",top:"0px"}).hide(),s.find("li:not(:has(ul))").addClass("leaf"),s.find("li:not(.leaf)").hover(function(t){$(this).addClass("hover"),t.stopPropagation()},function(t){$(this).removeClass("hover"),t.stopPropagation()}).click(p),t&&t.noScriptLinks&&e(s,"string"==typeof t.noScriptLinks&&t.noScriptLinks),o(s,t&&t.leafItemLink)}var r=function(){var t=0;return function(){return t+=1,"nestedlist-"+t}}();for(i=0;i<this.length;i+=1)s($(this[i]));return this};