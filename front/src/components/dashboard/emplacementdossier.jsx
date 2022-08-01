/* This example requires Tailwind CSS v2.0+ */
//il vaut mieux l'id a ne pas toucher
// houwa fama par defaut mahomsh mnadhmin besh nemshy nhawel nadhmhom f data base
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Emplacementdossier = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingEmplacementdossier, setEdditingEmplacementdossier] =
    useState(null);
  const [addingEmplacementdossier, setAddingEmplacementdossier] = useState({
    id: "",
    libelle: "",
  });

  const columns = [
    { key: "1", title: "libelle", dataIndex: "libelle" },

    {
      key: "2",
      title: "id",
      dataIndex: "id",
      //sorter:(record1,record2)=>
      //{ return record1.id<record2.id}
    },
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
                  editEmplacementdossier(record);
                }}
              ></AiFillEdit>
              <p>modifier</p>
            </div>
            {
              <div className="divdelete">
                <MdDeleteForever
                  className="delete"
                  onClick={() => {
                    deleteEmplacementdossier(record);
                  }}
                ></MdDeleteForever>

                <p>supprimer</p>
              </div>
            }
          </div>
        );
      },
    },
  ];

  //select Emplacementdossier
  const getEmplacementdossierrequest = async () => {
    try {
      const response = await axios.get("/emplacementdossier");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getEmplacementdossierrequest();
  }, [listeservice]);
  console.log(listeservice);

  //supprimer une Emplacementdossier
  const deleteEmplacementdossier = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer l'Emplacementdossier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Emplacementdossier) => Emplacementdossier.libelle !== record.libelle
        );
        setlisteservice(newlisteservice);
        deleteEmplacementdossierrequest(record.libelle);
        toast.success("Emplacementdossier supprimé avec succès");
      },
    });
  };
  const deleteEmplacementdossierrequest = async (id) => {
    try {
      const deleted = await axios.post("/emplacementdossier/delete", {
        id: id,
      });
      console.log("Emplacement_dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Emplacementdossier
  const editEmplacementdossier = (record) => {
    setIsEdit(true);
    setEdditingEmplacementdossier({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingEmplacementdossier(null);
  };
  //lien aveclback pour la modif
  const editEmplacementdossierrequest = async (id, libelle) => {
    try {
      const modified = await axios.post("/emplacementdossier/modif", {
        id: id,
        libelle: libelle,
      });
      console.log("emplacement_dossier_modifié", id, libelle);
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout

  const [isAdd, setIsAdd] = useState(false);

  const addEmplacementdossier = async () => {
    try {
      const resp = await axios.post(
        "/emplacementdossier",
        addingEmplacementdossier
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>Emplacement dossier</h1>
        {<button className="btnadd"  onClick={() => {
            setIsAdd(true);
          } }> Ajouter</button>}
        <div classname="tab">
          <Table
            columns={columns}
            dataSource={listeservice}
            style={{ with: 15 }}
            bordered={true}
            pagination={false}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="modifier libelle"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Emplacementdossier) => {
              if (Emplacementdossier.id === edditingEmplacementdossier.id) {
                return edditingEmplacementdossier;
              } else {
                return Emplacementdossier;
              }
            });
            setlisteservice(newlisteservice);
            editEmplacementdossierrequest(
              edditingEmplacementdossier.id,
              edditingEmplacementdossier.libelle
            );
            resetEditing();
            toast.success("Emplacementdossier modifié avec succée");
          }}
        >
          <Input
            placeholder="id"
            value={edditingEmplacementdossier?.id}
            onChange={(e) => {
              setEdditingEmplacementdossier({
                ...edditingEmplacementdossier,
                id: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="libelle"
            value={edditingEmplacementdossier?.libelle}
            onChange={(e) => {
              setEdditingEmplacementdossier({
                ...edditingEmplacementdossier,
                libelle: e.target.value,
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
            addEmplacementdossier();
            setIsAdd(false);
            toast.success("Emplacement_dossier_ajouté avec succès");
          }}
        >
          <Input
            placeholder="id"
            value={addingEmplacementdossier.id}
            onChange={(e) => {
              setAddingEmplacementdossier({
                ...addingEmplacementdossier,
                id: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="libelle"
            value={addingEmplacementdossier.libelle}
            onChange={(e) => {
              setAddingEmplacementdossier({
                ...addingEmplacementdossier,
                libelle: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Emplacementdossier;
