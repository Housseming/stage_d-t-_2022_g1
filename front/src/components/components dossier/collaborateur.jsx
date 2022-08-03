import React, { useState } from "react";
import { Input, Button, Table, Radio, Cascader } from "antd";

function Collaborateur() {
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [value, setValue] = useState(1);
  return (
    <div className="collabcontainer">
      <div className="divcollab1">
        <div className="inputcoll">
          <label>Code Collaborateur :</label>
          <Input type="text" placeholder="code collaborateur"></Input>
        </div>
        <div className="inputcoll">
          <label>Mode Réglement :</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={1}>Mensuel</Radio>
              <Radio value={2}>Sur Dossier</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="inputcoll">
          <label>Nom et Prénom :</label>
          <Input type="text" placeholder="Nom et Prénom"></Input>
        </div>
        <div className="inputcoll">
          <label>Par Collaborateur :</label>
          <Input type="text" placeholder="part collaborateur"></Input>
        </div>
        <div className="inputcoll">
          <label>CIN :</label>
          <Input type="text" placeholder="cin"></Input>
        </div>
        <div className="inputcoll">
          <label>Type Réglement :</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={1}>Pourcentage</Radio>
              <Radio value={2}>Forfait</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="divcollab2">
       
        <div className="divcollab22">
             <label>Adresse :</label>
          <div className="inputcoll">
            <label>Ville :</label>
            <Input type="text" placeholder="ville"></Input>
          </div>
          <div className="inputcoll">
            <label>Rue :</label>
            <Input type="text" placeholder="rue"></Input>
          </div>
          <div className="inputcoll">
            <label>Numéro :</label>
            <Input type="text" placeholder="numéro"></Input>
          </div>
          <div className="inputcoll">
            <label>Code Postal :</label>
            <Input type="text" placeholder="code postal"></Input>
          </div>
        </div>
        <div className="divcollab23">
          <div className="inputcoll">
            <label>Activité Contribuale :</label>
            <Input type="text" placeholder="Activité Contribuale"></Input>
          </div>
          <div className="inputcoll">
            <label>Tel :</label>
            <Input type="text" placeholder="Tel"></Input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborateur;
