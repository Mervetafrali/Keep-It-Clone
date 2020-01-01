CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,mailadd TEXT,upas TEXT);
INSERT INTO users (mailadd, upas) VALUES ('mervetafralii@gmail.com', '4153406');
INSERT INTO users (mailadd, upas) VALUES ('edanurtosun@gmail.com', '123456');
INSERT INTO users (mailadd, upas) VALUES ('edanudsfrtosun@gmail.com', '123456789');
CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT,tagname TEXT,renk TEXT);
INSERT INTO tags (tagname, renk) VALUES ('okul', 'kırmızı');

