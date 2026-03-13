import Home from "./components/Home";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from 'react-router';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App
