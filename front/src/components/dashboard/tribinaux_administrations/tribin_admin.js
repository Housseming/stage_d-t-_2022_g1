import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Pagination } from "antd";
import "antd/dist/antd.min.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FcAcceptDatabase } from "react-icons/fc";
import styled from "styled-components";
import { MdPersonSearch } from "react-icons/md";
import { BsCaretRightSquare } from "react-icons/bs";
const Tribin_Admin = () => {
  //declaration necessaires
  const [liste, setListe] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [edditingTrib, setEdditingTrib] = useState({
    lieu: "",
  });
  const [isAdd, setIsAdd] = useState(false);
  /*const StyledTable = styled((props) => <Table {...props} />)`
    && tbody > tr:hover > td {
      background: rgb(200, 182, 226,0.2);
    }
  `;*/
  const [addingTrib, setAddingTrib] = useState({
    lieu: "",
  });

  const column = [
    {
      key: "1",
      title: "Liste des Services",
      render: (record) => {
        return (
          <div className="service">
            <BsCaretRightSquare
              className="edit"
              onClick={() => {
                editTrib(record);
              }}
            ></BsCaretRightSquare>
          </div>
        );
      },
      key: "2",
      title: "Liste des tribunaux",
      dataIndex: "lieu",
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
              placeholder="chercher une tribunale"
              onPressEnter={() => {
                confirm();
              }}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              value={selectedKeys[0]}
            ></Input>
            <div className="searchdiv">
              <button
                onClick={() => {
                  confirm();
                }}
                className="btnsearch"
              >
                chercher
              </button>
              <button
                onClick={() => {
                  clearFilters();
                }}
                className="btnsearch"
              >
                réinitialiser
              </button>
            </div>
          </React.Fragment>
        );
      },
      filterIcon: () => {
        return <MdPersonSearch className="searchicon"></MdPersonSearch>;
      },
      onFilter: (value, record) => {
        return record.lieu.toLowerCase().includes(value.toLowerCase()); //La méthode includes() détermine si une chaîne de caractères est contenue dans une autre et renvoie true ou false selon le cas de figure
      },
    },

    {
      key: "3",
      title: "Actions",
      render: (record) => {
        return (
          <div className="addicons">
            <div className="divedit">
              <AiFillEdit
                className="edit"
                onClick={() => {
                  editTrib(record);
                }}
              ></AiFillEdit>
              <pre>
                <p>modifier </p>
              </pre>
            </div>
            <div className="divdelete">
              <MdDeleteForever
                className="delete"
                onClick={() => {
                  deleteTrib(record);
                }}
              ></MdDeleteForever>

              <pre>
                <p>supprimer</p>
              </pre>
            </div>
          </div>
        );
      },
    },
  ];

  //select collaborateur
  const getTribrequest = async () => {
    try {
      const response = await axios.get("http://localhost:5000/liste_tribunaux", {});

      if (response.data.error) {
        console.log("non connecté");
      } else {
        console.log(response);
        setListe(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTribrequest();
  });
  console.log(liste);

  //supprimer collaborateur
  const deleteTrib = (record) => {
    Modal.confirm({
      title: "Vous etes sur de supprimer cette tribunale?",
      okText: "oui",
      okType: "danger",
      cancelText: "annuler",
      onOk: () => {
        const newListe = liste.filter((trib) => trib.lieu !== record.lieu);
        setListe(newListe);
        deleteTribrequest(record.lieu);
      },
    });
  };
  const deleteTribrequest = async (lieu) => {
    try {
      const deleted = await axios.post(
        "http://localhost:5000/deleteTribunale",
        {
          lieu: lieu,
        }
      );

      if (deleted.data.error) {
        toast.error(deleted.data.error);
      } else {
        console.log("tribunale supprimé");
        toast.success("tribunale supprime avec succee");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //modifier un collaborateur

  const editTrib = (record) => {
    setIsEdit(true);
    setEdditingTrib({ ...record }); //copie mel record
  };
  const resetEditing = () => {
    setIsEdit(false);
    setEdditingTrib(null);
  };
  //ajouter un collaborateur
  const addTrib = async () => {
    try {
      const resp = await axios.post("http://localhost:5000/ajouterTribunale", addingTrib);
      if (resp.data.error) {
        toast.error(resp.data.error);
      } else {
        console.log(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //notre page et son contenu
  return (
    <div className="back">
      <header className="App-header">
        <button
          className="btnadd"
          onClick={() => {
            setIsAdd(true);
          }}
        >
          Ajouter une tribunale
        </button>

        <Table
          columns={column}
          dataSource={liste}
          //scroll={{ x:10}}
          pagination={{
            current: page,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
          size="large"
          bordered={true}
          style={{ display: "flex", flex: 1 }}
          scroll={{ x: "max-content" }}
        ></Table>

        <Modal
          title="modifier tribunale"
          visible={isEdit}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsEdit(false);
          }}
          onRequestClose={() => {
            setIsEdit(false);
          }}
          onOk={async () => {
            setIsEdit(false);

            const newListe = liste.map((trib) => {
              if (trib.lieu == edditingTrib.lieu) {
                return edditingTrib;
              } else {
                return trib;
              }
            });
            try {
              const resp = await axios.post(
                "http://localhost:5000/modifierTribunale",
                edditingTrib
              );
            } catch (error) {
              console.log(error);
            }

            setListe(newListe);

            resetEditing();

            toast.success("tribunale modifie avec succee");
          }}
        >
          <Input
            placeholder="changer le lieu"
            value={edditingTrib.lieu}
            onChange={(e) => {
              setEdditingTrib({
                ...edditingTrib,
                lieu: e.target.value,
              });
            }}
          ></Input>
        </Modal>
        <Modal
          title="ajouter une tribunale"
          visible={isAdd}
          okText="Enregistrer"
          cancelText="Annuler"
          onCancel={() => {
            setIsAdd(false);
          }}
          onOk={() => {
            addTrib();
            setIsAdd(false);
            toast.success("tribunale ajoutée avec succès");
          }}
        >
          <Input
            placeholder="lieu"
            value={addingTrib.lieu}
            onChange={(e) => {
              setAddingTrib({
                ...addingTrib,
                lieu: e.target.value,
              });
            }}
          ></Input>
        </Modal>
      </header>
    </div>
  );
};

export default Tribin_Admin;
