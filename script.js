document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".sidebar-dog-loader");

  const waitForSpline = setInterval(() => {
    const spline = document.querySelector("spline-viewer");
    if (spline && spline.shadowRoot) {
      clearInterval(waitForSpline);

      const shadowRoot = spline.shadowRoot;

      const checkReady = setInterval(() => {
        const canvas = shadowRoot.querySelector("canvas");
        if (canvas) {
          clearInterval(checkReady);

          // Убираем логотип, если он ещё жив
          const logo = shadowRoot.querySelector("#logo");
          if (logo) logo.remove();

          // Добавляем loaded + скрываем лоадер с небольшой задержкой
          spline.closest(".sidebar-dog")?.classList.add("loaded");

          setTimeout(() => {
            loader?.classList.add("hidden");
          }, 100); // можно увеличить до 300–500, если надо плавнее
        }
      }, 50);
    }
  }, 50);
});






// === ПАРАЛЛАКС ГЛАЗ ===
document.addEventListener('mousemove', function(event) {
    let parallaxElements = document.querySelectorAll('.parallax-element');
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    if (windowWidth <= 0 || windowHeight <= 0) return;
    let mouseX = event.clientX - windowWidth / 2;
    let mouseY = event.clientY - windowHeight / 2;
    const maxOffset = 12;
    let moveX = Math.max(Math.min(mouseX * 0.0015, maxOffset), -maxOffset);
    let moveY = Math.max(Math.min(mouseY * 0.0025, maxOffset), -maxOffset);
    parallaxElements.forEach(function(element) {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});
document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.parallax-element').forEach(el => {
        el.style.transition = 'transform 0.6s ease-out';
        el.style.transform = 'translate(0, 0)';
        setTimeout(() => { el.style.transition = ''; }, 600);
    });
});


