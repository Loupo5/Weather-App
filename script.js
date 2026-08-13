const form = document.querySelector("form")
const locationInput = document.getElementById("loc")
const search = document.getElementById("search-btn")
const dialog = document.querySelector("dialog")


async function fetchData(location) {
    try {
        const fetched = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/?key=93AYJZ55PKFC6XT7D5FMLZGF6&unitGroup=uk`)
        const result = await fetched.json()
        return result
    } catch(error) {
        console.error("Couldnt fetch location", error)
    }
}
function Capitilize(str) {
    firstLetter = str.charAt(0).toUpperCase()
    restLetters = str.slice(1).toLowerCase()
    return firstLetter + restLetters
}

form.addEventListener("submit", async (e) => {
    const result = await fetchData(locationInput)

    console.log(result)
    console.log(result.resolvedAddress)
    const locationName = document.createElement("p")
    locationName.className = "loc-name"
    locationName.textContent = Capitilize(result.address)
    dialog.appendChild(locationName)
    dialog.show()
})