import API from "./"


export const records = () => {
  return API.get('http://localhost:3001/records')
}

