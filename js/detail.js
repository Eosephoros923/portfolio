(function () {
  "use strict";

  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var works = window.PORTFOLIO_WORKS || [];
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var work = window.PORTFOLIO_WORK_MAP[id] || works[0] || null;

  if (!work) {
    document.body.innerHTML =
      '<div style="padding:20vh 10vw;text-align:center">作品数据缺失</div>';
    return;
  }

  /* ---------- 填充信息 ---------- */
  document.getElementById("headIndex").textContent =
    work.index + " / " + String(works.length).padStart(2, "0");
  document.getElementById("headCategory").textContent = work.category;
  document.getElementById("detailTitle").textContent = work.title;
  document.getElementById("detailEn").textContent = work.en;
  document.getElementById("detailBrief").textContent = work.brief;
  document.getElementById("detailYear").textContent = work.year;
  document.getElementById("detailClient").textContent = work.client;
  document.getElementById("detailRole").textContent = work.role;
  document.getElementById("detailPlatform").textContent = work.platform;
  document.getElementById("detailMetrics").textContent = work.metrics;
  document.getElementById("detailLong").textContent = work.longDesc;
  document.getElementById("footerTitle").textContent = work.en;
  document.title = work.title + " · 郭映彤作品集";

  var linksBox = document.getElementById("detailLinks");
  (work.links || []).forEach(function (link) {
    var a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = link.label || link.platform + " 主页";
    linksBox.appendChild(a);
  });

  /* 画廊右下角：公众号展示链接按钮 */
  var galleryLinks = document.getElementById("galleryLinks");
  if (work.galleryLinks && work.galleryLinks.length) {
    galleryLinks.hidden = false;
    work.galleryLinks.forEach(function (link) {
      var a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "gallery-link";
      a.textContent = link.label;
      galleryLinks.appendChild(a);
    });
  }

  /* ---------- 构建高度错落画廊（原生横向滚动） ---------- */
  var gallery = document.getElementById("gallery");
  var progressBar = document.getElementById("detailProgressBar");

  work.gallery.forEach(function (item, i) {
    var figure = document.createElement("figure");
    figure.className = "d-card";

    var media = document.createElement("div");
    media.className = "d-media";
    media.innerHTML =
      '<span class="d-card-index">' +
      String(i + 1).padStart(2, "0") +
      "</span>";
    if (item.img) {
      figure.classList.add("has-img");
      media.classList.add("has-img");
      var im = document.createElement("img");
      im.src = item.img;
      im.alt = item.caption || "";
      im.addEventListener("load", updateProgress);
      im.addEventListener("error", updateProgress);
      media.appendChild(im);
    }

    var caption = document.createElement("figcaption");
    caption.className = "d-caption";
    caption.textContent = item.caption;

    figure.appendChild(media);
    figure.appendChild(caption);
    if (item.stat) {
      var stat = document.createElement("span");
      stat.className = "d-stat";
      stat.textContent = item.stat;
      figure.appendChild(stat);
    }
    gallery.appendChild(figure);
  });

  /* ---------- 原生横向滚动 + 惯性 ---------- */
  var isDesktop = window.innerWidth > 900;
  var maxScroll = 0;
  var vel = 0;
  var rafId = null;
  var dragging = false;
  var lastX = 0;
  var dragVel = 0;

  function updateProgress() {
    maxScroll = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
    var p =
      maxScroll > 0
        ? Math.min(1, Math.max(0, gallery.scrollLeft / maxScroll))
        : 1;
    progressBar.style.width = (p * 100).toFixed(1) + "%";
  }

  function step() {
    gallery.scrollLeft += vel;
    vel *= 0.92;
    if (Math.abs(vel) < 0.08) vel = 0;
    if (
      (gallery.scrollLeft <= 0 && vel < 0) ||
      (gallery.scrollLeft >= maxScroll - 1 && vel > 0)
    ) {
      vel = 0;
    }
    updateProgress();
    if (vel !== 0) {
      rafId = window.requestAnimationFrame(step);
    } else {
      rafId = null;
    }
  }

  function kick(v) {
    if (prefersReduced) {
      gallery.scrollBy({ left: v, behavior: "smooth" });
      return;
    }
    vel += v;
    if (rafId === null) rafId = window.requestAnimationFrame(step);
  }

  window.addEventListener(
    "wheel",
    function (e) {
      if (maxScroll <= 0) return;
      var unit = e.deltaMode === 1 ? 24 : 1;
      var delta = e.deltaY * unit;
      if (isDesktop) {
        e.preventDefault();
        kick(delta);
        return;
      }
      /* 窄窗口：横向滚到头后放行页面纵向滚动 */
      if (delta > 0 && gallery.scrollLeft < maxScroll - 1) {
        e.preventDefault();
        kick(delta);
      } else if (delta < 0 && gallery.scrollLeft > 1) {
        e.preventDefault();
        kick(delta);
      }
    },
    { passive: false }
  );

  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      gallery.scrollBy({ left: 360, behavior: "smooth" });
    }
    if (e.key === "ArrowLeft") {
      gallery.scrollBy({ left: -360, behavior: "smooth" });
    }
  });

  /* 鼠标拖拽（触屏交给浏览器原生滚动） */
  gallery.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") return;
    dragging = true;
    lastX = e.clientX;
    vel = 0;
    dragVel = 0;
    try {
      gallery.setPointerCapture(e.pointerId);
    } catch (err) {
      /* 忽略捕获失败 */
    }
  });
  gallery.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    lastX = e.clientX;
    dragVel = -dx;
    gallery.scrollLeft -= dx;
    updateProgress();
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (!prefersReduced && Math.abs(dragVel) > 0.5) kick(dragVel * 2.2);
  }
  gallery.addEventListener("pointerup", endDrag);
  gallery.addEventListener("pointercancel", endDrag);

  gallery.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", function () {
    isDesktop = window.innerWidth > 900;
    updateProgress();
  });
  window.addEventListener("load", updateProgress);
  updateProgress();

  /* 卡片入场 */
  if (!prefersReduced) {
    var cards = document.querySelectorAll(".d-card");
    cards.forEach(function (card, i) {
      card.style.opacity = "0";
      card.style.transform = "translateY(34px)";
      card.style.transition =
        "opacity 0.8s cubic-bezier(0.22,1,0.36,1) " +
        (i * 0.09 + 0.1) +
        "s, transform 0.9s cubic-bezier(0.22,1,0.36,1) " +
        (i * 0.09 + 0.1) +
        "s";
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });
      });
    });
  }
})();
