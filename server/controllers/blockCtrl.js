module.exports = {
  blockUser: async (req, res) => {
    let {user_id} = req.body
    const db = req.app.get('db')
    
    try {
      let blockUserArr = await db.blockCtrl.blockUser({user_id})
      let blockUser = blockUserArr[0]
      res.status(201).send(blockUser)
    }
    catch {
      res.status(500).send('Internal server error')
    }
  }
}