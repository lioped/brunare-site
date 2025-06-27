import "bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

AOS.init({
  duration: 800, // cât durează animația (în ms)
  once: true, // 🔥 nu mai reanimează la scroll înapoi
});

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const content = document.querySelector(".hero__content");

  if (!hero || !content) return; // 🔒 oprește funcția dacă lipsește oricare

  const offset = window.scrollY;

  hero.style.backgroundPositionY = `${offset * 0.5}px`;
  content.style.transform = `translateY(${offset * 0.2}px)`;
});

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const isPercent = counter.dataset.percent === "true";
    const duration = 1200;
    const increment = target / (duration / 16);

    let value = 0;

    const update = () => {
      value += increment;
      if (value < target) {
        counter.textContent = Math.floor(value);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + (isPercent ? "%" : "");
      }
    };

    update();
  });
}

// activează când intră în viewport
const section = document.querySelector(".stats-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        document.querySelectorAll(".stat-box").forEach((el) => el.classList.add("visible"));
        observer.disconnect(); // rulează o singură dată
      }
    });
  },
  { threshold: 0.5 }
);

if (section) observer.observe(section);

const supportSection = document.querySelector(".support-section");

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        supportSection.classList.add("visible");
        observer2.disconnect(); // rulează o singură dată
      }
    });
  },
  { threshold: 0.4 }
);

if (supportSection) observer2.observe(supportSection);

const form = document.getElementById("contact-form");
const thankYouMessage = document.getElementById("thank-you-message");
const title = document.querySelector(".section-title");
const contactSection = document.querySelector(".contact-section");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Previne ridicarea footerului
    contactSection.style.minHeight = contactSection.offsetHeight + "px";

    emailjs
      .sendForm("service_pbnverp", "template_iqdlv13", form, "sO9m6w1J6FSg5Yh2i")
      .then(() => {
        form.style.display = "none";
        thankYouMessage.style.display = "block";
        if (title) title.style.display = "none";

        setTimeout(() => {
          window.location.href = "index.html";
        }, 5000);
      })
      .catch((error) => {
        console.error("Eroare la trimitere:", error);
      });
  });
}
