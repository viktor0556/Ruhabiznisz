import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./AdminContext";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import AddProductForm from "./AddProductForm";
import VisitorView from "./VisitorView";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visitor" element={<VisitorView />} />
          <Route path="/addProduct" element={<AddProductForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
