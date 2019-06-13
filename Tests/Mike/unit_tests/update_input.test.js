const updateOpacity = require('./update_input')

test('Increase amount of opacity to 100', ()=> {
    expect(updateOpacity()).toStrictEqual({opacity:100})
})