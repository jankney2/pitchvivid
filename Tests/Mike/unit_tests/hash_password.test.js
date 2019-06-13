const hash_password = require('./hash_password')

let str = 'FDhfkj314!'

test('returns a hash of the entered password', () => {
    expect(hash_password(str)).not.toStrictEqual(str)
})