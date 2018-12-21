var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://bdtren:123Ren@ds163181.mlab.com:63181/se346_tutor", ["users"]);

//----------------------------------
//GET
//----------------------------------

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
	db.users.findOne({
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

//get nearby user
router.get("/userLocation", function(req, res, next){
	db.users.ensureIndex({"coordinate":"2dsphere"});
	db.users.find({
			"coordinate":{
				"$near":{
					"$geometry":{
						"type":"Point",
						"coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
					},
					"$maxDistance":10000
				}
			}
		}, function(err, location){
			if(err){
				res.send(err);

			}else{
				res.send(location);
			}
	});
});

//----------------------------------
//UPDATE
//----------------------------------

//Update user Info by query
router.put("/user/:id", function(req, res, next){
	// db.users.ensureIndex({"coordinate":"2dsphere"});
	var io = req.app.io;
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, userInfo){
        if (err){
            res.send(err);
        }else{
            if(!userInfo){
                res.json({
                    error:"account null"
                });	
                return;
            } 
            db.users.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { 
                "name": req.query.name||userInfo.name,
                "dob": req.query.dob||userInfo.dob,
                "phoneNumber": req.query.phoneNumber||userInfo.phoneNumber,
                "email": req.query.email||userInfo.email,
                "rating": req.query.rating||userInfo.rating,
                "dCreate": req.query.dCreate||userInfo.dCreate,
                "profilePic": req.query.profilePic||userInfo.profilePic,
                "account":{
                    "userName":req.query.userName||userInfo.account.userName,
                    "password": req.query.password||userInfo.account.password
                },
                "location": {
                    "latitude": req.query.latitude||userInfo.location.latitude,
                    "longitude": req.query.longitude||userInfo.location.longitude,
                },
                "coordinate": {
                    "type": "Point",
                    "coordinates": [
                        parseFloat(req.query.latitude||userInfo.location.longitude),
                        parseFloat(req.query.longitude||userInfo.location.latitude)
                    ]
                }, 
                "vehicle":req.query.vehicle||userInfo.vehicle
            }}, function(err, updatedUser){
            if (err){
                res.send(err);
            }
            if (updatedUser){
                //Get changed user
                db.users.findOne({_id: mongojs.ObjectId(req.params.id)},function(error, changedUser){
                    if (error){
                        res.send(error);
                    }
                    res.send(changedUser);
                });
            }
        })
        // io.emit("userInfo", userInfo);
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


//----------------------------------
//CREATE
//----------------------------------

router.post("/users", function(req, res, next){
	var user = req.body.data;
	var io = req.app.io;
	
	if(!user.name){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
        user.vehicle=user.vehicle=="false"||!user.vehicle?false:true;
		db.users.save(user, function(err, savedUser){
			if(err){
				res.send(err);
			}
			res.json(savedUser);
			io.emit("SignUp", savedUser);
		});
	}
});




module.exports = router;




// router.get("/users", function(req, res, next){
// 	res.send("USERS")
// }); 