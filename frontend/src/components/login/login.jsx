import React from 'react';
import {VscAccount} from "react-icons/vsc";
export class Login extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
          <div className="base-container">
            <div className="header">Connexion</div>
            <div className="content">
              <VscAccount className="image"></VscAccount>
            </div>
            <div className="form">

              <div className="form-group">
                <label htmlFor="username">Nom de l'utilisateur</label>
                <input type="text" placeholder="nom de l'utilisateur" name='username' />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" placeholder='mot de passe' name='password' />
              </div>

            </div>

            <div className='footer'>
                <button type='button' className='btn'>se connecter</button>
            </div>
          </div>
        );
    }
}