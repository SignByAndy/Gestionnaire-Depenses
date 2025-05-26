const form = document.getElementById('expenseForm');
const expensesTable = document.querySelector('#expensesTable tbody');
const totalDisplay = document.getElementById('total');
const filter = document.getElementById('filter');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titre = document.getElementById('titre').value;
  const montant = parseFloat(document.getElementById('montant').value);
  const categorie = document.getElementById('categorie').value;

  expenses.push({ titre, montant, categorie });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  
  form.reset();
  updateTable();
});

filter.addEventListener('change', updateTable);
function updateTable() {
  const selectedCategory = filter.value;
  expensesTable.innerHTML = '';
  let total = 0;

  expenses.forEach((exp, index) => {
    if (selectedCategory === 'Toutes' || exp.categorie === selectedCategory) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${exp.titre}</td>
        <td>${exp.montant.toFixed(2)} €</td>
        <td>${exp.categorie}</td>
        <td class="actions">
          <button class="edit" onclick="editExpense(${index})">Modifier</button>
          <button class="delete" onclick="deleteExpense(${index})">Supprimer</button>
        </td>
      `;
      expensesTable.appendChild(row);
      total += exp.montant;
    }
  });

  totalDisplay.textContent = `${total.toFixed(2)} €`;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateTable();
}
function editExpense(index) {
  const exp = expenses[index];
  document.getElementById('titre').value = exp.titre;
  document.getElementById('montant').value = exp.montant;
  document.getElementById('categorie').value = exp.categorie;
  deleteExpense(index);
}
updateTable();
