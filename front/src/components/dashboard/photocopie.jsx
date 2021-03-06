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



const  Parametreenextra = () => {
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingParametre, setEdditingParametre] = useState(null);
  const [addingParametre, setAddingParametre] = useState({
    prixphotocopie: 0,
  
  
  });
  
  const columns= [{ key: "1", title: "prixphotocopie", dataIndex: "prixphotocopie" },
  

 {
  key: "2",
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
      const response = await axios.get("http://localhost:5000/photocopie");
      setListe(response.data);// aleh liste dhaherli khtr tji liste [{:}]
    } catch (error) { 
      console.log( error.message );
    }
  };
  useEffect(() => {
    getParametrerequest();
  }, []);
  console.log(liste);



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
  const editParametrerequest = async (prixphotocopie) => {
    try {
      const modified = await axios.post("http://localhost:5000/photocopie/modif", {
        prixphotocopie:prixphotocopie ,
      });
      console.log("photocopie modifi??");
    } catch (error) {
      console.log(error);
    }
   };///////////////////// Ajout
   //lien aveclback pour l'ajout
   const [isAdd, setIsAdd] = useState(false);
   
   
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
  title="modifier prixphotocpie"
  visible={isEdit}
  okText="Enregistrer"
  cancelText="Annuler"
  onCancel={() => {
    setIsEdit(false);
  }}
  onOk={() => {
    setIsEdit(false);
    const newListe = liste.map((Parametre) => {
      if (Parametre.prixphotocopie === edditingParametre.prixphotocopie) {
        return edditingParametre;
      } else {
        return Parametre;
      }
    });
    setListe(newListe);
    editParametrerequest(edditingParametre.prixphotocopie)
    resetEditing();
    toast.success("Parametre modifie avec succ??e");
  }}
 >
  <Input
    placeholder="prix_photocopie"
    value={edditingParametre?.prixphotocopie}
    onChange={(e) => {
      setEdditingParametre({
        ...edditingParametre,
        prixphotocopie: e.target.value,
      });
    }}
  >

  </Input>

 
  


  {/*AJOUT*/}
  </Modal>


  </header>

  </div>
  ) 
  };
  export default Parametreenextra;