// === ПИКСЕЛЬНЫЙ МИКСЕР + ЗУМ + КУБИК ===
document.addEventListener("DOMContentLoaded", function () {
const imageUrls = [
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/8marta-2025.mp4",
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/cd-sa-anim.mp4",  
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/ct-nav.mp4",  
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/3108_Letters.mp4", 
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/calltouch-neuro1.mp4",
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/Digest_17.mp4",
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/Digest_mazda.mp4",
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/email-rocket.mp4",
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/octopus.mp4",
"https://rawcdn.githack.com/krivenxter/krivenxter.github.io/main/video/Welcome.mp4",   
"https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/video/Vizitki_anim2.mp4", "https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/video/812_vfx_final.mp4", "https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/video/poster-sod-spb.mp4",
"https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/video/vfx-2-spb.mp4",
"https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/video/Zhaba drop_1.mp4", 
"https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/img/Poster-Fuss1.jpg",   "https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/img/pepper.jpg", 
"https://cdn.jsdelivr.net/gh/krivenxter/krivenxter.github.io/img/JuicyAutopsy_Comp_2.jpg",   
            "https://static.tildacdn.com/tild6530-3839-4238-b436-656136623839/Quiz22_Bad_v2.jpg",
            "https://static.tildacdn.com/tild3864-3063-4363-b563-343232366434/ARS_1039.jpg",
            "https://static.tildacdn.com/tild6533-6532-4664-a365-346538346165/Calltouch_Key_Partne.png",
            "https://static.tildacdn.com/tild6531-6531-4363-a164-383164393664/SHUBER1.png",
            "https://static.tildacdn.com/tild6237-3265-4832-b464-383833313431/CT_BucketHat_5.jpg",
            "https://static.tildacdn.com/tild3835-3230-4732-b764-613037626139/CTLeads1_Turk_Gal_10.png",
            "https://static.tildacdn.com/tild3036-3034-4066-b838-346434616338/photo_2024-04-26_09-.jpg",
            "https://static.tildacdn.com/tild3136-3263-4539-b133-333836626461/GDB_1.jpg",
            "https://static.tildacdn.com/tild3162-3838-4761-b332-663634656261/test-money-guy.png",
            "https://static.tildacdn.com/tild3164-6438-4432-a362-386265393832/notebook2024_1b.png",
            "https://static.tildacdn.com/tild3337-6264-4531-b033-376262343438/g8-gloves.png",
            "https://static.tildacdn.com/tild3366-6136-4262-b734-323731313232/sch_ny_tree.png",
            "https://static.tildacdn.com/tild3437-6533-4635-b036-616630656434/krugly_stol.png",
            "https://static.tildacdn.com/tild3536-3935-4335-a337-353431616661/g8-raketka.png",
            "https://static.tildacdn.com/tild3737-6563-4963-b633-656632636431/otrkitka.jpg",
            "https://static.tildacdn.com/tild3830-3739-4661-b331-323834306335/merch2021.png",
            "https://static.tildacdn.com/tild3938-3632-4336-b962-346138396437/Libre_final.png",
            "https://static.tildacdn.com/tild3962-6236-4465-b733-623164396433/Stand24-Masha-editio.jpg",
            "https://static.tildacdn.com/tild6135-3638-4131-a563-313537663335/play-practice.png",
            "https://static.tildacdn.com/tild6234-3731-4131-a433-396136643465/CVD3_Poster1_Tech_FI.jpg",
            "https://static.tildacdn.com/tild6264-3864-4564-b639-643466633864/ct-seashell.png",
            "https://static.tildacdn.com/tild6561-3362-4438-b365-313961643065/red_skull.jpeg",
            "https://static.tildacdn.com/tild6636-3861-4236-a138-326361613032/discount-case.png",
            "https://static.tildacdn.com/tild6337-6261-4866-b035-656632303936/result_3_1100x600.png",
            "https://static.tildacdn.com/tild6536-3962-4066-b966-623364383866/vizitki2.png",
            "https://static.tildacdn.com/tild6662-3062-4061-a330-343034366566/g8-balls.png",
            "https://static.tildacdn.com/tild6531-3965-4339-b733-316131376231/illustartion_Antifra.png",
            "https://static.tildacdn.com/tild6330-3236-4063-a462-613932353565/photo.png",
            "https://static.tildacdn.com/tild6134-6333-4664-a366-343365616537/CT22_Black_Tshirt_3.png",
            "https://static.tildacdn.com/tild6137-3963-4563-b531-323530666236/Chem_pomoch.png",
            "https://static.tildacdn.com/tild6138-6533-4535-a233-336666326331/bolshaya-kurtka.png",
            "https://static.tildacdn.com/tild6437-3236-4762-a634-313735613862/robot-people-muppets.png",
            "https://static.tildacdn.com/tild3132-3931-4234-a537-653266303733/API.png"
];


  
  const canvases = document.querySelectorAll(".pixel-canvas");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const diceIcon = document.querySelector(".dice-icon");

// === Мобильный img для отображения одной рандомной картинки ===
let mobileImg = document.createElement("img");
mobileImg.className = "mobile-image";

  const mobileImgWrapper = document.createElement("div");
mobileImgWrapper.className = "mobile-image-container";
mobileImgWrapper.appendChild(mobileImg);

const closeBtn = document.createElement("div");
closeBtn.className = "mobile-image-close";
closeBtn.innerHTML = "×";
mobileImgWrapper.appendChild(closeBtn);
  
  closeBtn.addEventListener("click", () => {
  mobileImg.classList.remove("show");
  mobileImg.classList.add("hide");
  setTimeout(() => {
    mobileImg.removeAttribute("src");
  }, 400);
});


// Вместо .sidebar-mixer встраиваем в шапку, чтобы быть поверх blur
document.body.appendChild(mobileImgWrapper);


  function getRandomImages(count = 3) {
    return [...imageUrls].sort(() => 0.5 - Math.random()).slice(0, count);
  }

// Храним текущее видео-поток для остановки
let currentVideo = null;

// Загружаем медиа
function loadMediaWithPixelEffect(canvas, url) {
  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // --- ❗ ОСТАНАВЛИВАЕМ И УБИВАЕМ СТАРОЕ ВИДЕО ---
  if (canvas.currentVideo) {
    canvas.currentVideo.pause();
    canvas.currentVideo.src = "";
    canvas.currentVideo.load();
    canvas.currentVideo.remove();
    cancelAnimationFrame(canvas.animationFrameId);
    canvas.currentVideo = null;
    canvas.animationFrameId = null;
  }


  canvas.onmouseenter = (e) => showZoomPreview(e, url);
  canvas.onmousemove = (e) => moveZoomPreview(e);
  canvas.onmouseleave = hideZoomPreview;

  if (url.endsWith(".mp4")) {
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    // 🔥 ДОБАВЬ ЭТО
video.style.objectFit = "cover";
video.style.width = "100%";
video.style.height = "100%";
video.style.display = "none"; // прячем до готовности

video.addEventListener("loadeddata", () => {
  video.play();

  // 💥 СТАВИМ КАНВАС СРАЗУ НА ФИНАЛЬНЫЕ РАЗМЕРЫ
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  let scaleSteps = [5, 10, 20, 40, 80, 100];
  let stepIndex = 0;


function pixelateVideo() {
  if (stepIndex >= scaleSteps.length) {
    ctx.imageSmoothingEnabled = true;
    startVideoLoop(); // нормальная отрисовка видео
    return;
  }

  let scale = scaleSteps[stepIndex++];
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 💥 Делаем уменьшение: маленький слой -> растягиваем на весь канвас
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height, 0, 0, scale, scale);
  ctx.drawImage(canvas, 0, 0, scale, scale, 0, 0, canvas.width, canvas.height);

  setTimeout(pixelateVideo, 100);
}


      function startVideoLoop() {
        function render() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.animationFrameId = requestAnimationFrame(render);
        }
        render();
      }

      pixelateVideo();
    });

    // сохраняем видео, чтобы потом остановить
    canvas.currentVideo = video;

  } else {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

img.onload = function () {
  let scaleSteps = [5, 10, 20, 40, 80, 100];
  let stepIndex = 0;
  let imgRatio = img.width / img.height;
  let cropSize = imgRatio > 1 ? img.height : img.width;
  let sx = (img.width - cropSize) / 2;
  let sy = (img.height - cropSize) / 2;

  function drawPixelated() {
    if (stepIndex >= scaleSteps.length) {
      ctx.imageSmoothingEnabled = true;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
      return;
    }

    let scale = scaleSteps[stepIndex++];
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, scale, scale);
    ctx.drawImage(canvas, 0, 0, scale, scale, 0, 0, canvas.width, canvas.height);

    setTimeout(drawPixelated, 100);
  }

      drawPixelated();
    };
      }

  }

  
  function isMobile() {
    return window.innerWidth <= 960;
  }
  
