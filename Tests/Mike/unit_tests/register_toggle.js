let state = {
  admin: false
}

function handleEdit() {
  if(state.admin === false) {
    return {admin: true}
  } else {
    return {admin: false}
  }
}

module.exports = handleEdit