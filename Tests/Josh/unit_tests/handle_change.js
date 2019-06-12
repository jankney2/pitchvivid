const e = {
    target: {
        name: 'InputBox',
        value: 'Some Input Here'
    }
}

function handleChange(e) {
    const {name, value} = e.target
    return ({
        [name]: value
    })
}

module.exports = handleChange