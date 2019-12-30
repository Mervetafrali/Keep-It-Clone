CREATE TABLE IF NOT EXISTS portal (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,url TEXT,status INTEGER);
INSERT INTO portal (name, url, status) VALUES ('Kocaeli Üniversitesi', 'portal.kocaeli.edu.tr', '1');
INSERT INTO portal (name, url, status) VALUES ('Enformatik Bölümü', 'enformatik.kocaeli.edu.tr', '1');
INSERT INTO portal (name, url, status) VALUES ('Bilgisayar Mühendisliği', 'bilgisayar.kocaeli.edu.tr', '0');
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,mailadd TEXT,upas TEXT);
INSERT INTO users (mailadd, upas) VALUES ('mervetafralii@gmail.com', '4153406');
INSERT INTO users (mailadd, upas) VALUES ('edanurtosun@gmail.com', '123456');
INSERT INTO users (mailadd, upas) VALUES ('edanudsfrtosun@gmail.com', '123456789');
