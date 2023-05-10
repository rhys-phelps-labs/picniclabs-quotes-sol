export default {
	
	// Builds the mapbox html for srcDoc iFrame
	populateLayers: async () => {
		
		const supabaseClient = appsmith.store.supabaseClient;
		console.log(JSON.stringify(supabaseClient));
		let { quote_risks, error } = await supabaseClient
			.from('quote_risks')
			.select('id,quote,building_name,')
			.eq('quote', appsmith.store.quote_id);
		console.log(quote_risks);
		console.log(error);
		// create layer data
	},
	
	
	flood: () => {
		
		// properties are; title, description, colour, tsi, flood_depth_100, elevation, ga_catchment
		var data = '{	type: \'geojson\',	data: {	"type": "FeatureCollection","features": [{"type": "Feature","properties": {},	"geometry": {	"type": "Point",	"coordinates": [ -76.53063297271729,39.18174077994108]}}]	}	}';
		return data;
	},
	
	bushfire: () => {
		// bal, category, walls, roof, surroundedness, veg type, 
	},
	
	storm: () => {
		// dist_coast, sts risk, obs size100, walls, no levels
	},
	
	
	
}