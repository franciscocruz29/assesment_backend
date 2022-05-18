const { Router } = require("express");
const {
  handlerCreateFavList,
  handlerGetAllFavLists,
  handlerGetFavListById,
  handlerDeleteFavList,
  handlerUpdateFav,
} = require("./fav-list.controller");
const { isAuthenticated } = require("../../auth/auth.service");
const router = Router();

router.post("/", isAuthenticated(), handlerCreateFavList);
router.get("/", isAuthenticated(), handlerGetAllFavLists);
router.get("/:id", isAuthenticated(), handlerGetFavListById);
router.delete("/:id", isAuthenticated(), handlerDeleteFavList);
router.post("/:id/add-fav", isAuthenticated(), handlerUpdateFav);

module.exports = router;
