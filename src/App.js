import React from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withSuspense from "./components/withSuspense";

const DefaultLayout = React.lazy(() => import('./layout/Home'));
const signin = React.lazy(() => import('./layout/AppLogin'))
const signup = React.lazy(() => import('./layout/AppRegister'))
const lightbox = React.lazy(() => import('./layout/AppLightBox'))

function App() {
  return (
    <Box className="App" pt={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={withSuspense(DefaultLayout)()} >
            <Route path="signin" element={withSuspense(signin)()} />
            <Route path="signup" element={withSuspense(signup)()} />
            <Route path="lightbox" element={withSuspense(lightbox)()} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
