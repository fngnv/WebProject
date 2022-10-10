/*
*
* Tekijä: Vera F
* 29.9.2022
* */
 //TODO: jos hinta on pienempi kuin x, kysytään juoman nimi, ja sit lisätään tietokantaan

const amountInput = document.getElementById('gram1');
const priceInput = document.getElementById('price1');
const calcButton = document.getElementById('calculate1');
const resultField1 = document.getElementById('result1');
let priceForMGram;

calcButton.addEventListener('click', function () {
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

            resultField1.innerHTML = `
                Yhden miligramman hinta:
                <br>
                ${priceForMGram} €
            `;
        }
    }
})

const weightInput = document.getElementById('kg2');
const calcButton2 = document.getElementById('calculate2');
const resultField2 = document.getElementById('result2');
let lethalDose;
let cups;

calcButton2.addEventListener('click', function () {
    if(weightInput.value === '') {
        alert('Täytä kaikki kentät!');
    } else {
        let weightNumb = parseFloat(weightInput.value);

        if(weightNumb <= 0) {
            alert('Laitathan vain positiiviset luvut!');
        } else {
            lethalDose = 150 * weightNumb;
            cups = (lethalDose/160).toFixed(0);
        }

        let htmlText;
        htmlText = `
            Letaali kofeiiniannoksesi on ${lethalDose} mg kofeiinia <br><br>
            Se on yhtä kuin noin ${cups}&#1645; tölkkiä Megistä <br><br>
            &#1645;Tämä on vain suuntaa antava luku. Emme kuitenkaan suosittele ylittämään tätä rajaa
        `;

        resultField2.innerHTML = htmlText;
    }

})

