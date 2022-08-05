/* This example requires Tailwind CSS v2.0+ */
//il vaut mieux l'id a ne pas toucher
//aleh nafs l'id felexemple // je vais supposer que chaqun a son propre id
//difference entre addresse désigné et addresse //lien entre catgorie et la listeservice ajouter
//collaborateur et code client??? // j'aui ajouté le fax et l'email malgre j'ai pas vu dans le tableau
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input,Space,Cascader } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import { Marginer } from "../marginer/marginfile";

const Gestionclient = () => {
  const [listecodecollab, setListecodecollab] = useState([
  
  ]);
  const options= [
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
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const filter = (inputValue, path) =>
    path.some(
      (listecodecollab) =>
        listecodecollab.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  const [listeservice, setlisteservice] = useState([]);
  const [gridData, setGridData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingGestionclient, setEdditingGestionclient] = useState(null);
  const [addingGestionclient, setAddingGestionclient] = useState({
    id: "",
    raison: "",
    matricule: "",
    ville: "",
    rue: "",
    num: "",
    code_postale: "",
    activité: "",
    situation_fiscale: "",
    categorie: "",
    fax: "",
    email: "",
  });
  const[searchText,setSearchText]=useState("");
  const[sortedInfo,setSortedInfo]=useState({});
  let [filteredData]=useState();

  const columns = [
    { key: "1", title: "id", dataIndex: "id" },
    {
      key: "2",
      title: "raison",
      dataIndex: "raison",
      
    },
    {
      key: "3",
      title: "matricule",
      dataIndex: "matricule",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              {" "}
              Chercher Client{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.matricule.toLowerCase().includes(value.toLowerCase());
      },
    },
  { key: "4", title: "ville", dataIndex: "ville"  },
  { key: "5", title: "rue", dataIndex: "rue" },
  { key: "6", title: "num", dataIndex: "num"  },
  { key: "7", title: "code_postale", dataIndex: "code_postale"  },
  { key: "8", title: "activité", dataIndex: "activité" },
  { key: "9", title: "situation_fiscale", dataIndex: "situation_fiscale"  },
  { key: "10", title: "categorie", dataIndex: "categorie"},
  { key: "11", title: "fax", dataIndex: "fax" },
  { key: "12", title: "email", dataIndex: "email" },
  {
  key: "13",
  title: "Actions",
  render: (record) => {
    return (
      <div className="addicons">
        <div className="divedit">
          <AiFillEdit
            className="edit"
            onClick={() => {
              editGestionclient(record);
            }}
          ></AiFillEdit>
          <p>modifier</p>
        </div>
      {<div className="divdelete">
          <MdDeleteForever
            className="delete"
            onClick={() => {
              deleteGestionclient(record);
            }}
          ></MdDeleteForever>

          <p>supprimer</p>
          </div>}
      </div>
    ); 
  },
 },
 ];


 //select Gestionclient
  const getGestionclientrequest = async () => {
    try {
      const response = await axios.get("/gestionclient");
      setlisteservice(response.data); // aleh listeservice dhaherli khtr tji listeservice [{:}]
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getGestionclientrequest();
  }, []);
  console.log("listeservice",listeservice);

  //supprimer une Gestionclient
  const deleteGestionclient = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce client?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newlisteservice = listeservice.filter(
          (Gestionclient) => Gestionclient.id !== record.id
        );
        setlisteservice(newlisteservice);
        deleteGestionclientrequest(record.id);
        toast.success("client supprimé avec succès");
      },
    });
  };
  const deleteGestionclientrequest = async (id) => {
    try {
      const deleted = await axios.post("/gestionclient/delete", {
        id: id,
      });
      console.log("Emplacement_dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  ////////////
  //modifier une Gestionclient
  const editGestionclient = (record) => {
    setIsEdit(true);
    setEdditingGestionclient({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingGestionclient(null);
  };
  //lien aveclback pour la modif
  const editGestionclientrequest = async (
    id,
    raison,
    matricule,
    ville,
    rue,
    num,
    code_postale,
    activité,
    situation_fiscale,
    categorie,
    fax,
    email
  ) => {
    try {
      const modified = await axios.post("/gestionclient/modif", {
        id: id,
        raison: raison,
        matricule: matricule,
        ville: ville,
        rue: rue,
        num: num,
        code_postale: code_postale,
        activité: activité,
        situation_fiscale: situation_fiscale,
        categorie:categorie,
        fax:fax,
        email:email

      });
      console.log("emplacement_dossier_modifié");
    } catch (error) {
      console.log(error);
    }
  }; ///////////////////// Ajout
  //lien aveclback pour l'ajout
const [Listecollab,setListecollab] = useState([]);
  const [isAdd, setIsAdd] = useState(false);

  const addGestionclient = async () => {
    try {
      const resp = await axios.post("/gestionclient", addingGestionclient);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  
const handleChange = (e) => {setSearchText(e.target.value);
if(e.target.value ==="")
getGestionclientrequest();}
const reset = () => {
  setSortedInfo({});
  setSearchText("");
  getGestionclientrequest();

}
 const getCollabrequest = async () => {
   try {
     const response = await axios.get("/collab", {
       withCredentials: true,
     });

     
       console.log("salem",response);
       setListecollab(response.data);
       console.log("salem3",Listecollab);
       for(var i=0;i<Listecollab.length;i++){
        var codecollab = {value:Listecollab[i].id + ":" + Listecollab[i].username,label:Listecollab[i].id + ":" + Listecollab[i].username} 
        listecodecollab[i]= codecollab;
          console.log(i);
       }
       //setListecodecollab([{Listecollab.id + ":" + Listecollab.username}])
       console.log("salem2",listecodecollab)

     
   } catch (error) {
     console.log(error.message);
   }
 };

 useEffect(() => {
   getCollabrequest();
 }, [Listecollab,listecodecollab]);

const globalSearch = () => {filteredData = listeservice.filter((value)=> {
  return (  
    value.raison.toLowerCase().includes(searchText.toLowerCase()) ||
    value.matricule.toLowerCase().includes(searchText.toLowerCase()) ||
    value.ville.toLowerCase().includes(searchText.toLowerCase()) ||
    value.rue.toLowerCase().includes(searchText.toLowerCase()) ||
    value.code_postale.toLowerCase().includes(searchText.toLowerCase()) ||
    value.activité.toLowerCase().includes(searchText.toLowerCase()) ||
    value.situation_fiscale.toLowerCase().includes(searchText.toLowerCase()) ||
    value.categorie.toLowerCase().includes(searchText.toLowerCase()) ||
    value.fax.toLowerCase().includes(searchText.toLowerCase()) ||
    value.email.toLowerCase().includes(searchText.toLowerCase()) 

  );

});
setGridData(filteredData)
console.log('filtered',filteredData)
console.log('length',filteredData.length)}


  return (
    <div className="App">
      <header className="App-header">
        <h1>Les clients</h1>
        {
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}
          >
            {" "}
            Ajouter{" "}
          </button>
        }
        <Space>
          <Input
            placeholder="Texte de recherche"
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
        </Space>
        <Marginer direction="vertical" margin={50} />
        <div classname="tab">
          <Table
            columns={columns}
            dataSource={gridData && gridData.length ? gridData : listeservice}
            style={{ with: 15 }}
            bordered={true}
          />
        </div>
        {/*MODIFICATION*/}
        <Modal
          title="modifier "
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={() => {
            setIsEdit(false);
            const newlisteservice = listeservice.map((Gestionclient) => {
              if (Gestionclient.id === edditingGestionclient.id) {
                return edditingGestionclient;
              } else {
                return Gestionclient;
              }
            });
            setlisteservice(newlisteservice);
            editGestionclientrequest(
              edditingGestionclient.id,
              edditingGestionclient.raison,
              edditingGestionclient.matricule,
              edditingGestionclient.ville,
              edditingGestionclient.rue,
              edditingGestionclient.num,
              edditingGestionclient.code_postale,
              edditingGestionclient.activité,
              edditingGestionclient.situation_fiscale,
              edditingGestionclient.categorie,
              edditingGestionclient.fax,
              edditingGestionclient.email
            ); // a ne pas toucher l'id
            resetEditing();
            toast.success("Gestionclient modifié avec succée");
          }}
        >
          <Input
            placeholder="id"
            value={edditingGestionclient?.id}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                id: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.raison}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                raison: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.matricule}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                matricule: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.ville}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                ville: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.rue}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                rue: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.num}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                num: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.code_postale}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                code_postale: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.activité}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                activité: e.target.value,
              });
            }}
          ></Input>

          <input
            type="radio"
            name="a"
            value={edditingGestionclient?.situation_fiscale}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                situation_fiscale: "non Assujetti",
              });
            }}
          ></input>
          <label>Non Assujetti </label>
          <input
            type="radio"
            name="a"
            value={edditingGestionclient?.situation_fiscale}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                situation_fiscale: "Assujetti",
              });
            }}
          ></input>
          <label>Assujetti </label>
          <input
            type="radio"
            name="a"
            value={edditingGestionclient?.situation_fiscale}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                situation_fiscale: "exonoré",
              });
            }}
          ></input>
          <label>exonoré</label>
          <Input
            placeholder="categorie"
            value={edditingGestionclient?.categorie}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                categorie: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="fax"
            value={edditingGestionclient?.fax}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                fax: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder=""
            value={edditingGestionclient?.email}
            onChange={(e) => {
              setEdditingGestionclient({
                ...edditingGestionclient,
                email: e.target.value,
              });
            }}
          ></Input>
        </Modal>
   
        

        
       
      
        <Modal
          title="ajouter "
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addGestionclient();
            setIsAdd(false);
            toast.success("client_ajouté avec succès");
          }}
        >
          <Cascader
            className="cascader1"
            options={listecodecollab}
            onChange={onChange}
            placeholder="selectionner code client"
            showSearch={{
              filter,
            }}
            onSearch={(value) => console.log(value)}
          />
          <Input
            placeholder="id"
            value={addingGestionclient.id}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                id: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="raison"
            value={addingGestionclient.raison}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                raison: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="matricule"
            value={addingGestionclient.matricule}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                matricule: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="ville"
            value={addingGestionclient.ville}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                ville: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="rue"
            value={addingGestionclient.rue}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                rue: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="num"
            value={addingGestionclient.num}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                num: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="code_postale"
            value={addingGestionclient.code_postale}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                code_postale: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="activité"
            value={addingGestionclient.activité}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                activité: e.target.value,
              });
            }}
          ></Input>
          <div ClassName="situation">
            <p>Situation_fiscale</p>
            <input
              type="radio"
              name="a"
              placeholder="situation_fiscale"
              value={addingGestionclient.situation_fiscale}
              onChange={(e) => {
                setAddingGestionclient({
                  ...addingGestionclient,
                  situation_fiscale: "Non Assujetti",
                });
              }}
            ></input>
            <label>Non Assujetti</label>
            <input
              type="radio"
              name="a"
              placeholder="situation_fiscale"
              value={addingGestionclient.situation_fiscale}
              onChange={(e) => {
                setAddingGestionclient({
                  ...addingGestionclient,
                  situation_fiscale: "Asujetti",
                });
              }}
            ></input>
            <label>Asujetti</label>
            <input
              type="radio"
              name="a"
              placeholder="situation_fiscale"
              value={addingGestionclient.situation_fiscale}
              onChange={(e) => {
                setAddingGestionclient({
                  ...addingGestionclient,
                  situation_fiscale: "Exonoré",
                });
              }}
            ></input>
            <label>Exonoré</label>
          </div>
          <Input
            placeholder="categorie"
            value={addingGestionclient.categorie}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                categorie: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="fax"
            value={addingGestionclient.fax}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                fax: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="email"
            value={addingGestionclient.email}
            onChange={(e) => {
              setAddingGestionclient({
                ...addingGestionclient,
                email: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};
export default Gestionclient;
