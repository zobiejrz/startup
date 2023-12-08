function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
}

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Guest';
}

async function getdadjoke() {
  try {
    const opt = { headers: { "Accept": "application/json" } };
    const resp = await fetch('https://icanhazdadjoke.com/', opt);
    if(resp.ok) {
      
      const json = await resp.json();
      const { joke } = json;
      setdadjoke(joke);
      return;
    }
    throw new Error('Request failed!')
    } catch(error) {
        console.log(error)
    }
}

function setdadjoke(joke) {
  const el = document.querySelector('#joke');
  el.textContent = joke;
}

const tmp = document.querySelector('#loggedName');
tmp.textContent = getPlayerName();

getdadjoke();