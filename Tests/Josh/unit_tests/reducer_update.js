function updateUser(user) {
    return {
        type: `UPDATE_USER`,
        payload: user
    }
}

module.exports = updateUser