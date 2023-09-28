export const getItem = (category) => {
    return JSON.parse(localStorage.getItem(category)) || []
}