// // Get table element
// const table = document.getElementById('user-table');

// // Retrieve existing user data from local storage
// let users = JSON.parse(localStorage.getItem('users')) || [];

// // Display existing user data in table
// for (const user of users) {
//   const { name, email, password, dob, terms } = user;
//   const row = table.insertRow();
//   row.insertCell().textContent = name;
//   row.insertCell().textContent = email;
//   row.insertCell().textContent = password;
//   row.insertCell().textContent = dob;
//   row.insertCell().textContent = terms ? 'Yes' : 'No';
// }

// // Handle form submit event
// const form = document.getElementById('registration-form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   // Get form data
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const dob = document.getElementById('dob').value;
//   const terms = document.getElementById('terms').checked;

//   // Validate date of birth
//   const dobDate = new Date(dob);
//   const now = new Date();
//   const minDate = new Date(now.getFullYear() - 55, now.getMonth(), now.getDate());
//   const maxDate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
//   if (dobDate < minDate || dobDate > maxDate) {
//     alert('Please enter a valid date of birth between 18 and 55 years ago.');
//     return;
//   }

//   // Add user to table and save to local storage
//   const user = { name, email, password, dob, terms };
//   users.push(user);
//   localStorage.setItem('users', JSON.stringify(users));
//   const row = table.insertRow();
//   row.insertCell().textContent = name;
//   row.insertCell().textContent = email;
//   row.insertCell().textContent = password;
//   row.insertCell().textContent = dob;
//   row.insertCell().textContent = terms ? 'Yes' : 'No';

//   // Reset form
//   form.reset();
// });
const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const termsInput = document.getElementById('terms');

// Retrieve stored data from local storage and display in table
window.onload = function() {
  if (localStorage.getItem('userData') !== null) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    userData.forEach((data) => {
      addTableRow(data.name, data.email, data.password, data.dob, data.terms);
    });
  }
}

// Add event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting and refreshing the page
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const dob = dobInput.value;
  const terms = termsInput.checked;

  // Check if date of birth is valid
  const currentDate = new Date();
  const birthDate = new Date(dob);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const month = currentDate.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18 || age > 55) {
    alert('Date of birth must be for someone between 18 and 55 years old.');
    return;
  }

  // Create data object and add to table and local storage
  const data = { name, email, password, dob, terms };
  addTableRow(name, email, password, dob, terms);
  addDataToLocalStorage(data);

  // Clear form inputs
  nameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
  dobInput.value = '';
  termsInput.checked = false;
});

// Add new row to table with given data
function addTableRow(name, email, password, dob, terms) {
  const table = document.getElementById('user-table');
  const row = table.insertRow(-1);
  const nameCell = row.insertCell(0);
  const emailCell = row.insertCell(1);
  const passwordCell = row.insertCell(2);
  const dobCell = row.insertCell(3);
  const termsCell = row.insertCell(4);
  nameCell.innerHTML = name;
  emailCell.innerHTML = email;
  passwordCell.innerHTML = password;
  dobCell.innerHTML = dob;
  termsCell.innerHTML = terms ? 'Yes' : 'No';
}

// Add data object to local storage
function addDataToLocalStorage(data) {
  let userData = [];
  if (localStorage.getItem('userData') !== null) {
    userData = JSON.parse(localStorage.getItem('userData'));
  }
  userData.push(data);
  localStorage.setItem('userData', JSON.stringify(userData));
}
