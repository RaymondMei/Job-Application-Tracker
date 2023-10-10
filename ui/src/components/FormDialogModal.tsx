import { Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { ApplicationData } from "./EnhancedTable";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
	application_id: number;
	initialFormData: ApplicationData;
	formDialogOpen: boolean;
	handleDialogClose: (open: boolean) => void;
	handleDelete: (application_id: number) => void;
};

const FormDialogModal = ({
	application_id,
	initialFormData,
	formDialogOpen: open,
	handleDialogClose: handleClose,
	handleDelete,
}: Props) => {
	const { register, handleSubmit } = useForm();

	const handleCreate = async (formValues: FieldValues) => {
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

	const handleEdit = async (formValues: FieldValues) => {
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

							<Grid
								container
								direction="row"
								sx={{ paddingTop: 1, paddingBottom: 2 }}
							>
								<Grid item xs={12}>
									<Button variant="contained" component="label" fullWidth>
										Upload Resume
										<input type="file" hidden />
									</Button>
								</Grid>
							</Grid>

							<IconButton
								onClick={() => handleDelete(application_id)}
								sx={{ position: "absolute", bottom: 15, left: 15 }}
							>
								<DeleteIcon sx={{ fontSize: 30 }}></DeleteIcon>
							</IconButton>
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
									<Button onClick={() => handleClose(false)}>Cancel</Button>
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
