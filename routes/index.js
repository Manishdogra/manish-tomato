const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const reviewController = require("../controllers/reviewController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/user", userController.userList);
// Do work here
//router.get('/', catchErrors(storeController.getStores));
router.get("/", authController.isLoggedIn, userController.homePage);
router.get("/stores", catchErrors(storeController.getStores));
router.get("/stores/page/:page", catchErrors(storeController.getStores));
router.get("/add", authController.isLoggedIn, storeController.addStore);

//Admin Panel
router.get("/admin", authController.adminPage);

router.post("/data", reviewController.deleteReview);

router.post(
  "/add",
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post("/add/:id", catchErrors(storeController.updateStore));

router.get("/stores/:id/edit", catchErrors(storeController.editStore));

router.get("/store/:slug", catchErrors(storeController.getStoreBySlug));

router.get("/tags", catchErrors(storeController.getStoresByTag));
router.get("/tags/:tag", catchErrors(storeController.getStoresByTag));

// router.get("/login", userController.loginForm);
router.get("/login", userController.homePage);

router.post("/login", authController.login);
router.get("/register", userController.registerForm);

//Validate User
router.post(
  "/register",
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get("/logout", authController.logout);

router.get("/account", authController.isLoggedIn, userController.account);
router.post("/account", catchErrors(userController.updateAccount));

router.post("/account/forgot", catchErrors(authController.forgot));
router.get("/account/reset/:token", catchErrors(authController.reset));
router.post(
  "/account/reset/:token",
  authController.confirmPasswords,
  catchErrors(authController.update)
);

router.post(
  "/reviews/:id",
  authController.isLoggedIn,
  catchErrors(reviewController.addReview)
);

router.get("/top", catchErrors(storeController.getTopStores));
router.get("/hearts", catchErrors(storeController.getHearts));
router.get("/map", storeController.mapPage);

/* API*/

router.get("/api/search", catchErrors(storeController.searchStores));

router.get("/api/stores/near", catchErrors(storeController.mapStores));

router.post("/api/stores/:id/heart", catchErrors(storeController.heartStore));

module.exports = router;
