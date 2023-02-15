// Define age limits
const MIN_AGE = 18;
const MAX_AGE = 55;

// Get form and table elements
const form = document.getElementById('registration-form');
const table = document.getElementById('user-table');

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

  // Create table row for new user
  const row = table.insertRow();
  row.insertCell().textContent = name;
  row.insertCell().textContent = email;
  row.insertCell().textContent = password;
  row.insertCell().textContent = dob;
  row.insertCell().textContent = terms ? 'Yes' : 'No';

  // Clear form data
  form.reset();
});
