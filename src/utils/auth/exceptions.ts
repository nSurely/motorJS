export class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "AuthError";
	}
}

export class APIKeyAuthError extends AuthError {
	constructor(message: string) {
		super(message);
		this.name = "APIKeyAuthError";
	}
}

export class JWTDriverAuthError extends AuthError {
	constructor(message: string) {
		super(message);
		this.name = "JWTDriverAuthError";
	}
}

export class JWTUserAuthError extends AuthError {
	constructor(message: string) {
		super(message);
		this.name = "JWTUserAuthError";
	}
}