// === при клике на shuffle показываем одну картинку с анимацией ===
function shuffleImages() {
  const randomImages = getRandomImages();

  if (isMobile()) {
    const [randomMedia] = randomImages;

    mobileImg.classList.remove("show");
    mobileImg.classList.add("hide");

    setTimeout(() => {
      // Очистить контейнер
      mobileImgWrapper.innerHTML = '';

      if (randomMedia.endsWith('.mp4')) {
        // Если видео
const video = document.createElement('video');
video.src = randomMedia;
video.autoplay = true;
video.loop = true;
video.muted = true;
video.playsInline = true;
video.className = 'mobile-video';
video.style.opacity = '0'; // СТАРТОВО прячем

mobileImgWrapper.appendChild(video);
mobileImgWrapper.appendChild(closeBtn);

// Когда видео прогрузило МЕТАДАННЫЕ — оно знает размеры
video.addEventListener('loadeddata', () => {
  // Теперь только ебашим анимацию появления
  video.style.opacity = '1';
  mobileImgWrapper.classList.remove("hide");
  mobileImgWrapper.classList.add("show");
  video.classList.add("show");
});

      } else {
        // Если обычная картинка
        const tempImg = new Image();
        tempImg.src = randomMedia;
        tempImg.className = "mobile-image";

        tempImg.onload = () => {
          mobileImgWrapper.appendChild(tempImg);
          mobileImgWrapper.appendChild(closeBtn);

          void tempImg.offsetWidth;

          mobileImgWrapper.classList.remove("hide");
          mobileImgWrapper.classList.add("show");
          tempImg.classList.add("show");
        };
      }

      // Обновляем кросс-кнопку
      closeBtn.classList.remove("show", "hide");
      void closeBtn.offsetWidth;
      closeBtn.style.transition = "none";
      closeBtn.classList.remove("show");
      closeBtn.classList.add("hide");
      void closeBtn.offsetWidth;
      closeBtn.style.transition = "";
      closeBtn.classList.remove("hide");
      closeBtn.classList.add("show");


      
    }, 100);
    
  } else {
    canvases.forEach((canvas, i) => {
      loadMediaWithPixelEffect(canvas, randomImages[i]);
    });
  }
}




  // 💥 ДОБАВЬ СЮДА это:
  if (!isMobile()) {
    shuffleImages();
  }

