const menuToggle = document.querySelector(".menu-toggle .input");
const navUl = document.querySelector("nav ul");
const nav = document.querySelector("nav");
const logo = document.querySelector(".logo img");
const linkBeranda = document.querySelector(".beranda");
const linkTentang = document.querySelector(".tentang");
const linkKelompok = document.querySelector(".kelompok");
const linkKontak = document.querySelector(".kontak");
const links = document.querySelectorAll(".link");

menuToggle.addEventListener("click", () => {
  navUl.classList.toggle("slide");
});

window.addEventListener("scroll", (e) => {
  let scroll = this.scrollY;
  if (!scroll || scroll < 0) {
    // add class active link to nav link
    linkBeranda.className = "active";
  } else {
    if (scroll > 650) {
      // size logo
      logo.className = "logo-small";
      // add class to element
      nav.className = "nav-bg-primary";

      // navlink tentang
      if (scroll >= 650 && scroll <= 1200) {
        // add class active link to nav link
        linkTentang.className = "active";
      } else {
        // remove class active link to nav link
        linkTentang.className = "";
      }

      if (scroll > 1360 && scroll <= 7730) {
        // add class active link to nav link
        linkKelompok.className = "active";
      } else {
        // remove class active link to nav link
        linkKelompok.className = "";
      }

      if (scroll > 8370) {
        // add class active link to nav link
        linkKontak.className = "active";
      } else {
        // remove class active link to nav link
        linkKontak.className = "";
      }

      // remove class active link to nav link
      linkBeranda.className = "";
    } else {
      // remove class logo-small
      logo.className = "";

      // remove if up scroll
      // remove class to element
      nav.className = "";

      // remove class active link to nav link
      linkTentang.className = "";
    }
  }
});

let TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
