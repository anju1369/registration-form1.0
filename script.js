// Define age limits
const MIN_AGE = 18;
const MAX_AGE = 55;

// Get form and table elements
const form = document.getElementById('registration-form');
const table = document.getElementById('user-table');

// Load data from local storage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Add existing users to table
users.forEach(user => {
  const row = table.insertRow();
  row.insertCell().textContent = user.name;
  row.insertCell().textContent = user.email;
  row.insertCell().textContent = user.password;
  row.insertCell().textContent = user.dob;
  row.insertCell().textContent = user.terms ? 'Yes' : 'No';
});

// Listen for form submission
form.addEventListener('submit', event => {
  event.preventDefault();

  // Get form data
  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;
  const dob = form.elements['dob'].value;
  const terms = form.elements['terms'].checked;

  // Validate date of birth
  const birthdate = new Date(dob);
  const age = Math.floor((Date.now() - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
  if (age < MIN_AGE || age > MAX_AGE) {
    alert(`You must be between ${MIN_AGE} and ${MAX_AGE} years old to register.`);
    return;
  }

  // Create user object
  const user = { name, email, password, dob, terms };

  // Add user to table
  const row = table.insertRow();
  row.insertCell().textContent = name;
  row.insertCell().textContent = email;
  row.insertCell().textContent = password;
  row.insertCell().textContent = dob;
  row.insertCell().textContent = terms ? 'Yes' : 'No';

  // Add user to local storage
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  // Clear form data
  form.reset();
});
