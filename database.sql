CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(150),
  image_url TEXT, 
  price DECIMAL,
  barcode VARCHAR(50),
  brand VARCHAR(100),
  calories DECIMAL,
  product_size VARCHAR(50)
  bought BOOLEAN  DEFAULT false ,
  created_at TIMESTAMP DEFAULT NOW(), 
  list_id INT REFERENCES lists(id),
  nutriscore VARCHAR(5)
);

