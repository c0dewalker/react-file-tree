const API_URL = 'http://164.90.161.80:3000/api/content'

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