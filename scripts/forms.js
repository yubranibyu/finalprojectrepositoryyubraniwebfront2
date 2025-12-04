// FORM SYSTEM USING LOCALSTORAGE

// Save user in localStorage
function registerUser() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!name || !email || !password) {
    alert("All fields are required.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email exists
  if (users.find(u => u.email === email)) {
    alert("This email is already registered.");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account successfully created!");
}

// Login user
function loginUser() {
  const email = document.getElementById("logEmail").value.trim();
  const password = document.getElementById("logPassword").value.trim();

  if (!email || !password) {
    alert("Both fields are required.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  // Save logged user
  localStorage.setItem("loggedUser", JSON.stringify(user));

  alert("Login successful!");
  window.location.href = "index.html";
}
