state = {
  adminKey: ''
}

createAdminKey = () => {
  let randomAdminKey = Math.random().toString(36).slice(-8)
  state.adminKey = randomAdminKey
  return state.adminKey
}

module.exports = createAdminKey