const button = document.getElementById("myButton");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = "The site is alive.";
});
