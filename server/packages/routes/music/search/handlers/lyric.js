const handler = require('./stationAndHandlers');
module.exports = async (req, res, next) => {
  let s = req.query.s
  let _id = req.query.id
  const resData = {}

  if (!s || !_id) {
    resData.code = 500
    resData.msg = '缺少参数'
    return res.json(resData)
  }
  s = s.trim();
  _id = _id.trim();
  let hasStation = handler.hasStation({ type: 'lyric', station: s });
  if (!hasStation) {
    resData.code = 500
    resData.msg = '指定平台在系统中不存在'
    return res.json(resData).end()
  }
  try {
    let data = await handler.getHandler({
      type: 'lyric',
      station: s
    })(_id);
    resData.code = 200
    resData.data = data
    return res.json(resData);
  } catch (error) {
    next(error)
  }
}
