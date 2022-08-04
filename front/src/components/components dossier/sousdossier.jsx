import {Cascader, Input, Radio, Button,InputNumber} from "antd";
import React, {useState} from "react";
import "../components dossier/dossier.css";
import { Marginer } from "../marginer/marginfile";
import { DatePicker, Space } from "antd";
import Selection from "./selectioninput";
import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
import Searchi from "./searchinput";
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

const SousDossier = () => {
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
            <label htmlFor="code">Code Dossier :</label>
          </th>
          <th>
            <Searchi placeholder="Code Dossier"/>
          </th>
          <th>
            <label>Date Création :</label>
          </th>
          <th>
            <DatePicker className="input" bordered={true} placeholder="" />
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

        <Marginer direction="vertical" margin={30} />
        <tr>
          <th>
            <label>Observation(s) : </label>
          </th>
          <th>
            <Input type="text" className="mission" />
          </th>
        </tr>
      </table>
      <Marginer direction="vertical" margin={40} />
    </div>
  );
};
export default SousDossier;