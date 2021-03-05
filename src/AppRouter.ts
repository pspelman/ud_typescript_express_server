import express from 'express'

export class AppRouter {
	private static instance: express.Router

	static getInstance(): express.Router {
		// if we have an instance, we return it right away
		if (!AppRouter.instance) {
			AppRouter.instance = express.Router()
		}
		// if we do NOT have an instance, we will create one
		return AppRouter.instance
	}
}
