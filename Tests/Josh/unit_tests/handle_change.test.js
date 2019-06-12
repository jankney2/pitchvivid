const handleChange = require('./handle_change')

e = {
    target: {
        name: 'email',
        value: 'test@test.com'
    }
}

test('Returns an object with email:test@test.com', ()=> {
    expect(handleChange(e)).toStrictEqual({email:'test@test.com'})
})