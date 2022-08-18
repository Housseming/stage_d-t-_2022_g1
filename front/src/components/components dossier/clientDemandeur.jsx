import { Cascader, Input, Radio, Button } from "antd";
import React, { useState,useMemo } from "react";
import "./dossier.css";
import { Marginer } from "../marginer/marginfile";
import TabClient from "./tabclientdemandeur";
import axios from "axios";

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
  const [value, setValue] = useState( 1 );
  const [listeClient, setListeClient] = useState( [] );
  const [matricule, setMatricule] = useState( "" );
  const [newclient, setNewclient] = useState( [] );
  const [ischecked, setIschecked] = useState( false );
  const [donnee, setDonnee] = useState({
    matricule: "",
    raison: "",
    num: "",
    activité: "",
    categorie: "",
  } );

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const getclientrequest = async () => {
    try {
      const response = await axios.get("/gestionclient");
      console.log(response.data);

      setListeClient(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const liste = useMemo(() => {
    getclientrequest();
    return listeClient.map((client) => ({
      value: client.id,
      label: client.raison +":"+client.id+":"+client.raison[0],
    }));
  }, [listeClient] );

 
  const onChange = ( value, selectedOptions ) => {
    console.log( value, "lefriki", selectedOptions );
    const newlistclient = listeClient.filter(
      ( ser ) => ser.id == selectedOptions[0].value
    );
    console.log( newlistclient, "KING" )
    setNewclient( newlistclient )
    setMatricule( newclient[0].matricule );

    setDonnee({
      matricule: newclient[0].matricule,
      raison: newclient[0].raison,
      categorie: newclient[0].categorie,
      num: newclient[0].num,
      activité:newclient[0].activité,
      situation_fiscale: newclient[0].situation_fiscale,
    });
  }
    const onChangeradio = (e) => {
      console.log("radio checked", e.target.value);
      if (donnee.situation_fiscale === "Assujetti") {
        setValue(1);
      } else if (donnee.situation_fiscale === "Non Assujetti") {
        setValue(2);
      } else {
        setValue(3);
      }
    };
  return (
    <div className="container">
      <div className="reglementdiv1">
        <div className="div">
          <label>Code client :</label>

          <Cascader
            className="cascader1"
            options={liste}
            onChange={onChange}
            placeholder="selectionner code client"
            showSearch={{
              filter,
            }}
            onSearch={(value) => {
              console.log(value);
            }}
          />
        </div>

        <div className="div">
          <label htmlFor="cin">Matricule Fiscale/CIN :</label>

          <Input
            type="text"
            className="input"
            placeholder="CIN"
            value={donnee.matricule}
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
          />
        </div>

        <div className="div">
          <label>Situation Fiscale :</label>
          <div className="radioet">
            <Radio.Group onChange={onChangeradio}>
              <Radio  value={1}>
                Non Assujetie
              </Radio>
              <Radio  value={2}>
                Assujetie
              </Radio>
              <Radio  value={3}>
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
