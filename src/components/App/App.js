import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      <SavedMovies />
      <Footer />
    </div>
  );
}

export default App;
