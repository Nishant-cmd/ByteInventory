const pool = require('../config/pool');

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function insertNewCategory(categoryName, description) {
  await pool.query(`INSERT INTO categories (name , description) VALUES($1,$2)`, [
    categoryName,
    description,
  ]);
}

async function totalNumItems(category_id) {
  const { rows } = await pool.query(`SELECT COUNT(*) FROM items WHERE category_id= $1`, [
    category_id,
  ]);
  return rows[0].count;
}

async function getCategoryItems(category_id) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE category_id=$1`, [category_id]);
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query(`SELECT * FROM items`);
  return rows;
}

async function getItem(item_id) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE items.item_id=$1`, [item_id]);
  return rows[0];
}

async function getCategoryName(category_id) {
  const { rows } = await pool.query(
    `SELECT categories.name FROM categories WHERE categories.id=$1`,
    [Number(category_id)],
  );
  return rows[0];
}

async function updateCategory(name, description, category_id) {
  console.log(category_id);
  console.log(typeof(category_id))
  await pool.query(
    `UPDATE categories SET name=$1,description=$2
        WHERE id=$3`,
    [name, description, category_id],
  );
}

async function insertItem(
  item_name,
  item_description,
  item_manufacturer,
  item_price,
  item_quantity,
  item_category_id,
) {
  await pool.query(
    `INSERT INTO items(name,description,manufacturer,price,quantity,category_id)VALUES($1,$2,$3,$4,$5,$6)`,
    [item_name, item_description, item_manufacturer, item_price, item_quantity, item_category_id],
  );
}

async function deleteCategory(category_id) {
  await pool.query(`DELETE FROM items WHERE items.category_id=$1`, [Number(category_id)]);
  await pool.query(`DELETE FROM categories WHERE categories.id=$1`, [Number(category_id)]);
}

module.exports = {
  getAllCategories,
  insertNewCategory,
  totalNumItems,
  getCategoryItems,
  getCategoryName,
  getAllItems,
  getItem,
  insertItem,
  deleteCategory,
  updateCategory,
};
