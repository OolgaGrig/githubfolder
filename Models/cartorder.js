var mongoose=require('../mongoose');
var schemaCartorder=new mongoose.Schema({
	username:{
		type:String,
		require:true
	},
	mail:{
		type:String,
		require:true
	},
	phone:{
		type:String,
		require:true
	},
	adress:{
		type:String,
		require:true
	},
	total:{
		type:Number,
		require:true
	},
	products:Array
	})
exports.Cartorder=mongoose.model("Cartorder",schemaCartorder);