const handler = require('./stationAndHandlers');

module.exports = async (req, res, next) => {
  let s = req.query.s
  let _id = req.query.id
  if (!s || !_id) {
    res.end('lack params')
  }
  s = s.trim()
  _id = _id.trim()
  let hasStation = handler.hasStation({ type: 'radio', station: s });
  if (!hasStation) {
    res.json({ code: '500', msg: '不支持的平台' }).end()
  }
  try {
    let data = await handler.getHandler({ type: 'radio', station: s })(_id);
    res.json(data);
  } catch (error) {
    next(error)
  }
}
