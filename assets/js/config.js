var MESSAGES = {
  en: [
    "May Allah bless your Eid with love, goodness, and lasting joyful moments.",
    "Wishing you an Eid filled with hope, prosperity, and blessings.",
    "Happy Eid, wishing you continuous health, joy, and peace."
  ],
  ar: [
    "أدام الله عليكم فرحة العيد، وجعل بيوتكم عامرةً بالمودة والمسرات.",
    "أتمنى لكم عيد أضحى مبارك، تنعمون فيه بالبركة وتدوم فيه الأفراح.",
    "كل عامٍ وانتم بخير، وأتمّ الله أيامكم بالنور والسعادة والطمأنينة."
  ]
};

var CARD_IMAGES = {
  "1": "assets/images/Artboard 1.png",
  "2": "assets/images/Artboard 2.png",
  "3": "assets/images/Artboard 3.png",
  "4": "assets/images/Artboard 4.png"
};

function getSelectedCardId() {
  var m = /[?&]card=(\d+)/.exec(window.location.search);
  return m ? m[1] : "1";
}

function getCardImageUrl(cardId) {
  return CARD_IMAGES[cardId] || CARD_IMAGES["1"];
}
