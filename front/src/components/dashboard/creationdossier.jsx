import React , {useState} from 'react'
import { Tabs,Radio } from 'antd';
import ClientDemandeur from '../components dossier/clientDemandeur';
const { TabPane } = Tabs;
export default function CreationDossier() {
  return (
    <div className="card-container">
      <Tabs type="card">
        <TabPane tab="Client & Demandeur" key="1">
         <ClientDemandeur/>
        </TabPane>
        <TabPane tab="Données Dossier" key="2">
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
          <p>Content of Tab Pane 2</p>
        </TabPane>
        <TabPane tab="Tâche(s)" key="3">
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </TabPane>
        <TabPane tab="Réglement" key="3">
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </TabPane>
        <TabPane tab="Collaborateur" key="3">
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </TabPane>
        <TabPane tab="Sous Dossier" key="3">
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
          <p>Content of Tab Pane 3</p>
        </TabPane>
      </Tabs>
    </div>
  );

}
