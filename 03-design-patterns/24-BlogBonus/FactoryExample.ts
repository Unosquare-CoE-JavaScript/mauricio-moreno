// Interface for a single vehicle ================================
interface Vehicle {
	move(): void;
}

// Concrete Vehicles =============================================
class Car implements Vehicle {
	public move(): void {
		console.log('Moving the car!');
	}
}

class Bicycle implements Vehicle {
	public move(): void {
		console.log('Moving the bicycle!');
	}
}

class Plane implements Vehicle {
	public move(): void {
		console.log('Moving the plane!');
	}
}

// Abstract factory class ==========================================
abstract class VehicleHandler {
	public abstract createVehicle(): Vehicle;

	public moveVehicle(): void {
		const myVehicle = this.createVehicle();
		myVehicle.move();
	}
}

// concrete Factories =============================================

class PlaneHandler extends VehicleHandler {
	public createVehicle(): Vehicle {
		return new Plane();
	}
}

class CarHandler extends VehicleHandler {
	public createVehicle(): Vehicle {
		return new Car();
	}
}

class BicycleHandler extends VehicleHandler {
	public createVehicle(): Vehicle {
		return new Bicycle();
	}
}

// Client code ==================================================

const planes = new PlaneHandler();
const cars = new CarHandler();

planes.moveVehicle();
cars.moveVehicle();
