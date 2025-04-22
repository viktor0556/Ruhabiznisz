import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./AdminContext";
import Navbar from "./Navbar";
import About from "./About"
import Contact from "./Contact";
import Login from "./Login";
import AddProductForm from "./AddProductForm";
import VisitorView from "./VisitorView";
import ProductDetails from "./ProductDetails";
import HeroSection from "./HeroSection";

function App() {
  return (
    <AdminProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/visitor" element={<VisitorView />} />
          <Route path="/addProduct" element={<AddProductForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
}

export default App;
