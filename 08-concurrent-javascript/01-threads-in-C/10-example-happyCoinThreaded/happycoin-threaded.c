#include <inttypes.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <pthread.h>

struct happy_result {
	size_t count;
};

//! Code explanation in 1-08
uint64_t ramdom64(uint32_t * seed) {
	uint64_t result;
	uint8_t * result8 = (uint8_t *)&result;
	for (size_t i = 0; i < sizeof(result); i++) {
		result8[i] = rand_r(seed);
	}
	return result;
}

uint64_t sum_digits_squared(uint64_t num) {
	uint64_t total = 0;
	while (num > 0) {
		uint64_t num_mod_base = num % 10;
		total += num_mod_base * num_mod_base;
		num = num / 10;
	}
	return total;
}

bool is_happy(uint64_t num) {
	while (num != 1 && num != 4) {
		num = sum_digits_squared(num);
	}
	return num == 1;
}

bool is_happycoin(uint64_t num) {
	return is_happy(num) && num % 10000 == 0;
}

// Here are the changes
int main() {
	pthread_t thread [THREAD_COUNT];

	int attempts = 10000000/THREAD_COUNT
	int count = 0;
	// Divide the number of attempts in some threads
	for (int i = 0; i < THREAD_COUNT; i++) {
		pthread_create(&thread[i], NULL, get_happycoins, &attempts);
	}
	// Joins the threads created
	for (int j = 0; j < THREAD_COUNT; j++) {
		struct happy_result * result;
		pthread_join(thread[j], (void **)&result);
		count += result->count;
		for(int k = 0; k < result->count; k++) {
			printf("%" PRIu64 " ", result->nums[k]);
		}
	}
	printf("\ncount %d\n", count);
	return 0;
}

void * get_happycoins(void * arg) {
	int attempts = *(int *) arg;
	int limit = attempts / 10000;
	uint32_t seed = time(null);
	uint64_t * nums = malloc(limit * sizeof(uint64_t));
	struct happy_result * result = malloc(sizeof(struct happy_result));

	result->nums = nums;
	result->count = 0;
	for (int i = 1; i < attempts; i++){
		if(reult->count == limit) {
			break;
		}
		uint64_t random_num = random64(&seed);
		if (is_happycoin(random_num)) {
			result->nums[result->count++] = random_num;
		}
	}
	return (void *) result;/* Takes a void and returns another void
	that is the expected function signature taked by a pthread_create*/
}
