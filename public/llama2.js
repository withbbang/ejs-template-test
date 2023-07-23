"use strict";

const input = document.getElementById("input");
const p = document.getElementById("p");

input.addEventListener("keyup", function (e) {
  e.key === "Enter" && handleSend();
});

function handleSend() {
  const value = input.value;

  if (!value) return;

  const data = { value };

  fetch("/llama2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      const reader = response.body.getReader();
      p.innerText = "";

      reader.read().then(handleProcessChunk);
    })
    .finally(() => {
      input.value = "";
    });
}

function handleProcessChunk({ done, value }) {
  const token = new TextDecoder("utf-8").decode(value);

  if (done) return;
  if (token.includes("<end>")) return;

  p.innerText += token;

  return reader.read().then(handleProcessChunk);
}
