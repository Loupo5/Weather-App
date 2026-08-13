const form = document.querySelector("form")
const locationInput = document.getElementById("loc")
const search = document.getElementById("search-btn")
const dialog = document.querySelector("dialog")


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
    dialog.appendChild(locationName)
    dialog.show()
})