export function retryQuerySelector(selector, callback) {
	const maxAttempts = 10; // Maximum number of retry attempts
	const retryInterval = 1000; // Interval in milliseconds between retries
	let attempts = 0;

	function attempt() {
		const element = document.querySelector(selector);
		if (element) {
			callback(element);
		} else if (attempts < maxAttempts) {
			attempts++;
			setTimeout(attempt, retryInterval);
		}
	}

	attempt();
}

export const formatDate = (date) => {
	const originalDate = new Date(date);

	const month = originalDate.toLocaleString('default', { month: 'short' });
	const day = originalDate.getUTCDate();
	return { month, day };
};
