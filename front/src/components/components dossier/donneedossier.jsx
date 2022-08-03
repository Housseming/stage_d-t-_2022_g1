import {Cascader, Input, Radio, Button,InputNumber} from "antd";
import React, {useState} from "react";
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
      <Marginer direction="vertical" margin={20} />
      <table>
        <tr>
          <th>
            <label>Type Dossier:</label>
          </th>
          <th>
            <Selection className="input" placeholder="Type Dossier" />
          </th>
          <th>
            <label htmlFor="code">Code Dossier :</label>
          </th>
          <th>
            <InputNumber className="input" placeholder="Code Dossier" />
          </th>
          <th>
            <DatePicker
              classname="inputannee"
              onChange={onChangedate}
              picker="year"
              placeholder="Année"
            />
          </th>
        </tr>
        <Marginer direction="vertical" margin={30} />
        <tr>
          <th>
            <label>Mission :</label>
          </th>
          <th>
            <Input type="text" classname="mission" />
          </th>
        </tr>
        <Marginer direction="vertical" margin={30} />
        <tr>
          <th>
            <label htmlFor="emplacement"> Emplacement :</label>
          </th>
          <th>
            <Selectdossier
              className="input"
              placeholder="Emplacement Dossier"
            />
          </th>
          <th>
            <label> Num Affaire :</label>
          </th>
          <th>
            <Input
              type="number"
              className="inputraison"
              placeholder="Numéro Affaire"
            />
          </th>
        </tr>
        <Marginer direction="vertical" margin={40} />
        <tr>
          <th>
            <label>lieu :</label>
          </th>
          <th>
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
          </th>
          <th>
            <label>Service :</label>
          </th>
          <th>
            <Cascader
              className="cascader1"
              options={options}
              onChange={onChange}
              showSearch={{
                filter,
              }}
              onSearch={(value) => console.log(value)}
            />
          </th>
        </tr>
        <Marginer direction="vertical" margin={30} />
        <tr>
          <th>
            <label>Observation(s) : </label>
          </th>
          <th>
            <Input type="text" className="mission" />
          </th>
          <th>
            <label>Date Création :</label>
          </th>
          <th>
            <DatePicker className="input" bordered={true} placeholder="" />
          </th>
        </tr>
      </table>
      <Marginer direction="vertical" margin={40} />
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
      <TabDossier/>
    </div>
  );
};
export default DonneeDossier;
