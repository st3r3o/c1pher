var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PwEntry = new Schema({
	service:  String, 
    username: String,
    password: String,
    notes:    String, 
});


module.exports = mongoose.model('PwEntry', PwEntry);
