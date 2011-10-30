/*  Tipped 2.3.2 - 27-09-2011
 *  (c) 2010-2011 Nick Stakenburg - http://www.nickstakenburg.com
 *
 *  Tipped is licensed under the terms of the Tipped License:
 *  http://projects.nickstakenburg.com/tipped/license
 *
 *  More information on this project:
 *  http://projects.nickstakenburg.com/tipped
 */

var Tipped = { version: '2.3.2' };

Tipped.Skins = {
  // base skin, don't modify! (create custom skins in a seperate file)
  'base': {
    afterUpdate: false,
    ajax: {
      cache: true,
      type: 'get'
    },
    background: {
      color: '#f2f2f2',
      opacity: 1
    },
    border: {
      size: 1,
      color: '#000',
      opacity: 1
    },
    closeButtonSkin: 'default',
    containment: {
      selector: 'viewport'
    },
    fadeIn: 180,
    fadeOut: 220,
    showDelay: 75,
    hideDelay: 25,
    radius: {
      size: 3,
      position: 'background'
    },
    hideAfter: false,
    hideOn: {
      element: 'self',
      event: 'mouseleave'
    },
    hideOthers: false,
    hook: 'topleft',
    inline: false,
    offset: {
      x: 0, y: 0,
      mouse: { x: -12, y: -12 } // only defined in the base class
    },
    onHide: false,
    onShow: false,
    shadow: {
      blur: 2,
      color: '#000',
      offset: { x: 0, y: 0 },
      opacity: .15
    },
    showOn: 'mousemove',
    spinner: true,
    stem: {
      height: 6,
      width: 11,
      offset: { x: 5, y: 5 },
      spacing: 2
    },
    target: 'self'
  },
  
  // Every other skin inherits from this one
  'reset': {
    ajax: false,
    closeButton: false,
    hideOn: [{
      element: 'self',
      event: 'mouseleave'
    }, {
      element: 'tooltip',
      event: 'mouseleave'
    }],
    hook: 'topmiddle',
    stem: true
  },

  // Custom skins start here
  'black': {
     background: { color: '#232323', opacity: .9 },
     border: { size: 1, color: "#232323" },
     spinner: { color: '#fff' }
  },

  'cloud': {
    border: {
      size: 1,
      color: [
        { position: 0, color: '#bec6d5'},
        { position: 1, color: '#b1c2e3' }
      ]
    },
    closeButtonSkin: 'light',
    background: {
      color: [
        { position: 0, color: '#f6fbfd'},
        { position: 0.1, color: '#fff' },
        { position: .48, color: '#fff'},
        { position: .5, color: '#fefffe'},
        { position: .52, color: '#f7fbf9'},
        { position: .8, color: '#edeff0' },
        { position: 1, color: '#e2edf4' }
      ]
    },
    shadow: { opacity: .1 }
  },

  'dark': {
    border: { size: 1, color: '#1f1f1f', opacity: .95 },
    background: {
      color: [
        { position: .0, color: '#686766' },
        { position: .48, color: '#3a3939' },
        { position: .52, color: '#2e2d2d' },
        { position: .54, color: '#2c2b2b' },
        { position: 0.95, color: '#222' },
        { position: 1, color: '#202020' }
      ],
      opacity: .9
    },
    radius: { size: 4 },
    shadow: { offset: { x: 0, y: 1 } },
    spinner: { color: '#ffffff' }
  },

  'facebook': {
    background: { color: '#282828' },
    border: 0,
    fadeIn: 0,
    fadeOut: 0,
    radius: 0,
    stem: {
      width: 7,
      height: 4,
      offset: { x: 6, y: 6 }
    },
    shadow: false
  },

  'lavender': {
    background: {
      color: [
        { position: .0, color: '#b2b6c5' },
        { position: .5, color: '#9da2b4' },
        { position: 1, color: '#7f85a0' }
      ]
    },
    border: {
      color: [
        { position: 0, color: '#a2a9be' },
        { position: 1, color: '#6b7290' }
      ],
      size: 1
    },
    radius: 1,
    shadow: { opacity: .1 }
  },

  'light': {
    border: { size: 0, color: '#afafaf' },
    background: {
      color: [
        { position: 0, color: '#fefefe' },
        { position: 1, color: '#f7f7f7' }
      ]
    },
    closeButtonSkin: 'light',
    radius: 1,
    stem: {
      height: 7,
      width: 13,
      offset: { x: 7, y: 7 }
    },
    shadow: { opacity: .32, blur: 2 }
  },

  'lime': {
    border: {
      size: 1,
      color: [
        { position: 0,   color: '#5a785f' },
        { position: .05, color: '#0c7908' },
        { position: 1, color: '#587d3c' }
      ]
    },
    background: {
      color: [
        { position: 0,   color: '#a5e07f' },
        { position: .02, color: '#cef8be' },
        { position: .09, color: '#7bc83f' },
        { position: .35, color: '#77d228' },
        { position: .65, color: '#85d219' },
        { position: .8,  color: '#abe041' },
        { position: 1,   color: '#c4f087' }
      ]
    }
  },

  'liquid' : {
    border: {
      size: 1,
      color: [
        { position: 0, color: '#454545' },
        { position: 1, color: '#101010' }
      ]
    },
    background: {
      color: [
        { position: 0, color: '#515562'},
        { position: .3, color: '#252e43'},
        { position: .48, color: '#111c34'},
        { position: .52, color: '#161e32'},
        { position: .54, color: '#0c162e'},
        { position: 1, color: '#010c28'}
      ],
      opacity: .8
    },
    radius: { size: 4 },
    shadow: { offset: { x: 0, y: 1 } },
    spinner: { color: '#ffffff' }
  },

  'blue': {
    border: {
      color: [
        { position: 0, color: '#113d71'},
        { position: 1, color: '#1e5290' }
      ]
    },
    background: {
      color: [
        { position: 0, color: '#3a7ab8'},
        { position: .48, color: '#346daa'},
        { position: .52, color: '#326aa6'},
        { position: 1, color: '#2d609b' }
      ]
    },
    spinner: { color: '#f2f6f9' },
    shadow: { opacity: .2 }
  },

  'salmon' : {
    background: {
      color: [
        { position: 0, color: '#fbd0b7' },
        { position: .5, color: '#fab993' },
        { position: 1, color: '#f8b38b' }
      ]
    },
    border: {
      color: [
        { position: 0, color: '#eda67b' },
        { position: 1, color: '#df946f' }
      ],
      size: 1
    },
    radius: 1,
    shadow: { opacity: .1 }
  },

  'yellow': {
    border: { size: 1, color: '#f7c735' },
    background: '#ffffaa',
    radius: 1,
    shadow: { opacity: .1 }
  }
};

