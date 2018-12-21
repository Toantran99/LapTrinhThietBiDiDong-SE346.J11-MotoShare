var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs("mongodb://bdtren:123Ren@ds163181.mlab.com:63181/se346_tutor", ["bookings"]);

//----------------------------------
//GET
//----------------------------------
router.get("/bookings", function(req, res, next){
	db.bookings.find(function(err, bookings){
		if(err){
			res.send(err);
	
		}
		res.json({user:req.query.userName,
			bookings});
	})
	
	
}); 

router.get("/bookings/:id", function(req, res, next){
	var io = req.app.io;
    db.bookings.find({_id: mongojs.ObjectId(req.params.id)},function(err, bookingInfo){
        if (err){
            res.send(err);
        }
        res.send(bookingInfo);
        io.emit("bookingInfo", bookingInfo);
    });
});

//get booking query
router.get("/bookingHistory", function(req, res, next){
	// db.bookings.ensureIndex({"coordinate":"2dsphere"});
	db.bookings.find({
			userName: req.query.userName
			
		}, function(err, history){
			if(err){
				res.send(err);

			}else{
				res.send(history);
			}
	});

});

//Get nearby waiting booking
router.get("/bookingLocation", function(req, res, next){
	db.bookings.ensureIndex({"coordinate":"2d"});
	db.bookings.find({
			"pickUp":{
				"coordinates":{"$near": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)],
				"$maxDistance":10000
					},
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
//CREATE
//----------------------------------

router.post("/bookings", function(req, res, next){
	var booking = req.body.data;
	var nearByDriver = req.body.nearByDriver;
	var io = req.app.io;

	if(!booking.userName){
		res.status(400);
		res.json({
			error:"Bad data"
		});	
	} else {
		booking.pickUp.coordinates = [parseFloat(booking.pickUp.coordinates[0]),parseFloat(booking.pickUp.coordinates[1])];
		booking.dropOff.coordinates = [parseFloat(booking.dropOff.coordinates[0]),parseFloat(booking.dropOff.coordinates[1])];
		db.bookings.save(booking, function(err, savedBooking){
			if(err){
				res.send(err);
			}
			res.json(savedBooking);
			if(nearByDriver.socketId){
				io.emit(nearByDriver.socketId + "driverRequest", savedBooking);
			}else{
				console.log("Driver not connected");
			}
		});
	}
});

//----------------------------------
//DELETE
//----------------------------------

//Delete a single booking by ID
router.delete("/bookings/:id", function(req, res, next){
	var io = req.app.io;
	var id = mongojs.ObjectId(req.params.id);
    db.bookings.remove({_id: id},function(err, deletingInfo){
        if (err){
            res.send(err);
        }
		res.send({deletingInfo,id});
        io.emit("deletingInfo", deletingInfo);
    });
});

//----------------------------------
//UPDATE
//----------------------------------

// Driver Update Booking done on driver side
router.put("/bookings/:id", function(req, res, next){
    var io = req.app.io;
    var booking = req.body;
    if (!booking.status){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.bookings.update({_id: mongojs.ObjectId(req.params.id)},{ $set: { 
        	driverId: booking.driverId,
        	status: booking.status 
        }}, function(err, updatedBooking){
        if (err){
            res.send(err);
        }
        if (updatedBooking){
            //Get Confirmed booking
            db.bookings.findOne({_id:  mongojs.ObjectId(req.params.id)},function(error, confirmedBooking){
                if (error){
                    res.send(error);
                }
                res.send(confirmedBooking);
                io.emit("action", {
                    type:"BOOKING_CONFIRMED",
                    payload:confirmedBooking
                });
            });
        }
    });
    }
});




module.exports = router;




// router.get("/bookings", function(req, res, next){
// 	res.send("BOOKINGS")
// }); 