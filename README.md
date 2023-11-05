
getAllEvents().then(array => {
    const sortedByDateArray = array.sort((a, b) => new Date(a.eventStartDate) - new Date(b.eventStartDate))
    setAllEvents(sortedByDateArray)
     setMyEvents(sortedByDateArray.filter(event => event.userId === currentUser.id))
})