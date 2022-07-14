// Package weather package should do something, I didn't read the instructions xd.
package weather

// CurrentCondition is a string.
var CurrentCondition string
// CurrentLocation is a current location asdfkasd.
var CurrentLocation string

// Forecast should take something and return something lol.
func Forecast(city, condition string) string {
	CurrentLocation, CurrentCondition = city, condition
	return CurrentLocation + " - current weather condition: " + CurrentCondition
}
