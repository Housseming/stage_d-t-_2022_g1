import React, { useState } from "react";
import { Button, Table, Modal, Input, DatePicker, Radio, Cascader } from "antd";
import { Marginer } from "../marginer/marginfile";
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
    { key: "1", title: "Tâche", dataIndex: "tache" },

    { key: "2", title: "Date Critique", dataIndex: "date_critique" },
    { key: "3", title: "Date Rappel", dataIndex: "date_rappel" },
    { key: "4", title: "Date_audience", dataIndex: "date_audience" },
    { key: "5", title: "Date_Déchéance", dataIndex: "date_decheance" },
    { key: "6", title: "Personne_Chargé", dataIndex: "collaborateur" },
    { key: "7", title: "Greffier", dataIndex: "greffier" },
    { key: "8", title: "Course", dataIndex: "course" },
    { key: "9", title: "Lieux", dataIndex: "fax" },
    { key: "10", title: "Service", dataIndex: "service" },
    { key: "11", title: "Résolu", dataIndex: "resolu" },
  ];
  return (
    <>
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
        <Marginer direction="vertical" margin={10} />
        <Button className="bouton" type="primary" block>
          Retirer Tâche
        </Button>
      </div>
      <div className="tablediv">
        <Table
          className="tachetable"
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
          <Input type="text" placeholder="nom de la tâche"></Input>
          <label>Date Critique:</label>
          <DatePicker onChange={onChange} />
          <label>Date Rappel:</label>
          <DatePicker onChange={onChange} />
          <label>Résolu:</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
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
            placeholder="Please select"
          />
          <label>Course:</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={1}>Oui</Radio>
              <Radio value={2}>Non</Radio>
            </Radio.Group>
          </div>
          <label>Lieux:</label>
          <Cascader
            options={options}
            onChange={onChangeselect}
            placeholder="Please select"
          />
          <label>Service:</label>
          <Cascader
            options={options}
            onChange={onChangeselect}
            placeholder="Please select"
          />
          <label>Date d'audience:</label>
          <DatePicker onChange={onChange} />
          <label>Date de Déchéance:</label>
          <DatePicker onChange={onChange} />
        </div>
      </Modal>
    </>
  );
}

export default Taches;
