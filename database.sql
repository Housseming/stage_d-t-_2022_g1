CREATE TABLE primehuissier;
CREATE TABLE primehuissier(
    id SERIAL PRIMARY KEY ,
    libelle TEXT NOT NULL ,
    montant DOUBLE PRECISION ,
    dessociable TEXT NOT NULL ,
    impot TEXT NOT NULL ,
    mensuel TEXT NOT NULL 
);
CREATE TABLE adversaire(
    id_adversaire SERIAL PRIMARY KEY,
    nom TEXT NOT NULL,
    registre TEXT,
    adresse TEXT,
    adressedesigne TEXT,
    avocat TEXT,
    adresseavocat TEXT,
    id_doss INT ,
    FOREIGN KEY(id_doss) 
	  REFERENCES recherchedossier(id_dossier)
);

CREATE TABLE collaboratortable (id SERIAL NOT NULL PRIMARY KEY , 
username TEXT,
cin VARCHAR(10) UNIQUE,
ville TEXT,
 rue TEXT,
  num INTEGER,
  codepostal INTEGER ,
   activite TEXT,
   tel VARCHAR(20),
   fax VARCHAR(20),
   email TEXT, 
   matricule VARCHAR(50),
    methodepaiment TEXT,
     MONTANT INTEGER,
     nbredossier INTEGER);