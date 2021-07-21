import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useCopyToClipboard } from "react-use";//Хук из библиотеки react-use
import PropTypes from "prop-types";
import Box from '@material-ui/core/Box';//Контейнер
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';//Иконка

//Стили компонента
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			/*Пусто, чтобы компонент можно было вставить в любое место
			и стили не мешали*/
			cursor: "pointer"
		},
		icon: {
			marginRight: theme.spacing(1),// = 8px(default) * 1 = 8px
		},
	})
);

export const CopyToClipboardText = ({ text }) => {
	const classes = useStyles();
	const [state, copyToClipboard] = useCopyToClipboard();

	return (
		<Box
			display="flex"
			alignItems="center"
			className={classes.root}
			onClick={() => copyToClipboard(text)}>
			<FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
			{text}
		</Box>
	);
};

CopyToClipboardText.propTypes = {
	text: PropTypes.string.isRequired,
};