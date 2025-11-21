import "./App.css";
import Home from "./pages/Home";
import { Provider } from "jotai";

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
