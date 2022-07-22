import React, {useContext} from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer/marginfile";
import {AccountContext} from "./accountContext";

export function Signup( props ) {
      const {Switchtologin} = useContext(AccountContext);
  return (
    <BoxContainer>
      <FormContainer>
        <Marginer direction="vertical" margin={50} />
        <label>
          <strong>Nom Complet</strong>
        </label>
        <Input type="text" placeholder="Nom Compler" />
        <label>
          <strong>Nom d'utilisateur</strong>
        </label>
        <Input type="text" placeholder="Nom d'utilisateur" />
        <Marginer direction="vertical" margin={20} />
        <label>
          <strong>E-mail</strong>
        </label>
        <Input type="e-mail" placeholder="E-mail" />
        <Marginer direction="vertical" margin={10} />
        <label>
          <strong>Tapez votre Mot de Passe</strong>
        </label>
        <Input type="password" placeholder="Mot de Passe" />
        <Marginer direction="vertical" margin={10} />
        <label>
          <strong>Retapez votre Mot de Passe</strong>
        </label>
        <Input type="password" placeholder="Mot de Passe" />
      </FormContainer>
      <Marginer direction="vertical" margin="5em" />
      <SubmitButton type="button" onclick={Switchtologin}>
        Confirmer
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="/login#" onClick={Switchtologin}>
        Connectez-vous Si vous avez un compte !
      </MutedLink>
    </BoxContainer>
  );
}
