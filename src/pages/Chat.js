import { useContext, useState, useEffect } from "react";
import { RaisedButton } from "../components";

import { FirebaseContext } from "../hooks/useFirebase";

export default function Chat() {
  const { user, firebase } = useContext(FirebaseContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleSnapshot = snapshot => {
      const messages = snapshot.docs.map(doc => doc.data());
      console.log(messages);
      console.log(new Date(messages[0].nanoseconds));
      setMessages(messages);
    };

    const unsubscribe = firebase.getMessages(handleSnapshot);

    return () => unsubscribe();
  }, [firebase]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!text.length) return;

    firebase.addMessage({
      content: text,
      createdAt: new Date(),
      user: {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
      },
    });

    setText("");
  };

  return (
    <div className="chat container">
      <div className="sider">
        <div>
          <img src={user.photoURL} alt="" className="sider-avatar" />
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
        </div>
        <RaisedButton onClick={firebase.logout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          {messages.map(message => (
            <div className="message">
              <img src={ message.user.photoURL } alt="" className="avatar" />
              <div>
                <h6>{message.content}</h6>
                <p>
                  {message.createdAt.toDate().getHours()}h
                  {message.createdAt.toDate().getMinutes()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form className="input-container" onSubmit={handleSubmit}>
          <input value={text} onChange={e => setText(e.target.value)} />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
