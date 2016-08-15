//підключаєм mongoose
var mongoose=require('../mongoose');
//схема логування
var schemaLogin=new mongoose.Schema({
	username:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		require:true,
		unique:true
	}
	})
exports.Login=mongoose.model("Login",schemaLogin);