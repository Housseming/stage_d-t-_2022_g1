import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Table, Modal, Input,Button} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import { toast } from "react-toastify";
const TabDossier = () => {
  //declaration necessaires
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingdossier, setEdditingdossier] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingdossier, setAddingdossier] = useState({
    Nom: "",
    Registre: "",
    adresse: "",
    AdresseDesigne: "",
    Avocat: "",
    Adresseavocat: "",
  });
  const column = [
    {key: "1", title: "Nom", dataIndex: "Nom"},
    {key: "2", title: "Registre", dataIndex: "Registre"},
    {key: "3", title: "adresse", dataIndex: "adresse"},
    {key: "4", title: "Adresse Désignée", dataIndex: "AdresseDesigne"},
    {key: "5", title: "Avocat", dataIndex: "Avocat"},
    {key: "6", title: "Adresse Avocat", dataIndex: "Adresseavocat"},
    {
      key: "16",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editdossier(record);
                }}></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deletedossier(record);
                }}></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];

  //select dossier
  const getdossierrequest = async () => {
    try {
      const response = await axios.get("/dossier");
      setlisteservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getdossierrequest();
  });
  console.log(listeservice);

  //supdossierr dossier
  const deletedossier = (record) => {
    Modal.confirm({
      title: "Vous etes sure de supprimer ce dossier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (dossier) => dossier.id !== record.id
        );
        setlisteservice(newlisteservice);
        deletedossierrequest(record.id);
        toast.success("dossier supprimée avec succés");
      },
    });
  };
  const deletedossierrequest = async (id) => {
    try {
      const deleted = await axios.post("/dossiereff", {
        id: id,
      });
      console.log("dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un dossier
  const editdossier = (record) => {
    setIsEdit(true);
    setEdditingdossier({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingdossier(null);
  };
  //ajouter dossier
  const adddossier = async () => {
    try {
      const resp = await axios.post("/dossieradd", addingdossier);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <Button
              className="btnadd"
              type="primary" 
        onClick={() => {
          setIsAdd(true);
        }}>
        Valider Dossier
      </Button>
      <div className="tab">
        <Table
          columns={column}
          dataSource={listeservice}
          size="medium"
          bordered={true}></Table>
      </div>

      <Modal
        title="modifier dossier"
        visible={isEdit}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsEdit(false);
        }}
        onOk={async () => {
          setIsEdit(false);
          const newlisteservice = listeservice.map((dossier) => {
            if (dossier.id == edditingdossier.id) {
              return edditingdossier;
            } else {
              return dossier;
            }
          });
          try {
            const adddossier = await axios.post(
              "/dossier/update",
              edditingdossier
            );
          } catch (error) {
            console.log("error");
          }
          setlisteservice(newlisteservice);
          resetEditing();
          toast.success("dossier modifié(e) avec succès");
        }}>
        <Input
          placeholder="Nom du Client"
          value={edditingdossier?.Nom}
          onChange={(e) => {
            setEdditingdossier({
              ...edditingdossier,
              Nom: e.target.value,
            });
          }}></Input>
        {/*edditingdossier? s'il n'est pas null*/}
        <Input
          placeholder="Tapez le Registre"
          value={edditingdossier?.Registre}
          onChange={(e) => {
            setEdditingdossier({...edditingdossier, Registre: e.target.value});
          }}></Input>
        <Input
          placeholder="Adresse "
          value={edditingdossier?.adresse}
          onChange={(e) => {
            setEdditingdossier({
              ...edditingdossier,
              adresse: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse Désignée"
          value={edditingdossier?.AdresseDesigne}
          onChange={(e) => {
            setEdditingdossier({
              ...edditingdossier,
              AdresseDesigne: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Numéro de téléphone"
          value={edditingdossier?.Avocat}
          onChange={(e) => {
            setEdditingdossier({...edditingdossier, Avocat: e.target.value});
          }}></Input>
      </Modal>
      <Modal
        title="ajouter dossier"
        visible={isAdd}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsAdd(false);
        }}
        onOk={() => {
          adddossier();
          setIsAdd(false);
          toast.success("dossier ajoutée avec succès");
        }}>
        <Input
          placeholder="Nom du dossier"
          value={addingdossier.Nom}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              Nom: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Tapez le Registre"
          value={addingdossier.Registre}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              Registre: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse "
          value={addingdossier.adresse}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              adresse: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresse Désignée "
          value={addingdossier.AdresseDesigne}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              AdresseDesigne: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Numéro de téléphone"
          value={addingdossier.Avocat}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              Avocat: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="Adresseavocat"
          value={addingdossier.Adresseavocat}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              Adresseavocat: e.target.value,
            });
          }}></Input>
        <Input
          placeholder="E-mail"
          value={addingdossier.Email}
          onChange={(e) => {
            setAddingdossier({
              ...addingdossier,
              Email: e.target.value,
            });
          }}></Input>
      </Modal>
    </div>
  );
};

export default TabDossier;
