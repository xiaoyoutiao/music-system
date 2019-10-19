const router = require('express').Router();

router.get('/new_song_list', (req, res, next) => {
    if (!req.session.uid) {
        res.redirect('/login');
    } else {
        res.end(req.session.uid);
    }

})

module.exports = router;