import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";

import { BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import List from './pages/List'

function App() {
  return (
    <div>

      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/Plano" element={<List/>} />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
