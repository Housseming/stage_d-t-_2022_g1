import {Cascader, Input, Radio,Button} from "antd";
import React, {useState} from "react";
import "./dossier.css";
import {Marginer} from "../marginer/marginfile";
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
        <Marginer direction="vertical" margin={20} />
        <table>
          <tr>
            <th>
              <label>Code client :</label>
            </th>
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
          </tr>
          <Marginer direction="vertical" margin={20} />
          <tr>
            <th>
              <label htmlFor="cin">Matricule Fiscale/CIN :</label>
            </th>
            <th>
              <Input type="number" className="input" placeholder="CIN" />
            </th>
            <th>
              <label htmlFor="raisonsociale">Raison Sociale/Nom :</label>
            </th>
            <th>
              <Input
                type="text"
                className="inputraison"
                placeholder="Raison Sociale"
              />
            </th>
          </tr>
          <Marginer direction="vertical" margin={30} />
          <tr>
            <th>
              <label>Situation Fiscale :</label>
            </th>
            <div className="radioet">
              <Radio.Group onChange={onChangeradio} value={value}>
                <Radio value={1}>Non Assujetie</Radio>
                <Radio value={2}>Assujetie</Radio>
                <Radio value={3}>exonoré</Radio>
              </Radio.Group>
            </div>
            <th>
              <label>Activité Contribuale : </label>
            </th>
            <th>
              <Input
                type="text "
                className="inputraison"
                placeholder="Activité Contribuale"
              />
            </th>
          </tr>
          <Marginer direction="vertical" margin={30} />
          <tr>
            <th>
              <label htmlFor="typeclient"> Type Client :</label>
            </th>
            <th>
              <Input type="text" className="input" placeholder="type client" />
            </th>
            <th>
              <label> Tel :</label>
            </th>
            <th>
              <Input
                type="number"
                className="inputraison"
                placeholder="Numéro de tel"
              />
            </th>
          </tr>
        </table>
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
      </div>
    );
};
export default ClientDemandeur;
