export const config = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  credentials: 'include', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.SUGARWOD_API_KEY,
  },
}
