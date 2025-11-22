const GH_TOKEN = document
  .querySelector('meta[name="gh-token"]')
  .getAttribute("content");

document.getElementById("rebusForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const answer = document.getElementById("answer").value;

    const correct = "КОНСТИТУЦИЯ";

    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";

    if (answer.trim().toUpperCase() === correct) {
        resultDiv.innerHTML = `<b>Правильно!</b><br>Ответ: ${correct}`;
    } else {
        resultDiv.innerHTML = `<b>Неправильно.</b><br>Ваш ответ: ${answer}<br>Правильный ответ: ${correct}`;
    }

    // Отправка в GitHub Actions
    await fetch(
        "https://api.github.com/repos/folin12/rebus/actions/workflows/send-email.yml/dispatches",
        {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": "Bearer " + GH_TOKEN,
            },
            body: JSON.stringify({
                ref: "main",
                inputs: {
                    name: name,
                    answer: answer,
                    correct: correct
                }
            })
        }
    );
});
