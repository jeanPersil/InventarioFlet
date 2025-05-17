import { carregarProdutos, enviarExclusao, enviarEdicaoAPI } from "./api.js";

const modal = document.querySelector(".modal");
const cancelar = document.getElementById("cancelar");
const listarProdutos = document.querySelector("[listarProdutos]");

function abrirModal() {
  modal.classList.add("mostrar");
}

function fecharModal() {
  modal.classList.remove("mostrar");
}

cancelar.addEventListener("click", fecharModal);

listarProdutos.addEventListener("click", () => {
  window.location.href = "/";
});

function carregarItens() {
  carregarProdutos().then((itens) => {
    const listaProduto = document.querySelector("[listaProduto]");
    listaProduto.innerHTML = "";
    itens.forEach((item) => {
      const linha = document.createElement("tr");

      const linhaID = document.createElement("td");
      const linhaNome = document.createElement("td");
      const linhaPreco = document.createElement("td");
      const linhaQuantidade = document.createElement("td");
      const linhaAcoes = document.createElement("td");

      const botaoEditar = document.createElement("button");
      const botaoDelete = document.createElement("button");

      botaoEditar.textContent = "Editar";
      botaoEditar.classList.add("editar");

      botaoDelete.textContent = "Excluir";
      botaoDelete.classList.add("excluir");

      botaoEditar.addEventListener("click", () => {
        telaDeEdicao(item.id, item.nome, item.preco, item.quantidade);
      });

      botaoDelete.addEventListener("click", () => {
        const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
        if (confirmacao) {
          enviarExclusao(item.id).then(() => carregarItens());
        }
      });

      linhaID.textContent = item.id;
      linhaNome.textContent = item.nome;
      linhaPreco.textContent = `R$ ${item.preco.toFixed(2)}`;
      linhaQuantidade.textContent = item.quantidade;

      linhaAcoes.appendChild(botaoEditar);
      linhaAcoes.appendChild(botaoDelete);

      linha.appendChild(linhaID);
      linha.appendChild(linhaNome);
      linha.appendChild(linhaPreco);
      linha.appendChild(linhaQuantidade);
      linha.appendChild(linhaAcoes);

      listaProduto.appendChild(linha);
    });
  });
}

function verificarValoresFalsos(valor) {
  return valor < 0 || valor === "";
}

function telaDeEdicao(id, produto, preco, quantidade) {
  const formModal = document.getElementById("formModal");
  const nome_input = document.getElementById("nome_input");
  const preco_input = document.getElementById("preco_input");
  const quantidade_input = document.getElementById("quantidade_input");

  abrirModal();

  nome_input.value = produto;
  preco_input.value = preco;
  quantidade_input.value = quantidade;

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
      id_do_produto: id,
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
