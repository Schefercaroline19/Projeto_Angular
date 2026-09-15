<?php
// api/projetos.php - le, cria, altera e apaga projetos (CRUD completo)

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


set_exception_handler(function ($e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Falha no servidor: ' . $e->getMessage()]);
});

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require __DIR__ . '/../conexao.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;


if ($metodo === 'GET') {
    $sql = "SELECT id, nome, descricao, tecnologias, link_github, ano FROM projetos WHERE status = 'publicado' ORDER BY ano DESC, id";
    $projetos = $pdo->query($sql)->fetchAll();
    echo json_encode($projetos);
    exit;
}

if ($metodo === 'POST') {
    // POST cria: os dados vem no corpo, em JSON, e o id nasce no banco.
    $dados = json_decode(file_get_contents('php://input'), true);
    if (!$dados || empty($dados['nome'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Informe pelo menos o nome do projeto']);
        exit;
    }
    $sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link_github, ano, status)
            VALUES (?, ?, ?, ?, ?, ?)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados['nome'],
        $dados['descricao']   ?? '',
        $dados['tecnologias'] ?? '',
        $dados['link_github'] ?? '',
        $dados['ano']         ?? date('Y'),
        'publicado',
    ]);
    http_response_code(201);
    echo json_encode(['id' => (int) $pdo->lastInsertId()]);
    exit;
}

if ($metodo === 'PUT') {
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['erro' => 'PUT exige o id na URL: ?id=NN']);
        exit;
    }
    $dados = json_decode(file_get_contents('php://input'), true);
    if (!$dados || empty($dados['nome'])) {
        http_response_code(400);
        echo json_encode(['erro' => 'Informe pelo menos o nome do projeto']);
        exit;
    }
    $sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link_github = ?, ano = ? WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $dados['nome'],
        $dados['descricao'] ?? '',
        $dados['tecnologias'] ?? '',
        $dados['link_github'] ?? '',
        $dados['ano'] ?? date('Y'),
        $id,
    ]);
    echo json_encode(['mensagem' => 'Projeto atualizado']);   // 200 e o padrao
    exit;
}


if ($metodo === 'DELETE') {
    // DELETE apaga: so precisa do id
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['erro' => 'DELETE exige o id na URL: ?id=NN']);
        exit;
    }
        
    $stmt = $pdo->prepare('DELETE FROM projetos WHERE id = ?');
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['erro' => 'Projeto nao encontrado']);
        exit;
    }

    http_response_code(204);   // apagado, sem corpo para devolver
    exit;
}

http_response_code(405);
echo json_encode(['erro' => 'Metodo nao permitido']);