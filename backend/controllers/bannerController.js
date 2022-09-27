const Banner = require("../models/bannerModels")
const ApiFeatures = require("../utils/apiFeatures");
const Errorhandler = require("../utils/errorHandler");

// Creating Banner
exports.createBanner = async (req, res, next) => {
    req.body.user = req.user.id 
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, banner });
};
// Get all Banners
exports.getAllBanners = async (req, res) => {
    const resultPerPage = 20;
    let bannerCount = await Banner.countDocuments()
    const apiFeature = new ApiFeatures(Banner.find(), req.query)
        .pagination(resultPerPage);
    const banners = await apiFeature.query;
    res.status(200).json({ success: true, banners,bannerCount });
};

// Get Single Banner details
exports.getBannerDetails = async (req, res, next) => {
    let banner = await Banner.findById(req.params.id);
    if (!banner) {
        return next(new Errorhandler("Banner Not Found", 404));
    }
    res.status(200).json({
        success: true,
        banner,
    });
};
// Updating Banner
exports.updateBanner = async (req, res, next) => {
    let banner = await Banner.findById(req.params.id);
    if (!banner) {
        return res
            .status(500)
            .json({ success: false, message: "Banner not found" });
    }
    // Kamal Ki cheez
    banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
        // yahan pe hum product ki id find kr ke usko update kr rahaya hain with this
        new: true, // yahan pe hum schema new kr rahay hain
        runValidators: true, // yahan pe hum ne jo schema main validators lagay they unko true kr rahay hain
        useFindAndModify: false, // yeh humara hud dhoond ke nai karay ga edit
    });
    res.status(200).json({
        success: true,
        banner,
    });
};
//Delete banner
exports.deletebanner = async (req, res, next) => {
    let banner = await Banner.findById(req.params.id);
    if (!banner) {
        return res
            .status(500)
            .json({ success: false, message: "Banner not found" });
    }
    await banner.remove();
    res.status(200).json({
        success: true,
        message: "Banner deleted successfully",
    });
};