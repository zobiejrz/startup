async function loadScores() {
  const response = await fetch("/api/scores");
  const scores = await response.json();

  const tableBodyEl = document.querySelector('#scores');

  var total = 0;
  var wins = 0;
  var losses = 0;
  if (scores.length) {
    for (const [i, score] of scores.entries()) {
      total += 1;
      const nameTdEl = document.createElement('td');
      const scoreTdEl = document.createElement('td');
      const dateTdEl = document.createElement('td');

      nameTdEl.textContent = score.name;
      scoreTdEl.textContent = score.result;
      dateTdEl.textContent = score.date;

      if (score.result == "won") {
        wins += 1;
      } else {
        losses += 1;
      }

      const rowEl = document.createElement('tr');
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(scoreTdEl);
      rowEl.appendChild(dateTdEl);

      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=3>Be the first to score</td></tr>';
  }

  const statsEl = document.querySelector('#scorestats');
  const statRow = document.createElement('tr');
  const totalTd = document.createElement('td');
  const winsTd = document.createElement('td');
  const lossTd = document.createElement('td');

  totalTd.textContent = total;
  winsTd.textContent = wins;
  lossTd.textContent = losses;

  statRow.appendChild(totalTd);
  statRow.appendChild(winsTd);
  statRow.appendChild(lossTd);
  statsEl.appendChild(statRow);
}

function getPlayerName() {
  return localStorage.getItem('userName') ?? 'Guest';
}

const tmp = document.querySelector('#loggedName');
tmp.textContent = getPlayerName();

loadScores();


