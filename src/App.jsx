import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import SalesPage from "./components/SalesPage";
import HomePage from "./components/HomePage";
import ResultsPage from "./components/ResultsPage";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ResultsPage />} />
          <Route path="/items/:id" element={<DetailsPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="*" element={<div>No Encontrado</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;