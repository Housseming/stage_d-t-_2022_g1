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
import React, { useState, useEffect ,useMemo} from "react";
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
  const [disabled, setDisabled] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [disabled2, setDisabled2] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [disabled3, setDisabled3] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [disabled4, setDisabled4] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });

  const [checking, setChecking] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [checking2, setChecking2] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });
  const [addingtrib, setAddingtrib] = useState({
    lieu: "",
  });
  const optionschecked = ["lundi", "mardi", "mercredi", "vendredi", "samedi"];

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
              <pre>
                <p>supprimer</p>
              </pre>
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
  });
  useEffect(() => {
    getservicerequest();
  });
 



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
      <Tabs tabPosition={tabPosition} style={{ marginTop: 40 }} className="tabsdesign">
        {listeTrib.map((trib) => {
          const { id, lieu } = trib;
          const newListeService = listeservice.filter(
            (service) => service.tribunale_id == trib.id
          );
          return (
            <TabPane
              tab={
                <div className="tabselement">
                  <div className="divlieu">
                    <h1>{trib.lieu}</h1>
                  </div>
                  <div className="divboutontrib">
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
                  </div>
                </div>
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
                    destroyOnClose={true}
                    onCancel={() => {
                      setIsEditservice(false);
                      resetEditing();
                    }}
                    onOk={async () => {
                      setIsEditservice(false);
                      const newListeservice = listeservice.map((service) => {
                        if (service.service_id == edditingservice.service_id) {
                          return edditingservice;
                        } else {
                          return service;
                        }
                      });
                      try {
                        const addservice = await axios.post(
                          "/updateservice",
                          edditingservice
                        );
                        console.log("raniupdated", edditingservice);
                      } catch (error) {
                        console.log("error");
                      }

                      setListeservice(newListeservice);
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
                        <Checkbox.Group
                          onChange={onChange}
                          defaultValue={[
                            edditingservice.lundi == "audience" ? "lundi" : "",
                            edditingservice.mardi == "audience" ? "mardi" : "",
                            edditingservice.mercredi == "audience"
                              ? "mercredi"
                              : "",
                            edditingservice.jeudi == "audience" ? "jeudi" : "",
                            edditingservice.vendredi == "audience"
                              ? "vendredi"
                              : "",
                            edditingservice.samedi == "audience"
                              ? "samedi"
                              : "",
                          ]}
                        >
                          <Row>
                            <Col span={6}>
                              <Checkbox
                                disabled={
                                  edditingservice.lundi == "course"
                                    ? true
                                    : false
                                }
                                value="lundi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      lundi: "audience",
                                    });
                                  }
                                }}
                              >
                                Lundi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                disabled={
                                  edditingservice.mardi == "course"
                                    ? true
                                    : false
                                }
                                value="mardi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
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
                                disabled={
                                  edditingservice.mercredi == "course"
                                    ? true
                                    : false
                                }
                                value="mercredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
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
                                disabled={
                                  edditingservice.jeudi == "course"
                                    ? true
                                    : false
                                }
                                value="jeudi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
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
                                disabled={
                                  edditingservice.vendredi == "course"
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
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
                                disabled={
                                  edditingservice.samedi == "course"
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
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

                        <Checkbox.Group
                          onChange={onChange}
                          defaultValue={[
                            edditingservice?.lundi == "course"
                              ? "lundi"
                              : "none",
                            edditingservice?.mardi == "course"
                              ? "mardi"
                              : "none",
                            edditingservice?.mercredi == "course"
                              ? "mercredi"
                              : "none",
                            edditingservice?.jeudi == "course"
                              ? "jeudi"
                              : "none",
                            edditingservice?.vendredi == "course"
                              ? "vendredi"
                              : "none",
                            edditingservice?.samedi == "course"
                              ? "samedi"
                              : "none",
                          ]}
                        >
                          <Row>
                            <Col span={6}>
                              <Checkbox
                                disabled={
                                  edditingservice.lundi == "audience"
                                    ? true
                                    : false
                                }
                                value="lundi"
                                onChange={(e) => {
                                  if (e.target.checked) {
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
                                disabled={
                                  edditingservice.mardi == "audience"
                                    ? true
                                    : false
                                }
                                value="mardi"
                                onChange={(e) => {
                                  if (e.target.checked) {
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
                                disabled={
                                  edditingservice.mercredi == "audience"
                                    ? true
                                    : false
                                }
                                value="mercredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
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
                                disabled={
                                  edditingservice.jeudi == "audience"
                                    ? true
                                    : false
                                }
                                value="jeudi"
                                onChange={(e) => {
                                  if (e.target.checked) {
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
                                disabled={
                                  edditingservice.vendredi == "audience"
                                    ? true
                                    : false
                                }
                                value="vendredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
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
                                disabled={
                                  edditingservice.samedi == "audience"
                                    ? true
                                    : false
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setEdditingservice({
                                      ...edditingservice,
                                      jeudi: "course",
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
                    </div>
                  </Modal>
                  <Modal
                    title="ajouter un service"
                    visible={isAddservice}
                    okText="Enregistrer"
                    cancelText="Annuler"
                    destroyOnClose={true}
                    onCancel={() => {
                      setIsAddservice(false);
                      setAddingservice({
                        nom: "",
                        lundi: "",
                        mardi: "",
                        mercredi: "",
                        jeudi: "",
                        vendredi: "",
                        samedi: "",
                      });
                      setDisabled(false, false, false, false, false, false);
                      setDisabled2(false, false, false, false, false, false);
                    }}
                    onOk={() => {
                      addservice();
                      setIsAddservice(false);
                      toast.success("service ajouté avec succès");
                      setAddingservice({
                        nom: "",
                        lundi: "",
                        mardi: "",
                        mercredi: "",
                        jeudi: "",
                        vendredi: "",
                        samedi: "",
                      });
                      setDisabled(false, false, false, false, false, false);
                      setDisabled2(false, false, false, false, false, false);
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
                    <div className="audcourse">
                      <div className="jours">
                        <h1>Jours de l'audience</h1>
                        <Checkbox.Group onChange={onChange}>
                          <Row>
                            <Col span={6}>
                              <Checkbox
                                disabled={disabled2.check1}
                                value="lundi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      lundi: "audience",
                                    });
                                    setDisabled({ ...disabled, check1: true });
                                  } else {
                                    setDisabled({ ...disabled, check1: false });
                                  }
                                }}
                              >
                                Lundi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                disabled={disabled2.check2}
                                value="mardi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mardi: "audience",
                                    });

                                    setDisabled({ ...disabled, check2: true });
                                  } else {
                                    setDisabled({ ...disabled, check2: false });
                                  }
                                }}
                              >
                                Mardi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                disabled={disabled2.check3}
                                value="mercredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mercredi: "audience",
                                    });

                                    setDisabled({ ...disabled, check3: true });
                                  } else {
                                    setDisabled({ ...disabled, check3: false });
                                  }
                                }}
                              >
                                Mercredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                disabled={disabled2.check4}
                                value="jeudi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      jeudi: "audience",
                                    });
                                    setDisabled({ ...disabled, check4: true });
                                  } else {
                                    setDisabled({ ...disabled, check4: false });
                                  }
                                }}
                              >
                                Jeudi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                disabled={disabled2.check5}
                                value="vendredi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      vendredi: "audience",
                                    });
                                    setDisabled({ ...disabled, check5: true });
                                  } else {
                                    setDisabled({ ...disabled, check5: false });
                                  }
                                }}
                              >
                                Vendredi
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <Checkbox
                                disabled={disabled2.check6}
                                value="samedi"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      samedi: "audience",
                                    });
                                    setDisabled({ ...disabled, check6: true });
                                  } else {
                                    setDisabled({ ...disabled, check6: false });
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
                                disabled={disabled.check1}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      lundi: "course",
                                    });

                                    setDisabled2({
                                      ...disabled2,
                                      check1: true,
                                    });
                                  } else {
                                    setDisabled2({
                                      ...disabled2,
                                      check1: false,
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
                                disabled={disabled.check2}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mardi: "course",
                                    });

                                    setDisabled2({
                                      ...disabled2,
                                      check2: true,
                                    });
                                  } else {
                                    setDisabled2({
                                      ...disabled2,
                                      check2: false,
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
                                disabled={disabled.check3}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      mercredi: "course",
                                    });

                                    setDisabled2({
                                      ...disabled2,
                                      check3: true,
                                    });
                                  } else {
                                    setDisabled2({
                                      ...disabled2,
                                      check3: false,
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
                                disabled={disabled.check4}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      jeudi: "course",
                                    });

                                    setDisabled2({
                                      ...disabled2,
                                      check4: true,
                                    });
                                  } else {
                                    setDisabled2({
                                      ...disabled2,
                                      check4: false,
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
                                disabled={disabled.check5}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      vendredi: "course",
                                    });

                                    setDisabled2({
                                      ...disabled2,
                                      check5: true,
                                    });
                                  } else {
                                    setDisabled2({
                                      ...disabled2,
                                      check5: false,
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
                                disabled={disabled.check6}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setAddingservice({
                                      ...addingservice,
                                      samedi: "course",
                                    });

                                    setDisabled2({
                                      ...disabled2,
                                      check6: true,
                                    });
                                  } else {
                                    setDisabled2({
                                      ...disabled2,
                                      check6: false,
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
                    </div>
                  </Modal>
                  <Modal
                    title="modifier tribunale"
                    visible={isEdittrib}
                    okText="Enregistrer"
                    destroyOnClose={true}
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
                    destroyOnClose={true}
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
