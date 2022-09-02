import React, { useState,useEffect } from "react";
import { Button, Table, Modal, Input, DatePicker, Radio, Cascader } from "antd";
import { Marginer } from "../marginer/marginfile";
import {toast} from "react-toastify";
import axios from "axios";
import {  HiClipboardCheck } from "react-icons/hi";
function Taches() {
    const [listeservice, setlisteservice] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [edditingtache, setEdditingtache] = useState(null);
  const [liste, setliste] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isAdd, setIsAdd] = useState( false );
   const [addingtache, setAddingtache] = useState({
     tache: "",
     date_critique: "",
     date_rappel: "",
     date_audience: "",
     date_decheance: "",
     greffier: "",
     course: "",
     lieux: "",
     service: "",
     resolu: "",
   });
  const options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
  ];
  //select tache
  const gettacherequest = async () => {
    try {
      const response = await axios.get("/tache");
      setlisteservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    gettacherequest();
  });
  console.log(listeservice);

  //suptacher tache
  const deletetache = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cette tache?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (tache) => tache.id !== record.id
        );
        setlisteservice(newlisteservice);
        deletetacherequest(record.id);
        toast.success("tache supprimée avec succés");
      },
    });
  };
  const deletetacherequest = async (id) => {
    try {
      const deleted = await axios.post("/tacheeff", {
        id: id,
      });
      console.log("Tache supprimée");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier tache
  const edittache = (record) => {
    setIsEdit(true);
    setEdditingtache({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingtache(null);
  };
  //ajouter tache
  const addtache = async () => {
    try {
      const resp = await axios.post("/tacheadd", addingtache);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeselect = (value) => {
    console.log(value);
  };
  const onChange = (date, dateString) => {
    console.log(date,'azziz', dateString);
  };
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [value, setValue] = useState(1);

  const column = [
    {key: "0", title: "id_tache", dataIndex: "id_tache"},
    {key: "1", title: "Tâche", dataIndex: "tache"},

    {key: "2", title: "Date Critique", dataIndex: "date_critique"},
    {key: "3", title: "Date Rappel", dataIndex: "date_rappel"},
    {key: "4", title: "Date_audience", dataIndex: "date_audience"},
    {key: "5", title: "Date_Déchéance", dataIndex: "date_decheance"},
    {key: "6", title: "Personne_Chargé", dataIndex: "personne_chargee"},
    {key: "7", title: "Greffier", dataIndex: "greffier"},
    {key: "8", title: "Course", dataIndex: "course"},
    {key: "9", title: "Lieux", dataIndex: "lieux"},
    {key: "10", title: "Services", dataIndex: "services"},
    {key: "11", title: "Résolu", dataIndex: "resolu"},
  ];
  return (
    <div className="container">
      <h1
        style={{
          fontSize: "1.3rem",
          color: "#0583f2",
        }}
      >
        Tâche(s)
      </h1>
      <HiClipboardCheck className="addclientdem"></HiClipboardCheck>
      <div className="boutonet">
        <Button
          className="bouton"
          type="primary"
          block
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Ajouter Tâche
        </Button>
      </div>
      <div className="tablediv">
        <Table
          columns={column}
          dataSource={liste}
          //scroll={{ x:10}}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          style={{ display: "flex", flex: 1 }}
          scroll={{ x: "max-content" }}
          size="middle"
          bordered={true}
        ></Table>
      </div>
      <Modal
        title="Ajouter une Tâche"
        visible={isAdd}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsAdd(false);
        }}
        onRequestClose={() => {}}
      >
        <div className="formaddtache">
          <label>Tâche:</label>
          <Input
            type="text"
            placeholder="nom de la tâche"
            value={addingtache.tache}
            onChange={(e) => {
              setAddingtache({
                ...addingtache,
                tache: e.target.value,
              });
            }}
          ></Input>
          <label>Date Critique:</label>
          <DatePicker
            value={addingtache.date_critique}
            onChange={(e) => {
              setAddingtache({
                ...addingtache,
                date_critique: e.target.value,
              });
            }}
            placeholder="date critique"
          />
          <label>Date Rappel:</label>
          <DatePicker
            value={addingtache.date_rappel}
            onChange={(e) => {
              setAddingtache({
                ...addingtache,
                date_rappel: e.target.value,
              });
            }}
            placeholder="date rappel"
          />
          <label>Date d'audience:</label>
          <DatePicker
            value={addingtache.date_audience}
            onChange={(e) => {
              setAddingtache({
                ...addingtache,
                date_audience: e.target.value,
              });
            }}
            placeholder="date d'audience"
          />
          <label>Résolu:</label>
          <div className="radioet">
            <Radio.Group
              onChange={(e) => {
                setAddingtache({
                  ...addingtache,
                  resolu: e.target.value,
                });
              }}
              value={value}
            >
              <Radio value={1}>Oui</Radio>
              <Radio value={2}>Non</Radio>
            </Radio.Group>
          </div>
          <label>Personne Chargée:</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={1}>Collaborateur</Radio>
              <Radio value={2}>Greffier</Radio>
            </Radio.Group>
          </div>
          <label>Greffier:</label>
          <Cascader
            options={options}
            onChange={onChangeselect}
            placeholder="selectionner greffier"
          />
          <label>Course:</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={3}>Oui</Radio>
              <Radio value={4}>Non</Radio>
            </Radio.Group>
          </div>
          <label>Lieux:</label>
          <Cascader
            options={options}
            onChange={onChangeselect}
            placeholder="selectionner lieu"
          />
          <label>Service:</label>
          <Cascader
            options={options}
            onChange={onChangeselect}
            placeholder="selectionner service"
          />

          <label>Date de Déchéance:</label>
          <DatePicker onChange={onChange} placeholder="date de déchéance" />
        </div>
      </Modal>
    </div>
  );
}

export default Taches;
