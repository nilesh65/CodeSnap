import '../src/styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoPage from './pages/NoPage';
import Home from './pages/Home';

function App() {


  return (
    <>
      <BrowserRouter>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
