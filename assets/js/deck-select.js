(function () {
  var deck = document.getElementById("cardDeck");
  var langAr = document.getElementById("langAr");
  var langEn = document.getElementById("langEn");
  if (!deck) return;

  var CARD_IMAGES = {
    "1": "assets/images/Satorp - Ramadan Design (Employees greeting).png",
    "2": "assets/images/new-design.jpg.jpeg"
  };

  function getSelectedCard() {
    var selected = deck.querySelector(".card-deck-item.selected");
    return selected ? selected.getAttribute("data-card") : "1";
  }

  function updateLangLinks() {
    var card = getSelectedCard();
    var q = "?card=" + card;
    if (langAr) langAr.href = "ar.html" + q;
    if (langEn) langEn.href = "en.html" + q;
  }

  function selectCardByIndex(index) {
    var items = deck.querySelectorAll(".card-deck-item");
    var target = items[index];
    if (!target) return;
    items.forEach(function (el) {
      el.classList.remove("selected");
      el.setAttribute("aria-selected", "false");
    });
    target.classList.add("selected");
    target.setAttribute("aria-selected", "true");
    updateLangLinks();
    updateBgMirror();
  }

  function selectNextCard() {
    var items = deck.querySelectorAll(".card-deck-item");
    var current = deck.querySelector(".card-deck-item.selected");
    var idx = current ? Array.prototype.indexOf.call(items, current) : 0;
    selectCardByIndex((idx + 1) % items.length);
  }

  function selectPrevCard() {
    var items = deck.querySelectorAll(".card-deck-item");
    var current = deck.querySelector(".card-deck-item.selected");
    var idx = current ? Array.prototype.indexOf.call(items, current) : 0;
    selectCardByIndex((idx - 1 + items.length) % items.length);
  }

  deck.querySelectorAll(".card-deck-item").forEach(function (item) {
    item.addEventListener("click", function () {
      selectCardByIndex(Array.prototype.indexOf.call(deck.querySelectorAll(".card-deck-item"), item));
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });

  /* Touch swipe: swipe left = next card, swipe right = prev card */
  var touchStartX = 0;
  var touchEndX = 0;
  deck.addEventListener("touchstart", function (e) {
    if (!e.touches || !e.touches.length) return;
    touchStartX = e.touches[0].screenX;
  }, { passive: true });
  deck.addEventListener("touchend", function (e) {
    if (!e.changedTouches || !e.changedTouches.length) return;
    touchEndX = e.changedTouches[0].screenX;
    var delta = touchStartX - touchEndX;
    var minSwipe = 50;
    if (delta > minSwipe) selectNextCard();
    else if (delta < -minSwipe) selectPrevCard();
  }, { passive: true });

  function updateBgMirror() {
    var mirror = document.getElementById("langSelectBgMirror");
    if (!mirror) return;
    var card = getSelectedCard();
    var url = CARD_IMAGES[card] || CARD_IMAGES["1"];
    mirror.style.backgroundImage = "url(" + url + ")";
  }

  updateLangLinks();
  updateBgMirror();
})();
