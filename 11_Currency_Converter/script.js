const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const currencyList = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD"];

currencyList.forEach(currency => {
  let option1 = document.createElement("option");
  let option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.textContent = option2.textContent = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

convertBtn.addEventListener("click", () => {
  let amountValue = amount.value;
  if (amountValue === "" || amountValue <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  fetch(`${API_URL}${fromCurrency.value}`)
    .then(res => res.json())
    .then(data => {
      let rate = data.rates[toCurrency.value];
      let converted = (amountValue * rate).toFixed(2);
      result.textContent = 
        `${amountValue} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
    })
    .catch(() => {
      result.textContent = "Error fetching exchange rates.";
    });
});
