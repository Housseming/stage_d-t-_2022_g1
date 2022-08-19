import React, { useState, useEffect, useMemo, useRef } from "react";
import { Marginer } from "../marginer/marginfile";
import {
  DatePicker,
  Space,
  Divider,
  Input,
  Select,
  Button,
  InputNumber,
  Cascader,
} from "antd";

import { toast } from "react-toastify";
import Selectdossier from "./selectemplacement";
import TabDossier from "./tabdossier";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
let index = 0;

const DonneeDossier = () => {
  const [items, setItems] = useState([
    "إداري",
    "أذون",
    "أمر بالدفع",
    "إستشارات",
    "إستعجالي",
    "تجاري",
    "تنبه",
    "جبائي",
    "جزائي",
    "جناحي",
    "شخصي",
    "شغلي",
    "شكايات",
    "ضمان إجتماعي",
    "عقاري",
    "عقل",
    "عقود",
    "مدني",
    "مرور",
    "ملك تجاري",
    "نفقة",
  ]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
    setAdd_dossier({...add_dossier,typedossier:event.target.value})
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const [value, setValue] = useState(1);
  const [listeTrib, setListeTrib] = useState([]);
  const [listeservice, setListeservice] = useState([]);
  const [listeserviceinput, setListeserviceinput] = useState([]);
  const [listeemplacement, setListeemplacement] = useState([]);
  const [add_dossier, setAdd_dossier] = useState({
    typedossier: "",
    codedossier: "",
    annee: "",
    mission: "",
    emplacement: "",
    numaffaire: "",
    lieu: "",
    service: "",
    observation: "",
    date_creation: "",
  });
  const onChangeemp = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setAdd_dossier({ ...add_dossier, emplacement: selectedOptions[0].label });
  };
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    const newlisteser = listeser.filter(
      (ser) =>
        ser.value.substring(value.indexOf(":"), value.length) ==
        selectedOptions[0].value
    );
    setListeserviceinput(newlisteser);
    setAdd_dossier({...add_dossier,lieu:selectedOptions[0].label})
    console.log(listeserviceinput, "ena liste service jdida");
  };
  const onChangeservice = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    setAdd_dossier({ ...add_dossier, service: selectedOptions[0].label });
  };
  const onChangedate = (date, dateString) => {
    console.log(date, dateString,"ena date heeey");
    
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
      value: ser.tribunale_id + ":" + ser.service_id,
      label: ser.nom,
    }));
  }, [listeservice]);

  //************ajouter dossier **************/
  const adddossier = async () => {
    try {
      const resp = await axios.post("/recherchedossieradd", add_dossier);
      if (resp.data.error) {
        toast.error(resp.data.error);
      } else {
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //const listesaved = useMemo(()=>gettribunalerequest(),[listeTrib,listelieutrib])

  return (
    <div className="container">
      <div className="client2">
        <div className="div">
          <label>Type Dossier:</label>

          <Select
            style={{
              width: 250,
            }}
            placeholder="Type de Dossier"
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
                >
                  <Input
                    placeholder="Ajouter un type"
                    ref={inputRef}
                    value={add_dossier.typedossier}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Ajouter Type
                  </Button>
                </Space>
              </>
            )}
          >
            {items.map((item) => (
              <Option key={item}>{item}</Option>
            ))}
          </Select>
        </div>
        <div className="div">
          <label htmlFor="code">Code Dossier :</label>

          <InputNumber className="input" placeholder="Code Dossier" />
          <div className="client1">
            <div className="dateinput">
              <label>Année</label>
              <DatePicker
                
                picker="year"
                placeholder="Année"
                value={add_dossier.annee}
                onChange={(e) => {
                  setAdd_dossier({
                    ...add_dossier,
                    annee: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="client2">
        <div className="div">
          <label>Mission :</label>

          <Input
            type="text"
            classame="mission"
            value={add_dossier.mission}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                mission: e.target.value,
              });
            }}
          />
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
            type="text"
            className="inputraison"
            placeholder="Numéro Affaire"
            value={add_dossier.numaffaire}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                numaffaire: e.target.value,
              });
            }}
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
          <Input
            type="text"
            value={add_dossier.observation}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                observation: e.target.value,
              });
            }}
          />
        </div>
        <div className="div">
          <label>Date Création :</label>
          <DatePicker
            className="dateinput"
            bordered={true}
            placeholder="date creation"
            value={add_dossier.date_creation}
            onChange={(e) => {
              setAdd_dossier({
                ...add_dossier,
                date_creation: e.target.value,
              });
            }}
          />
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
