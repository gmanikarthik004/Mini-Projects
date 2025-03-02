// Currency API
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDowns = document.querySelectorAll(".drop-down select"); // 2 selects
const btn = document.querySelector("#converter-btn");
const fromVal = document.querySelector(".from select");
const toVal = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Process the dropdowns
for(let select of dropDowns){
    for(let currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = `${currencyCode} - ${countryList[currencyCode]}`;
        newOption.value = currencyCode;
        // To mark USD by default selected
        if(select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        }
        // To mark INR by default selected
        else if(select.name === "to" && currencyCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    // Check which countryCode has been changed, accordingly update it's flag
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

// Flag changing fn.
const updateFlag = (element)=>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// Make conversion when btn is clicked.
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

// Update exchange rates fn.
let updateExchangeRate = async ()=>{
    // access the entered amount
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;

    if(amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amt.value = "1";
    }

    const URL = `${BASE_URL}/${fromVal.value.toLowerCase()}.json`; // gives fromVal rate

    let response = await fetch(URL);
    let data = await response.json();

    // Extract exchange rate correctly using json[fromCurrency][toCurrency]
    let rate = data[fromVal.value.toLowerCase()][toVal.value.toLowerCase()];

    if(!rate) {
        msg.innerText = `Exchange rate not available for ${fromCurr.value} to ${toCurr.value}`;
        return;
    }

    let finalVal = (rate * amtVal).toFixed(2);
    msg.innerText = `${amtVal} ${fromVal.value} = ${finalVal} ${toVal.value}`;
}

window.addEventListener("load", updateExchangeRate);