shuffleBtn.addEventListener("click", () => {
  const angles = [360, 480, 615];
  const randomAngle = angles[Math.floor(Math.random() * angles.length)];

  diceIcon.classList.remove("rotate-animation");
  diceIcon.style.transition = "none";
  diceIcon.style.transform = "rotate(0deg)";
  void diceIcon.offsetWidth;

  requestAnimationFrame(() => {
    diceIcon.classList.add("rotate-animation");
    diceIcon.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    diceIcon.style.transform = `rotate(${randomAngle}deg)`;
  });

});

 // внутри DOMContentLoaded, после определения shuffleImages:
const desktopBtn = document.getElementById("shuffle-btn");
const mobileBtn = document.getElementById("shuffle-btn-mobile");

const handleClick = (btn, event) => {
  event.preventDefault(); // 💥 вот оно, ключевое

  // Снимаем фокус
  btn.blur();

  // Крутим кубик
  const angles = [360, 480, 615];
  const randomAngle = angles[Math.floor(Math.random() * angles.length)];
  const diceIcon = btn.querySelector(".dice-icon");

  diceIcon.classList.remove("rotate-animation");
  diceIcon.style.transition = "none";
  diceIcon.style.transform = "rotate(0deg)";
  void diceIcon.offsetWidth;

  requestAnimationFrame(() => {
    diceIcon.classList.add("rotate-animation");
    diceIcon.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
    diceIcon.style.transform = `rotate(${randomAngle}deg)`;
  });

  shuffleImages();
};



if (desktopBtn) desktopBtn.addEventListener("click", (e) => handleClick(desktopBtn, e));
if (mobileBtn) mobileBtn.addEventListener("click", (e) => handleClick(mobileBtn, e));

    
closeBtn.addEventListener("click", () => {
mobileImg.classList.remove("show");
mobileImg.classList.add("hide");

mobileImgWrapper.classList.remove("show");
mobileImgWrapper.classList.add("hide");
  
closeBtn.classList.remove("show");
closeBtn.classList.add("hide");


setTimeout(() => {
  mobileImg.removeAttribute("src");
  

    // 💥 ДОБАВЬ ЭТО
    mobileImgWrapper.querySelectorAll('video').forEach(video => video.remove());

}, 400);

});



document.addEventListener("click", (e) => {
  const isInside = e.target.closest(".mobile-image") || e.target.closest("#shuffle-btn");

  if (!isInside && mobileImg.classList.contains("show")) {
mobileImg.classList.remove("show");
mobileImg.classList.add("hide");

mobileImgWrapper.classList.remove("show");
mobileImgWrapper.classList.add("hide");
    
closeBtn.classList.remove("show");
closeBtn.classList.add("hide");    

setTimeout(() => {
  mobileImg.removeAttribute("src");
}, 400);

  }
});









let zoomImg = null;
let zoomVideo = null;

if (!isMobile()) {
  zoomImg = document.createElement("img");
  zoomImg.className = "zoom-preview";
  document.body.appendChild(zoomImg);

  zoomVideo = document.createElement("video");
  zoomVideo.className = "zoom-preview";
  zoomVideo.muted = true;
  zoomVideo.playsInline = true;
  zoomVideo.loop = true;
  zoomVideo.autoplay = true;
  zoomVideo.style.display = "none";
  document.body.appendChild(zoomVideo);
}

