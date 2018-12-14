var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://bdtren:123Ren@ds163181.mlab.com:63181/se346_tutor", ["users"]);

router.get("/users", function(req, res, next){
	db.users.find(function(err, users){
		if(err){
			res.send(err);

		}
		res.json(users);
	})
}); 

router.post("/users", function(req, res, next){
	var user = req.body.data;
	var nearByDriver = req.body.nearByDriver;
	var io = req.app.io;

	if(!user.userName){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
		db.users.save(users, function(err, savedUser){
			if(err){
				res.send(err);
			}
			res.json(savedUser);
			if(nearByDriver.socketId){
				io.emit(nearByDriver.socketId + "driverRequest", savedUser);
			}else{
				console.log("Driver not connected");
			}
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