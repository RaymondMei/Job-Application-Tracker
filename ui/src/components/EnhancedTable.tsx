import * as React from "react";
import { alpha } from "@mui/material/styles";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useEffect, useState } from "react";

type Data = {
	id: number;
	company_name: string;
	job_title: string;
	resume: string;
	date_applied: string;
	salary: number;
	location: string;
	related_information: string;
	urls: string;
	contacts: string;
	// calories: number;
	// carbs: number;
	// fat: number;
	// name: string;
	// protein: number;
};

// function createData(
// 	id: number,
// 	company_name: string,
// 	job_title: string,
// 	resume: string,
// 	date_applied: string,
// 	salary: number,
// 	location: string,
// 	related_information: string,
// 	urls: string,
// 	contacts: string
// 	// name: string,
// 	// calories: number,
// 	// fat: number,
// 	// carbs: number,
// 	// protein: number
// ): Data {
// 	return {
// 		id,
// 		company_name,
// 		job_title,
// 		resume,
// 		date_applied,
// 		salary,
// 		location,
// 		related_information,
// 		urls,
// 		contacts,
// 		// name,
// 		// calories,
// 		// fat,
// 		// carbs,
// 		// protein,
// 	};
// }

// const rows: object[] = [
// createData(
// 	1,
// 	"ABC Tech Solutions",
// 	"Software Engineer",
// 	"I am an experienced software engineer...",
// 	new Date(2023, 7, 15).toString(),
// 	85000,
// 	"San Francisco, CA",
// 	"Technical skills: Python, JavaScript, C++",
// 	"www.example.com/job1",
// 	"john.doe@example.com"
// ),
// createData(
// 	2,
// 	"XYZ Software Development",
// 	"Full Stack Developer",
// 	"I have a strong background in web development...",
// 	new Date(2023, 7, 16).toString(),
// 	80000,
// 	"Seattle, WA",
// 	"Proficient in HTML, CSS, React, Node.js",
// 	"www.example.com/job2",
// 	"jane.smith@example.com"
// ),
// createData(
// 	3,
// 	"DEF Innovations",
// 	"Backend Developer",
// 	"I specialize in building scalable APIs...",
// 	new Date(2023, 7, 17).toString(),
// 	90000,
// 	"Austin, TX",
// 	"Experienced with Django, Flask, PostgreSQL",
// 	"www.example.com/job3",
// 	"michael.johnson@example.com"
// ),
// createData(
// 	4,
// 	"GHI Tech Co.",
// 	"Mobile App Developer",
// 	"I have developed several iOS and Android apps...",
// 	new Date(2023, 7, 18).toString(),
// 	95000,
// 	"Los Angeles, CA",
// 	"Proficient in Swift, Kotlin, and React Native",
// 	"www.example.com/job4",
// 	"susan.williams@example.com"
// ),
// createData(
// 	5,
// 	"PQR Solutions",
// 	"Frontend Developer",
// 	"I have a passion for creating user-friendly interfaces...",
// 	new Date(2023, 7, 19).toString(),
// 	80000,
// 	"New York, NY",
// 	"Skilled in JavaScript, Vue.js, and UI/UX design",
// 	"www.example.com/job5",
// 	"robert.anderson@example.com"
// ),
// createData(
// 	6,
// 	"MNO Software Systems",
// 	"Machine Learning Engineer",
// 	"I specialize in developing ML algorithms...",
// 	new Date(2023, 7, 20).toString(),
// 	100000,
// 	"Chicago, IL",
// 	"Experience with TensorFlow, PyTorch, and scikit-learn",
// 	"www.example.com/job6",
// 	"emily.jackson@example.com"
// ),
// createData(
// 	7,
// 	"JKL Tech Solutions",
// 	"DevOps Engineer",
// 	"I have a strong background in automating CI/CD pipelines...",
// 	new Date(2023, 7, 21).toString(),
// 	90000,
// 	"Denver, CO",
// 	"Skilled in Jenkins, Docker, and Kubernetes",
// 	"www.example.com/job7",
// 	"william.adams@example.com"
// ),
// createData(
// 	8,
// 	"UVW Innovations",
// 	"Software Architect",
// 	"I have designed and implemented complex software systems...",
// 	new Date(2023, 7, 22).toString(),
// 	110000,
// 	"San Diego, CA",
// 	"Extensive experience in system design and patterns",
// 	"www.example.com/job8",
// 	"olivia.martin@example.com"
// ),
// createData(
// 	9,
// 	"RST Software Corp.",
// 	"Embedded Systems Engineer",
// 	"I have developed firmware for various embedded devices...",
// 	new Date(2023, 7, 23).toString(),
// 	85000,
// 	"Portland, OR",
// 	"Proficient in C/C++, RTOS, and microcontrollers",
// 	"www.example.com/job9",
// 	"david.green@example.com"
// ),
// createData(
// 	10,
// 	"LMN Tech Services",
// 	"Data Scientist",
// 	"I am experienced in analyzing and interpreting large datasets...",
// 	new Date(2023, 7, 24).toString(),
// 	95000,
// 	"Houston, TX",
// 	"Skilled in Python, R, and data visualization",
// 	"www.example.com/job10",
// 	"sophia.morris@example.com"
// ),
// createData(
// 	11,
// 	"Duplicate LMN Tech Services",
// 	"Data Scientist",
// 	"I am experienced in analyzing and interpreting large datasets...",
// 	new Date(2023, 7, 24).toString(),
// 	95000,
// 	"Houston, TX",
// 	"Skilled in Python, R, and data visualization",
// 	"www.example.com/job10",
// 	"sophia.morris@example.com"
// ),
// createData("Cupcake", 305, 3.7, 67, 4.3),
// createData("Donut", 452, 25.0, 51, 4.9),
// createData("Eclair", 262, 16.0, 24, 6.0),
// createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
// createData("Gingerbread", 356, 16.0, 49, 3.9),
// createData("Honeycomb", 408, 3.2, 87, 6.5),
// createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
// createData("Jelly Bean", 375, 0.0, 94, 0.0),
// createData("KitKat", 518, 26.0, 65, 7.0),
// createData("Lollipop", 392, 0.2, 98, 0.0),
// createData("Marshmallow", 318, 0, 81, 2.0),
// createData("Nougat", 360, 19.0, 9, 37.0),
// createData("Oreo", 437, 18.0, 63, 4.0),
// ];

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

