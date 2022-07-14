package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) int {
	var result int = 0;
	for _, value := range birdsPerDay { result += value }
	return result
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) int {
	startingDay  := (week - 1) * 7
	endingDay    := week * 7
	selectedWeek := birdsPerDay[startingDay:endingDay]

	var response int = 0
	for _, value := range selectedWeek { response += value }
	return response
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	for index := range birdsPerDay {
		if index % 2 == 0 { birdsPerDay[index]++ }
	}
	return birdsPerDay
}
