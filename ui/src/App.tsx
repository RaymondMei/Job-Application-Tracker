// import { Container, Grid } from "@mui/material";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
	return (
		<>
			{/* <Login /> */}
			<BrowserRouter>
				<ResponsiveAppBar />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="" element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
