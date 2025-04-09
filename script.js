document.addEventListener("DOMContentLoaded", function () {
  function updateShuffleBtnPosition() {
  const btnWrapper = document.querySelector('.shuffle-btn-wrapper');
  if (!btnWrapper || !window.visualViewport) return;

  const offset = window.innerHeight - window.visualViewport.height;
  btnWrapper.style.transform = `translateY(-${offset}px)`;
}

if (window.visualViewport) {
  // Реакция на изменение высоты
  window.visualViewport.addEventListener('resize', updateShuffleBtnPosition);
  window.visualViewport.addEventListener('scroll', updateShuffleBtnPosition);
  window.addEventListener('orientationchange', updateShuffleBtnPosition);

  // 🧨 Хардкорный интервал – обновляем раз в 500мс
  setInterval(updateShuffleBtnPosition, 500);
  
  // первый запуск
  updateShuffleBtnPosition();
}
  
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
  "img/8marta2025.gif",
  "img/Academy1.png",
  "img/ARS_1039.jpg",
  "img/Calltouch_Key_Partner_V1.png",
  "img/CVD3_Poster1_Tech_FINAL.jpg",
  "img/CT_BucketHat_5.jpg",
  "img/CTLeads1_Turk_Gal_1080x1080_2.png",
  "img/Chem_pomoch.png",
  "img/Callday-SA22-animation.gif",
  "img/CT22_Black_Tshirt_3.png",
  "img/Academy.png",
  "img/GDB_1.jpg",
  "img/Libre_final.png",
  "img/Stand24-Masha-edition-v2.jpg",
  "img/Welcome.gif",
  "img/bolshaya-kurtka.png",
  "img/ct-seashell.png",
  "img/ct-navigation.gif",
  "img/discount-case.png",
  "img/email-rocket.gif",
  "img/g8-balls.png",
  "img/g8-gloves.png",
  "img/g8-raketka.png",
  "img/icon_dice.svg",
  "img/illustartion_Antifraud.png",
  "img/krugly_stol.png",
  "img/merch2021.png",
  "img/notebook2024_1b.png",
  "img/octopus_anim.gif",
  "img/okrizka.jpg",
  "img/photo.png",
  "img/play-practice.png",
  "img/quiz1.jpg",
  "img/Quiz22_Bad_v2.jpg",
  "img/red_skull.jpeg",
  "img/result_3_1100x600.png",
  "img/robot-people-muppets.png",
  "img/sch_ny_tree.png",
  "img/SHUBER1.png",
  "img/test-money-guy.png",
  "img/vizitki2.png",
  "img/zaba-3d.gif",
  "img/zhaba-3d.gif",
  "img/API.png",
  "img/photo_2024-04-26_09-.jpg"
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
document.querySelector(".uc-sidebar-container").appendChild(mobileImgWrapper);


  function getRandomImages(count = 3) {
    return [...imageUrls].sort(() => 0.5 - Math.random()).slice(0, count);
  }

  function loadImageWithPixelEffect(canvas, imageUrl) {
    const ctx = canvas.getContext("2d");
    canvas.width = 100;
    canvas.height = 100;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    canvas.onmouseenter = (e) => showZoomPreview(e, imageUrl);
    canvas.onmousemove = (e) => moveZoomPreview(e);
    canvas.onmouseleave = hideZoomPreview;

    img.onload = function () {
      let scaleSteps = [5, 10, 20, 40, 80, 100];
      let stepIndex = 0;
      let imgRatio = img.width / img.height;
      let cropSize = imgRatio > 1 ? img.height : img.width;
      let sx = (img.width - cropSize) / 2;
      let sy = (img.height - cropSize) / 2;

      function drawPixelated() {
        let scale = scaleSteps[stepIndex++];
        if (scale >= 100) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx.imageSmoothingEnabled = true;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } else {
          ctx.imageSmoothingEnabled = false;
          ctx.clearRect(0, 0, 100, 100);
          ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, scale, scale);
          ctx.drawImage(canvas, 0, 0, scale, scale, 0, 0, 100, 100);
          setTimeout(drawPixelated, 100);
          
         // Показываем анимацию
mobileImg.classList.remove("hide");
mobileImg.classList.add("show", "pixel-anim");

// Снимаем класс после анимации, чтобы можно переиспользовать

        }
      }

      drawPixelated();
    };
  }
  
  function isMobile() {
    return window.innerWidth <= 960;
  }
  
