const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        require:true,
        trim:true,
        lowerCase:true,
        unique:[true, 'Ten email jest już zajęty']
    },
    password: {
        type: String,
        require: true
    }
})

userSchema.pre('save',function(next) {
    const user = this
    const salt = bcrypt.genSaltSync(10)
    if (!user.isModified('password')) return next();
    const hash = bcrypt.hashSync(user.password,salt) 
    user.password = hash
    next()
})

userSchema.post('save',function(error,doc,next){
    if(error.code === 11000){
        error.errors = {email: {message: 'Taki email jest juz zajety'}}
    }
    next(error)
})

// compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;
    return await bcrypt.compare(candidatePassword, user.password);
  }

const User = mongoose.model('User',userSchema)

module.exports = User