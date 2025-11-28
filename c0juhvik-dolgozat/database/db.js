const termekek = ('CREATE TABLE products IF NOT EXISTS').run();
const Ujtermekek = ('INSERT INTO products(TEXT name, INTEGER price, INTEGER amount)').execute();

const AllTermek = database.prepare((name, price, amount) => ('SELECT * WHERE products.name =?, products.price != NULL, products.amount != NULL')).run(); //GET ALL

const PostTermek = database.prepare((name, price, amount) => ('ADD products WHERE products.name =?, products.price != NULL, products.amount != NULL')).run(name, price, amount); //POST

const PutTermek = database.prepare((name, price, amount) => ('UPDATE products WHERE products.name =?, products.price != NULL, products.amount != NULL')).run(name, price, amount); //PUT