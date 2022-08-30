import { Cascader, Input, Radio, Button, Space, Select, Divider } from "antd";
import React, { useState, useMemo, useRef } from "react";
import "./dossier.css";
import { Marginer } from "../marginer/marginfile";
import TabClient from "./tabclientdemandeur";
import axios from "axios";
import { dossierdata } from "./dossierdata";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";

/*const options = [
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
];*/

const ClientDemandeur = () => {
  const [value, setValue] = useState(1);
  const [listeClient, setListeClient] = useState([]);
  const [matricule, setMatricule] = useState("");
  const [newclient, setNewclient] = useState([]);
  const [codeclient, setCodeclient] = useState([]);
  const { Option } = Select;
  const index = 0;

  //select
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);


  


  // const [ischecked, setIschecked] = useState( [false,false,false] );
  const [donnee, setDonnee] = useState({
    matricule: "",
    raison: "",
    num: "",
    activité: "",
    categorie: "",
    situation_fiscale: "",
  });

  /*const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );*/
  const getclientrequest = async () => {
    try {
      const response = await axios.get("/gestionclient");
      console.log(response.data);

      setListeClient(response.data);
      const liste = listeClient.map((client) => {
        return client.codeclient;
      });
      setCodeclient(liste);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getclientrequest();
  }, [listeClient]);

  /*const onChangeradio = (e) => {
      console.log("radio checked", e.target.value);
      if (donnee.situation_fiscale === "Assujetti") {
        setValue(1);
      } else if (donnee.situation_fiscale === "Non Assujetti") {
        setValue(2);
      } else {
        setValue(3);
      }
    };*/
  //****************************recherche****************
  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {getclientrequest()};
  };
  const [searchText, setSearchText] = useState("");
  const [sortedInfo, setSortedInfo] = useState({});
  const [gridData, setGridData] = useState([]);
  let [filteredData] = useState();
  const globalSearch = () => {
    filteredData = codeclient.filter((value) => {
      return value.toLowerCase().includes(searchText.toLowerCase());
    });
    setGridData(filteredData);
  };
  const reset = () => {
    setSortedInfo({});
    setSearchText("");
    getclientrequest();
  };

  return (
    <div className="container">
      <div className="reglementdiv1">
        <div className="div">
          <label>Code client :</label>

          <Input
            placeholder="Chercher code client"
            onChange={handleChange}
            type="text"
            allowClear
            value={searchText}
          />

          <Button onClick={globalSearch} type="primary">
            {" "}
            Chercher Client{" "}
          </Button>
          <Button onClick={reset}> Réinitialiser </Button>

          <Select
            style={{
              width: 250,
            }}
            placeholder="Code Client"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                ></Space>
              </>
            )}
          >
            {gridData && gridData.length
              ? gridData.map((item) => <Option key={item}>{item}</Option>)
              : codeclient.map((item) => <Option key={item}>{item}</Option>)}
          </Select>
        </div>

        <div className="div">
          <label htmlFor="cin">Matricule Fiscale/CIN :</label>

          <Input
            type="text"
            className="input"
            placeholder="CIN"
            value={donnee.matricule}
            onChange={(e) => {
              dossierdata.cin = e.target.value;
            }}
          />
        </div>
      </div>
      <div className="reglementdiv2">
        <div className="div">
          <label htmlFor="raisonsociale">Raison Sociale/Nom :</label>

          <Input
            type="text"
            placeholder="Raison Sociale"
            value={donnee.raison}
            onChange={(e) => {
              dossierdata.raison = e.target.value;
            }}
          />
        </div>

        <div className="div">
          <label>Situation Fiscale :</label>
          <div className="radioet">
            <Radio.Group>
              <Radio
                checked={() => {
                  if (donnee.situation_fiscale == "Assujetti") {
                    return true;
                  } else {
                    return false;
                  }
                }}
                value={1}
              >
                Non Assujetie
              </Radio>
              <Radio
                checked={() => {
                  if (donnee.situation_fiscale == "non Assujetti") {
                    return true;
                  } else {
                    return false;
                  }
                }}
                value={2}
              >
                Assujetie
              </Radio>
              <Radio
                checked={() => {
                  if (donnee.situation_fiscale == "Exonoré") {
                    return true;
                  } else {
                    return false;
                  }
                }}
                value={3}
              >
                exonoré
              </Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      <div className="reglementdiv3">
        <div className="div">
          <label>Activité Contribuale : </label>

          <Input
            type="text"
            placeholder="Activité Contribuale"
            value={donnee.activité}
          />
        </div>

        <div className="div">
          <label htmlFor="typeclient"> Type Client :</label>

          <Input
            type="text"
            placeholder="type client"
            value={donnee.categorie}
          />
        </div>
      </div>
      <div className="reglementdiv4">
        <div className="div">
          <label>Tel :</label>
          <Input
            type="number"
            className="inputraison"
            placeholder="Numéro de tel"
            value={donnee.num}
            onChange={(e) => {
              dossierdata.tel = e.target.value;
            }}
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
