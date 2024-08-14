// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// Fetch Comman Control
const msg = document.querySelector(".msg");
const dropDown = document.querySelectorAll(".dropdown select");
const fromImg = document.querySelector(".from img").src;
const toImg = document.querySelector(".to img").src;

// Validate Values
const validation = () => {
  const inputValue = document.querySelector("form input");
  if (inputValue.value < 0 || inputValue.value == "") {
    alert("Please Provide Valid Data");
    inputValue.value = 1;
    return;
  }
};

// Load Both DropDown
const loadDropDown = (arg1, arg2) => {
  for (let select of dropDown) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === arg1) {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === arg2) {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
};

// Update Flags Images
updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Get Exchange Rate via BTN
const btn = document.querySelector("#btn_convert");
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  validation();
  getExchangeRate();
});

//  Exchange Rate Function
const getExchangeRate = async () => {
  msg.innerText = "Fetching Data.....";
  const inputValue = document.querySelector("form input");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const URL = ` https://open.er-api.com/v6/latest/${fromCurr.value}`; //   two api first one is not working
  const response = await fetch(URL);
  const data = await response.json();
  let rate = 0;
  rate = data.rates[toCurr.value];
  const finalAmount = inputValue.value * rate;
  console.log(rate);
  if (rate === undefined) {
    msg.innerText = "Data Not Awailable";
    setTimeout(refreshPage, 5000);
  } else
    msg.innerText = `${inputValue.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

//  Refresh Page Manually
const refreshPage = () => {
  window.location.reload();
};

// Load Default Data
const loadDefault = window.addEventListener("load", () => {
  validation();
  loadDropDown("USD", "INR");
  getExchangeRate();
});

// Switch Currncy Fuction
const switchFlag = () => {
  const fromCurr = document.querySelector(".from select").value;
  const toCurr = document.querySelector(".to select").value;
  loadDropDown(toCurr, fromCurr);
  const fromImg = document.querySelector(".from img").src;
  const toImg = document.querySelector(".to img").src;
  document.querySelector(".from img").src = toImg;
  document.querySelector(".to img").src = fromImg;
  validation();
  getExchangeRate();
};

// Put Click Event on Icon
let switchCurr = document.querySelector("i");
switchCurr.addEventListener("click", () => {
  switchFlag();
});
