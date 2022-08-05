import {
  Radio,
  Space,
  Tabs,
  Modal,
  Table,
  Input,
  Checkbox,
  Col,
  Row,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Tableau from "./service";
import "./trib.css";
import { GoDiffAdded } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
const { TabPane } = Tabs;
const Tribunale = () => {
  const [listeTrib, setListeTrib] = useState([]);
  const [isEdittrib, setIsEdittrib] = useState(false);
  const [edditingtrib, setEdditingtrib] = useState({ lieu: "" });
  const [isAddtrib, setIsAddtrib] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [addingtrib, setAddingtrib] = useState({
    lieu: "",
  });

  //**********select tribunale********************
  const gettribunalerequest = async () => {
    try {
      const response = await axios.get("/tribunale");
      console.log(response.data);

      setListeTrib(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  //*****************supprimer tribunale*****************
  const deletetrib = (id) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cette tribunale?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = listeTrib.filter((trib) => trib.id !== id);
        setListeTrib(newListe);
        deletetribrequest(id);
        toast.success("tribunale supprimée avec succès");
      },
    });
  };
  const deletetribrequest = async (id) => {
    try {
      const deleted = await axios.post("/deleteTribunale", {
        id: id,
      });
      console.log("tribunale supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //*************************modifier tribunale**************
  const edittrib = (id, lieu) => {
    setIsEdittrib(true);
    setEdditingtrib({ id: id, lieu: lieu }); //copie mel record
  };
  const resetEditingtrib = () => {
    setIsEdittrib(false);
    setEdditingtrib(null);
  };
  //*****************ajouter tribunale******************
  const addtrib = async () => {
    try {
      const resp = await axios.post("/ajouterTribunale", addingtrib);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const [listeservice, setListeservice] = useState([]);
  const [isEditservice, setIsEditservice] = useState(false);
  const [edditingservice, setEdditingservice] = useState({
    nom: "",
    tribunale_id: "",
    lundi: "",
    mardi: "",
    mercredi: "",
    jeudi: "",
    vendredi: "",
    samedi: "",
  });
  const [isAddservice, setIsAddservice] = useState(false);
  const [addingservice, setAddingservice] = useState({
    nom: "",
    lundi: "",
    mardi: "",
    mercredi: "",
    jeudi: "",
    vendredi: "",
    samedi: "",
  });
  const column = [
    { key: "1", title: "ID", dataIndex: "service_id" },
    { key: "2", title: "nom", dataIndex: "nom" },
    { key: "3", title: "lundi", dataIndex: "lundi" },
    { key: "4", title: "mardi", dataIndex: "mardi" },
    { key: "5", title: "mercredi", dataIndex: "mercredi" },
    { key: "6", title: "jeudi", dataIndex: "jeudi" },
    { key: "7", title: "vendredi", dataIndex: "vendredi" },
    { key: "8", title: "samedi", dataIndex: "samedi" },

    {
      key: "9",
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

  //***********************select service***********
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
  }, [listeTrib, listeservice]);

  console.log(listeservice);

  //*****************supprimer service*****************
  const deleteservice = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce service?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = listeservice.filter(
          (service) => service.service_id !== record.service_id
        );
        setListeservice(newListe);
        deleteservicerequest(record.service_id);
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

  //*************************modifier un service**************
  const editservice = (record) => {
    setIsEditservice(true);
    setEdditingservice({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEditservice(false);
    setEdditingservice(null);
  };
  //*****************ajouter service******************
  const addservice = async () => {
    try {
      const resp = await axios.post("/serviceadd", addingservice);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  /***************tabposition */
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  /**********************return comp****************************/
  return (
    <>
      <button
        className="ajouter"
        onClick={() => {
          setIsAddtrib(true);
        }}
      >
        <div className="ajoutertrib">
          <GoDiffAdded className="addingtrib"></GoDiffAdded>
          <pre>
            <h1> Ajouter Tribunale</h1>
          </pre>
        </div>
      </button>
      <Tabs tabPosition={tabPosition} style={{ marginTop: 40 }}>
        {listeTrib.map((trib) => {
          const { id, lieu } = trib;
          const newListeService = listeservice.filter(
            (service) => service.tribunale_id == trib.id
          );
          return (
            <TabPane
              tab={
                <span>
                  <h1>{trib.lieu}</h1>
                  <button>
                    <AiFillEdit
                      className="edit"
                      onClick={() => {
                        edittrib(trib.id, trib.lieu);
                      }}
                    ></AiFillEdit>
                  </button>
                  <button>
                    <MdDeleteForever
                      className="delete"
                      onClick={() => {
                        deletetrib(trib.id);
                      }}
                    ></MdDeleteForever>
                  </button>
                </span>
              }
              key={trib.id}
            >
              <div className="App">
                <header className="App-header">
                  <button
                    className="btnaddservice"
                    onClick={() => {
                      setAddingservice({
                        ...addingservice,
                        tribunale_id: trib.id,
                      });
                      setIsAddservice(true);
                    }}
                  >
                    Ajouter un service
                  </button>
                  <div className="tab">
                    <Table
                      columns={column}
                      dataSource={newListeService}
                      bottomHeight={0}
                      bordered={true}
                      pagination={{
                        current: page,
                        pageSize: pageSize,
                        onChange: (page, pageSize) => {
                          setPage(page);
                          setPageSize(pageSize);
                        },
                      }}
                      scroll={{ x: "max-content" }}
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
                        if (service.service_id == edditingservice.service_id) {
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

                    <div className="audcourse">
                      <div className="jours">
                        <h1>Jours de l'audience</h1>
                        <Checkbox.Group onChange={onChange}>
                          <Row>
                            <Col span={6}>
                              <Checkbox
                                value="lundi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      lundi: "audience",
                                    });
                                  } else {
                                    setEdditingservice({
                                      ...edditingservice,
                                      lundi: "course",
                                    });
                                  }
                                }}
                              >
                                Lundi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="mardi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      mardi: "audience",
                                    });
                                  } else {
                                    setEdditingservice({
                                      ...edditingservice,
                                      mardi: "course",
                                    });
                                  }
                                }}
                              >
                                Mardi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="mercredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      mercredi: "audience",
                                    });
                                  } else {
                                    setEdditingservice({
                                      ...edditingservice,
                                      mercredi: "course",
                                    });
                                  }
                                }}
                              >
                                Mercredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="jeudi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      jeudi: "audience",
                                    });
                                  } else {
                                    setEdditingservice({
                                      ...edditingservice,
                                      jeudi: "course",
                                    });
                                  }
                                }}
                              >
                                Jeudi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="vendredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      vendredi: "audience",
                                    });
                                  } else {
                                    setEdditingservice({
                                      ...edditingservice,
                                      vendredi: "course",
                                    });
                                  }
                                }}
                              >
                                Vendredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="samedi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      samedi: "audience",
                                    });
                                  } else {
                                    setEdditingservice({
                                      ...edditingservice,
                                      samedi: "course",
                                    });
                                  }
                                }}
                              >
                                Samedi
                              </Checkbox>
                            </Col>
                          </Row>
                        </Checkbox.Group>
                      </div>
                      <div className="jours">
                        <h1>Jours de course</h1>

                        <Checkbox.Group onChange={onChange}>
                          <Row>
                            <Col span={6}>
                              <Checkbox value="lundi">Lundi</Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox value="mardi">Mardi</Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox value="mercredi">Mercredi</Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox value="jeudi">Jeudi</Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox value="vendredi">Vendredi</Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox value="samedi">Samedi</Checkbox>
                            </Col>
                          </Row>
                        </Checkbox.Group>
                      </div>
                    </div>
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
                    <Input value={trib.id}></Input>
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
                    <div className="audcourse">
                      <div className="jours">
                        <h1>Jours de l'audience</h1>
                        <Checkbox.Group onChange={onChange}>
                          <Row>
                            <Col span={6}>
                              <Checkbox
                                value="lundi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      lundi: "audience",
                                    });
                                    console.log(addingservice);
                                  } else {
                                    setAddingservice({
                                      ...addingservice,
                                      lundi: "course",
                                    });
                                  }
                                }}
                              >
                                Lundi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="mardi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mardi: "audience",
                                    });
                                  }
                                }}
                              >
                                Mardi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="mercredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mercredi: "audience",
                                    });
                                  }
                                }}
                              >
                                Mercredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="jeudi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      jeudi: "audience",
                                    });
                                  }
                                }}
                              >
                                Jeudi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="vendredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      vendredi: "audience",
                                    });
                                  }
                                }}
                              >
                                Vendredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="samedi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      samedi: "audience",
                                    });
                                  }
                                }}
                              >
                                Samedi
                              </Checkbox>
                            </Col>
                          </Row>
                        </Checkbox.Group>
                      </div>
                      <div className="jours">
                        <h1>Jours de course</h1>

                        <Checkbox.Group onChange={onChange}>
                          <Row>
                            <Col span={6}>
                              <Checkbox
                                value="lundi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      lundi: "course",
                                    });
                                  }
                                }}
                              >
                                Lundi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="mardi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mardi: "course",
                                    });
                                  }
                                }}
                              >
                                Mardi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="mercredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mercredi: "course",
                                    });
                                  }
                                }}
                              >
                                Mercredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="jeudi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      jeudi: "course",
                                    });
                                  }
                                }}
                              >
                                Jeudi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                value="vendredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mercredi: "course",
                                    });
                                  }
                                }}
                              >
                                Vendredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox value="samedi">Samedi</Checkbox>
                            </Col>
                          </Row>
                        </Checkbox.Group>
                      </div>
                    </div>
                  </Modal>
                  <Modal
                    title="modifier tribunale"
                    visible={isEdittrib}
                    okText="Enregistrer"
                    cancelText="Annuler"
                    onCancel={() => {
                      setIsEdittrib(false);
                    }}
                    onOk={async () => {
                      setIsEdittrib(false);
                      const newListe = listeTrib.map((trib) => {
                        if (trib.id == edditingtrib.id) {
                          return edditingtrib;
                        } else {
                          return trib;
                        }
                      });
                      try {
                        const modiftrib = await axios.post(
                          "/modifierTribunale",
                          edditingtrib
                        );
                      } catch (error) {
                        console.log("error");
                      }

                      setListeTrib(newListe);
                      resetEditingtrib();
                      toast.success("Tribunale modifiée avec succès");
                    }}
                  >
                    <Input
                      placeholder="Tapez le lieu"
                      value={edditingtrib?.lieu}
                      onChange={(e) => {
                        setEdditingtrib({
                          ...edditingtrib,
                          lieu: e.target.value,
                        });
                      }}
                    ></Input>
                  </Modal>
                  <Modal
                    title="ajouter une tribunale"
                    visible={isAddtrib}
                    okText="Enregistrer"
                    cancelText="Annuler"
                    onCancel={() => {
                      setIsAddtrib(false);
                    }}
                    onOk={() => {
                      addtrib();
                      setIsAddtrib(false);
                      toast.success("tribunale ajoutée avec succès");
                    }}
                  >
                    <Input
                      placeholder="tapez le lieu du tribunale"
                      value={addingtrib.lieu}
                      onChange={(e) => {
                        setAddingtrib({
                          lieu: e.target.value,
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
