import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Modal, Input, Button } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { Marginer } from "../marginer/marginfile";
const TabDossier = () => {
  //declaration necessaires
  const [listeservice, setListeservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingadversaire, setEdditingadversaire] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingadversaire, setAddingadversaire] = useState( {
    nom: "",
    registre: "",
    adresse: "",
    adressedesigne: "",
    avocat: "",
    adresseavocat: "",
  });
  const column = [
    { key: "0", title: "id_adversaire", dataIndex: "id" },
    { key: "1", title: "id_dossier", dataIndex: "id_doss" },
    { key: "2", title: "Nom", dataIndex: "nom" },
    { key: "3", title: "Registre", dataIndex: "registre" },
    { key: "4", title: "adresse", dataIndex: "adresse" },
    { key: "5", title: "Adresse Désignée", dataIndex: "adressedesigne" },
    { key: "6", title: "Avocat", dataIndex: "avocat" },
    { key: "7", title: "Adresse Avocat", dataIndex: "adresseavocat" },
    {
      key: "8",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editadversaire(record);
                }}
              ></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteadversaire(record);
                }}
              ></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];

  //select adversaire
  const getadversairerequest = async () => {
    try {
      const response = await axios.get("/adversaire");
      setListeservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getadversairerequest();
  });
  console.log(listeservice);

  //supprimer adversaire
  const deleteadversaire = (record) => {
    Modal.confirm({
      title: "Vous etes sure de supprimer cet adversaire?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (adversaire) => adversaire.adversaire_id !== record.id
        );
        setListeservice(newlisteservice);
        deleteadversairerequest(record.id);
        toast.success("adversaire supprimée avec succés");
      },
    });
  };
  const deleteadversairerequest = async (id) => {
    try {
      const deleted = await axios.post("/adversaireeff", {
        id: id,
      });
      console.log("adversaire supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un adversaire
  const editadversaire = (record) => {
    setIsEdit(true);
    setEdditingadversaire({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingadversaire(null);
  };
  //ajouter adversaire
  const addadversaire = async () => {
    try {
      const resp = await axios.post("/adversaireadd", addingadversaire);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container2">

      <div className="boutonvalid">
        <Button
          className="btnadd"
          type="primary"
          block
          onClick={() => {
            setIsAdd(true);
          }}>
          Ajouter Adversaire
        </Button>
        <Marginer direction="vertical" margin={10} />
      </div>

      <div className="tab">
        <Table
          columns={column}
          dataSource={listeservice}
          size="meduim"
          bordered={true}
          style={{display: "flex", flex: 1}}
          scroll={{x: "max-content"}}></Table>
      </div>

      <Modal
        title="modifier adversaire"
        visible={isEdit}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsEdit(false);
        }}
        onOk={async () => {
          setIsEdit(false);
          const newlisteservice = listeservice.map((adversaire) => {
            if (adversaire.id_adversaire == edditingadversaire.id_adversaire) {
              return edditingadversaire;
            } else {
              return adversaire;
            }
          });
          try {
            const addadversaire = await axios.post(
              "/adversaire/update",
              edditingadversaire
            );
          } catch (error) {
            console.log("error");
          }
          setListeservice(newlisteservice);
          resetEditing();
          toast.success("adversaire modifié(e) avec succès");
        }}>
        <Input
          placeholder="Nom du Client"
          value={edditingadversaire?.Nom}
          onChange={(e) => {
            setEdditingadversaire({
              ...edditingadversaire,
              Nom: e.target.value,
            });
          }}></Input>
        {/*edditingadversaire? s'il n'est pas null*/}
        <Input
          placeholder="Tapez le Registre"
          value={edditingadversaire?.Registre}
          onChange={(e) => {
            setEdditingadversaire({
              ...edditingadversaire,
              Registre: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse "
          value={edditingadversaire?.adresse}
          onChange={(e) => {
            setEdditingadversaire({
              ...edditingadversaire,
              adresse: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse Désignée"
          value={edditingadversaire?.AdresseDesigne}
          onChange={(e) => {
            setEdditingadversaire({
              ...edditingadversaire,
              AdresseDesigne: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Numéro de téléphone"
          value={edditingadversaire?.Avocat}
          onChange={(e) => {
            setEdditingadversaire({...edditingadversaire, Avocat: e.target.value});
          }}></Input>
      </Modal>
      <Modal
        title="Ajouter Adversaire"
        visible={isAdd}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsAdd( false );
        }}
        onOk={() => {
          addadversaire();
          setIsAdd(false);
          toast.success( "Adversaire ajoutée avec succès" );
          setAddingadversaire({
            nom: "",
            registre: "",
            adresse: "",
            adressedesigne: "",
            avocat: "",
            adresseavocat: "",
          });
        }}>
        <Input
          placeholder="Nom de l'adversaire"
          value={addingadversaire.nom}
          onChange={(e) => {
            setAddingadversaire({
              ...addingadversaire,
              nom: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Registre de commerce"
          value={addingadversaire.registre}
          onChange={(e) => {
            setAddingadversaire({
              ...addingadversaire,
              registre: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse de l'adversaire"
          value={addingadversaire.adresse}
          onChange={(e) => {
            setAddingadversaire({
              ...addingadversaire,
              adresse: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse Désignée "
          value={addingadversaire.adressedesigne}
          onChange={(e) => {
            setAddingadversaire({
              ...addingadversaire,
              adressedesigne: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Avocat"
          value={addingadversaire.avocat}
          onChange={(e) => {
            setAddingadversaire({
              ...addingadversaire,
              avocat: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse de L'avocat"
          value={addingadversaire.adresseavocat}
          onChange={(e) => {
            setAddingadversaire({
              ...addingadversaire,
              adresseavocat: e.target.value,
            });
          }}></Input>
      </Modal>
    </div>
  );
};

export default TabDossier;
