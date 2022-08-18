CREATE TABLE primehuissier;
CREATE TABLE primehuissier(
    id SERIAL PRIMARY KEY ,
    libelle TEXT NOT NULL ,
    montant DOUBLE PRECISION ,
    dessociable TEXT NOT NULL ,
    impot TEXT NOT NULL ,
    mensuel TEXT NOT NULL
);