function getComparator<Key extends keyof any>(
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
function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
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
		id: "id",
		numeric: false,
		disablePadding: true,
		label: "Id",
	},
	{
		id: "company_name",
		numeric: false,
		disablePadding: true,
		label: "Company Name",
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
		id: "date_applied",
		numeric: false,
		disablePadding: true,
		label: "Date Applied",
	},
	{
		id: "salary",
		numeric: false,
		disablePadding: true,
		label: "Salary",
	},
	{
		id: "location",
		numeric: false,
		disablePadding: true,
		label: "Related Information",
	},
	{
		id: "urls",
		numeric: false,
		disablePadding: true,
		label: "URLs",
	},
	{
		id: "contacts",
		numeric: false,
		disablePadding: true,
		label: "Contacts",
	},
];

type EnhancedTableProps = {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
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
							<Typography fontWeight="bold">{headCell.label}</Typography>

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

function EnhancedTableToolbar() {
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

			<Tooltip title="Filter list">
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
}

export default function EnhancedTable() {
	const [rows, setRows] = useState([]);

	const getDashboardData = async () => {
		try {
			const response = await axios({
				method: "GET",
				url: "http://127.0.0.1:8000/dashboard/",
			});
			if (response.status == 200) {
				// console.log(response.data);
				setRows(response.data ?? []);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		getDashboardData();
	}, []);

	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
	const [selected, setSelected] = React.useState<number>(-1);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
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

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		// const selectedIndex = selected.indexOf(name);
		// let newSelected: readonly number[] = [];

		// newSelected = [id];
		// if (selectedIndex === -1) {
		// 	newSelected = newSelected.concat(selected, name);
		// } else if (selectedIndex === 0) {
		// 	newSelected = newSelected.concat(selected.slice(1));
		// } else if (selectedIndex === selected.length - 1) {
		// 	newSelected = newSelected.concat(selected.slice(0, -1));
		// } else if (selectedIndex > 0) {
		// 	newSelected = newSelected.concat(
		// 		selected.slice(0, selectedIndex),
		// 		selected.slice(selectedIndex + 1)
		// 	);
		// }
		setSelected(id == selected ? -1 : id);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
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
	const isSelected = (id: number) => id == selected;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[rows, order, orderBy, page, rowsPerPage]
	);

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar />
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
							{visibleRows.map((row, index) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: "pointer" }}
									>
										<TableCell padding="checkbox">
											{/* <Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": labelId,
												}}
											/> */}
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											{row.id}
										</TableCell>
										<TableCell align="right">{row.company_name}</TableCell>
										<TableCell align="right">{row.job_title}</TableCell>
										<TableCell align="right">{row.resume}</TableCell>
										<TableCell align="right">{row.date_applied}</TableCell>
										<TableCell align="right">{row.salary}</TableCell>
										<TableCell align="right">
											{row.related_information}
										</TableCell>
										<TableCell align="right">{row.urls}</TableCell>
										<TableCell align="right">{row.contacts}</TableCell>
									</TableRow>
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
