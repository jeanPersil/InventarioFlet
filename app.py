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


def criarLoginAdmin():
    conn = sqlite3.connect("estoque.db")
    cursor = conn.cursor()

    cursor.execute(''' 
        CREATE TABLE IF NOT EXISTS loginUsuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            tipo TEXT NOT NULL
        )
    ''')

    try:
        cursor.execute('''
            INSERT INTO loginUsuarios (usuario, senha, tipo)
            VALUES (?, ?, ?)
        ''', ('admin', 'admin123', 'admin'))
    except sqlite3.IntegrityError:
        print("Usuário 'admin' já existe.")

    conn.commit()
    conn.close()



criarLoginAdmin()
criar_banco()



@app.route('/')
def login():
    return render_template('login.html')


@app.route("/api/pagAdicionar")
def home():
    return render_template("/adicionar.html")


@app.route("/paginaListar")
def pagListar():
    return render_template("/listar.html")


@app.route("/api/login", methods=["POST"])
def logarUsuario():
    dados = request.json
    usuario = dados["user"]
    senha = dados["senha"]

    conn = sqlite3.connect("estoque.db")
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM loginUsuarios
        WHERE usuario = ? AND senha = ?
    ''', (usuario, senha))

    resultado = cursor.fetchone()
    conn.close()

    if resultado:
        return jsonify({"mensagem": "Login bem-sucedido", "usuario": usuario}), 200
    else:
        return jsonify({"erro": "Usuário ou senha inválidos"}), 401

    
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
    produtos = [
    {"id": linha[0], "nome": linha[1], "preco": linha[2], "quantidade": linha[3]}
    for linha in cursor.fetchall()
    ]
    conn.close()
    return jsonify(produtos)

@app.route("/api/editar", methods=["PUT"])
def editarProdutos():
    dados = request.json
    
    id = dados['id']
    novo_nome = dados['nome']
    novo_preco = dados['preco']
    nova_quantidade = dados['quantidade']

    conn = sqlite3.connect("estoque.db")
    cursor = conn.cursor()
    cursor.execute("""
    UPDATE produtos
    SET nome = ?, preco = ?, quantidade = ?
    WHERE id = ?
""", (novo_nome, novo_preco, nova_quantidade, id))
    
    conn.commit()
    conn.close()

    return jsonify({'mensagem': 'produto editado com sucesso!' })


@app.route('/api/deletar', methods=['DELETE'])

def excluirProduto():
    dados = request.json

    id = dados["id"]
    conn = sqlite3.connect("estoque.db")
    cursor = conn.cursor()
    cursor.execute('''DELETE FROM produtos WHERE id = ?;''', (id,))
    conn.commit()
    conn.close()

    return jsonify({"mensagem" : "Produto excluido"});


if __name__ == '__main__':
    app.run(debug=True)

    