function showZoomPreview(event, src) {
  if (!zoomImg || !zoomVideo) return;

  const isVideo = src.endsWith('.mp4');

  // Скрываем оба перед показом
  zoomImg.classList.remove("show");
  zoomVideo.classList.remove("show");
  zoomImg.style.display = "none";
  zoomVideo.style.display = "none";

if (isVideo) {
  zoomVideo.src = src;

  zoomVideo.onloadedmetadata = () => {
    const maxWidth = 440;
    const maxHeight = 440;
    const ratio = zoomVideo.videoWidth / zoomVideo.videoHeight;

    if (ratio >= 1) {
      zoomVideo.style.width = `${maxWidth}px`;
      zoomVideo.style.height = `${maxWidth / ratio}px`;
    } else {
      zoomVideo.style.height = `${maxHeight}px`;
      zoomVideo.style.width = `${maxHeight * ratio}px`;
    }

    zoomVideo.style.display = "block";
    moveZoomPreview(event, zoomVideo);
    zoomVideo.classList.add("show");
  };
}
 else {
    const tempImg = new Image();
    tempImg.onload = function () {
      const maxWidth = 440;
      const maxHeight = 440;
      const ratio = tempImg.naturalWidth / tempImg.naturalHeight;

      if (ratio >= 1) {
        zoomImg.style.width = `${maxWidth}px`;
        zoomImg.style.height = `${maxWidth / ratio}px`;
      } else {
        zoomImg.style.height = `${maxHeight}px`;
        zoomImg.style.width = `${maxHeight * ratio}px`;
      }

      zoomImg.src = src;
      zoomImg.style.display = "block";
      moveZoomPreview(event, zoomImg);
      zoomImg.classList.add("show");
    };
    tempImg.src = src;
  }
}

function moveZoomPreview(event, elem = zoomImg) {
  if (!elem) return;
  let x = event.clientX + 90;
  let y = event.clientY - 120;
  const maxX = window.innerWidth - elem.clientWidth - 10;
  const maxY = window.innerHeight - elem.clientHeight - 20;
  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;
  elem.style.left = `${x}px`;
  elem.style.top = `${y}px`;
}

function hideZoomPreview() {
  if (zoomImg) zoomImg.classList.remove("show");
  if (zoomVideo) zoomVideo.classList.remove("show");
}

  
  let wasMobile = isMobile();

window.addEventListener("resize", () => {
  const isNowMobile = isMobile();

  // Переход с мобилки на десктоп
  if (wasMobile && !isNowMobile) {
    shuffleImages(); // подгрузим картинки
    if (!zoomImage) {
      zoomImage = document.createElement("img");
      zoomImage.className = "zoom-preview";
      document.body.appendChild(zoomImage);
    }
  }

  // Обновляем флаг
  wasMobile = isNowMobile;
});

});


