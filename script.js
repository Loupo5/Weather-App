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

async function fetchData(location) {
    try {
        const fetched = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/?key=93AYJZ55PKFC6XT7D5FMLZGF6&unitGroup=uk`)
        const result = await fetched.json()
        return result
    } catch(error) {
        console.error("Couldnt fetch location", error)
    }
}

form.addEventListener("submit", async (e) => {
    const result = await fetchData(locationInput)

    console.log(result)
    const locationName = document.getElementById("location-name")
    locationName.textContent = capitalize(result.resolvedAddress)

    const locationTemp = document.getElementById("temp")
    locationTemp.textContent = `${result.currentConditions.temp}`
    const degree = document.getElementById("degree")
    degree.textContent = degreeCels

    const conditions = document.getElementById("conditions")
    conditions.textContent = `Weather condition: ${result.currentConditions.conditions}`

    const feelslike = document.getElementById("feelslike")
    feelslike.textContent = `Feels like: ${result.currentConditions.feelslike}${degreeCels}`

    const humidity = document.getElementById("humidity")
    humidity.textContent = `Humidity: ${result.currentConditions.humidity} %`

    const uvindex = document.getElementById("uvindex")
    uvindex.textContent = `UV index: ${result.currentConditions.uvindex}`
    dialog.show()
})