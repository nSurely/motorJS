import StorageManager from "../../utils/storage";
import { APIHandlerAuth, APIHandlerNoAuth } from "../../utils/api";

export class TripManager {
	api: APIHandlerAuth;
	sourceId: string;
	orgId: string;
	batchWindow: number;
	lastBatchTime: Date;
	gps: Object[];
	accelerometer: Object[];
	gyroscope: Object[];
	alerts: Object[];

	constructor({ api, sourceId, orgId, batchWindow }: { api: APIHandlerAuth; sourceId: string; orgId: string; batchWindow: number }) {
		this.batchWindow = batchWindow;
		if (this.batchWindow < 0) {
			throw new Error("batchWindow must be greater than 0");
		}

		if (this.batchWindow > 60) {
			throw new Error("batchWindow must be less than 60");
		}
		this.api = api;
		this.sourceId = sourceId;
		this.orgId = orgId;

		this.lastBatchTime = new Date();

		this.gps = [];
		this.accelerometer = [];
		this.gyroscope = [];
		this.alerts = [];
	}

	clear() {
		this.gps = [];
		this.accelerometer = [];
		this.gyroscope = [];
		this.alerts = [];
	}

	async sendCheck() {
		if (!this.gps.length && !this.accelerometer.length && !this.gyroscope.length && !this.alerts.length) {
			return;
		}

		if (this.batchWindow != 0.0) {
			if (new Date().getTime() - this.lastBatchTime.getTime() < this.batchWindow) {
				return;
			}
		}

		let body = {
			sourceId: this.sourceId,
			orgId: this.orgId,
			gps: this.gps,
			acc: this.accelerometer,
			gyro: this.gyroscope,
			alerts: this.alerts,
		};

		await this.api.telematicsRequest({
			method: "POST",
			endpoint: "/track",
			data: body,
		});

		this.clear();
	}

	async addGPS({
		lat,
		lng,
		gpsAccuracy,
		altitude,
		acceleration,
		speed,
		bearing,
		bearingAccuracy,
		verticalAcceleration,
		timestamp,
	}: {
		lat: number;
		lng: number;
		gpsAccuracy: number;
		altitude: number;
		acceleration: number;
		speed: number;
		bearing: number;
		bearingAccuracy: number;
		verticalAcceleration: number;
		timestamp: number;
	}) {
		if (lat === undefined || lng === undefined) {
			throw new Error("lat and lng must be provided");
		}

		// check if lat is valid
		if (lat < -90 || lat > 90) {
			throw new Error("lat must be between -90 and 90");
		}

		// check if lng is valid
		if (lng < -180 || lng > 180) {
			throw new Error("lng must be between -180 and 180");
		}

		if (!timestamp) {
			timestamp = new Date().getTime();
		}

		this.gps.push({
			lat,
			lng,
			a: gpsAccuracy,
			alt: altitude,
			acc: acceleration,
			s: speed,
			b: bearing,
			bAcc: bearingAccuracy,
			va: verticalAcceleration,
			ts: timestamp,
		});

		await this.sendCheck();
	}

	async addAccelerometer({ x, y, z, timestamp }: { x: number; y: number; z: number; timestamp: number }) {
		if (x === undefined || y === undefined || z === undefined) {
			throw new Error("x, y and z must be provided");
		}

		if (!timestamp) {
			timestamp = new Date().getTime();
		}

		this.accelerometer.push({
			x,
			y,
			z,
			ts: timestamp,
		});

		await this.sendCheck();
	}

	async addGyroscope({ x, y, z, timestamp }: { x: number; y: number; z: number; timestamp: number }) {
		if (x === undefined || y === undefined || z === undefined) {
			throw new Error("x, y and z must be provided");
		}

		if (!timestamp) {
			timestamp = new Date().getTime();
		}

		this.gyroscope.push({
			x,
			y,
			z,
			ts: timestamp,
		});

		await this.sendCheck();
	}

	async addAlert({
		alertCode,
		measurement1,
		measurement2,
		measurement3,
		onDevice,
		shown,
		timestamp,
	}: {
		alertCode: string;
		measurement1: number;
		measurement2: number;
		measurement3: number;
		onDevice: boolean;
		shown: boolean;
		timestamp: number;
	}) {
		if (alertCode === undefined) {
			throw new Error("alert_code must be provided");
		}

		if (!timestamp) {
			timestamp = new Date().getTime();
		}

		this.alerts.push({
			code: alertCode,
			m1: measurement1,
			m2: measurement2,
			m3: measurement3,
			onDevice,
			shown,
			ts: timestamp,
		});

		await this.sendCheck();
	}
}
