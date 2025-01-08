import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Providers } from "./providers/Providers";

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;