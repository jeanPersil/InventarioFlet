const formProdutos = document.getElementById("formProdutos");
const listarProdutos = document.querySelector("[listarProdutos]");

formProdutos.addEventListener("submit", (e) => {
  e.preventDefault();

  const nomeDoProduto = document.getElementById("nomeDoProduto");
  const precoDoProduto = document.getElementById("precoDoProduto");
  const quantidade = document.getElementById("quantidade");

  function isInvalido(valor) {
    return valor === "" || valor < 0;
  }

  if (
    isInvalido(nomeDoProduto.value) ||
    isInvalido(precoDoProduto.value) ||
    isInvalido(quantidade)
  ) {
    alert("Por favor, insira valores validos.");
    return;
  }
  fetch("/api/adicionar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nomeDoProduto.value,
      preco: parseFloat(precoDoProduto.value),
      quantidade: parseFloat(quantidade.value),
    }),
  })
    .then((resposta) => resposta.json())
    .then((data) => {
      alert(data.mensagem);
      nomeDoProduto.value = "";
      precoDoProduto.value = "";
      quantidade.value = "";
    });
});

listarProdutos.addEventListener("click", () => {
  window.location.href = "/paginaListar";
});
