console.log("app js is loading from index.html");

const btn = document.querySelector("button");
const form = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector(".msg-1");
const msgTwo = document.querySelector(".msg-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

  msgOne.textContent = "Loading";
  msgTwo.textContent = "";

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        console.log(data.error);
      } else {
        msgOne.textContent = data.location;
        // console.log(data.location);
      }
    });
  });
});
