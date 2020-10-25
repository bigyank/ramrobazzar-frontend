import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route path="/product/:id">
            <ProductScreen />
          </Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
