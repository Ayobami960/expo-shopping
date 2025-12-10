import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";

const router = Router();


// optimization - DRY (it means do not repeat your code)
router.use(protectRoute)
// address routes
// order routes
router.post("/", createOrder);
router.get("/", getUserOrders);export default router

