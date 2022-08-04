import { Cascader, Input, Radio, Button } from "antd";
import React, { useState } from "react";
import "./dossier.css";
import { Marginer } from "../marginer/marginfile";
import TabClient from "./tabclientdemandeur";
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
          {
            value: "xiasha",
            label: "Xia Sha",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua men",
          },
        ],
      },
    ],
  },
];

const ClientDemandeur = () => {
  const [value, setValue] = useState(1);
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
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
      <div className="reglementdiv1">
        <div className="div">
          <label>Code client :</label>

          <Cascader
            className="cascader1"
            options={options}
            onChange={onChange}
            placeholder="selectionner code client"
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
        </div>

        <div className="div">
          <label htmlFor="cin">Matricule Fiscale/CIN :</label>

          <Input type="number" className="input" placeholder="CIN" />
        </div>
      </div>
      <div className="reglementdiv2">
        <div className="div">
          <label htmlFor="raisonsociale">Raison Sociale/Nom :</label>

          <Input type="text" placeholder="Raison Sociale" />
        </div>

        <div className="div">
          <label>Situation Fiscale :</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio} value={value}>
              <Radio value={1}>Non Assujetie</Radio>
              <Radio value={2}>Assujetie</Radio>
              <Radio value={3}>exonoré</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="reglementdiv3">
        <div className="div">
          <label>Activité Contribuale : </label>

          <Input type="text" placeholder="Activité Contribuale" />
        </div>

        <div className="div">
          <label htmlFor="typeclient"> Type Client :</label>

          <Input type="text" placeholder="type client" />
        </div>
      </div>
      <div className="reglementdiv4">
        <div className="div">
          <label>Tel :</label>
          <Input
            type="number"
            className="inputraison"
            placeholder="Numéro de tel"
          />
        </div>
      </div>

      <Marginer direction="vertical" margin={40} />
      <div className="boutonet">
        <Button className="bouton" type="primary" block>
          {" "}
          Ajouter Demandeur
        </Button>
        <Marginer direction="vertical" margin={10} />
        <Button className="bouton" type="primary" block>
          {" "}
          Retirer Demandeur{" "}
        </Button>
      </div>
      <Marginer direction="vertical" margin={20} />
      <TabClient />
      {/*<Button className="boutonvalid" type="primary" block>
          {" "}
          Valider Dossier
            </Button>*/}
    </div>
  );
};
export default ClientDemandeur;
