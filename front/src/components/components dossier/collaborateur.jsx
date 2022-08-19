import React, {useState, useMemo} from "react";
import "./dossier.css";
import {Marginer} from "../marginer/marginfile";
import {Input, Button, Table, Radio, Cascader, Select} from "antd";
import axios from "axios";
function Collaborateur() {
  const [listeCollab, setListeCollab] = useState([]);
  //const [matricule, setMatricule] = useState("");
  const [newcollab, setNewcollab] = useState([]);
  const [donnee, setDonnee] = useState({
    username: "",
    raison: "",
    num: "",
    activité: "",
    categorie: "",
  });

  const filter = (inputValue, path) =>
    path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const getcollabrequest = async () => {
    try {
      const response = await axios.get("/collab");
      console.log(response.data);

      setListeCollab(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const liste = useMemo(() => {
    getcollabrequest();
    return listeCollab.map((collab) => ({
      value: collab.id,
      label: collab.id + ":" + collab.username,
    }));
  }, [listeCollab]);

  const onChange = (value, selectedOptions) => {
    console.log(value, "lefriki", selectedOptions);
    const newlistcollab = listeCollab.filter(
      (ser) => ser.id == selectedOptions[0].value
    );
    console.log(newlistcollab, "KING");
    setNewcollab(newlistcollab);
    //setMatricule(newcollab[0].matricule);

    setDonnee({
      username: newcollab[0].username,
      raison: newcollab[0].raison,
      categorie: newcollab[0].categorie,
      num: newcollab[0].num,
      activité: newcollab[0].activité,
      situation_fiscale: newcollab[0].situation_fiscale,
    });
  };
  const onChangeradio = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [value, setValue] = useState(1);
  return (
    <div className="container">
      <div className="divcollab1">
        <div className="inputcoll">
          <label>Code Collaborateur :</label>
          <Cascader
            type="text"
            placeholder="code collaborateur"
            options={liste}
            onChange={onChange}
          ></Cascader>
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
          <Input type="text" placeholder="Nom et Prénom" value={donnee.username}></Input>
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
