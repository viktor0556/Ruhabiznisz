import AddProductForm from "./AddProductForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { AdminProvider } from "./AdminContext";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<AddProductForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
