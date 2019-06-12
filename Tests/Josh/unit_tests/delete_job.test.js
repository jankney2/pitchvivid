const deleteJob = require('./delete_job')

test('Returns undefined because of non-existant endpoint', ()=> {
    expect(deleteJob(1)).toBe(undefined)
})