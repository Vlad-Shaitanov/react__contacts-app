import { useState } from "react";
import { useContacts } from './useContacts';
import Container from '@material-ui/core/Container';//Подключение общего контейнера
import Grid from '@material-ui/core/Grid';//Подключение Grid-сетки
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from '@material-ui/core/styles';//Стилизация
import Typography from '@material-ui/core/Typography';//Стилизация заголовков
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { ContactsTable } from "./ContactsTable";//Таблица контактов
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { useDataViewMode } from "./useDataViewMode";
import { DATA_VIEW_MODES } from './constants';

//Кастомные стили
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(4),// = 8px(default) * 4 = 32px
		},
		headContainer: {
			marginBottom: theme.spacing(3),// = 8px(default) * 3 = 24px
		},
		filtersContainer: {

		},
	})
);

//Дефолтные значения фильтров
const FiltersDafaultValue = {
	fullname: ""
};

const filterByFullname = ({ first, last }, fullname) => {
	return (
		first?.toLowerCase().includes(fullname.toLowerCase()) ||
		last?.toLowerCase().includes(fullname.toLowerCase())
	);
};

export const Contacts = () => {
	const classes = useStyles();//Инициализация стилей
	const contacts = useContacts();
	const [dataViewMode, setDataViewMode] = useDataViewMode();
	const [filters, setFilters] = useState(FiltersDafaultValue);

	const handleChangeFilter = (event) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[event.target.name]: event.target.value,
		}));
	};

	//Отфильтрованные контакты
	const filteredContacts = contacts.data.filter(
		(c) => filterByFullname(c.name, filters.fullname)

	);
	console.log(filteredContacts);

	return (
		<Container className={classes.root}>
			<Grid container>
				<Grid item xs={12} className={classes.headContainer}>
					<Box display="flex" justifyContent="space-between">
						<Typography variant="h4" component="h1">
							Contacts
						</Typography>
						<ToggleDataViewMode
							dataViewMode={dataViewMode}
							setDataViewMode={setDataViewMode} />

					</Box>
				</Grid>
				<Grid item xs={12} className={classes.filtersContainer}>
					<Box display="flex">
						<TextField
							name="fullname"
							label="Fullname"
							variant="outlined"
							size="small"
							value={filters.fullname}
							onChange={handleChangeFilter} />
					</Box>
				</Grid>
				<Grid item xs={12}>
					{(() => {
						/*Подход с использованием функции не очень хорош,
						но мы хотим сохранить условия*/
						if (contacts.isLoading) {
							return (
								<CircularProgress data-testid="contacts-loader" />
							);
						}

						if (contacts.isError) {
							return (
								<div data-testid="contacts-error">...Error</div>
							);
						}

						if (dataViewMode === DATA_VIEW_MODES.TABLE) {

							return <ContactsTable data={filteredContacts} />
						}

						if (dataViewMode === DATA_VIEW_MODES.GRID) {
							return (
								<div data-testid="contacts-grid-container">GRID</div>
							);
						}

						return null;
					})()}

				</Grid>
			</Grid>
		</Container>
	);
}
