CREATE TABLE primehuissier;
CREATE TABLE primehuissier(
    id SERIAL PRIMARY KEY ,
    libelle TEXT NOT NULL ,
    montant DOUBLE PRECISION ,
    dessociable TEXT NOT NULL ,
    impot TEXT NOT NULL ,
    mensuel TEXT NOT NULL
);
CREATE TABLE tachetable(
    id_tache SERIAL PRIMARY KEY,
    date_critique TEXT,
    date_rappel TEXT,
    resolu TEXT,
    personne_chargee TEXT,
    greffier TEXT,
    course TEXT,
    lieux TEXT,
    services TEXT,
    date_audience TEXT,
    date_decheance TEXT,
    id_doss INT ,
    FOREIGN KEY(id_doss) 
	  REFERENCES recherchedossier(id_dossier)
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