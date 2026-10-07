const db = require("../model/queries");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  const totalItems = await Promise.all(
    categories.map((category) => db.totalNumItems(category.id)),
  );
  res.render("categories", { categories, totalItems });
}

async function insertNewCategory(req, res) {
  const { name, description } = req.body;
  await db.insertNewCategory(name, description);
  res.redirect("/categories");
}

async function getCategoryItems(req, res) {
  const categoryId = req.params.categoryId;
  const items = await db.getCategoryItems(categoryId);
  const category = await db.getCategoryName(categoryId);
  console.log(category.name);
  res.render("items-card", { items, category });
}

async function getAllItems(req, res) {
  const allItems = await db.getAllItems();
  res.render("items-card", {
    items: allItems,
    category: { name: "All Items" },
  });
}

async function getItem(req, res) {
  const itemId = req.params.itemId;
  const item = await db.getItem(itemId);
  const category = await db.getCategoryName(item.category_id);
  res.render("item-card", { item, category });
}

async function insertItem(req, res) {
  const categoryId = Number(req.params.categoryId);
  const { name, description, manufacturer, quantity, price } = req.body;
  await db.insertItem(
    name,
    description,
    manufacturer,
    price,
    quantity,
    categoryId,
  );
  res.redirect(`/categories/${categoryId}`);
}

async function updateCategory(req, res) {
  const categoryId = req.params.categoryId;
  const { name, description } = req.body;
  await db.updateCategory(name, description, categoryId);
  res.redirect("/categories");
}

async function deleteCategory(req, res) {
  const categoryId = req.params.categoryId;
  await db.deleteCategory(categoryId);
  res.redirect("/categories");
}

module.exports = {
  getAllCategories,
  insertNewCategory,
  getCategoryItems,
  getAllItems,
  getItem,
  insertItem,
  updateCategory,
  deleteCategory,
};
