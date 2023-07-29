import { Grid, Typography, cardClasses, useTheme } from "@mui/material";
import EnhancedTable from "../components/EnhancedTable";
import { useEffect, useState } from "react";

const Dashboard = () => {
	const theme = useTheme();

	// const [notes, setNotes] = useState<string>();
	// useEffect(() => {
	// 	fetch("http://127.0.0.1:8000/get_routes/")
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setNotes(JSON.stringify(data));
	// 			console.log(notes);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, []);

	return (
		<Grid container spacing={0} alignItems="center" justifyContent="center">
			<Grid item xs={10}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{ marginTop: theme.spacing(3) }}
				>
					Dashboard
				</Typography>
				<EnhancedTable />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
