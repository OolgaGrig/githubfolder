var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/emyshop');
module.exports=mongoose;