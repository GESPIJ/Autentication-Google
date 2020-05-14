const mongoose=require('mongoose');
const schema = mongoose.Schema;
const userSchema = schema({
    username:String,
    googleid:String,
    imagen:String
});

const user = mongoose.model('user', userSchema);

module.exports = user;

