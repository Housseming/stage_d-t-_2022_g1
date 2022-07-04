import React from "react";

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container">
        <div className="header">Enregistrez-vous</div>
        <div className="content">
          <div className="image"></div>
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Nom de l'utilisateur</label>
            <input
              type="text"
              placeholder="nom de l'utilisateur"
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Email</label>
            <input type="email" placeholder="email" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" placeholder="mot de passe" name="password" />
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Enregistrez-vous
          </button>
        </div>
      </div>
    );
  }
}
