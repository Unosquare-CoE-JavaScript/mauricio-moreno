package main

func Sum(values ...int) int {
	var response int = 0
	for _, value := range values {
		response += value
	}
	return response
}

func GetMax(x, y int) int {
	if x > y {
		return x
	} else {
		return y
	}
}

func Fibonacci(n int) int {
	if n <= 1 {
		return n
	} else {
		return Fibonacci(n-1) + Fibonacci(n-2)
	}
}
