import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import {ListPage} from "./pages/listPage/ListPage.tsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/list" element={<ListPage />} />
          </Routes>
      </BrowserRouter>
  )}

export default App
