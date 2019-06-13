const createAdminKey = require('./create_adminkey')

test('Generate a new random admin key', ()=> {
  expect(createAdminKey()).not.toBeFalsy()
})