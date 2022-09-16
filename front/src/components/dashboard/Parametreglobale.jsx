/* This example requires Tailwind CSS v2.0+ */
// delte and add are not an option
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Parametreglobale = () => {
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingParametre, setEdditingParametre] = useState(null);
  const [addingParametre, setAddingParametre] = useState({
    timbrefiscale: 0,
    tauxtva: 0,
  });
  const [check,setCheck]=useState()

  const columns = [
    { key: "1", title: "Timbre fiscale", dataIndex: "timbrefiscale" },
    { key: "2", title: "Taux TVA", dataIndex: "tauxtva" },

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
            <div className="divdelete">
          <MdDeleteForever
            className="delete"
            onClick={() => {
              deleteParametre(record);
            }}
          ></MdDeleteForever>

          <p>supprimer</p>
          </div>
          </div>
        );
      },
    },
  ];

  //select Parametre
  const getParametrerequest = async () => {
    try {
      const response = await axios.get("/Parametreglobale");
      setlisteservice(response.data); 
      if (response.data.length==0)
      setCheck(true); else setCheck(false);// aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getParametrerequest();
  }, [listeservice]);
  console.log(listeservice);

  //supprimer une Parametre
  const deleteParametre = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce Paramètre?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Parametre) => Parametre.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteParametrerequest(record.id);
        toast.success("Paramètre supprimé avec succès");
      },
    });
  };
  const deleteParametrerequest = async (id) => {
    try {
      const deleted = await axios.post("/Parametreenextra/delete", {
        id:id,
      });
      console.log("Parametre supprimé");
    } catch (error) {
      console.log(error);
    }
  };

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
  const editParametrerequest = async (edditingParametre) => {
    try {
      const modified = await axios.post("/Parametreglobale/modif" ,edditingParametre);
      
      console.log("Parametre modifié");
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
  const [isAdd, setIsAdd] = useState(false);

  const addParametre = async () => {
    try {
      const resp = await axios.post("/Parametreglobale", addingParametre);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Paramètres Globales</h1>
        <MdOutlineSettingsSuggest className="dashbicons"></MdOutlineSettingsSuggest>
        { <button
          className="btnadd"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          {" "}
          Ajouter
        </button>}
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
          title="modifier Parametre"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Parametre) => {
              if (Parametre.id === edditingParametre.id) {
                return edditingParametre;
              } else {
                return Parametre;
              }
            });
            setlisteservice(newlisteservice);
            editParametrerequest(edditingParametre);
            resetEditing();
            toast.success("Paramètre modifié avec succès");
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
          ></Input>
          <Input
            placeholder="taux_tva"
            value={edditingParametre?.tauxtva}
            onChange={(e) => {
              setEdditingParametre({
                ...edditingParametre,
                tauxtva: e.target.value,
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
            setAddingParametre({ timbrefiscale: 0, tauxtva: 0 });
          }}
          destroyOnClose={true}
          onOk={() => {
            addParametre();
            setIsAdd(false);
            toast.success("Paramètre ajouté avec succès");
            setAddingParametre({ timbrefiscale: 0, tauxtva: 0 });
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
        </Modal>
      </header>
    </div>
  );
};
export default Parametreglobale;
