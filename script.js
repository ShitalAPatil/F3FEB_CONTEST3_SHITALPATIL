
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const changePasswordForm = document.getElementById('change-password-form');
const logoutButton = document.getElementById('logout-button');
const userNameSpan = document.getElementById('user-name');


const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
 
  redirectToDashboard();
}


signupForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;


  if (name === '' || email === '' || password === '' || confirmPassword === '') {
    alert('Please fill in all fields');
    return;
  }
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }


  const users = JSON.parse(localStorage.getItem('users')) || [];


  const userExists = users.some(function(user) {
    return user.email === email;
  });
  if (userExists) {
    alert('User with this email already exists');
    return;
  }


  const token = generateRandomToken();
  const newUser = { email, pass: password, name, token };
  users.push(newUser);

 
  localStorage.setItem('users', JSON.stringify(users));

  localStorage.setItem('currentUser', JSON.stringify(newUser));
  redirectToDashboard();
});

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  const users = JSON.parse(localStorage.getItem('users')) || [];

 
  const currentUser = users.find(function(user) {
    return user.email === email && user.pass === password;
  });
  if (!currentUser) {
    alert('Invalid email or password');
    return;
  }


  currentUser.token = generateRandomToken();
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  // Redirect to dashboard
  redirectToDashboard();
});

changePasswordForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const oldPassword = document.getElementById('old-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmNewPassword = document.getElementById('confirm-new-password').value;
})
  // Basic form validation
  if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
    alert('Please fill in all fields');
    return;
  }
  if (newPassword !== confirmNewPassword) {
    alert('New passwords do not match');
    return;
  }

  
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Check if old password matches
  if (currentUser.pass !== oldPassword) {
    alert('Old password is incorrect');
    return;
  }