// Au chargement de la page, on récupère les employés enregistrés dans le localStorage
document.addEventListener('DOMContentLoaded', () => {
  const employesEnregistres = JSON.parse(localStorage.getItem('employes')) || [];
  // On affiche chaque employé déjà présent
  employesEnregistres.forEach(emp => afficherEmploye(emp));
});

// Sélection du formulaire et de la liste des employés dans la page HTML
const formulaire = document.getElementById('formulaireEmploye');
const listeEmployes = document.getElementById('listeEmployes');

// Lorsqu’on soumet le formulaire
formulaire.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche le rechargement de la page

  // Récupération des valeurs des champs du formulaire
  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();
  const fonction = document.getElementById('fonction').value.trim();

  // Vérification des champs (aucun champ vide et email valide)
  if (!nom || !prenom || !email || !fonction || !validerEmail(email)) {
    alert('Veuillez remplir tous les champs correctement.');
    return;
  }

  // Création d’un objet employé
  const employe = { nom, prenom, email, fonction };

  // Affichage dans la liste
  afficherEmploye(employe);

  // Enregistrement dans le localStorage
  enregistrerEmploye(employe);

  // Réinitialisation du formulaire
  formulaire.reset();
});

// Fonction pour valider le format de l’adresse email
function validerEmail(email) {
  const modele = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return modele.test(email);
}

// Fonction qui affiche un employé dans la liste HTML
function afficherEmploye(emp) {
  const element = document.createElement('li');
  element.className = 'employe';

  // Création d’un bloc avec les détails de l’employé
  const blocDetails = document.createElement('div');
  blocDetails.className = 'details-employe';
  blocDetails.innerHTML = `
    <span class="nom">${emp.nom} ${emp.prenom}</span>
    <span>${emp.email}</span>
    <span>${emp.fonction}</span>
  `;

  // Création du bouton "Supprimer"
  const boutonSupprimer = document.createElement('button');
  boutonSupprimer.className = 'bouton-supprimer';
  boutonSupprimer.textContent = 'Supprimer';
  boutonSupprimer.onclick = () => {
    element.remove(); // Retire l’élément du DOM
    supprimerEmploye(emp.email); // Supprime aussi du localStorage
  };

  // Ajout des éléments au DOM
  element.appendChild(blocDetails);
  element.appendChild(boutonSupprimer);
  listeEmployes.appendChild(element);
}

// Fonction qui ajoute un employé dans le localStorage
function enregistrerEmploye(emp) {
  const employes = JSON.parse(localStorage.getItem('employes')) || [];
  employes.push(emp); // Ajout à la liste existante
  localStorage.setItem('employes', JSON.stringify(employes)); // Sauvegarde
}

// Fonction qui supprime un employé du localStorage (via l’email comme identifiant)
function supprimerEmploye(email) {
  let employes = JSON.parse(localStorage.getItem('employes')) || [];
  employes = employes.filter(emp => emp.email !== email); // Retirer l’employé
  localStorage.setItem('employes', JSON.stringify(employes)); // Mise à jour
}
