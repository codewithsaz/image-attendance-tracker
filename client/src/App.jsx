import "./App.css";

import { RouterProvider } from "react-router-dom";
import mainrouter from "./routes/MainRoutes";

function App() {
  return (
    <>
      <main className="w-full min-h-svh ">
        <RouterProvider router={mainrouter} />
      </main>
    </>
  );
}

export default App;
