import React from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withSuspense from "./common/withSuspense";

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const signin = React.lazy(() => import('./Auth/Login/LoginCheckToast'))
const signup = React.lazy(() => import('./Auth/Register/Register3StepVerification'))
const lightbox = React.lazy(() => import('./image-management/lightBox'))

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
