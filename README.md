# To-Do List API

Utilizando o backend

## Configuração

### 1. Clonar o Repositório

Clone o repositório para sua máquina.

### 2. Instalar Dependências

npm install

### 3. Configurar o Banco de Dados

Crie um Banco de Dados: No MySQL Workbench ou através do terminal MySQL, crie um banco de dados chamado todolist:

Criar Tabela: Execute o seguinte comando SQL para criar a tabela todos:

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT TRUE,
  status ENUM('active', 'inactive', 'deleted') NOT NULL DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

### 4. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione suas configurações de banco de dados:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=todolist

### 5. Iniciar o Servidor
Inicie o servidor de desenvolvimento:
npm run dev

### Endpoints da API
1. Obter Todos os Itens
Método: GET
URL: /todos
Descrição: Retorna todos os itens da lista de tarefas.

2. Obter Item por ID
Método: GET
URL: /todos/:id
Descrição: Retorna o item com o ID especificado.

3. Criar Novo Item
Método: POST
URL: /todos
Descrição: Cria um novo item na lista de tarefas.

Corpo da Requisição:
json
{
  "title": "Título da Tarefa",
  "description": "Descrição da Tarefa",
  "completed": true,      // (opcional) Valor padrão: true
  "status": "active"      // (opcional) Valor padrão: 'active'
}


4. Atualizar Item
Método: PUT
URL: /todos/:id
Descrição: Atualiza o item com o ID especificado.

Corpo da Requisição:
json
{
  "title": "Título Atualizado",
  "description": "Descrição Atualizada",
  "completed": false,     // (opcional) Valor padrão: true
  "status": "inactive"    // (opcional) Valor padrão: 'active'
}

### 5. Deletar Item (Marcar como Deletado)

Método: DELETE
URL: /todos/:id
Descrição: Altera o status do item com o ID especificado para 'deleted' em vez de deletar fisicamente.

