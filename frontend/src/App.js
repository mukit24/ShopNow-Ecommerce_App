import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
