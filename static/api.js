export function adicionarProduto({ nome, preco, quantidade }) {
  return fetch("/api/adicionar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, preco, quantidade }),
  }).then((resposta) => resposta.json());
}

export function carregarProdutos() {
  return fetch("/api/listar").then((res) => res.json());
}

export function enviarEdicaoAPI({
  id_do_produto,
  nomeDoProduto,
  precoDoProduto,
  quantidade,
}) {
  return fetch("/api/editar", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id_do_produto,
      nome: nomeDoProduto,
      preco: precoDoProduto,
      quantidade,
    }),
  });
}

export function enviarExclusao(id_do_produto) {
  return fetch("/api/deletar", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id_do_produto }),
  }).then((resp) => resp.json());
}
