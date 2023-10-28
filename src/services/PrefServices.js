export const getCoffeePrefs = () => {
    return fetch('http://localhost:8088/coffeePreferences').then(res => res.json());
}

export const getAtPrefs = () => {
    return fetch('http://localhost:8088/atmospherePreferences').then(res => res.json());
}