// === Видос по клику на бульдога ===
document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector(".sidebar-dog");
  const videoWrapper = document.querySelector(".video-wrapper");
  const closeBtn = document.querySelector(".close-video");
  const video = document.querySelector(".custom-video");
  const videoInner = document.querySelector(".video-inner");

  if (trigger && videoWrapper && closeBtn && video && videoInner) {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      videoWrapper.classList.add("active");
      
      // Подстраховка: перезагрузить видео если оно не готово
      if (video.readyState < 3) {
        video.load();
      }

      video.play().catch(err => {
        console.warn("Видео не запустилось автоматически:", err);
      });
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.pause();
      videoWrapper.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
      if (
        videoWrapper.classList.contains("active") &&
        !e.target.closest(".video-inner") &&
        !e.target.closest(".sidebar-dog")
      ) {
        video.pause();
        videoWrapper.classList.remove("active");
      }
    });

    videoInner.addEventListener("click", (e) => e.stopPropagation());
  }
});


  // js для ТАБОВ
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  function showContent(type) {
    contents.forEach(el => {
      el.classList.remove("content-active");
    });

    const toShow = type === "all"
      ? contents
      : document.querySelectorAll(`.content-${type}`);

    toShow.forEach(el => {
      el.classList.add("content-active");
    });

    gsap.fromTo(toShow, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "none", stagger: 0.1 }
    );
  }

  // === навешиваем клики на табы
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");

      const type = tab.className.match(/tab-([a-z]+)/)[1];
      showContent(type);
    });
  });

  // 💥 Активируем первый таб с анимацией
  const defaultTab = document.querySelector(".tab-all");
  if (defaultTab) {
    defaultTab.classList.add("tab-active");
    requestAnimationFrame(() => {
      showContent("all");
    });
  }

    const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (
      entry.isIntersecting &&
      entry.target.classList.contains("content-active") &&
      !entry.target.classList.contains("was-animated")
    ) {
      const items = entry.target.querySelectorAll(".case-header, .case-images img");

      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
      );

      entry.target.classList.add("was-animated");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".tab-content").forEach(el => {
  observer.observe(el);
});

});



document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".top-text-text1");

  targets.forEach((el, index) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = "";

    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.marginRight = "8px";
      span.style.filter = "blur(4px)";
      el.appendChild(span);
    });

    // 💥 ВАЖНО: убрать .preload-hidden перед анимацией
    el.classList.remove("preload-hidden");

    gsap.fromTo(
      el.querySelectorAll("span"),
      {
        opacity: 0,
        y: 40,
        filter: "blur(9px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 1.8,
        stagger: 0.15,
        delay: index * 0.4
      }
    );
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".contact-button");
  const formWrapper = document.querySelector(".contact-form-wrapper");
  const closeBtn = document.querySelector(".close-contact-form");

  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formWrapper.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    formWrapper.classList.remove("active");
  });

  document.addEventListener("click", (e) => {
    if (
      formWrapper.classList.contains("active") &&
      !formWrapper.contains(e.target) &&
      !contactBtn.contains(e.target)
    ) {
      formWrapper.classList.remove("active");
    }
  });
});





