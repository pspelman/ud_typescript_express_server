import 'reflect-metadata'

// Note: this would cause us to have a lot of redundant code:
// export function get(path: string) {
// 	return function (target: any, key: string, desc: PropertyDescriptor) {  // note: this function is going to figure out WHICH route should be called, based on what comes into it
// 		Reflect.defineMetadata('path', path, target, key)
// 	}
// }

// Note: create a function to create our decorators
function routeBinder(method: string) {
	return function (path: string) {
		return function (target: any, key: string, desc: PropertyDescriptor) {  // note: this function is going to figure out WHICH route should be called, based on what comes into it
			Reflect.defineMetadata('path', path, target, key)
			Reflect.defineMetadata('method', method, target, key)  // add the METHOD piece of metadata
		}
	}
}

export const get = routeBinder('get')
export const post = routeBinder('post')
export const put = routeBinder('put')
export const patch = routeBinder('patch')
export const del = routeBinder('del')
