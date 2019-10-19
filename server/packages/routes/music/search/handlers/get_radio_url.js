const netease = require('../../../../api/netease')

module.exports = async (req, res, next) => {
    let id = req.query.id.trim()
    if (!id) {
        throw new Error('Argument Id Invalid')
    }
    let songs = await netease.getRadioUrl(id)
    let song = songs.find((song) => {
        return song.id
    })
    res.json(song.url)
}
