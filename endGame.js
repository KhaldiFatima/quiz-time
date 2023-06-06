const finalScoreText = localStorage.getItem("score");

const finalScore = document.getElementById("finalScore");

finalScore.innerHTML = `Your Score:<p  class="score">${finalScoreText}</p>`;
