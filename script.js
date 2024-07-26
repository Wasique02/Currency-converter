let select = document.querySelectorAll('.currency')
let btn = document.getElementById('btn')
let input = document.getElementById('input')
let errorMsg = document.querySelector('.errorMsg')

fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>dropDown(res))

function dropDown(res){
    let currency = Object.entries(res)
    for(let i=0;i<currency.length;i++){
        let option = `<option value="${currency[i][0]}">${currency[i][0]}</option>`
        select[0].innerHTML += option
        select[1].innerHTML += option
    }
}

btn.addEventListener('click',()=>{
    let currency1 = select[0].value
    let currency2 = select[1].value
    let inputValue = input.value

    if (currency1 === currency2) {
        errorMsg.textContent = "Select differnet currencies";
        errorMsg.style.display = "block"
    } else {
        errorMsg.style.display = "none"
        convert(currency1,currency2,inputValue)
    }
})

function convert(currency1,currency2,inputValue){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputValue}&from=${currency1}&to=${currency2}`)
    .then(response => response.json())
    .then((data) => {
        document.getElementById('result').value = Object.values(data.rates)[0]
})

}