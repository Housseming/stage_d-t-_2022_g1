import React from "react";



import { VscAccount, VscTypeHierarchySub } from "react-icons/vsc";
import axios from "axios";
const url = "http://localhost:5000/register";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.changeName = this.changeName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeMail = this.changeMail.bind(this);
    this.Send = this.Send.bind(this);
  }

  async Send() {
    try {
      const resp = await axios.post(url, {
        username: this.state.username,
        email: this.state.email,
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
  changeMail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <div className="base-container">
        <div className="header">Enregistrez-vous</div>
        <div className="content">

          <div className="image"></div>

          <VscAccount className="image"></VscAccount>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Nom de l'utilisateur</label>
            <input
              type="text"
              placeholder="nom de l'utilisateur"
              name="username"
              required
              value={this.state.username}
              onChange={this.changeName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              value={this.state.email}
              onChange={this.changeMail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="mot de passe"
              name="password"
              required
              value={this.state.password}
              onChange={this.changePassword}
            />
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.Send}>
            Enregistrez-vous
          </button>
        </div>
      </div>
    );
  }
}
