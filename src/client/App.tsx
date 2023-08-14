import React from 'react';
import ImageGeneratorPage from './pages/ImageGeneratorPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div>
      <Header></Header>
      <ImageGeneratorPage></ImageGeneratorPage>
      <Footer></Footer>
    </div>
  );
}

export default App;
