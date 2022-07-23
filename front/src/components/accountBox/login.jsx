
import React, {useContext,useState} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import {Marginer} from "../marginer/marginfile";import { AccountBox } from ".";
import { AccountContext } from "./accountContext";
;

export function Login( props ) {
    const { Switchtosignup } = useContext( AccountContext );
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   

  return (
    <BoxContainer>
      <FormContainer>
        <Marginer direction="vertical" margin={50} />
        <label>
          <strong>Nom d'utilisateur</strong>
        </label>
        <Input
          type="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Marginer direction="vertical" margin={20} />
        <label>
          <strong>Mot de Passe</strong>
        </label>
        <Input type="password" placeholder="Mot de Passe" />
      </FormContainer>
      <Marginer direction="vertical" margin={7} />
      <MutedLink href="#">Mot de passe oublié ?</MutedLink>
      <Marginer direction="vertical" margin="5em" />
      <SubmitButton type="submit">Connexion</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="/login#">
        Vous n'avez pas de compte ?
        <BoldLink href="/login#" onClick={Switchtosignup}>
          Enregistrez-vous
        </BoldLink>{" "}
      </MutedLink>
    </BoxContainer>
  );
}