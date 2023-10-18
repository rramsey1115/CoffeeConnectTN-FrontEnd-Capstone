import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ShopsList } from './shops/ShopsList';

function App() {
  return (
    <Routes>
      <Route path="" element={<ShopsList />}/>
    </Routes>
  );
}

export default App;
