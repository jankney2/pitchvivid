const handleEdit = require('./edit_toggle')

test('Returns true when state.edit is false', ()=> {
    expect(handleEdit()).toStrictEqual({edit:true})
})