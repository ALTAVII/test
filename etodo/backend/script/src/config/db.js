require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;
console.log(port);

const saltRounds = 10;

app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["POST", "GET"],
}));
app.use(express.json());

function connectWithRetry() {
  console.log("🔌 Tentative de connexion MySQL...");

  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: "",
    database: process.env.MYSQL_DATABASE,
    port: 3306,
  });

  connection.connect((err) => {
    if (err) {
      console.error("❌ MySQL pas prêt :", err.code);
      console.log("⏳ Nouvel essai dans 2 sec...");
      setTimeout(connectWithRetry, 2000);
    } else {
      console.log("✅ Connecté à MySQL !");
    }
  });

  return connection;
}

const connection = connectWithRetry();

app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
});

module.exports = { connection, app };
