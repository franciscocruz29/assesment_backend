const {
  createFavList,
  updateFavList,
  getAllFavLists,
  getFavListById,
  deleteFavList,
} = require("./fav-list.service");

async function handlerCreateFavList(req, res) {
  const data = req.body;
  const payload = { ...data };
  try {
    const favList = await createFavList(payload);
    res.status(201).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function handlerUpdateFav(req, res) {
  const { id } = req.params;
  const data = req.body;
  const payload = { ...data };
  try {
    const favList = await updateFavList(
      id,
      {
        $push: {
          favs: payload,
        },
      },
      { new: true }
    );
    res.status(200).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function handlerGetAllFavLists(req, res) {
  try {
    const allFavs = await getAllFavLists();
    res.status(200).json(allFavs);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function handlerGetFavListById(req, res) {
  const { id } = req.params;
  try {
    const favList = await getFavListById(id);
    res.status(200).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function handlerDeleteFavList(req, res) {
  const { id } = req.params;
  try {
    const favList = await deleteFavList(id);
    res.status(200).json(favList);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  handlerCreateFavList,
  handlerGetAllFavLists,
  handlerDeleteFavList,
  handlerGetFavListById,
  handlerUpdateFav,
};
