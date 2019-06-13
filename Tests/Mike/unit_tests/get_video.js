videos = [
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'},
  {id: 4, name: 'd'},
  {id: 5, name: 'e'}
]

getVideo = (id) => {
  for (let i = 0; i < videos.length; i++){
    if (videos[i].id === id){
      return videos[i]
    }
  }
}

module.exports = getVideo