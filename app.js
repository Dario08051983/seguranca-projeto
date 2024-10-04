// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

// Configurações principais
const SECRET_KEY = 'minha-chave-secreta';  // Chave para assinar os tokens
const TOKEN_EXPIRATION = '1h';  // O token expira em 1 hora

app.use(bodyParser.json()); // Para processar dados no formato JSON

// Porta para rodar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Dados fake dos usuários (em uma aplicação real, você usaria um banco de dados)
const users = [
  { username: "user", password: "123456", id: 123, perfil: "user" },
  { username: "admin", password: "123456789", id: 124, perfil: "admin" },
  { username: "colab", password: "123", id: 125, perfil: "user" },
];

// Função para gerar o token JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, perfil: user.perfil }, 
    SECRET_KEY, 
    { expiresIn: TOKEN_EXPIRATION }
  );
}

// Endpoint de login - Gera e retorna um JWT
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Middleware para autenticar o token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Acesso não autorizado' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado' });
    }
    req.user = user;
    next();
  });
}

// Endpoint protegido - Recuperar usuários
app.get('/api/users', authenticateToken, (req, res) => {
  if (req.user.perfil !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores' });
  }
  res.status(200).json({ data: users });
});
