module.exports = class Music {
    constructor({ id, name, alia, resouceUrl, album, artist, isFree, pop }) {
        /**歌曲唯一id */
        this.id = id;
        /**歌曲名 */
        this.name = name;
        /**别名 [Array <String> ]*/
        this.alia = alia;
        /**歌曲资源地址 */
        this.resouceUrl = resouceUrl;
        /**专辑 [Object]*/
        this.album = album;
        /**艺术家 [Array <Object> ]*/
        this.artist = artist;
        /**是否免费 [Boolean]*/
        this.isFree = isFree;
        /**热度,流行程度 [0-100] */
        this.pop = pop;
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