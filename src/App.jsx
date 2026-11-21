
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Library from "./pages/Library";
import Compare from "./pages/Compare";
import Assistant from "./pages/Assistant";
import Graph from "./pages/Graph";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/library" element={<Library />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/graph" element={<Graph />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
