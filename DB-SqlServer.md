# Gestione_Ferramenta
Sql server db, c# backend, html, bootstrap, jaavascript front end


``` Sql server
DROP TABLE IF EXISTS Prodotto

CREATE TABLE Prodotto(
	prodottoID INT PRIMARY KEY IDENTITY(1,1),
	codice VARCHAR(250) UNIQUE DEFAULT NEWID(),
	nome VARCHAR(250) NOT NULL,
	categoria VARCHAR(250) NOT NULL,
	descrizione TEXT,
	prezzo DECIMAL(10,2) NOT NULL CHECK(prezzo>=0),
	quantita INT DEFAULT 0 CHECK(quantita>=0),
	dataCreazione DATETIME DEFAULT CURRENT_TIMESTAMP 
);

INSERT INTO Prodotto (nome, categoria, descrizione, prezzo, quantita)
VALUES 
    ('Martello', 'Utensili', 'Martello da carpentiere in acciaio forgiato', 15.99, 50),
    ('Chiodi', 'Materiali da costruzione', 'Scatola di chiodi zincati da 3 pollici', 5.49, 1000),
    ('Sega circolare', 'Utensili elettrici', 'Sega circolare con lama in metallo duro', 89.99, 20),
    ('Vite autofilettante', 'Ferramenta', 'Vite autofilettante in acciaio zincato', 0.25, 500),
    ('Pennello', 'Pittura', 'Pennello in setola naturale per pittura murale', 8.75, 30);

```