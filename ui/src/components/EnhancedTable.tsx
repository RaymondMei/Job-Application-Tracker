import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import FormDialogModal from "./FormDialogModal";
import { Backdrop, CircularProgress } from "@mui/material";

type Data = {
	application_id: number;
	status: number;
	company_name: string;
	job_title: string;
	resume: string;
	salary: number;
	date_applied: string;
	deadline: string;
	related_information: string;
};

type Row = {
	application_id: number;
	status: string;
	user: {
		user_id: number;
		username: string;
		password: string;
		email: string;
		audit_fields: number;
	};
	folder: {
		folder_id: number;
		folder_name: string;
		audit_fields: number;
	};
	job: {
		job_id: number;
		company: {
			company_id: number;
			company_name: string;
			location: string;
			website: string;
			contact: string;
			audit_fields: number;
		};
		job_title: string;
		job_description: string;
		job_url: string;
		salary: string;
		job_notes: string;
		audit_fields: number;
	};
	resume: string;
	date_applied: string;
	deadline: string;
	related_information: string;
	audit_fields: number;
};

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Data>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<Row>(array: Row[], comparator: (a: Row, b: Row) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [Row, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

type HeadCell = {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
};
const headCells: readonly HeadCell[] = [
	{
		id: "status",
		numeric: false,
		disablePadding: true,
		label: "Status",
	},
	{
		id: "company_name",
		numeric: false,
		disablePadding: true,
		label: "Company",
	},
	{
		id: "job_title",
		numeric: false,
		disablePadding: true,
		label: "Job Title",
	},
	{
		id: "resume",
		numeric: false,
		disablePadding: true,
		label: "Resume",
	},
	{
		id: "salary",
		numeric: false,
		disablePadding: true,
		label: "Salary",
	},
	{
		id: "date_applied",
		numeric: false,
		disablePadding: true,
		label: "Date Applied",
	},
	{
		id: "deadline",
		numeric: false,
		disablePadding: true,
		label: "Deadline",
	},
	{
		id: "related_information",
		numeric: false,
		disablePadding: true,
		label: "Relevant Information",
	},
];

type EnhancedTableProps = {
	numSelected: number;
	onRequestSort: (property: keyof Data) => void;
	// onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
};

function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		// onSelectAllClick,
		order,
		orderBy,
		// numSelected,
		// rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property: keyof Data) => () => {
		onRequestSort(property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					{/* <Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/> */}
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							<Typography fontWeight="bold" gutterBottom>
								{headCell.label}
							</Typography>

							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

type EnhancedTableToolbarProps = {
	handleCreate: () => void;
};

function EnhancedTableToolbar({ handleCreate }: EnhancedTableToolbarProps) {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography
				sx={{ flex: "1 1 100%" }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Applications
			</Typography>
			{/* <Tooltip title="Filter list">
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip> */}

			<Tooltip title="Create">
				<IconButton onClick={handleCreate}>
					<AddIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
}

export type ApplicationData = {
	application_id: number;
	status: string;
	job_title: string;
	company_name: string;
	location: string;
	salary: number;
	post_url: string;
	date_applied: string;
	deadline: string;
	resume: string;
	related_information: string;
};

export default function EnhancedTable() {
	const [showActionId, setShowActionId] = useState(-1);
	const [deleting, setDeleting] = useState<boolean>(false);

	const [rows, setRows] = useState<Data[]>([]);

	const getDashboardData = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: "http://127.0.0.1:8000/dashboard/",
			});
			if (response.status == 200) {
				setRows(
					(response.data ?? []).map((app: Row) => {
						return {
							application_id: app.application_id,
							status: app.status,
							job_title: app.job.job_title,
							company_name: app.job.company.company_name,
							location: app.job.company.location,
							salary: app.job.salary,
							post_url: app.job.job_url,
							date_applied: app.date_applied,
							deadline: app.deadline,
							resume: app.resume,
							related_information: app.related_information,
						};
					})
				);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const [formDialogOpen, setFormDialogOpen] = useState<boolean>(false);

	useEffect(() => {
		getDashboardData();
	}, [formDialogOpen]);

	const handleFormDialogClose = () => {
		setFormDialogOpen(false);
		setSelected(-1);
	};

	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("application_id");
	const [selected, setSelected] = React.useState<number>(-1);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleRequestSort = (property: keyof Data) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (event.target.checked) {
	// 		const newSelected = rows.map((n) => n.id);
	// 		setSelected(newSelected);
	// 		return;
	// 	}
	// 	setSelected([]);
	// };

	const [initialFormData, setInitialFormData] =
		useState<null | ApplicationData>(null);
	const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);
	const getInitialFormData = async (application_id: number) => {
		if (deleting) {
			setDeleting(false);
			return;
		}
		setInitialDataLoaded(false);
		try {
			const response = await axios({
				method: "GET",
				url: `http://127.0.0.1:8000/applications/${application_id}`,
			});
			if (response.status == 200 && response.data) {
				setInitialDataLoaded(true);
				setInitialFormData({
					application_id: response.data.application_id,
					status: response.data.status,
					job_title: response.data.job.job_title,
					company_name: response.data.job.company.company_name,
					location: response.data.job.company.location,
					salary: response.data.job.salary,
					post_url: response.data.job.job_url,
					date_applied: response.data.date_applied,
					deadline: response.data.deadline,
					resume: response.data.resume,
					related_information: response.data.related_information,
				});
			} else {
				setInitialFormData({
					application_id: -1,
					status: "Not Applied",
					job_title: "",
					company_name: "",
					location: "",
					salary: 0,
					post_url: "",
					date_applied: "",
					deadline: "",
					resume: "",
					related_information: "",
				});
				setFormDialogOpen(false);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleCreate = () => {
		setInitialFormData({
			application_id: -1,
			status: "Not Applied",
			job_title: "",
			company_name: "",
			location: "",
			salary: "" as unknown as number,
			post_url: "",
			date_applied: "",
			deadline: "",
			resume: "",
			related_information: "",
		});
		setInitialDataLoaded(true);
		setFormDialogOpen(true);
		setSelected(-1);
	};

	const handleClick = (id: number) => {
		setSelected(id === selected ? -1 : id);
		getInitialFormData(id);
		setFormDialogOpen(true);
	};

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		event?.preventDefault();
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	// const isSelected = (id: number) => selected.indexOf(id) !== -1;
	const isSelected = (id: number) => id === selected;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows: Data[] = React.useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[rows, order, orderBy, page, rowsPerPage]
	);

	const renderFormDialog = () => {
		if (initialDataLoaded && initialFormData) {
			return (
				<FormDialogModal
					application_id={selected}
					initialFormData={initialFormData}
					formDialogOpen={formDialogOpen}
					handleDialogClose={handleFormDialogClose}
					handleDelete={handleDelete}
				/>
			);
		}
		return (
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={formDialogOpen}
				onClick={handleFormDialogClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	};

	const handleDelete = async (application_id: number) => {
		setDeleting(true);
		try {
			const response = await axios({
				method: "DELETE",
				url: `http://127.0.0.1:8000/applications/${application_id}`,
			});
			if (response.status == 204) {
				console.log("DELETED application_id:", application_id);
			}
		} catch (error) {
			console.error("Error deleting application:", error);
		}
		handleFormDialogClose();
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				{formDialogOpen && <>{renderFormDialog()}</>}

				<EnhancedTableToolbar handleCreate={handleCreate} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={dense ? "small" : "medium"}
					>
						<EnhancedTableHead
							// numSelected={selected.length}
							numSelected={1}
							order={order}
							orderBy={orderBy}
							// onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{visibleRows.map((row) => {
								const isItemSelected = isSelected(row.application_id);
								// const labelId = `enhanced-table-checkbox-${index}`;

								return (
									// <Tooltip title={row.application_id} key={row.application_id}>
									<TableRow
										hover
										onClick={() => handleClick(row.application_id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.application_id}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}
										onMouseEnter={() => {
											setShowActionId(row.application_id);
										}}
										onMouseLeave={() => setShowActionId(-1)}
									>
										{/* <TableCell padding="checkbox">
												<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": labelId,
												}}
											/>
											</TableCell> */}
										<TableCell></TableCell>
										<TableCell>{row.status}</TableCell>
										<TableCell>{row.company_name}</TableCell>
										<TableCell>{row.job_title}</TableCell>
										<TableCell>{row.resume}</TableCell>
										<TableCell>{row.salary}</TableCell>
										<TableCell>{row.date_applied}</TableCell>
										<TableCell>{row.deadline}</TableCell>
										<TableCell>{row.related_information}</TableCell>
										<TableCell sx={{ p: 0 }}>
											{row.application_id === showActionId && (
												<IconButton
													onClick={() => handleDelete(row.application_id)}
												>
													<DeleteIcon></DeleteIcon>
												</IconButton>
											)}
										</TableCell>
									</TableRow>
									// </Tooltip>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</Box>
	);
}
