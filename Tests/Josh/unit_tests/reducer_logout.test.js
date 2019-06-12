const logoutUser = require('./reducer_logout')

test('Returns an object of type logout', () => {
    expect(logoutUser()).toStrictEqual({type:"LOGOUT"})
})