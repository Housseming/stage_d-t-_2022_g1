import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Table, Modal, Input} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import {toast} from "react-toastify";
const TabClient = () => {
  //declaration necessaires
  const [listeservice, setlisteservice] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingclient, setEdditingclient] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingclient, setAddingclient] = useState({
    Nom: "",
    CIN: "",
    adresse: "",
    AdresseDesigne: "",
      Tel: "",
      Fax: "",
    Email:""
  });
  const column = [
    {key: "1", title: "Nom", dataIndex: "Nom"},
    {key: "2", title: "CIN", dataIndex: "CIN"},
    {key: "3", title: "adresse", dataIndex: "adresse"},
    {key: "4", title: "Adresse Désignée", dataIndex: "AdresseDesigne"},
    {key: "5", title: "Tel", dataIndex: "Tel"},
    {key: "6", title: "Fax", dataIndex: "Fax"},
    {key: "7", title: "Email", dataIndex: "Email"},
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
                  editclient(record);
                }}></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteclient(record);
                }}></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];

  //select client
  /*const getclientrequest = async () => {
    try {
      const response = await axios.get("/client");
      setlisteservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getclientrequest();
  });
  console.log(listeservice);*/

  //supclientr client
  const deleteclient = (record) => {
    Modal.confirm({
      title: "Vous etes sure de supprimer ce client?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (client) => client.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteclientrequest(record.id);
        toast.success("client supprimée avec succés");
      },
    });
  };
  const deleteclientrequest = async (id) => {
    try {
      const deleted = await axios.post("/clienteff", {
        id: id,
      });
      console.log("client supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un client
  const editclient = (record) => {
    setIsEdit(true);
    setEdditingclient({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingclient(null);
  };
  //ajouter client
  const addclient = async () => {
    try {
      const resp = await axios.post("/clientadd", addingclient);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container2">
      <div className="tab">
        <Table
          columns={column}
          dataSource={listeservice}
          size="medium"
          bordered={true}
          style={{ display: "flex", flex: 1 }}
          scroll={{ x: "max-content" }}
        ></Table>
      </div>

      <Modal
        title="modifier client"
        visible={isEdit}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsEdit(false);
        }}
        onOk={async () => {
          setIsEdit(false);
          const newlisteservice = listeservice.map((client) => {
            if (client.id == edditingclient.id) {
              return edditingclient;
            } else {
              return client;
            }
          });
          try {
            const addclient = await axios.post(
              "/client/update",
              edditingclient
            );
          } catch (error) {
            console.log("error");
          }
          setlisteservice(newlisteservice);
          resetEditing();
          toast.success("client modifié(e) avec succès");
        }}
      >
        <Input
          placeholder="Nom du Client"
          value={edditingclient?.Nom}
          onChange={(e) => {
            setEdditingclient({
              ...edditingclient,
              Nom: e.target.value,
            });
          }}
        ></Input>
        {/*edditingclient? s'il n'est pas null*/}
        <Input
          placeholder="Tapez le CIN"
          value={edditingclient?.CIN}
          onChange={(e) => {
            setEdditingclient({ ...edditingclient, CIN: e.target.value });
          }}
        ></Input>
        <Input
          placeholder="Adresse "
          value={edditingclient?.adresse}
          onChange={(e) => {
            setEdditingclient({
              ...edditingclient,
              adresse: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Adresse Désignée"
          value={edditingclient?.AdresseDesigne}
          onChange={(e) => {
            setEdditingclient({
              ...edditingclient,
              AdresseDesigne: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Numéro de téléphone"
          value={edditingclient?.Tel}
          onChange={(e) => {
            setEdditingclient({ ...edditingclient, Tel: e.target.value });
          }}
        ></Input>
      </Modal>
      <Modal
        title="ajouter client"
        visible={isAdd}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsAdd(false);
        }}
        onOk={() => {
          addclient();
          setIsAdd(false);
          toast.success("client ajoutée avec succès");
        }}
      >
        <Input
          placeholder="Nom du client"
          value={addingclient.Nom}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              Nom: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Tapez le CIN"
          value={addingclient.CIN}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              CIN: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Adresse "
          value={addingclient.adresse}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              adresse: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Adresse Désignée "
          value={addingclient.AdresseDesigne}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              AdresseDesigne: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Numéro de téléphone"
          value={addingclient.Tel}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              Tel: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="Fax"
          value={addingclient.Fax}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              Fax: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder="E-mail"
          value={addingclient.Email}
          onChange={(e) => {
            setAddingclient({
              ...addingclient,
              Email: e.target.value,
            });
          }}
        ></Input>
      </Modal>
    </div>
  );
};

export default TabClient;
