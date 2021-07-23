import { useState, useEffect } from "react";

//Кастомный хук
export const useContacts = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);//Состояние загрузки
	const [isError, setIsError] = useState(false);//Состояние ошибки


	//Получаем контакты
	useEffect(() => {
		const getContacts = async () => {

			try {
				setIsLoading(true);

				const response = await fetch("https://randomuser.me/api/?results=15");
				const { results, error } = await response.json();

				//Ловим возможную ошибку
				if (error) {
					throw new Error(error);
				}
				setData(results);
				setIsError(false);
				// console.log(results);

			} catch (e) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};
		getContacts();
	}, []);

	//Возврящаем состояние
	return {
		data,
		isLoading,
		isError,
	};
};