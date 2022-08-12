import {Input, Radio, Button, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import "../components dossier/dossier.css";
import { Marginer } from "../marginer/marginfile";
import { DatePicker, Space } from "antd";
import Selection from "./selectioninput";

import { Cascader } from "rsuite";
  
import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
import axios from "axios";
const options = [
  {
    value: "المحكمة الإبتدائية بمنوبة",
    label: "المحكمة الإبتدائية بمنوبة",
  },

  { value: "المحكمة الإبتدائية بأريانة", label: "المحكمة الإبتدائية بأريانة" },

  { value: "المحكمة الإبتدائية بنعروس", label: "المحكمة الإبتدائية بنعروس" },
];
const option = [
  {
    value: "emplacement",
    label: "emplacement"},
    
  
    {value: "emplacement1",
    label: "emplacement 1"}
    
  
];

const DonneeDossier = () => {
  const [value, setValue] = useState(1);
  const [listeTrib, setListeTrib] = useState([]);
  const [listelieutrib, setListelieutrib] = useState([]);
  const onChangelieu = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const [valuecascader,setValuecascader] = useState("")
  const onChange = (value, selectedOptions) => {
    setValuecascader(value)
    console.log(value, selectedOptions);
  };
  const onChangedate = (date, dateString) => {
    console.log(date, dateString);
  };

  const filterlieu = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );

  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  //**********select tribunale********************

  const gettribunalerequest = async () => {
      
    try {
      const response = await axios.get("/tribunale");
      console.log(response.data);

      setListeTrib(response.data);
      
      for (var i = 0; i < listeTrib.length; i++) {
        var lieutrib = {
          value: listeTrib[i].lieu + "/" +i,
          label: listeTrib[i].lieu,
        };
        listelieutrib[i] = lieutrib;
      }
      console.log("c bon",listelieutrib)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    gettribunalerequest();
  });

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
            data={listelieutrib}
            placeholder="Chercher lieu"
            menuWidth={400}
            style={{ width: 224, display: 'block', marginBottom: 10 }}
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
