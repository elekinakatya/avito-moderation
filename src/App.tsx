import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import {ListPage} from "./pages/listPage/ListPage.tsx";
import {ItemPage} from "./pages/itemPage/ItemPage.tsx";
import {StatsPage} from "./pages/statsPage/StatsPage.tsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/item/:id" element={<ItemPage />} />
              <Route path="/stats" element={<StatsPage />} />
          </Routes>
      </BrowserRouter>
  )}

export default App
