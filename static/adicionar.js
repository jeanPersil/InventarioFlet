import { adicionarProduto } from "./api.js";
import { verificarValoresFalsos } from "./utils/validacoes.js";

const formProdutos = document.getElementById("formProdutos");
const listarProdutos = document.querySelector("[listarProdutos]");

formProdutos.addEventListener("submit", (e) => {
  e.preventDefault();

  const nomeDoProduto = document.getElementById("nomeDoProduto");
  const precoDoProduto = document.getElementById("precoDoProduto");
  const quantidade = document.getElementById("quantidade");

  if (
    verificarValoresFalsos(nomeDoProduto.value) ||
    verificarValoresFalsos(precoDoProduto.value) ||
    verificarValoresFalsos(quantidade)
  ) {
    alert("Por favor, insira valores validos.");
    return;
  }

  adicionarProduto({
    nome: nomeDoProduto.value,
    preco: parseFloat(precoDoProduto.value),
    quantidade: parseFloat(quantidade.value),
  }).then((data) => {
    alert(data.mensagem);
    nomeDoProduto.value = "";
    precoDoProduto.value = "";
    quantidade.value = "";
  });
});

listarProdutos.addEventListener("click", () => {
  window.location.href = "/paginaListar";
});
