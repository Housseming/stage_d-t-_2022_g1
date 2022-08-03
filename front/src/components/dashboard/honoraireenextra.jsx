/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Honoraireenextra = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingHonoraire, setEdditingHonoraire] = useState(null);
  const [addingHonoraire, setAddingHonoraire] = useState({
    libelle: "",
    libelle_francais: "",
    montant: 0,
  });

  const columns = [
    { key: "1", title: "libelle", dataIndex: "libelle" },
    { key: "2", title: "libelle_francais", dataIndex: "libelle_francais" },
    { key: "3", title: "montant", dataIndex: "montant" },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editHonoraire(record);
                }}
              ></AiFillEdit>
              <p>modifier</p>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteHonoraire(record);
                }}
              ></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];

  //select Honoraire
  const getHonorairerequest = async () => {
    try {
      const response = await axios.get("/honoraireenextra");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getHonorairerequest();
  }, [listeservice]);
  console.log(listeservice);

  //supprimer une honoraire
  const deleteHonoraire = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer l'honoraire?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (honoraire) => honoraire.libelle !== record.libelle
        );
        setlisteservice(newlisteservice);
        deleteHonorairerequest(record.libelle);
        toast.success("Honoraire supprimé avec succès");
      },
    });
  };
  const deleteHonorairerequest = async (libelle) => {
    try {
      const deleted = await axios.post("/honoraireenextra/delete", {
        libelle: libelle,
      });
      console.log("Honoraire supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Honoraire
  const editHonoraire = (record) => {
    setIsEdit(true);
    setEdditingHonoraire({ ...record }); //copie mel record
  };

  const resetEditing = () => {
    setIsEdit(false);
    setEdditingHonoraire(null);
  };
  //lien aveclback pour la modif
  const editHonorairerequest = async (libelle, montant) => {
    try {
      const modified = await axios.post("/honoraireenextra/modif", {
        libelle: libelle,
        montant: montant,
      });
      console.log("Honoraire modifié");
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);

  const addHonoraire = async () => {
    try {
      const resp = await axios.post("/honoraireenextra", addingHonoraire);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
      <h1>Honoraire en extra</h1>
        <button className="btnadd"  onClick={() => {
            setIsAdd(true);
          }}
        >
          {" "}
          Ajouter
        </button>
        <div classname="tab">
          <Table
            columns={columns}
            dataSource={listeservice}
            style={{ with: 15 }}
            bordered={true}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="modifier Honoraire"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Honoraire) => {
              if (Honoraire.libelle === edditingHonoraire.libelle) {
                return edditingHonoraire;
              } else {
                return Honoraire;
              }
            });
            setlisteservice(newlisteservice);
            editHonorairerequest(
              edditingHonoraire.libelle,
              edditingHonoraire.montant
            );
            resetEditing();
            toast.success("Honoraire modifie avec succée");
          }}
        >
          <Input
            placeholder="libelle"
            value={edditingHonoraire?.libelle}
            onChange={(e) => {
              setEdditingHonoraire({
                ...edditingHonoraire,
                libelle: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="libelle_français"
            value={edditingHonoraire?.libelle_francais}
            onChange={(e) => {
              setEdditingHonoraire({
                ...edditingHonoraire,
                libelle_francais: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Montant"
            value={edditingHonoraire?.montant}
            onChange={(e) => {
              setEdditingHonoraire({
                ...edditingHonoraire,
                montant: e.target.value,
              });
            }}
          ></Input>

          {/*AJOUT*/}
        </Modal>
        <Modal
          title="ajouter "
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addHonoraire();
            setIsAdd(false);
            toast.success("Honoraire ajouté avec succès");
          }}
        >
          <Input
            placeholder="libelle"
            value={addingHonoraire.libelle}
            onChange={(e) => {
              setAddingHonoraire({
                ...addingHonoraire,
                libelle: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="libelle_francais"
            value={addingHonoraire.libelle_francais}
            onChange={(e) => {
              setAddingHonoraire({
                ...addingHonoraire,
                libelle_francais: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="montant"
            value={addingHonoraire.montant}
            onChange={(e) => {
              setAddingHonoraire({
                ...addingHonoraire,
                montant: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Honoraireenextra;
