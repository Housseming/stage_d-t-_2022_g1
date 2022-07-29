import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {Table, Modal, Input,Button} from "antd";
import "antd/dist/antd.min.css";
import {AiFillEdit} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import { toast } from "react-toastify";
import {SearchOutlined} from "@ant-design/icons";
const RechercheDossier = () => {
  //declaration necessaires
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [edditingdossier, setEdditingdossier] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [addingdossier, setAddingdossier] = useState({
    num_affaire: "",
    emplacement: "",
    client: "",
    tel: "",
    mission: "",
    adversaire:"",
    reste:"",
  });
  const column = [
    {key: "1", title: "id_dossier", dataIndex: "id_dossier"},
    {key: "2", title: "num_affaire", dataIndex: "num_affaire"},
    {key: "3", title: "emplacement", dataIndex: "emplacement"},
    {
      key: "4",
      title: "client",
      dataIndex: "client",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        confirm,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary">
              {" "}
              Rechercher{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger">
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.client.toLowerCase().includes(value.toLowerCase());
      },
    },
    {key: "5", title: "tel", dataIndex: "tel"},
    {
      key: "6",
      title: "mission",
      dataIndex: "mission",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        confirm,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary">
              {" "}
              Rechercher{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger">
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.mission.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "7",
      title: "adversaire",
      dataIndex: "adversaire",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        clearFilters,
        confirm,
      }) => {
        return (
          <React.Fragment>
            <Input
              autoFocus
              placeholder="type text"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({closeDropdown: false});
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary">
              {" "}
              Rechercher{" "}
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger">
              Réinitialiser{" "}
            </Button>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.adversaire.toLowerCase().includes(value.toLowerCase());
      },
    },
    {key: "8", title: "reste", dataIndex: "reste"},
    {
      key: "16",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editdossier(record);
                }}></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deletedossier(record);
                }}></MdDeleteForever>

              <p>supprimer</p>
            </div>
          </div>
        );
      },
    },
  ];
  //select dossier
  const getdossierrequest = async () => {
    try {
      const response = await axios.get("/recherchedossier");
      setListe(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getdossierrequest();
  });
  console.log(liste);

  //supprimer dossier
  const deletedossier = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer ce dossier?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = liste.filter((dossier) => dossier.id_dossier !== record.id_dossier);
        setListe(newListe);
        deletedossierrequest(record.id_dossier);
        toast.success("dossier supprimée avec succès");
      },
    });
  };
  const deletedossierrequest = async (id_dossier) => {
    try {
      const deleted = await axios.post("recherchedossiereff", {
        id_dossier: id_dossier,
      });
      console.log("dossier supprimé");
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un dossier
  const editdossier = (record) => {
    setIsEdit(true);
    setEdditingdossier({...record}); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingdossier(null);
  };
  //ajouter dossier
  const adddossier = async () => {
    try {
      const resp = await axios.post("recherchedossieradd", addingdossier);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="boutonet">
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            Reclasser Dossier
          </button>
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            Générer Facture
          </button>
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            Générer Facture Etat
          </button>
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            Ajouter Dossier
          </button>
          <button
            className="btnadd"
            onClick={() => {
              setIsAdd(true);
            }}>
            Archiver Dossier
          </button>
        </div>
        <div className="tab">
          <Table
            columns={column}
            dataSource={liste}
            size="medium"
            bordered={true}></Table>
        </div>

        <Modal
          title="modifier dossier"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);
            const newListe = liste.map((dossier) => {
              if (dossier.id_dossier == edditingdossier.id_dossier) {
                return edditingdossier;
              } else {
                return dossier;
              }
            });
            try {
              const adddossier = await axios.post(
                "/recherchedossier/update",
                edditingdossier
              );
            } catch (error) {
              console.log("error");
            }
            setListe(newListe);
            resetEditing();
            toast.success("dossier modifié avec succès");
          }}>
          <Input
            placeholder="Tapez le num_affaire"
            value={edditingdossier?.num_affaire}
            onChange={(e) => {
              setEdditingdossier({
                ...edditingdossier,
                num_affaire: e.target.value,
              });
            }}></Input>
          {/*edditingdossier? s'il n'est pas null*/}
          <Input
            placeholder="Tapez l'emplacement"
            value={edditingdossier?.emplacement}
            onChange={(e) => {
              setEdditingdossier({
                ...edditingdossier,
                emplacement: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=" nom du client "
            value={edditingdossier?.client}
            onChange={(e) => {
              setEdditingdossier({...edditingdossier, client: e.target.value});
            }}></Input>
          <Input
            placeholder=" numéro de tel du client "
            value={edditingdossier?.tel}
            onChange={(e) => {
              setEdditingdossier({...edditingdossier, tel: e.target.value});
            }}></Input>
          <Input
            placeholder=" mission"
            value={edditingdossier?.mission}
            onChange={(e) => {
              setEdditingdossier({...edditingdossier, mission: e.target.value});
            }}></Input>
          <Input
            placeholder=" adversaire "
            value={edditingdossier?.adversaire}
            onChange={(e) => {
              setEdditingdossier({
                ...edditingdossier,
                adversaire: e.target.value,
              });
            }}></Input>
          <Input
            placeholder=" reste "
            value={edditingdossier?.reste}
            onChange={(e) => {
              setEdditingdossier({...edditingdossier, reste: e.target.value});
            }}></Input>
        </Modal>
        <Modal
          title="ajouter dossier"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            adddossier();
            setIsAdd(false);
            toast.success("dossier ajoutée avec succès");
          }}>
          <Input
            placeholder="numéro d'affaire"
            value={addingdossier.num_affaire}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                num_affaire: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="emplacement dossier"
            value={addingdossier.emplacement}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                emplacement: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Nom du client "
            value={addingdossier.client}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                client: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Numéro du tel du client"
            value={addingdossier.tel}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                tel: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Mission"
            value={addingdossier.mission}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                mission: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Adversaire"
            value={addingdossier.adversaire}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                adversaire: e.target.value,
              });
            }}></Input>
          <Input
            placeholder="Reste"
            value={addingdossier.reste}
            onChange={(e) => {
              setAddingdossier({
                ...addingdossier,
                reste: e.target.value,
              });
            }}></Input>
        </Modal>
      </header>
    </div>
  );
};

export default RechercheDossier;
