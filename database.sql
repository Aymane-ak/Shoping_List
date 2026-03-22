CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(150),
  price DECIMAL,
  bought BOOLEAN,
  created_at TIMESTAMP,
  list_id INT REFERENCES lists(id)
);