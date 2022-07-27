import { Radio, Space, Tabs, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tableau from "./service";

import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
const { TabPane } = Tabs;
const Tribunale = () => {
  const [listeTrib, setListeTrib] = useState([]);
  const [listeService, setListeService] = useState([]);
  //select tribunale
  const gettribunalerequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tribunale");
      console.log(response.data);

      setListeTrib(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettribunalerequest();
  });
  console.log(listeTrib);
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingservice, setEdditingservice] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
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

  //select servicehuissier
  const getservicerequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service");
      setListe(response.data);
     
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getservicerequest();
  });
  console.log(liste);

  //supprimer service
  const deleteservice = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce service?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = liste.filter((service) => service.id !== record.id);
        setListe(newListe);
        deleteservicerequest(record.id);
        toast.success("service supprimé avec succès");
      },
    });
  };
  const deleteservicerequest = async (id) => {
    try {
      const deleted = await axios.post("http://localhost:5000/serviceeff", {
        id: id,
      });
      console.log("service supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un service
  const editservice = (record) => {
    setIsEdit(true);
    setEdditingservice({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingservice(null);
  };
  //ajouter servicehuissier
  const addservice = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/serviceadd",
        addingservice
      );
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
          return <TabPane tab={trib.lieu} key={trib.id}></TabPane>;
        })}
      </Tabs>
    </>
  );
};

export default Tribunale;
