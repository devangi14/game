var express=require("express");
var app=express();
var methodOverride=require("method-override");
var mongoose=require("mongoose");
var passport=require("passport");
var User=require("./models/user");
var Upload=require("./models/upload");
var Game=require("./models/games");
var Reward=require("./models/reward");
var Reference=require("./models/ref");
var Content=require("./models/content");
var middleware=require("./middleware");
var localstrategy=require("passport-local");
var passportlocalmongoose=require("passport-local-mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/sppu",{ useNewUrlParser: true });
var gameRoutes=require("./routes/games");
var refRoutes=require("./routes/ref");
var uploadRoutes=require("./routes/uploads");
var contentRoutes=require("./routes/contents");
var rewardRoutes=require("./routes/rewards");
var flash=require("connect-flash");
var bodyparser=require("body-parser");
app.use(express.static(__dirname+"/views"));
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

app.locals.moment = require('moment');
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"DEVAA",
    resave:false,
    saveUninitialized:false
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use("/games",gameRoutes);
app.use("/games/:id/contents",contentRoutes);
app.use("/games/:id/rewards",rewardRoutes);
app.use("/ref",refRoutes);
app.use("/ref/:id/contents",contentRoutes);

app.get("/",function(req,res){
    
    res.render("nav");
});

app.get("/ref",middleware.isLoggedIn,function(req,res){
    
    res.render("ref");
});

app.get("/match",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
    res.render("match");
});

app.get("/match_page",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
    res.render("match_page");
});

app.get("/extra",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
    res.render("rewards/extra");
});

app.post("/extra",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
    Reward.create(req.body.reward,function(err,reward){
        if(err)
        {req.flash("error","something went wrong");
            console.log(err);
        }else{
            User.find({},function(err,users){
                if(err)
        {
            console.log(err);
        }else{
            users.forEach(function(use){
                use.rewards.push(reward);
                use.save();
            });}});
           console.log(reward+"extra reward");
            res.redirect("/profile");
        }
     }
     );
});

app.get("/getscore",middleware.isLoggedIn,function(req,res){
    res.render("games/getscore");
});


app.get("/profile",middleware.isLoggedIn,function(req,res){
    Reward.find({},function(err,rewards){
        var flag=1;
        if(err){
        console.log("SOMETHING WENT WRONG");
        }else{

     res.render("prof",{flag:flag,rewards:rewards,user:req.user});
        }
        });
    
});



app.get("/game2",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
    res.render("diff_page");
});
app.get("/diff",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
    res.render("diff");
});

app.get("/register",function(req,res){
    res.render("signin");
    });

    app.get("/quiz",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
        res.render("quiz");
        });
        
        app.get("/about",function(req,res){
            res.render("about");
            });
        

        // app.get("/games",isLoggedIn,function(req,res){
        //     if(req.isAuthenticated()){
        //         console.log(req.user.username);
        //         if(req.user.username==="deva@gmail.com"){
        //             console.log("hi there");

        //     }}
        //     res.render("games");
        //     });

        app.get("/quiz_game",middleware.isLoggedIn,middleware.checkOwnership,function(req,res){
            res.render("quiz_game");
            });


    app.post("/register",function(req,res){
        var newUser=new User({username:req.body.username})
        User.register(newUser,  req.body.password,function(err,user){
            if(err){
                req.flash("error",err.message);
               return res.render("signin");
            }
            passport.authenticate("local")(req,res,function(){
                req.flash("success","welcome to yelp camp "+user.username);
                res.redirect("/games");
            });
        });
    
            });

 app.get("/login",function(req,res){
    res.render("login");
    });

    app.post("/login",passport.authenticate("local",{
        successRedirect:"/games",
        failureRedirect:"/login"
    }),function(req,res){
      
        });

        app.get("/logout",function(req,res){
            
            req.logout();
            req.flash("success","you have logged out");

            res.redirect("/");
            });

            


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});