module.exports.profile = function(req, res) {

    return res.render('profile', {
        user : 'Aakash'
    });
    
}

module.exports.posts = function (req, res) {

    return res.end('<h1> Posts Fetched </h1>');
}