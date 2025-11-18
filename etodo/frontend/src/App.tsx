import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [todos, setTodos] = useState<string[]>([]);
  // useState permet d'afficher la valeur si elle est modifie sans pour attant recharger le site dans son integralite 
  // creer un tableau de string au debut innitialiser par un tableau vide (  >([])  )

  const [newTodo, setNewTodo] = useState<string>('');
  // cette variable permet de stocker ce que l'utilisateur ecrit 

  const addTodo = () => {
    // Lorsqu'on clique sur le bouton ajouter on appelera cette fonction

    if (newTodo === "") {
      // simple verif pour voir qu'on ajoute bien quelqe chose
      return;
    }

    // On ajoute la tâche à la liste
    // ...todos c'est comme faire la copie de la liste actuelle
    setTodos([...todos, newTodo]);

    setNewTodo('');
  };

  // Cette fonction supprime une tâche
  const removeTodo = (index: number) => {

    // On filtre la liste : on garde TOUT sauf l'élément donné
    const newList = todos.filter((_, i) => i !== index);

    // On met à jour la liste avec la liste modifiée
    setTodos(newList);
  };


  return (
    <main className="login-container">

      <div className="login-box">
        <h1>To Do List</h1>

        {/*affichage des taches*/}
        <ul>
          {todos.map((task, index) => (
            <li key={index}>
              
              {/* Le texte de la tache */}
              <span>{task}</span>

              {/* Boutton pour supprimmé */}
              <button onClick={() => removeTodo(index)}>Supprimer</button>
            </li>
          ))}
        </ul>


        {/* AJOUT D'UNE TÂCHE */}
        <div>
          {/* Champ texte */}
          <input
            type="text"
            placeholder="Écris une nouvelle tâche"
            value={newTodo}                        // ce qu'il contient
            onChange={(e) => setNewTodo(e.target.value)}  // quand tu écris dedans
          />

          {/* Bouton pour ajouter la tâche */}
          <button onClick={addTodo}>Ajouter</button>
        </div>

      </div>

    </main>
  );
};

export default App;
