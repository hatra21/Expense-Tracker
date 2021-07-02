const balance = document.querySelector('#balance');
const money_plus = document.querySelector('#money-plus');
const money_minus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

// const dummyTransactions = [
//     {id: 1, text: 'Flower', amount: -20},
//     {id: 2, text: 'Salary', amount: 300},
//     {id: 3, text: 'Book', amount: -10},
//     {id: 4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];   

// Add transaction
function addTransaction(e) {
   e.preventDefault();
   
   if (text.value.trim() === '' || amount.value.trim() === '') {
       alert('pp');
   } else {
       const transaction = {
           id: generateID(),
           text: text.value,
           amount: +amount.value
       }

       transactions.push(transaction);

       addTransactionDOM(transaction);

       updateValue();

       updateLocalStorage();

       text.value = '';
       amount.value = '';
   }
}


// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000000)
}


//Add transactions to DOM list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValue() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((accum, item) => (accum += item),0).toFixed(2);
    
    const income = amounts
                    .filter(item => item > 0)
                    .reduce((acc, item) => (acc += item), 0)
                    .toFixed(2);

    const expense = (amounts
                    .filter(item => item < 0)
                    .reduce((acc, item) => (acc += item), 0) * -1)
                    .toFixed(2);
                    

    console.log(expense);
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    console.log(id);

    updateLocalStorage();

    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);

    updateValue();
}

init();

form.addEventListener('submit', addTransaction);