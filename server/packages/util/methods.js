global.$_methods = Object.create(null)

global.$_methods.isRequired = function (req, res, params) {
    return new Promise(resolve => {
        if (params instanceof Array !== true) throw new Error('params must be a array')
        params.forEach(_item => {
            if (req.body[ _item ] === null && req.body[ _item ] === undefined) return res.json({ code: 500, msg: `${ _item } is required` })
        })
        resolve()
    })
}
global.$_methods.isRequiredQuery = function (req, res, params) {
    return new Promise(resolve => {
        if (params instanceof Array !== true) throw new Error('params must be a array')
        params.forEach(_item => {
            if (req.query[ _item ] === null && req.query[ _item ] === undefined) return res.json({ code: 500, msg: `${ _item } is required` })
        })
        resolve()
    })
}
