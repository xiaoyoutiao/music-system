const { User } = require('../../../mongoose/schema/User');

module.exports = (req, res, next) => {
  const uid = req.session.uid;
  const { id } = req.body
  if (id === undefined) {
    res.json({ code: 500, msg: 'id参数为空' })
    return
  }
  /**查询歌曲收藏夹 */
  User.findById(uid, 'favorites', (err, docs) => {
    if (err) next(err, req, res, next);
    else {
      const index = docs.favorites.findIndex(item => {
        return item.id.toString() === id.toString()
      })
      if (index === -1) {
        res.json({ code: 500, msg: '指定id不存在' })
        return
      }
      const favorites = docs.favorites.splice(index, 1)
      if (favorites) {
        docs.save((err) => {
          if (err) {
            res.json({ code: 500, msf: '删除失败' })
            return
          }
          res.json({ code: 200, data: favorites })
        })
      }
    }
  })
}
