export function criarLinhaTabela(item, { editar, excluir }) {
  const linha = document.createElement("tr");

  const colunaID = document.createElement("td");
  const colunaNome = document.createElement("td");
  const colunaPreco = document.createElement("td");
  const colunaQuantidade = document.createElement("td");
  const linhaAcoes = document.createElement("td");

  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.classList.add("editar");
  botaoEditar.addEventListener("click", () => editar(item));

  const botaoDelete = document.createElement("button");
  botaoDelete.textContent = "Excluir";
  botaoDelete.classList.add("excluir");
  botaoDelete.addEventListener("click", () => {
    const confirmacao = confirm("Tem certeza que deseja excluir?");
    if (confirmacao) excluir(item.id);
  });
  colunaID.textContent = item.id;
  colunaNome.textContent = item.nome;
  colunaPreco.textContent = `R$ ${item.preco.toFixed(2)} `;
  colunaQuantidade.textContent = item.quantidade;

  linhaAcoes.appendChild(botaoEditar);
  linhaAcoes.appendChild(botaoDelete);

  linha.appendChild(colunaID);
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPreco);
  linha.appendChild(colunaQuantidade);
  linha.appendChild(linhaAcoes);

  return linha;
}

export function abrirModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("mostrar");
}

export function fecharModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("mostrar");
}
