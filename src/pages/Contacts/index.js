import { useState, useCallback } from "react";
import { useContacts } from './useContacts';
import Container from '@material-ui/core/Container';//Подключение общего контейнера
import Grid from '@material-ui/core/Grid';//Подключение Grid-сетки
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from '@material-ui/core/styles';//Стилизация
import Typography from '@material-ui/core/Typography';//Стилизация заголовков
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContactsTable } from "./ContactsTable";//Таблица контактов
import { ToggleDataViewMode } from "./ToggleDataViewMode";
import { useDataViewMode } from "./useDataViewMode";
import { DATA_VIEW_MODES } from './constants';
import { ContactsFilters } from "./ContactsFilters";


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
			marginBottom: theme.spacing(3),// = 8px(default) * 3 = 24px
		},
	})
);

//Дефолтные значения фильтров
const FiltersDafaultValue = {
	fullname: "",
	gender: "all",
	nationality: "all"
};

const filterByFullname = ({ first, last }, fullname) => {
	return (
		first?.toLowerCase().includes(fullname.toLowerCase()) ||
		last?.toLowerCase().includes(fullname.toLowerCase())
	);
};

const filterByGender = (value, gender) => {
	if (gender === "all") {
		return true;
	}
	return value === gender;
};

const filterByNationality = (value, nationality) => {
	if (nationality === "all") {
		return true;
	}
	return value === nationality;
};

export const Contacts = () => {
	const classes = useStyles();//Инициализация стилей
	const contacts = useContacts();
	const [dataViewMode, setDataViewMode] = useDataViewMode();
	const [filters, setFilters] = useState(FiltersDafaultValue);

	const updateFilter = useCallback((name, value) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[name]: value,
		}));
	}, []);

	const clearFilters = useCallback(() => {
		setFilters(FiltersDafaultValue);
	}, []);

	//Отфильтрованные контакты
	const filteredContacts = contacts.data
		.filter((c) => filterByFullname(c.name, filters.fullname))
		.filter((c) => filterByGender(c.gender, filters.gender))
		.filter((c) => filterByNationality(c.nat, filters.nationality));

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
					<ContactsFilters
						filters={filters}
						updateFilter={updateFilter}
						clearFilters={clearFilters} />

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
