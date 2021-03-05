import {Router, Request, Response, NextFunction} from 'express'

interface RequestWithBody extends Request {
	body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
	if (req.session?.loggedIn === true) {
		next()
		return
	}
	res.status(403)
	res.send('Not authorized')
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
	let logBtn
	if (req.session?.loggedIn === true) {
		// LOGGED IN
		logBtn = `
			<div>
				<h2>Leaving?</h2>
				<a href="http://localhost:3000/logout">Logout</a>
			</div>
	`
	} else {
		// NOT LOGGED IN
		logBtn = `
			<div>
				<h2>you need to login</h2>
				<a href="http://localhost:3000/login">Login</a>
			</div>
	`
	}
	res.send(`
		<div>
			<h1>Hi there</h1>
			${logBtn}
		</div>
	`);
})

// router.get('/login', (req: Request, res: Response) => {
// 	res.send(`
// 	<form method="POST">
// 	<div>
// 		<label for="email">Email</label>
// 		<input name="email" />
// 	</div>
// 	<div>
// 		<label for="password">Password</label>
// 		<input name="password" type="password" />
// 	</div>
// 	<button>Submit</button>
// 	</form>
// 	`)
// })
//
router.get('/logout', (req: Request, res: Response) => {
	if (req.session?.loggedIn === true) {
		req.session.loggedIn = undefined
	}
	res.redirect('/')
})

router.post('/login', (req:RequestWithBody, res: Response) => {
	const {email, password} = req.body  // extract the email and password from the request body
	if (email && password && email ==='phil@phil.com' && password === 'password') {
		// user successfully logged in
		// mark them as logged in
		req.session = { loggedIn: true }
		// redirect them to the route route
		res.redirect('/');
	} else {
		// did not provide valid email or password
		res.send('code: 422 You must provide valid email and password')
	}
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
	res.send('Welcome to the protected /protected route, you logged in user you')
})

export {router}
