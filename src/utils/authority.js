// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('dfws-lms-authority') || '0'
}

export function setAuthority(authority) {
  const userType = authority.user_type
  localStorage.setItem('dfws-lms-user', JSON.stringify(authority))
  if (authority.day !== undefined) {
    authority.day === 0
      ? localStorage.removeItem('dfws-lms-account')
      : localStorage.setItem('dfws-lms-account', authority.user_name)
  }
  return localStorage.setItem('dfws-lms-authority', userType)
}

export function getAuth() {
  return JSON.parse(localStorage.getItem('dfws-lms-user'))
}
