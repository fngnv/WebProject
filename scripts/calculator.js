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
    let errorMsg = document.getElementById('error');
    console.log("TYT");
    if(amountInput.value == "" || priceInput.value == "") {
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
                Yhden gramman hinta:
                <br>
                ${priceForMGram} €
            `;
        }
    }
})