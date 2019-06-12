const updateUser = require('./reducer_update')

user = {
    firstName: 'test',
    lastName: 'user'
}

test('returns an object of type update user with a payload of user', () => {
    expect(updateUser(user)).toStrictEqual({type:'UPDATE_USER', payload: user})
})