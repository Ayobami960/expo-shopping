import { Router } from "express";
import { addAddress, addToWishlist, deleteAddress, getAddresses, getWishlist, removeFromWishlist, updateAddress } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();


// optimization - DRY (it means do not repit your code)
router.use(protectRoute)

// address routes
router.post("/addresses", addAddress);
router.get("/addresses",  getAddresses);
router.put("/addresses/:addressId",  updateAddress);
router.delete("/addresses/:addressId", deleteAddress);



// wishlist routes

router.post("/wishlish", addToWishlist)
router.delete("/wishlish/:productId", removeFromWishlist)
router.delete("/wishlish", getWishlist)

export default router

