/* This is an use-case for threads because the loops and work maded
by some of these functions is heavy, and we can create concurrency with this */

#include <inttypes.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

uint64_t ramdom64(uint32_t * seed) {
	uint64_t result;
	// Result8 is an array of eight 8-bit unsigned integers backed in the same
	// memory as result, which is a single 64 bit unsigned integer
	uint8_t * result8 = (uint8_t *)&result;
	for (size_t i = 0; i < sizeof(result); i++) {
		result8[i] = rand_r(seed);
	}
	return result;
}

// Takes a number and sums the squares of the number for example
uint64_t sum_digits_squared(uint64_t num) {
	uint64_t total = 0;
	// Takes the last digit and multiplies it for example in 983 it will first take te 3
	// and square it and the result passed to the total, in the second lap it will make the same
	// with the 8 and after with the 9 until num > 0;
	while (num > 0) {
		uint64_t num_mod_base = num % 10;
		total += num_mod_base * num_mod_base;
		num = num / 10;
	}
	return total;
}

bool is_happy(uint64_t num) {
	// Makes the process multiple times
	while (num != 1 && num != 4) {
		num = sum_digits_squared(num);
	}
	return num == 1;// Returns boolean if number is 4 or 1
}

// Verifies your token
bool is_happycoin(uint64_t num) {
	return is_happy(num) && num % 10000 == 0;
}

/*
To get the sum of the squares of the digits insum_digits_squared, we’re using the mod
operator, %, toget each digit from right to left, squaring it, then adding it to our
running total. We then use this function in is_happyin a loop, stopping when the
number is 1 or 4. We stop at 1because that indicates the number is happy. We also stop
at4 because that’s indicative of an infinite loop where wenever end up at 1. Finally,
in is_happycoin(), we do thework of checking whether a number is happy and alsodivisible
by 10,000.
*/

// Example 9 =================================================
int main() {
	uint32_t seed = time(NULL);// String cualquiera
	int count = 0;
	// Get 10 million random numbers
	for (int i = 1; i < 10000000; i++) {
		uint64_t random_num = random64(&seed);
		// Check if its happy
		if(is_happycoin(random_num)) {
			printf("%" PRIu64 " ", random_num); // PRIu64 prints 64-bit unsigned integers
			count++; // Only if its happy continue, D:
		}
	}
	printf("\ncount %d\n", count);
	return 0;
}
