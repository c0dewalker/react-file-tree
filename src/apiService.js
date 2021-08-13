const API_URL = 'https://w-r-s.herokuapp.com/api'

export const apiService = async (id) => {
  const queryParam = id ? `?dirId=${id}` : ''
  const url = API_URL + queryParam
  try {
    const response = await fetch(url)
    return response.json()
  } catch (e) {
    console.log(`ERROR. Couldn´t receive data from ${url}.`)
  }
}