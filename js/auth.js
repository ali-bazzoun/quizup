const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleToSignup = document.getElementById('toggle-to-signup');
const toggleToSignin = document.getElementById('toggle-to-signin');
const signinToggleText = document.getElementById('signin-toggle');
const signupToggleText = document.getElementById('signup-toggle');
const authTitle = document.getElementById('auth-title');

toggleToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('hidden');
  signupForm.classList.remove('hidden');
  authTitle.textContent = 'Sign up';
  signupToggleText.classList.remove('hidden');
  signinToggleText.classList.add('hidden');
});

toggleToSignin.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  authTitle.textContent = 'Sign in';
  signupToggleText.classList.add('hidden');
  signinToggleText.classList.remove('hidden');
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const usersList = getUsersList();

  const existingUser = usersList.find((user) => user.email === email);
  if (existingUser) {
    alert('User already exists. Please sign in.');
    return;
  }

  const newUser = new User(email, password);
  usersList.push(newUser);
  setUsersList(usersList);

  alert('Signup successful! You can now sign in.');
  toggleToSignin.click();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email === 'admin@quizup.com' && password === '123') {
    const adminUser = { email, role: 'admin' };
    setCurrentUser(adminUser);
    window.location.href = 'dashboard.html';
    return;
  }

  const usersList = getUsersList();
  const user = usersList.find(
    user => user.email === email && user.password === password
  );

  if (!user) {
    alert('Invalid email or password. Please try again.');
    return;
  }

  setCurrentUser(user);
  alert(`Welcome back, ${user.email}!`);
  window.location.href = 'home.html';
});