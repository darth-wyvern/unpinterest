/**
 * signInAPI
 * @param {Object} signinData
 * @param {string} signinData.email - the email address
 * @param {string} signinData.password - the password
 * @returns 
 */
export const signInAPI = ({ email, password }) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin') {
        return resolve("jwt_token")
      }
      else {
        return reject(new Error('account not found'))
      }
    }, 1),
  )
}

/**
 * Register
 * @param {Object} registerData - the registration data
 * @param {string} registerData.firstname - the first name
 * @param {string} registerData.lastname - the last name
 * @param {string} registerData.email - the email address
 * @param {string} registerData.password - the password
 * @returns 
 */
export const register = ({ firstname, lastname, email, password }) => {
  return new Promise((resolve, reject) =>
    setInterval((firstname, lastname, email, password) => resolve("jwt_token")),
    5000
  )
}