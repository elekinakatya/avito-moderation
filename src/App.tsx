import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import {ListPage} from "./pages/listPage/ListPage.tsx";
import {ItemPage} from "./pages/ItemPage/ItemPage.tsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/item/:id" element={<ItemPage />} />
          </Routes>
      </BrowserRouter>
  )}

export default App
