const apiRequest = async (url = '', optionsObj = null) => {
    const response = await fetch(url, optionsObj);
}
export default apiRequest;