Tipped.Skins.CloseButtons = {
  'base': {
    diameter: 17,
    border: 2,
    x: { diameter: 10, size: 2, opacity: 1 },
    states: {
      'default': {
        background: {
          color: [
            { position: 0, color: '#1a1a1a' },
            { position: 0.46, color: '#171717' },
            { position: 0.53, color: '#121212' },
            { position: 0.54, color: '#101010' },
            { position: 1, color: '#000' }
          ],
          opacity: 1
        },
        x: { color: '#fafafa', opacity: 1 },
        border: { color: '#fff', opacity: 1 }
      },
      'hover': {
        background: {
          color: '#333',
          opacity: 1
        },
        x: { color: '#e6e6e6', opacity: 1 },
        border: { color: '#fff', opacity: 1 }
      }
    },
    shadow: {
      blur: 2,
      color: '#000',
      offset: { x: 0, y: 0 },
      opacity: .3
    }
  },

  'reset': {},

  'default': {},

  'light': {
    diameter: 17,
    border: 2,
    x: { diameter: 10, size: 2, opacity: 1 },
    states: {
      'default': {
        background: {
          color: [
            { position: 0, color: '#797979' },
            { position: 0.48, color: '#717171' },
            { position: 0.52, color: '#666' },
            { position: 1, color: '#666' }
          ],
          opacity: 1
        },
        x: { color: '#fff', opacity: .95 },
        border: { color: '#676767', opacity: 1 }
      },
      'hover': {
        background: {
          color: [
            { position: 0, color: '#868686' },
            { position: 0.48, color: '#7f7f7f' },
            { position: 0.52, color: '#757575' },
            { position: 1, color: '#757575' }
          ],
          opacity: 1
        },
        x: { color: '#fff', opacity: 1 },
        border: { color: '#767676', opacity: 1 }
      }
    }
  }
};

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(D(a){D b(a,b){L c=[a,b];M c.H=a,c.J=b,c}D c(a){C.S=a}D d(a){L b={},c;1E(c 5I a)b[c]=a[c]+"26";M b}D e(a){M a*2g/N.2y}D f(a){M a*N.2y/2g}D g(b){b&&(C.S=b,t.1f(b),b=C.1P(),C.I=a.Y({},b.I),C.1Z=1,C.12={},t.2I(C),C.1z=C.I.Z.1e,C.7j=C.I.W&&C.1z,C.1s())}D h(b,c,d){(C.S=b)&&c&&(C.I=a.Y({2z:3,1h:{x:0,y:0},1q:"#3W",1n:.5,2h:1},d||{}),C.1Z=C.I.2h,C.12={},u.2I(C),C.1s())}D i(b,c){T(C.S=b)C.I=a.Y({2z:5,1h:{x:0,y:0},1q:"#3W",1n:.5,2h:1},c||{}),C.1Z=C.I.2h,v.2I(C),C.1s()}D j(b,c){1E(L d 5I c)c[d]&&c[d].37&&c[d].37===4K?(b[d]=a.Y({},b[d])||{},j(b[d],c[d])):b[d]=c[d];M b}D k(b,c,d){T(C.S=b){w.1f(C.S),w.2I(C),a.14(c)=="7k"&&!m.27(c)?(d=c,c=1g):d=d||{},C.I=w.5J(d),d=b.5K("4L");T(!c){L e=b.5K("2J-7l");e?c=e:d&&(c=d)}d&&(a(b).2J("4M",d),b.7m("4L","")),C.2A=c,C.1S=C.I.1S||+w.I.3X,C.12={2K:{G:1,K:1},4N:[],2L:[],20:{3Y:!1,28:!1,1o:!1,38:!1,1s:!1,3Z:!1,4O:!1,39:!1}},b=C.I.1j,C.1j=b=="2o"?"2o":b=="40"||!b?C.S:b&&1b.7n(b)||C.S,C.5L(),C.5M()}}L l=5N.3a.7o,m={7p:D(b,c){M D(){L d=[a.1d(b,C)].5O(l.2U(41));M c.4P(C,d)}},"1a":{},5P:D(a,b){1E(L c=0,d=a.1x;c<d;c++)b(a[c])},19:D(a,b,c){L d=0;4Q{C.5P(a,D(a){b.2U(c,a,d++)})}4R(e){T(e!=m["1a"])7q e}},42:D(a,b,c){L d=!1;M m.19(a||[],D(a,e){T(d|=b.2U(c,a,e))M m["1a"]}),!!d},5Q:D(a,b){L c=!1;M m.42(a||[],D(a){T(c=a===b)M!0}),c},4S:D(a,b,c){L d=[];M m.19(a||[],D(a,e){b.2U(c,a,e)&&(d[d.1x]=a)}),d},3t:D(a){L b=l.2U(41,1);M m.4S(a,D(a){M!m.5Q(b,a)})},27:D(a){M a&&a.7r==1},4T:D(a,b){L c=l.2U(41,2);M 7s(D(){M a.4P(a,c)},b)},4U:D(a){M m.4T.4P(C,[a,1].5O(l.2U(41,1)))},43:D(a){M{x:a.5R,y:a.7t}},4V:D(b,c){L d=b.1j;M c?a(d).4W(c)[0]:d},S:{44:D(a){L c=0,d=0;7u c+=a.46||0,d+=a.47||0,a=a.48;7v(a);M b(d,c)},49:D(c){L d=a(c).1h(),c=m.S.44(c),e=a(1F).46(),f=a(1F).47();M d.H+=c.H-f,d.J+=c.J-e,b(d.H,d.J)}}},n=D(a){D b(b){M(b=5S(b+"([\\\\d.]+)").7w(a))?5T(b[1]):!0}M{4X:!!1F.7x&&a.2V("4Y")===-1&&b("7y "),4Y:a.2V("4Y")>-1&&(!!1F.4Z&&4Z.5U&&5T(4Z.5U())||7.55),7z:a.2V("5V/")>-1&&b("5V/"),5W:a.2V("5W")>-1&&a.2V("7A")===-1&&b("7B:"),7C:!!a.2M(/7D.*7E.*7F/),52:a.2V("52")>-1&&b("52/")}}(7G.7H),o={2B:{2W:{4a:"2.7I",4b:1F.2W&&2W.7J},3u:{4a:"1.6",4b:1F.3u&&3u.7K.7L}},53:D(){D a(a){1E(L c=(a=a.2M(b))&&a[1]&&a[1].2p(".")||[],d=0,e=0,f=c.1x;e<f;e++)d+=2q(c[e]*N.4c(10,6-e*2));M a&&a[3]?d-1:d}L b=/^(\\d+(\\.?\\d+){0,3})([A-5X-7M-]+[A-5X-7N-9]+)?/;M D(b){!C.2B[b].5Y&&(C.2B[b].5Y=!0,!C.2B[b].4b||a(C.2B[b].4b)<a(C.2B[b].4a)&&!C.2B[b].5Z)&&(C.2B[b].5Z=!0,60("1A 61 "+b+" >= "+C.2B[b].4a))}}()};a.Y(1A,D(){L b=D(){L a=1b.1v("2C");M!!a.2X&&!!a.2X("2d")}(),d;4Q{d=!!1b.62("7O")}4R(e){d=!1}M{2N:{2C:b,54:d,3v:D(){L b=!1;M a.19(["7P","7Q","7R"],D(a,c){4Q{1b.62(c),b=!0}4R(d){}}),b}()},2O:D(){T(!C.2N.2C&&!1F.3w)T(n.4X)60("1A 61 7S (7T.7U)");1K M;o.53("3u"),a(1b).63(D(){w.64()})},4d:D(a,b,d){M c.4d(a,b,d),C.17(a)},17:D(a){M 2Y c(a)},1w:D(a){M C.17(a).1w(),C},1l:D(a){M C.17(a).1l(),C},2D:D(a){M C.17(a).2D(),C},2r:D(a){M C.17(a).2r(),C},1f:D(a){M C.17(a).1f(),C},4e:D(){M w.4e(),C},56:D(a){M w.56(a),C},57:D(a){M w.57(a),C},1o:D(b){T(m.27(b))M w.58(b);T(a.14(b)!="59"){L b=a(b),c=0;M a.19(b,D(a,b){w.58(b)&&c++}),c}M w.3x().1x}}}()),a.Y(c,{4d:D(b,c,d){T(b){L e=d||{},f=[];M m.27(b)?f.1T(2Y k(b,c,e)):a(b).19(D(a,b){f.1T(2Y k(b,c,e))}),f}}}),a.Y(c.3a,{3y:D(){M w.29.4f={x:0,y:0},w.17(C.S)},1w:D(){M a.19(C.3y(),D(a,b){b.1w()}),C},1l:D(){M a.19(C.3y(),D(a,b){b.1l()}),C},2D:D(){M a.19(C.3y(),D(a,b){b.2D()}),C},2r:D(){M a.19(C.3y(),D(a,b){b.2r()}),C},1f:D(){M w.1f(C.S),C}});L p={2O:D(){M 1F.3w&&!1A.2N.2C&&n.4X?D(a){3w.7V(a)}:D(){}}(),65:D(b,c){L d=a.Y({J:0,H:0,G:0,K:0,11:0},c||{}),e=d.H,g=d.J,h=d.G,i=d.K;(d=d.11)?(b.1L(),b.2P(e+d,g),b.1J(e+h-d,g+d,d,f(-90),f(0),!1),b.1J(e+h-d,g+i-d,d,f(0),f(90),!1),b.1J(e+d,g+i-d,d,f(90),f(2g),!1),b.1J(e+d,g+d,d,f(-2g),f(-90),!1),b.1M(),b.2s()):b.66(e,g,h,i)},7W:D(b,c,d){1E(L d=a.Y({x:0,y:0,1q:"#3W"},d||{}),e=0,f=c.1x;e<f;e++)1E(L g=0,h=c[e].1x;g<h;g++){L i=2q(c[e].2Z(g))*(1/9);b.2i=s.2j(d.1q,i),i&&b.66(d.x+g,d.y+e,1,1)}},3z:D(b,c,d){L e;M a.14(c)=="1V"?e=s.2j(c):a.14(c.1q)=="1V"?e=s.2j(c.1q,a.14(c.1n)=="2a"?c.1n:1):a.67(c.1q)&&(d=a.Y({3b:0,3c:0,3d:0,3e:0},d||{}),e=p.68.69(b.7X(d.3b,d.3c,d.3d,d.3e),c.1q,c.1n)),e},68:{69:D(b,c,d){1E(L d=a.14(d)=="2a"?d:1,e=0,f=c.1x;e<f;e++){L g=c[e];T(a.14(g.1n)=="59"||a.14(g.1n)!="2a")g.1n=1;b.7Y(g.P,s.2j(g.1q,g.1n*d))}M b}}},q={3A:"3f,3B,3g,3h,3C,3D,3E,3F,3G,3H,3I,3i".2p(","),3J:{6a:/^(J|H|1B|1C)(J|H|1B|1C|2t|2u)$/,1y:/^(J|1B)/,2Q:/(2t|2u)/,6b:/^(J|1B|H|1C)/},6c:D(){L a={J:"K",H:"G",1B:"K",1C:"G"};M D(b){M a[b]}}(),2Q:D(a){M!!a.30().2M(C.3J.2Q)},5a:D(a){M!C.2Q(a)},2k:D(a){M a.30().2M(C.3J.1y)?"1y":"21"},5b:D(a){L b=1g;M(a=a.30().2M(C.3J.6b))&&a[1]&&(b=a[1]),b},2p:D(a){M a.30().2M(C.3J.6a)}},r={5c:D(a){M a=a.I.W,{G:a.G,K:a.K}},3K:D(b,c,d){M d=a.Y({3j:"1k"},d||{}),b=b.I.W,c=C.4g(b.G,b.K,c),d.3j&&(c.G=N[d.3j](c.G),c.K=N[d.3j](c.K)),{G:c.G,K:c.K}},4g:D(a,b,c){L d=2g-e(N.6d(b/a*.5));M c*=N.4h(f(d-90)),c=a+c*2,{G:c,K:c*b/a}},31:D(a,b){L c=C.3K(a,b),d=C.5c(a);q.2Q(a.1z);L e=N.1k(c.K+b);M{2E:{Q:{G:N.1k(c.G),K:N.1k(e)}},U:{Q:c},W:{Q:{G:d.G,K:d.K}}}},5d:D(b,c,d){L e={J:0,H:0},f={J:0,H:0},g=a.Y({},c),h=b.U,i=i||C.31(b,b.U),j=i.2E.Q;d&&(j.K=d,h=0);T(b.I.W){L k=q.5b(b.1z);k=="J"?e.J=j.K-h:k=="H"&&(e.H=j.K-h);L d=q.2p(b.1z),l=q.2k(b.1z);T(l=="1y"){1t(d[2]){R"2t":R"2u":f.H=.5*g.G;1a;R"1C":f.H=g.G}d[1]=="1B"&&(f.J=g.K-h+j.K)}1K{1t(d[2]){R"2t":R"2u":f.J=.5*g.K;1a;R"1B":f.J=g.K}d[1]=="1C"&&(f.H=g.G-h+j.K)}g[q.6c(k)]+=j.K-h}1K T(d=q.2p(b.1z),l=q.2k(b.1z),l=="1y"){1t(d[2]){R"2t":R"2u":f.H=.5*g.G;1a;R"1C":f.H=g.G}d[1]=="1B"&&(f.J=g.K)}1K{1t(d[2]){R"2t":R"2u":f.J=.5*g.K;1a;R"1B":f.J=g.K}d[1]=="1C"&&(f.H=g.G)}L m=b.I.11&&b.I.11.2b||0,h=b.I.U&&b.I.U.2b||0;T(b.I.W){L n=b.I.W&&b.I.W.1h||{x:0,y:0},k=m&&b.I.11.P=="X"?m:0,m=m&&b.I.11.P=="U"?m:m+h,o=h+k+.5*i.W.Q.G-.5*i.U.Q.G,i=N.1k(h+k+.5*i.W.Q.G+(m>o?m-o:0));T(l=="1y")1t(d[2]){R"H":f.H+=i;1a;R"1C":f.H-=i}1K 1t(d[2]){R"J":f.J+=i;1a;R"1B":f.J-=i}}T(b.I.W&&(n=b.I.W.1h))T(l=="1y")1t(d[2]){R"H":f.H+=n.x;1a;R"1C":f.H-=n.x}1K 1t(d[2]){R"J":f.J+=n.y;1a;R"1B":f.J-=n.y}L p;T(b.I.W&&(p=b.I.W.7Z))T(l=="1y")1t(d[1]){R"J":f.J-=p;1a;R"1B":f.J+=p}1K 1t(d[1]){R"H":f.H-=p;1a;R"1C":f.H+=p}M{Q:g,P:{J:0,H:0},X:{P:e,Q:c},W:{Q:j},1W:f}}},s=D(){D b(a){M a.6e=a[0],a.6f=a[1],a.6g=a[2],a}D c(a){L c=5N(3);a.2V("#")==0&&(a=a.4i(1)),a=a.30();T(a.80(d,"")!="")M 1g;a.1x==3?(c[0]=a.2Z(0)+a.2Z(0),c[1]=a.2Z(1)+a.2Z(1),c[2]=a.2Z(2)+a.2Z(2)):(c[0]=a.4i(0,2),c[1]=a.4i(2,4),c[2]=a.4i(4));1E(a=0;a<c.1x;a++)c[a]=2q(c[a],16);M b(c)}L d=5S("[81]","g");M{82:c,2j:D(b,d){a.14(d)=="59"&&(d=1);L e=d,f=c(b);M f[3]=e,f.1n=e,"83("+f.84()+")"},85:D(a){L a=c(a),a=b(a),d=a.6e,e=a.6f,f=a.6g,g,h=d>e?d:e;f>h&&(h=f);L i=d<e?d:e;f<i&&(i=f),g=h/86,a=h!=0?(h-i)/h:0;T(a==0)d=0;1K{L j=(h-d)/(h-i),k=(h-e)/(h-i),f=(h-f)/(h-i),d=d==h?f-k:e==h?2+j-f:4+k-j;d/=6,d<0&&(d+=1)}M d=N.1N(d*6h),a=N.1N(a*5e),g=N.1N(g*5e),e=[],e[0]=d,e[1]=a,e[2]=g,e.87=d,e.88=a,e.89=g,"#"+(e[2]>50?"3W":"8a")}}}(),t={3L:[],17:D(b){T(!b)M 1g;L c=1g;M a.19(C.3L,D(a,d){d.S==b&&(c=d)}),c},2I:D(a){C.3L.1T(a)},1f:D(a){T(a=C.17(a))C.3L=m.3t(C.3L,a),a.1f()}};a.Y(g.3a,D(){M{4j:D(){L a=C.1P();C.2K=a.12.2K,a=a.I,C.11=a.11&&a.11.2b||0,C.U=a.U&&a.U.2b||0,C.1X=a.1X,a=N.5f(C.2K.K,C.2K.G),C.11>a/2&&(C.11=N.5g(a/2)),C.I.11.P=="U"&&C.11>C.U&&(C.U=C.11),C.12={I:{11:C.11,U:C.U,1X:C.1X}}},6i:D(){C.12.Z={};L b=C.1z;a.19(q.3A,a.1d(D(a,b){L c;C.12.Z[b]={},C.1z=b,c=C.1Y(),C.12.Z[b].1W=c.1W,C.12.Z[b].1i={Q:c.1i.Q,P:{J:c.1i.P.J,H:c.1i.P.H}},C.12.Z[b].1e={Q:c.1G.Q},C.15&&(c=C.15.1Y(),C.12.Z[b].1W=c.1W,C.12.Z[b].1i.P.J+=c.1G.P.J,C.12.Z[b].1i.P.H+=c.1G.P.H,C.12.Z[b].1e.Q=c.1e.Q)},C)),C.1z=b},1s:D(){C.2F(),1F.3w&&1F.3w.8b(1b);L b=C.1P(),c=C.I;a(C.1i=1b.1v("1O")).1u({"1U":"8c"}),a(b.4k).1H(C.1i),C.4j(),C.6j(b),c.1c&&(C.6k(b),c.1c.15)&&(C.2v?(C.2v.I=c.1c.15,C.2v.1s()):C.2v=2Y i(C.S,a.Y({2h:C.1Z},c.1c.15))),C.4l(),c.15&&(C.15?(C.15.I=c.15,C.15.1s()):C.15=2Y h(C.S,C,a.Y({2h:C.1Z},c.15))),C.6i()},1f:D(){C.2F(),C.I.15&&(u.1f(C.S),C.I.1c&&C.I.1c.15&&v.1f(C.S)),C.V&&(a(C.V).1f(),C.V=1g)},2F:D(){C.1i&&(C.1c&&(a(C.1c).1f(),C.5h=C.5i=C.1c=1g),a(C.1i).1f(),C.1i=C.X=C.W=1g,C.12={})},1P:D(){M w.17(C.S)[0]},2r:D(){L b=C.1P(),c=a(b.V),d=a(b.V).5j(".6l").6m()[0];T(d){a(d).13({G:"5k",K:"5k"});L e=2q(c.13("J")),f=2q(c.13("H")),g=2q(c.13("G"));c.13({H:"-6n",J:"-6n",G:"8d",K:"5k"});L h=w.4m.5l(d);b.I.2R&&a.14(b.I.2R)=="2a"&&h.G>b.I.2R&&(a(d).13({G:b.I.2R+"26"}),h=w.4m.5l(d)),b.12.2K=h,c.13({H:f+"26",J:e+"26",G:g+"26"}),C.1s()}},3M:D(a){C.1z!=a&&(C.1z=a,C.1s())},6k:D(b){L c=b.I.1c,c={G:c.32+2*c.U,K:c.32+2*c.U};a(b.V).1H(a(C.1c=1b.1v("1O")).1u({"1U":"6o"}).13(d(c)).1H(a(C.6p=1b.1v("1O")).1u({"1U":"8e"}).13(d(c)))),C.5m(b,"5n"),C.5m(b,"5o"),a(C.1c).3k("3N",a.1d(C.6q,C)).3k("4n",a.1d(C.6r,C))},5m:D(b,c){L e=b.I.1c,g=e.32,h=e.U||0,i=e.x.32,j=e.x.2b,e=e.20[c||"5n"],k={G:g+2*h,K:g+2*h};i>=g&&(i=g-2);L l;a(C.6p).1H(a(C[c+"8f"]=1b.1v("1O")).1u({"1U":"8g"}).13(a.Y(d(k),{H:(c=="5o"?k.G:0)+"26"})).1H(a(l=1b.1v("2C")).1u(k))),p.2O(l),l=l.2X("2d"),l.2h=C.1Z,l.8h(k.G/2,k.K/2),l.2i=p.3z(l,e.X,{3b:0,3c:0-g/2,3d:0,3e:0+g/2}),l.1L(),l.1J(0,0,g/2,0,N.2y*2,!0),l.1M(),l.2s(),h&&(l.2i=p.3z(l,e.U,{3b:0,3c:0-g/2-h,3d:0,3e:0+g/2+h}),l.1L(),l.1J(0,0,g/2,N.2y,0,!1),l.O((g+h)/2,0),l.1J(0,0,g/2+h,0,N.2y,!0),l.1J(0,0,g/2+h,N.2y,0,!0),l.O(g/2,0),l.1J(0,0,g/2,0,N.2y,!1),l.1M(),l.2s()),g=i/2,j/=2,j>g&&(h=j,j=g,g=h),l.2i=s.2j(e.x.1q||e.x,e.x.1n||1),l.4o(f(45)),l.1L(),l.2P(0,0),l.O(0,g);1E(e=0;e<4;e++)l.O(0,g),l.O(j,g),l.O(j,g-(g-j)),l.O(g,j),l.O(g,0),l.4o(f(90));l.1M(),l.2s()},6j:D(b){L c=C.1Y(),d=C.I.W&&C.3O(),e=C.1z&&C.1z.30(),f=C.11,g=C.U,h=b.I.W&&b.I.W.1h||{x:0,y:0},i=0,j=0;f&&(i=C.I.11.P=="X"?f:0,j=C.I.11.P=="U"?f:i+g),C.2S=1b.1v("2C"),a(C.2S).1u(c.1i.Q),a(C.1i).1H(C.2S),a(b.V).1w(),p.2O(C.2S),b.1m("1o")||a(b.V).1l(),b=C.2S.2X("2d"),b.2h=C.1Z,b.2i=p.3z(b,C.I.X,{3b:0,3c:c.X.P.J+g,3d:0,3e:c.X.P.J+c.X.Q.K-g}),b.8i=0,C.5p(b,{1L:!0,1M:!0,U:g,11:i,4p:j,33:c,34:d,W:C.I.W,35:e,36:h}),b.2s(),g&&(f=p.3z(b,C.I.U,{3b:0,3c:c.X.P.J,3d:0,3e:c.X.P.J+c.X.Q.K}),b.2i=f,C.5p(b,{1L:!0,1M:!1,U:g,11:i,4p:j,33:c,34:d,W:C.I.W,35:e,36:h}),C.6s(b,{1L:!1,1M:!0,U:g,6t:i,11:{2b:j,P:C.I.11.P},33:c,34:d,W:C.I.W,35:e,36:h}),b.2s())},5p:D(b,c){L d=a.Y({W:!1,35:1g,1L:!1,1M:!1,33:1g,34:1g,11:0,U:0,4p:0,36:{x:0,y:0}},c||{}),e=d.33,g=d.34,h=d.36,i=d.U,j=d.11,k=d.35,l=e.X.P,e=e.X.Q,m,n,o;g&&(m=g.W.Q,n=g.2E.Q,o=d.4p,g=i+j+.5*m.G-.5*g.U.Q.G,o=N.1k(o>g?o-g:0));L p,g=j?l.H+i+j:l.H+i;p=l.J+i,h&&h.x&&/^(3f|3i)$/.4q(k)&&(g+=h.x),d.1L&&b.1L(),b.2P(g,p);T(d.W)1t(k){R"3f":g=l.H+i,j&&(g+=j),g+=N.1r(o,h.x||0),b.O(g,p),p-=m.K,g+=m.G*.5,b.O(g,p),p+=m.K,g+=m.G*.5,b.O(g,p);1a;R"3B":R"4r":g=l.H+e.G*.5-m.G*.5,b.O(g,p),p-=m.K,g+=m.G*.5,b.O(g,p),p+=m.K,g+=m.G*.5,b.O(g,p),g=l.H+e.G*.5-n.G*.5,b.O(g,p);1a;R"3g":g=l.H+e.G-i-m.G,j&&(g-=j),g-=N.1r(o,h.x||0),b.O(g,p),p-=m.K,g+=m.G*.5,b.O(g,p),p+=m.K,g+=m.G*.5,b.O(g,p)}j?j&&(b.1J(l.H+e.G-i-j,l.J+i+j,j,f(-90),f(0),!1),g=l.H+e.G-i,p=l.J+i+j):(g=l.H+e.G-i,p=l.J+i,b.O(g,p));T(d.W)1t(k){R"3h":p=l.J+i,j&&(p+=j),p+=N.1r(o,h.y||0),b.O(g,p),g+=m.K,p+=m.G*.5,b.O(g,p),g-=m.K,p+=m.G*.5,b.O(g,p);1a;R"3C":R"4s":p=l.J+e.K*.5-m.G*.5,b.O(g,p),g+=m.K,p+=m.G*.5,b.O(g,p),g-=m.K,p+=m.G*.5,b.O(g,p);1a;R"3D":p=l.J+e.K-i,j&&(p-=j),p-=m.G,p-=N.1r(o,h.y||0),b.O(g,p),g+=m.K,p+=m.G*.5,b.O(g,p),g-=m.K,p+=m.G*.5,b.O(g,p)}j?j&&(b.1J(l.H+e.G-i-j,l.J+e.K-i-j,j,f(0),f(90),!1),g=l.H+e.G-i-j,p=l.J+e.K-i):(g=l.H+e.G-i,p=l.J+e.K-i,b.O(g,p));T(d.W)1t(k){R"3E":g=l.H+e.G-i,j&&(g-=j),g-=N.1r(o,h.x||0),b.O(g,p),g-=m.G*.5,p+=m.K,b.O(g,p),g-=m.G*.5,p-=m.K,b.O(g,p);1a;R"3F":R"4t":g=l.H+e.G*.5+m.G*.5,b.O(g,p),g-=m.G*.5,p+=m.K,b.O(g,p),g-=m.G*.5,p-=m.K,b.O(g,p);1a;R"3G":g=l.H+i+m.G,j&&(g+=j),g+=N.1r(o,h.x||0),b.O(g,p),g-=m.G*.5,p+=m.K,b.O(g,p),g-=m.G*.5,p-=m.K,b.O(g,p)}j?j&&(b.1J(l.H+i+j,l.J+e.K-i-j,j,f(90),f(2g),!1),g=l.H+i,p=l.J+e.K-i-j):(g=l.H+i,p=l.J+e.K-i,b.O(g,p));T(d.W)1t(k){R"3H":p=l.J+e.K-i,j&&(p-=j),p-=N.1r(o,h.y||0),b.O(g,p),g-=m.K,p-=m.G*.5,b.O(g,p),g+=m.K,p-=m.G*.5,b.O(g,p);1a;R"3I":R"4u":p=l.J+e.K*.5+m.G*.5,b.O(g,p),g-=m.K,p-=m.G*.5,b.O(g,p),g+=m.K,p-=m.G*.5,b.O(g,p);1a;R"3i":p=l.J+i+m.G,j&&(p+=j),p+=N.1r(o,h.y||0),b.O(g,p),g-=m.K,p-=m.G*.5,b.O(g,p),g+=m.K,p-=m.G*.5,b.O(g,p)}M j?j&&(b.1J(l.H+i+j,l.J+i+j,j,f(-2g),f(-90),!1),g=l.H+i+j,p=l.J+i,g+=1,b.O(g,p)):(g=l.H+i,p=l.J+i,b.O(g,p)),d.1M&&b.1M(),{x:g,y:p}},6s:D(b,c){L d=a.Y({W:!1,35:1g,1L:!1,1M:!1,33:1g,34:1g,11:0,U:0,8j:0,36:{x:0,y:0}},c||{}),e=d.33,g=d.34,h=d.36,i=d.U,j=d.11&&d.11.2b||0,k=d.6t,l=d.35,m=e.X.P,e=e.X.Q,n,o,p;g&&(n=g.W.Q,o=g.U.Q,p=i+k+.5*n.G-.5*o.G,p=N.1k(j>p?j-p:0));L g=m.H+i+k,q=m.J+i;k&&(g+=1),a.Y({},{x:g,y:q}),d.1L&&b.1L();L r=a.Y({},{x:g,y:q});q-=i,b.O(g,q),j?j&&(b.1J(m.H+j,m.J+j,j,f(-90),f(-2g),!0),g=m.H,q=m.J+j):(g=m.H,q=m.J,b.O(g,q));T(d.W)1t(l){R"3i":q=m.J+i,k&&(q+=k),q-=o.G*.5,q+=n.G*.5,q+=N.1r(p,h.y||0),b.O(g,q),g-=o.K,q+=o.G*.5,b.O(g,q),g+=o.K,q+=o.G*.5,b.O(g,q);1a;R"3I":R"4u":q=m.J+e.K*.5-o.G*.5,b.O(g,q),g-=o.K,q+=o.G*.5,b.O(g,q),g+=o.K,q+=o.G*.5,b.O(g,q);1a;R"3H":q=m.J+e.K-i-o.G,k&&(q-=k),q+=o.G*.5,q-=n.G*.5,q-=N.1r(p,h.y||0),b.O(g,q),g-=o.K,q+=o.G*.5,b.O(g,q),g+=o.K,q+=o.G*.5,b.O(g,q)}j?j&&(b.1J(m.H+j,m.J+e.K-j,j,f(-2g),f(-8k),!0),g=m.H+j,q=m.J+e.K):(g=m.H,q=m.J+e.K,b.O(g,q));T(d.W)1t(l){R"3G":g=m.H+i,k&&(g+=k),g-=o.G*.5,g+=n.G*.5,g+=N.1r(p,h.x||0),b.O(g,q),q+=o.K,g+=o.G*.5,b.O(g,q),q-=o.K,g+=o.G*.5,b.O(g,q);1a;R"3F":R"4t":g=m.H+e.G*.5-o.G*.5,b.O(g,q),q+=o.K,g+=o.G*.5,b.O(g,q),q-=o.K,g+=o.G*.5,b.O(g,q),g=m.H+e.G*.5+o.G,b.O(g,q);1a;R"3E":g=m.H+e.G-i-o.G,k&&(g-=k),g+=o.G*.5,g-=n.G*.5,g-=N.1r(p,h.x||0),b.O(g,q),q+=o.K,g+=o.G*.5,b.O(g,q),q-=o.K,g+=o.G*.5,b.O(g,q)}j?j&&(b.1J(m.H+e.G-j,m.J+e.K-j,j,f(90),f(0),!0),g=m.H+e.G,q=m.J+e.G+j):(g=m.H+e.G,q=m.J+e.K,b.O(g,q));T(d.W)1t(l){R"3D":q=m.J+e.K-i,q+=o.G*.5,q-=n.G*.5,k&&(q-=k),q-=N.1r(p,h.y||0),b.O(g,q),g+=o.K,q-=o.G*.5,b.O(g,q),g-=o.K,q-=o.G*.5,b.O(g,q);1a;R"3C":R"4s":q=m.J+e.K*.5+o.G*.5,b.O(g,q),g+=o.K,q-=o.G*.5,b.O(g,q),g-=o.K,q-=o.G*.5,b.O(g,q);1a;R"3h":q=m.J+i,k&&(q+=k),q+=o.G,q-=o.G*.5-n.G*.5,q+=N.1r(p,h.y||0),b.O(g,q),g+=o.K,q-=o.G*.5,b.O(g,q),g-=o.K,q-=o.G*.5,b.O(g,q)}j?j&&(b.1J(m.H+e.G-j,m.J+j,j,f(0),f(-90),!0),q=m.J):(g=m.H+e.G,q=m.J,b.O(g,q));T(d.W)1t(l){R"3g":g=m.H+e.G-i,g+=o.G*.5-n.G*.5,k&&(g-=k),g-=N.1r(p,h.x||0),b.O(g,q),q-=o.K,g-=o.G*.5,b.O(g,q),q+=o.K,g-=o.G*.5,b.O(g,q);1a;R"3B":R"4r":g=m.H+e.G*.5+o.G*.5,b.O(g,q),q-=o.K,g-=o.G*.5,b.O(g,q),q+=o.K,g-=o.G*.5,b.O(g,q),g=m.H+e.G*.5-o.G,b.O(g,q),b.O(g,q);1a;R"3f":g=m.H+i+o.G,g-=o.G*.5,g+=n.G*.5,k&&(g+=k),g+=N.1r(p,h.x||0),b.O(g,q),q-=o.K,g-=o.G*.5,b.O(g,q),q+=o.K,g-=o.G*.5,b.O(g,q)}b.O(r.x,r.y-i),b.O(r.x,r.y),d.1M&&b.1M()},6q:D(){L b=C.1P().I.1c,b=b.32+b.U*2;a(C.5i).13({H:-1*b+"26"}),a(C.5h).13({H:0})},6r:D(){L b=C.1P().I.1c,b=b.32+b.U*2;a(C.5i).13({H:0}),a(C.5h).13({H:b+"26"})},3O:D(){M r.31(C,C.U)},1Y:D(){L a,b,c,d,e,g,h=C.2K,i=C.1P().I,j=C.11,k=C.U,l=C.1X,h={G:k*2+l*2+h.G,K:k*2+l*2+h.K};C.I.W&&C.3O();L m=r.5d(C,h),l=m.Q,n=m.P,h=m.X.Q,o=m.X.P,p=0,q=0,s=l.G,t=l.K;M i.1c&&(e=j,i.11.P=="X"&&(e+=k),p=e-N.8l(f(45))*e,k="1C",C.1z.30().2M(/^(3g|3h)$/)&&(k="H"),i=i.1c.32+2*i.1c.U,e=i,g=i,q=o.H-i/2+(k=="H"?p:h.G-p),p=o.J-i/2+p,k=="H"?q<0&&(i=N.2l(q),s+=i,n.H+=i,q=0):(i=q+i-s,i>0&&(s+=i)),p<0&&(i=N.2l(p),t+=i,n.J+=i,p=0),C.I.1c.15)&&(a=C.I.1c.15,b=a.2z,i=a.1h,c=e+2*b,d=g+2*b,a=p-b+i.y,b=q-b+i.x,k=="H"?b<0&&(i=N.2l(b),s+=i,n.H+=i,q+=i,b=0):(i=b+c-s,i>0&&(s+=i)),a<0&&(i=N.2l(a),t+=i,n.J+=i,p+=i,a=0)),m=m.1W,m.J+=n.J,m.H+=n.H,k={H:N.1k(n.H+o.H+C.U+C.I.1X),J:N.1k(n.J+o.J+C.U+C.I.1X)},h={1e:{Q:{G:N.1k(s),K:N.1k(t)}},1G:{Q:{G:N.1k(s),K:N.1k(t)}},1i:{Q:l,P:{J:N.1N(n.J),H:N.1N(n.H)}},X:{Q:{G:N.1k(h.G),K:N.1k(h.K)},P:{J:N.1N(o.J),H:N.1N(o.H)}},1W:{J:N.1N(m.J),H:N.1N(m.H)},2A:{P:k}},C.I.1c&&(h.1c={Q:{G:N.1k(e),K:N.1k(g)},P:{J:N.1N(p),H:N.1N(q)}},C.I.1c.15)&&(h.2v={Q:{G:N.1k(c),K:N.1k(d)},P:{J:N.1N(a),H:N.1N(b)}}),h},4l:D(){L b=C.1Y(),c=C.1P();a(c.V).13(d(b.1e.Q)),a(c.4k).13(d(b.1G.Q)),a(C.1i).13(a.Y(d(b.1i.Q),d(b.1i.P))),C.1c&&(a(C.1c).13(d(b.1c.P)),b.2v&&a(C.2v.V).13(d(b.2v.P))),a(c.2T).13(d(b.2A.P))},6u:D(a){C.1Z=a||0,C.15&&(C.15.1Z=C.1Z)},8m:D(a){C.6u(a),C.1s()}}}());L u={2w:[],17:D(b){T(!b)M 1g;L c=1g;M a.19(C.2w,D(a,d){d.S==b&&(c=d)}),c},2I:D(a){C.2w.1T(a)},1f:D(a){T(a=C.17(a))C.2w=m.3t(C.2w,a),a.1f()},3P:D(a){M N.2y/2-N.4c(a,N.4h(a)*N.2y)},3l:{3K:D(a,b){L c=t.17(a.S).3O().U.Q,c=C.4g(c.G,c.K,b,{3j:!1});M{G:c.G,K:c.K}},8n:D(a,b,c){L d=a*.5,g=2g-e(N.8o(d/N.6v(d*d+b*b)))-90,g=f(g);M c*=1/N.4h(g),d=(d+c)*2,{G:d,K:d/a*b}},4g:D(a,b,c){L d=2g-e(N.6d(b/a*.5));M c*=N.4h(f(d-90)),c=a+c*2,{G:c,K:c*b/a}},31:D(b){L c=t.17(b.S),d=b.I.2z,e=q.5a(c.1z);q.2k(c.1z),c=u.3l.3K(b,d),c={2E:{Q:{G:N.1k(c.G),K:N.1k(c.K)},P:{J:0,H:0}}};T(d){c.2c=[];1E(L f=0;f<=d;f++){L g=u.3l.3K(b,f,{3j:!1});c.2c.1T({P:{J:c.2E.Q.K-g.K,H:e?d-f:(c.2E.Q.G-g.G)/2},Q:g})}}1K c.2c=[a.Y({},c.2E)];M c},4o:D(a,b,c){r.4o(a,b.2G(),c)}}};a.Y(h.3a,D(){M{4j:D(){},1f:D(){C.2F()},2F:D(){C.V&&(a(C.V).1f(),C.V=C.1i=C.X=C.W=1g,C.12={})},1s:D(){C.2F(),C.4j();L b=C.1P(),c=C.2G();C.V=1b.1v("1O"),a(C.V).1u({"1U":"8p"}),a(b.V).8q(C.V),c.1Y(),a(C.V).13({J:0,H:0}),C.6w(),C.4l()},1P:D(){M w.17(C.S)[0]},2G:D(){M t.17(C.S)},1Y:D(){L b=C.2G(),c=b.1Y();C.1P();L d=C.I.2z,e=a.Y({},c.X.Q);e.G+=2*d,e.K+=2*d;L f;b.I.W&&(f=u.3l.31(C).2E.Q,f=f.K);L g=r.5d(b,e,f);f=g.Q;L h=g.P,e=g.X.Q,g=g.X.P,i=c.1i.P,j=c.X.P,d={J:i.J+j.J-(g.J+d)+C.I.1h.y,H:i.H+j.H-(g.H+d)+C.I.1h.x},i=c.1W,j=c.1G.Q,k={J:0,H:0};T(d.J<0){L l=N.2l(d.J);k.J+=l,d.J=0,i.J+=l}M d.H<0&&(l=N.2l(d.H),k.H+=l,d.H=0,i.H+=l),l={K:N.1r(f.K+d.J,j.K+k.J),G:N.1r(f.G+d.H,j.G+k.H)},b={H:N.1k(k.H+c.1i.P.H+c.X.P.H+b.U+b.1X),J:N.1k(k.J+c.1i.P.J+c.X.P.J+b.U+b.1X)},{1e:{Q:l},1G:{Q:j,P:k},V:{Q:f,P:d},1i:{Q:f,P:{J:N.1N(h.J),H:N.1N(h.H)}},X:{Q:{G:N.1k(e.G),K:N.1k(e.K)},P:{J:N.1N(g.J),H:N.1N(g.H)}},1W:i,2A:{P:b}}},5q:D(){M C.I.1n/(C.I.2z+1)},6w:D(){L b=C.2G(),c=b.1Y(),e=C.1P(),f=C.1Y(),g=C.I.2z,h=u.3l.31(C),i=b.1z,j=q.5b(i),k=g,l=g;T(e.I.W){L m=h.2c[h.2c.1x-1];j=="H"&&(l+=N.1k(m.Q.K)),j=="J"&&(k+=N.1k(m.Q.K))}L n=b.12.I,m=n.11,n=n.U;e.I.11.P=="X"&&m&&(m+=n),a(C.V).1H(a(C.1i=1b.1v("1O")).1u({"1U":"8r"}).13(d(f.1i.Q)).1H(a(C.2S=1b.1v("2C")).1u(f.1i.Q))).13(d(f.1i.Q)),p.2O(C.2S),e=C.2S.2X("2d"),e.2h=C.1Z;1E(L f=g+1,o=0;o<=g;o++)e.2i=s.2j(C.I.1q,u.3P(o*(1/f))*(C.I.1n/f)),p.65(e,{G:c.X.Q.G+o*2,K:c.X.Q.K+o*2,J:k-o,H:l-o,11:m+o});T(b.I.W){L o=h.2c[0].Q,r=b.I.W,g=n;g+=r.G*.5;L t=b.I.11&&b.I.11.P=="X"?b.I.11.2b||0:0;t&&(g+=t),n=n+t+.5*r.G-.5*o.G,m=N.1k(m>n?m-n:0),g+=N.1r(m,b.I.W.1h&&b.I.W.1h[j&&/^(H|1C)$/.4q(j)?"y":"x"]||0);T(j=="J"||j=="1B"){1t(i){R"3f":R"3G":l+=g;1a;R"3B":R"4r":R"3F":R"4t":l+=c.X.Q.G*.5;1a;R"3g":R"3E":l+=c.X.Q.G-g}j=="1B"&&(k+=c.X.Q.K),o=0;1E(b=h.2c.1x;o<b;o++)e.2i=s.2j(C.I.1q,u.3P(o*(1/f))*(C.I.1n/f)),g=h.2c[o],e.1L(),j=="J"?(e.2P(l,k-o),e.O(l-g.Q.G*.5,k-o),e.O(l,k-o-g.Q.K),e.O(l+g.Q.G*.5,k-o)):(e.2P(l,k+o),e.O(l-g.Q.G*.5,k+o),e.O(l,k+o+g.Q.K),e.O(l+g.Q.G*.5,k+o)),e.1M(),e.2s()}1K{1t(i){R"3i":R"3h":k+=g;1a;R"3I":R"4u":R"3C":R"4s":k+=c.X.Q.K*.5;1a;R"3H":R"3D":k+=c.X.Q.K-g}j=="1C"&&(l+=c.X.Q.G),o=0;1E(b=h.2c.1x;o<b;o++)e.2i=s.2j(C.I.1q,u.3P(o*(1/f))*(C.I.1n/f)),g=h.2c[o],e.1L(),j=="H"?(e.2P(l-o,k),e.O(l-o,k-g.Q.G*.5),e.O(l-o-g.Q.K,k),e.O(l-o,k+g.Q.G*.5)):(e.2P(l+o,k),e.O(l+o,k-g.Q.G*.5),e.O(l+o+g.Q.K,k),e.O(l+o,k+g.Q.G*.5)),e.1M(),e.2s()}}},8s:D(){L b=C.2G(),c=u.3l.31(C),e=c.2E.Q;q.5a(b.1z);L f=q.2k(b.1z),g=N.1r(e.G,e.K),b=g/2;g/=2,f={G:e[f=="21"?"K":"G"],K:e[f=="21"?"G":"K"]},a(C.1i).1H(a(C.W=1b.1v("1O")).1u({"1U":"8t"}).13(d(f)).1H(a(C.5r=1b.1v("2C")).1u(f))),p.2O(C.5r),f=C.5r.2X("2d"),f.2h=C.1Z,f.2i=s.2j(C.I.1q,C.5q());1E(L h=0,i=c.2c.1x;h<i;h++){L j=c.2c[h];f.1L(),f.2P(e.G/2-b,j.P.J-g),f.O(j.P.H-b,e.K-h-g),f.O(j.P.H+j.Q.G-b,e.K-h-g),f.1M(),f.2s()}},4l:D(){L b=C.1Y(),c=C.2G(),e=C.1P();a(e.V).13(d(b.1e.Q)),a(e.4k).13(a.Y(d(b.1G.P),d(b.1G.Q)));T(e.I.1c){L f=c.1Y(),g=b.1G.P,h=f.1c.P;a(c.1c).13(d({J:g.J+h.J,H:g.H+h.H})),e.I.1c.15&&(f=f.2v.P,a(c.2v.V).13(d({J:g.J+f.J,H:g.H+f.H})))}a(C.V).13(a.Y(d(b.V.Q),d(b.V.P))),a(C.1i).13(d(b.1i.Q)),a(e.2T).13(d(b.2A.P))}}}());L v={2w:[],17:D(b){T(!b)M 1g;L c=1g;M a.19(C.2w,D(a,d){d.S==b&&(c=d)}),c},2I:D(a){C.2w.1T(a)},1f:D(a){T(a=C.17(a))C.2w=m.3t(C.2w,a),a.1f()}};a.Y(i.3a,D(){M{1s:D(){C.2F(),C.1P();L b=C.2G(),c=b.1Y().1c.Q,d=a.Y({},c),e=C.I.2z;d.G+=e*2,d.K+=e*2,a(b.1c).5s(a(C.V=1b.1v("1O")).1u({"1U":"8u"}).1H(a(C.5t=1b.1v("2C")).1u(d))),p.2O(C.5t),b=C.5t.2X("2d"),b.2h=C.1Z;1E(L g=d.G/2,d=d.K/2,c=c.K/2,h=e+1,i=0;i<=e;i++)b.2i=s.2j(C.I.1q,u.3P(i*(1/h))*(C.I.1n/h)),b.1L(),b.1J(g,d,c+i,f(0),f(6h),!0),b.1M(),b.2s()},1f:D(){C.2F()},2F:D(){C.V&&(a(C.V).1f(),C.V=1g)},1P:D(){M w.17(C.S)[0]},2G:D(){M t.17(C.S)},5q:D(){M C.I.1n/(C.I.2z+1)}}}());L w={22:[],I:{3m:"5u",3X:8v},64:D(){M D(){L b=["2e"];1A.2N.54&&(b.1T("8w"),a(1b.4v).3k("2e",D(){})),a.19(b,D(b,c){a(1b.6x).3k(c,D(b){L c=m.4V(b,".3n .6o, .3n .8x");c&&(b.8y(),b.8z(),w.6y(a(c).4W(".3n")[0]).1l())})})}}(),17:D(b){L c=[];M m.27(b)?a.19(C.22,D(a,d){d.S==b&&c.1T(d)}):a.19(C.22,D(d,e){e.S&&a(e.S).6z(b)&&c.1T(e)}),c},6y:D(b){T(!b)M 1g;L c=1g;M a.19(C.22,D(a,d){d.1m("1s")&&d.V===b&&(c=d)}),c},8A:D(b){L c=[];M a.19(C.22,D(d,e){e.S&&a(e.S).6z(b)&&c.1T(e)}),c},1w:D(b){m.27(b)?(b=C.17(b)[0])&&b.1w():a(b).19(a.1d(D(a,b){L c=C.17(b)[0];c&&c.1w()},C))},1l:D(b){m.27(b)?(b=C.17(b)[0])&&b.1l():a(b).19(a.1d(D(a,b){L c=C.17(b)[0];c&&c.1l()},C))},2D:D(b){m.27(b)?(b=C.17(b)[0])&&b.2D():a(b).19(a.1d(D(a,b){L c=C.17(b)[0];c&&c.2D()},C))},4e:D(){a.19(C.3x(),D(a,b){b.1l()})},2r:D(b){m.27(b)?(b=C.17(b)[0])&&b.2r():a(b).19(a.1d(D(a,b){L c=C.17(b)[0];c&&c.2r()},C))},3x:D(){L b=[];M a.19(C.22,D(a,c){c.1o()&&b.1T(c)}),b},58:D(a){M m.27(a)?m.42(C.3x()||[],D(b){M b.S==a}):!1},1o:D(){M m.4S(C.22,D(a){M a.1o()})},6A:D(){L b=0,c;M a.19(C.22,D(a,d){d.1S>b&&(b=d.1S,c=d)}),c},6B:D(){C.3x().1x<=1&&a.19(C.22,D(b,c){c.1m("1s")&&!c.I.1S&&a(c.V).13({1S:c.1S=+w.I.3X})})},2I:D(a){C.22.1T(a)},5v:D(a){T(a=C.17(a)[0])a.1l(),a.1f(),C.22=m.3t(C.22,a)},1f:D(b){m.27(b)?C.5v(b):a(b).19(a.1d(D(a,b){C.5v(b)},C)),C.6C()},6C:D(){M D(){a.19(C.22,a.1d(D(a,b){L c;T(c=b.S){1E(c=b.S;c&&c.48;)c=c.48;c=!c||!c.4v}c&&C.1f(b.S)},C))}}(),56:D(a){C.I.3m=a||"5u"},57:D(a){C.I.3X=a||0},5J:D(){D b(b){M a.14(b)=="1V"?{S:f.1I&&f.1I.S||e.1I.S,24:b}:j(a.Y({},e.1I),b)}D c(b){M e=1A.2m.6D,f=j(a.Y({},e),1A.2m.5w),g=1A.2m.5x.6D,h=j(a.Y({},g),1A.2m.5x.5w),c=d,d(b)}D d(c){c.1G=c.1G||(1A.2m[w.I.3m]?w.I.3m:"5u");L d=c.1G?a.Y({},1A.2m[c.1G]||1A.2m[w.I.3m]):{},d=j(a.Y({},f),d),d=j(a.Y({},d),c);d.1D&&(a.14(d.1D)=="3Q"&&(d.1D={3R:f.1D&&f.1D.3R||e.1D.3R,14:f.1D&&f.1D.14||e.1D.14}),d.1D=j(a.Y({},e.1D),d.1D)),d.X&&a.14(d.X)=="1V"&&(d.X={1q:d.X,1n:1});T(d.U){L i;i=a.14(d.U)=="2a"?{2b:d.U,1q:f.U&&f.U.1q||e.U.1q,1n:f.U&&f.U.1n||e.U.1n}:j(a.Y({},e.U),d.U),d.U=i.2b===0?!1:i}d.11&&(i=a.14(d.11)=="2a"?{2b:d.11,P:f.11&&f.11.P||e.11.P}:j(a.Y({},e.11),d.11),d.11=i.2b===0?!1:i),i=i=d.Z&&d.Z.1j||a.14(d.Z)=="1V"&&d.Z||f.Z&&f.Z.1j||a.14(f.Z)=="1V"&&f.Z||e.Z&&e.Z.1j||e.Z;L k=d.Z&&d.Z.1e||f.Z&&f.Z.1e||e.Z&&e.Z.1e||w.29.6E(i);d.Z?a.14(d.Z)=="1V"?i={1j:d.Z,1e:w.29.6F(d.Z)}:(i={1e:k,1j:i},d.Z.1e&&(i.1e=d.Z.1e),d.Z.1j&&(i.1j=d.Z.1j)):i={1e:k,1j:i},d.Z=i,d.1j=="2o"?(k=a.Y({},e.1h.2o),a.Y(k,1A.2m.5w.1h||{}),c.1G&&a.Y(k,(1A.2m[c.1G]||1A.2m[w.I.3m]).1h||{}),k=w.29.6G(e.1h.2o,e.Z,i.1j),c.1h&&(k=a.Y(k,c.1h||{})),d.3o=0):k={x:d.1h.x,y:d.1h.y},d.1h=k;T(d.1c&&d.6H){L c=a.Y({},1A.2m.5x[d.6H]),l=j(a.Y({},h),c);l.20&&a.19(["5n","5o"],D(b,c){L d=l.20[c],e=h.20&&h.20[c];T(d.X){L f=e&&e.X;a.14(d.X)=="2a"?d.X={1q:f&&f.1q||g.20[c].X.1q,1n:d.X}:a.14(d.X)=="1V"?(f=f&&a.14(f.1n)=="2a"&&f.1n||g.20[c].X.1n,d.X={1q:d.X,1n:f}):d.X=j(a.Y({},g.20[c].X),d.X)}d.U&&(e=e&&e.U,d.U=a.14(d.U)=="2a"?{1q:e&&e.1q||g.20[c].U.1q,1n:d.U}:j(a.Y({},g.20[c].U),d.U))}),l.15&&(c=h.15&&h.15.37&&h.15.37==4K?h.15:g.15,l.15.37&&l.15.37==4K&&(c=j(c,l.15)),l.15=c),d.1c=l}d.15&&(c=a.14(d.15)=="3Q"?f.15&&a.14(f.15)=="3Q"?e.15:f.15?f.15:e.15:j(a.Y({},e.15),d.15||{}),a.14(c.1h)=="2a"&&(c.1h={x:c.1h,y:c.1h}),d.15=c),d.W&&(c={},c=a.14(d.W)=="3Q"?j({},e.W):j(j({},e.W),a.Y({},d.W)),a.14(c.1h)=="2a"&&(c.1h={x:c.1h,y:c.1h}),d.W=c),d.25&&(a.14(d.25)=="1V"?d.25={4w:d.25,6I:!0}:a.14(d.25)=="3Q"&&(d.25=d.25?{4w:"6J",6I:!0}:!1)),d.1I&&d.1I=="2e-8B"&&(d.6K=!0,d.1I=!1);T(d.1I)T(a.67(d.1I)){L m=[];a.19(d.1I,D(a,c){m.1T(b(c))}),d.1I=m}1K d.1I=[b(d.1I)];M d.2n&&a.14(d.2n)=="1V"&&(d.2n=[""+d.2n]),d.1X=0,d.1p&&(1F.2W?o.53("2W"):d.1p=!1),d}L e,f,g,h;M c}()};w.29=D(){D b(b,c){L d=q.2p(b),e=d[1],d=d[2],f=q.2k(b),g=a.Y({1y:!0,21:!0},c||{});M f=="1y"?(g.21&&(e=k[e]),g.1y&&(d=k[d])):(g.21&&(d=k[d]),g.1y&&(e=k[e])),e+d}D c(b,c){T(b.I.25){L d=c,e=j(b),f=e.Q,e=e.P,g=t.17(b.S).12.Z[d.Z.1e].1e.Q,h=d.P;e.H>h.H&&(d.P.H=e.H),e.J>h.J&&(d.P.J=e.J),e.H+f.G<h.H+g.G&&(d.P.H=e.H+f.G-g.G),e.J+f.K<h.J+g.K&&(d.P.J=e.J+f.K-g.K),c=d}b.3M(c.Z.1e),d=c.P,a(b.V).13({J:d.J+"26",H:d.H+"26"})}D d(a){M a&&(/^2o|2e|54$/.4q(6L a.14=="1V"&&a.14||"")||a.5R>=0)}D e(a,b,c,d){L e=a>=c&&a<=d,f=b>=c&&b<=d;M e&&f?b-a:e&&!f?d-a:!e&&f?b-c:(e=c>=a&&c<=b,f=d>=a&&d<=b,e&&f?d-c:e&&!f?b-c:!e&&f?d-a:0)}D f(a,b){L c=a.Q.G*a.Q.K;M c?e(a.P.H,a.P.H+a.Q.G,b.P.H,b.P.H+b.Q.G)*e(a.P.J,a.P.J+a.Q.K,b.P.J,b.P.J+b.Q.K)/c:0}D g(a,b){L c=q.2p(b),d={H:0,J:0};T(q.2k(b)=="1y"){1t(c[2]){R"2t":R"2u":d.H=.5*a.G;1a;R"1C":d.H=a.G}c[1]=="1B"&&(d.J=a.K)}1K{1t(c[2]){R"2t":R"2u":d.J=.5*a.K;1a;R"1B":d.J=a.K}c[1]=="1C"&&(d.H=a.G)}M d}D h(b){L c=m.S.49(b),b=m.S.44(b),d=a(1F).46(),e=a(1F).47();M c.H+=-1*(b.H-e),c.J+=-1*(b.J-d),c}D i(c,e,i,k){L n,o,p=t.17(c.S),r=p.I.1h,s=d(i);s||!i?(o={G:1,K:1},s?(n=m.43(i),n={J:n.y,H:n.x}):(n=c.12.24,n={J:n?n.y:0,H:n?n.x:0}),c.12.24={x:n.H,y:n.J}):(n=h(i),o={G:a(i).6M(),K:a(i).6N()});T(p.I.W&&p.I.1j!="2o"){L i=q.2p(k),v=q.2p(e),w=q.2k(k),z=p.12.I,B=p.3O().U.Q,E=z.11,z=z.U,F=E&&p.I.11.P=="X"?E:0,E=E&&p.I.11.P=="U"?E:E+z,B=z+F+.5*p.I.W.G-.5*B.G,B=N.1k(z+F+.5*p.I.W.G+(E>B?E-B:0)+p.I.W.1h[w=="1y"?"x":"y"]);T(w=="1y"&&i[2]=="H"&&v[2]=="H"||i[2]=="1C"&&v[2]=="1C")o.G-=B*2,n.H+=B;1K T(w=="21"&&i[2]=="J"&&v[2]=="J"||i[2]=="1B"&&v[2]=="1B")o.K-=B*2,n.J+=B}i=a.Y({},n),p=s?b(p.I.Z.1e):p.I.Z.1j,g(o,p),s=g(o,k),n={H:n.H+s.H,J:n.J+s.J},r=a.Y({},r),r=l(r,p,k),n.J+=r.y,n.H+=r.x,p=t.17(c.S),r=p.12.Z,s=a.Y({},r[e]),n={J:n.J-s.1W.J,H:n.H-s.1W.H},s.1e.P=n,s={1y:!0,21:!0};T(c.I.25){T(v=j(c),c=(c.I.15?u.17(c.S):p).1Y().1e.Q,s.2x=f({Q:c,P:n},v),s.2x<1){T(n.H<v.P.H||n.H+c.G>v.P.H+v.Q.G)s.1y=!1;T(n.J<v.P.J||n.J+c.K>v.P.J+v.Q.K)s.21=!1}}1K s.2x=1;M c=r[e].1i,o=f({Q:o,P:i},{Q:c.Q,P:{J:n.J+c.P.J,H:n.H+c.P.H}}),{P:n,2x:{1j:o},3S:s,Z:{1e:e,1j:k}}}D j(b){L c={J:a(1F).46(),H:a(1F).47()},d=b.I.1j;T(d=="2o"||d=="40")d=b.S;d=a(d).4W(b.I.25.4w).6m()[0];T(!d||b.I.25.4w=="6J")M{Q:{G:a(1F).G(),K:a(1F).K()},P:c};L b=m.S.49(d),e=m.S.44(d);M b.H+=-1*(e.H-c.H),b.J+=-1*(e.J-c.J),{Q:{G:a(d).6O(),K:a(d).6P()},P:b}}L k={H:"1C",1C:"H",J:"1B",1B:"J",2t:"2t",2u:"2u"},l=D(){L a=[[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]],b={3i:0,3f:0,3B:1,4r:1,3g:2,3h:2,3C:5,4s:5,3D:8,3E:8,3F:7,4t:7,3G:6,3H:6,3I:3,4u:3};M D(c,d,e){L f=a[b[d]],g=a[b[e]],f=[N.5g(N.2l(f[0]-g[0])*.5)?-1:1,N.5g(N.2l(f[1]-g[1])*.5)?-1:1];M!q.2Q(d)&&q.2Q(e)&&(q.2k(e)=="1y"?f[0]=0:f[1]=0),{x:f[0]*c.x,y:f[1]*c.y}}}();M{17:i,6Q:D(a,d,e,g){L h=i(a,d,e,g);/8C$/.4q(e&&6L e.14=="1V"?e.14:"");T(h.3S.2x===1)c(a,h);1K{L j=d,k=g,k={1y:!h.3S.1y,21:!h.3S.21};T(!q.2Q(d))M j=b(d,k),k=b(g,k),h=i(a,j,e,k),c(a,h),h;T(q.2k(d)=="1y"&&k.21||q.2k(d)=="21"&&k.1y)M j=b(d,k),k=b(g,k),h=i(a,j,e,k),c(a,h),h;d=[],g=q.3A,j=0;1E(k=g.1x;j<k;j++)1E(L l=g[j],m=0,n=q.3A.1x;m<n;m++)d.1T(i(a,q.3A[m],e,l));1E(L e=h,o=t.17(a.S).12.Z,j=o[e.Z.1e],g=0,p=e.P.H+j.1W.H,r=e.P.J+j.1W.J,n=0,s=1,u={Q:j.1e.Q,P:e.P},v=0,j=1,k=0,l=d.1x;k<l;k++){m=d[k],m.2H={},m.2H.25=m.3S.2x;L w=o[m.Z.1e].1W,w=N.6v(N.4c(N.2l(m.P.H+w.H-p),2)+N.4c(N.2l(m.P.J+w.J-r),2)),g=N.1r(g,w);m.2H.6R=w,w=m.2x.1j,s=N.5f(s,w),n=N.1r(n,w),m.2H.6S=w,w=f(u,{Q:o[m.Z.1e].1e.Q,P:m.P}),j=N.5f(j,w),v=N.1r(v,w),m.2H.6T=w}1E(L o=0,y,n=N.1r(e.2x.1j-s,n-e.2x.1j),s=v-j,k=0,l=d.1x;k<l;k++)m=d[k],v=m.2H.25*51,v+=(1-m.2H.6R/g)*18||18,p=N.2l(e.2x.1j-m.2H.6S)||0,v+=(1-(p/n||1))*8,v+=((m.2H.6T-j)/s||0)*23,o=N.1r(o,v),v==o&&(y=k);c(a,d[y])}M h},6E:b,6F:D(a){M a=q.2p(a),b(a[1]+k[a[2]])},6U:h,6G:l,5y:d}}(),w.29.4f={x:0,y:0},a(1b).63(D(){a(1b).3k("4x",D(a){w.29.4f=m.43(a)})}),w.4m=D(){D b(b){M{G:a(b).6O(),K:a(b).6P()}}D c(c){L d=b(c),e=c.48;M e&&a(e).13({G:d.G+"26"})&&b(c).K>d.K&&d.G++,a(e).13({G:"5e%"}),d}M{1s:D(){a(1b.4v).1H(a(1b.1v("1O")).1u({"1U":"8D"}).1H(a(1b.1v("1O")).1u({"1U":"3n"}).1H(a(C.V=1b.1v("1O")).1u({"1U":"6V"}))))},3p:D(b,c,d,e){C.V||C.1s(),e=a.Y({1p:!1},e||{}),b.I.8E&&a.14(c)=="1V"&&(c=a("#"+c)[0],!b.3q&&c)&&(a(c).2J("6W",a(c).13("6X")),b.3q=1b.1v("1O"),a(c).5s(a(b.3q).1l()));L f=1b.1v("1O");a(C.V).1H(a(f).1u({"1U":"6l 8F"}).1H(c)),m.27(c)&&a(c).1w(),b.I.1G&&a(f).3r("8G"+b.I.1G);L g=a(f).5j("6Y[4y]").8H(D(){M!a(C).1u("K")||!a(C).1u("G")});T(g.1x>0&&!b.1m("39")){b.1Q("39",!0),b.I.1p&&(!e.1p&&!b.1p&&(b.1p=b.5z(b.I.1p)),b.1m("1o")&&(b.P(),a(b.V).1w()),b.1p.5A());L h=0,c=N.1r(8I,(g.1x||0)*8J);b.1R("39"),b.3s("39",a.1d(D(){g.19(D(){C.5B=D(){}}),h>=g.1x||(C.4z(b,f),d&&d())},C),c),a.19(g,a.1d(D(c,e){L i=2Y 8K;i.5B=a.1d(D(){i.5B=D(){},a(e).1u({G:i.G,K:i.K}),h++,h==g.1x&&(b.1R("39"),b.1p&&(b.1p.1f(),b.1p=1g),b.1m("1o")&&a(b.V).1l(),C.4z(b,f),d&&d())},C),i.4y=e.4y},C))}1K C.4z(b,f),d&&d()},4z:D(b,d){L e=c(d),f=e.G-(2q(a(d).13("1X-H"))||0)-(2q(a(d).13("1X-1C"))||0);2q(a(d).13("1X-J")),2q(a(d).13("1X-1B")),b.I.2R&&a.14(b.I.2R)=="2a"&&f>b.I.2R&&(a(d).13({G:b.I.2R+"26"}),e=c(d)),b.12.2K=e,a(b.2T).6Z(d)},5l:c}}(),a.Y(k.3a,D(){M{1s:D(){C.1m("1s")||(a(1b.4v).1H(a(C.V).13({H:"-4A",J:"-4A",1S:C.1S}).1H(a(C.4k=1b.1v("1O")).1u({"1U":"8L"})).1H(a(C.2T=1b.1v("1O")).1u({"1U":"6V"}))),a(C.V).3r("8M"+C.I.1G),C.I.6K&&(a(C.S).3r("70"),C.2f(1b.6x,"2e",a.1d(D(a){C.1o()&&(a=m.4V(a,".3n, .70"),(!a||a&&a!=C.V&&a!=C.S)&&C.1l())},C))),1A.2N.3v&&(C.I.3T||C.I.3o)&&(C.4B(C.I.3T),a(C.V).3r("5C")),C.71(),C.1Q("1s",!0))},5L:D(){a(C.V=1b.1v("1O")).1u({"1U":"3n"})},72:D(){C.1s();L a=t.17(C.S);a?a.1s():(2Y g(C.S),C.1Q("3Z",!0))},5M:D(){C.2f(C.S,"3N",C.4C),C.2f(C.S,"4n",a.1d(D(a){C.5D(a)},C)),C.I.2n&&a.19(C.I.2n,a.1d(D(b,c){L d=!1;c=="2e"&&(d=C.I.1I&&m.42(C.I.1I,D(a){M a.S=="40"&&a.24=="2e"}),C.1Q("4O",d)),C.2f(C.S,c,c=="2e"?d?C.2D:C.1w:a.1d(D(){C.73()},C))},C)),C.I.1I?a.19(C.I.1I,a.1d(D(b,c){L d;1t(c.S){R"40":T(C.1m("4O")&&c.24=="2e")M;d=C.S;1a;R"1j":d=C.1j}d&&C.2f(d,c.24,c.24=="2e"?C.1l:a.1d(D(){C.5E()},C))},C)):C.I.74&&C.I.2n&&!a.5F(C.I.2n,"2e")>-1&&C.2f(C.S,"4n",a.1d(D(){C.1R("1w")},C));L b=!1;!C.I.8N&&C.I.2n&&((b=a.5F("4x",C.I.2n)>-1)||a.5F("75",C.I.2n)>-1)&&C.1j=="2o"&&C.2f(C.S,b?"4x":"75",D(a){C.1m("3Z")&&C.P(a)})},71:D(){C.2f(C.V,"3N",C.4C),C.2f(C.V,"4n",C.5D),C.2f(C.V,"3N",a.1d(D(){C.4D("3U")||C.1w()},C)),C.I.1I&&a.19(C.I.1I,a.1d(D(b,c){L d;1t(c.S){R"1e":d=C.V}d&&C.2f(d,c.24,c.24.2M(/^(2e|4x|3N)$/)?C.1l:a.1d(D(){C.5E()},C))},C))},1w:D(b){C.1R("1l"),C.1R("3U"),C.1o()||(C.I.8O&&w.4e(),C.1Q("1o",!0),C.I.1D?C.76(b):C.1m("38")||C.3p(C.2A),C.1m("3Z")&&C.P(b),C.4E(),C.I.4F&&m.4U(a.1d(D(){C.4C()},C)),a.14(C.I.4G)=="D"&&(!C.I.1D||C.I.1D&&C.I.1D.3R&&C.1m("38"))&&C.I.4G(C.2T.4H,C.S),1A.2N.3v&&(C.I.3T||C.I.3o)&&(C.4B(C.I.3T),a(C.V).3r("77").78("5C")),a(C.V).1w())},1l:D(){C.1R("1w"),C.1m("1o")&&(C.1Q("1o",!1),1A.2N.3v&&(C.I.3T||C.I.3o)?(C.4B(C.I.3o),a(C.V).78("77").3r("5C"),C.3s("3U",a.1d(C.5G,C),C.I.3o)):C.5G(),C.12.28)&&(C.12.28.79(),C.12.28=1g,C.1Q("28",!1))},5G:D(){C.1m("1s")&&(a(C.V).13({H:"-4A",J:"-4A"}),w.6B(),C.7a(),a.14(C.I.7b)=="D"&&!C.1p)&&C.I.7b(C.2T.4H,C.S)},2D:D(a){C[C.1o()?"1l":"1w"](a)},1o:D(){M C.1m("1o")},73:D(b){C.1R("1l"),C.1R("3U"),!C.1m("1o")&&!C.4D("1w")&&C.3s("1w",a.1d(D(a){C.1R("1w"),C.1w(a)},C,b),C.I.74||1)},5E:D(){C.1R("1w"),!C.4D("1l")&&C.1m("1o")&&C.3s("1l",a.1d(D(){C.1R("1l"),C.1R("3U"),C.1l()},C),C.I.8P||1)},4B:D(a){T(1A.2N.3v){L a=a||0,b=C.V.8Q;b.8R=a+"4I",b.8S=a+"4I",b.8T=a+"4I",b.8U=a+"4I"}},1Q:D(a,b){C.12.20[a]=b},1m:D(a){M C.12.20[a]},4C:D(){C.1Q("3Y",!0),C.1m("1o")&&C.4E(),C.I.4F&&C.1R("5H")},5D:D(){C.1Q("3Y",!1),C.I.4F&&C.3s("5H",a.1d(D(){C.1R("5H"),C.1m("3Y")||C.1l()},C),C.I.4F)},4D:D(a){M C.12.2L[a]},3s:D(a,b,c){C.12.2L[a]=m.4T(b,c)},1R:D(a){C.12.2L[a]&&(1F.7c(C.12.2L[a]),8V C.12.2L[a])},7d:D(){a.19(C.12.2L,D(a,b){1F.7c(b)}),C.12.2L=[]},2f:D(b,c,d,e){d=a.1d(d,e||C),C.12.4N.1T({S:b,7e:c,7f:d}),a(b).3k(c,d)},7g:D(){a.19(C.12.4N,D(b,c){a(c.S).7h(c.7e,c.7f)})},3M:D(a){L b=t.17(C.S);b&&b.3M(a)},7a:D(){C.3M(C.I.Z.1e)},2r:D(){L a=t.17(C.S);a&&(a.2r(),C.1o()&&C.P())},3p:D(b,c){L d=a.Y({3V:C.I.3V,1p:!1},c||{});C.1s(),C.1m("1o")&&a(C.V).1l(),w.4m.3p(C,b,a.1d(D(){L b=C.1m("1o");b||C.1Q("1o",!0),C.72(),b||C.1Q("1o",!1),C.1m("1o")&&(a(C.V).1l(),C.P(),C.4E(),a(C.V).1w()),C.1Q("38",!0),d.3V&&d.3V(C.2T.4H,C.S),d.4J&&d.4J()},C),{1p:d.1p})},76:D(b){C.1m("28")||C.I.1D.3R&&C.1m("38")||(C.1Q("28",!0),C.I.1p&&(C.1p?C.1p.5A():(C.1p=C.5z(C.I.1p),C.1Q("38",!1)),C.P(b)),C.12.28&&(C.12.28.79(),C.12.28=1g),C.12.28=a.1D({8W:C.2A,14:C.I.1D.14,2J:C.I.1D.2J||{},7i:C.I.1D.7i||"6Z",8X:a.1d(D(b){b.8Y!==0&&C.3p(b.8Z,{1p:C.I.1p&&C.1p,4J:a.1d(D(){C.1Q("28",!1),C.1m("1o")&&C.I.4G&&C.I.4G(C.2T.4H,C.S),C.1p&&(C.1p.1f(),C.1p=1g)},C)})},C)}))},5z:D(b){L c=1b.1v("1O"),e=2W.4d(c,a.Y({},b||{})),b=2W.5c(c);M a(c).13(d(b)),C.3p(c,{3V:!1,4J:D(){e.5A()}}),e},P:D(b){T(C.1o()){L c;T(C.I.1j=="2o"){c=w.29.5y(b);L d=w.29.4f;c?d.x||d.y?(C.12.24={x:d.x,y:d.y},c=1g):c=b:(d.x||d.y?C.12.24={x:d.x,y:d.y}:C.12.24||(c=w.29.6U(C.S),C.12.24={x:c.H,y:c.J}),c=1g)}1K c=C.1j;w.29.6Q(C,C.I.Z.1e,c,C.I.Z.1j);T(b&&w.29.5y(b)){L d=a(C.V).6M(),e=a(C.V).6N(),b=m.43(b);c=m.S.49(C.V),b.x>=c.H&&b.x<=c.H+d&&b.y>=c.J&&b.y<=c.J+e&&m.4U(a.1d(D(){C.1R("1l")},C))}}},4E:D(){T(C.1m("1s")&&!C.I.1S){L b=w.6A();b&&b!=C&&C.1S<=b.1S&&a(C.V).13({1S:C.1S=b.1S+1})}},1f:D(){C.7g(),C.7d();L b,c;C.3q&&a.14(C.2A)=="1V"&&(b=a("#"+C.2A)[0])&&((c=a(b).2J("6W"))&&a(b).13({6X:c}),a(C.3q).5s(b).1f(),C.3q=1g),a(C.V).5j("6Y[4y]").7h("91"),t.1f(C.S),C.1m("1s")&&C.V&&(a(C.V).1f(),C.V=1g);T(b=a(C.S).2J("4M"))a(C.S).1u("4L",b),a(C.S).2J("4M",1g)}}}()),1A.2O()})(3u)',62,560,'||||||||||||||||||||||||||||||||||||||this|function|||width|left|options|top|height|var|return|Math|lineTo|position|dimensions|case|element|if|border|container|stem|background|extend|hook||radius|_cache|css|type|shadow||get||each|break|document|closeButton|proxy|tooltip|remove|null|offset|bubble|target|ceil|hide|getState|opacity|visible|spinner|color|max|build|switch|attr|createElement|show|length|horizontal|_hookPosition|Tipped|bottom|right|ajax|for|window|skin|append|hideOn|arc|else|beginPath|closePath|round|div|getTooltip|setState|clearTimer|zIndex|push|class|string|anchor|padding|getOrderLayout|_globalAlpha|states|vertical|tooltips||event|containment|px|isElement|xhr|Position|number|size|blurs||click|setEvent|180|globalAlpha|fillStyle|hex2fill|getOrientation|abs|Skins|showOn|mouse|split|parseInt|refresh|fill|middle|center|closeButtonShadow|shadows|overlap|PI|blur|content|scripts|canvas|toggle|box|cleanup|getSkin|score|add|data|contentDimensions|timers|match|support|init|moveTo|isCenter|maxWidth|bubbleCanvas|contentElement|call|indexOf|Spinners|getContext|new|charAt|toLowerCase|getLayout|diameter|layout|stemLayout|hookPosition|cornerOffset|constructor|updated|preloading_images|prototype|x1|y1|x2|y2|topleft|topright|righttop|lefttop|math|bind|Stem|defaultSkin|t_Tooltip|fadeOut|update|inlineMarker|addClass|setTimer|without|jQuery|cssTransitions|G_vmlCanvasManager|getVisible|items|createFillStyle|positions|topmiddle|rightmiddle|rightbottom|bottomright|bottommiddle|bottomleft|leftbottom|leftmiddle|regex|getBorderDimensions|skins|setHookPosition|mouseenter|getStemLayout|transition|boolean|cache|contained|fadeIn|fadeTransition|afterUpdate|000|startingZIndex|active|skinned|self|arguments|any|pointer|cumulativeScrollOffset||scrollTop|scrollLeft|parentNode|cumulativeOffset|required|available|pow|create|hideAll|mouseBuffer|getCenterBorderDimensions|cos|substring|prepare|skinElement|order|UpdateQueue|mouseleave|rotate|borderRadius|test|topcenter|rightcenter|bottomcenter|leftcenter|body|selector|mousemove|src|_updateTooltip|10000px|setFadeDuration|setActive|getTimer|raise|hideAfter|onShow|firstChild|ms|callback|Object|title|tipped_restore_title|events|toggles|apply|try|catch|select|delay|defer|findElement|closest|IE|Opera|opera|||Chrome|check|touch||setDefaultSkin|setStartingZIndex|isVisibleByElement|undefined|isCorner|getSide|getDimensions|getBubbleLayout|100|min|floor|hoverCloseButton|defaultCloseButton|find|auto|getMeasureElementDimensions|drawCloseButtonState|default|hover|_drawBackgroundPath|getBlurOpacity|stemCanvas|before|closeButtonCanvas|black|_remove|reset|CloseButtons|isPointerEvent|insertSpinner|play|onload|t_hidden|setIdle|hideDelayed|inArray|_hide|idle|in|createOptions|getAttribute|_preBuild|createPreBuildObservers|Array|concat|_each|member|pageX|RegExp|parseFloat|version|AppleWebKit|Gecko|Za|checked|notified|alert|requires|createEvent|ready|startDelegating|drawRoundedRectangle|fillRect|isArray|Gradient|addColorStops|toOrientation|side|toDimension|atan|red|green|blue|360|createHookCache|drawBubble|drawCloseButton|t_ContentContainer|first|25000px|t_Close|closeButtonShift|closeButtonMouseover|closeButtonMouseout|_drawBorderPath|backgroundRadius|setGlobalAlpha|sqrt|drawBackground|documentElement|getByTooltipElement|is|getHighestTooltip|resetZ|removeDetached|base|getInversedPosition|getTooltipPositionFromTarget|adjustOffsetBasedOnHooks|closeButtonSkin|flip|viewport|hideOnClickOutside|typeof|outerWidth|outerHeight|innerWidth|innerHeight|set|distance|targetOverlap|tooltipOverlap|getAbsoluteOffset|t_Content|tipped_restore_inline_display|display|img|html|t_hideOnClickOutside|createPostBuildObservers|_buildSkin|showDelayed|showDelay|touchmove|ajaxUpdate|t_visible|removeClass|abort|resetHookPosition|onHide|clearTimeout|clearTimers|eventName|handler|clearEvents|unbind|dataType|_stemPosition|object|tipped|setAttribute|getElementById|slice|wrap|throw|nodeType|setTimeout|pageY|do|while|exec|attachEvent|MSIE|WebKit|KHTML|rv|MobileSafari|Apple|Mobile|Safari|navigator|userAgent|0_b1|Version|fn|jquery|z_|z0|TouchEvent|WebKitTransitionEvent|TransitionEvent|OTransitionEvent|ExplorerCanvas|excanvas|js|initElement|drawPixelArray|createLinearGradient|addColorStop|spacing|replace|0123456789abcdef|hex2rgb|rgba|join|getSaturatedBW|255|hue|saturation|brightness|fff|init_|t_Bubble|15000px|t_CloseButtonShift|CloseButton|t_CloseState|translate|lineWidth|stemOffset|270|sin|setOpacity|getCenterBorderDimensions2|acos|t_Shadow|prepend|t_ShadowBubble|drawStem|t_ShadowStem|t_CloseButtonShadow|9999|touchstart|close|preventDefault|stopPropagation|getBySelector|outside|move|t_UpdateQueue|inline|t_clearfix|t_Content_|filter|8e3|750|Image|t_Skin|t_Tooltip_|fixed|hideOthers|hideDelay|style|MozTransitionDuration|webkitTransitionDuration|OTransitionDuration|transitionDuration|delete|url|complete|status|responseText||load'.split('|'),0,{}));