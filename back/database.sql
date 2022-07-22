CREATE TABLE primehuissier;
CREATE TABLE primehuissier(
    id SERIAL PRIMARY KEY ,
    libelle VARCHAR(100) NOT NULL ,
    montant DOUBLE PRECISION ,
    dessociable VARCHAR(8) NOT NULL ,
    impot VARCHAR(8) NOT NULL ,
    mensuel VARCHAR(8) NOT NULL ,
);