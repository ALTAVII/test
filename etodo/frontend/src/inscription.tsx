import React, { useState } from 'react';
import './inscription.css';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Formulaire envooyé")

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    console.log('Données envoyées :', { nom, prenom, email, password });

    setMessage('Inscription réussie !');
  };

  return (
    <main className="login-container">
      <div className="login-box">
        <h1>To Do List</h1>
        <h2>Inscription</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nom">Nom</label>
          <input type="text" id="nom" name="nom" placeholder="Votre nom" required value={nom} onChange = {(e) => setNom (e.target.value)} />

          <label htmlFor="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" placeholder="Votre prénom" required value={prenom} onChange={(e) => setPrenom(e.target.value)} />

          <label htmlFor="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" placeholder="exemple@mail.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)}/>

          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

          <button type="submit">S'inscrire</button>
        </form>
        <p>Déjà un compte ?<a href="login.html">Se connecter</a></p>
      </div>
    </main>
  );
};

export default Inscription;