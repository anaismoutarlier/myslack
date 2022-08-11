import { useContext } from 'react'
import { RaisedButton } from "../components";

import { FirebaseContext } from "../hooks/useFirebase";

export default function Login() {
  const { firebase } = useContext(FirebaseContext);
  return (
    <div className="login container">
      <RaisedButton onClick={ () => firebase.login("google") }>GOOGLE LOGIN</RaisedButton>
      <RaisedButton onClick={ () => firebase.login("facebook") }>FACEBOOK LOGIN</RaisedButton>

    </div>
  )
}
