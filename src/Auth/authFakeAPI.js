let accounts = [
  {
    email: 'admin@gmail.com',
    password: 'admin',
  }
]

function haveAccount(email, password) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].email === email && accounts[i].password === password) {
      return true;
    }
  }
  return false;
}

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
      if (haveAccount(email, password)) {
        return resolve("jwt_token")
      }
      else {
        return reject(new Error('account not found'))
      }
    }, 2000),
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
export const register = (firstname, lastname, email, password) => {
  console.log('firstname ', firstname)
  console.log('lastname ', lastname)
  console.log('email ', email)
  console.log('password ', password)
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (!haveAccount(email, password)) {
        accounts.push({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        })
        console.log(accounts)
        return resolve("jwt_token")
      }
      else {
        return reject(new Error('account already exists'))
      }
    }, 2000),
  )
}