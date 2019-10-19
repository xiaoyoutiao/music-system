const fs = require('fs')
const path = require('path')
module.exports = async function (req, res, next) {
    try {
        let public_key = await ReadFile(path.join(__dirname, '../../../crypto/RSA/key/public.key.pem'))
        if (public_key !== null) {
            public_key = public_key.toString().split('\n')
                .slice(1, 8)
                .toString()
            res.json({
                p: public_key,
                code: 200
            })
        } else {
            res.json({
                p: null,
                code: 500
            })

        }
        res.end()
    } catch (error) {
        throw error
    }
}

function ReadFile (path) {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                return resolve(null)
            }
            let data =
                fs.readFile(path, (err, data) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(data)
                })
        })
    })
}
