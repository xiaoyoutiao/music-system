module.exports = class SongHistory {
    constructor({ name, code }) {
        /**平台名 [String]*/
        this.name = name
        /** 指定值 [String] */
        this.code = code
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