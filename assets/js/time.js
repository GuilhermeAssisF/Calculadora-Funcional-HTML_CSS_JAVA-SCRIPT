const viewDate = document.querySelector(".date");
const viewTime = document.querySelector(".time");

const fullDate = new Date();
const day = fullDate.toLocaleString("pt-BR", { weekday: "long" });
const formatedDay = day.charAt(0).toUpperCase() + day.slice(1);

const hours = String(fullDate.getHours()).padStart(2, "0");
const minutes = String(fullDate.getMinutes()).padStart(2, "0");
const seconds = String(fullDate.getSeconds()).padStart(2, "0");
const fullTime = `${hours}:${minutes}`;

viewDate.textContent = formatedDay;
viewTime.textContent = fullTime;
