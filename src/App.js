import './styles.css';
import Home from './components/Home';
import MemesContainer from './containers/MemesContainer';
import MemesList from "./components/MemesList";
import MemeForm from "./components/MemeForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  

  return (
    <>
      <MemesContainer/>
    </>
  );
}

export default App;
