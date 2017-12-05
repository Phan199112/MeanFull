
exports.calculateAge = function calculateAge(user) { // birthday is a date
    var birthday = new Date(user.dob.year, user.dob.month, user.dob.date)
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

exports.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
