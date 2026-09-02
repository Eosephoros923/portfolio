(function () {
  "use strict";

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 文字逐字拆分 ---------- */
  function splitToChars(el, gapClass) {
    var text =
      (el.getAttribute && el.getAttribute("data-word")) ||
      el.textContent.trim() ||
      "";
    el.textContent = "";
    var chars = Array.from(text);
    chars.forEach(function (ch, i) {
      var span = document.createElement("span");
      span.className = "ch";
      span.style.setProperty("--i", i);
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
      if (gapClass && i < chars.length - 1) {
        var gap = document.createElement("span");
        gap.className = gapClass;
        gap.style.setProperty("--i", i + 0.35);
        gap.textContent = "\u00A0";
        gap.style.display = "inline-block";
        gap.style.width = "0.22em";
        el.appendChild(gap);
      }
    });
  }

  document.querySelectorAll("#preloader [data-word]").forEach(function (el) {
    splitToChars(el);
  });
  document.querySelectorAll(".cover-name-cn").forEach(function (el) {
    splitToChars(el);
  });
  document.querySelectorAll(".cover-name-en [data-split]").forEach(function (el) {
    splitToChars(el);
  });

  /* ---------- 开场动画 ---------- */
  var preloader = document.getElementById("preloader");

  function finishIntro() {
    if (!preloader) return;
    preloader.classList.add("is-done");
    document.body.classList.add("is-ready");
    window.setTimeout(function () {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 1300);
  }

  if (prefersReduced) {
    window.setTimeout(finishIntro, 60);
  } else {
    window.setTimeout(finishIntro, 2650);
  }

  /* ---------- 导航 ---------- */
  var nav = document.getElementById("siteNav");
  var lastY = window.scrollY;

  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY;
      nav.classList.toggle("is-solid", y > 70);
      if (y > 480 && y > lastY + 6) {
        nav.classList.add("is-hidden");
      } else if (y < lastY - 4 || y < 480) {
        nav.classList.remove("is-hidden");
      }
      lastY = y;
    },
    { passive: true }
  );

  /* ---------- 时间轴 3D 翻书 ---------- */
  var flipCards = document.querySelectorAll(".tl-card");
  if ("IntersectionObserver" in window) {
    var flipObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.04) {
            entry.target.classList.add("is-flipped");
          } else {
            entry.target.classList.remove("is-flipped");
          }
        });
      },
      { threshold: [0, 0.04, 0.2, 0.5, 0.8, 1], rootMargin: "0px 0px -8% 0px" }
    );
    flipCards.forEach(function (card) {
      flipObserver.observe(card);
    });
  } else {
    flipCards.forEach(function (card) {
      card.classList.add("is-flipped");
    });
  }

  /* ---------- 半圆旋转木马 ---------- */
  var works = window.PORTFOLIO_WORKS || [];
  var zone = document.getElementById("carouselZone");
  var track = document.getElementById("carouselTrack");

  var rot = 0;
  var vel = 0;
  var rafId = null;
  var cardEls = [];
  var geometry = { cx: 0, cy: 0, r: 0 };

  function normAngle(deg) {
    return ((((deg + 180) % 360) + 360) % 360) - 180;
  }

  function measure() {
    if (!zone) return;
    var rect = zone.getBoundingClientRect();
    var h = rect.height;
    var r = Math.min(h * 0.4, 430);
    geometry = {
      cx: rect.width / 2,
      cy: h * 0.14 + r,
      r: r,
    };
  }

  function render() {
    if (!track || !cardEls.length) return;
    var n = cardEls.length;
    var step = 360 / n;
    cardEls.forEach(function (card, i) {
      var angle = rot - i * step;
      var rad = (angle * Math.PI) / 180;
      var x = geometry.cx + geometry.r * Math.sin(rad);
      var y = geometry.cy - geometry.r * Math.cos(rad);
      var d = Math.abs(normAngle(angle));
      var depth = Math.min(d, 165);
      var scale = 1 - (depth / 165) * 0.22;
      var opacity = Math.max(0.22, 1 - (depth / 165) * 0.76);
      card.style.transform =
        "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ")";
      card.style.opacity = String(opacity);
      card.style.zIndex = String(Math.round(160 - depth));
      card.classList.toggle("is-front", d < 24);
    });
  }

  function step() {
    if (Math.abs(vel) > 0.02) {
      rot += vel;
      vel *= 0.9;
      render();
      rafId = window.requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  }

  function kick(v) {
    vel = v;
    if (rafId === null) {
      rafId = window.requestAnimationFrame(step);
    }
  }

  function buildCards() {
    if (!track) return;
    works.forEach(function (work, i) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "work-card";
      card.setAttribute("role", "listitem");
      card.setAttribute("aria-label", "查看作品：" + work.title);

      var media = document.createElement("span");
      media.className = "wc-media";
      if (work.cover) {
        media.innerHTML =
          '<img class="wc-img" src="' +
          work.cover +
          '" alt="' +
          work.title +
          ' 封面" />';
      } else {
        media.innerHTML = "";
      }

      var index = document.createElement("span");
      index.className = "wc-index";
      index.textContent = work.index;

      var cat = document.createElement("span");
      cat.className = "wc-cat";
      cat.textContent = work.category;

      var title = document.createElement("span");
      title.className = "wc-title";
      title.textContent = work.title;

      var name = document.createElement("span");
      name.className = "wc-name";
      name.textContent = work.title;

      card.appendChild(media);
      card.appendChild(index);
      card.appendChild(cat);
      card.appendChild(title);
      card.appendChild(name);
      card.addEventListener("click", function () {
        openModal(work);
      });
      track.appendChild(card);
      cardEls.push(card);
    });
    measure();
    render();
  }

  if (zone && track && works.length) {
    buildCards();

    if (!prefersReduced) {
      zone.addEventListener(
        "wheel",
        function (e) {
          e.preventDefault();
          kick(e.deltaY * 0.34);
        },
        { passive: false }
      );
    }

    /* 拖拽旋转 */
    var dragging = false;
    var moved = false;
    var startX = 0;
    var startY = 0;
    var lastX = 0;
    var pointerId = null;
    zone.addEventListener(
      "pointerdown",
      function (e) {
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        lastX = e.clientX;
        vel = 0;
        pointerId = e.pointerId;
      }
    );
    zone.addEventListener(
      "pointermove",
      function (e) {
        if (!dragging) return;
        if (
          !moved &&
          Math.abs(e.clientX - startX) < 6 &&
          Math.abs(e.clientY - startY) < 6
        ) {
          return;
        }
        if (!moved) {
          moved = true;
          try {
            zone.setPointerCapture(pointerId);
          } catch (err) {
            /* 忽略捕获失败 */
          }
        }
        var dx = e.clientX - lastX;
        lastX = e.clientX;
        rot += dx * 0.14;
        vel = dx * 0.14;
        render();
      }
    );
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      if (moved && !prefersReduced) kick(vel * 4);
    }
    zone.addEventListener("pointerup", endDrag);
    zone.addEventListener("pointercancel", endDrag);

    window.addEventListener("resize", function () {
      measure();
      render();
    });
  }

  /* ---------- 全屏详情弹窗 ---------- */
  var modal = document.getElementById("workModal");
  var modalClose = document.getElementById("modalClose");
  var lastFocus = null;

  function openModal(work) {
    if (!modal) return;
    lastFocus = document.activeElement;
    document.getElementById("modalCat").textContent = work.category;
    document.getElementById("modalTitle").textContent = work.title;
    document.getElementById("modalEn").textContent = work.en;
    document.getElementById("modalIntro").textContent = work.brief;
    document.getElementById("modalDesc").textContent = work.longDesc;
    document.getElementById("modalYear").textContent = work.year;
    document.getElementById("modalRole").textContent = work.role;
    document.getElementById("modalPlatform").textContent = work.platform;
    document.getElementById("modalMetrics").textContent = work.metrics;
    document.getElementById("modalLive").href =
      "detail.html?id=" + encodeURIComponent(work.id);

    var mediaEl = modal.querySelector(".modal-media");
    if (work.cover) {
      mediaEl.classList.add("has-img");
      mediaEl.innerHTML =
        '<img class="modal-img" src="' +
        work.cover +
        '" alt="' +
        work.title +
        ' 封面" />';
    } else {
      mediaEl.classList.remove("has-img");
      mediaEl.innerHTML =
        '<div class="modal-fallback">' +
        '<span class="mf-index">' +
        work.index +
        "</span>" +
        '<span class="mf-cat">' +
        work.category +
        "</span>" +
        '<span class="mf-title">' +
        work.title +
        "</span>" +
        "</div>";
    }

    var linksBox = document.getElementById("modalLinks");
    linksBox.innerHTML = "";
    (work.links || []).forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = link.label || link.platform + " 主页";
      linksBox.appendChild(a);
    });

    modal.hidden = false;
    document.body.classList.add("lock");
    modalClose.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("lock");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.classList.contains("modal-scroll")) {
        closeModal();
      }
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }
})();
