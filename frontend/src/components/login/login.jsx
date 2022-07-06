import React from "react";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";

const url = "http://localhost:5000/login";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.changeName = this.changeName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.Send = this.Send.bind(this);
  }

  async Send() {
    try {
      const resp = await axios.post(url, {
        username: this.state.username,
        password: this.state.password,
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  changeName(event) {
    this.setState({ username: event.target.value });
  }
  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="base-container">
        <div className="header">Connexion</div>
        <div className="content">
          <VscAccount className="image"></VscAccount>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Nom de l'utilisateur</label>
            <input
              type="text"
              placeholder="nom de l'utilisateur"
              name="username"
              value={this.state.username}
              onChange={this.changeName}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="mot de passe"
              name="password"
              value={this.state.password}
              onChange={this.changePassword}
              required
            />
          </div>
        </div>

        <div className="footer">
          <button type="button" className="btn" onClick={this.Send}>
            se connecter
          </button>
        </div>
      </div>
    );
  }
}
