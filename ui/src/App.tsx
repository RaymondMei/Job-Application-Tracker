// import { Container, Grid } from "@mui/material";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

	// useEffect(() => {
	// 	const getLoginStatus = async () => {
	// 		try {
	// 			const response = await axios({
	// 				method: "GET",
	// 				url: "http://127.0.0.1:8000/login/",
	// 			});
	// 			if (response.data === "success") {
	// 				setLoggedIn(true);
	// 			} else {
	// 				setLoggedIn(false);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 			setLoggedIn(false);
	// 		}
	// 	};
	// 	getLoginStatus();
	// }, []);

	return (
		<>
			<BrowserRouter>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<ResponsiveAppBar loggedIn={loggedIn} />
						<Button
							variant="outlined"
							onClick={() => setLoggedIn((prev: boolean) => !prev)}
						>
							{loggedIn.toString()}
						</Button>
					</Grid>
					<Grid item xs={12} sx={{ height: "calc(100vh - 68.5px)" }}>
						<Routes>
							<Route
								path="/login"
								element={
									loggedIn ? (
										<Dashboard />
									) : (
										<Login handleLoginStatus={setLoggedIn} />
									)
								}
							/>
							<Route
								path="/register"
								element={<Register handleLoginStatus={setLoggedIn} />}
							/>
							{/* <Route path="/dashboard" element={<Dashboard />} /> */}
							<Route
								path="/*"
								element={
									loggedIn ? (
										<Dashboard />
									) : (
										<Login handleLoginStatus={setLoggedIn} />
									)
								}
							/>
						</Routes>
					</Grid>
				</Grid>
			</BrowserRouter>
		</>
	);
};

export default App;
