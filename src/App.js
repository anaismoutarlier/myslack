import "sanitize.css";
import useFirebase from "./hooks/useFirebase";

import Chat from "./pages/Chat";
import Login from "./pages/Login";

import { FirebaseContext } from "./hooks/useFirebase";
function App() {
  const { user, firebase } = useFirebase();

  return (
    <FirebaseContext.Provider value={ { user, firebase } }>
      {!user ? <Login /> : <Chat />}
    </FirebaseContext.Provider>
  );
}

export default App;
