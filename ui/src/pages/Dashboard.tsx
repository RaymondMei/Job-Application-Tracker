import { Grid, Typography, useTheme } from "@mui/material";
import EnhancedTable from "../components/EnhancedTable";

const Dashboard = () => {
	const theme = useTheme();

	return (
		<Grid container spacing={0} alignItems="center" justifyContent="center">
			<Grid item xs={10}>
				<Typography
					variant="h4"
					gutterBottom
					sx={{ marginTop: theme.spacing(3) }}
				>
					{/* Dashboard */}
					Spring 2023
				</Typography>
				<EnhancedTable />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
