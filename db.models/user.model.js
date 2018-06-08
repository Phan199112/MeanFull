var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
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
    notifications: {networkrequest: Boolean, commrequest: Boolean, formrequest: Boolean, discussion: Boolean, formactivity: Boolean, summary: Boolean},
    gender: String,
    public: Boolean,
    dob: Object,
    pic: String,
    facebookID: String,
    facebookProfile: Object,
    education: Object,
    report: Object,
    tags: [{type: String}],
    timestamp: String,
    notaken: Number,
    nocreated: Number,
    nodiscussion: Number
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

UserSchema.plugin(random);


// Compile model from schema
module.exports = mongoose.model('UserModel', UserSchema );

