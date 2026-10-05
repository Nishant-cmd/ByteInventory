const { Client } = require('pg');
const path = require('node:path');
const { loadEnvFile } = require('node:process');
loadEnvFile(path.join(__dirname, '../.env'));

const SQL = ` 

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    item_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    manufacturer VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    categoryName VARCHAR(255) NOT NULL,
    categoryId INTEGER REFERENCES categories(id)
);

INSERT INTO categories(name,description) VALUES('Controller','Game/PC controllers'),
('Graphics Cards','High-performance graphics cards for gaming'),
('Memory','High-speed RAM modules'),
('Processors','High-performance processors for gaming'),
('Storage','Solid-state drives and other storage devices');

INSERT INTO items(name,description,manufacturer,price,quantity,categoryName,categoryId) VALUES('Xbox Controller','Wireless controller for Xbox','Microsoft',59.99,100,'Controller',1),
('NVIDIA GeForce RTX 3080','High-end graphics card','NVIDIA',699.99,50,'Graphics Cards',2),
('Corsair Vengeance LPX 16GB','High-speed RAM module','Corsair',79.99,200,'Memory',3),
('AMD Ryzen 9 5900X','High-performance processor','AMD',499.99,30,'Processors',4),
('Samsung 970 EVO 1TB','Fast SSD for gaming','Samsung',149.99,75,'Storage',5);

`;

async function initializeDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

initializeDatabase();
