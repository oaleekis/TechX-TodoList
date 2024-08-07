import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';


const app = express();
const port = 3000;

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

// Configuração do CORS
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de To-Do List está funcionando!');
});

app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
