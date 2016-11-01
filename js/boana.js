var main_config = { MOBILE_MIN_SCREEN_WIDTH: 768 };

! function(e, t, n, o) {
    function r(n, o) {
        var r = e("html, body").scrollLeft(),
            i = r - Math.round(r - n.offset().left + .05 * e(t).width());
        e("html, body").animate({ scrollLeft: i }, o) }



    function i() {
        return t.innerWidth >= main_config.MOBILE_MIN_SCREEN_WIDTH }
    e(n).ready(function() { i() && (t.scrollConverter = function(e, t, n) {
            var o, r, i = t.documentElement,
                l = !1,
                a = !1,
                s = !1,
                c = function(n, o, r) {
                    if (l) {
                        var a, s, c, d, v, u, f, h;
                        a = 0, s = 10, v = (i ? i.offsetWidth : 0) || 0, u = t.body.scrollWidth || 0, f = i ? i.clientWidth : 0, h = Math.max(v, u) - f, o.detail ? a = o.detail * -240 : o.wheelDelta && (a = 5 * o.wheelDelta), c = a / 120 * s, d = n.x - c, d >= 0 && d <= h ? (n.x = d, n.setByScript = !0, e.scrollTo(n.x, n.y)) : 0 !== n.x && n.x !== h && (n.x = d > h ? h : 0, n.setByScript = !0, e.scrollTo(n.x, n.y)), "function" == typeof r && r(n) } },
                d = function(n) { n = n.toUpperCase();
                    var o = "page" + n + "Offset",
                        r = "scroll" + n,
                        i = "scroll" + ("X" === n ? "Left" : "Top");
                    return e[o] || e[r] || function() {
                        var e = t.documentElement || t.body.parentNode;
                        return ("number" == typeof e[i] ? e : t.body)[i] }() },
                v = function(n, i) {
                    var l = function(t) {
                            return t = t || e.event, c(n, t, i), !(!t.preventDefault || !t.stopPropagation) && (t.preventDefault(), void t.stopPropagation()) },
                        a = function() { n.setByScript || (n.x = d("x"), n.y = d("y")), n.setByScript = !1 };
                    o = l, r = a, e.addEventListener ? "onmousewheel" in e ? (e.addEventListener("mousewheel", o, !1), e.addEventListener("scroll", r, !1)) : (e.addEventListener("DOMMouseScroll", o, !1), e.addEventListener("scroll", r, !1)) : (t.attachEvent("onmousewheel", o), e.attachEvent("onscroll", r)) },
                u = function() {
                    (o || r) && (e.removeEventListener ? "onmousewheel" in e ? (e.removeEventListener("mousewheel", o, !1), e.removeEventListener("scroll", r, !1)) : (e.removeEventListener("DOMMouseScroll", o, !1), e.removeEventListener("scroll", r, !1)) : (t.detachEvent("onmousewheel", o), e.detachEvent("onscroll", r))) },
                f = function(e) {
                    return e.preventDefault(), e.stopPropagation(), !1 };
            return { activate: function(t) {
                    if (l = !0, !s) {
                        var n = { x: 0, y: 0 };
                        v(n, t), s = !0 }
                    a && (e.addEventListener ? e.removeEventListener("scroll", f, !0) : e.detachEvent("onscroll", f), a = !1) }, deactivate: function() { l = !1, s && (u(), s = !1) }, deactivateAllScrolling: function() { l = !1, a = !0, e.addEventListener ? e.addEventListener("scroll", f, !0) : e.attachEvent("onscroll", f) } } }(t, n), scrollConverter.activate()), e(".enlarge-caller").bind("click", function() {
            var n = e(this).attr("data-section-name");
            if (i()) {
                var o = e(this).parents("section");
                o.addClass("enlarged"), e("#body").addClass("vertical-scroll"), scrollConverter.deactivate(), r(o, 300), e(t).resize(function() { r(o, 0) }), e(".section-window-actions .next-window, .section-window-actions .prev-window, .section-window-actions .window-close-btn").bind("click", function() { e(this).unbind(), o.animate({ scrollTop: 0 }, 300), o.removeClass("enlarged"), e("body").removeClass("vertical-scroll"), e(t).off("resize");
                    var n = Math.round(o.offset().left - .07 * e(t).width());
                    scrollConverter.activate(), e("html, body").animate({ scrollLeft: n }, 300) }), e(".window.enlarged").scroll(function() { e(this).addClass("hide-scroll-indicator") }), o.children(".subpage").load("/partials/_" + n + ".php", function(e, t, n) {
                    switch (t) {
                        case "success":
                            preparePLDemoBTN();
                            break;
                        case "error":
                            console.log("Subpage Async Load Error: " + n.status + " " + n.statusText) } }) } else t.location.href = "/" + n }) }) }(jQuery, this, this.document);
