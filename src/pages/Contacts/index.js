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

//Кастомные стили
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			marginTop: theme.spacing(4),// = 8px(default) * 4 = 32px
		},
		headContainer: {
			marginBottom: theme.spacing(3),// = 8px(default) * 3 = 24px
		},
	})
);


export const Contacts = () => {
	const classes = useStyles();//Инициализация стилей
	const contacts = useContacts();
	const [dataViewMode, setDataViewMode] = useDataViewMode();

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

							return <ContactsTable data={contacts.data} />
						}

						if (dataViewMode === DATA_VIEW_MODES.GRID) {
							return "grid";
						}

						return null;
					})()}

				</Grid>
			</Grid>
		</Container>
	);
}
