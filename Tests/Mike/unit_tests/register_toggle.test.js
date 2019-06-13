const registerToggle = require('./register_toggle')

test('Toggles state.admin and returns result', ()=> {
  expect(registerToggle()).toStrictEqual({admin:true})
})