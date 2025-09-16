function calculateBMI() {
    const poids = parseFloat(document.getElementById('poids').value);
    const taille = parseFloat(document.getElementById('taille').value);  
    // 2. Convertit ces valeurs en nombres (avec parseFloat)

    // 3. Valide les données (si invalide, arrête tout)
        // Utilise isNaN() pour vérifier
      if (!validateInput(poids, taille)) {
        return; // Arrête la fonction ici
    }
    // 4. Calcule l'IMC
    const bmi = calculateBMIValue(poids, taille);

    // 5. Détermine la catégorie (maigreur, normal, etc.)
    const category = getBMICategory(parseFloat(bmi));
    console.log("Catégorie:", category);

    // 6. Affiche le résultat
        displayResult(bmi, category);

    const person =  RecordCreator(poids, taille, category, result);
    historyManager.addRecord(person);
    displayHistory();
}
function validateInput(poids, taille) {
        if (isNaN(poids) || isNaN(taille)) {
            alert("Veuillez entrer des nombres valides");// Affiche une erreur
            return false; // Arrête la fonction
            
    }
    if (poids <= 0 || taille <= 0) {
    alert(typeof poids + ", " + typeof taille); // Affiche les types pour débogage
     alert("Veuillez entrer des nombres valides");// Affiche une erreur
        return false;
    }
    if (taille < 0.5 || taille > 2.5) {
     alert("Veuillez entrer une taille valides");// Affiche "Taille invalide"
        return false;
    }

    if (poids < 10 || poids > 300) {
         alert("Veuillez entrer un poids valides");// Affiche "Poids invalide"
        return false;
    }
    return true;

}
//function calculateBMIValue(poids, taille) {
    // 1. Applique la formule mathématique
    // Formule : IMC = poids (kg) / (taille (m) * taille (m))
    //const bmi = poids / (taille * taille);
    // 2. Arrondit le résultat
    // Arrondir à 1 décimale
    //return bmi.toFixed(1);
    // 3. Retourne la valeur
    const calculateBMIValue = (poids, taille) => (poids / (taille * taille)).toFixed(1);
//}
//function getBMICategory(bmi) {
    // bmi est déjà un nombre (utilise parseFloat si besoin)
    // 1. Compare avec les seuils officiels
    //if (bmi < 18.5) return "Maigreur";
    //if (bmi < 25) return "Normal";
    //if (bmi < 30) return "Surpoids";
    //return "Obésité";
    // 2. Retourne la catégorie correspondante
//}
const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Maigreur";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Surpoids";
    return "Obésité";
}
function displayResult(bmi, category) {
    // 1. Récupère l'élément HTML où afficher le résultat
    const resultElement = document.getElementById('result');
    // 2. Formate le message avec l'IMC et la catégorie
    resultElement.innerHTML = `
    <h3>Résultat de votre IMC</h3>
    <p>Votre IMC : <strong>${bmi}</strong></p>
    <p>Catégorie : <strong>${category}</strong></p>
    `;
    // 3. Change le style selon la catégorie
    // Ajoute cette partie avant d'afficher
    if (category === "Normal") {
        resultElement.style.color = "green";
    } else if (category === "Maigreur" || category === "Surpoids") {
        resultElement.style.color = "orange";
    } else {
        resultElement.style.color = "red";
    }
    // 4. Affiche le tout dans la page
}

function RecordCreator (poids, taille, result, category){
    return{
        poids,
        taille,
        result,
        category,
        date: new Date().toLocaleDateString()

    }

}
const createHistoryManager = () => {
  const history = []; // ⬅️ DONNÉE PRIVÉE (closure)
  
  return {
    addRecord: (record) => {
      history.unshift(record);
      if (history.length > 5) {
        history.pop();
      }
    },
    
    getHistory: () => {
      return [...history]; // Copie pour protection
    },
    
    clearHistory: () => {
      history.length = 0;
    }
  };
};
const historyManager = createHistoryManager(); // ← INSTANCIATION

function displayHistory() { // Pas de paramètre
    const historique = historyManager.getHistory(); // Appel de la méthode
    // Maintenant tu peux utiliser "historique" qui contient le tableau
}
