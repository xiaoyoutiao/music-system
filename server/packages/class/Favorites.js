// 收藏夹
module.exports = class Favorites {
    constructor({ id, name, songList }) {
        // /**歌曲名 [String]*/
        // this.songName = songName;
        // /**歌曲别名 [String]*/
        // this.alia = alia;
        // /**资源地址 [String]*/
        // this.resouceUrl = resouceUrl;
        // /**专辑图片 [String]*/
        // this.albumUrl = albumUrl
        // /** 所属平台的值*/
        // this.platform = platform
        this.id = id // 收藏夹id
        this.name = name // 收藏夹名字
        this.songList = songList // 歌曲列表
    }
    /**返回JSON格式对象 */ 
    getJSON () {
        let _that = this;
        let json = {}
        Object.keys(this).forEach(element => {
            if (typeof _that[ element ] !== 'function') {
                json[ element ] = _that[ element ];
            }
        });
        return json;
    }
}