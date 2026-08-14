const form = document.querySelector("form")
const locationInput = document.getElementById("loc")
const search = document.getElementById("search-btn")
const dialog = document.querySelector("dialog")
const leftDialog = document.querySelector(".left")

const degreeCels = "\u00B0C"
const degreeFahr = "\u00B0F"


function capitalize(str) {
    const firstLetter = str.charAt(0).toUpperCase()
    const restLetters = str.slice(1).toLowerCase()
    return firstLetter + restLetters
}

function getHtmlData() {
    const locationName = document.getElementById("location-name")
    const locationTemp = document.getElementById("temp")
    const conditions = document.getElementById("conditions")
    const feelslike = document.getElementById("feelslike")
    const humidity = document.getElementById("humidity")
    const uvindex = document.getElementById("uvindex")

    return {locationName, locationTemp, conditions,
            feelslike, humidity, uvindex}

}


async function fetchData(location) {
    try {
        const fetched = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=93AYJZ55PKFC6XT7D5FMLZGF6&unitGroup=uk`)
        const result = await fetched.json()
        return result
    } catch(error) {
        console.error("Couldnt fetch location", error)
    }
}

(async function () {
    const result = await fetchData("Nagoya")
    const html = getHtmlData()

    html.locationName.textContent = capitalize(result.resolvedAddress)
    html.locationTemp.textContent = result.currentConditions.temp
    html.conditions.textContent = `"${result.currentConditions.conditions}`
    html.feelslike.textContent = `Feels like: ${result.currentConditions.feelslike}${degreeCels}`
    html.humidity.textContent = `Humidity: ${result.currentConditions.humidity}%`
    html.uvindex.textContent = `UV index: ${result.currentConditions.uvindex}`
})()

form.addEventListener("submit", async (e) => {
    const result = await fetchData(locationInput.value)
    const html = getHtmlData()

    console.log(result)
    html.locationName.textContent = capitalize(result.resolvedAddress)

    html.locationTemp.textContent = `${result.currentConditions.temp}`
    

    html.conditions.textContent = `"${result.currentConditions.conditions}"`

    html.feelslike.textContent = `Feels like: ${result.currentConditions.feelslike}${degreeCels}`

    html.humidity.textContent = `Humidity: ${result.currentConditions.humidity} %`

    html.uvindex.textContent = `UV index: ${result.currentConditions.uvindex}`
    dialog.show()
})