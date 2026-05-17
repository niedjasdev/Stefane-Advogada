//Mostrar backgroud do header ao scrollar a pág
window.addEventListener("scroll", () => {
  const scrollBar = document.querySelector("header");
  if (window.scrollY > 50) {
    scrollBar.classList.add("scrolled");
  } else {
    scrollBar.classList.remove("scrolled");
  }
});

//Menu hamburguer

const menu = document.querySelector(".menu-hamburguer");
const navList = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar__link");

menu.addEventListener("click", () => {
  navList.classList.toggle("active");
  menu.classList.toggle("active");

  //Ação do leitor de tela ao clicar no menu hamburguer,
  // Verifica se está aberto ou fechado
  const isExpanded = navList.classList.contains("active");

  // Atualiza aria-expanded dinamicamente
  menu.setAttribute("aria-expanded", isExpanded);
});

// Fechar o menu ao clicar em um link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove a classe active do menu e da lista
    navList.classList.remove("active");
    menu.classList.remove("active");

    // Atualiza o aria-expanded para false também ao clicar no link
    menu.setAttribute("aria-expanded", "false");
  });
});

// Intersection Observer para animações ao scroll
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  },
);

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});

// Validação formulario

// Máscara de telefone (Formata enquanto digita)
const inputPhone = document.querySelector("#phone");
inputPhone.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
  if (value.length >= 11) value = value.slice(0, 11); // Limita a 11 dígitos

  value = value
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2"); // formato (00) 00000-0000 usando regex

  e.target.value = value;
});

//Mostrar os erros quando houver

const showError = (input, message) => {
  const errorId = document.getElementById(`${input.id}-error`);
  errorId.textContent = message;
  input.classList.add("input-error");
};

const clearError = (input) => {
  const errorId = document.getElementById(`${input.id}-error`);
  errorId.textContent = "";
  input.classList.remove("input-error");
};

//validação ao enviar
const form = document.querySelector("form");
const fields = form.querySelectorAll("input, textarea");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  fields.forEach((field) => {
    if (field.value.trim() === "") {
      showError(field, "Este campo é obrigatório!");
      isFormValid = false;
    } else {
      clearError(field);
    }
  });

  if (isFormValid) {
    alert("ok");
    form.reset();
  }
});
