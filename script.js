const key = "61639c86aa1ec11054e82d704c895d41";

const cityInput = document.getElementById("input-city")
const search = document.getElementById("btn-search")
const showCity = document.getElementById("city")
const showDegrees = document.getElementById("degrees")
const showSweather = document.getElementById("sweather")
const showData = document.getElementById("data")

const alert = document.getElementById("alert")

// functions

async function previsaoDoTempo (city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br`)
    
    validation(response)

    const data = await response.json()            
    return data;
}

async function showWeather(city) {
    const outputHtml = document.getElementById("output-js") 
    const data = await previsaoDoTempo(city)
    
    showCity.innerText = data.name
    const degreesKelvin = data.main.temp_max
    degreesConsertion(degreesKelvin)
    const str = data.weather[0].description
    conversionUpperCase(str)
    returnDate()
    
    outputHtml.style.display = "flex" // exibe o display depois das inforamações serem
    // carregadas
}

function degreesConsertion(degreesKelvin) {
    degreesCelsius = 273,15
    const celsius = Math.floor(degreesKelvin - degreesCelsius)
    showDegrees.innerHTML = `<p>${celsius}°</p>`
}

function conversionUpperCase(str) {
    const upperCase = str.charAt(0).toUpperCase() // pega a primeira letra
    // e transforma em letra maiuscula
    const arr = str.split("") // separa a string por ""
    arr.splice(0, 1, upperCase) // substitui o primeiro indice da string do array
    // depois substitui apenas 1 array e transforma em UpperCase
    const resultUpperCase = arr.join("") // junta o array pra não ficar separado
    showSweather.innerText = resultUpperCase // mostra a string na tela
}

function returnDate () {
    const date = new Date()
    const dateOfMonth = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()

    const fullDate = `${dateOfMonth}/${month}/${year}`
    showData.innerText = fullDate;
}

function validation(response) { // verifica se a cidade foi encontrada(true or false), se a resposta for falso
    // vai aparecer a resposta 404 (not found)
    if(!response.ok) {
        alert.style.display = "block"
        alert.innerText = "Não foi possível encontrar a cidade."
        setTimeout(() => {
            alert.style.display = "none"
        }, 3000);
        throw new Error() // toda vez q digitar uma cidade valida e depois uma invalida, vai aparecer undefined
        //  na tela, com esse lançamento de erro, isso não vai acontecer
    }
}

// events

search.addEventListener("click", (e) => {
    e.preventDefault()
    const city = cityInput.value

    showWeather(city)
})