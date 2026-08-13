
async function fetchData() {
    const fetched = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London/?key=93AYJZ55PKFC6XT7D5FMLZGF6&unitGroup=uk`)
    const result = await fetched.json()
    console.log(`${result.currentConditions.feelslike} Celsius`)
}
fetchData()