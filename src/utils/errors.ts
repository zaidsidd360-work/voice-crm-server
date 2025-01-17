export class CustomError extends Error {
	statusCode!: number;

	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class BadRequestError extends CustomError {
	constructor(message: string) {
		super(message);
		this.statusCode = 400;
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message: string) {
		super(message);
		this.statusCode = 401;
	}
}
