/* Fetch polyfill */
!function(t){"use strict";function e(t){if("string"!=typeof t&&(t+=""),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t+=""),t}function o(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return m.iterable&&(e[Symbol.iterator]=function(){return e}),e}function n(t){this.map={},t instanceof n?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function s(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function a(t){var e=new FileReader,r=s(e);return e.readAsArrayBuffer(t),r}function h(t){var e=new FileReader,r=s(e);return e.readAsText(t),r}function u(t){for(var e=new Uint8Array(t),r=Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}function f(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function d(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(m.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(m.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=""+t;else if(m.arrayBuffer&&m.blob&&v(t))this._bodyArrayBuffer=f(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!m.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!B(t))throw Error("unsupported BodyInit type");this._bodyArrayBuffer=f(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):m.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},m.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(a)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(u(this._bodyArrayBuffer));if(this._bodyFormData)throw Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},m.formData&&(this.formData=function(){return this.text().then(c)}),this.json=function(){return this.text().then(JSON.parse)},this}function y(t){var e=t.toUpperCase();return _.indexOf(e)>-1?e:t}function l(t,e){e=e||{};var r=e.body;if(t instanceof l){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new n(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=t+"";if(this.credentials=e.credentials||this.credentials||"omit",(e.headers||!this.headers)&&(this.headers=new n(e.headers)),this.method=y(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function c(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function p(t){var e=new n,r=t.replace(/\r?\n[\t ]+/g," ");return r.split(/\r?\n/).forEach(function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}}),e}function b(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new n(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var m={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(m.arrayBuffer)var w=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],v=function(t){return t&&DataView.prototype.isPrototypeOf(t)},B=ArrayBuffer.isView||function(t){return t&&w.indexOf(Object.prototype.toString.call(t))>-1};n.prototype.append=function(t,o){t=e(t),o=r(o);var n=this.map[t];this.map[t]=n?n+","+o:o},n.prototype["delete"]=function(t){delete this.map[e(t)]},n.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},n.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},n.prototype.set=function(t,o){this.map[e(t)]=r(o)},n.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},n.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),o(t)},n.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),o(t)},n.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),o(t)},m.iterable&&(n.prototype[Symbol.iterator]=n.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];l.prototype.clone=function(){return new l(this,{body:this._bodyInit})},d.call(l.prototype),d.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new n(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var A=[301,302,303,307,308];b.redirect=function(t,e){if(-1===A.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},t.Headers=n,t.Request=l,t.Response=b,t.fetch=function(t,e){return new Promise(function(r,o){var n=new l(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:p(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;r(new b(e,t))},i.onerror=function(){o(new TypeError("Network request failed"))},i.ontimeout=function(){o(new TypeError("Network request failed"))},i.open(n.method,n.url,!0),"include"===n.credentials?i.withCredentials=!0:"omit"===n.credentials&&(i.withCredentials=!1),"responseType"in i&&m.blob&&(i.responseType="blob"),n.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===n._bodyInit?null:n._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this);

/*
Gifts can be 'unreserved' or 'reserved'
Reservation can be undone within some time limit (15 mins?) by same IP.
*/

// Widget location: https://remote.zk.io/static/gadget.xml

// var domain = "https://remote.zk.io";
var domain = "https://gift.zk.io";

var output = function(el) {return document.getElementById('output').appendChild(el);}

var createElement = function(el) {
  return function() { return document.createElement(el); }
};

var div = createElement('div');
var a = createElement('a');
var img = createElement('img');

// Clears all the children from an element
var clearChildren = function(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Assigning classname and text content is a fairly common operation.
var elem = function (el, className, content) {
  el.className = className;
  if (content) {
    el.appendChild(document.createTextNode(content));
  }
  return el;
}

var GiftComponent = function (gift) {
  this.gift = gift;
  this.reserve = this.reserve.bind(this);
}

GiftComponent.prototype.reserve = function() {
  clearChildren(this.button);
  elem(this.button, 'reserve reserved', 'Gift Purchased');
  fetch(`${domain}/gift/${this.gift.name}/reserve`);
}

// All this should ever do is update the timer on gifts in the 15 minute window?
GiftComponent.prototype.update = function() {
  var gift = this.gift;
  var reservedAt = new Date(gift.reservedAt);
  var elapsed = new Date() - reservedAt;
  var remainingMS = 15 * 60 * 1000 - elapsed;
  var remainingM = Math.floor(remainingMS/1000/60);
  var remainingS = remainingMS / 1000 - remainingM * 60;
  var remaining = `${remainingM}:${remainingS}`;
  if (elapsed < 15 * 60 * 1000) {
    this.button = elem(this.button, "reserve", `Unreserve (${remaining})`);
  }
};

GiftComponent.prototype.render = function() {
  var gift = this.gift;
  var container = div();
  container.className = "gift"
  var image = img();
  image.src = gift.image;
  var name = elem(div(), "name", gift.name);
  var price = elem(div(), "price", gift.price);
  var source = elem(a(), "source", gift.source);
  source.href = gift.source;
  source.target = '_blank';
  var blurb = elem(div(), "blurb", gift.blurb);

  var details = elem(div(), "details");

  var button;
  if (gift.reserved) {
    var reservedAt = new Date(gift.reservedAt);
    var elapsed = new Date() - reservedAt;
    if (false) { //(elapsed < 15 * 60 * 1000) {
      button = elem(div(), "reserve", "Gift Purchased");
      button.addEventListener('click', this.reserve);
    } else {
      button = elem(div(), 'reserve reserved', "Gift Purchased");
      button.addEventListener('click', this.reserve);
    }
  } else {
    button = elem(div(), "reserve", "I will purchase this gift");
    button.addEventListener('click', this.reserve);
  }


  container.appendChild(image);
  container.appendChild(name);
  details.appendChild(price);
  details.appendChild(source);
  details.appendChild(blurb);
  container.appendChild(details);
  container.appendChild(button);
  this.button = button;
  this.element = container;
  return container;
}

function getGifts() {
  fetch(`${domain}/gifts`).then(function(res) { return res.json()}).then(renderGifts);
}

function renderGifts(data) {


  for (var i = 0; i < data.length; i++) {
    var component = new GiftComponent(data[i]);
    output(component.render());
  }
}

gadgets.util.registerOnLoadHandler(getGifts);