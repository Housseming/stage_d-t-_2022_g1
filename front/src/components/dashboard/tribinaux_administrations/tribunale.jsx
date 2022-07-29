import { Radio, Space, Tabs, Modal, Table, Input } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tableau from "./service";

import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
const { TabPane } = Tabs;
const Tribunale = () => {
  const [listeTrib, setListeTrib] = useState([]);
  //select tribunale
  const gettribunalerequest = async () => {
    try {
      const response = await axios.get("/tribunale");
      console.log(response.data);

      setListeTrib(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [listeservice, setListeservice] = useState([]);
  const [isEditservice, setIsEditservice] = useState(false);
  const [edditingservice, setEdditingservice] = useState(null);
  const [isAddservice, setIsAddservice] = useState(false);
  const [addingservice, setAddingservice] = useState({
    nom: "",
    lundi: "",
    mardi: "",
    mercredi: "",
    jeudi: "",
    vendredi: "",
    samedi: "",
    dimanche: "",
  });
  const column = [
    { key: "1", title: "ID", dataIndex: "id" },
    { key: "2", title: "nom", dataIndex: "nom" },
    { key: "3", title: "lundi", dataIndex: "lundi" },
    { key: "4", title: "mardi", dataIndex: "mardi" },
    { key: "5", title: "mercredi", dataIndex: "mercredi" },
    { key: "6", title: "jeudi", dataIndex: "jeudi" },
    { key: "7", title: "vendredi", dataIndex: "vendredi" },
    { key: "8", title: "samedi", dataIndex: "samedi" },
    { key: "9", title: "dimanche", dataIndex: "dimanche" },
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
                  editservice(record);
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
                  deleteservice(record);
                }}
              ></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];
  gettribunalerequest();

  //select service
  const getservicerequest = async () => {
    try {
      const response = await axios.get("/service");
      setListeservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettribunalerequest();
    getservicerequest();
  });
  console.log(listeservice);

  //supprimer service
  const deleteservice = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce service?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = listeservice.filter(
          (service) => service.id !== record.id
        );
        setListeservice(newListe);
        deleteservicerequest(record.id);
        toast.success("service supprimé avec succès");
      },
    });
  };
  const deleteservicerequest = async (id) => {
    try {
      const deleted = await axios.post("/serviceeff", {
        id: id,
      });
      console.log("service supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un service
  const editservice = (record) => {
    setIsEditservice(true);
    setEdditingservice({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEditservice(false);
    setEdditingservice(null);
  };
  //ajouter servicehuissier
  const addservice = async () => {
    try {
      const resp = await axios.post("/serviceadd", addingservice);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 50,
        }}
      >
        Tab position:
        <Radio.Group value={tabPosition} onChange={changeTabPosition}>
          <Radio.Button value="top">top</Radio.Button>
          <Radio.Button value="bottom">bottom</Radio.Button>
          <Radio.Button value="left">left</Radio.Button>
          <Radio.Button value="right">right</Radio.Button>
        </Radio.Group>
      </Space>
      <Tabs tabPosition={tabPosition}>
        {listeTrib.map((trib) => {
          const { id, lieu } = trib;
          const newListeService = listeservice.filter(
            (service) => service.id_tribunale !== trib.id
          );
          return (
            <TabPane tab={trib.lieu} key={trib.id}>
              <div className="App">
                <header className="App-header">
                  <button
                    className="btnadd"
                    onClick={() => {
                      setIsAddservice(true);
                    }}
                  >
                    Ajouter un service
                  </button>
                  <div className="tab">
                    <Table
                      columns={column}
                      dataSource={newListeService}
                      size="medium"
                      bordered={true}
                    ></Table>
                  </div>

                  <Modal
                    title="modifier service"
                    visible={isEditservice}
                    okText="Enregistrer"
                    cancelText="Annuler"
                    onCancel={() => {
                      setIsEditservice(false);
                    }}
                    onOk={async () => {
                      setIsEditservice(false);
                      const newListe = listeservice.map((service) => {
                        if (service.id == edditingservice.id) {
                          return edditingservice;
                        } else {
                          return service;
                        }
                      });
                      try {
                        const addservice = await axios.post(
                          "/service/update",
                          edditingservice
                        );
                      } catch (error) {
                        console.log("error");
                      }
                      setListeservice(newListe);
                      resetEditing();
                      toast.success("service modifié avec succès");
                    }}
                  >
                    <Input
                      placeholder="Tapez le nom"
                      value={edditingservice?.nom}
                      onChange={(e) => {
                        setEdditingservice({
                          ...edditingservice,
                          nom: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Tapez le lundi"
                      value={edditingservice?.lundi}
                      onChange={(e) => {
                        setEdditingservice({
                          ...edditingservice,
                          lundi: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Confirmez le mardi ?"
                      value={edditingservice?.mardi}
                      onChange={(e) => {
                        setEdditingservice({
                          ...edditingservice,
                          mardi: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Confimez l'mercredi ?"
                      value={edditingservice?.mercredi}
                      onChange={(e) => {
                        setEdditingservice({
                          ...edditingservice,
                          mercredi: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Confirmez le jeudi"
                      value={edditingservice?.jeudi}
                      onChange={(e) => {
                        setEdditingservice({
                          ...edditingservice,
                          jeudi: e.target.value,
                        });
                      }}
                    ></Input>
                  </Modal>
                  <Modal
                    title="ajouter un service"
                    visible={isAddservice}
                    okText="Enregistrer"
                    cancelText="Annuler"
                    onCancel={() => {
                      setIsAddservice(false);
                    }}
                    onOk={() => {
                      addservice();
                      setIsAddservice(false);
                      toast.success("service ajouté avec succès");
                    }}
                  >
                    <Input
                      placeholder="tapez le nom du service"
                      value={addingservice.nom}
                      onChange={(e) => {
                        setAddingservice({
                          ...addingservice,
                          nom: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Tapez le lundi"
                      value={addingservice.lundi}
                      onChange={(e) => {
                        setAddingservice({
                          ...addingservice,
                          lundi: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Confirmez le mardi ?"
                      value={addingservice.mardi}
                      onChange={(e) => {
                        setAddingservice({
                          ...addingservice,
                          mardi: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Confirmez l'mercredi ?"
                      value={addingservice.mercredi}
                      onChange={(e) => {
                        setAddingservice({
                          ...addingservice,
                          mercredi: e.target.value,
                        });
                      }}
                    ></Input>
                    <Input
                      placeholder="Confirmez le jeudi"
                      value={addingservice.jeudi}
                      onChange={(e) => {
                        setAddingservice({
                          ...addingservice,
                          jeudi: e.target.value,
                        });
                      }}
                    ></Input>
                  </Modal>
                </header>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};

export default Tribunale;
