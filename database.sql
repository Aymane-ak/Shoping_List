CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  image_url TEXT,  
  barcode VARCHAR(50),
  brand VARCHAR(100),
  calories DECIMAL,
  product_size VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(), 
  nutriscore VARCHAR(5)
);


CREATE TABLE list_products ( 
  id SERIAL PRIMARY KEY,
  list_id INT REFERENCES lists(id),
  product_id INT REFERENCES products(id),
  bought BOOLEAN  DEFAULT false,  
  quantity INT DEFAULT 1
)
-- price DECIMAL,
