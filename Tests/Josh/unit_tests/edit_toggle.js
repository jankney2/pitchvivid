let state = {
    edit: false
}

function handleEdit() {
    if(state.edit === false) {
        return {
            edit: true
        }
    }
}

module.exports = handleEdit