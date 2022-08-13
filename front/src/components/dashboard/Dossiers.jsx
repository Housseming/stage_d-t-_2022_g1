import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Table, Modal, Input} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {  Button, Space,Cascader } from "antd";
import {MdDeleteForever} from "react-icons/md";
import {toast} from "react-toastify";
const Dossiers = () => {
  //declaration necessaires
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingdossier, setEdditingdossier] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  
 
  const [addingdossier, setAddingdossier] = useState({
    id_dossier: "",
    num_affaire: "",
    emplacement: "",
    client: "",
    tel: "",
    mission: "",
    adversaire:"",
  });
  const column = [
    {key: "1", title: "ID", dataIndex: "id"},
    {key: "2", title: "id_dossier", dataIndex: "id_dossier"},
    {key: "3", title: "num_affaire", dataIndex: "Num_affaire"},
    {key: "4", title: "emplacement", dataIndex: "Emplacement"},
    {key: "5", title: "client", dataIndex: "Client"},
    {key: "6", title: "tel", dataIndex: "Tel"},
    {key: "7", title: "mission", dataIndex: "Mission"},
    {key: "8", title: "adversaire", dataIndex: "Adversaire"},
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
      title: "Vous etes sur de supdossierr ce dossier?",
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
  return (
    <div className="App">
      <header className="App-header">
        <h1> Emplacement dossier </h1>
       
        <div className="tab">
          <Table
            columns={column}
            dataSource={listeservice}
            size="small"
            bordered={true}></Table>
        </div>

      </header>
    </div>
  );
};

export default Dossiers;
