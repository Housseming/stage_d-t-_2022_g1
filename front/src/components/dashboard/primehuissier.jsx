import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Table, Modal, Input} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import { toast } from "react-toastify";
const PrimeHuissier = () => {
  //declaration necessaires
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
    const [edditingprime, setEdditingprime] = useState( null );
    const [isAdd, setIsAdd] = useState( false );
    const [addingprime, setAddingprime] = useState( {
        libelle: "",
        montant: "",
        dessociable: "",
        impot: "",
        mensuel:"",
    } );
  const column = [
    {key: "1", title: "ID", dataIndex: "id"},
    {key: "2", title: "libelle", dataIndex: "libelle"},
    {key: "3", title: "montant", dataIndex: "montant"},
    {key: "4", title: "dessociable", dataIndex: "dessociable"},
    {key: "5", title: "impot", dataIndex: "impot"},
    {key: "6", title: "mensuel", dataIndex: "mensuel"},
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
                    editprime(record);
                  }}></AiFillEdit>
                <pre>
                  <p>modifier  </p>
                </pre>
              </div>
              <div className="divdelete">
                <MdDeleteForever
                  className="delete"
                  onClick={() => {
                    deleteprime(record);
                  }}></MdDeleteForever>

                <p>supprimer</p>
              </div>
            </div>
          );
      },
    },
  ];

  //select primehuissier
  const getprimerequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/primehuissier");
      setListe(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getprimerequest();
  });
  console.log(liste);

  //supprimer primehuissier
  const deleteprime = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce primehuissier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = liste.filter((prime) => prime.id !== record.id);
        setListe(newListe);
        deleteprimerequest(record.id);
        toast.success("primehuissier supprimée avec succés");
      },
    });
  };
  const deleteprimerequest = async (id) => {
    try {
      const deleted = await axios.post(
        "http://localhost:5000/primehuissiereff",
        {
          id: id,
        }
      );
      console.log("prime supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un primehuissier
  const editprime = (record) => {
    setIsEdit(true);
    setEdditingprime({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingprime(null);
  };
  //ajouter primehuissier
  const addprime = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/primehuissieradd",
        addingprime
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
    return (
    <div className="App">
      <header className="App-header">
        <button className="btnadd" onClick={()=>{setIsAdd(true)}}>Ajouter Primehuissier</button>
        <div className="tab">
          <Table
            columns={column}
            dataSource={liste}
            size="medium"
            bordered={true}></Table>
        </div>

        <Modal
          title="modifier primehuissier"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newListe = liste.map((prime) => {
              if (prime.id == edditingprime.id) {
                return edditingprime;
              } else {
                return prime;
              }
            });
            setListe(newListe);
            resetEditing();
            toast.success("primehuissier modifié avec succés");
          }}>
          <Input
            placeholder="Tapez le libelle"
            value={edditingprime?.libelle}
            onChange={(e) => {
              setEdditingprime({
                ...edditingprime,
                libelle: e.target.value,
              });
            }}></Input>
          {/*edditingprime? s'il n'est pas null*/}
          <Input
            placeholder="Tapez le Montant"
            value={edditingprime?.montant}
            onChange={(e) => {
              setEdditingprime({...edditingprime, montant: e.target.value});
            }}></Input>
          <Input
            placeholder="Confirmez le dessociable ?"
            value={edditingprime?.dessociable}
            onChange={(e) => {
              setEdditingprime({...edditingprime, dessociable: e.target.value});
            }}></Input>
          <Input
            placeholder="Confimez l'impot ?"
            value={edditingprime?.impot}
            onChange={(e) => {
              setEdditingprime({...edditingprime, impot: e.target.value});
            }}></Input>
          <Input
            placeholder="Confirmez le Mensuel"
            value={edditingprime?.mensuel}
            onChange={(e) => {
              setEdditingprime({...edditingprime, mensuel: e.target.value});
            }}></Input>
        </Modal>
        <Modal
          title="ajouter primehuissier"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addprime();
            setIsAdd(false);
            toast.success("Primehuissier ajoutée avec succès");
          }}>
          <Input
            placeholder="tapez le libéllé"
            value={addingprime.libelle}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                libelle: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Tapez le Montant"
            value={addingprime.montant}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                montant: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Confirmez le dessociable ?"
            value={addingprime.dessociable}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                dessociable: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Confirmez l'impot ?"
            value={addingprime.impot}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                impot: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Confirmez le Mensuel"
            value={addingprime.mensuel}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                mensuel: e.target.value,
              });
            }}></Input>
        </Modal>
      </header>
        </div>

  );
};

export default PrimeHuissier;
