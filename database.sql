DROP DATABASE IF EXISTS launchstoredb;
CREATE DATABASE launchstoredb;


CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" int,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "status" int DEFAULT 1,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "product_id" int
);
ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

INSERT INTO categories(name) VALUES('Moda');
INSERT INTO categories(name) VALUES('Esporte');
INSERT INTO categories(name) VALUES('Tecnologia');
INSERT INTO categories(name) VALUES('Livros e CDs');
INSERT INTO categories(name) VALUES('Jóias e Relógios');
INSERT INTO categories(name) VALUES('Produtos para bebês');
INSERT INTO categories(name) VALUES('Brinquedos');


CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" text UNIQUE NOT NULL,
  "cep" text,
  "address" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

--foreign key--
ALTER TABLE "products" ADD FOREIGN KEY("user_id") REFERENCES "users" ("id");

--create procedure--
CREATE FUNCTION  trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at=NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--auto updated_at products
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();

--auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW 
EXECUTE PROCEDURE trigger_set_timestamp();