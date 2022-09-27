const Errorhandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new Errorhandler("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET); //yeh jo hai woh JWTToken le ga ua rsecret bhi aus main se id fetch kr ke store kr le ga jo hum ne usermodels main dii thi JWTToken banatay waqt

    req.user = await User.findById(decodedData.id); // ab us id ko hum userModel ke zariya access karain gay aur jab tak woh login haui us ka data receive rk saktay hain
    next();
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // jaisay hum ne uper req.user main sara user ka data save kr liya tha us main se role access kiya hai
        if (!roles.includes(req.user.role)) {
            return next(
                new Errorhandler(
                    `Role: ${req.user.role} is not allowed access this resource`,
                    403
                )
            );
        }

        next();
    };
};
