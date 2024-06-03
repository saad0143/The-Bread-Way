const express = require("express");
const cron = require("node-cron");
const router = express.Router();
const Event = require('../model/event')
const Shop = require('../model/Shop')
const { upload } = require('../multer');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller } = require("../middleware/Auth");
const ErrorHandler = require("../utils/ErrorHandler");

// create event
router.post(
    "/create-event", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
        try {
            const shopId = req.body.shopId;
            const shop = await Shop.findById(shopId);
            if (!shop) {
                return next(new ErrorHandler("Shop Id is invalid!", 400));
            } else {

                const files = req.files;
                const imageUrls = files.map((file) => `${file.filename}`)


                const eventData = req.body;
                eventData.images = imageUrls;
                eventData.shop = shop;

                const event = await Event.create(eventData);

                res.status(201).json({
                    success: true,
                    event,
                });
            }
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

router.get("/get-all-events", async (req, res, next) => {
    try {
        // Get all events
        const allEvents = await Event.find();

        // Filter out expired events
        const currentEvents = allEvents.filter(event => event.endDate > new Date());

        // Delete expired events from the database
        await Event.deleteMany({ endDate: { $lt: new Date() } });

        res.status(201).json({
            success: true,
            events: currentEvents,
        });
    } catch (error) {
        console.error(error);
        return next(new ErrorHandler(error, 400));
    }
});


// get all event of a shop
router.get(
    "/get-all-events/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const events = await Event.find({ shopId: req.params.id });

            res.status(201).json({
                success: true,
                events,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// delete event of a shop
router.delete(
    "/delete-shop-event/:id",
    isSeller,
    catchAsyncErrors(async (req, res, next) => {
        try {

            const product = await Event.findByIdAndDelete(req.params.id);


            if (!product) {
                return next(new ErrorHandler("Event is not found with this id", 404));
            }


            const filename = req.file.filename;
            const filepath = `uploads/${filename}`
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.log(err);
                }
            })

            res.status(201).json({
                success: true,
                message: "Event Deleted successfully!",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);





module.exports = router;