/* This example requires Tailwind CSS v2.0+ */
//pour modifier le
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Timbre = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingTimbre, setEdditingTimbre] = useState(null);
  const [addingTimbre, setAddingTimbre] = useState({
    libelle: "",

    montant: 0,
  });

  const columns = [
    { key: "1", title: "libelle", dataIndex: "libelle" },

    { key: "2", title: "montant", dataIndex: "montant" },
    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editTimbre(record);
                }}
              ></AiFillEdit>
              <p>modifier</p>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteTimbre(record);
                }}
              ></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];

  //select Timbre
  const getTimbrerequest = async () => {
    try {
      const response = await axios.get("/timbre");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTimbrerequest();
  }, [listeservice]);
  console.log(listeservice);

  //supprimer une Timbre
  const deleteTimbre = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer l'Timbre?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Timbre) => Timbre.libelle !== record.libelle
        );
        setlisteservice(newlisteservice);
        deleteTimbrerequest(record.libelle);
        toast.success("Timbre supprimé avec succès");
      },
    });
  };
  const deleteTimbrerequest = async (libelle) => {
    try {
      const deleted = await axios.post("/timbre/delete", {
        libelle: libelle,
      });
      console.log("Timbre supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Timbre
  const editTimbre = (record) => {
    setIsEdit(true);
    setEdditingTimbre({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingTimbre(null);
  };
  //lien aveclback pour la modif
  const editTimbrerequest = async (libelle, montant) => {
    try {
      const modified = await axios.post("/timbre/modif", {
        libelle: libelle,
        montant: montant,
      });
      console.log("Timbre modifié");
    } catch (error) {
      console.log(error);
    }
  };
  ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);

  const addTimbre = async () => {
    try {
      const resp = await axios.post("/timbre", addingTimbre);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
      <h1>Timbres</h1> 
        <Button className="btnadd"  onClick={() => {
            setIsAdd(true);
          }}
        >
          {" "}
          Ajouter
        </Button>
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
          title="modifier Timbre"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Timbre) => {
              if (Timbre.libelle === edditingTimbre.libelle) {
                return edditingTimbre;
              } else {
                return Timbre;
              }
            });
            setlisteservice(newlisteservice);
            editTimbrerequest(edditingTimbre.libelle, edditingTimbre.montant);
            resetEditing();
            toast.success("Timbre modifie avec succée");
          }}
        >
          <Input
            placeholder="libelle"
            value={edditingTimbre?.libelle}
            onChange={(e) => {
              setEdditingTimbre({
                ...edditingTimbre,
                libelle: e.target.value,
              });
            }}
          ></Input>

          <Input
            placeholder="Montant"
            value={edditingTimbre?.montant}
            onChange={(e) => {
              setEdditingTimbre({ ...edditingTimbre, montant: e.target.value });
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
            addTimbre();
            setIsAdd(false);
            toast.success("Timbre ajouté avec succès");
          }}
        >
          <Input
            placeholder="libelle"
            value={addingTimbre.libelle}
            onChange={(e) => {
              setAddingTimbre({
                ...addingTimbre,
                libelle: e.target.value,
              });
            }}
          ></Input>

          <Input
            placeholder="montant"
            value={addingTimbre.montant}
            onChange={(e) => {
              setAddingTimbre({
                ...addingTimbre,
                montant: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Timbre;
