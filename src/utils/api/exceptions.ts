export class APIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APIError";
    }
}

export class APIAuthError extends APIError {
    constructor(message: string) {
        super(message);
        this.name = "APIAuthError";
    }
}