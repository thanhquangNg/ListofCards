import React,{useState} from "react";

import Form from './components/Form'
import CardList from "./components/CardList";

function App() {
  const [showSave,setShowSave] = useState(false)
  return (
    <div className="App">
      <header>
        <h1>List of Cards</h1>

        <div className="form-container">
          <Form
          setShowSave={setShowSave} />
          <CardList
          showSave={showSave}/>

        </div>
      </header>
      
    </div>
  );
}

export default App;
