//! First exercise working time verifier

const dayStart = '07:30';
const dayEnd = '17:45';

const scheduleMeeting = (startTime: string, durationTime: number) => {
	//Formats day schedule data to work with
	const [dayStartHour, dayStartMinute] = dayStart.split(':');
	const [dayEndHour, dayEndMinute] = dayEnd.split(':');

	let [hours, minutes] = startTime.split(':'); // divides startTime in two variables
	if (hours.length == 1) hours = '0' + hours; // formats the number worked

	// The number added to hours if the minutes surpases 60
	let base60Overflow = Math.floor((durationTime + Number(minutes)) / 60);
	// creates the final hour and returns -> newHour, newMinutes.
	let newHour = Number(hours) + base60Overflow;
	if (newHour >= 24) newHour = newHour - 24;
	const newMinutes = (Number(minutes) + durationTime) % 60;

	//Verifies if our resulted hour is after schedule end hour
	// @ts-ignore
	if (newHour > dayEndHour) return false;
	// @ts-ignore
	if (newHour == dayEndHour && newMinutes > dayEndMinute) return false;

	//Verifies if our resulted hour is before schedule end hour
	// @ts-ignore
	if (newHour < dayStartHour) return false;
	// @ts-ignore
	if (newHour == dayStartHour && newMinutes < dayStartMinute) return false;

	//Verifies if the startTime starts inside a scheduled time
	if (hours > dayEndHour || hours < dayStartHour) return false;
	if (hours == dayEndHour && minutes > dayEndMinute) return false;
	if (hours == dayStartHour && minutes < dayStartMinute) return false;
	return true;
};

// console.log(
// 	scheduleMeeting('7:00', 15),
// 	scheduleMeeting('07:15', 30),
// 	scheduleMeeting('7:30', 30),
// 	scheduleMeeting('11:30', 60),
// 	scheduleMeeting('17:00', 45),
// 	scheduleMeeting('17:30', 30),
// 	scheduleMeeting('18:00', 15),
// );

//! Second exercise range generator
const range = (start: number) => (end: number) =>
	start > end
		? []
		: new Array(end + 1 - start)
				.fill(start)
				.map((element, index) => element + index);

const range2 = (start: number) => (end: number) => {
	let response = [];
	for (let i = start; i < end + 1; i++) {
		response.push(i);
	}
	return response;
};

const start3 = range2(3);
const start4 = range2(4);

// console.log(start3(3), start3(8), start3(0));
// console.log(start4(6), start4(12), start4(0));
