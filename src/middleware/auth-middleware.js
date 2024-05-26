import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    // get authorization from header
    const token = req.get('Authorization');

    // check first whether there is token or not
    if (!token) {
        // if there is no token getting
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        // get user base on token
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
            }
        });

        if (!user) {
            // if it turns out the user doesn't exist
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        };
    };


};
