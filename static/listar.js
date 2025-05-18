import { carregarProdutos, enviarExclusao, enviarEdicaoAPI } from "./api.js";
import { verificarValoresFalsos } from "./utils/validacoes.js";
import { criarLinhaTabela, abrirModal, fecharModal } from "./utils/helpers.js";

const modal = document.querySelector(".modal");
const cancelar = document.getElementById("cancelar");
const listarProdutos = document.querySelector("[listarProdutos]");

cancelar.addEventListener("click", fecharModal);

listarProdutos.addEventListener("click", () => {
  window.location.href = "/";
});

function carregarItens() {
  carregarProdutos().then((itens) => {
    const listaProduto = document.querySelector("[listaProduto]");
    listaProduto.innerHTML = "";
    itens.forEach((item) => {
      const linha = criarLinhaTabela(item, {
        editar: telaDeEdicao,
        excluir: (id) => {
          enviarExclusao(id).then(() => carregarItens());
        },
      });
      listaProduto.appendChild(linha);
    });
  });
}

function telaDeEdicao(item) {
  const formModal = document.getElementById("formModal");
  const nome_input = document.getElementById("nome_input");
  const preco_input = document.getElementById("preco_input");
  const quantidade_input = document.getElementById("quantidade_input");

  abrirModal();

  nome_input.value = item.nome;
  preco_input.value = item.preco;
  quantidade_input.value = item.quantidade;

  formModal.onsubmit = (e) => {
    e.preventDefault();

    const novoNome = nome_input.value;
    const novoPreco = parseFloat(preco_input.value);
    const novaQuantidade = parseInt(quantidade_input.value);

    if (
      verificarValoresFalsos(novoNome) ||
      verificarValoresFalsos(novoPreco) ||
      verificarValoresFalsos(novaQuantidade)
    ) {
      alert("Preencha os campos com valores válidos!");
      return;
    }

    enviarEdicaoAPI({
      id_do_produto: item.id,
      nomeDoProduto: novoNome,
      precoDoProduto: novoPreco,
      quantidade: novaQuantidade,
    }).then(() => {
      fecharModal();
      carregarItens();
    });
  };
}

window.onload = carregarItens;
