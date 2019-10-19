const netease = require('../../../api/netease.js');

const keyWordHandlers = {
    netease: netease.seachByKeyWord,
    hasStation(station) {
        if (this[station]) {
            return true
        } else {
            return false
        }
    },
    getHandler(station) {
        if (this[station] && typeof this[station] === 'function') {
            console.log(this[station]);
            return this[station];
        } else {
            return false
        }
    }
}

module.exports = {
    keyWordHandlers
}