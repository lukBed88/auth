// middleware
module.exports = function(req,res,next) {
    res.locals.user = req.session.user;
    console.log('res.locals.user:',res.locals.user)
    next()
}