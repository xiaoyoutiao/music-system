const netease = require('../../../../api/netease');

module.exports = async (req, res) => {
  let id = req.query.id
  try {
    let lyric = await netease.getLyric(id);
    res.json(lyric.lrc)
  } catch (error) {
    throw error
  }
}
