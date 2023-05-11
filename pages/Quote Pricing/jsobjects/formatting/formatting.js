export default {

	formatCurrency: (number) => {
		var aud = new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD'
		});
		return aud.format(number);
	},
	
	formatCurrency_rounded: (number) => {
		var aud = new Intl.NumberFormat('en-AU', {
			style: 'currency',
			currency: 'AUD',
			maximumFractionDigits: 0
		});
		return aud.format(number);
	},
	
	formatTimestamp: (input) => {
		
		var date = new Date(input);
		return new Intl.DateTimeFormat('en-AU', { dateStyle: 'full', timeStyle: 'long', timeZone: 'Australia/Sydney' }).format(date);
	}
	
}