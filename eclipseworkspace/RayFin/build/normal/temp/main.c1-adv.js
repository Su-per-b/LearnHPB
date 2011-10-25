function h(a) {
  throw a;
}
var k = void 0, l = null;
function p() {
  return function() {
  }
}
function aa(a) {
  return function() {
    return this[a]
  }
}
var r, t = this;
function ba(a) {
  for(var a = a.split("."), b = t, c;c = a.shift();) {
    if(b[c] != l) {
      b = b[c]
    }else {
      return l
    }
  }
  return b
}
function u() {
}
function w(a) {
  var b = typeof a;
  if(b == "object") {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }else {
        if(a instanceof Object) {
          return b
        }
      }
      var c = Object.prototype.toString.call(a);
      if(c == "[object Window]") {
        return"object"
      }
      if(c == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(c == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(b == "function" && typeof a.call == "undefined") {
      return"object"
    }
  }
  return b
}
function ca(a) {
  var b = w(a);
  return b == "array" || b == "object" && typeof a.length == "number"
}
function da(a) {
  return typeof a == "string"
}
function ea(a) {
  return a[fa] || (a[fa] = ++ga)
}
var fa = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36), ga = 0;
function ha(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function ia(a, b, c) {
  a || h(Error());
  if(arguments.length > 2) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }else {
    return function() {
      return a.apply(b, arguments)
    }
  }
}
function ja(a, b, c) {
  ja = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? ha : ia;
  return ja.apply(l, arguments)
}
var ka = Date.now || function() {
  return+new Date
};
function x(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.Ea = b.prototype;
  a.prototype = new c
}
;function la(a) {
  this.stack = Error().stack || "";
  if(a) {
    this.message = String(a)
  }
}
x(la, Error);
la.prototype.name = "CustomError";
function ma(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
}
function na(a) {
  if(!oa.test(a)) {
    return a
  }
  a.indexOf("&") != -1 && (a = a.replace(pa, "&amp;"));
  a.indexOf("<") != -1 && (a = a.replace(qa, "&lt;"));
  a.indexOf(">") != -1 && (a = a.replace(ra, "&gt;"));
  a.indexOf('"') != -1 && (a = a.replace(sa, "&quot;"));
  return a
}
var pa = /&/g, qa = /</g, ra = />/g, sa = /\"/g, oa = /[&<>\"]/;
function ta(a, b) {
  for(var c = 0, d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), f = String(b).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(d.length, f.length), g = 0;c == 0 && g < e;g++) {
    var i = d[g] || "", n = f[g] || "", m = RegExp("(\\d*)(\\D*)", "g"), s = RegExp("(\\d*)(\\D*)", "g");
    do {
      var o = m.exec(i) || ["", "", ""], j = s.exec(n) || ["", "", ""];
      if(o[0].length == 0 && j[0].length == 0) {
        break
      }
      c = ua(o[1].length == 0 ? 0 : parseInt(o[1], 10), j[1].length == 0 ? 0 : parseInt(j[1], 10)) || ua(o[2].length == 0, j[2].length == 0) || ua(o[2], j[2])
    }while(c == 0)
  }
  return c
}
function ua(a, b) {
  if(a < b) {
    return-1
  }else {
    if(a > b) {
      return 1
    }
  }
  return 0
}
;function va(a, b) {
  b.unshift(a);
  la.call(this, ma.apply(l, b));
  b.shift();
  this.Fd = a
}
x(va, la);
va.prototype.name = "AssertionError";
function ya(a, b) {
  h(new va("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var za = Array.prototype, Aa = za.indexOf ? function(a, b, c) {
  return za.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == l ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
  if(da(a)) {
    return!da(b) || b.length != 1 ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, Ba = za.forEach ? function(a, b, c) {
  za.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, f = da(a) ? a.split("") : a, e = 0;e < d;e++) {
    e in f && b.call(c, f[e], e, a)
  }
};
function Ca(a) {
  var b = y, c;
  for(c in b) {
    a.call(k, b[c], c, b)
  }
}
var Ea = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
function Fa(a, b) {
  for(var c, d, f = 1;f < arguments.length;f++) {
    d = arguments[f];
    for(c in d) {
      a[c] = d[c]
    }
    for(var e = 0;e < Ea.length;e++) {
      c = Ea[e], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var Ga = "StopIteration" in t ? t.StopIteration : Error("StopIteration");
function Ha() {
}
Ha.prototype.next = function() {
  h(Ga)
};
Ha.prototype.Ia = function() {
  return this
};
function Ia(a) {
  if(a instanceof Ha) {
    return a
  }
  if(typeof a.Ia == "function") {
    return a.Ia(!1)
  }
  if(ca(a)) {
    var b = 0, c = new Ha;
    c.next = function() {
      for(;;) {
        if(b >= a.length && h(Ga), b in a) {
          return a[b++]
        }else {
          b++
        }
      }
    };
    return c
  }
  h(Error("Not implemented"))
}
function Ja(a, b) {
  if(ca(a)) {
    try {
      Ba(a, b, k)
    }catch(c) {
      c !== Ga && h(c)
    }
  }else {
    a = Ia(a);
    try {
      for(;;) {
        b.call(k, a.next(), k, a)
      }
    }catch(d) {
      d !== Ga && h(d)
    }
  }
}
;function Ka(a, b) {
  this.F = {};
  this.f = [];
  var c = arguments.length;
  if(c > 1) {
    c % 2 && h(Error("Uneven number of arguments"));
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      var f;
      if(a instanceof Ka) {
        d = La(a);
        Ma(a);
        f = [];
        for(c = 0;c < a.f.length;c++) {
          f.push(a.F[a.f[c]])
        }
      }else {
        var c = [], e = 0;
        for(d in a) {
          c[e++] = d
        }
        d = c;
        c = [];
        e = 0;
        for(f in a) {
          c[e++] = a[f]
        }
        f = c
      }
      for(c = 0;c < d.length;c++) {
        this.set(d[c], f[c])
      }
    }
  }
}
r = Ka.prototype;
r.e = 0;
r.Ga = 0;
function La(a) {
  Ma(a);
  return a.f.concat()
}
r.clear = function() {
  this.F = {};
  this.Ga = this.e = this.f.length = 0
};
function Ma(a) {
  if(a.e != a.f.length) {
    for(var b = 0, c = 0;b < a.f.length;) {
      var d = a.f[b];
      Object.prototype.hasOwnProperty.call(a.F, d) && (a.f[c++] = d);
      b++
    }
    a.f.length = c
  }
  if(a.e != a.f.length) {
    for(var f = {}, c = b = 0;b < a.f.length;) {
      d = a.f[b], Object.prototype.hasOwnProperty.call(f, d) || (a.f[c++] = d, f[d] = 1), b++
    }
    a.f.length = c
  }
}
r.get = function(a, b) {
  return Object.prototype.hasOwnProperty.call(this.F, a) ? this.F[a] : b
};
r.set = function(a, b) {
  Object.prototype.hasOwnProperty.call(this.F, a) || (this.e++, this.f.push(a), this.Ga++);
  this.F[a] = b
};
r.clone = function() {
  return new Ka(this)
};
r.Ia = function(a) {
  Ma(this);
  var b = 0, c = this.f, d = this.F, f = this.Ga, e = this, g = new Ha;
  g.next = function() {
    for(;;) {
      f != e.Ga && h(Error("The map has changed since the iterator was created"));
      b >= c.length && h(Ga);
      var g = c[b++];
      return a ? g : d[g]
    }
  };
  return g
};
var z, Na, Oa, Pa;
function Qa() {
  return t.navigator ? t.navigator.userAgent : l
}
Pa = Oa = Na = z = !1;
var Ra;
if(Ra = Qa()) {
  var Sa = t.navigator;
  z = Ra.indexOf("Opera") == 0;
  Na = !z && Ra.indexOf("MSIE") != -1;
  Oa = !z && Ra.indexOf("WebKit") != -1;
  Pa = !z && !Oa && Sa.product == "Gecko"
}
var A = Na, Ta = Pa, Ua = Oa, Va = t.navigator, Xa = (Va && Va.platform || "").indexOf("Mac") != -1, Ya;
a: {
  var Za = "", $a;
  if(z && t.opera) {
    var ab = t.opera.version, Za = typeof ab == "function" ? ab() : ab
  }else {
    if(Ta ? $a = /rv\:([^\);]+)(\)|;)/ : A ? $a = /MSIE\s+([^\);]+)(\)|;)/ : Ua && ($a = /WebKit\/(\S+)/), $a) {
      var bb = $a.exec(Qa()), Za = bb ? bb[1] : ""
    }
  }
  if(A) {
    var cb, db = t.document;
    cb = db ? db.documentMode : k;
    if(cb > parseFloat(Za)) {
      Ya = String(cb);
      break a
    }
  }
  Ya = Za
}
var eb = {}, fb = {};
function gb() {
  return fb[9] || (fb[9] = A && document.documentMode && document.documentMode >= 9)
}
;function hb(a) {
  return ib(a || arguments.callee.caller, [])
}
function ib(a, b) {
  var c = [];
  if(Aa(b, a) >= 0) {
    c.push("[...circular reference...]")
  }else {
    if(a && b.length < 50) {
      c.push(jb(a) + "(");
      for(var d = a.arguments, f = 0;f < d.length;f++) {
        f > 0 && c.push(", ");
        var e;
        e = d[f];
        switch(typeof e) {
          case "object":
            e = e ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            e = String(e);
            break;
          case "boolean":
            e = e ? "true" : "false";
            break;
          case "function":
            e = (e = jb(e)) ? e : "[fn]";
            break;
          default:
            e = typeof e
        }
        e.length > 40 && (e = e.substr(0, 40) + "...");
        c.push(e)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(ib(a.caller, b))
      }catch(g) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function jb(a) {
  if(kb[a]) {
    return kb[a]
  }
  a = String(a);
  if(!kb[a]) {
    var b = /function ([^\(]+)/.exec(a);
    kb[a] = b ? b[1] : "[Anonymous]"
  }
  return kb[a]
}
var kb = {};
function B(a, b, c, d, f) {
  this.reset(a, b, c, d, f)
}
B.prototype.Zc = 0;
B.prototype.Ta = l;
B.prototype.Sa = l;
var lb = 0;
B.prototype.reset = function(a, b, c, d, f) {
  this.Zc = typeof f == "number" ? f : lb++;
  this.bc = d || ka();
  this.L = a;
  this.Fb = b;
  this.Cb = c;
  delete this.Ta;
  delete this.Sa
};
B.prototype.Ub = function(a) {
  this.L = a
};
function C(a) {
  this.Gb = a
}
C.prototype.Aa = l;
C.prototype.L = l;
C.prototype.Ja = l;
C.prototype.yb = l;
function D(a, b) {
  this.name = a;
  this.value = b
}
D.prototype.toString = aa("name");
var mb = new D("SHOUT", 1200), nb = new D("SEVERE", 1E3), ob = new D("WARNING", 900), pb = new D("INFO", 800), qb = new D("CONFIG", 700);
r = C.prototype;
r.getName = aa("Gb");
r.getParent = aa("Aa");
r.Ub = function(a) {
  this.L = a
};
function rb(a) {
  if(a.L) {
    return a.L
  }
  if(a.Aa) {
    return rb(a.Aa)
  }
  ya("Root logger has no level set.");
  return l
}
r.log = function(a, b, c) {
  if(a.value >= rb(this).value) {
    a = this.vc(a, b, c);
    b = "log:" + a.Fb;
    t.console && (t.console.timeStamp ? t.console.timeStamp(b) : t.console.markTimeline && t.console.markTimeline(b));
    t.msWriteProfilerMark && t.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.yb) {
        for(var f = 0, e = k;e = c.yb[f];f++) {
          e(d)
        }
      }
      b = b.getParent()
    }
  }
};
r.vc = function(a, b, c) {
  var d = new B(a, String(b), this.Gb);
  if(c) {
    d.Ta = c;
    var f;
    var e = arguments.callee.caller;
    try {
      var g;
      var i = ba("window.location.href");
      if(da(c)) {
        g = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:i, stack:"Not available"}
      }else {
        var n, m, s = !1;
        try {
          n = c.lineNumber || c.Dd || "Not available"
        }catch(o) {
          n = "Not available", s = !0
        }
        try {
          m = c.fileName || c.filename || c.sourceURL || i
        }catch(j) {
          m = "Not available", s = !0
        }
        g = s || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:n, fileName:m, stack:c.stack || "Not available"} : c
      }
      f = "Message: " + na(g.message) + '\nUrl: <a href="view-source:' + g.fileName + '" target="_new">' + g.fileName + "</a>\nLine: " + g.lineNumber + "\n\nBrowser stack:\n" + na(g.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + na(hb(e) + "-> ")
    }catch(v) {
      f = "Exception trying to expose exception! You win, we lose. " + v
    }
    d.Sa = f
  }
  return d
};
r.Ma = function(a, b) {
  this.log(qb, a, b)
};
var sb = {}, tb = l;
function ub(a) {
  tb || (tb = new C(""), sb[""] = tb, tb.Ub(qb));
  var b;
  if(!(b = sb[a])) {
    b = new C(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = ub(a.substr(0, c));
    if(!c.Ja) {
      c.Ja = {}
    }
    c.Ja[d] = b;
    b.Aa = c;
    sb[a] = b
  }
  return b
}
;var vb, wb;
function xb() {
  return"{0} - v{1}".m("Learn Grean Buildings - RayFin", "0.00.11")
}
;!A || gb();
var yb = !A || gb(), zb = A && !(eb["8"] || (eb["8"] = ta(Ya, "8") >= 0));
function H() {
}
H.prototype.wb = !1;
H.prototype.Q = function() {
  if(!this.wb) {
    this.wb = !0, this.B()
  }
};
H.prototype.B = function() {
  this.sc && Ab.apply(l, this.sc)
};
function Ab(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    ca(d) ? Ab.apply(l, d) : d && typeof d.Q == "function" && d.Q()
  }
}
;function I(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
x(I, H);
I.prototype.B = function() {
  delete this.type;
  delete this.target;
  delete this.currentTarget
};
I.prototype.W = !1;
I.prototype.ia = !0;
I.prototype.preventDefault = function() {
  this.ia = !1
};
function Bb(a) {
  Bb[" "](a);
  return a
}
Bb[" "] = u;
function J(a, b) {
  a && this.a(a, b)
}
x(J, I);
r = J.prototype;
r.target = l;
r.relatedTarget = l;
r.offsetX = 0;
r.offsetY = 0;
r.clientX = 0;
r.clientY = 0;
r.screenX = 0;
r.screenY = 0;
r.button = 0;
r.keyCode = 0;
r.charCode = 0;
r.ctrlKey = !1;
r.altKey = !1;
r.shiftKey = !1;
r.metaKey = !1;
r.Rc = !1;
r.Ra = l;
r.a = function(a, b) {
  var c = this.type = a.type;
  I.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(Ta) {
      var f;
      a: {
        try {
          Bb(d.nodeName);
          f = !0;
          break a
        }catch(e) {
        }
        f = !1
      }
      f || (d = l)
    }
  }else {
    if(c == "mouseover") {
      d = a.fromElement
    }else {
      if(c == "mouseout") {
        d = a.toElement
      }
    }
  }
  this.relatedTarget = d;
  this.offsetX = a.offsetX !== k ? a.offsetX : a.layerX;
  this.offsetY = a.offsetY !== k ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== k ? a.clientX : a.pageX;
  this.clientY = a.clientY !== k ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.Rc = Xa ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.Ra = a;
  delete this.ia;
  delete this.W
};
r.preventDefault = function() {
  J.Ea.preventDefault.call(this);
  var a = this.Ra;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = !1, zb) {
      try {
        if(a.ctrlKey || a.keyCode >= 112 && a.keyCode <= 123) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
r.B = function() {
  J.Ea.B.call(this);
  this.relatedTarget = this.currentTarget = this.target = this.Ra = l
};
function Cb() {
}
var Db = 0;
r = Cb.prototype;
r.key = 0;
r.X = !1;
r.ob = !1;
r.a = function(a, b, c, d, f, e) {
  w(a) == "function" ? this.Ab = !0 : a && a.handleEvent && w(a.handleEvent) == "function" ? this.Ab = !1 : h(Error("Invalid listener argument"));
  this.ea = a;
  this.proxy = b;
  this.src = c;
  this.type = d;
  this.capture = !!f;
  this.Va = e;
  this.ob = !1;
  this.key = ++Db;
  this.X = !1
};
r.handleEvent = function(a) {
  return this.Ab ? this.ea.call(this.Va || this.src, a) : this.ea.handleEvent.call(this.ea, a)
};
function K(a, b) {
  this.Db = b;
  this.J = [];
  a > this.Db && h(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
  for(var c = 0;c < a;c++) {
    this.J.push(this.ba())
  }
}
x(K, H);
r = K.prototype;
r.I = l;
r.vb = l;
r.getObject = function() {
  return this.J.length ? this.J.pop() : this.ba()
};
function L(a, b) {
  a.J.length < a.Db ? a.J.push(b) : a.Oa(b)
}
r.ba = function() {
  return this.I ? this.I() : {}
};
r.Oa = function(a) {
  if(this.vb) {
    this.vb(a)
  }else {
    var b = w(a);
    if(b == "object" || b == "array" || b == "function") {
      if(w(a.Q) == "function") {
        a.Q()
      }else {
        for(var c in a) {
          delete a[c]
        }
      }
    }
  }
};
r.B = function() {
  K.Ea.B.call(this);
  for(var a = this.J;a.length;) {
    this.Oa(a.pop())
  }
  delete this.J
};
var Eb, Fb = (Eb = "ScriptEngine" in t && t.ScriptEngine() == "JScript") ? t.ScriptEngineMajorVersion() + "." + t.ScriptEngineMinorVersion() + "." + t.ScriptEngineBuildVersion() : "0";
var Gb, Hb, Ib, Jb, Kb, Lb, Mb, Nb, Ob, Pb, Qb;
(function() {
  function a() {
    return{e:0, o:0}
  }
  function b() {
    return[]
  }
  function c() {
    var a = yb ? function(b) {
      return g.call(a.src, a.key, b)
    } : function(b) {
      b = g.call(a.src, a.key, b);
      if(!b) {
        return b
      }
    };
    return a
  }
  function d() {
    return new Cb
  }
  function f() {
    return new J
  }
  var e = Eb && !(ta(Fb, "5.7") >= 0), g;
  Lb = function(a) {
    g = a
  };
  if(e) {
    Gb = function() {
      return i.getObject()
    };
    Hb = function(a) {
      L(i, a)
    };
    Ib = function() {
      return n.getObject()
    };
    Jb = function(a) {
      L(n, a)
    };
    Kb = function() {
      return m.getObject()
    };
    Mb = function() {
      L(m, c())
    };
    Nb = function() {
      return s.getObject()
    };
    Ob = function(a) {
      L(s, a)
    };
    Pb = function() {
      return o.getObject()
    };
    Qb = function(a) {
      L(o, a)
    };
    var i = new K(0, 600);
    i.I = a;
    var n = new K(0, 600);
    n.I = b;
    var m = new K(0, 600);
    m.I = c;
    var s = new K(0, 600);
    s.I = d;
    var o = new K(0, 600);
    o.I = f
  }else {
    Gb = a, Hb = u, Ib = b, Jb = u, Kb = c, Mb = u, Nb = d, Ob = u, Pb = f, Qb = u
  }
})();
function Vb() {
  this.da = [];
  this.ab = new Ka;
  this.dc = this.ec = this.fc = this.Xb = 0;
  this.G = new Ka;
  this.pb = this.cc = 0;
  this.Fc = 1;
  this.Pa = new K(0, 4E3);
  this.Pa.ba = function() {
    return new Wb
  };
  this.Yb = new K(0, 50);
  this.Yb.ba = function() {
    return new Xb
  };
  var a = this;
  this.Wa = new K(0, 2E3);
  this.Wa.ba = function() {
    return String(a.Fc++)
  };
  this.Wa.Oa = p();
  this.rc = 3
}
Vb.prototype.Ec = ub("goog.debug.Trace");
function Xb() {
  this.ib = this.ac = this.count = 0
}
Xb.prototype.toString = function() {
  var a = [];
  a.push(this.type, " ", this.count, " (", Math.round(this.ac * 10) / 10, " ms)");
  this.ib && a.push(" [VarAlloc = ", this.ib, "]");
  return a.join("")
};
function Wb() {
}
function Yb(a, b, c, d) {
  var f = [];
  c == -1 ? f.push("    ") : f.push(Zb(a.xb - c));
  f.push(" ", $b(a.xb - b));
  a.Qa == 0 ? f.push(" Start        ") : a.Qa == 1 ? (f.push(" Done "), f.push(Zb(a.Wd - a.startTime), " ms ")) : f.push(" Comment      ");
  f.push(d, a);
  a.ld > 0 && f.push("[VarAlloc ", a.ld, "] ");
  return f.join("")
}
Wb.prototype.toString = function() {
  return this.type == l ? this.pc : "[" + this.type + "] " + this.pc
};
Vb.prototype.reset = function(a) {
  this.rc = a;
  for(a = 0;a < this.da.length;a++) {
    var b = this.Pa.id;
    b && L(this.Wa, b);
    L(this.Pa, this.da[a])
  }
  this.da.length = 0;
  this.ab.clear();
  this.Xb = ka();
  this.pb = this.cc = this.dc = this.ec = this.fc = 0;
  b = La(this.G);
  for(a = 0;a < b.length;a++) {
    var c = this.G.get(b[a]);
    c.count = 0;
    c.ac = 0;
    c.ib = 0;
    L(this.Yb, c)
  }
  this.G.clear()
};
Vb.prototype.toString = function() {
  for(var a = [], b = -1, c = [], d = 0;d < this.da.length;d++) {
    var f = this.da[d];
    f.Qa == 1 && c.pop();
    a.push(" ", Yb(f, this.Xb, b, c.join("")));
    b = f.xb;
    a.push("\n");
    f.Qa == 0 && c.push("|  ")
  }
  if(this.ab.e != 0) {
    var e = ka();
    a.push(" Unstopped timers:\n");
    Ja(this.ab, function(b) {
      a.push("  ", b, " (", e - b.startTime, " ms, started at ", $b(b.startTime), ")\n")
    })
  }
  b = La(this.G);
  for(d = 0;d < b.length;d++) {
    c = this.G.get(b[d]), c.count > 1 && a.push(" TOTAL ", c, "\n")
  }
  a.push("Total tracers created ", this.cc, "\n", "Total comments created ", this.pb, "\n", "Overhead start: ", this.fc, " ms\n", "Overhead end: ", this.ec, " ms\n", "Overhead comment: ", this.dc, " ms\n");
  return a.join("")
};
function Zb(a) {
  var a = Math.round(a), b = "";
  a < 1E3 && (b = " ");
  a < 100 && (b = "  ");
  a < 10 && (b = "   ");
  return b + a
}
function $b(a) {
  a = Math.round(a);
  return String(100 + a / 1E3 % 60).substring(1, 3) + "." + String(1E3 + a % 1E3).substring(1, 4)
}
new Vb;
var M = {}, N = {}, y = {}, O = {};
function ac(a, b, c, d, f) {
  if(b) {
    if(w(b) == "array") {
      for(var e = 0;e < b.length;e++) {
        ac(a, b[e], c, d, f)
      }
    }else {
      var d = !!d, g = N;
      b in g || (g[b] = Gb());
      g = g[b];
      d in g || (g[d] = Gb(), g.e++);
      var g = g[d], i = ea(a), n;
      g.o++;
      if(g[i]) {
        n = g[i];
        for(e = 0;e < n.length;e++) {
          if(g = n[e], g.ea == c && g.Va == f) {
            if(g.X) {
              break
            }
            return
          }
        }
      }else {
        n = g[i] = Ib(), g.e++
      }
      e = Kb();
      e.src = a;
      g = Nb();
      g.a(c, e, a, b, d, f);
      c = g.key;
      e.key = c;
      n.push(g);
      M[c] = g;
      y[i] || (y[i] = Ib());
      y[i].push(g);
      a.addEventListener ? (a == t || !a.ub) && a.addEventListener(b, e, d) : a.attachEvent(b in O ? O[b] : O[b] = "on" + b, e)
    }
  }else {
    h(Error("Invalid event type"))
  }
}
function bc(a, b, c, d, f) {
  if(w(b) == "array") {
    for(var e = 0;e < b.length;e++) {
      bc(a, b[e], c, d, f)
    }
  }else {
    d = !!d;
    a: {
      e = N;
      if(b in e && (e = e[b], d in e && (e = e[d], a = ea(a), e[a]))) {
        a = e[a];
        break a
      }
      a = l
    }
    if(a) {
      for(e = 0;e < a.length;e++) {
        if(a[e].ea == c && a[e].capture == d && a[e].Va == f) {
          cc(a[e].key);
          break
        }
      }
    }
  }
}
function cc(a) {
  if(M[a]) {
    var b = M[a];
    if(!b.X) {
      var c = b.src, d = b.type, f = b.proxy, e = b.capture;
      c.removeEventListener ? (c == t || !c.ub) && c.removeEventListener(d, f, e) : c.detachEvent && c.detachEvent(d in O ? O[d] : O[d] = "on" + d, f);
      c = ea(c);
      f = N[d][e][c];
      if(y[c]) {
        var g = y[c], i = Aa(g, b);
        i >= 0 && za.splice.call(g, i, 1);
        g.length == 0 && delete y[c]
      }
      b.X = !0;
      f.Hb = !0;
      dc(d, e, c, f);
      delete M[a]
    }
  }
}
function dc(a, b, c, d) {
  if(!d.xa && d.Hb) {
    for(var f = 0, e = 0;f < d.length;f++) {
      if(d[f].X) {
        var g = d[f].proxy;
        g.src = l;
        Mb(g);
        Ob(d[f])
      }else {
        f != e && (d[e] = d[f]), e++
      }
    }
    d.length = e;
    d.Hb = !1;
    e == 0 && (Jb(d), delete N[a][b][c], N[a][b].e--, N[a][b].e == 0 && (Hb(N[a][b]), delete N[a][b], N[a].e--), N[a].e == 0 && (Hb(N[a]), delete N[a]))
  }
}
function ec(a) {
  var b, c = 0, d = b == l;
  b = !!b;
  if(a == l) {
    Ca(function(a) {
      for(var f = a.length - 1;f >= 0;f--) {
        var e = a[f];
        if(d || b == e.capture) {
          cc(e.key), c++
        }
      }
    })
  }else {
    if(a = ea(a), y[a]) {
      for(var a = y[a], f = a.length - 1;f >= 0;f--) {
        var e = a[f];
        if(d || b == e.capture) {
          cc(e.key), c++
        }
      }
    }
  }
}
function fc(a, b, c, d, f) {
  var e = 1, b = ea(b);
  if(a[b]) {
    a.o--;
    a = a[b];
    a.xa ? a.xa++ : a.xa = 1;
    try {
      for(var g = a.length, i = 0;i < g;i++) {
        var n = a[i];
        n && !n.X && (e &= gc(n, f) !== !1)
      }
    }finally {
      a.xa--, dc(c, d, b, a)
    }
  }
  return Boolean(e)
}
function gc(a, b) {
  var c = a.handleEvent(b);
  a.ob && cc(a.key);
  return c
}
function P(a, b) {
  var c = b.type || b, d = N;
  if(c in d) {
    if(da(b)) {
      b = new I(b, a)
    }else {
      if(b instanceof I) {
        b.target = b.target || a
      }else {
        var f = b, b = new I(c, a);
        Fa(b, f)
      }
    }
    var f = 1, e, d = d[c], c = !0 in d, g;
    if(c) {
      e = [];
      for(g = a;g;g = g.bb) {
        e.push(g)
      }
      g = d[!0];
      g.o = g.e;
      for(var i = e.length - 1;!b.W && i >= 0 && g.o;i--) {
        b.currentTarget = e[i], f &= fc(g, e[i], b.type, !0, b) && b.ia != !1
      }
    }
    if(!1 in d) {
      if(g = d[!1], g.o = g.e, c) {
        for(i = 0;!b.W && i < e.length && g.o;i++) {
          b.currentTarget = e[i], f &= fc(g, e[i], b.type, !1, b) && b.ia != !1
        }
      }else {
        for(d = a;!b.W && d && g.o;d = d.bb) {
          b.currentTarget = d, f &= fc(g, d, b.type, !1, b) && b.ia != !1
        }
      }
    }
  }
}
Lb(function(a, b) {
  if(!M[a]) {
    return!0
  }
  var c = M[a], d = c.type, f = N;
  if(!(d in f)) {
    return!0
  }
  var f = f[d], e, g;
  if(!yb) {
    e = b || ba("window.event");
    var i = !0 in f, n = !1 in f;
    if(i) {
      if(e.keyCode < 0 || e.returnValue != k) {
        return!0
      }
      a: {
        var m = !1;
        if(e.keyCode == 0) {
          try {
            e.keyCode = -1;
            break a
          }catch(s) {
            m = !0
          }
        }
        if(m || e.returnValue == k) {
          e.returnValue = !0
        }
      }
    }
    m = Pb();
    m.a(e, this);
    e = !0;
    try {
      if(i) {
        for(var o = Ib(), j = m.currentTarget;j;j = j.parentNode) {
          o.push(j)
        }
        g = f[!0];
        g.o = g.e;
        for(var v = o.length - 1;!m.W && v >= 0 && g.o;v--) {
          m.currentTarget = o[v], e &= fc(g, o[v], d, !0, m)
        }
        if(n) {
          g = f[!1];
          g.o = g.e;
          for(v = 0;!m.W && v < o.length && g.o;v++) {
            m.currentTarget = o[v], e &= fc(g, o[v], d, !1, m)
          }
        }
      }else {
        e = gc(c, m)
      }
    }finally {
      if(o) {
        o.length = 0, Jb(o)
      }
      m.Q();
      Qb(m)
    }
    return e
  }
  d = new J(b, this);
  try {
    e = gc(c, d)
  }finally {
    d.Q()
  }
  return e
});
var hc = 0;
function Q(a) {
  return a + "_" + hc++
}
;function ic() {
}
x(ic, H);
r = ic.prototype;
r.ub = !0;
r.bb = l;
r.addEventListener = function(a, b, c, d) {
  ac(this, a, b, c, d)
};
r.removeEventListener = function(a, b, c, d) {
  bc(this, a, b, c, d)
};
r.B = function() {
  ic.Ea.B.call(this);
  ec(this);
  this.bb = l
};
function R() {
}
x(R, ic);
R.prototype.A = function(a) {
  P(vb, a)
};
function S(a, b, c) {
  jc(vb, b, a, c)
}
function jc(a, b, c, d) {
  c = jQuery.proxy(d, c);
  ac(a, b, c)
}
;function T() {
}
x(T, R);
function kc(a) {
  I.call(this, lc);
  this.l = a
}
x(kc, I);
var lc = Q("ComponentIDSelected");
function mc(a) {
  I.call(this, nc);
  this.l = a
}
x(mc, I);
var nc = Q("MakeViewActive");
function oc(a) {
  I.call(this, pc);
  this.l = a
}
x(oc, I);
var pc = Q("ScenarioParsed");
function qc() {
  I.call(this, rc)
}
x(qc, I);
var rc = Q("DataModelChanged");
function U(a) {
  if(l !== a && k !== a) {
    this.d = a, jc(this.d, rc, this, this.Ib)
  }
  this.Ld = "body";
  this.s = ""
}
x(U, R);
function V(a) {
  a = "#{0}".m(a.s);
  return $(a)
}
U.prototype.Ib = function() {
  h(Error("this should be overriden"))
};
function sc(a) {
  U.call(this);
  this.options = $.extend({T:"IDnotSet", ka:0, mb:42, title:"link title not set", Na:!1}, a)
}
x(sc, U);
function tc(a) {
  var b = uc(a, "", 0);
  b += uc(a, ":hover", 1);
  b += uc(a, ".selected", 2);
  b += uc(a, ".selected:hover ", 3);
  b += uc(a, ":active", 4);
  b += uc(a, ".selected:active", 4);
  return b
}
function vc(a) {
  var b = "";
  a.options.Na && (b = ' class="{0}"'.m(a.options.Na));
  return'<a id="{0}" title="{1}"{2} href="#"></a>'.m(a.options.T, a.options.title, b)
}
function uc(a, b, c) {
  return"#{0}{1}{background-position: {2}px {3}px;}".m(a.options.T, b, a.options.ka.toString(), (a.options.mb * c * -1).toString())
}
;function wc() {
  U.call(this);
  this.s = "propertiesButton"
}
x(wc, U);
r = wc.prototype;
r.a = function() {
  this.button = new sc({T:"propertiesButtonLink", mb:33, ka:0, title:"Show / Hide Properties panel", Na:"leftNavButton"});
  var a = "<style type='text/css'>{0}</style>".m(tc(this.button));
  $(a).appendTo("head");
  this.ua();
  $("#propertiesButtonLink").click(jQuery.proxy(this.Jb, this));
  Tipped.create("#propertiesButtonLink", {ed:"light", wc:{target:"leftmiddle", jd:"rightmiddle"}, background:{color:"#fff", opacity:0.85}, nc:!1});
  this.Xa = !1;
  S(this, xc, this.ga)
};
r.show = function() {
  this.position()
};
r.position = function() {
  var a = {left:window.innerWidth - 33 - 33 - 4 + "px"};
  V(this).css(a)
};
r.ga = function() {
  var a = {left:window.innerWidth - 33 - 33 - 4 + "px"};
  V(this).animate(a, {duration:500, ca:"easeInOutSine"})
};
r.ua = function() {
  var a = '<div id="propertiesButton">' + vc(this.button) + "</div>";
  $("body").append(a)
};
function yc(a, b) {
  a.Xa = b;
  a.Xa ? $("#propertiesButtonLink").addClass("selected") : $("#propertiesButtonLink").removeClass("selected")
}
r.Jb = function() {
  var a = new mc(!this.Xa);
  P(this, a)
};
function zc() {
  I.call(this, Ac)
}
x(zc, I);
var Ac = Q("ViewClosed");
function W(a) {
  U.call(this, a);
  this.Xd = []
}
x(W, U);
W.prototype.a = function() {
  this.ua()
};
W.prototype.show = function(a) {
  var b = V(this);
  V(this).dialog("isOpen") || (b.dialog("open"), a && b.dialog("widget").show("slide", {direction:"right", ca:"swing"}, 1E3))
};
W.prototype.hide = function() {
  V(this).dialog("close")
};
W.prototype.Kb = function() {
  var a = new zc;
  P(this, a)
};
function Bc(a) {
  W.call(this, a);
  this.s = "propertiesView";
  this.title = "Properties";
  this.ua()
}
x(Bc, W);
Bc.prototype.Ib = function() {
  $("#tabstrip-1").empty();
  $("#tabstrip-2").empty();
  $("#tabstrip-2").height(300);
  $("#tabstripContent").height(320);
  var a;
  a = this.d.Tb;
  for(var b = a.fb.length, c = [];b--;) {
    var d = a.fb[b];
    d.Cd && c.push({name:d.name, od:d.tc, Zd:d.md})
  }
  a = new kendo.data.DataSource({data:c, Kd:100});
  $("#tabstrip-2").kendoGrid({qc:a, height:250})
};
Bc.prototype.Kb = function() {
  var a = new zc;
  P(this, a)
};
Bc.prototype.ua = function() {
  var a = '<div id="{0}">\t\t</div>'.m(this.s);
  $("body").append(a);
  a = V(this);
  a.direction = "left";
  a.dialog({title:this.title, vd:this.s + "-dialog", hide:"fade", width:300, height:350, position:["right", "bottom"], sd:!1});
  a.bind("dialogclose", jQuery.proxy(this.Kb, this));
  this.La = this.s + "-comboBox";
  a = '<div class="propertiesSubPanel">\t\t\t\t\t\t<input id="{0}" value="1" />\t\t\t\t\t</div>'.m(this.La);
  $("body").append(a);
  V(this).append('<div id="tabstripContent" class="k-content"><div id="tabstrip"><ul>\t<li class="k-state-active">Input</li>\t<li>Faults</li></ul><div>\t<p>Input Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.</p></div><div></div>');
  $("#tabstrip").kendoTabStrip();
  for(var a = this.d.gb.length, b = [];a--;) {
    var c = this.d.gb[a];
    b.push({text:c.name, value:c.id})
  }
  $("#" + this.La).kendoDropDownList({qc:b, change:jQuery.proxy(this.Jc, this)})
};
Bc.prototype.Jc = function() {
  var a = $("#" + this.La)[0].value, a = new kc(a);
  P(this, a)
};
function Cc() {
  S(this, pc, this.$a)
}
x(Cc, T);
Cc.prototype.Hc = function(a) {
  var b = this.d;
  b.Tb = b.zb[a.l];
  a = new qc;
  P(b, a)
};
Cc.prototype.$a = function(a) {
  this.N = new wc;
  this.N.a();
  this.N.show();
  this.d = a.l;
  this.view = new Bc(this.d);
  this.N.show();
  this.view.show(!0);
  jc(this.view, lc, this, this.Hc);
  jc(this.view, Ac, this, this.Gc);
  jc(this.N, nc, this, this.Lc)
};
Cc.prototype.Lc = function(a) {
  a = a.l;
  yc(this.N, a);
  a ? this.view.show(!1) : this.view.hide()
};
Cc.prototype.Gc = function() {
  yc(this.N, !1)
};
function Dc(a, b) {
  I.call(this, xc);
  this.l = {};
  this.l.width = a;
  this.l.height = b
}
x(Dc, I);
var xc = Q("WindowResizeEvent");
function Ec() {
  I.call(this, Fc)
}
x(Ec, I);
var Fc = Q("WorldCreated");
function Gc() {
  U.call(this);
  this.s = "leftNav";
  var a = this;
  a.lb = new sc({T:"leftNavButton_1", ka:-42, title:"General"});
  a.nb = new sc({T:"leftNavButton_2", ka:-84, title:"HVAC"});
  a.kb = new sc({T:"leftNavButton_3", ka:-168, title:"External Envelope"});
  a.oa = "none";
  (function() {
    var b = window.innerHeight - 140 - 352;
    $("<div>").attr("id", a.s).append(vc(a.lb)).append(vc(a.nb)).append(vc(a.kb)).css({position:"absolute", width:"53px", height:"292px", left:"-63px", top:b + "px", "z-index":"101", "background-image":"url(images/leftnav.png)", opacity:"0.92", padding:"60px 0 0 10px"}).appendTo("body")
  })();
  (function() {
    var b = '\t\t\t#leftNav a {\t\t\t\twidth:42px;\t\t\t\theight:42px;\t\t\t\tdisplay:block;\t\t\t\tbackground-color:transparent;\t\t\t\tmargin:0 0 10px 0;\t\t\t\tbackground-image:url("images/icon_grid_42.png");\t\t\t}\n\t\t\t';
    b += tc(a.lb);
    b += tc(a.nb);
    b += tc(a.kb);
    b = "\n<style type='text/css'>{0}</style>".m(b);
    $("head").append(b)
  })();
  Tipped.create("#leftNav a", {ed:"light", wc:{target:"rightmiddle", jd:"leftmiddle"}, background:{color:"#fff", opacity:0.85}, nc:!1});
  S(a, xc, a.ga);
  if(this.oa != "leftNavButton_1") {
    "#" + this.oa != "none" && $("#" + this.oa).removeClass("selected"), $("#leftNavButton_1").addClass("selected"), this.oa = "leftNavButton_1"
  }
}
x(Gc, U);
Gc.prototype.ga = function() {
  var a = {top:window.innerHeight - 140 - 352 + "px"};
  V(this).animate(a, {duration:500, ca:"easeInOutSine"})
};
Gc.prototype.show = function() {
  V(this).animate({left:"0", ca:"easeInOutSine"}, 500)
};
Gc.prototype.Jb = p();
function Hc() {
  U.call(this);
  this.s = "titleBar";
  $("<div>").attr("id", this.s).css({top:"-41px", width:"245px", height:"41px", "z-index":"101", "background-image":"url(images/top_title.png)"}).center({nd:!1}).appendTo("body");
  S(this, xc, this.ga)
}
x(Hc, U);
Hc.prototype.show = function() {
  V(this).animate({top:"0", ca:"easeInOutSine"}, 500)
};
Hc.prototype.ga = function() {
  V(this).center({nd:!1, duration:500, ca:"easeInOutSine"})
};
function Ic() {
  this.hd = new Hc;
  this.hd.show();
  this.yc = new Gc;
  this.yc.show();
  this.Od = new Cc
}
x(Ic, T);
Q("ComponentSelected");
function X() {
}
x(X, R);
X.prototype.a = p();
function Jc(a) {
  this.xml = a;
  this.b = this.H = l
}
x(Jc, X);
r = Jc.prototype;
r.D = function(a) {
  this.H = this.t(a, this.xml);
  return this.b = this.H.iterateNext()
};
r.t = function(a, b) {
  try {
    var c = this.xml.evaluate(a, b, l, XPathResult.ANY_TYPE, l)
  }catch(d) {
    $.error("lgb.model.XmlParser.evaluate_(){0}".m(d))
  }
  return c
};
r.S = function() {
  return this.sa("@id", this.b)
};
r.getName = function() {
  return this.sa("@name", this.b)
};
r.next = function() {
  this.b = this.H.iterateNext()
};
r.sa = function(a, b) {
  if(b == l) {
    b = this.b
  }
  return this.t(a, b).iterateNext().nodeValue
};
r.ra = function(a) {
  return this.t(a, this.b).iterateNext().textContent
};
r.K = function(a) {
  a = this.ra(a);
  return parseFloat(a)
};
r.C = function(a) {
  for(var a = this.ta(a), b = a.length, c = 0;c < b;c++) {
    a[c] = parseFloat(a[c])
  }
  return a
};
r.ta = function(a) {
  return(a == l ? this.b : this.t(a, this.b).iterateNext()).textContent.split(",")
};
function Kc(a) {
  this.parse(a);
  this.tc = this.md = ""
}
x(Kc, X);
Kc.prototype.parse = function(a) {
  for(var b = a.children.length;b--;) {
    var c = a.children[b], d = c.getAttribute("type"), f = c.textContent, e = k;
    switch(d) {
      case "Integer":
        e = parseInt(f, 10);
        break;
      case "Boolean":
        e = Boolean(f);
        break;
      case "Float":
        e = parseFloat(f);
        break;
      case "String":
        e = String(f)
    }
    this[c.nodeName] = e
  }
};
function Lc(a) {
  this.fb = [];
  this.parse(a)
}
x(Lc, X);
Lc.prototype.parse = function(a) {
  this.name = a.getName();
  this.id = a.S();
  var a = a.b.children, b = a.length;
  try {
    for(;b--;) {
      this.fb.push(new Kc(a[b]))
    }
  }catch(c) {
    alert(c)
  }
};
function Mc() {
  this.xml = l;
  this.gb = [];
  this.zb = {};
  this.Tb = l
}
x(Mc, X);
Mc.prototype.load = function() {
  $.ajax({type:"GET", url:"xml/DefaultScenario.xml", dataType:"xml", success:jQuery.proxy(this.parse, this)})
};
Mc.prototype.parse = function(a) {
  this.xml = a;
  a = new Jc(a);
  for(a.D("/scenario/sysVars/systemNode");a.b;) {
    var b = new Lc(a);
    a.next();
    this.zb[b.id] = b;
    this.gb.push(b)
  }
  this.A(new oc(this))
};
function Nc() {
  this.d = new Mc;
  this.d.load();
  S(this, pc, this.$a)
}
x(Nc, T);
Nc.prototype.$a = p();
function Oc(a) {
  I.call(this, Pc);
  this.l = a
}
x(Oc, I);
var Pc = Q("MeshLoadedEvent");
Q("MeshRequestEvent");
function Qc() {
  this.kc = new THREE.BinaryLoader;
  this.xc = new THREE.JSONLoader
}
x(Qc, R);
function Rc() {
  var a = "rooftop-joined.b.js".split("."), b = a.length;
  if(b < 2) {
    return Sc
  }else {
    var c = a[b - 1].toLowerCase();
    if(c == "dae") {
      return Tc
    }else {
      if(c == "utf8") {
        return Uc
      }
    }
    return c == "js" ? a[b - 2].toLowerCase() == "b" ? Vc : Wc : Sc
  }
}
var Tc = "collada", Uc = "utf8", Wc = "json", Vc = "bin", Sc = "unknown";
Q("ColladaSceneLoadedEvent");
function Xc(a) {
  this.xml = a;
  this.b = this.H = l
}
x(Xc, R);
r = Xc.prototype;
r.D = function(a) {
  this.H = this.t(a, this.xml);
  return this.b = this.H.iterateNext()
};
r.t = function(a, b) {
  try {
    var c = this.xml.evaluate(a, b, l, XPathResult.ANY_TYPE, l)
  }catch(d) {
    jQuery.error("lgb.utils.XmlParser.evaluate_(){0}".m(d))
  }
  return c
};
r.S = function() {
  return this.sa("@id", this.b)
};
r.next = function() {
  this.b = this.H.iterateNext()
};
r.sa = function(a, b) {
  if(b == l) {
    b = this.b
  }
  return this.t(a, b).iterateNext().nodeValue
};
r.ra = function(a) {
  return this.t(a, this.b).iterateNext().textContent
};
r.K = function(a) {
  a = this.ra(a);
  return parseFloat(a)
};
r.C = function(a) {
  for(var a = this.ta(a), b = a.length, c = 0;c < b;c++) {
    a[c] = parseFloat(a[c])
  }
  return a
};
r.ta = function(a) {
  return(a == l ? this.b : this.t(a, this.b).iterateNext()).textContent.split(",")
};
function Yc() {
  this.b = this.H = this.xml = l;
  this.z = {};
  this.Ka = {};
  this.eb = {};
  this.gd = {};
  this.qb = {}
}
x(Yc, X);
Yc.prototype.load = function() {
  jQuery.ajax({type:"GET", url:"xml/particleSystems.xml", dataType:"xml", success:jQuery.proxy(this.parse, this)})
};
Yc.prototype.parse = function(a) {
  a = new Xc(a);
  a.D("/particleSystems/@translate");
  this.translate = a.C();
  a.D("/particleSystems/@rotate");
  this.rotate = a.C();
  for(a.D("/particleSystems/boundingBoxes/box");a.b;) {
    var b = a.S(), c = a.C(), d = c.slice(0, 3), c = c.slice(3, 6);
    this.z[b] = [d, c];
    a.next()
  }
  for(a.D("/particleSystems/colorKeys/ck");a.b;) {
    b = a.S(), d = {key:a.K("key"), value:a.C("value")}, this.Ka[b] = d, a.next()
  }
  for(a.D("/particleSystems/scaleKeys/sk");a.b;) {
    b = a.S(), d = {key:a.K("key"), value:a.C("value")}, this.eb[b] = d, a.next()
  }
  for(a.D("/particleSystems/system");a.b;) {
    b = a.S();
    d = {id:b, Ya:a.K("life"), Ba:a.K("particleCount"), lc:a.ta("boundingBoxIds"), shape:a.ra("shape"), Qb:a.K("particleSize"), sb:a.K("curve"), oc:a.C("colorKeyIds"), Yc:a.C("scaleKeyIds")};
    this.gd[b] = d;
    var c = Zc(d.lc, this.z), f = Zc(d.oc, this.Ka), e = Zc(d.Yc, this.eb);
    this.qb[b] = {yd:!1, Ya:d.Ya, Ba:d.Ba, z:c, Qb:d.Qb, Ka:f, eb:e};
    a.next()
  }
  a = new qc;
  P(this, a)
};
function Zc(a, b) {
  for(var c = [], d = a.length, f = 0;f < d;f++) {
    c.push(b[a[f]])
  }
  return c
}
;function $c(a) {
  var b, c = ad(a) ? [] : {};
  bd(c, a, b === k ? !0 : b);
  return c
}
function cd(a, b) {
  for(var c = 1, d = b ? b : 2;d <= a;) {
    c *= d++
  }
  return c
}
var ad = Array.isArray || function(a) {
  return Object.prototype.toString.call(a) === "[object Array]"
};
function bd(a, b, c) {
  var d = arguments[0], f = arguments.length, e = arguments[f - 1], g = !0;
  typeof e === "boolean" && (g = e, --f);
  for(e = 1;e < f;e++) {
    var i = arguments[e], n;
    for(n in i) {
      var m = i[n];
      if(g && m != l && typeof m === "object") {
        var s = d[n], o = ad(m);
        if(s == l || typeof s !== "object" || ad(s) !== o) {
          s = o ? [] : {}
        }
        d[n] = bd(s, m)
      }else {
        d[n] = m
      }
    }
  }
  return d
}
function dd(a, b, c, d, f) {
  var e = a * a, g = e * a;
  return(2 * g - 3 * e + 1) * b + (g - 2 * e + a) * c + (-2 * g + 3 * e) * d + (g - e) * f
}
;function ed(a, b, c) {
  this.v = this.count = 0;
  this.type = b;
  this.Z = [];
  this.p = [];
  this.la = [];
  this.q = [];
  this.ma = [];
  this.r = [];
  this.na = [];
  if(a) {
    c = c || {}, c.Sc = a, this.Bc(c)
  }
}
ed.prototype = {Bc:function(a) {
  var b = a.Sc;
  this.ad(a.type || this.type || 0);
  if(b) {
    this.count = b.length;
    for(var c = 0;c < this.count;c++) {
      this.p[c] = b[c][0], this.q[c] = b[c][1], this.r[c] = b[c][2], this.la[c] = 0, this.ma[c] = 0, this.na[c] = 0, this.Z[c] = 1
    }
  }
  if(a.Z) {
    for(c = 0;c < this.count;c++) {
      this.Z[c] = a.Z[c] != l ? a.Z[c] : 1
    }
  }
  if(a.Fa) {
    for(c = 0;c < this.count;c++) {
      a.Fa[c] && (this.la[c] = a.Fa[c][0] || 0, this.ma[c] = a.Fa[c][1] || 0, this.na[c] = a.Fa[c][2] || 0)
    }
  }
  if(a.v) {
    this.v = a.v
  }
  this.$c()
}, va:function(a) {
  return[a, a, a]
}, zc:function(a) {
  var b = this.count - 1, c = Math.floor(a * b);
  c >= b && (c = b - 1);
  a = (a - c / b) / ((c + 1) / b - c / b);
  return[(1 - a) * this.p[c] + a * this.p[c + 1], (1 - a) * this.q[c] + a * this.q[c + 1], (1 - a) * this.r[c] + a * this.r[c + 1]]
}, jc:function(a) {
  for(var b = 0, c = 0, d = 0, f = 0, e = this.count, g = 0;g < e;g++) {
    var i = this.Z[g] * (cd(e - 1, e - 1 - g + 1) / cd(g)) * Math.pow(a, g) * Math.pow(1 - a, e - 1 - g);
    b += i * this.p[g];
    c += i * this.q[g];
    d += i * this.r[g];
    f += i
  }
  return[b / f, c / f, d / f]
}, rb:function(a) {
  var b = this.count - 1, c = Math.floor(a * b);
  c >= b && (c = b - 1);
  a = (a - c / b) / ((c + 1) / b - c / b);
  return[dd(a, this.p[c], this.la[c], this.p[c + 1], this.la[c + 1]), dd(a, this.q[c], this.ma[c], this.q[c + 1], this.ma[c + 1]), dd(a, this.r[c], this.na[c], this.r[c + 1], this.na[c + 1])]
}, Ac:function(a) {
  for(var b = 0, c = [0], d = 1;d < this.count;d++) {
    for(var f = [this.p[d - 1], this.q[d - 1], this.r[d - 1]], e = [this.p[d], this.q[d], this.r[d]], g = 0, i = f.length, n = 0;n < i;++n) {
      var m = f[n] - e[n];
      g += m * m
    }
    b += Math.sqrt(g);
    c[d] = b
  }
  b *= a;
  for(d = a = 0;d < this.count;d++) {
    c[d] < b && (a = d)
  }
  c = (b - c[a]) / (c[a + 1] - c[a]);
  return[(1 - c) * this.p[a] + c * this.p[a + 1], (1 - c) * this.q[a] + c * this.q[a + 1], (1 - c) * this.r[a] + c * this.r[a + 1]]
}, $c:function() {
  if(this.type == 4) {
    var a = $c(this.p), b = $c(this.q), c = $c(this.r);
    a.unshift(a[0]);
    a.push(a[a.length - 1]);
    b.unshift(b[0]);
    b.push(b[b.length - 1]);
    c.unshift(c[0]);
    c.push(c[c.length - 1]);
    for(var d = 0;d < this.count;d++) {
      this.la[d] = (1 - this.v) * (a[d + 2] - a[d]) / 2, this.ma[d] = (1 - this.v) * (b[d + 2] - b[d]) / 2, this.na[d] = (1 - this.v) * (c[d + 2] - c[d]) / 2
    }
  }
}, ad:function(a) {
  this.type = a;
  switch(a) {
    case 0:
      this.va = this.zc;
      break;
    case 1:
      this.va = this.jc;
      break;
    case 2:
    ;
    case 4:
      this.va = this.rb;
      break;
    case 3:
      this.va = this.Ac
  }
}};
function fd(a) {
  I.call(this, gd);
  this.l = a
}
x(fd, I);
var gd = Q("Object3DLoadedEvent");
function hd() {
  U.call(this);
  this.Ha = new THREE.Vertex(new THREE.Vector3(0, 0, 0));
  this.wa = 10
}
x(hd, U);
hd.prototype.render = function() {
  if(this.Bb > 0) {
    this.Bb--
  }else {
    var a = this.path.R[this.P];
    this.Ha.position.x = a[0];
    this.Ha.position.y = a[1];
    this.Ha.position.hc = a[2];
    this.P++;
    if(this.P > this.path.R.length - 1) {
      this.P = 0
    }
  }
};
function id(a, b) {
  U.call(this);
  this.sb = a;
  this.R = [];
  this.Y = [];
  this.P = 0;
  this.gc = l;
  for(var c = this.qa = b;c--;) {
    this.R[c] = this.sb.rb(c / this.qa)
  }
}
x(id, U);
function jd(a) {
  for(var b = new THREE.LineBasicMaterial({color:16711680, opacity:1, Ed:3}), c = [], d = a.R.length;d--;) {
    var f = a.R[d], f = new THREE.Vector3(f[0], f[1], f[2]), f = new THREE.Vertex(f);
    c.push(f)
  }
  d = new THREE.Geometry;
  d.Y = c;
  a.gc = new THREE.Line(d, b);
  return a.gc
}
;function kd(a) {
  U.call(this);
  this.d = a;
  jc(this.d, rc, this, this.Ic)
}
x(kd, U);
kd.prototype.Ic = function() {
  this.a()
};
kd.prototype.a = function() {
  this.mc = new THREE.Object3D;
  this.tb = new THREE.Object3D;
  this.$b = new THREE.Object3D;
  this.U = new THREE.Object3D;
  this.U.add(this.mc);
  this.U.add(this.tb);
  this.U.add(this.$b);
  this.translate = this.d.translate;
  this.rotate = this.d.rotate;
  this.Ma = this.d.qb["1"];
  this.z = this.Ma.z;
  this.Ca = [];
  this.Ba = 200;
  this.wa = 4;
  this.Pb = 6;
  this.n = 30;
  this.qa = this.Ma.Ya * this.n;
  this.kd = this.$d = this.P = this.v = 0;
  this.Tc = new THREE.Vector3(this.translate[0], this.translate[1], this.translate[2]);
  this.Xc = new THREE.Vector3(this.rotate[0] * Math.PI / 180, this.rotate[1] * Math.PI / 180, this.rotate[2] * Math.PI / 180);
  this.U.position = this.Tc;
  this.U.rotation = this.Xc;
  this.A(new fd(this.U));
  for(var a = this.Pb;a--;) {
    var b;
    b = this.v;
    for(var c = [], d = this.z.length, f = 0;f < d;f++) {
      var e = this.z[f][0], g = this.z[f][1], i = Math.random(), n = Math.random(), m = Math.random();
      c[f + 1] = [i * e[0] + (1 - i) * g[0], n * e[1] + (1 - n) * g[1], m * e[2] + (1 - m) * g[2]]
    }
    c[0] = c[1].slice(0, 3);
    c[d + 1] = c[d].slice(0, 3);
    b = new ed(c, 4, {v:b});
    b = new id(b, this.qa);
    this.kd += b.R.length;
    this.Ca.push(b)
  }
  for(a = this.Ca.length;a--;) {
    this.tb.add(jd(this.Ca[a]))
  }
  a = new THREE.ParticleBasicMaterial({color:6711039, size:1, map:THREE.ImageUtils.loadTexture("3d-assets/textures/circle.png"), td:THREE.AdditiveBlending, Yd:!0});
  this.Rb = new THREE.Geometry;
  this.Nd = [];
  this.cb = [];
  for(b = this.Ba;b--;) {
    new THREE.Vertex(new THREE.Vector3(0, 0, 0)), c = new hd, this.cb[b] = c, this.Rb.Y[b] = c.Ha, c.path = this.Ca[b % this.Pb], c.wa = this.wa, d = b, c.id = d, c.Bb = c.wa * d, c.P = 0
  }
  this.hb = new THREE.ParticleSystem(this.Rb, a);
  this.hb.Td = !0;
  this.$b.add(this.hb);
  S(this, ld, this.fa)
};
kd.prototype.fa = function() {
  for(var a = this.cb.length;a--;) {
    this.cb[a].render()
  }
  this.hb.geometry.pd = !0
};
function md() {
  S(this, Fc, this.Pc);
  this.a()
}
x(md, T);
md.prototype.a = function() {
  this.d = new Yc;
  this.view = new kd(this.d)
};
md.prototype.Pc = function() {
  this.d.load()
};
function nd() {
}
x(nd, X);
nd.prototype.a = p();
function od(a) {
  U.call(this);
  this.Hd = a;
  this.a()
}
x(od, U);
od.prototype.a = function() {
  var a = this.Cc = new Qc, b = {Eb:"3d-assets/rooftop-joined.b.js", ud:jQuery.proxy(this.Kc, this)};
  switch(Rc()) {
    case Vc:
      a.kc.load(b);
      break;
    case Wc:
      a.xc.load(b);
      break;
    default:
      h(Error("unsupported file type"))
  }
};
od.prototype.Kc = function(a) {
  a = new THREE.Mesh(a, new THREE.MeshFaceMaterial);
  a.wd = !0;
  a.name = "RoofTop";
  this.A(new Oc(a))
};
function pd() {
  this.a()
}
x(pd, T);
pd.prototype.a = function() {
  this.Eb = new nd;
  this.view = new od(this.Eb)
};
function qd() {
  I.call(this, ld)
}
x(qd, I);
var ld = Q("RenderEvent");
function rd(a) {
  U.call(this);
  this.a(a)
}
x(rd, U);
rd.prototype.a = function(a) {
  this.pa = a;
  this.k = new THREE.PerspectiveCamera(30, this.pa.width / this.pa.height, 1, 250);
  this.k.position.hc = 500;
  this.w = new THREE.TrackballControls(this.k);
  this.w.rotateSpeed = 1;
  this.w.zoomSpeed = 1.2;
  this.w.panSpeed = 0.8;
  this.w.Jd = !1;
  this.w.Id = !1;
  this.w.Ud = !0;
  this.w.xd = 0.3;
  this.w.keys = [65, 83, 68];
  this.Qc = 30;
  this.k.position.x = 0;
  this.k.position.y = 2;
  this.k.position.hc = this.Qc;
  S(this, ld, this.fa);
  S(this, xc, this.za)
};
rd.prototype.za = function() {
  this.k.rd = this.pa.width / this.pa.height;
  this.k.updateProjectionMatrix()
};
rd.prototype.fa = function() {
  this.w.update()
};
function sd() {
  U.call(this);
  this.a()
}
x(sd, U);
sd.prototype.a = function() {
  for(var a = new THREE.LineBasicMaterial({color:13421772, opacity:0.2}), b = new THREE.Geometry, c = 0;c <= 28;c++) {
    b.Y.push(new THREE.Vertex(new THREE.Vector3(-14, -0.04, c * 1 - 14))), b.Y.push(new THREE.Vertex(new THREE.Vector3(14, -0.04, c * 1 - 14))), b.Y.push(new THREE.Vertex(new THREE.Vector3(c * 1 - 14, -0.04, -14))), b.Y.push(new THREE.Vertex(new THREE.Vector3(c * 1 - 14, -0.04, 14)))
  }
  a = new THREE.Line(b, a, THREE.LinePieces);
  this.A(new fd(a))
};
function td(a) {
  U.call(this);
  this.a(a)
}
x(td, U);
td.prototype.a = function(a) {
  this.G = ud();
  a.appendChild(this.G.domElement);
  S(this, ld, jQuery.proxy(this.fa, this))
};
td.prototype.fa = function() {
  this.G.update()
};
function vd(a) {
  this.O = a
}
x(vd, T);
r = vd.prototype;
r.a = function() {
  this.ya = {x:0, y:0};
  this.ha = new THREE.WebGLRenderer;
  this.setSize();
  this.Vc = new THREE.Projector;
  this.ja = new THREE.Scene;
  this.ic = new THREE.AmbientLight(6316128);
  this.ja.add(this.ic);
  S(this, Pc, this.Mc);
  S(this, gd, this.Oc);
  S(this, xc, this.za);
  this.Rd = new pd;
  this.aa = new rd(this.ha.domElement);
  this.Zb = new THREE.DirectionalLight(16777215);
  this.Zb.position = this.aa.k.position.clone();
  this.ja.add(this.Zb);
  this.zd = new sd;
  this.Vd = new td(this.O);
  this.O.appendChild(this.ha.domElement);
  this.Md = new md;
  this.Wc = new qd;
  window.webkitRequestAnimationFrame ? (this.M = jQuery.proxy(this.Ob, this), window.webkitRequestAnimationFrame(this.M)) : window.mozRequestAnimationFrame ? (this.M = jQuery.proxy(this.Mb, this), window.mozRequestAnimationFrame(this.M)) : window.oRequestAnimationFrame ? (this.M = jQuery.proxy(this.Nb, this), window.oRequestAnimationFrame(this.M)) : (this.M = jQuery.proxy(this.Lb, this), window.Da(this.M));
  this.Za = !1;
  this.O.onmousemove = jQuery.proxy(this.Nc, this)
};
r.Nc = function(a) {
  a.preventDefault();
  this.ya.x = a.clientX / window.innerWidth * 2 - 1;
  this.ya.y = -(a.clientY / window.innerHeight) * 2 + 1;
  this.Za = !0
};
r.Da = p();
r.Mc = function(a) {
  a = a.l;
  this.ja.add(a);
  a = THREE.CollisionUtils.MeshColliderWBox(a);
  THREE.Collisions.colliders.push(a)
};
r.Oc = function(a) {
  this.ja.add(a.l)
};
r.za = function() {
  this.ha.setSize(window.innerWidth, window.innerHeight)
};
r.setSize = function() {
  this.ha.setSize(window.innerWidth, window.innerHeight)
};
r.Mb = function() {
  window.mozRequestAnimationFrame(wd.$.Mb);
  xd()
};
r.Ob = function() {
  window.webkitRequestAnimationFrame(wd.$.Ob);
  xd()
};
r.Nb = function() {
  window.oRequestAnimationFrame(wd.$.Nb);
  xd()
};
r.Lb = function() {
  window.Da(wd.$.Lb);
  xd()
};
function xd() {
  var a = wd.$;
  if(a.Za) {
    var b = new THREE.Vector3(a.ya.x, a.ya.y, 0.5);
    a.Vc.unprojectVector(b, a.aa.k);
    b = new THREE.Ray(a.aa.k.position, b.subSelf(a.aa.k.position).normalize());
    (b = THREE.Collisions.rayCastNearest(b)) && yd("mouse over " + b.mesh.name, "lgb.controller.WorldController.renderHelper");
    a.Za = !1
  }
  P(vb, a.Wc);
  a.ha.render(a.ja, a.aa.k)
}
;function zd() {
  vb = new Ad;
  var a = jQuery.proxy(this.a, this);
  jQuery(document).ready(a)
}
x(zd, T);
zd.prototype.a = function() {
  var a = this;
  (function() {
    $("<p>").attr("id", "errorWindow").append("body");
    window.onerror = function(a, c, d) {
      var f = $("#errorWindow").kendoWindow({draggable:!1, Qd:!1, width:"500px", height:"300px", title:"Exception Ocurred", Gd:!0, qd:["Refresh", "Maximize", "Close"]}).data("kendoWindow");
      f.content(a + "<br />url:" + c + "<br />line:" + d);
      f.center();
      f.open()
    }
  })();
  this.O = document.createElement("div");
  document.body.appendChild(this.O);
  this.$ = new vd(this.O);
  this.$.a();
  this.A(new Ec);
  $("<title>").append(xb()).appendTo("head");
  this.Ec = ub("lgb.controller.MainController");
  Bd(xb());
  Bd("jQuery version: " + $("").jquery);
  yd("jQuery.ui version: " + $.ui.version, k);
  this.Ad = new Ic;
  this.Sd = new Nc;
  $(window).resize(function() {
    a.A(new Dc(window.innerWidth, window.innerHeight))
  })
};
zd.prototype.za = function() {
  this.A(new Dc(window.innerWidth, window.innerHeight))
};
function Ad() {
}
x(Ad, ic);
Ad.prototype.A = function(a) {
  P(this, a)
};
String.prototype.m = function(a, b, c, d, f, e) {
  var g = arguments;
  return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function(a, b) {
    return a == "{{" ? "{" : a == "}}" ? "}" : g[b]
  })
};
if(!window.Da) {
  window.Da = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
    window.setTimeout(a, 1E3 / 60)
  }
}
function ud() {
  function a(a, b, c) {
    var d, f, e;
    for(f = 0;f < 30;f++) {
      for(d = 0;d < 73;d++) {
        e = (d + f * 74) * 4, a[e] = a[e + 4], a[e + 1] = a[e + 5], a[e + 2] = a[e + 6]
      }
    }
    for(f = 0;f < 30;f++) {
      e = (73 + f * 74) * 4, f < b ? (a[e] = q[c].c.i, a[e + 1] = q[c].c.h, a[e + 2] = q[c].c.g) : (a[e] = q[c].j.i, a[e + 1] = q[c].j.h, a[e + 2] = q[c].j.g)
    }
  }
  var b = 0, c, d = 0, f = (new Date).getTime(), e = f, g = f, i = 0, n = 1E3, m = 0, s, o, j, v, Rb, wa = 0, Sb = 1E3, Tb = 0, E, F, xa, Ub, G, Wa, q = {n:{c:{i:16, h:16, g:48}, j:{i:0, h:255, g:255}}, u:{c:{i:16, h:48, g:16}, j:{i:0, h:255, g:0}}, V:{c:{i:48, h:16, g:26}, j:{i:255, h:0, g:128}}};
  c = document.createElement("div");
  c.style.cursor = "pointer";
  c.style.width = "80px";
  c.style.opacity = "0.9";
  c.style.zIndex = "10001";
  c.addEventListener("click", function() {
    b++;
    b == 2 && (b = 0);
    s.style.display = "none";
    E.style.display = "none";
    G.style.display = "none";
    switch(b) {
      case 0:
        s.style.display = "block";
        break;
      case 1:
        E.style.display = "block";
        break;
      case 2:
        G.style.display = "block"
    }
  }, !1);
  s = document.createElement("div");
  s.style.backgroundColor = "rgb(" + Math.floor(q.n.c.i / 2) + "," + Math.floor(q.n.c.h / 2) + "," + Math.floor(q.n.c.g / 2) + ")";
  s.style.padding = "2px 0px 3px 0px";
  c.appendChild(s);
  o = document.createElement("div");
  o.style.fontFamily = "Helvetica, Arial, sans-serif";
  o.style.textAlign = "left";
  o.style.fontSize = "9px";
  o.style.color = "rgb(" + q.n.j.i + "," + q.n.j.h + "," + q.n.j.g + ")";
  o.style.margin = "0px 0px 1px 3px";
  o.innerHTML = '<span style="font-weight:bold">FPS</span>';
  s.appendChild(o);
  j = document.createElement("canvas");
  j.width = 74;
  j.height = 30;
  j.style.display = "block";
  j.style.marginLeft = "3px";
  s.appendChild(j);
  v = j.getContext("2d");
  v.fillStyle = "rgb(" + q.n.c.i + "," + q.n.c.h + "," + q.n.c.g + ")";
  v.fillRect(0, 0, j.width, j.height);
  Rb = v.getImageData(0, 0, j.width, j.height);
  E = document.createElement("div");
  E.style.backgroundColor = "rgb(" + Math.floor(q.u.c.i / 2) + "," + Math.floor(q.u.c.h / 2) + "," + Math.floor(q.u.c.g / 2) + ")";
  E.style.padding = "2px 0px 3px 0px";
  E.style.display = "none";
  c.appendChild(E);
  F = document.createElement("div");
  F.style.fontFamily = "Helvetica, Arial, sans-serif";
  F.style.textAlign = "left";
  F.style.fontSize = "9px";
  F.style.color = "rgb(" + q.u.j.i + "," + q.u.j.h + "," + q.u.j.g + ")";
  F.style.margin = "0px 0px 1px 3px";
  F.innerHTML = '<span style="font-weight:bold">MS</span>';
  E.appendChild(F);
  j = document.createElement("canvas");
  j.width = 74;
  j.height = 30;
  j.style.display = "block";
  j.style.marginLeft = "3px";
  E.appendChild(j);
  xa = j.getContext("2d");
  xa.fillStyle = "rgb(" + q.u.c.i + "," + q.u.c.h + "," + q.u.c.g + ")";
  xa.fillRect(0, 0, j.width, j.height);
  Ub = xa.getImageData(0, 0, j.width, j.height);
  G = document.createElement("div");
  G.style.backgroundColor = "rgb(" + Math.floor(q.V.c.i / 2) + "," + Math.floor(q.V.c.h / 2) + "," + Math.floor(q.V.c.g / 2) + ")";
  G.style.padding = "2px 0px 3px 0px";
  G.style.display = "none";
  c.appendChild(G);
  j = document.createElement("div");
  j.style.fontFamily = "Helvetica, Arial, sans-serif";
  j.style.textAlign = "left";
  j.style.fontSize = "9px";
  j.style.color = "rgb(" + q.V.j.i + "," + q.V.j.h + "," + q.V.j.g + ")";
  j.style.margin = "0px 0px 1px 3px";
  j.innerHTML = '<span style="font-weight:bold">MB</span>';
  G.appendChild(j);
  j = document.createElement("canvas");
  j.width = 74;
  j.height = 30;
  j.style.display = "block";
  j.style.marginLeft = "3px";
  G.appendChild(j);
  Wa = j.getContext("2d");
  Wa.fillStyle = "#301010";
  Wa.fillRect(0, 0, j.width, j.height);
  Wa.getImageData(0, 0, j.width, j.height);
  return{domElement:c, update:function() {
    d++;
    f = (new Date).getTime();
    wa = f - e;
    Sb = Math.min(Sb, wa);
    Tb = Math.max(Tb, wa);
    a(Ub.data, Math.min(30, 30 - wa / 200 * 30), "ms");
    F.innerHTML = '<span style="font-weight:bold">' + wa + " MS</span> (" + Sb + "-" + Tb + ")";
    xa.putImageData(Ub, 0, 0);
    e = f;
    if(f > g + 1E3) {
      i = Math.round(d * 1E3 / (f - g)), n = Math.min(n, i), m = Math.max(m, i), a(Rb.data, Math.min(30, 30 - i / 100 * 30), "fps"), o.innerHTML = '<span style="font-weight:bold">' + i + " FPS</span> (" + n + "-" + m + ")", v.putImageData(Rb, 0, 0), g = f, d = 0
    }
  }}
}
;function Cd() {
  this.Sb = ka()
}
var Dd = new Cd;
Cd.prototype.set = function(a) {
  this.Sb = a
};
Cd.prototype.reset = function() {
  this.set(ka())
};
Cd.prototype.get = aa("Sb");
function Ed(a) {
  this.Uc = a || "";
  this.fd = Dd
}
r = Ed.prototype;
r.Vb = !0;
r.cd = !0;
r.bd = !0;
r.Wb = !1;
r.dd = !1;
function Y(a) {
  return a < 10 ? "0" + a : String(a)
}
function Fd(a, b) {
  var c = (a.bc - b) / 1E3, d = c.toFixed(3), f = 0;
  if(c < 1) {
    f = 2
  }else {
    for(;c < 100;) {
      f++, c *= 10
    }
  }
  for(;f-- > 0;) {
    d = " " + d
  }
  return d
}
function Gd(a) {
  Ed.call(this, a)
}
x(Gd, Ed);
function Hd() {
  this.Pd = ja(this.jb, this);
  this.Ua = new Gd;
  this.Ua.Vb = !1;
  this.Bd = this.Ua.Wb = !1;
  this.Dc = "";
  this.uc = {}
}
Hd.prototype.jb = function(a) {
  if(!this.uc[a.Cb]) {
    var b;
    b = this.Ua;
    var c = [];
    c.push(b.Uc, " ");
    if(b.Vb) {
      var d = new Date(a.bc);
      c.push("[", Y(d.getFullYear() - 2E3) + Y(d.getMonth() + 1) + Y(d.getDate()) + " " + Y(d.getHours()) + ":" + Y(d.getMinutes()) + ":" + Y(d.getSeconds()) + "." + Y(Math.floor(d.getMilliseconds() / 10)), "] ")
    }
    b.cd && c.push("[", Fd(a, b.fd.get()), "s] ");
    b.bd && c.push("[", a.Cb, "] ");
    b.dd && c.push("[", a.L.name, "] ");
    c.push(a.Fb, "\n");
    b.Wb && a.Ta && c.push(a.Sa, "\n");
    b = c.join("");
    if(Z && Z.firebug) {
      switch(a.L) {
        case mb:
          Z.info(b);
          break;
        case nb:
          Z.error(b);
          break;
        case ob:
          Z.warn(b);
          break;
        default:
          Z.debug(b)
      }
    }else {
      Z ? Z.log(b) : window.opera ? window.opera.postError(b) : this.Dc += b
    }
  }
};
var Z = window.console;
function Bd(a) {
  yd(a, k)
}
function yd(a, b) {
  b === k && (b = "lgb");
  var c = new B(pb, a, b);
  wb.jb(c)
}
;wb = new Hd;
var wd = new zd;

