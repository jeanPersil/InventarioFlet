function carregarProdutos() {
  fetch("/api/listar")
    .then((resposta) => resposta.json())
    .then((itens) => {
      const listaProduto = document.querySelector("[listaProduto]");

      itens.forEach((item) => {
        const linha = document.createElement("tr");

        const linhaID = document.createElement("td");
        const linhaNome = document.createElement("td");
        const linhaPreco = document.createElement("td");
        const linhaQuantidade = document.createElement("td");

        linhaID.textContent = item.id;
        linhaNome.textContent = item.nome;
        linhaPreco.textContent = `R$ ${item.preco.toFixed(2)}`;
        linhaQuantidade.textContent = item.quantidade;

        linha.appendChild(linhaID);
        linha.appendChild(linhaNome);
        linha.appendChild(linhaPreco);
        linha.appendChild(linhaQuantidade);

        listaProduto.appendChild(linha);

        console.log(
          `Id: ${item.id}, nome: ${item.nome}, preco: ${item.preco}, quantidade: ${item.quantidade}`
        );
      });
    });
}
window.onload = carregarProdutos;