document.getElementById("custom-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.elements["name"].value.trim();
  const contact = form.elements["contact"].value.trim();
  const message = form.elements["message"].value.trim();

  const text = `
Новая заявка с сайта:
Имя: ${name}
Контакт: ${contact}
Сообщение: ${message}
  `;

  fetch(`https://api.telegram.org/bot7693153004:AAGcxe8zke62QvST_H6DZ10pL-T-N93-b54/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: "565884997",
      text: text
    }),
  })
.then(res => {
if (res.ok) {
  const successMsg = document.querySelector(".form-success-message");

  // показываем
  successMsg.classList.add("show");

  // прячем форму через 3 секунды
  setTimeout(() => {
    successMsg.classList.remove("show");
    document.querySelector(".contact-form-wrapper").classList.remove("active");
  }, 3000);

  form.reset();
}

})

    .catch(err => {
      console.error("Telegram Error:", err);
      alert("Сервер лёг. Пиши в телегу вручную.");
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".title-wrapper");
  const bulldog = document.querySelector(".sidebar-dog");

  // Клик по булке — открытие видео и стоп всплытия
  bulldog.addEventListener("click", (e) => {
    e.stopPropagation(); // отменяем всплытие, чтобы не триггерился скролл
    const videoWrapper = document.querySelector(".video-wrapper");
    const video = document.querySelector(".custom-video");

    videoWrapper.classList.add("active");

    if (video.readyState < 3) {
      video.load();
    }

    video.play().catch((err) => {
      console.warn("Видео не запустилось автоматически:", err);
    });
  });

  // Клик по title-wrapper — скролл вверх, если это не булка
  title.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab");

  gsap.to(tabButtons, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "none",
    stagger: 0.1,
    delay: 0.2 // чуть позже, чтобы не по голове сразу
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const topText2 = document.querySelectorAll(".top-text-text2");

  gsap.to(topText2, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "none",
    stagger: 0.1,
    delay: 0.2 // чуть позже, чтобы не по голове сразу
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sideBarHeader = document.querySelectorAll(".uc-sidebar-container");

  gsap.to(sideBarHeader, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    delay: 0.2 // чуть позже, чтобы не по голове сразу
  });
});



function updateShuffleBtnPosition() {
  const btn = document.querySelector(".shuffle-btn-wrapper");
  const bg = document.querySelector(".sidebar-mixer-bg.mobile-fix-bg");
  const mobileImgContainer = document.querySelector(".mobile-image-container");

  if (!window.visualViewport) return;

  const offset = window.innerHeight - window.visualViewport.height;

  if (btn) btn.style.transform = `translateY(-${offset}px)`;
  if (bg) bg.style.transform = `translateY(-${offset}px)`;
  if (mobileImgContainer) mobileImgContainer.style.transform = `translate(-50%, calc(0px - ${offset}px))`;
}




// навешиваем обновление позиции при любом изменении viewport'а
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", updateShuffleBtnPosition);
  window.visualViewport.addEventListener("scroll", updateShuffleBtnPosition);
  window.addEventListener("orientationchange", updateShuffleBtnPosition);
}

// вызываем при загрузке
document.addEventListener("DOMContentLoaded", updateShuffleBtnPosition);



document.querySelectorAll('video').forEach(video => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
if (entry.isIntersecting) {
  if (!video.paused && !video.dataset.userPaused) {
    video.play().catch(() => {});
  }
} else {
  if (!video.paused) {
    video.pause();
  }
}

    });
  }, { threshold: 0.1 });

  observer.observe(video);
});


document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll('.case-images video');

  videos.forEach(video => {
    const caseBlock = video.closest('.tab-content');
    const videoWrapper = video.closest('.case-images');
    const title = videoWrapper?.previousElementSibling?.querySelector('.case-title');

    if (title) {
      video.addEventListener('mouseenter', () => {
        title.classList.add('hovered');
      });

      video.addEventListener('mouseleave', () => {
        title.classList.remove('hovered');
      });
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const buttonsContainer = document.querySelector(".sidebar-footer-mobile .buttons-container");
  const hoverWrapper = document.querySelector(".sidebar-footer-mobile .hover-wrapper");

  if (!buttonsContainer || !hoverWrapper) return;

  // Клик по триггеру — toggle
  hoverWrapper.addEventListener("click", (e) => {
    e.stopPropagation();

    const isVisible = buttonsContainer.classList.contains("visible");

    buttonsContainer.classList.toggle("visible");
    buttonsContainer.style.opacity = isVisible ? "0" : "1";
    buttonsContainer.style.pointerEvents = isVisible ? "none" : "auto";
  });

  // Клик вне — скрыть
  document.addEventListener("click", (e) => {
    const clickedInside = buttonsContainer.contains(e.target) || hoverWrapper.contains(e.target);
    if (!clickedInside && buttonsContainer.classList.contains("visible")) {
      buttonsContainer.classList.remove("visible");
      buttonsContainer.style.opacity = "0";
      buttonsContainer.style.pointerEvents = "none";
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.case-images').forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playButton = wrapper.querySelector('.custom-play-button');

    if (video && playButton) { // <- проверяем что оба элемента есть
      video.removeAttribute('controls');

      playButton.addEventListener('click', () => {
        video.setAttribute('controls', true);
        playButton.style.display = 'none';
        video.play();
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  
    const videos = document.querySelectorAll('video.looped');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;

            if (entry.isIntersecting) {
                // Если видео видно, пытаемся запустить
                if (video.paused) {
                    video.play().catch(err => {
                        console.error('Ошибка запуска видео:', err);
                    });
                }
            } else {
                // Когда видео уходит с экрана — ставим на паузу (опционально)
                // Если хочешь, чтобы оно реально всегда в фоне играло — этот кусок убирай
                // video.pause();
            }
        });
    }, {
        threshold: 0.25 // хотя бы 25% видно — уже считаем видимым
    });

    videos.forEach(video => {
        observer.observe(video);
    });
});





