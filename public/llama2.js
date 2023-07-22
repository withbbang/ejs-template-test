"use strict";

document.getElementById("input").addEventListener("keyup", function (e) {
  e.key === "Enter" && handleSend();
});

function handleSend() {
  const input = document.getElementById("input").value;

  if (!input) return;

  const data = { input };

  fetch("/llama2", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
}
