export default {
	
	
	buildDocxTemplaterMergeData: () => {
		
		var merge_data = {};
		
		// populate values
		merge_data['quote_number'] = appsmith.store.current_quote.detail.quote_number;
		merge_data['quote_date'] = appsmith.store.current_quote.detail.quote_date;
		merge_data['quote_expiry_date'] = appsmith.store.current_quote.detail.quote_expiry_date;
		merge_data['inception_date'] = appsmith.store.current_quote.detail.inception_date;
		merge_data['full_name'] = appsmith.store.current_quote.detail.full_name;
		merge_data['company_name'] = appsmith.store.current_quote.detail.company_name;
		merge_data['bill_to_street'] = appsmith.store.current_quote.detail.street;
		merge_data['bill_to_city'] = appsmith.store.current_quote.detail.city;
		merge_data['bill_to_state'] = appsmith.store.current_quote.detail.state;
		merge_data['bill_to_postcode'] = appsmith.store.current_quote.detail.postcode;
		merge_data['bill_to_phone'] = appsmith.store.current_quote.detail.phone;
		merge_data['bill_to_email'] = appsmith.store.current_quote.detail.email;
		merge_data['first_name'] = appsmith.store.current_quote.detail.first_name;
		merge_data['full_product_name'] = appsmith.store.current_quote.detail.produce_name;
		merge_data['base_contribution'] = appsmith.store.current_quote.detail.total_contribution_excl_gst;
		merge_data['gst'] = appsmith.store.current_quote.detail.gst;
		merge_data['total_contribution'] = appsmith.store.current_quote.detail.total_contribution;
		merge_data['expiry_date'] = appsmith.store.current_quote.detail.expiry_date;
		merge_data['hurdle'] = appsmith.store.current_quote.detail.hurdle;
		merge_data['pds_name'] = appsmith.store.current_quote.detail.pds_name;
		merge_data['special_conditions'] = appsmith.store.current_quote.detail.special_conditions;
		merge_data['interested_parties'] = appsmith.store.current_quote.detail.interested_parties;
		
		// populates lists
		
		merge_data['declared_protections'] = [
			{dp_col1: 'Loss to your buildings', dp_col2: appsmith.store.current_quote.detail.declared_total, dp_col3: appsmith.store.current_quote.detail.declared_limit_total },
			{dp_col1: 'Contents (excluding personal effects & money', dp_col2: appsmith.store.current_quote.detail.declared_contents_total, dp_col3: appsmith.store.current_quote.detail.declared_contents_total },
			{dp_col1: 'Individual Items Listed', dp_col2: 'Nil', dp_col3: 'Not Protected' },
			{dp_col1: 'Consequential Loss', dp_col2: appsmith.store.current_quote.detail.declared_cons_loss_total, dp_col3: appsmith.store.current_quote.detail.declared_cons_loss_total}
		];
		
		
		merge_data['protection_limits'] = [
			{pl_col1: 'Gradual Forces or Gradual Damage to a Building' , pl_col2: '$10,000'},
			{pl_col1: 'Contents (excluding personal effects & money)' , pl_col2: '$250,000 per item, to the aggregate limit recorded'},
			{pl_col1: 'Contents - Personal Effects' , pl_col2: '$20,000' },
			{pl_col1: 'Contents - Money' , pl_col2: '$10,000' },
			{pl_col1: 'Mechanical and Electronic Equipment' , pl_col2: '$100,000 per protected address' },
			{pl_col1: 'Professional Fees and Claim Preparation Costs' , pl_col2: '$250,000'},
			{pl_col1: 'Temporary Accommodation (for employees)' , pl_col2: 'Up to 18 months (for employees who are permanent residents)'},
			{pl_col1: 'Emergency Accommodation (for employees)' , pl_col2: 'Reasonable cost (for employees who are permanent residents)'},
			{pl_col1: 'Building Make-Safe, Demolition and Debris Removal' , pl_col2: '20% of your Buildings full replacement value' },
			{pl_col1: 'Contents Make-Safe, Demolition and Debris Removal' , pl_col2: '10% of the Specified Protection Amount for your Contents.' }
		];
		
		merge_data['assets'] = appsmith.store.current_quote.risks.map((asset) => {
			return {
				sa_col1: asset.data.building_name,
				sa_col2: asset.data.building_sum_insured,
				sa_col3: asset.data.limit,
				sa_col4: asset.data.replacement_basis,
				sa_col5: asset.data.contents_sum_insured,
				sa_col6: asset.data.consequential_loss,
				sa_col7: asset.data.risk_include_flood 
			};
		});
		
		
	  //merge_data['items']
		return merge_data;
	},
	
	
	generateQuoteDoc: async () => {
	
		var blob = doc.generate({
			type: 'blob',
			mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		});
		console.log('blob created');
    const url = URL.createObjectURL(blob);
		var filename = _.snakeCase(appsmith.store.current_quote.detail.name);
    await download(url, filename + '.xlsx', "application/docx");	
		
	},
	
	
		
}