import { useContacts } from './useContacts';
import Container from '@material-ui/core/Container';//Подключение общего контейнера
import Grid from '@material-ui/core/Grid';//Подключение Grid-сетки
import { makeStyles, createStyles } from '@material-ui/core/styles';//Стилизация
import Typography from '@material-ui/core/Typography';//Стилизация заголовков
import { ContactsTable } from "./ContactsTable";//Таблица контактов


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
// const useStyles = makeStyles({
// 	root: {
// 		marginTop: "24px",
// 	},
// });

export const Contacts = () => {
	const classes = useStyles();//Инициализация стилей
	const contacts = useContacts();


	return (
		<Container className={classes.root}>
			<Grid container>
				<Grid item xs={12} className={classes.headContainer}>
					<Typography variant="h3" component="h1">
						Contacts
					</Typography>
				</Grid>
				<Grid item xs={12}>
					{(() => {
						/*Подход с использованием функции не очень хорош,
						но мы хотим сохранить условия*/
						if (contacts.isLoading) {
							return (
								<div>...Loading</div>
							);
						}

						if (contacts.isError) {
							return (
								<div>...Error</div>
							);
						}

						return <ContactsTable data={contacts.data} />
					})()}

				</Grid>
			</Grid>
		</Container>
	);
}
