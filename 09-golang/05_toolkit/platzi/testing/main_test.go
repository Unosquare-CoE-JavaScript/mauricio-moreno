package main

import "testing"

func TestSum(t *testing.T) {
	total := Sum(1,2,3,4)

	if total != 10 {
		t.Errorf("sum was incorrect, got %d expected %d", total, 10)
	}

	tables := []struct {
		a int
		b int
		n int
	} {
		{1, 2, 3},
		{2, 2, 4},
		{25, 26, 51},
	}

	for _, item := range tables {
		total := Sum(item.a, item.b)
		if total != item.n {
			t.Errorf("Sum was incorrect, got %d expected %d", total, item.n)
		}
	}
}

func TestMax(t *testing.T) {
	tables := []struct {
		a int
		b int
		r int
	} {
		{ 4, 2, 4 },
		{ 3, 2, 3 },
		{ 9, 2, 9 },
		{ 2, 9, 9 },
	}

	for _, item := range tables {
		max := GetMax(item.a, item.b);

		if max != item.r {
			t.Errorf("Sum was incorrect, got %d while expecting %d", max, item.r)
		}
	}
}

func TestFibonacci(t *testing.T) {
	tables := []struct {
		a int
		n int
	} {
		{1, 1},
		{8, 21},
		{50, 12586269025},
	}

	for _, item := range tables {
		fib := Fibonacci(item.a);
		if fib != item.n {
			t.Errorf("Fibonacci was incorrect, got %d expected %d", fib, item.n)
		}
	}
}