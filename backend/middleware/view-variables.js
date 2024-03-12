module.exports = function(req,res,next) {
    res.locals.url = req.url
    console.log('res.locals.url:',res.locals.url)
    next()
}