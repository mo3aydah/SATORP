var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var canvasWidth = 1080;
var canvasHeight = 1080;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var imageObj = new Image();
imageObj.onload = function () {
  var loading = document.getElementById("cardPreviewLoading");
  if (loading) loading.hidden = true;
  updatePreview();
};
imageObj.onerror = function () {
  console.error("Failed to load image.");
};
imageObj.src = "assets/images/Satorp - Ramadan Design (Employees greeting).png";

var chosenMessage = null;
var currentStep = 1;

function updatePreview() {
  var nameEl = document.getElementById("name");
  var nameText = nameEl ? nameEl.value.trim() : "";
  var message = currentStep >= 1 ? chosenMessage : null;
  var showName = currentStep >= 2 ? nameText : "";
  document.fonts.ready.then(function () {
    drawCardWithText(message, showName);
  });
}

var stepTransitionMs = 220;

function showStep(step) {
  var prevStep = currentStep;
  currentStep = step;

  function applyStepVisibility(stepNum, visible) {
    var el = document.getElementById("step" + stepNum);
    if (!el) return;
    el.hidden = !visible;
    el.classList.toggle("step-visible", visible);
  }

  if (prevStep === step) {
    [1, 2, 3].forEach(function (n) {
      applyStepVisibility(n, n === step);
    });
    updateDots();
    updatePreview();
    if (step === 2) {
      updateNameStepUI();
      setTimeout(function () {
        var nameEl = document.getElementById("name");
        if (nameEl) nameEl.focus();
      }, 100);
    }
    return;
  }

  var currentEl = document.getElementById("step" + prevStep);
  var nextEl = document.getElementById("step" + step);
  currentEl.classList.remove("step-visible");
  setTimeout(function () {
    currentEl.hidden = true;
    if (nextEl) {
      nextEl.hidden = false;
      nextEl.classList.remove("step-visible");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (nextEl) nextEl.classList.add("step-visible");
        });
      });
    }
    updateDots();
    updatePreview();
    if (step === 2) {
      updateNameStepUI();
      setTimeout(function () {
        var nameEl = document.getElementById("name");
        if (nameEl) nameEl.focus();
      }, 100);
    }
  }, stepTransitionMs);
}

function updateDots() {
  var step = currentStep;
  document.querySelectorAll(".step-dot").forEach(function (dot) {
    var n = parseInt(dot.getAttribute("data-step"), 10);
    dot.classList.toggle("active", n === step);
    dot.classList.toggle("completed", n < step);
    dot.setAttribute("aria-current", n === step ? "step" : "false");
  });
}

function updateNameStepUI() {
  var nameEl = document.getElementById("name");
  var nextBtn = document.getElementById("step2Next");
  var errorEl = document.getElementById("nameError");
  if (!nameEl) return;
  var val = nameEl.value.trim();
  if (nextBtn) nextBtn.disabled = val.length === 0;
  if (errorEl && val.length > 0) errorEl.hidden = true;
}

function buildMessageOptions() {
  var container = document.getElementById("messageOptions");
  if (!container || typeof MESSAGES === "undefined" || !MESSAGES.ar) return;
  container.innerHTML = "";
  MESSAGES.ar.forEach(function (text) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-outline-light message-option w-100";
    btn.textContent = text;
    btn.addEventListener("click", function () {
      chosenMessage = text;
      container.querySelectorAll(".message-option").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var nextBtn = document.getElementById("step1Next");
      if (nextBtn) nextBtn.disabled = false;
      updatePreview();
    });
    container.appendChild(btn);
  });
}

function sanitizeFileName(str) {
  return (str || "").trim().replace(/[\s]+/g, "-").replace(/[<>:"/\\|?*]/g, "") || "Greeting";
}

function downloadCanvasAsImage(onComplete) {
  var nameEl = document.getElementById("name");
  var namePart = sanitizeFileName(nameEl ? nameEl.value : "");
  var imageName = "6D-Satorp-Ramadan-Greeting" + (namePart ? "-" + namePart : "") + ".png";
  var downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", imageName);
  canvas.toBlob(function (blob) {
    var url = URL.createObjectURL(blob);
    downloadLink.setAttribute("href", url);
    downloadLink.click();
    URL.revokeObjectURL(url);
    if (typeof onComplete === "function") onComplete();
  });
}

function wrapCanvasText(ctx, text, maxWidth) {
  var words = text.split(/\s+/);
  var lines = [];
  var current = "";
  for (var i = 0; i < words.length; i++) {
    var test = current ? current + " " + words[i] : words[i];
    var m = ctx.measureText(test);
    if (m.width > maxWidth && current) {
      lines.push(current);
      current = words[i];
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawCardWithText(messageText, nameText) {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(imageObj, 0, 0, canvasWidth, canvasHeight);

  context.textAlign = "center";
  context.fillStyle = "#2F388D";
  var centerX = canvasWidth / 2;
  var nameY = canvasHeight - 400;
  var messageMaxWidth = 620;
  var messageLineHeight = 38;

  if (messageText) {
    context.font = "300 28pt Satorp";
    var messageLines = wrapCanvasText(context, messageText, messageMaxWidth);
    if (messageLines.length > 2) {
      context.font = "300 24pt Satorp";
      messageLines = wrapCanvasText(context, messageText, messageMaxWidth);
    }
    if (messageLines.length > 2) messageLines = messageLines.slice(0, 2);
    var messageY = nameY - 40 - (messageLines.length - 1) * messageLineHeight;
    for (var i = 0; i < messageLines.length; i++) {
      context.fillText(messageLines[i], centerX, messageY + i * messageLineHeight);
    }
  }

  context.font = "300 35pt Satorp";
  if (nameText) {
    context.fillText(nameText, centerX, nameY);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buildMessageOptions();
  updateDots();

  var nameInput = document.getElementById("name");
  if (nameInput) {
    nameInput.addEventListener("input", function () {
      updateNameStepUI();
      if (currentStep >= 2) updatePreview();
    });
  }

  document.getElementById("step1Next").addEventListener("click", function () {
    if (!chosenMessage) {
      alert("اختر رسالة أولاً");
      return;
    }
    showStep(2);
  });

  document.getElementById("step2Back").addEventListener("click", function () {
    showStep(1);
  });

  document.getElementById("step2Next").addEventListener("click", function () {
    var nameText = document.getElementById("name").value.trim();
    var errorEl = document.getElementById("nameError");
    if (!nameText) {
      if (errorEl) errorEl.hidden = false;
      document.getElementById("name").focus();
      return;
    }
    if (errorEl) errorEl.hidden = true;
    showStep(3);
  });

  document.getElementById("step3Back").addEventListener("click", function () {
    showStep(2);
  });

  document.getElementById("downloadCard").addEventListener("click", function () {
    var btn = document.getElementById("downloadCard");
    if (btn.disabled) return;
    var defaultHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "<span class=\"download-spinner\" aria-hidden=\"true\"></span> جاري إنشاء بطاقتك…";
    downloadCanvasAsImage(function () {
      btn.disabled = false;
      btn.innerHTML = defaultHtml;
      var successEl = document.getElementById("downloadSuccess");
      if (successEl) {
        successEl.hidden = false;
        clearTimeout(window._downloadSuccessHide);
        window._downloadSuccessHide = setTimeout(function () {
          successEl.hidden = true;
        }, 4000);
      }
    });
  });
});
