/* This example requires Tailwind CSS v2.0+ */
// delte and add are not an option
// il faut changer lupdate where libelle=$1(besh nzid id wakhaw yabda unique primary key maaneha)
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { CurrencyDollarIcon } from "@heroicons/react/outline";

const Recettedufinance = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingRecettedufinance, setEdditingRecettedufinance] =useState(null);
  const [addingRecettedufinance, setAddingRecettedufinance] = useState({
    
    libelle: "",
    montant: 0,
  });

  const columns = [
    { key: "2", title: "Libelle", dataIndex: "libelle" },
    { key: "3", title: "Montant", dataIndex: "montant" },
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
                  editRecettedufinance(record);
                }}
              ></AiFillEdit>
              <pre>
              <p>modifier</p></pre>
            </div>
            {
              <div className="divdelete">
                <MdDeleteForever
                  className="delete"
                  onClick={() => {
                    deleteRecettedufinance(record);
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

  //select Recettedufinance
  const getRecettedufinancerequest = async () => {
    try {
      const response = await axios.get("/recettedufinance");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getRecettedufinancerequest();
  }, [listeservice]);
 // console.log(listeservice);

  //supprimer une Recettedufinance
  const deleteRecettedufinance = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cette ligne?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Recettedufinance) => Recettedufinance.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteRecettedufinancerequest(record.id);
        toast.success("Recettedufinance supprimé avec succès");
      },
    });
  };
  const deleteRecettedufinancerequest = async (id) => {
    try {
      const deleted = await axios.post("/recettedufinance/delete", {
        id: id,
      });
      console.log("Recettedufinance supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Recettedufinance
  const editRecettedufinance = (record) => {
    setIsEdit(true);
    setEdditingRecettedufinance({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingRecettedufinance(null);
  };
  //lien aveclback pour la modif
  const editRecettedufinancerequest = async ( edditingRecettedufiance) => {
    try {
      const modified = await axios.post("/recettedufinance/modif", {
        edditingRecettedufiance
      });
      console.log("Recettedufinance modifié", edditingRecettedufiance);
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);

  const addRecettedufinance = async () => {
    try {
      const resp = await axios.post(
        "/recettedufinance",
        addingRecettedufinance
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
      <h1>Recette du finance</h1>
      <CurrencyDollarIcon className="dashbicons"></CurrencyDollarIcon>
        {<button className="btnadd"  onClick={() => {
            setIsAdd(true);
          } }> Ajouter</button>}
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
          title="modifier Recettedufinance"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Recettedufinance) => {
              if (Recettedufinance.id === edditingRecettedufinance.id) {
                return edditingRecettedufinance;
              } else {
                return Recettedufinance;
              }
            });
            setlisteservice(newlisteservice);
            editRecettedufinancerequest(
              edditingRecettedufinance
            );
            resetEditing();
            toast.success("Recettedufinance modifie avec succée");
          }}
        >
       
          <Input
            placeholder="libelle"
            value={edditingRecettedufinance?.libelle}
            onChange={(e) => {
              setEdditingRecettedufinance({
                ...edditingRecettedufinance,
                libelle: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="montant"
            value={edditingRecettedufinance?.montant}
            onChange={(e) => {
              setEdditingRecettedufinance({
                ...edditingRecettedufinance,
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
          destroyOnClose={true}
          onCancel={() => {
            setIsAdd(false);
              setAddingRecettedufinance({
                
                libelle: "",
                montant: "",
              });
          }}
          onOk={() => {
            addRecettedufinance();
            setIsAdd(false);
            toast.success("Recette finance ajoutée avec succès");
            setAddingRecettedufinance({
            
              libelle: "",
              montant: "",
            });
          }}
        >
         {false && <Input
            placeholder="id"
            value={addingRecettedufinance.id}
            onChange={(e) => {
              setAddingRecettedufinance({
                ...addingRecettedufinance,
                id: e.target.value,
              });
            }}
          ></Input> }
          <Input
            placeholder="libelle"
            value={addingRecettedufinance.libelle}
            onChange={(e) => {
              setAddingRecettedufinance({
                ...addingRecettedufinance,
                libelle: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="montant"
            value={addingRecettedufinance.montant}
            onChange={(e) => {
              setAddingRecettedufinance({
                ...addingRecettedufinance,
                montant: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Recettedufinance;
