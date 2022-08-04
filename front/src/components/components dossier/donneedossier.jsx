import { Cascader, Input, Radio, Button, InputNumber } from "antd";
import React, { useState } from "react";
import "../components dossier/dossier.css";
import { Marginer } from "../marginer/marginfile";
import { DatePicker, Space } from "antd";
import Selection from "./selectioninput";
import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
const options = [
  {
    value: "emplacement",
    label: "emplacement",
    children: [
      {
        value: "child",
        label: "child",
        children: [
          {
            value: "childd1",
            label: "childd1",
          },
          {
            value: "child2",
            label: "child2",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: "emplacement1",
    label: "emplacement 1",
    children: [
      {
        value: "emplacement 2",
        label: "emplacement2",
        children: [
          {
            value: "child1",
            label: "child1",
          },
        ],
      },
    ],
  },
];

const DonneeDossier = () => {
  const [value, setValue] = useState(1);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onChangedate = (date, dateString) => {
    console.log(date, dateString);
  };

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="container">
      <div className="client1">
        <div className="dateinput">
          <label>Année</label>
          <DatePicker
            onChange={onChangedate}
            picker="year"
            placeholder="Année"
          />
          
        </div>
      </div>
      <div className="client2">
        <div className="div">
          <label>Type Dossier:</label>

          <Selection className="input" placeholder="Type Dossier" />
        </div>
        <div className="div">
          <label htmlFor="code">Code Dossier :</label>

          <InputNumber className="input" placeholder="Code Dossier" />
        </div>
      </div>
      <div className="client2">
        <div className="div">
          <label>Mission :</label>

          <Input type="text" classame="mission" />
        </div>
      </div>
      <div className="client3">
        <div className="div">
          <label htmlFor="emplacement"> Emplacement :</label>

          <Selectdossier className="input" placeholder="Emplacement Dossier" />
        </div>
        <div className="div">
          <label> Num Affaire :</label>

          <Input
            type="number"
            className="inputraison"
            placeholder="Numéro Affaire"
          />
        </div>
      </div>
      <div className="client4">
        <div className="div">
          <label>lieu :</label>

          <Cascader
            className="cascader1"
            options={options}
            onChange={onChange}
            placeholder="Chercher lieu"
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
        </div>
        <div className="div">
          <label>Service :</label>

          <Cascader
            className="cascader1"
            options={options}
            onChange={onChange}
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
        </div>
      </div>
      <div className="client5">
        <div className="div">
          <label>Observation(s) : </label>
          <Input type="text" />
        </div>
        <div className="div">
          <label>Date Création :</label>
          <DatePicker className="dateinput" bordered={true} placeholder="" />
        </div>
      </div>

      <div className="boutonet">
        <Button className="bouton" type="primary" block>
          {" "}
          Ajouter Adversaire
        </Button>
        <Marginer direction="vertical" margin={10} />
        <Button className="bouton" type="primary" block>
          {" "}
          Retirer Adversaire{" "}
        </Button>
      </div>
      <TabDossier />
    </div>
  );
};
export default DonneeDossier;
