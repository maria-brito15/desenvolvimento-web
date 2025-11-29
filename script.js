document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    answer.style.maxHeight = "0px";
    answer.style.overflow = "hidden";
    answer.style.opacity = "0";
    answer.style.transition =
      "max-height 0.5s ease, padding 0.5s ease, margin 0.5s ease, opacity 0.5s ease";

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          const otherAnswer = otherItem.querySelector(".faq-answer");

          otherAnswer.style.overflow = "hidden";

          void otherAnswer.offsetHeight;

          otherAnswer.style.maxHeight = "0px";
          otherAnswer.style.paddingTop = "0";
          otherAnswer.style.marginTop = "0";
          otherAnswer.style.opacity = "0";
          otherItem.classList.remove("active");

          const otherIcon = otherItem.querySelector(".faq-question i");
          otherIcon.style.transform = "rotate(0deg)";
        }
      });

      if (isActive) {
        answer.style.overflow = "hidden";

        void answer.offsetHeight;

        answer.style.maxHeight = "0px";
        answer.style.paddingTop = "0";
        answer.style.marginTop = "0";
        answer.style.opacity = "0";

        item.classList.remove("active");
        question.querySelector("i").style.transform = "rotate(0deg)";
      } else {
        item.classList.add("active");
        answer.style.overflow = "hidden";

        const contentHeight = answer.scrollHeight;

        void answer.offsetHeight;

        answer.style.maxHeight = contentHeight + 50 + "px";
        answer.style.paddingTop = "1rem";
        answer.style.marginTop = "1rem";
        answer.style.opacity = "1";

        setTimeout(() => {
          if (item.classList.contains("active")) {
            answer.style.overflow = "visible";
          }
        }, 500);

        question.querySelector("i").style.transform = "rotate(180deg)";
      }
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    }
  });
});

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    const formStatus = document.getElementById("form-status");

    formStatus.innerHTML =
      '<div class="alert alert-info">Enviando mensagem...</div>';

    setTimeout(() => {
      formStatus.innerHTML =
        '<div class="alert alert-success">✓ Mensagem enviada com sucesso! Retornarei em breve.</div>';
    }, 1000);
  });
}

const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("bi-moon-stars-fill");
  themeIcon.classList.add("bi-sun-fill");
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeIcon.classList.remove("bi-moon-stars-fill");
    themeIcon.classList.add("bi-sun-fill");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-stars-fill");
    localStorage.setItem("theme", "light");
  }
});
