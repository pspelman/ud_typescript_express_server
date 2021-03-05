import 'reflect-metadata'

import express from 'express'

export const router = express.Router()

// Note: remember that the controller is supposed to be looking at functions
export function controller(routePrefix: string) {
	return function (target: Function) {
		for (let key in target.prototype) {
			const routeHandler = target.prototype[key]
			// check to see if there is metadata available (want the path property)
			// Note ONLY TRY to associate with router if we have found the path property
			const path = Reflect.getMetadata('path', target.prototype, key)
			if (path) {
				router.get(`${routePrefix}${path}`, routeHandler)
			}
		}
	}
}
