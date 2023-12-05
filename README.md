

getAllEvents().then(array => {
    const sortedByDateArray = array.sort((a, b) => new Date(a.eventStartDate) - new Date(b.eventStartDate))
    setAllEvents(sortedByDateArray)
     setMyEvents(sortedByDateArray.filter(event => event.userId === currentUser.id))
})

Coffee Connect TN - Front-End Capstone for Nashville Software School

Coffee Connect TN, powered by Yelp and Google Maps APIs, redefines Tennessee's coffee culture. 
Discover and save favorite coffee shops while connecting with fellow enthusiasts. 
Share experiences, building a passionate coffee community. 
It's your ultimate guide to exceptional coffee and fostering meaningful connections.

Built with React and Vanilla CSS
Utilizes Yelp and Google Maps APIs

Google Map API key may expire over time, if this becomes an issue please let me know so I can update the key!


