import { connection, app } from "../../config/db.js";

app.post('/register', async (req, res) => {
  const { email, password, name, firstname} = req.body;

  if (!email || !password || !name || !firstname) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const checkdupemail = "SELECT * FROM users WHERE email = ?";
  connection.query(checkdupemail, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification :', err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    const sql = "INSERT INTO users (email, password, name, firstname) VALUES (?, ?, ?, ?)";
    connection.query(sql, [email, hash, name, firstname], (err, result) => {
      if (err) {
        console.error('Erreur lors de l’insertion :', err);
        return res.status(500).json({ error: "Erreur serveur" });
      }
      res.status(201).json({ message: "Utilisateur créé" });
    });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Erreur lors de la vérification :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    return res.status(200).json({message: "Connexion réussie"});
  });
});
console.log('Route Auth : ✅')