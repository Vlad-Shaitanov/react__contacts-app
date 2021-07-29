import React from "react";
import {
	render,
	screen,
	waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";//Библиотека для эмуляции событий на странице
import { rest } from 'msw'; // src/mocks/handlers.js
import { Contacts } from "../pages/Contacts";
import { server } from "../serverTests.js";
import { users } from "../__fixtures__/users";


// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe("loading get data", () => {
	test("loading", async () => {
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
	});

	test("success", async () => {
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);
		// screen.debug();
		expect(loader).not.toBeInTheDocument();
		//Проверяем наличие контейнера таблицы
		expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
	});

	test("fail", async () => {
		server.use(
			rest.get("https://randomuser.me/api/?results=1", (req, res, ctx) => {
				return res(
					ctx.status(500),
					ctx.json({
						error: "Internal server error",
					}),
				);
			}),
		);
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);
		// screen.debug();
		expect(loader).not.toBeInTheDocument();
		//Проверяем наличие контейнера таблицы
		expect(screen.getByTestId("contacts-error")).toBeInTheDocument();
	});
});

describe("contacts data view mode", () => {
	test("should equal table", async () => {
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);
		// screen.debug();
		//Проверяем наличие контейнера таблицы
		expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-table")).toHaveClass("Mui-selected");

		//Проверяем отсутствие контейнера грида
		expect(screen.queryByTestId("contacts-grid-container")).not.toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-grid")).not.toHaveClass("Mui-selected");
	});

	test("switch from grid to table", async () => {
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);

		const toggleGrid = screen.queryByTestId("toggle-data-viewmode-grid");
		const toggleTable = screen.queryByTestId("toggle-data-viewmode-table");
		//Эмуляция клика по элементу
		userEvent.click(toggleGrid);
		userEvent.click(toggleTable);
		// screen.debug();
		//Проверяем наличие контейнера грида
		expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-table")).toHaveClass("Mui-selected");

		//Проверяем отсутствие контейнера таблицы
		expect(screen.queryByTestId("contacts-grid-container")).not.toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-grid")).not.toHaveClass("Mui-selected");

		//Проверяем, соответствуем ли ключ в хранилище нужному значению
		expect(window.localStorage.getItem("dataViewMode")).toEqual("table");
	});

	test("should equal grid", async () => {
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);

		const toggleGrid = screen.queryByTestId("toggle-data-viewmode-grid");
		//Эмуляция клика по элементу
		userEvent.click(toggleGrid);
		// screen.debug();
		//Проверяем наличие контейнера грида
		expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-grid")).toHaveClass("Mui-selected");

		//Проверяем отсутствие контейнера таблицы
		expect(screen.queryByTestId("contacts-table-container")).not.toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-table")).not.toHaveClass("Mui-selected");

		//Проверяем, соответствуем ли ключ в хранилище нужному значению
		expect(window.localStorage.getItem("dataViewMode")).toEqual("grid");
	});

	test("should equal grid with reload page", async () => {
		window.localStorage.setItem("dataViewMode", "grid");
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);

		// screen.debug();
		//Проверяем наличие контейнера грида
		expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-grid")).toHaveClass("Mui-selected");

		//Проверяем отсутствие контейнера таблицы
		expect(screen.queryByTestId("contacts-table-container")).not.toBeInTheDocument();
		//Проверяем, подсвечена ли кнопка выбора вида
		expect(screen.getByTestId("toggle-data-viewmode-table")).not.toHaveClass("Mui-selected");

		//Очищаем хранилище
		window.localStorage.clear();
	});

});

describe("contacts filter", () => {
	test("by default", async () => {
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);

		expect(screen.queryAllByTestId("contacts-table-row")).toHaveLength(2);
	});

	test("by fullname", async () => {
		const inputFullnameValue = users[0].name.first;
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);

		userEvent.type(screen.getByTestId('field-fullname'), inputFullnameValue);

		expect(screen.queryAllByTestId("contacts-table-row")).toHaveLength(1);
		expect(screen.getByTestId("contacts-table-cell-fullname")).toHaveTextContent(inputFullnameValue);

	});

	test("should clear", async () => {
		const inputFullnameValue = users[0].name.first;
		//Рендер компонента
		render(<Contacts />);
		// screen.debug();

		//Проверяем наличие id в снимке
		const loader = screen.getByTestId("contacts-loader");

		await waitForElementToBeRemoved(loader);

		userEvent.type(screen.getByTestId('field-fullname'), inputFullnameValue);
		userEvent.click(
			screen.getByRole('button', {
				name: /clear/i
			})
		);

		expect(screen.queryAllByTestId("contacts-table-row")).toHaveLength(2);
		expect(screen.getByTestId('field-fullname')).toHaveValue("");
	})
});