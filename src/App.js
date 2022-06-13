import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import CreateDiary from "./Components/Diary/CreateDiary";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Private from "./Components/ReduxState/Private";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/creatediary"
          element={
            <Private>
              <CreateDiary />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
