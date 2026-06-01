import Navbar from "./layout/navbar/Navbar";
import Sidebar from "./layout/sidebar/Sidebar";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <Main />
      </div>
    </>
  );
}

export default App;