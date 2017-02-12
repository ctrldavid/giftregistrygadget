/*
Gifts can be 'unreserved' or 'reserved'
Reservation can be undone within some time limit (15 mins?) by same IP.
*/
var output = function(el) {return document.getElementById('output').appendChild(el);}

var createElement = function(el) {
  return function() { return document.createElement(el); }
};

var div = createElement('div');
var img = createElement('img');

var clearChildren = function(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};


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
  elem(this.button, 'reserve reserved', 'Reserved!');
  fetch(`https://remote.zk.io/gift/${this.gift.name}/reserve`);
}

GiftComponent.prototype.render = function() {
  var gift = this.gift;
  var container = div();
  container.className = "gift"
  var image = img();
  image.src = gift.image;
  var name = elem(div(), "name", gift.name);
  var price = elem(div(), "price", gift.price);
  var source = elem(div(), "source", gift.source);
  var blurb = elem(div(), "blurb", gift.blurb);

  var details = elem(div(), "details");

  var button;
  if (gift.reserved) {
    var reservedAt = new Date(gift.reservedAt);
    var elapsed = new Date() - reservedAt;
    if (elapsed < 15 * 60 * 1000) {
      button = elem(div(), "reserve", "can still unrserve");
      button.addEventListener('click', this.reserve);
    } else {
      button = elem(div(), 'reserve reserved', "Reserved!");
      button.addEventListener('click', this.reserve);
    }
  } else {
    button = elem(div(), "reserve", "Reserve!");
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
  fetch("https://remote.zk.io/gifts").then(function(res) { return res.json()}).then(renderGifts);
}

function renderGifts(data) {


  for (var i = 0; i < data.length; i++) {
    var component = new GiftComponent(data[i]);
    output(component.render());
  }
}

gadgets.util.registerOnLoadHandler(getGifts);