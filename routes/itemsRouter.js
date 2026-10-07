const { Router } = require("express");
const itemRouter = Router();
const {
  getAllCategories,
  insertNewCategory,
  getCategoryItems,
  getAllItems,
  getItem,
  insertItem,
  updateCategory,
  deleteCategory,
} = require("../controllers/handleCategory");

itemRouter.get("/categories", getAllCategories);
itemRouter.get("/categories/new", (req, res) => {
  res.render("add-categories");
});
itemRouter.get("/categories/new/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  res.render("add-item", { categoryId });
});

itemRouter.get("/categories/editCategories/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  res.render("update-categories", { categoryId });
});
itemRouter.post("/categories/:categoryId/update", updateCategory);
itemRouter.post("/items/new/saveItem/:categoryId", insertItem);

itemRouter.get("/items", getAllItems);
itemRouter.get("/categories/:categoryId", getCategoryItems);
itemRouter.get("/items/:itemId", getItem);
itemRouter.post("/categories/new/saveCategory", insertNewCategory);
itemRouter.get("/categories/delete/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  res.render("delete", { category: { _id: categoryId } });
});
itemRouter.get("/categories/:categoryId/delete/confirm", deleteCategory);

itemRouter.get("/", (req, res) => {
  res.render("index");
});

module.exports = itemRouter;
