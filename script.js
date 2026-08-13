const form = document.querySelector("form")
const locationInput = document.getElementById("loc")
const search = document.getElementById("search-btn")


async function fetchData(location) {
    try {
        const fetched = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.value}/?key=93AYJZ55PKFC6XT7D5FMLZGF6&unitGroup=uk`)
        const result = await fetched.json()
        console.log(`${result.currentConditions.feelslike} Celsius`)
    } catch(error) {
        console.error("Couldnt fetch location", error)
    }
}

form.addEventListener("submit", (e) => {
    fetchData(locationInput)
})