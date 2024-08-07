import { Request, Response } from 'express';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Todo } from '../models/todoModel';

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

export const getTodos = (req: Request, res: Response) => {
    connection.query('SELECT * FROM todos', (err, results: RowDataPacket[]) => {
        if (err) {
            console.error('Erro ao buscar todos os itens:', err);
            res.status(500).send('Erro interno do servidor.');
            return;
        }
        res.json(results);
    });
};

export const getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM todos WHERE id = ?', [id], (err, results: RowDataPacket[]) => {
        if (err) {
            console.error('Erro ao buscar item:', err);
            res.status(500).send('Erro interno do servidor.');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Item não encontrado.');
            return;
        }
        res.json(results[0]);
    });
};

export const createTodo = (req: Request, res: Response) => {
    const todo: Todo = { ...req.body, status: req.body.status || 'active', completed: req.body.completed ?? true };
    connection.query('INSERT INTO todos (title, description, completed, status) VALUES (?, ?, ?, ?)', [todo.title, todo.description, todo.completed, todo.status], (err, results: ResultSetHeader) => {
        if (err) {
            console.error('Erro ao criar item:', err);
            res.status(500).send('Erro interno do servidor.');
            return;
        }
        res.status(201).json({ id: results.insertId, ...todo });
    });
};

export const updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo: Todo = { ...req.body, status: req.body.status || 'active', completed: req.body.completed ?? true };
    connection.query('UPDATE todos SET title = ?, description = ?, completed = ?, status = ? WHERE id = ?', [todo.title, todo.description, todo.completed, todo.status, id], (err, results: ResultSetHeader) => {
        if (err) {
            console.error('Erro ao atualizar item:', err);
            res.status(500).send('Erro interno do servidor.');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Item não encontrado.');
            return;
        }
        res.json({ id: Number(id), ...todo });
    });
};

export const deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    // Atualiza o status para 'deleted' ao invés de deletar o item
    connection.query(
        'UPDATE todos SET status = ? WHERE id = ?',
        ['deleted', id],
        (err, results: ResultSetHeader) => {
            if (err) {
                console.error('Erro ao atualizar status do item:', err);
                res.status(500).send('Erro interno do servidor.');
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).send('Item não encontrado.');
                return;
            }
            res.status(204).send(); // Status 204 indica que a operação foi bem-sucedida e não há conteúdo para retornar
        }
    );
};