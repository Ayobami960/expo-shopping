import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId
            if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

            // find the user from the database if the user use clerk as auth
            const user = await User.findOne({ clerkId });
            if (!user) return res.status(404).json({ message: "User not found" });

            // attach the user into the req
            req.user = user

            next()
        } catch (error) {
            console.error("Error in protectRoute middleware", error);
            res.status(500).json({message: "Internal server error"});
        }
    }
]

export const adminOnly = (req, res, next) =>{
    if(!res.user){
        return res.status(401).json({message: "Unauthorized - user not found"});
    }

    if(req.user.email !== ENV.ADMIN_EMAIL){
        return  res.status(403).json({message: "Forbidden - admin access only"});
    }

    next();
}