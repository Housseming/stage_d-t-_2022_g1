/* This example requires Tailwind CSS v2.0+ */
// delte and add are not an option
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";



const  Parametreglobale = () => {
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingParametre, setEdditingParametre] = useState(null);
  const [addingParametre, setAddingParametre] = useState({
    timbrefiscale: 0,
    tauxtva: 0,
    
  
  });
  
  const columns= [{ key: "1", title: "timbrefiscale", dataIndex: "timbrefiscale" },
  { key: "2", title: "tauxtva", dataIndex: "tauxtva" },

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
              editParametre(record);
            }}
          ></AiFillEdit>
          <p>modifier</p>
        </div>
      {/* <div className="divdelete">
          <MdDeleteForever
            className="delete"
            onClick={() => {
              deleteParametre(record);
            }}
          ></MdDeleteForever>

          <p>supprimer</p>
          </div>*/}
      </div>
    ); 
  },
 },
 ];


 //select Parametre
  const getParametrerequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Parametreglobale");
      setListe(response.data);// aleh liste dhaherli khtr tji liste [{:}]
    } catch (error) { 
      console.log( error.message );
    }
  };
  useEffect(() => {
    getParametrerequest();
  }, []);
  console.log(liste);

 //supprimer une Parametre
 /*const deleteParametre = (record) => {
  Modal.confirm({
    title: "Vous etes sur de supprimer l'Parametre?",
    okText: "oui",
    okType: "danger",
    cancelText: "annuler",
    onOk: () => {
      const newListe = liste.filter((Parametre) => Parametre.timbrefiscale !== record.timbrefiscale);
      setListe(newListe);
      deleteParametrerequest(record.timbrefiscale);
      toast.success("Parametre supprim?? avec succ??s");
    },
  });
};
const deleteParametrerequest = async (timbrefiscale) => {
  try {
    const deleted = await axios.post("http://localhost:5000/Parametreenextra/delete", {
      timbrefiscale:timbrefiscale ,
    });
    console.log("Parametre supprim??");
  } catch (error) {
    console.log(error);
  }
 };

*/
  ////////////
  //modifier une Parametre
 const editParametre = (record) => {
  setIsEdit(true);
  setEdditingParametre({ ...record }); //copie mel record
 };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingParametre(null);
  };
  //lien aveclback pour la modif
  const editParametrerequest = async (timbrefiscale,tauxtva) => {
    try {
      const modified = await axios.post("http://localhost:5000/Parametreglobale/modif", {
        timbrefiscale:timbrefiscale ,tauxtva:tauxtva
      });
      console.log("Parametre modifi??");
    } catch (error) {
      console.log(error);
    }
   };///////////////////// Ajout
   //lien aveclback pour l'ajout
   const [isAdd, setIsAdd] = useState(false);
   
   const addParametre = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/Parametreglobale",
        addingParametre
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        {/*<Button className="btnadd"  onClick={() => {
            setIsAdd(true);
          } }> Ajouter</Button>*/}
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
  title="modifier Parametre"
  visible={isEdit}
  okText="Enregistrer"
  cancelText="Annuler"
  onCancel={() => {
    setIsEdit(false);
  }}
  onOk={() => {
    setIsEdit(false);
    const newListe = liste.map((Parametre) => {
      if (Parametre.timbrefiscale === edditingParametre.timbrefiscale) {
        return edditingParametre;
      } else {
        return Parametre;
      }
    });
    setListe(newListe);
    editParametrerequest(edditingParametre.timbrefiscale,edditingParametre.tauxtva)
    resetEditing();
    toast.success("Parametre modifie avec succ??e");
  }}
 >
  <Input
    placeholder="timbre_fiscale"
    value={edditingParametre?.timbrefiscale}
    onChange={(e) => {
      setEdditingParametre({
        ...edditingParametre,
        timbrefiscale: e.target.value,
      });
    }}
  >

  </Input>
  <Input placeholder="taux_tva"
    value={edditingParametre?.tauxtva}
    onChange={(e) => {
      setEdditingParametre({ ...edditingParametre, tauxtva: e.target.value });
    }}
  ></Input>
 
  


  {/*AJOUT*/}
  </Modal>
 {/* <Modal
          title="ajouter "
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addParametre();
            setIsAdd(false);
            toast.success("Parametre ajout?? avec succ??s");
          }}
        >
          <Input
            placeholder="timbrefiscale"
            value={addingParametre.timbrefiscale}
            onChange={(e) => {
              setAddingParametre({
                ...addingParametre,
                timbrefiscale: e.target.value,
              });
            }}
          ></Input>
           <Input
            placeholder="tauxtva"
            value={addingParametre.tauxtva}
            onChange={(e) => {
              setAddingParametre({
                ...addingParametre,
                tauxtva: e.target.value,
              });
            }}
          ></Input>
           
          </Modal>*/}

  </header>

  </div>
  ) 
  };
  export default Parametreglobale;