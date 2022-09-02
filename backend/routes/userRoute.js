const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  ForgotPassword,
  resetPassword,
  UserDetails,
  updateUserPassword,
  updateProfile,
  getAllUsers,
  getOneUsers,
  updateRole,
  deleteRole,
  getAllUsersDates,
  getSellerUsersDates,
  addStrike,
  deleteStrike
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(ForgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, UserDetails);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin_one"), getAllUsers);
router
  .route("/admin/usersDates")
  .get(isAuthenticatedUser, authorizeRoles("admin_one"), getAllUsersDates);
router
  .route("/admin/sellerUsersDates")
  .get(isAuthenticatedUser, authorizeRoles("admin_one","admin"), getSellerUsersDates);
router
  .route("/admin/strike")
  .post(isAuthenticatedUser, authorizeRoles("admin_one"), addStrike);
router
  .route("/admin/deletestrike")
  .delete(isAuthenticatedUser, authorizeRoles("admin_one"), deleteStrike);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin_one"), getOneUsers)
  .put(isAuthenticatedUser, authorizeRoles("admin_one"), updateRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin_one"), deleteRole);

module.exports = router;
