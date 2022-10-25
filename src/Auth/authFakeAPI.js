/**
 * signIn
 * @param {Object} signinData
 * @param {string} signinData.email - the email address
 * @param {string} signinData.password - the password
 * @returns 
 */
export const signIn = ({ email, password }) => {
  return new Promise((resolve, reject) =>
    setInterval((email, password) => resolve("jwt_token")),
    5000
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
export const Register = ({ firstname, lastname, email, password }) => {
  return new Promise((resolve, reject) =>
    setInterval((firstname, lastname, email, password) => resolve("jwt_token")),
    5000
  )
}