/*import React, { useState } from "react";
import { Button, Table, Modal, Input, DatePicker, Radio, Cascader } from "antd";
import { Marginer } from "../marginer/marginfile";
import axios from "axios";
function Taches() {
  const [liste, setliste] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isAdd, setIsAdd] = useState(false);
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
  //select primehuissier
  const getprimerequest = async () => {
    try {
      const response = await axios.get("/primehuissier");
      setlisteservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getprimerequest();
  });
  console.log(listeservice);

  //supprimer primehuissier
  const deleteprime = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce primehuissier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (prime) => prime.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteprimerequest(record.id);
        toast.success("primehuissier supprimée avec succés");
      },
    });
  };
  const deleteprimerequest = async (id) => {
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
  const editprime = (record) => {
    setIsEdit(true);
    setEdditingprime({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingprime(null);
  };
  //ajouter tache
  const addprime = async () => {
    try {
      const resp = await axios.post("/tacheadd", addingprime);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeselect = (value) => {
    console.log(value);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
    {key: "6", title: "Personne_Chargé", dataIndex: "collaborateur"},
    {key: "7", title: "Greffier", dataIndex: "greffier"},
    {key: "8", title: "Course", dataIndex: "course"},
    {key: "9", title: "Lieux", dataIndex: "fax"},
    {key: "10", title: "Service", dataIndex: "service"},
    {key: "11", title: "Résolu", dataIndex: "resolu"},
  ];
  return (
    <div className="container">
      <div className="boutonet">
        <Button
          className="bouton"
          type="primary"
          block
          onClick={() => {
            setIsAdd(true);
          }}>
          Ajouter Tâche
        </Button>
        <Marginer direction="vertical" margin={10} />
        <Button className="bouton" type="primary" block>
          Retirer Tâche
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
          style={{display: "flex", flex: 1}}
          scroll={{x: "max-content"}}
          size="middle"
          bordered={true}></Table>
      </div>
      <Modal
        title="Ajouter une Tâche"
        visible={isAdd}
        okText="Enregistrer"
        cancelText="Annuler"
        onCancel={() => {
          setIsAdd(false);
        }}
        onRequestClose={() => {}}>
        <div className="formaddtache">
          <label>Tâche:</label>
          <Input
            type="text"
            placeholder="nom de la tâche"
            value={addingprime.tache}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                tache: e.target.value,
              });
            }}></Input>
          <label>Date Critique:</label>
          <DatePicker
            value={addingprime.date_critique}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                date_critique: e.target.value,
              });
            }}
            placeholder="date critique"
          />
          <label>Date Rappel:</label>
          <DatePicker
            value={addingprime.date_rappel}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                date_rappel: e.target.value,
              });
            }}
            placeholder="date rappel"
          />
          <label>Date d'audience:</label>
          <DatePicker
            value={addingprime.date_audience}
            onChange={(e) => {
              setAddingprime({
                ...addingprime,
                date_audience: e.target.value,
              });
            }}
            placeholder="date d'audience"
          />
          <label>Résolu:</label>
          <div className="radioet">
            <Radio.Group
              onChange={(e) => {
                setAddingprime({
                  ...addingprime,
                  resolu: e.target.value,
                });
              }}
              value={value}>
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

export default Taches;*/
