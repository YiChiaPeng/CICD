/* SockJS client, version --minify, http://sockjs.org, MIT License

Copyright (c) 2011-2012 VMware, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// JSON2 by Douglas Crockford (minified).
var JSON;
JSON || (JSON = {}),
function() {
    function str(a, b) {
        var c, d, e, f, g = gap, h, i = b[a];
        i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(a)),
        typeof rep == "function" && (i = rep.call(b, a, i));
        switch (typeof i) {
        case "string":
            return quote(i);
        case "number":
            return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
            return String(i);
        case "object":
            if (!i)
                return "null";
            gap += indent,
            h = [];
            if (Object.prototype.toString.apply(i) === "[object Array]") {
                f = i.length;
                for (c = 0; c < f; c += 1)
                    h[c] = str(c, i) || "null";
                e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]",
                gap = g;
                return e
            }
            if (rep && typeof rep == "object") {
                f = rep.length;
                for (c = 0; c < f; c += 1)
                    typeof rep[c] == "string" && (d = rep[c],
                    e = str(d, i),
                    e && h.push(quote(d) + (gap ? ": " : ":") + e))
            } else
                for (d in i)
                    Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i),
                    e && h.push(quote(d) + (gap ? ": " : ":") + e));
            e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}",
            gap = g;
            return e
        }
    }
    function quote(a) {
        escapable.lastIndex = 0;
        return escapable.test(a) ? '"' + a.replace(escapable, function(a) {
            var b = meta[a];
            return typeof b == "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function f(a) {
        return a < 10 ? "0" + a : a
    }
    "use strict",
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(a) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(a) {
        return this.valueOf()
    }
    );
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function(a, b, c) {
        var d;
        gap = "",
        indent = "";
        if (typeof c == "number")
            for (d = 0; d < c; d += 1)
                indent += " ";
        else
            typeof c == "string" && (indent = c);
        rep = b;
        if (!b || typeof b == "function" || typeof b == "object" && typeof b.length == "number")
            return str("", {
                "": a
            });
        throw new Error("JSON.stringify")
    }
    ),
    typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
        function walk(a, b) {
            var c, d, e = a[b];
            if (e && typeof e == "object")
                for (c in e)
                    Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c),
                    d !== undefined ? e[c] = d : delete e[c]);
            return reviver.call(a, b, e)
        }
        var j;
        text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            j = eval("(" + text + ")");
            return typeof reviver == "function" ? walk({
                "": j
            }, "") : j
        }
        throw new SyntaxError("JSON.parse")
    }
    )
}()

SockJS = function() {
    var a = document
      , b = window
      , c = {}
      , d = function() {};
    d.prototype.addEventListener = function(a, b) {
        this._listeners || (this._listeners = {}),
        a in this._listeners || (this._listeners[a] = []);
        var d = this._listeners[a];
        c.arrIndexOf(d, b) === -1 && d.push(b);
        return
    }
    ,
    d.prototype.removeEventListener = function(a, b) {
        if (!(this._listeners && a in this._listeners))
            return;
        var d = this._listeners[a]
          , e = c.arrIndexOf(d, b);
        if (e !== -1) {
            d.length > 1 ? this._listeners[a] = d.slice(0, e).concat(d.slice(e + 1)) : delete this._listeners[a];
            return
        }
        return
    }
    ,
    d.prototype.dispatchEvent = function(a) {
        var b = a.type
          , c = Array.prototype.slice.call(arguments, 0);
        this["on" + b] && this["on" + b].apply(this, c);
        if (this._listeners && b in this._listeners)
            for (var d = 0; d < this._listeners[b].length; d++)
                this._listeners[b][d].apply(this, c)
    }
    ;
    var e = function(a, b) {
        this.type = a;
        if (typeof b != "undefined")
            for (var c in b) {
                if (!b.hasOwnProperty(c))
                    continue;
                this[c] = b[c]
            }
    };
    e.prototype.toString = function() {
        var a = [];
        for (var b in this) {
            if (!this.hasOwnProperty(b))
                continue;
            var c = this[b];
            typeof c == "function" && (c = "[function]"),
            a.push(b + "=" + c)
        }
        return "SimpleEvent(" + a.join(", ") + ")"
    }
    ;
    var f = function(a) {
        var b = this;
        b._events = a || [],
        b._listeners = {}
    };
    f.prototype.emit = function(a) {
        var b = this;
        b._verifyType(a);
        if (b._nuked)
            return;
        var c = Array.prototype.slice.call(arguments, 1);
        b["on" + a] && b["on" + a].apply(b, c);
        if (a in b._listeners)
            for (var d = 0; d < b._listeners[a].length; d++)
                b._listeners[a][d].apply(b, c)
    }
    ,
    f.prototype.on = function(a, b) {
        var c = this;
        c._verifyType(a);
        if (c._nuked)
            return;
        a in c._listeners || (c._listeners[a] = []),
        c._listeners[a].push(b)
    }
    ,
    f.prototype._verifyType = function(a) {
        var b = this;
        c.arrIndexOf(b._events, a) === -1 && c.log("Event " + JSON.stringify(a) + " not listed " + JSON.stringify(b._events) + " in " + b)
    }
    ,
    f.prototype.nuke = function() {
        var a = this;
        a._nuked = !0;
        for (var b = 0; b < a._events.length; b++)
            delete a[a._events[b]];
        a._listeners = {}
    }
    ;
    var g = "abcdefghijklmnopqrstuvwxyz0123456789_";
    c.random_string = function(a, b) {
        b = b || g.length;
        var c, d = [];
        for (c = 0; c < a; c++)
            d.push(g.substr(Math.floor(Math.random() * b), 1));
        return d.join("")
    }
    ,
    c.random_number = function(a) {
        return Math.floor(Math.random() * a)
    }
    ,
    c.random_number_string = function(a) {
        var b = ("" + (a - 1)).length
          , d = Array(b + 1).join("0");
        return (d + c.random_number(a)).slice(-b)
    }
    ,
    c.getOrigin = function(a) {
        a += "/";
        var b = a.split("/").slice(0, 3);
        return b.join("/")
    }
    ,
    c.isSameOriginUrl = function(a, c) {
        return c || (c = b.location.href),
        a.split("/").slice(0, 3).join("/") === c.split("/").slice(0, 3).join("/")
    }
    ,
    c.getParentDomain = function(a) {
        if (/^[0-9.]*$/.test(a))
            return a;
        if (/^\[/.test(a))
            return a;
        if (!/[.]/.test(a))
            return a;
        var b = a.split(".").slice(1);
        return b.join(".")
    }
    ,
    c.objectExtend = function(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }
    ;
    var h = "_jp";
    c.polluteGlobalNamespace = function() {
        h in b || (b[h] = {})
    }
    ,
    c.closeFrame = function(a, b) {
        return "c" + JSON.stringify([a, b])
    }
    ,
    c.userSetCode = function(a) {
        return a === 1e3 || a >= 3e3 && a <= 4999
    }
    ,
    c.countRTO = function(a) {
        var b;
        return a > 100 ? b = 3 * a : b = a + 200,
        b
    }
    ,
    c.log = function() {
        b.console && console.log && console.log.apply && console.log.apply(console, arguments)
    }
    ,
    c.bind = function(a, b) {
        return a.bind ? a.bind(b) : function() {
            return a.apply(b, arguments)
        }
    }
    ,
    c.flatUrl = function(a) {
        return a.indexOf("?") === -1 && a.indexOf("#") === -1
    }
    ,
    c.amendUrl = function(b) {
        var d = a.location;
        if (!b)
            throw new Error("Wrong url for SockJS");
        if (!c.flatUrl(b))
            throw new Error("Only basic urls are supported in SockJS");
        return b.indexOf("//") === 0 && (b = d.protocol + b),
        b.indexOf("/") === 0 && (b = d.protocol + "//" + d.host + b),
        b = b.replace(/[/]+$/, ""),
        b
    }
    ,
    c.arrIndexOf = function(a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c] === b)
                return c;
        return -1
    }
    ,
    c.arrSkip = function(a, b) {
        var d = c.arrIndexOf(a, b);
        if (d === -1)
            return a.slice();
        var e = a.slice(0, d);
        return e.concat(a.slice(d + 1))
    }
    ,
    c.isArray = Array.isArray || function(a) {
        return {}.toString.call(a).indexOf("Array") >= 0
    }
    ,
    c.delay = function(a, b) {
        return typeof a == "function" && (b = a,
        a = 0),
        setTimeout(b, a)
    }
    ;
    var i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, j = {
        "\0": "\\u0000",
        "\x01": "\\u0001",
        "\x02": "\\u0002",
        "\x03": "\\u0003",
        "\x04": "\\u0004",
        "\x05": "\\u0005",
        "\x06": "\\u0006",
        "\x07": "\\u0007",
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\x0b": "\\u000b",
        "\f": "\\f",
        "\r": "\\r",
        "\x0e": "\\u000e",
        "\x0f": "\\u000f",
        "\x10": "\\u0010",
        "\x11": "\\u0011",
        "\x12": "\\u0012",
        "\x13": "\\u0013",
        "\x14": "\\u0014",
        "\x15": "\\u0015",
        "\x16": "\\u0016",
        "\x17": "\\u0017",
        "\x18": "\\u0018",
        "\x19": "\\u0019",
        "\x1a": "\\u001a",
        "\x1b": "\\u001b",
        "\x1c": "\\u001c",
        "\x1d": "\\u001d",
        "\x1e": "\\u001e",
        "\x1f": "\\u001f",
        '"': '\\"',
        "\\": "\\\\",
        "\x7f": "\\u007f",
        "\x80": "\\u0080",
        "\x81": "\\u0081",
        "\x82": "\\u0082",
        "\x83": "\\u0083",
        "\x84": "\\u0084",
        "\x85": "\\u0085",
        "\x86": "\\u0086",
        "\x87": "\\u0087",
        "\x88": "\\u0088",
        "\x89": "\\u0089",
        "\x8a": "\\u008a",
        "\x8b": "\\u008b",
        "\x8c": "\\u008c",
        "\x8d": "\\u008d",
        "\x8e": "\\u008e",
        "\x8f": "\\u008f",
        "\x90": "\\u0090",
        "\x91": "\\u0091",
        "\x92": "\\u0092",
        "\x93": "\\u0093",
        "\x94": "\\u0094",
        "\x95": "\\u0095",
        "\x96": "\\u0096",
        "\x97": "\\u0097",
        "\x98": "\\u0098",
        "\x99": "\\u0099",
        "\x9a": "\\u009a",
        "\x9b": "\\u009b",
        "\x9c": "\\u009c",
        "\x9d": "\\u009d",
        "\x9e": "\\u009e",
        "\x9f": "\\u009f",
        "\xad": "\\u00ad",
        "\u0600": "\\u0600",
        "\u0601": "\\u0601",
        "\u0602": "\\u0602",
        "\u0603": "\\u0603",
        "\u0604": "\\u0604",
        "\u070f": "\\u070f",
        "\u17b4": "\\u17b4",
        "\u17b5": "\\u17b5",
        "\u200c": "\\u200c",
        "\u200d": "\\u200d",
        "\u200e": "\\u200e",
        "\u200f": "\\u200f",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029",
        "\u202a": "\\u202a",
        "\u202b": "\\u202b",
        "\u202c": "\\u202c",
        "\u202d": "\\u202d",
        "\u202e": "\\u202e",
        "\u202f": "\\u202f",
        "\u2060": "\\u2060",
        "\u2061": "\\u2061",
        "\u2062": "\\u2062",
        "\u2063": "\\u2063",
        "\u2064": "\\u2064",
        "\u2065": "\\u2065",
        "\u2066": "\\u2066",
        "\u2067": "\\u2067",
        "\u2068": "\\u2068",
        "\u2069": "\\u2069",
        "\u206a": "\\u206a",
        "\u206b": "\\u206b",
        "\u206c": "\\u206c",
        "\u206d": "\\u206d",
        "\u206e": "\\u206e",
        "\u206f": "\\u206f",
        "\ufeff": "\\ufeff",
        "\ufff0": "\\ufff0",
        "\ufff1": "\\ufff1",
        "\ufff2": "\\ufff2",
        "\ufff3": "\\ufff3",
        "\ufff4": "\\ufff4",
        "\ufff5": "\\ufff5",
        "\ufff6": "\\ufff6",
        "\ufff7": "\\ufff7",
        "\ufff8": "\\ufff8",
        "\ufff9": "\\ufff9",
        "\ufffa": "\\ufffa",
        "\ufffb": "\\ufffb",
        "\ufffc": "\\ufffc",
        "\ufffd": "\\ufffd",
        "\ufffe": "\\ufffe",
        "\uffff": "\\uffff"
    }, k = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g, l, m = JSON && JSON.stringify || function(a) {
        return i.lastIndex = 0,
        i.test(a) && (a = a.replace(i, function(a) {
            return j[a]
        })),
        '"' + a + '"'
    }
    , n = function(a) {
        var b, c = {}, d = [];
        for (b = 0; b < 65536; b++)
            d.push(String.fromCharCode(b));
        return a.lastIndex = 0,
        d.join("").replace(a, function(a) {
            return c[a] = "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4),
            ""
        }),
        a.lastIndex = 0,
        c
    };
    c.quote = function(a) {
        var b = m(a);
        return k.lastIndex = 0,
        k.test(b) ? (l || (l = n(k)),
        b.replace(k, function(a) {
            return l[a]
        })) : b
    }
    ;
    var o = ["websocket", "xdr-streaming", "xhr-streaming", "iframe-eventsource", "iframe-htmlfile", "xdr-polling", "xhr-polling", "iframe-xhr-polling", "jsonp-polling"];
    c.probeProtocols = function() {
        var a = {};
        for (var b = 0; b < o.length; b++) {
            var c = o[b];
            a[c] = y[c] && y[c].enabled()
        }
        return a
    }
    ,
    c.detectProtocols = function(a, b, c) {
        var d = {}
          , e = [];
        b || (b = o);
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            d[g] = a[g]
        }
        var h = function(a) {
            var b = a.shift();
            d[b] ? e.push(b) : a.length > 0 && h(a)
        };
        return c.websocket !== !1 && h(["websocket"]),
        d["xhr-streaming"] && !c.null_origin ? e.push("xhr-streaming") : d["xdr-streaming"] && !c.cookie_needed && !c.null_origin ? e.push("xdr-streaming") : h(["iframe-eventsource", "iframe-htmlfile"]),
        d["xhr-polling"] && !c.null_origin ? e.push("xhr-polling") : d["xdr-polling"] && !c.cookie_needed && !c.null_origin ? e.push("xdr-polling") : h(["iframe-xhr-polling", "jsonp-polling"]),
        e
    }
    ;
    var p = "_sockjs_global";
    c.createHook = function() {
        var a = "a" + c.random_string(8);
        if (!(p in b)) {
            var d = {};
            b[p] = function(a) {
                return a in d || (d[a] = {
                    id: a,
                    del: function() {
                        delete d[a]
                    }
                }),
                d[a]
            }
        }
        return b[p](a)
    }
    ,
    c.attachMessage = function(a) {
        c.attachEvent("message", a)
    }
    ,
    c.attachEvent = function(c, d) {
        typeof b.addEventListener != "undefined" ? b.addEventListener(c, d, !1) : (a.attachEvent("on" + c, d),
        b.attachEvent("on" + c, d))
    }
    ,
    c.detachMessage = function(a) {
        c.detachEvent("message", a)
    }
    ,
    c.detachEvent = function(c, d) {
        typeof b.addEventListener != "undefined" ? b.removeEventListener(c, d, !1) : (a.detachEvent("on" + c, d),
        b.detachEvent("on" + c, d))
    }
    ;
    var q = {}
      , r = !1
      , s = function() {
        for (var a in q)
            q[a](),
            delete q[a]
    }
      , t = function() {
        if (r)
            return;
        r = !0,
        s()
    };
    c.attachEvent("unload", t),
    c.unload_add = function(a) {
        var b = c.random_string(8);
        return q[b] = a,
        r && c.delay(s),
        b
    }
    ,
    c.unload_del = function(a) {
        a in q && delete q[a]
    }
    ,
    c.createIframe = function(b, d) {
        var e = a.createElement("iframe"), f, g, h = function() {
            clearTimeout(f);
            try {
                e.onload = null
            } catch (a) {}
            e.onerror = null
        }, i = function() {
            e && (h(),
            setTimeout(function() {
                e && e.parentNode.removeChild(e),
                e = null
            }, 0),
            c.unload_del(g))
        }, j = function(a) {
            e && (i(),
            d(a))
        }, k = function(a, b) {
            try {
                e && e.contentWindow && e.contentWindow.postMessage(a, b)
            } catch (c) {}
        };
        return e.src = b,
        e.style.display = "none",
        e.style.position = "absolute",
        e.onerror = function() {
            j("onerror")
        }
        ,
        e.onload = function() {
            clearTimeout(f),
            f = setTimeout(function() {
                j("onload timeout")
            }, 2e3)
        }
        ,
        a.body.appendChild(e),
        f = setTimeout(function() {
            j("timeout")
        }, 15e3),
        g = c.unload_add(i),
        {
            post: k,
            cleanup: i,
            loaded: h
        }
    }
    ,
    c.createHtmlfile = function(a, d) {
        var e = new ActiveXObject("htmlfile"), f, g, i, j = function() {
            clearTimeout(f)
        }, k = function() {
            e && (j(),
            c.unload_del(g),
            i.parentNode.removeChild(i),
            i = e = null,
            CollectGarbage())
        }, l = function(a) {
            e && (k(),
            d(a))
        }, m = function(a, b) {
            try {
                i && i.contentWindow && i.contentWindow.postMessage(a, b)
            } catch (c) {}
        };
        e.open(),
        e.write('<html><script>document.domain="' + document.domain + '";' + "</s" + "cript></html>"),
        e.close(),
        e.parentWindow[h] = b[h];
        var n = e.createElement("div");
        return e.body.appendChild(n),
        i = e.createElement("iframe"),
        n.appendChild(i),
        i.src = a,
        f = setTimeout(function() {
            l("timeout")
        }, 15e3),
        g = c.unload_add(k),
        {
            post: m,
            cleanup: k,
            loaded: j
        }
    }
    ;
    var u = function() {};
    u.prototype = new f(["chunk", "finish"]),
    u.prototype._start = function(a, d, e, f) {
        var g = this;
        try {
            g.xhr = new XMLHttpRequest
        } catch (h) {}
        if (!g.xhr)
            try {
                g.xhr = new b.ActiveXObject("Microsoft.XMLHTTP")
            } catch (h) {}
        if (b.ActiveXObject || b.XDomainRequest)
            d += (d.indexOf("?") === -1 ? "?" : "&") + "t=" + +(new Date);
        g.unload_ref = c.unload_add(function() {
            g._cleanup(!0)
        });
        try {
            g.xhr.open(a, d, !0)
        } catch (i) {
            g.emit("finish", 0, ""),
            g._cleanup();
            return
        }
        if (!f || !f.no_credentials)
            g.xhr.withCredentials = "true";
        if (f && f.headers)
            for (var j in f.headers)
                g.xhr.setRequestHeader(j, f.headers[j]);
        g.xhr.onreadystatechange = function() {
            if (g.xhr) {
                var a = g.xhr;
                switch (a.readyState) {
                case 3:
                    try {
                        var b = a.status
                          , c = a.responseText
                    } catch (a) {}
                    b === 1223 && (b = 204),
                    c && c.length > 0 && g.emit("chunk", b, c);
                    break;
                case 4:
                    var b = a.status;
                    b === 1223 && (b = 204),
                    g.emit("finish", b, a.responseText),
                    g._cleanup(!1)
                }
            }
        }
        ,
        g.xhr.send(e)
    }
    ,
    u.prototype._cleanup = function(a) {
        var b = this;
        if (!b.xhr)
            return;
        c.unload_del(b.unload_ref),
        b.xhr.onreadystatechange = function() {}
        ;
        if (a)
            try {
                b.xhr.abort()
            } catch (d) {}
        b.unload_ref = b.xhr = null
    }
    ,
    u.prototype.close = function() {
        var a = this;
        a.nuke(),
        a._cleanup(!0)
    }
    ;
    var v = c.XHRCorsObject = function() {
        var a = this
          , b = arguments;
        c.delay(function() {
            a._start.apply(a, b)
        })
    }
    ;
    v.prototype = new u;
    var w = c.XHRLocalObject = function(a, b, d) {
        var e = this;
        c.delay(function() {
            e._start(a, b, d, {
                no_credentials: !0
            })
        })
    }
    ;
    w.prototype = new u;
    var x = c.XDRObject = function(a, b, d) {
        var e = this;
        c.delay(function() {
            e._start(a, b, d)
        })
    }
    ;
    x.prototype = new f(["chunk", "finish"]),
    x.prototype._start = function(a, b, d) {
        var e = this
          , f = new XDomainRequest;
        b += (b.indexOf("?") === -1 ? "?" : "&") + "t=" + +(new Date);
        var g = f.ontimeout = f.onerror = function() {
            e.emit("finish", 0, ""),
            e._cleanup(!1)
        }
        ;
        f.onprogress = function() {
            e.emit("chunk", 200, f.responseText)
        }
        ,
        f.onload = function() {
            e.emit("finish", 200, f.responseText),
            e._cleanup(!1)
        }
        ,
        e.xdr = f,
        e.unload_ref = c.unload_add(function() {
            e._cleanup(!0)
        });
        try {
            e.xdr.open(a, b),
            e.xdr.send(d)
        } catch (h) {
            g()
        }
    }
    ,
    x.prototype._cleanup = function(a) {
        var b = this;
        if (!b.xdr)
            return;
        c.unload_del(b.unload_ref),
        b.xdr.ontimeout = b.xdr.onerror = b.xdr.onprogress = b.xdr.onload = null;
        if (a)
            try {
                b.xdr.abort()
            } catch (d) {}
        b.unload_ref = b.xdr = null
    }
    ,
    x.prototype.close = function() {
        var a = this;
        a.nuke(),
        a._cleanup(!0)
    }
    ,
    c.isXHRCorsCapable = function() {
        return b.XMLHttpRequest && "withCredentials"in new XMLHttpRequest ? 1 : b.XDomainRequest && a.domain ? 2 : L.enabled() ? 3 : 4
    }
    ;
    var y = function(a, d, e) {
        if (this === b)
            return new y(a,d,e);
        var f = this, g;
        f._options = {
            devel: !1,
            debug: !1,
            protocols_whitelist: [],
            info: undefined,
            rtt: undefined
        },
        e && c.objectExtend(f._options, e),
        f._base_url = c.amendUrl(a),
        f._server = f._options.server || c.random_number_string(1e3),
        f._options.protocols_whitelist && f._options.protocols_whitelist.length ? g = f._options.protocols_whitelist : (typeof d == "string" && d.length > 0 ? g = [d] : c.isArray(d) ? g = d : g = null,
        g && f._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')),
        f._protocols = [],
        f.protocol = null,
        f.readyState = y.CONNECTING,
        f._ir = S(f._base_url),
        f._ir.onfinish = function(a, b) {
            f._ir = null,
            a ? (f._options.info && (a = c.objectExtend(a, f._options.info)),
            f._options.rtt && (b = f._options.rtt),
            f._applyInfo(a, b, g),
            f._didClose()) : f._didClose(1002, "Can't connect to server", !0)
        }
    };
    y.prototype = new d,
    y.version = "--minify",
    y.CONNECTING = 0,
    y.OPEN = 1,
    y.CLOSING = 2,
    y.CLOSED = 3,
    y.prototype._debug = function() {
        this._options.debug && c.log.apply(c, arguments)
    }
    ,
    y.prototype._dispatchOpen = function() {
        var a = this;
        a.readyState === y.CONNECTING ? (a._transport_tref && (clearTimeout(a._transport_tref),
        a._transport_tref = null),
        a.readyState = y.OPEN,
        a.dispatchEvent(new e("open"))) : a._didClose(1006, "Server lost session")
    }
    ,
    y.prototype._dispatchMessage = function(a) {
        var b = this;
        if (b.readyState !== y.OPEN)
            return;
        b.dispatchEvent(new e("message",{
            data: a
        }))
    }
    ,
    y.prototype._dispatchHeartbeat = function(a) {
        var b = this;
        if (b.readyState !== y.OPEN)
            return;
        b.dispatchEvent(new e("heartbeat",{}))
    }
    ,
    y.prototype._didClose = function(a, b, d) {
        var f = this;
        if (f.readyState !== y.CONNECTING && f.readyState !== y.OPEN && f.readyState !== y.CLOSING)
            throw new Error("INVALID_STATE_ERR");
        f._ir && (f._ir.nuke(),
        f._ir = null),
        f._transport && (f._transport.doCleanup(),
        f._transport = null);
        var g = new e("close",{
            code: a,
            reason: b,
            wasClean: c.userSetCode(a)
        });
        if (!c.userSetCode(a) && f.readyState === y.CONNECTING && !d) {
            if (f._try_next_protocol(g))
                return;
            g = new e("close",{
                code: 2e3,
                reason: "All transports failed",
                wasClean: !1,
                last_event: g
            })
        }
        f.readyState = y.CLOSED,
        c.delay(function() {
            f.dispatchEvent(g)
        })
    }
    ,
    y.prototype._didMessage = function(a) {
        var b = this
          , c = a.slice(0, 1);
        switch (c) {
        case "o":
            b._dispatchOpen();
            break;
        case "a":
            var d = JSON.parse(a.slice(1) || "[]");
            for (var e = 0; e < d.length; e++)
                b._dispatchMessage(d[e]);
            break;
        case "m":
            var d = JSON.parse(a.slice(1) || "null");
            b._dispatchMessage(d);
            break;
        case "c":
            var d = JSON.parse(a.slice(1) || "[]");
            b._didClose(d[0], d[1]);
            break;
        case "h":
            b._dispatchHeartbeat()
        }
    }
    ,
    y.prototype._try_next_protocol = function(b) {
        var d = this;
        d.protocol && (d._debug("Closed transport:", d.protocol, "" + b),
        d.protocol = null),
        d._transport_tref && (clearTimeout(d._transport_tref),
        d._transport_tref = null);
        for (; ; ) {
            var e = d.protocol = d._protocols.shift();
            if (!e)
                return !1;
            if (y[e] && y[e].need_body === !0 && (!a.body || typeof a.readyState != "undefined" && a.readyState !== "complete"))
                return d._protocols.unshift(e),
                d.protocol = "waiting-for-load",
                c.attachEvent("load", function() {
                    d._try_next_protocol()
                }),
                !0;
            if (!!y[e] && !!y[e].enabled(d._options)) {
                var f = y[e].roundTrips || 1
                  , g = (d._options.rto || 0) * f || 5e3;
                d._transport_tref = c.delay(g, function() {
                    d.readyState === y.CONNECTING && d._didClose(2007, "Transport timeouted")
                });
                var h = c.random_string(8)
                  , i = d._base_url + "/" + d._server + "/" + h;
                return d._debug("Opening transport:", e, " url:" + i, " RTO:" + d._options.rto),
                d._transport = new y[e](d,i,d._base_url),
                !0
            }
            d._debug("Skipping transport:", e)
        }
    }
    ,
    y.prototype.close = function(a, b) {
        var d = this;
        if (a && !c.userSetCode(a))
            throw new Error("INVALID_ACCESS_ERR");
        return d.readyState !== y.CONNECTING && d.readyState !== y.OPEN ? !1 : (d.readyState = y.CLOSING,
        d._didClose(a || 1e3, b || "Normal closure"),
        !0)
    }
    ,
    y.prototype.send = function(a) {
        var b = this;
        if (b.readyState === y.CONNECTING)
            throw new Error("INVALID_STATE_ERR");
        return b.readyState === y.OPEN && b._transport.doSend(c.quote("" + a)),
        !0
    }
    ,
    y.prototype._applyInfo = function(b, d, e) {
        var f = this;
        f._options.info = b,
        f._options.rtt = d,
        f._options.rto = c.countRTO(d),
        f._options.info.null_origin = !a.domain;
        var g = c.probeProtocols();
        f._protocols = c.detectProtocols(g, e, b)
    }
    ;
    var z = y.websocket = function(a, d) {
        var e = this
          , f = d + "/websocket";
        f.slice(0, 5) === "https" ? f = "wss" + f.slice(5) : f = "ws" + f.slice(4),
        e.ri = a,
        e.url = f;
        var g = b.WebSocket || b.MozWebSocket;
        e.ws = new g(e.url),
        e.ws.onmessage = function(a) {
            e.ri._didMessage(a.data)
        }
        ,
        e.unload_ref = c.unload_add(function() {
            e.ws.close()
        }),
        e.ws.onclose = function() {
            e.ri._didMessage(c.closeFrame(1006, "WebSocket connection broken"))
        }
    }
    ;
    z.prototype.doSend = function(a) {
        this.ws.send("[" + a + "]")
    }
    ,
    z.prototype.doCleanup = function() {
        var a = this
          , b = a.ws;
        b && (b.onmessage = b.onclose = null,
        b.close(),
        c.unload_del(a.unload_ref),
        a.unload_ref = a.ri = a.ws = null)
    }
    ,
    z.enabled = function() {
        return !!b.WebSocket || !!b.MozWebSocket
    }
    ,
    z.roundTrips = 2;
    var A = function() {};
    A.prototype.send_constructor = function(a) {
        var b = this;
        b.send_buffer = [],
        b.sender = a
    }
    ,
    A.prototype.doSend = function(a) {
        var b = this;
        b.send_buffer.push(a),
        b.send_stop || b.send_schedule()
    }
    ,
    A.prototype.send_schedule_wait = function() {
        var a = this, b;
        a.send_stop = function() {
            a.send_stop = null,
            clearTimeout(b)
        }
        ,
        b = c.delay(25, function() {
            a.send_stop = null,
            a.send_schedule()
        })
    }
    ,
    A.prototype.send_schedule = function() {
        var a = this;
        if (a.send_buffer.length > 0) {
            var b = "[" + a.send_buffer.join(",") + "]";
            a.send_stop = a.sender(a.trans_url, b, function(b, c) {
                a.send_stop = null,
                b === !1 ? a.ri._didClose(1006, "Sending error " + c) : a.send_schedule_wait()
            }),
            a.send_buffer = []
        }
    }
    ,
    A.prototype.send_destructor = function() {
        var a = this;
        a._send_stop && a._send_stop(),
        a._send_stop = null
    }
    ;
    var B = function(b, d, e) {
        var f = this;
        if (!("_send_form"in f)) {
            var g = f._send_form = a.createElement("form")
              , h = f._send_area = a.createElement("textarea");
            h.name = "d",
            g.style.display = "none",
            g.style.position = "absolute",
            g.method = "POST",
            g.enctype = "application/x-www-form-urlencoded",
            g.acceptCharset = "UTF-8",
            g.appendChild(h),
            a.body.appendChild(g)
        }
        var g = f._send_form
          , h = f._send_area
          , i = "a" + c.random_string(8);
        g.target = i,
        g.action = b + "/jsonp_send?i=" + i;
        var j;
        try {
            j = a.createElement('<iframe name="' + i + '">')
        } catch (k) {
            j = a.createElement("iframe"),
            j.name = i
        }
        j.id = i,
        g.appendChild(j),
        j.style.display = "none";
        try {
            h.value = d
        } catch (l) {
            c.log("Your browser is seriously broken. Go home! " + l.message)
        }
        g.submit();
        var m = function(a) {
            if (!j.onerror)
                return;
            j.onreadystatechange = j.onerror = j.onload = null,
            c.delay(500, function() {
                j.parentNode.removeChild(j),
                j = null
            }),
            h.value = "",
            e(!0)
        };
        return j.onerror = j.onload = m,
        j.onreadystatechange = function(a) {
            j.readyState == "complete" && m()
        }
        ,
        m
    }
      , C = function(a) {
        return function(b, c, d) {
            var e = new a("POST",b + "/xhr_send",c);
            return e.onfinish = function(a, b) {
                d(a === 200 || a === 204, "http status " + a)
            }
            ,
            function(a) {
                d(!1, a)
            }
        }
    }
      , D = function(b, d) {
        var e, f = a.createElement("script"), g, h = function(a) {
            g && (g.parentNode.removeChild(g),
            g = null),
            f && (clearTimeout(e),
            f.parentNode.removeChild(f),
            f.onreadystatechange = f.onerror = f.onload = f.onclick = null,
            f = null,
            d(a),
            d = null)
        }, i = !1, j = null;
        f.id = "a" + c.random_string(8),
        f.src = b,
        f.type = "text/javascript",
        f.charset = "UTF-8",
        f.onerror = function(a) {
            j || (j = setTimeout(function() {
                i || h(c.closeFrame(1006, "JSONP script loaded abnormally (onerror)"))
            }, 1e3))
        }
        ,
        f.onload = function(a) {
            h(c.closeFrame(1006, "JSONP script loaded abnormally (onload)"))
        }
        ,
        f.onreadystatechange = function(a) {
            if (/loaded|closed/.test(f.readyState)) {
                if (f && f.htmlFor && f.onclick) {
                    i = !0;
                    try {
                        f.onclick()
                    } catch (b) {}
                }
                f && h(c.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"))
            }
        }
        ;
        if (typeof f.async == "undefined" && a.attachEvent)
            if (!/opera/i.test(navigator.userAgent)) {
                try {
                    f.htmlFor = f.id,
                    f.event = "onclick"
                } catch (k) {}
                f.async = !0
            } else
                g = a.createElement("script"),
                g.text = "try{var a = document.getElementById('" + f.id + "'); if(a)a.onerror();}catch(x){};",
                f.async = g.async = !1;
        typeof f.async != "undefined" && (f.async = !0),
        e = setTimeout(function() {
            h(c.closeFrame(1006, "JSONP script loaded abnormally (timeout)"))
        }, 35e3);
        var l = a.getElementsByTagName("head")[0];
        return l.insertBefore(f, l.firstChild),
        g && l.insertBefore(g, l.firstChild),
        h
    }
      , E = y["jsonp-polling"] = function(a, b) {
        c.polluteGlobalNamespace();
        var d = this;
        d.ri = a,
        d.trans_url = b,
        d.send_constructor(B),
        d._schedule_recv()
    }
    ;
    E.prototype = new A,
    E.prototype._schedule_recv = function() {
        var a = this
          , b = function(b) {
            a._recv_stop = null,
            b && (a._is_closing || a.ri._didMessage(b)),
            a._is_closing || a._schedule_recv()
        };
        a._recv_stop = F(a.trans_url + "/jsonp", D, b)
    }
    ,
    E.enabled = function() {
        return !0
    }
    ,
    E.need_body = !0,
    E.prototype.doCleanup = function() {
        var a = this;
        a._is_closing = !0,
        a._recv_stop && a._recv_stop(),
        a.ri = a._recv_stop = null,
        a.send_destructor()
    }
    ;
    var F = function(a, d, e) {
        var f = "a" + c.random_string(6)
          , g = a + "?c=" + escape(h + "." + f)
          , i = 0
          , j = function(a) {
            switch (i) {
            case 0:
                delete b[h][f],
                e(a);
                break;
            case 1:
                e(a),
                i = 2;
                break;
            case 2:
                delete b[h][f]
            }
        }
          , k = d(g, j);
        b[h][f] = k;
        var l = function() {
            b[h][f] && (i = 1,
            b[h][f](c.closeFrame(1e3, "JSONP user aborted read")))
        };
        return l
    }
      , G = function() {};
    G.prototype = new A,
    G.prototype.run = function(a, b, c, d, e) {
        var f = this;
        f.ri = a,
        f.trans_url = b,
        f.send_constructor(C(e)),
        f.poll = new $(a,d,b + c,e)
    }
    ,
    G.prototype.doCleanup = function() {
        var a = this;
        a.poll && (a.poll.abort(),
        a.poll = null)
    }
    ;
    var H = y["xhr-streaming"] = function(a, b) {
        this.run(a, b, "/xhr_streaming", bd, c.XHRCorsObject)
    }
    ;
    H.prototype = new G,
    H.enabled = function() {
        return b.XMLHttpRequest && "withCredentials"in new XMLHttpRequest && !/opera/i.test(navigator.userAgent)
    }
    ,
    H.roundTrips = 2,
    H.need_body = !0;
    var I = y["xdr-streaming"] = function(a, b) {
        this.run(a, b, "/xhr_streaming", bd, c.XDRObject)
    }
    ;
    I.prototype = new G,
    I.enabled = function() {
        return !!b.XDomainRequest
    }
    ,
    I.roundTrips = 2;
    var J = y["xhr-polling"] = function(a, b) {
        this.run(a, b, "/xhr", bd, c.XHRCorsObject)
    }
    ;
    J.prototype = new G,
    J.enabled = H.enabled,
    J.roundTrips = 2;
    var K = y["xdr-polling"] = function(a, b) {
        this.run(a, b, "/xhr", bd, c.XDRObject)
    }
    ;
    K.prototype = new G,
    K.enabled = I.enabled,
    K.roundTrips = 2;
    var L = function() {};
    L.prototype.i_constructor = function(a, b, d) {
        var e = this;
        e.ri = a,
        e.origin = c.getOrigin(d),
        e.base_url = d,
        e.trans_url = b;
        var f = d + "/iframe.html";
        e.ri._options.devel && (f += "?t=" + +(new Date)),
        e.window_id = c.random_string(8),
        f += "#" + e.window_id,
        e.iframeObj = c.createIframe(f, function(a) {
            e.ri._didClose(1006, "Unable to load an iframe (" + a + ")")
        }),
        e.onmessage_cb = c.bind(e.onmessage, e),
        c.attachMessage(e.onmessage_cb)
    }
    ,
    L.prototype.doCleanup = function() {
        var a = this;
        if (a.iframeObj) {
            c.detachMessage(a.onmessage_cb);
            try {
                a.iframeObj.iframe.contentWindow && a.postMessage("c")
            } catch (b) {}
            a.iframeObj.cleanup(),
            a.iframeObj = null,
            a.onmessage_cb = a.iframeObj = null
        }
    }
    ,
    L.prototype.onmessage = function(a) {
        var b = this;
        if (a.origin !== b.origin)
            return;
        var c = a.data.slice(0, 8)
          , d = a.data.slice(8, 9)
          , e = a.data.slice(9);
        if (c !== b.window_id)
            return;
        switch (d) {
        case "s":
            b.iframeObj.loaded(),
            b.postMessage("s", JSON.stringify([y.version, b.protocol, b.trans_url, b.base_url]));
            break;
        case "t":
            b.ri._didMessage(e)
        }
    }
    ,
    L.prototype.postMessage = function(a, b) {
        var c = this;
        c.iframeObj.post(c.window_id + a + (b || ""), c.origin)
    }
    ,
    L.prototype.doSend = function(a) {
        this.postMessage("m", a)
    }
    ,
    L.enabled = function() {
        var a = navigator && navigator.userAgent && navigator.userAgent.indexOf("Konqueror") !== -1;
        return (typeof b.postMessage == "function" || typeof b.postMessage == "object") && !a
    }
    ;
    var M, N = function(a, d) {
        parent !== b ? parent.postMessage(M + a + (d || ""), "*") : c.log("Can't postMessage, no parent window.", a, d)
    }, O = function() {};
    O.prototype._didClose = function(a, b) {
        N("t", c.closeFrame(a, b))
    }
    ,
    O.prototype._didMessage = function(a) {
        N("t", a)
    }
    ,
    O.prototype._doSend = function(a) {
        this._transport.doSend(a)
    }
    ,
    O.prototype._doCleanup = function() {
        this._transport.doCleanup()
    }
    ,
    c.parent_origin = undefined,
    y.bootstrap_iframe = function() {
        var d;
        M = a.location.hash.slice(1);
        var e = function(a) {
            if (a.source !== parent)
                return;
            typeof c.parent_origin == "undefined" && (c.parent_origin = a.origin);
            if (a.origin !== c.parent_origin)
                return;
            var e = a.data.slice(0, 8)
              , f = a.data.slice(8, 9)
              , g = a.data.slice(9);
            if (e !== M)
                return;
            switch (f) {
            case "s":
                var h = JSON.parse(g)
                  , i = h[0]
                  , j = h[1]
                  , k = h[2]
                  , l = h[3];
                i !== y.version && c.log('Incompatibile SockJS! Main site uses: "' + i + '", the iframe:' + ' "' + y.version + '".');
                if (!c.flatUrl(k) || !c.flatUrl(l)) {
                    c.log("Only basic urls are supported in SockJS");
                    return
                }
                if (!c.isSameOriginUrl(k) || !c.isSameOriginUrl(l)) {
                    c.log("Can't connect to different domain from within an iframe. (" + JSON.stringify([b.location.href, k, l]) + ")");
                    return
                }
                d = new O,
                d._transport = new O[j](d,k,l);
                break;
            case "m":
                d._doSend(g);
                break;
            case "c":
                d && d._doCleanup(),
                d = null
            }
        };
        c.attachMessage(e),
        N("s")
    }
    ;
    var P = function(a, b) {
        var d = this;
        c.delay(function() {
            d.doXhr(a, b)
        })
    };
    P.prototype = new f(["finish"]),
    P.prototype.doXhr = function(a, b) {
        var d = this
          , e = (new Date).getTime()
          , f = new b("GET",a + "/info")
          , g = c.delay(8e3, function() {
            f.ontimeout()
        });
        f.onfinish = function(a, b) {
            clearTimeout(g),
            g = null;
            if (a === 200) {
                var c = (new Date).getTime() - e
                  , f = JSON.parse(b);
                typeof f != "object" && (f = {}),
                d.emit("finish", f, c)
            } else
                d.emit("finish")
        }
        ,
        f.ontimeout = function() {
            f.close(),
            d.emit("finish")
        }
    }
    ;
    var Q = function(b) {
        var d = this
          , e = function() {
            var a = new L;
            a.protocol = "w-iframe-info-receiver";
            var c = function(b) {
                if (typeof b == "string" && b.substr(0, 1) === "m") {
                    var c = JSON.parse(b.substr(1))
                      , e = c[0]
                      , f = c[1];
                    d.emit("finish", e, f)
                } else
                    d.emit("finish");
                a.doCleanup(),
                a = null
            }
              , e = {
                _options: {},
                _didClose: c,
                _didMessage: c
            };
            a.i_constructor(e, b, b)
        };
        a.body ? e() : c.attachEvent("load", e)
    };
    Q.prototype = new f(["finish"]);
    var R = function() {
        var a = this;
        c.delay(function() {
            a.emit("finish", {}, 2e3)
        })
    };
    R.prototype = new f(["finish"]);
    var S = function(a) {
        if (c.isSameOriginUrl(a))
            return new P(a,c.XHRLocalObject);
        switch (c.isXHRCorsCapable()) {
        case 1:
            return new P(a,c.XHRLocalObject);
        case 2:
            return new P(a,c.XDRObject);
        case 3:
            return new Q(a);
        default:
            return new R
        }
    }
      , T = O["w-iframe-info-receiver"] = function(a, b, d) {
        var e = new P(d,c.XHRLocalObject);
        e.onfinish = function(b, c) {
            a._didMessage("m" + JSON.stringify([b, c])),
            a._didClose()
        }
    }
    ;
    T.prototype.doCleanup = function() {}
    ;
    var U = y["iframe-eventsource"] = function() {
        var a = this;
        a.protocol = "w-iframe-eventsource",
        a.i_constructor.apply(a, arguments)
    }
    ;
    U.prototype = new L,
    U.enabled = function() {
        return "EventSource"in b && L.enabled()
    }
    ,
    U.need_body = !0,
    U.roundTrips = 3;
    var V = O["w-iframe-eventsource"] = function(a, b) {
        this.run(a, b, "/eventsource", _, c.XHRLocalObject)
    }
    ;
    V.prototype = new G;
    var W = y["iframe-xhr-polling"] = function() {
        var a = this;
        a.protocol = "w-iframe-xhr-polling",
        a.i_constructor.apply(a, arguments)
    }
    ;
    W.prototype = new L,
    W.enabled = function() {
        return b.XMLHttpRequest && L.enabled()
    }
    ,
    W.need_body = !0,
    W.roundTrips = 3;
    var X = O["w-iframe-xhr-polling"] = function(a, b) {
        this.run(a, b, "/xhr", bd, c.XHRLocalObject)
    }
    ;
    X.prototype = new G;
    var Y = y["iframe-htmlfile"] = function() {
        var a = this;
        a.protocol = "w-iframe-htmlfile",
        a.i_constructor.apply(a, arguments)
    }
    ;
    Y.prototype = new L,
    Y.enabled = function() {
        return L.enabled()
    }
    ,
    Y.need_body = !0,
    Y.roundTrips = 3;
    var Z = O["w-iframe-htmlfile"] = function(a, b) {
        this.run(a, b, "/htmlfile", bc, c.XHRLocalObject)
    }
    ;
    Z.prototype = new G;
    var $ = function(a, b, c, d) {
        var e = this;
        e.ri = a,
        e.Receiver = b,
        e.recv_url = c,
        e.AjaxObject = d,
        e._scheduleRecv()
    };
    $.prototype._scheduleRecv = function() {
        var a = this
          , b = a.poll = new a.Receiver(a.recv_url,a.AjaxObject)
          , c = 0;
        b.onmessage = function(b) {
            c += 1,
            a.ri._didMessage(b.data)
        }
        ,
        b.onclose = function(c) {
            a.poll = b = b.onmessage = b.onclose = null,
            a.poll_is_closing || (c.reason === "permanent" ? a.ri._didClose(1006, "Polling error (" + c.reason + ")") : a._scheduleRecv())
        }
    }
    ,
    $.prototype.abort = function() {
        var a = this;
        a.poll_is_closing = !0,
        a.poll && a.poll.abort()
    }
    ;
    var _ = function(a) {
        var b = this
          , d = new EventSource(a);
        d.onmessage = function(a) {
            b.dispatchEvent(new e("message",{
                data: unescape(a.data)
            }))
        }
        ,
        b.es_close = d.onerror = function(a, f) {
            var g = f ? "user" : d.readyState !== 2 ? "network" : "permanent";
            b.es_close = d.onmessage = d.onerror = null,
            d.close(),
            d = null,
            c.delay(200, function() {
                b.dispatchEvent(new e("close",{
                    reason: g
                }))
            })
        }
    };
    _.prototype = new d,
    _.prototype.abort = function() {
        var a = this;
        a.es_close && a.es_close({}, !0)
    }
    ;
    var ba, bb = function() {
        if (ba === undefined)
            if ("ActiveXObject"in b)
                try {
                    ba = !!(new ActiveXObject("htmlfile"))
                } catch (a) {}
            else
                ba = !1;
        return ba
    }, bc = function(a) {
        var d = this;
        c.polluteGlobalNamespace(),
        d.id = "a" + c.random_string(6, 26),
        a += (a.indexOf("?") === -1 ? "?" : "&") + "c=" + escape(h + "." + d.id);
        var f = bb() ? c.createHtmlfile : c.createIframe, g;
        b[h][d.id] = {
            start: function() {
                g.loaded()
            },
            message: function(a) {
                d.dispatchEvent(new e("message",{
                    data: a
                }))
            },
            stop: function() {
                d.iframe_close({}, "network")
            }
        },
        d.iframe_close = function(a, c) {
            g.cleanup(),
            d.iframe_close = g = null,
            delete b[h][d.id],
            d.dispatchEvent(new e("close",{
                reason: c
            }))
        }
        ,
        g = f(a, function(a) {
            d.iframe_close({}, "permanent")
        })
    };
    bc.prototype = new d,
    bc.prototype.abort = function() {
        var a = this;
        a.iframe_close && a.iframe_close({}, "user")
    }
    ;
    var bd = function(a, b) {
        var c = this
          , d = 0;
        c.xo = new b("POST",a,null),
        c.xo.onchunk = function(a, b) {
            if (a !== 200)
                return;
            for (; ; ) {
                var f = b.slice(d)
                  , g = f.indexOf("\n");
                if (g === -1)
                    break;
                d += g + 1;
                var h = f.slice(0, g);
                c.dispatchEvent(new e("message",{
                    data: h
                }))
            }
        }
        ,
        c.xo.onfinish = function(a, b) {
            c.xo.onchunk(a, b),
            c.xo = null;
            var d = a === 200 ? "network" : "permanent";
            c.dispatchEvent(new e("close",{
                reason: d
            }))
        }
    };
    return bd.prototype = new d,
    bd.prototype.abort = function() {
        var a = this;
        a.xo && (a.xo.close(),
        a.dispatchEvent(new e("close",{
            reason: "user"
        })),
        a.xo = null)
    }
    ,
    y.getUtils = function() {
        return c
    }
    ,
    y.getIframeTransport = function() {
        return L
    }
    ,
    y
}(),
"_sockjs_onload"in window && setTimeout(_sockjs_onload, 1),
typeof define == "function" && define.amd && define("sockjs", [], function() {
    return SockJS
})
