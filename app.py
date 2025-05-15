from flask import Flask, render_template, jsonify, request
import sqlite3

app = Flask(__name__)


def criar_banco():
    conn = sqlite3.connect("estoque.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco FLOAT,
            quantidade INT
        )
    ''')
    conn.commit()
    conn.close()

criar_banco()

@app.route("/")
def home():
    return render_template("/adicionar.html")

@app.route("/paginaListar")
def pagListar():
    return render_template("/listar.html")


@app.route("/api/adicionar", methods=["POST"])
def adicionar():
    dados = request.json
    nome = dados["nome"]
    preco = dados["preco"]
    quantidade = dados["quantidade"]

    conn = sqlite3.connect('estoque.db')
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO produtos(nome, preco, quantidade) VALUES (?, ?, ?)',
        (nome, preco, quantidade)
    )
    conn.commit()
    conn.close()

    return jsonify({'mensagem': 'Produto adicionado com sucesso!',
                    'produto': {
                        'nome': nome,
                        'preco': preco,
                        'quantidade': quantidade
                    } })

@app.route("/api/listar")
def listagemDeProdutos():
    conn = sqlite3.connect('estoque.db')
    cursor = conn.cursor()
    cursor.execute('SELECT id, nome, preco, quantidade FROM produtos')
    produtos =[linha[0] for linha in cursor.fetchall()]
    conn.close()
    return jsonify(produtos)


if __name__ == '__main__':
    app.run(debug=True)

    

