import "bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800, // cât durează animația (în ms)
  once: true, // 🔥 nu mai reanimează la scroll înapoi
});

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const content = document.querySelector(".hero__content");
  const offset = window.scrollY;

  hero.style.backgroundPositionY = `${offset * 0.5}px`;
  content.style.transform = `translateY(${offset * 0.2}px)`; // mișcare ușoară și sincronă
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
