async function loadScores() {
  let scores = [];
  let wins = 0;
  let loss = 0;

  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/scores');
    scores = await response.json();

    // Save the scores in case we go offline in the future
    localStorage.setItem('scores', JSON.stringify(scores));
  } catch {
    // If there was an error then just use the last saved scores
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  }

  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/winnings');
    wins = (await response.json()).total;

    // Save the scores in case we go offline in the future
    localStorage.setItem('wins', JSON.stringify(won));
  } catch {
    // If there was an error then just use the last saved scores
    const winCount = localStorage.getItem('wins');
    if (winCount) {
      wins = JSON.parse(winCount);
    }
  }

  try {
    // Get the latest high scores from the service
    const response = await fetch('/api/failings');
    loss = (await response.json()).total;

    // Save the scores in case we go offline in the future
    localStorage.setItem('failed', JSON.stringify(loss));
  } catch {
    // If there was an error then just use the last saved scores
    const lossCount = localStorage.getItem('failed');
    if (lossCount) {
      loss = JSON.parse(lossCount);
    }
  }
  const total = loss + wins;

  displayScores(scores, loss, wins, total);
}

function displayScores(scores, loss, wins, total) {
  const tableBodyEl = document.querySelector('#scores');

  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      const nameTdEl = document.createElement('td');
      const scoreTdEl = document.createElement('td');
      const dateTdEl = document.createElement('td');

      nameTdEl.textContent = score.name;
      scoreTdEl.textContent = score.result;
      dateTdEl.textContent = score.date;

      const rowEl = document.createElement('tr');
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(scoreTdEl);
      rowEl.appendChild(dateTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=3>Login to see the leaderboard</td></tr>';
  }

  const statsEl = document.querySelector('#scorestats');
  const statRow = document.createElement('tr');
  const totalTd = document.createElement('td');
  const winsTd = document.createElement('td');
  const lossTd = document.createElement('td');

  totalTd.textContent = total;
  winsTd.textContent = wins;
  lossTd.textContent = loss;

  statRow.appendChild(totalTd);
  statRow.appendChild(winsTd);
  statRow.appendChild(lossTd);
  statsEl.appendChild(statRow);
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

loadScores();

getdadjoke();


