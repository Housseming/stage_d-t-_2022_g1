import { Input, Radio, Button, InputNumber, Cascader } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { Marginer } from "../marginer/marginfile";
import { DatePicker, Space } from "antd";
import Selection from "./selectioninput";

import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
import axios from "axios";

const DonneeDossier = () => {
  const [value, setValue] = useState(1);
  const [listeTrib, setListeTrib] = useState([]);
  const [listeservice, setListeservice] = useState([]);
  const [listeserviceinput, setListeserviceinput] = useState([]);
  const [listeemplacement, setListeemplacement] = useState([]);

  const onChangeemp = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    const newlisteser = listeser.filter((ser) => ser.value == selectedOptions[0].value);
    setListeserviceinput(newlisteser);
    console.log(listeserviceinput,"ena liste service jdida")
    
  };
  const onChangeservice = (value, selectedOptions) => {
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
      //console.log(response.data);

      setListeTrib(response.data);
     // console.log("hellolistetrib", listeTrib);
    } catch (error) {
      console.log(error.message);
    }
  };
  //*************select emplacement dossier ******************/
  const getemplacementdossierrequest = async () => {
    try {
      const response = await axios.get("/emplacementdossier");
      //console.log(response.data);

      setListeemplacement(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  /************select services ************/
  const getservicerequest = async () => {
    try {
      const response = await axios.get("/service");
      setListeservice(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const liste = useMemo(() => {
    gettribunalerequest();

    return listeTrib.map((trib) => ({
      value: trib.id,
      label: trib.lieu,
    }));
  }, [listeTrib]);

  const listeemp = useMemo(() => {
    getemplacementdossierrequest();

    return listeemplacement.map((emp) => ({
      value: emp.id,
      label: emp.libelle,
    }));
  }, [listeemplacement]);

  const listeser = useMemo(() => {
    getservicerequest();

    return listeservice.map((ser) => ({
      value: ser.tribunale_id,
      label: ser.nom,
    }));
  }, [listeservice]);

  //const listesaved = useMemo(()=>gettribunalerequest(),[listeTrib,listelieutrib])

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

          <Cascader
            className="cascader1"
            options={listeemp}
            placeholder="emplacements dossiers"
            onChange={onChangeemp}
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
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
            options={liste}
            placeholder="Chercher lieu"
            onChange={onChange}
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
            options={listeserviceinput}
            onChange={onChangeservice}
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
