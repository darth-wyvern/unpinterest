import React from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import withSuspense from "./common/withSuspense";

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const signin = React.lazy(() => import('./Auth/Login'))
const signup = React.lazy(() => import('./Auth/Register/Register3StepVerification'))

function App() {
  return (
    <Box className="App" pt={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={withSuspense(DefaultLayout)()} >
            <Route path="signin" element={withSuspense(signin)()} />
            <Route path="signup" element={withSuspense(signup)()} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
