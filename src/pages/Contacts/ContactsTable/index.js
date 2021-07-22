import format from 'date-fns/format';//Библиотека для форматирования даты
import parseISO from 'date-fns/parseISO';//Парсинг строковых данных в дате
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboardText } from "../../../components/copyToClipboardText";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality.js";

const useStyles = makeStyles({
	table: {

	},
});

export const ContactsTable = ({ data }) => {
	const classes = useStyles();//Хук со стилями
	return (
		// <div>{data[0].name.first}</div>

		<TableContainer component={Paper}>
			<Table className={classes.table} size="small" aria-label="contacts table">
				<TableHead>
					<TableRow>
						<TableCell>Avatar</TableCell>
						<TableCell>Full name</TableCell>
						<TableCell>Birthday</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Location</TableCell>
						<TableCell>Nationality</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((contact) => (
						<TableRow key={contact.login.uuid}>
							<TableCell>
								<Avatar src={contact.picture.thumbnail} alt="" />
							</TableCell>
							<TableCell>{contact.name.title} {contact.name.first} {contact.name.last}</TableCell>
							<TableCell>
								<Typography>{format(parseISO(contact.dob.date), 'iiii, MM/dd/yyyy, hh:mm aaa')}</Typography>
								<Typography>{contact.dob.age} years</Typography>

							</TableCell>
							<TableCell><CopyToClipboardText text={contact.email} /></TableCell>
							<TableCell><CopyToClipboardText text={contact.phone} /></TableCell>
							<TableCell>
								<Typography>{contact.location.country}</Typography>
								<Typography>{contact.location.city}, {contact.location.street.name} {contact.location.street.number}</Typography>
							</TableCell>
							<TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};