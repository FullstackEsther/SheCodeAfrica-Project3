const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization; // get the authorization header

    if (authHeader) {

        const token = authHeader.split(' ')[1]; // get the token from the header

        jwt.verify(token, processs.env.SECRET, async (err, user) => {

            if (err) {
                return res.status(403).json({message: 'Token is not valid'});
            }
            req.user = user;
            next();

        });

    }
}


const veryAndAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {

        if (req.user.userType === "Client" || request.user.userType=== "Admin" || request.user.userType === "Vendor" || request.user.userType === "Driver"){
            next();
        } else {
            return res.status(403).json({message: 'You are not authorized to perform this action'});
        }

    })
}


const verifyVendor = (req, res, next) => {

        verifyToken(req, res, () => {

            if (req.user.userType === "Admin" || req.user.userType === "Vendor"){
                next();
            } else {
                return res.status(403).json({message: 'You are not authorized to perform this action'});
            }

        })
}

const verifyDriver = (req, res, next) => {

    verifyToken(req, res, () => {

        if (req.user.userType === "Admin" || req.user.userType === "Driver"){
            next();
        } else {
            return res.status(403).json({message: 'You are not authorized to perform this action'});
        }

    })
}


const verifyAdmin = (req, res, next) => {

        verifyToken(req, res, () => {

            if (req.user.userType === "Admin"){
                next();
            } else {
                return res.status(403).json({message: 'You are not authorized to perform this action'});
            }

        })

}




module.exports = {verifyToken, veryAndAuthorization, verifyVendor, verifyDriver, verifyAdmin};
