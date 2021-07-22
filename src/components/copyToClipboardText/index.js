import { useState, useCallback } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useCopyToClipboard } from "react-use";//Хук из библиотеки react-use
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';//Контейнер
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';//Иконка
import Tooltip from '@material-ui/core/Tooltip';


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

const STATUS_COPY = {
	COPY: "copy",
	COPIED: "copied",
};

const TITLE_BY_STATUS = {
	[STATUS_COPY.COPY]: "Copy",
	[STATUS_COPY.COPIED]: "Copied",
};

export const CopyToClipboardText = ({ text }) => {
	const classes = useStyles();
	const [, copyToClipboard] = useCopyToClipboard();
	const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

	//Переключение статусов в тултипе
	// const getTooltipTitle = () => {
	// 	switch (statusCopy) {
	// 		case STATUS_COPY.COPY:
	// 			return "Copy";
	// 		case STATUS_COPY.COPIED:
	// 			return "Copied";
	// 		default:
	// 			return "";
	// 	}
	// };

	//Меняем состояние по клику
	const onClickCopy = useCallback(() => {

		copyToClipboard(text);
		setStatusCopy(STATUS_COPY.COPIED);
	}, [copyToClipboard, text]);

	//Меняем состояние при выходе курсора из элемента
	const onMouseLeaveCopy = useCallback(() => {

		setStatusCopy(STATUS_COPY.COPY);
	}, [setStatusCopy]);

	return (

		<Tooltip title={TITLE_BY_STATUS[statusCopy]} placement="top" arrow>
			<Button
				display="flex"
				alignitems="center"
				className={classes.root}
				onClick={onClickCopy}
				onMouseLeave={onMouseLeaveCopy}>
				<FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
				{text}
			</Button>
		</Tooltip>

	);
};

CopyToClipboardText.propTypes = {
	text: PropTypes.string.isRequired,
};