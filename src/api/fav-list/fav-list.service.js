const FavList = require("./models/fav-list.model");

async function getAllFavLists() {
  return await FavList.find();
}

async function getFavListById(id) {
  return await FavList.findById(id);
}

async function createFavList(list) {
  return await FavList.create(list);
}

async function updateFavList(id, list) {
  return await FavList.findByIdAndUpdate(id, list, { new: true });
}
async function deleteFavList(id) {
  return await FavList.findByIdAndDelete(id);
}

module.exports = {
  getAllFavLists,
  getFavListById,
  createFavList,
  updateFavList,
  deleteFavList,
};
