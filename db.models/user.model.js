var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new Schema({
    name: {
        first: String,
        last: String,
        middle: String
    },
    searchname: String,
    local: {email: String, password: String},
    email: String,
    emailConfirmed: {value: Boolean, key: String},
    location: Object,
    gender: String,
    public: Boolean,
    dob: Object,
    pic: String,
    facebookID: String,
    facebookProfile: Object,
    education: Object,
    report: Object,
    tags: [{type: String}],
    timestamp: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};



// Compile model from schema
module.exports = mongoose.model('UserModel', UserSchema );

