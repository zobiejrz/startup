function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
}

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Guest';
}

const tmp = document.querySelector('#loggedName');
tmp.textContent = getPlayerName();