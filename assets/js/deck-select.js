(function () {
  var deck = document.getElementById("cardDeck");
  var langAr = document.getElementById("langAr");
  var langEn = document.getElementById("langEn");
  if (!deck) return;

  var DECK_IMAGES = (typeof CARD_IMAGES !== "undefined") ? CARD_IMAGES : {
    "1": "assets/images/Artboard 1.png",
    "2": "assets/images/Artboard 2.png",
    "3": "assets/images/Artboard 3.png",
    "4": "assets/images/Artboard 4.png"
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
    items.forEach(function (el, i) {
      el.classList.remove("selected");
      el.setAttribute("aria-selected", "false");
      var dist = Math.abs(i - index);
      el.style.zIndex = dist === 0 ? 10 : (5 - dist);
    });
    target.classList.add("selected");
    target.setAttribute("aria-selected", "true");
    target.style.zIndex = 10;
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

  deck.addEventListener("click", function (e) {
    var rect = deck.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var pct = x / rect.width;
    var items = deck.querySelectorAll(".card-deck-item");
    var count = items.length;
    var idx = Math.min(Math.floor(pct * count), count - 1);
    selectCardByIndex(idx);
  });

  deck.querySelectorAll(".card-deck-item").forEach(function (item) {
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectCardByIndex(Array.prototype.indexOf.call(deck.querySelectorAll(".card-deck-item"), item));
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
    var url = DECK_IMAGES[card] || DECK_IMAGES["1"];
    mirror.style.backgroundImage = "url(" + url + ")";
  }

  var autoplayInterval = null;
  var AUTOPLAY_DELAY = 2500;

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(selectNextCard, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  deck.addEventListener("click", function () { restartAutoplay(); });
  deck.addEventListener("touchend", function () { restartAutoplay(); });

  updateLangLinks();
  updateBgMirror();
  startAutoplay();
})();
