document.querySelector("button").addEventListener("click", getFetch);
document
  .querySelector("#today")
  .addEventListener("keypress", (event) =>
    event.key === "Enter" ? getFetch() : null
  );

window.onload = getToday;

async function getFetch() {
  const date = document.querySelector("input").value;
  const url = `https://api.nasa.gov/planetary/apod?api_key=m7VX6UfFOihd25pODKjjhgwENlpkyqSJhjbDf8WW&date=${date}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const [show, hide] =
      data.media_type == "image" ? ["img", "iframe"] : ["iframe", "img"];

    console.log(show);
    console.log(hide);

    document.querySelector(show).src = data.url;
    document.querySelector(show).style.display = "block";
    document.querySelector(hide).src = "";
    document.querySelector(hide).style.display = "none";
    document.querySelector("p").innerText = data.explanation;
  } catch (err) {
    console.log(err);
  }
}

function getToday() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  document.querySelector("#today").value = today;
}
