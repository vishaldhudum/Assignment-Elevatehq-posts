export const getDataFromId = (list, id) => {
    return list.find(row => row.id === id);
}