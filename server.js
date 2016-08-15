//підключаєм фреймворк express
var express=require('express');
var app=express();

//вмістиме робимо статичним контентом
app.use(express.static(__dirname));

//підключаємо router
//var router=require('./router');
//app.use('/router',router);

//підключаєм body-parser для post-запитів
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//підключаєм cookie-parser
var cookieParser=require('cookie-parser');
app.use(cookieParser());

//підключаємо multer для завантаження файлів на сервер
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './Img/')
  },
  filename: function (req, file, cb) {
  cb(null,  file.originalname );
  }
  });
var upload = multer({ storage: storage });

app.post('/uploadFile', upload.single('upl'), function(req,res){
	req.filename=req.originalname;
	console.log(req.filename);
	console.log(req.body); //form fields
	console.log(req.file); //form files
	res.send(req.file.path);
});

//підключаєм cookie-сесію
var session=require('cookie-session');
app.use(session({keys:['secret']}));

//підключаєм passport для логування
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

//підключаєм локальну стратегію для passport
var LocalStrategy=require('passport-local').Strategy;

//підключаєм модель логування
var Login=require('./Models/login').Login;
var Product=require('./Models/product').Product;
var Cartorder=require('./Models/cartorder').Cartorder;

//прив'язуєм локальну стратегію до passport
passport.use(new LocalStrategy(
  function(username,password,done){
	Login.find({username:username,password:password},function(err,data){
	if(data.length==1)
	return done(null,{username:username});
	else
	return done(null,false,{message:'Невірний логін або пароль!'});	

	}) 
}))

//збереження інформації в сесію
passport.serializeUser(function(user,done){
	//console.log(user.message);
	done(null,user.username);
})

//всі наступні звернення по id сесії
passport.deserializeUser(function(id,done){
	done(null,{username:id});
})

//авторизація з маршрутизатором
var auth=passport.authenticate(
	'local',{
		successRedirect:'/admin',
		failureRedirect:'/login'
	})

app.route('/login')
  .get(function(req, res) {
    res.sendFile(__dirname+'/Views/login.html');
  })
  .post(auth);

app.get('/admin',function(req,res){
	res.sendFile(__dirname+'/Views/admin.html');
	});

app.get('/productLoad',function(req,res){
	Product.find(function(err,data){
		console.log(data);
	res.send(data);
	})
	})

app.post('/productCreate',function(req,res){
	//console.log(req.body);
	var product=new Product({
	name:req.body.name,
	descname:req.body.descname,
	category:req.body.category,
	count:req.body.count,
	price:req.body.price,
	path:req.body.path
	})
	product.save(function(err,product){
	res.send(product);
	})
	})

app.post("/productUpdate",function(req,res){
	console.log(req.body);
	Product.update({_id:req.body._id},{$set:{
	name:req.body.name,
	descname:req.body.descname,
	category:req.body.category,
	count:req.body.count,
	price:req.body.price,
	path:req.body.path
	}
	},{multi:false},function(err,number){
	if(!err){
		console.log(number);
		res.send(number);
	}
	else console.log(err);
	})
	})

app.post('/productDelete',function(req,res){
	console.log(req.body);
	Product.remove({_id:req.body._id},function(err,data){
	console.log("deleted!");
	//console.log(data);
	res.send(data);
	})
})

app.get('/',function(req,res){
	res.sendFile(__dirname+'/Views/index.html');
});

app.post('/cartSendOrder',function(req,res){
	//console.log(req.body);
	var cartorder=new Cartorder({
		username:req.body.username,
		mail:req.body.mail,
		total:req.body.total,
		phone:req.body.phone,
		adress:req.body.adress,
		products:req.body.products

	})
	cartorder.save(function(req,order){
		res.send("order save!");
	})
})

//порт для прослуховування
app.listen(8080);
console.log('Server is running!');