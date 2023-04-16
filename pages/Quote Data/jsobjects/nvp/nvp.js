export default {
	setNVPArrays: async () => {
		
		await Distinct_Key_Names_NVP.run();
		console.log(JSON.stringify(Distinct_Key_Names_NVP.data));
		var nvp_map = {};
		for ( var k in Distinct_Key_Names_NVP.data) {
			console.log(Distinct_Key_Names_NVP.data[k].key_name);
			nvp_map[Distinct_Key_Names_NVP.data[k].key_name] = [];
		}
		
		await Get_NVP.run();
		console.log(JSON.stringify(Get_NVP.data));
		for (var d in Get_NVP.data) {
			
			var key = Get_NVP.data[d].key_name;
			var option_type = Get_NVP.data[d].option_type;
			var option_label = Get_NVP.data[d].option_label;
			
			var storeval = nvp_map[key];
			console.log('stored value: ' + storeval);
			var val = '';
			
			switch(option_type){
       	case 'text':
					val = Get_NVP.data[d].option_value_ch;		
       		break;
				case 'int':
					val = Get_NVP.data[d].option_value_int;		
       		break;
				case 'float':
					val = Get_NVP.data[d].option_value_float;		
       		break;
       }
			
		  storeval.push({ 'label': option_label, 'value': val});			
		}
		
		console.log(JSON.stringify(nvp_map));
		for (var i in nvp_map) {
			console.log(JSON.stringify(nvp_map[i]));
			storeValue(i, nvp_map[i]);
		}

		// get the list of mutuals
		await GetActiveMutuals.run();
		storeValue('MUTUALS', GetActiveMutuals.data);
		
		return 0;
	}
}