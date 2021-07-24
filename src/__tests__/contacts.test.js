import React from "react";
import {
	render,
	screen,
	waitForElementToBeRemoved
} from "@testing-library/react";
import { rest } from 'msw'; // src/mocks/handlers.js
import { Contacts } from "../pages/Contacts";
import { server } from "../serverTests.js";


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

