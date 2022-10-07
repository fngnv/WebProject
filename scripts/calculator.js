/*
*
* Tekijä: Vera F
* 29.9.2022
* */
 //TODO: jos hinta on pienempi kuin x, kysytään juoman nimi, ja sit lisätään tietokantaan

const amountInput = document.getElementById('gram');
const priceInput = document.getElementById('price');
const calcButton = document.getElementById('calculate');
const mainTag = document.querySelector('main');
let priceForMGram;

calcButton.addEventListener('click', function () {
    console.log("TYT");
    if(amountInput.value === "" || priceInput.value === "") {
        //errorMsg.innerText = 'Täytä kaikki kentät!'
        alert('Täytä kaikki kentät!');
    } else {
        let amountNumb = parseFloat(amountInput.value);
        let priceNumb = parseFloat(priceInput.value);
        if (amountNumb <= 0 || priceNumb <= 0) {
            alert('Laitathan kenttiin vain positiiviset luvut!');
         } else {
            priceForMGram = (priceNumb / amountNumb).toFixed(2);

            mainTag.innerHTML = `
                Yhden miligramman hinta:
                <br>
                ${priceForMGram} €
            `;
        }
    }
})

let text = `Tähän tulee teksti`;
let htmlText = ``;
let asideContent = document.getElementById('cheapestList');
let pic = `TÄHÄN TULEE KUVA
            <br>
            ^______________^ <br><br>`

for (let i = 0; i < 5; i++) {
    htmlText += ` ${text} <br> 
                ${pic}`;
}

asideContent.innerHTML = htmlText;

