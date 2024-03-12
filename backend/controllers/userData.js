const User = require('../db/models/user')

module.exports = {
    async register(req,res) {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        try {
            await user.save()
        }catch(error) {
            console.log(error)
            return res.status(422).json({message: error.message})
        }
        res.status(200).json('Zapisano')
    },
    view(req,res) {
        try {
            res.send('OK')
        }catch(error) {
            console.log(error.message)
        }
    },
    async login(req,res) {
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user) {
                return res.status(401).send('nieprawidłowy email lub hasło')
            }
            const isValidPassword = await user.comparePassword(req.body.password)
            if(!isValidPassword) {
            return res.status(401).send('nieprawidłowy email lub hasło')
        }        

        req.session.user = user
        await user.save()
        return res.status(200).send(req.session.user)
    }
    catch(e) {
        console.log(e)
    }
    },
    async logout(req,res) {
        req.session.destroy()
        res.send()
    }
}