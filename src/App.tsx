import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <main className="main">
          <Content />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
