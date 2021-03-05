import {Router, Request, Response, NextFunction} from 'express'
import {get} from "./decorators/routes";
import {controller} from "./decorators/controller";


@controller('/auth')
class LoginController {

	@get('/login')
	getLogin(req: Request, res: Response) {
		res.send(`
			<form method="POST">
			<div>
				<label for="email">Email</label>
				<input name="email" />
			</div>
			<div>
				<label for="password">Password</label>
				<input name="password" type="password" />
			</div>
			<button>Submit</button>
			</form>
	`)
	}
}
