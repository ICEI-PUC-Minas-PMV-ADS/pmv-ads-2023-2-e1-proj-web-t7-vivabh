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
	const year = originalDate.getUTCFullYear();
	return { month, day, year };
};

export const getWeekNumber = (date) => {
	const onejan = new Date(date.getFullYear(), 0, 1);
	const weekNumber = Math.ceil(
		((date - onejan) / 86400000 + onejan.getDay() + 1) / 7
	);
	return weekNumber;
};
export const shortenText = (text, maxLength) => {
	if (text.length <= maxLength) {
		return text;
	} else {
		return text.substring(0, maxLength - 3) + '...';
	}
};