// === при клике на shuffle показываем одну картинку с анимацией ===
function shuffleImages() {
  const randomImages = getRandomImages();

if (isMobile()) {
  const [randomImage] = randomImages;

  mobileImg.classList.remove("show");
  mobileImg.classList.add("hide");

  setTimeout(() => {
    const tempImg = new Image();
    tempImg.src = randomImage;

tempImg.onload = () => {
  mobileImg.src = randomImage;

  // форсим перерисовку изображения
  void mobileImg.offsetWidth;

  mobileImg.classList.remove("hide");
  mobileImgWrapper.classList.remove("hide");
  mobileImg.classList.add("show");
  mobileImgWrapper.classList.add("show");

// 💥 ПЕРЕЗАПУСК АНИМАЦИИ КРЕСТИКА
closeBtn.classList.remove("show", "hide");

// форс ремап потока
void closeBtn.offsetWidth;

// сброс анимации
closeBtn.style.transition = "none";
closeBtn.classList.remove("show");
closeBtn.classList.add("hide");

// ещё один форс релоад
void closeBtn.offsetWidth;

// заново включаем анимацию и возвращаем transition
closeBtn.style.transition = ""; // или явно: "opacity 0.3s ease, transform 0.3s ease";
closeBtn.classList.remove("hide");
closeBtn.classList.add("show");

};
}, 100);
}
 else {
    canvases.forEach((canvas, i) => {
      loadImageWithPixelEffect(canvas, randomImages[i]);
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

  shuffleImages(); // <--- тут просто вызываем
});
  
closeBtn.addEventListener("click", () => {
mobileImg.classList.remove("show");
mobileImg.classList.add("hide");

mobileImgWrapper.classList.remove("show");
mobileImgWrapper.classList.add("hide");
  
closeBtn.classList.remove("show");
closeBtn.classList.add("hide");


setTimeout(() => {
  mobileImg.removeAttribute("src");
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









  // Зум-превью работает только на десктопе
  let zoomImage = null;

  if (!isMobile()) {
    zoomImage = document.createElement("img");
    zoomImage.className = "zoom-preview";
    document.body.appendChild(zoomImage);
  }

  function showZoomPreview(event, src) {
    if (!zoomImage) return;
    zoomImage.classList.remove("show");
    const tempImg = new Image();
    tempImg.onload = function () {
      const maxWidth = 440;
      const maxHeight = 440;
      const ratio = tempImg.naturalWidth / tempImg.naturalHeight;

      if (ratio >= 1) {
        zoomImage.style.width = `${maxWidth}px`;
        zoomImage.style.height = `${maxWidth / ratio}px`;
      } else {
        zoomImage.style.height = `${maxHeight}px`;
        zoomImage.style.width = `${maxHeight * ratio}px`;
      }

      zoomImage.src = src;
      moveZoomPreview(event);
      zoomImage.classList.add("show");
    };
    tempImg.src = src;
  }

  function moveZoomPreview(event) {
    if (!zoomImage) return;
    let x = event.clientX + 90;
    let y = event.clientY - 120;
    const maxX = window.innerWidth - zoomImage.clientWidth - 10;
    const maxY = window.innerHeight - zoomImage.clientHeight - 20;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;
    zoomImage.style.left = `${x}px`;
    zoomImage.style.top = `${y}px`;
  }

  function hideZoomPreview() {
    if (!zoomImage) return;
    zoomImage.classList.remove("show");
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
  const trigger = document.querySelector(".bulldog-wrapper");
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
        !e.target.closest(".bulldog-wrapper")
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
  const bulldog = document.querySelector(".bulldog-wrapper");

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

