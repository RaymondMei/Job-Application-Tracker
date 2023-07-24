// import { Container, Grid } from "@mui/material";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Grid } from "@mui/material";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<ResponsiveAppBar />
					</Grid>
					<Grid item xs={12}>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="" element={<Dashboard />} />
						</Routes>
					</Grid>
				</Grid>
			</BrowserRouter>
		</>
	);
};

export default App;
