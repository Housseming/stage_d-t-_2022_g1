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



const  Recettedufinance = () => {
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingRecettedufinance, setEdditingRecettedufinance] = useState(null);
  const [addingRecettedufinance, setAddingRecettedufinance] = useState({
    id:"",
    libelle: "",
    montant: "",
    
  
  });
  
  const columns= [{ key: "1", title: "libelle", dataIndex: "libelle" },
  { key: "2", title: "montant", dataIndex: "montant" },
  { key:"3" , title:"id", dataIndex:"id"},
  {key: "4",
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
          <p>modifier</p>
        </div>
      {<div className="divdelete">
          <MdDeleteForever
            className="delete"
            onClick={() => {
              deleteRecettedufinance(record);
            }}
          ></MdDeleteForever>

          <p>supprimer</p>
          </div>}
      </div>
    ); 
  },
 },
 ];


 //select Recettedufinance
  const getRecettedufinancerequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recettedufinance");
      setListe(response.data);// aleh liste dhaherli khtr tji liste [{:}]
    } catch (error) { 
      console.log( error.message );
    }
  };
  useEffect(() => {
    getRecettedufinancerequest();
  }, []);
  console.log(liste);

 //supprimer une Recettedufinance
 const deleteRecettedufinance = (record) => {
  Modal.confirm({
    title: "Vous etes sur de supprimer cette ligne?",
    okText: "oui",
    okType: "danger",
    cancelText: "annuler",
    onOk: () => {
      const newListe = liste.filter((Recettedufinance) => Recettedufinance.id !== record.id);
      setListe(newListe);
      deleteRecettedufinancerequest(record.id);
      toast.success("Recettedufinance supprim?? avec succ??s");
    },
  });
};
const deleteRecettedufinancerequest = async (id) => {
  try {
    const deleted = await axios.post("http://localhost:5000/recettedufinance/delete", {
     id:id ,
    });
    console.log("Recettedufinance supprim??");
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
  const editRecettedufinancerequest = async (id,libelle,montant) => {
    try {
      const modified = await axios.post("http://localhost:5000/recettedufinance/modif", {
        id:id,libelle:libelle ,montant:montant
      });
      console.log("Recettedufinance modifi??",libelle);
    } catch (error) {
      console.log(error);
    }
   };///////////////////// Ajout
   //lien aveclback pour l'ajout
   const [isAdd, setIsAdd] = useState(false);
   
   const addRecettedufinance = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/recettedufinance",
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
        {<button className="btnadd"  onClick={() => {
            setIsAdd(true);
          } }> Ajouter</button>}
        <div classname="tab">
        <Table  
           columns={columns}
            dataSource={liste}
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
    const newListe = liste.map((Recettedufinance) => {
      if (Recettedufinance.id === edditingRecettedufinance.id) {
        return edditingRecettedufinance;
      } else {
        return Recettedufinance;
      }
    });
    setListe(newListe);
    editRecettedufinancerequest(edditingRecettedufinance.id,edditingRecettedufinance.libelle,edditingRecettedufinance.montant)
    resetEditing();
    toast.success("Recettedufinance modifie avec succ??e");
  }}
 >
  <Input
    placeholder="id"
    value={edditingRecettedufinance?.id}
    onChange={(e) => {
      setEdditingRecettedufinance({
        ...edditingRecettedufinance,
        id: e.target.value,
      });
    }}
  >

  </Input>
  <Input placeholder="libelle"
    value={edditingRecettedufinance?.libelle}
    onChange={(e) => {
      setEdditingRecettedufinance({ 
        ...edditingRecettedufinance, 
        libelle: e.target.value });
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
  >

  </Input>
  
 
  


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
            addRecettedufinance();
            setIsAdd(false);
            toast.success("Recettedufinance ajout?? avec succ??s");
          }}
        >
          <Input
            placeholder="id"
            value={addingRecettedufinance.id}
            onChange={(e) => {
              setAddingRecettedufinance({
                ...addingRecettedufinance,
                id: e.target.value,
              });
            }}
          ></Input>
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
  ) 
  };
  export default Recettedufinance;