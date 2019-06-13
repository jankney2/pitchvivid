const get_video = require('./get_video')

let id = 3

test('returns the video with the respective id', () => {
    expect(get_video(id)).toStrictEqual({id: 3, name: 'c'})
})