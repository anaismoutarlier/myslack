import { useContext } from 'react'
import { RaisedButton } from "../components";

import { FirebaseContext } from "../hooks/useFirebase";

export default function Chat() {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className="chat container">
      <div className="sider">
        <div>
          <img src={ user.photoURL } alt="" className="sider-avatar"/>
          <h2>{ user.displayName }</h2>
          <h3>{ user.email }</h3>
        </div>
        <RaisedButton onClick={ firebase.logout }>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          <div className="message">
            <img src="/image.jpg" alt="" className="avatar" />
            <div>
              <h6>Hello there welcome to my chat.</h6>
              <p>12h30</p>
            </div>
          </div>
        </div>
        <div className="input-container">
          <input />
          <RaisedButton>SEND</RaisedButton>
        </div>
      </div>
    </div>
  )
}
