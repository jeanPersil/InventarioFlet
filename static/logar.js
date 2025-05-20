import { realizarLogin } from "./api.js";

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", (e) => {
  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;
  e.preventDefault();
  realizarLogin({ user: login, senha: senha });
});
