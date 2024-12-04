import axios from 'axios';

import { ROUTES } from '@/constants/routes';
import { getAuthToken } from './auth/workflow';
import { baseUrl, redirectKey } from './constants';

export const request = async (
	url: string,
	options: { data?: object; method?: string; headers?: object }
) => {
	let rawResponse;
	const authToken = getAuthToken();
	const requestContent = {
		...options,
		headers: {
			...options.headers,
			...(authToken && { Authorization: authToken }),
		},
	};
	try {
		rawResponse = await axios({ url, ...requestContent });
	} catch (e: any) {
		rawResponse = {
			message: e.response.data.error,
			status: e.response.status,
		};
		if (
			rawResponse?.status === 401 &&
			![ROUTES.AUTH].includes(window.location.pathname)
		) {
			localStorage.setItem(
				redirectKey,
				`${window.location.pathname}${window.location.search}`
			);
			window.location.assign(ROUTES.AUTH);
		}
		throw rawResponse;
	}
	return rawResponse?.data;
};

export const GET = async (
	endpoint: string,
	initialOptions?: { query?: string },
	method: string = 'get'
) => {
	const query = initialOptions?.query;
	const options = {
		method: method,
	};
	const url = `${baseUrl}/${endpoint}${query ? `?${query}` : ''}`;
	return await request(url, options);
};

export const POST = async (
	endpoint: string,
	initialOptions: { body?: object; query?: string } = {},
	method: string = 'post'
) => {
	const { body, query } = initialOptions;
	const options = {
		data: body,
		method: method,
	};
	const url = `${baseUrl}/${endpoint}${query ? `?${query}` : ''}`;
	return await request(url, options);
};

export const PUT = async (
	endpoint: string,
	initialOptions: { body?: object; query?: string } = {},
	method: string = 'put'
) => {
	return await POST(endpoint, initialOptions, method);
};

export const DELETE = async (
	endpoint: string,
  initialOptions: { body?: object; query?: string } = {},
  method:string = 'delete'
) => {
	return await POST(endpoint, initialOptions, method);
};
