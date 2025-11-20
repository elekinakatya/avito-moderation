
import './App.css'
import {Card} from "./components/card/Card.tsx";
import { mockAds } from './mocks/data.ts';

function App() {


  return (
      <div>
      {mockAds.map(ad => (
            <Card key={ad.id} ad={ad} />
        ))}
      </div>
  )}

export default App
