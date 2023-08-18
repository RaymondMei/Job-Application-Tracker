import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

type Props = {
	handleLoginStatus: (isSuccessful: boolean) => void;
};

const Login = ({ handleLoginStatus }: Props) => {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		try {
			const response = await axios({
				method: "POST",
				url: "http://127.0.0.1:8000/login/",
				data: data,
			});
			if (response.data === "success") {
				handleLoginStatus(true);
			} else {
				handleLoginStatus(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: -5, minHeight: "100%" }}
		>
			<Grid item>
				<ThemeProvider theme={defaultTheme}>
					<Container component="main" maxWidth="xs">
						<CssBaseline />
						<Box
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography component="h1" variant="h4">
								Login
							</Typography>
							<Box
								component="form"
								onSubmit={handleSubmit}
								// noValidate
								sx={{ mt: 1 }}
							>
								<TextField
									margin="normal"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									autoFocus
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Remember me"
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Login
								</Button>
							</Box>
						</Box>
					</Container>
				</ThemeProvider>
			</Grid>
		</Grid>
	);
};

export default Login;
