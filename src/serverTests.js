import { rest } from 'msw'; // src/mocks/handlers.js
import { setupServer } from 'msw/node';
import { users } from "./__fixtures__/users.js";
//Какой запрос(get, set, etc..., к какому сервису) тестируем
const handlers = [
	rest.get("https://randomuser.me/api/?results=1", (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				results: users,
			}),
		);
	}),
];

export const server = setupServer(...handlers);