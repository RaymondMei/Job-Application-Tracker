import { useTheme } from "@emotion/react";
import {
	Box,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	InputAdornment,
	ThemeProvider,
	Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ApplicationData } from "./EnhancedTable";

type Props = {
	application_id: number;
	initialFormData: ApplicationData;
	formDialogOpen: boolean;
	handleDialogClose: (open: boolean) => void;
};

const FormDialogModal = ({
	initialFormData,
	formDialogOpen: open,
	handleDialogClose: handleClose,
}: Props) => {
	// const defaultTheme = useTheme();
	// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	console.log("submitted");
	// };

	// const [data, setData] = useState<ApplicationData>({
	// 	application_id: -1,
	// 	status: "Not Applied",
	// 	job_title: "",
	// 	company_name: "",
	// 	location: "",
	// 	salary: 0,
	// 	post_url: "",
	// 	date_applied: "",
	// 	deadline: "",
	// 	resume: "",
	// 	related_information: "",
	// });
	// useState({
	// 	id: 1,
	// 	company_name: "ABC Tech Solutions",
	// 	job_title: "Software Engineer",
	// 	resume: "I am an experienced software engineer...",
	// 	date_applied: "7/15/2023",
	// 	salary: 85000,
	// 	location: "San Francisco, CA",
	// 	related_information: "Technical skills: Python, JavaScript, C++",
	// 	urls: "www.example.com/job1",
	// 	contacts: "john.doe@example.com",
	// });

	// const getInitialFormData = async () => {
	// 	try {
	// 		const response = await axios({
	// 			method: "GET",
	// 			url: `http://127.0.0.1:8000/applications/${application_id}`,
	// 		});
	// 		if (response.status == 200) {
	// 			if (response.data) {
	// 				setData({
	// 					application_id: response.data.application_id,
	// 					status: response.data.status,
	// 					job_title: response.data.job.job_title,
	// 					company_name: response.data.job.company.company_name,
	// 					location: response.data.job.company.location,
	// 					salary: response.data.job.salary,
	// 					post_url: response.data.job.job_url,
	// 					date_applied: response.data.date_applied,
	// 					deadline: response.data.deadline,
	// 					resume: response.data.resume,
	// 					related_information: response.data.related_information,
	// 				});
	// 			} else {
	// 				setData({
	// 					application_id: -1,
	// 					status: "Not Applied",
	// 					job_title: "",
	// 					company_name: "",
	// 					location: "",
	// 					salary: 0,
	// 					post_url: "",
	// 					date_applied: "",
	// 					deadline: "",
	// 					resume: "",
	// 					related_information: "",
	// 				});
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching data:", error);
	// 	}
	// };

	// useEffect(() => {
	// 	if (open && (application_id ?? -1) !== -1) {
	// 		getInitialFormData();
	// 	}
	// }, [open]);

	const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const updatedData = new FormData(event.currentTarget);
		// try {
		// 	const response = await axios({
		// 		method: "PUT",
		// 		url: `http://127.0.0.1:8000/applications/${application_id}`,
		// 		data: data,
		// 	});
		// 	if (response.status == 200) {
		// 		setData(response.data ?? null);
		// 	}
		// } catch (error) {
		// 	console.error("Error fetching data:", error);
		// }
		console.log(updatedData);
		handleClose(false);
	};
	console.log("init", initialFormData);
	return (
		<>
			<Dialog maxWidth="sm" open={open ?? false} onClose={handleClose}>
				{/* <DialogTitle>{data.job_title}</DialogTitle> */}
				<DialogContent>
					<Grid
						container
						spacing={0}
						direction="column"
						justifyContent="center"
						alignItems="center"
						sx={{
							minHeight: "100%",
							// backgroundColor: "orange",
						}}
					>
						{/* <Grid
							container
							sx={{
								marginTop: 8,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "orange",
							}}
						> */}
						{/* <ThemeProvider theme={defaultTheme}> */}
						{/* <Grid container xs={12} sx={{ backgroundColor: "gray" }}> */}
						{/* <CssBaseline /> */}
						{/* <Box>
							<Box
								component="form"
								// onSubmit={handleSave}
								// noValidate
								sx={{ mt: 1 }}
							> */}
						<Typography variant="h4" align="center" sx={{ marginTop: 3 }}>
							{initialFormData.job_title}
						</Typography>
						<Grid container direction="row" spacing={2} sx={{ marginTop: 1 }}>
							<Grid item xs={6}>
								<TextField
									margin="normal"
									fullWidth
									id="job_title"
									label="Job Title"
									defaultValue={initialFormData.job_title}
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									margin="normal"
									fullWidth
									id="company_name"
									label="Company"
									defaultValue={initialFormData.company_name}
								/>
							</Grid>
						</Grid>

						<Grid container direction="row" spacing={2}>
							<Grid item xs={8}>
								<TextField
									margin="normal"
									fullWidth
									id="location"
									label="Location"
									defaultValue={initialFormData.location}
								/>
							</Grid>

							<Grid item xs={4}>
								<TextField
									margin="normal"
									fullWidth
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">$</InputAdornment>
										),
									}}
									id="salary"
									label="Salary"
									defaultValue={initialFormData.salary}
								/>
							</Grid>
						</Grid>

						<Grid container direction="row">
							<Grid item xs={12}>
								<TextField
									margin="normal"
									fullWidth
									id="urls"
									label="Post URL"
									defaultValue={initialFormData.post_url}
								/>
							</Grid>
						</Grid>

						<Grid container direction="row" spacing={2}>
							<Grid item xs={6}>
								<TextField
									margin="normal"
									fullWidth
									id="date_applied"
									label="Date Applied"
									defaultValue={initialFormData.date_applied}
								/>
							</Grid>

							<Grid item xs={6}>
								<TextField
									margin="normal"
									fullWidth
									id="deadline"
									label="Deadline"
									defaultValue={initialFormData.deadline}
								/>
							</Grid>
						</Grid>

						<Grid container direction="row">
							<Grid item xs={12}>
								<TextField
									margin="normal"
									fullWidth
									id="resume"
									label="Resume"
									defaultValue={initialFormData.resume}
								/>
							</Grid>
						</Grid>

						<Grid container direction="row">
							<Grid item xs={12}>
								<TextField
									multiline
									rows={6}
									margin="normal"
									fullWidth
									id="related_information"
									label="Relevant Information"
									defaultValue={initialFormData.related_information}
								/>
							</Grid>
						</Grid>
						{/* </Box>
						</Box> */}
						{/* </Grid> */}
						{/* </ThemeProvider> */}
						{/* </Grid> */}
					</Grid>
				</DialogContent>
				<DialogActions sx={{ marginBottom: 1 }}>
					{/* <Button type="submit" variant="contained" onClick={handleSave}>
						Save
					</Button>
					<Button onClick={handleClose}>Cancel</Button> */}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default FormDialogModal;
