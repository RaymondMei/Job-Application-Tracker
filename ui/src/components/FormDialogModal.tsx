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
import { useForm } from "react-hook-form";

type Props = {
	application_id: number;
	initialFormData: ApplicationData;
	formDialogOpen: boolean;
	handleDialogClose: (open: boolean) => void;
};

const FormDialogModal = ({
	application_id,
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

	const { register, control, handleSubmit } = useForm();

	const handleCreate = async (formValues: ApplicationData) => {
		try {
			const response = await axios({
				method: "POST",
				url: `http://127.0.0.1:8000/applications/`,
				data: formValues,
			});
			if (response.status == 201) {
				console.log("CREATED:", formValues);
			}
		} catch (error) {
			console.error("Error creating application:", error);
		}
		handleClose(false);
	};

	const handleEdit = async (formValues: ApplicationData) => {
		try {
			const response = await axios({
				method: "PATCH",
				url: `http://127.0.0.1:8000/applications/${application_id}`,
				data: formValues,
			});
			if (response.status == 200) {
				console.log("UPDATED:", formValues);
			}
		} catch (error) {
			console.error("Error updating application:", error);
		}
		handleClose(false);
	};
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
						<form
							action="/"
							method="POST"
							onSubmit={handleSubmit(
								application_id !== -1 ? handleEdit : handleCreate
							)}
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
										{...register("job_title")}
										label="Job Title"
										required
										defaultValue={initialFormData.job_title}
									/>
								</Grid>

								<Grid item xs={6}>
									<TextField
										margin="normal"
										fullWidth
										id="company_name"
										{...register("company_name")}
										label="Company"
										required
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
										{...register("location")}
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
										{...register("salary")}
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
										id="post_url"
										{...register("post_url")}
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
										{...register("date_applied")}
										label="Date Applied"
										defaultValue={initialFormData.date_applied}
									/>
								</Grid>

								<Grid item xs={6}>
									<TextField
										margin="normal"
										fullWidth
										id="deadline"
										{...register("deadline")}
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
										{...register("resume")}
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
										{...register("related_information")}
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
							<Grid
								container
								justifyContent="flex-end"
								sx={{ marginTop: 2 }}
								spacing={1}
							>
								<Grid item>
									<Button type="submit" variant="contained">
										{application_id !== -1 ? "Save" : "Add"}
									</Button>
								</Grid>
								<Grid item>
									<Button onClick={handleClose}>Cancel</Button>
								</Grid>
							</Grid>
						</form>
					</Grid>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default FormDialogModal;
