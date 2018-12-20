var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://bdtren:123Ren@ds163181.mlab.com:63181/se346_tutor", ["users"]);

//get all user
router.get("/users", function(req, res, next){
	db.users.find(function(err, users){
		if(err){
			res.send(err);

		}
		res.json(users);
	})
}); 

//Get Single user 
router.get("/users/:id", function(req, res, next){
	var io = req.app.io;
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, userInfo){
        if (err){
            res.send(err);
        }
        res.send(userInfo);
        io.emit("userInfo", userInfo);
    });
});

//Check user account
router.get("/userlogin", function(req, res, next){
	// db.users.ensureIndex({"coordinate":"2dsphere"});
	db.users.find({
			"account":{
                "userName":req.query.userName,
                "password":req.query.password		
			}
		}, function(err, account){
			if(err){
				res.send(err);

			}else{
				res.send(account);
			}
	});
});

//Get user email
router.get("/userEmail", function(req, res, next){
    var io = req.app.io;
	db.users.findOne({
            "email":req.query.email
		}, function(err, account){
			if(err){
                res.send(err);
            }else{
				res.send(account);
            }
    });
});

//Change user password
router.put("/userEmail", function(req, res, next){
    // db.users.ensureIndex({"coordinate":"2dsphere"});
    var io = req.app.io;
	db.users.findOne({
            "email":req.query.email
		}, function(err, account){
			if(err){
                res.send(err);
            }else{
                if(!account){
                    res.json({
                        error:"email null"
                    });	
                    return;
                } 
                
				db.users.update({email: req.query.email},{ $set: { 
                    account:{
                        userName:account.account.userName,
                        password: req.query.password
                    }
                }}, function(err, updatedUser){
                if (err){
                    res.send(err);
                }
                if (updatedUser){
                    //Get Confirmed user
                    db.users.findOne({email: req.query.email},function(error, confirmedUser){
                        if (error){
                            res.send(error);
                        }
                        res.send(confirmedUser);
                        io.emit("action", {
                            type:"USER_CHANGED_PASSWORD",
                            payload:confirmedUser
                        });
                    });
                }
            }
        )}
    });
});



router.post("/users", function(req, res, next){
	var user = req.body.data;
	var io = req.app.io;
	
	if(!user.name){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
		db.users.save(user, function(err, savedUser){
			if(err){
				res.send(err);
			}
			res.json(savedUser);
			io.emit("SignUp", savedUser);
		});
	}
});

// Driver Update user done on driver side
router.put("/users/:id", function(req, res, next){
    var io = req.app.io;
    var user = req.body;
    if (!user.status){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.users.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { 
        	driverId: user.driverId,
        	status: user.status 
        }}, function(err, updatedUser){
        if (err){
            res.send(err);
        }
        if (updatedUser){
            //Get Confirmed user
            db.users.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, confirmedUser){
                if (error){
                    res.send(error);
                }
                res.send(confirmedUser);
                io.emit("action", {
                    type:"USER_CONFIRMED",
                    payload:confirmedUser
                });
            });
        }
    });
    }
});




module.exports = router;




// router.get("/users", function(req, res, next){
// 	res.send("USERS")
// }); 