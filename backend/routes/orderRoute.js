const express = require("express");
const { newOrder, getSingleOrder, getAllOrders, getAllOrdersUsers, UpdateOrdersAdmin, deleteOrder } = require("../controllers/orderControllers");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");




router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/order/one/:id").get(isAuthenticatedUser,getSingleOrder)
router.route("/order/all").get(isAuthenticatedUser,authorizeRoles("admin_one"),getAllOrders) // For Admin
router.route("/order/allone").get(isAuthenticatedUser,getAllOrdersUsers) // For User
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin_one"),UpdateOrdersAdmin).delete(isAuthenticatedUser,authorizeRoles("admin_one"),deleteOrder) // For User
module.exports = router;
