export default {
	
	onpageload: async (quote_id) => {
		// there are two ways the page can load, one from a query the other direct by the user
		// when direct by the user, the user must select the quote from the list of drafts
		
		
		// memory store structure is:
		// current_quote.
		//	saved_state - if a field has been changed, then set to false
		//  commit_state - all changes have been applied to the db, if field change, then false
		//  is_rated - the rating has been applied, but may yet be committed
		//  id
		//  detail
		//  risks - an array of properties
		//     data
		//		 perils
		//     rating 
		
		var current_quote = {};
		current_quote['saved_state'] = false;
		current_quote['commit_state'] = false;
		current_quote['is_rated'] = false;
		current_quote['quote_id'] = quote_id;
		current_quote['detail'] = {};
		current_quote['risks'] = [];
		
		await Get_Full_Quote_Detail.run({ quote_id : quote_id});
		console.log(Get_Full_Quote_Detail.data);
		
		current_quote.detail['id'] = Get_Full_Quote_Detail.data[0]['quote_id'];
    current_quote.detail['last_modified'] = Get_Full_Quote_Detail.data[0].last_modified;
    current_quote.detail['last_modified_by'] = Get_Full_Quote_Detail.data[0].last_modified_by;
    current_quote.detail['type'] = Get_Full_Quote_Detail.data[0].type;
    current_quote.detail['mutual'] = Get_Full_Quote_Detail.data[0].mutual;
    current_quote.detail['tenancy'] = Get_Full_Quote_Detail.data[0].tenancy;
    current_quote.detail['name'] = Get_Full_Quote_Detail.data[0].name;
    current_quote.detail['quote_date'] = Get_Full_Quote_Detail.data[0].quote_date;
    current_quote.detail['quote_expiry'] = Get_Full_Quote_Detail.data[0].quote_expiry;
    current_quote.detail['owner'] = Get_Full_Quote_Detail.data[0].owner;
    current_quote.detail['email'] = Get_Full_Quote_Detail.data[0].email;
    current_quote.detail['quote_number'] = Get_Full_Quote_Detail.data[0].quote_number;
    current_quote.detail['version'] = Get_Full_Quote_Detail.data[0].version;
    current_quote.detail['status'] = Get_Full_Quote_Detail.data[0].status;
    current_quote.detail['description'] = Get_Full_Quote_Detail.data[0].description;
    current_quote.detail['gwp'] = Get_Full_Quote_Detail.data[0].gwp;
    current_quote.detail['tsi'] = Get_Full_Quote_Detail.data[0].tsi;
    current_quote.detail['account'] = Get_Full_Quote_Detail.data[0].account;
    current_quote.detail['contact'] = Get_Full_Quote_Detail.data[0].contact;
    current_quote.detail['inception_date'] = Get_Full_Quote_Detail.data[0].inception_date;
    current_quote.detail['expiry_date'] = Get_Full_Quote_Detail.data[0].expiry_date;
    current_quote.detail['claim_hurdle'] = Get_Full_Quote_Detail.data[0].claim_hurdle;
    current_quote.detail['pds'] = Get_Full_Quote_Detail.data[0].pds;
    current_quote.detail['payment_due_date'] = Get_Full_Quote_Detail.data[0].payment_due_date;
    current_quote.detail['base_contribution'] = Get_Full_Quote_Detail.data[0].base_contribution;
    current_quote.detail['marketing_fee_amt'] = Get_Full_Quote_Detail.data[0].marketing_fee_amt;
    current_quote.detail['marketing_fee_pct'] = Get_Full_Quote_Detail.data[0].marketing_fee_pct;
    current_quote.detail['mgmt_fee_amt'] = Get_Full_Quote_Detail.data[0].mgmt_fee_amt;
    current_quote.detail['mgmt_fee_pct'] = Get_Full_Quote_Detail.data[0].mgmt_fee_pct;
    current_quote.detail['gst'] = Get_Full_Quote_Detail.data[0].gst;
    current_quote.detail['total_contribution'] = Get_Full_Quote_Detail.data[0].total_contribution;
    current_quote.detail['xol_premium_est'] = Get_Full_Quote_Detail.data[0].xol_premium_est;
    current_quote.detail['weight_claims_exp'] = Get_Full_Quote_Detail.data[0].weight_claims_exp;
    current_quote.detail['mutual_profit_margin'] = Get_Full_Quote_Detail.data[0].mutual_profit_margin;
    current_quote.detail['declared_building_val_adj'] = Get_Full_Quote_Detail.data[0].declared_building_val_adj;
    current_quote.detail['loading_discount'] = Get_Full_Quote_Detail.data[0].loading_discount;
    current_quote.detail['claims_hist_to_incl'] = Get_Full_Quote_Detail.data[0].claims_hist_to_incl;
    current_quote.detail['is_renewal'] = Get_Full_Quote_Detail.data[0].is_renewal;
    current_quote.detail['product_name'] = Get_Full_Quote_Detail.data[0].product_name;
		current_quote.detail['claims_aal'] = Get_Full_Quote_Detail.data[0].claims_aal;
		current_quote.detail['risk_total'] = Get_Full_Quote_Detail.data[0].risk_total;
		current_quote.detail['att_risk_total'] = Get_Full_Quote_Detail.data[0].att_risk_total;
		current_quote.detail['lrg_risk_total'] = Get_Full_Quote_Detail.data[0].lrg_risk_total;
		current_quote.detail['wea_risk_total'] = Get_Full_Quote_Detail.data[0].wea_risk_total;
		current_quote.detail['xol_att'] = Get_Full_Quote_Detail.data[0].xol_att;
		current_quote.detail['xol_lrg'] = Get_Full_Quote_Detail.data[0].xol_lrg;
		current_quote.detail['xol_wea'] = Get_Full_Quote_Detail.data[0].xol_wea;
		current_quote.detail['xol_total'] = Get_Full_Quote_Detail.data[0].xol_total;
		current_quote.detail['profit_att'] = Get_Full_Quote_Detail.data[0].profit_att;
		current_quote.detail['profit_lrg'] = Get_Full_Quote_Detail.data[0].profit_lrg;
		current_quote.detail['profit_wea'] = Get_Full_Quote_Detail.data[0].profit_wea;
		current_quote.detail['profit_total'] = Get_Full_Quote_Detail.data[0].profit_total;
		current_quote.detail['xol_weighted_contribution'] = Get_Full_Quote_Detail.data[0].xol_weighted_contribution;
		current_quote.detail['profit_weighted_contribution'] = Get_Full_Quote_Detail.data[0].profit_weighted_contribution;
		current_quote.detail['total_contribution_excl_gst'] = Get_Full_Quote_Detail.data[0].total_contribution_excl_gst;
		current_quote.detail['total_properties_tropic'] = Get_Full_Quote_Detail.data[0].total_properties_tropic;
		current_quote.detail['total_properties_nontropic'] = Get_Full_Quote_Detail.data[0].total_properties_nontropic;
		current_quote.detail['tropics_total'] = Get_Full_Quote_Detail.data[0].tropics_total;
		current_quote.detail['nontropics_total'] = Get_Full_Quote_Detail.data[0].nontropics_total;
		current_quote.detail['tropics_1_total'] = Get_Full_Quote_Detail.data[0].tropics_1_total;
		current_quote.detail['tropics_sub_total'] = Get_Full_Quote_Detail.data[0].tropics_sub_total;
		current_quote.detail['nontropics_1_total'] = Get_Full_Quote_Detail.data[0].nontropics_1_total;
		current_quote.detail['nontropics_sub_total'] = Get_Full_Quote_Detail.data[0].nontropics_sub_total;
		current_quote.detail['declared_total'] = Get_Full_Quote_Detail.data[0].declared_total;
		current_quote.detail['declared_limit_total'] = Get_Full_Quote_Detail.data[0].declared_limit_total;
		current_quote.detail['declared_by_basis'] = Get_Full_Quote_Detail.data[0].declared_by_basis;
		current_quote.detail['declared_contents_total'] = Get_Full_Quote_Detail.data[0].declared_contents_total;
		current_quote.detail['declared_cons_loss_total'] = Get_Full_Quote_Detail.data[0].declared_cons_loss_total;
		current_quote.detail['mgmt_fee_tropics_1_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_tropics_1_total;
		current_quote.detail['mgmt_fee_tropics_sub_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_tropics_sub_total;
		current_quote.detail['mgmt_fee_gst_tropics_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_gst_tropics_total;
		current_quote.detail['mgmt_fee_nontropics_1_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_nontropics_1_total;
		current_quote.detail['mgmt_fee_nontropics_sub_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_nontropics_sub_total;
		current_quote.detail['mgmt_fee_gst_nontropics_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_gst_nontropics_total;
		current_quote.detail['mgmt_fee_nontropics_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_nontropics_total;
		current_quote.detail['mgmt_fee_tropics_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_tropics_total;
		current_quote.detail['mgmt_fee_gst_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_gst_total;
		current_quote.detail['mgmt_fee_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_total;
		current_quote.detail['mgmt_fee_1_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_1_total;
		current_quote.detail['mgmt_fee_sub_total'] = Get_Full_Quote_Detail.data[0].mgmt_fee_sub_total;
		current_quote.detail['asbestos_count'] = Get_Full_Quote_Detail.data[0].asbestos_count;
		current_quote.detail['heritage_listed_count'] = Get_Full_Quote_Detail.data[0].heritage_listed_count;
		current_quote.detail['commercial_count'] = Get_Full_Quote_Detail.data[0].commercial_count;
		current_quote.detail['asset_include_flood'] = Get_Full_Quote_Detail.data[0].asset_include_flood;
		current_quote.detail['payment_term_loading'] = Get_Full_Quote_Detail.data[0].payment_term_loading;
		current_quote.detail['payment_term'] = Get_Full_Quote_Detail.data[0].payment_term;
		current_quote.detail['company_name'] = Get_Full_Quote_Detail.data[0].company_name;
		current_quote.detail['full_name'] = Get_Full_Quote_Detail.data[0].full_name;
		current_quote.detail['first_name'] = Get_Full_Quote_Detail.data[0].first_name;
		current_quote.detail['bill_to_street'] = Get_Full_Quote_Detail.data[0].bill_to_street;
		current_quote.detail['bill_to_city'] = Get_Full_Quote_Detail.data[0].bill_to_city;
		current_quote.detail['bill_to_state'] = Get_Full_Quote_Detail.data[0].bill_to_state;
		current_quote.detail['bill_to_postcode'] = Get_Full_Quote_Detail.data[0].bill_to_postcode;
		current_quote.detail['bill_to_phone'] = Get_Full_Quote_Detail.data[0].bill_to_phone;
		current_quote.detail['bill_to_email'] = Get_Full_Quote_Detail.data[0].bill_to_email;
	
		
		for (var v in Get_Full_Quote_Detail.data) {
			
			var data = {};
			var perils = {};
			var rating = {};
			
			data['quote_risk_id'] = Get_Full_Quote_Detail.data[v].quote_risk_id,
			data['quote'] = Get_Full_Quote_Detail.data[v].quote_id;
			data['building_name'] = Get_Full_Quote_Detail.data[v].building_name;
			data['group'] = Get_Full_Quote_Detail.data[v].group;
			data['address'] = Get_Full_Quote_Detail.data[v].address;
			data['state'] = Get_Full_Quote_Detail.data[v].state;
			data['replacement_basis'] = Get_Full_Quote_Detail.data[v].replacement_basis;
			data['building_sum_insured'] = Get_Full_Quote_Detail.data[v].building_sum_insured;
			data['contents_sum_insured'] = Get_Full_Quote_Detail.data[v].contents_sum_insured;
			data['limit'] = Get_Full_Quote_Detail.data[v].limit;
			data['professional_fees'] = Get_Full_Quote_Detail.data[v].professional_fees;
			data['consequential_loss'] = Get_Full_Quote_Detail.data[v].consequential_loss;
			data['hurdle'] = Get_Full_Quote_Detail.data[v].hurdle;
			data['anzsic_code'] = Get_Full_Quote_Detail.data[v].anzsic_code;
			data['no_of_buildings'] = Get_Full_Quote_Detail.data[v].no_of_buildings;
			data['no_levels'] = Get_Full_Quote_Detail.data[v].no_levels;
			data['walls'] = Get_Full_Quote_Detail.data[v].walls;
			data['roof'] = Get_Full_Quote_Detail.data[v].roof;
			data['year_built'] = Get_Full_Quote_Detail.data[v].year_built;
			data['fire_protection'] = Get_Full_Quote_Detail.data[v].fire_protection;
			data['security_protection'] = Get_Full_Quote_Detail.data[v].security_protection;
			data['heritage_listed'] = Get_Full_Quote_Detail.data[v].heritage_listed;
			data['asbestos'] = Get_Full_Quote_Detail.data[v].asbestos;
			data['eps_percentage'] = Get_Full_Quote_Detail.data[v].eps_percentage;
			data['building_type'] = Get_Full_Quote_Detail.data[v].building_type;
			data['gnaf_pid'] = Get_Full_Quote_Detail.data[v].gnaf_pid;
			data['accurate'] = Get_Full_Quote_Detail.data[v].accurate;
			data['loqate_id'] = Get_Full_Quote_Detail.data[v].loqate_id;
			data['latitude'] = Get_Full_Quote_Detail.data[v].latitude;
			data['longitude'] = Get_Full_Quote_Detail.data[v].longitude;
			data['longitude'] = Get_Full_Quote_Detail.data[v].longitude;
			data['risk_include_flood'] = Get_Full_Quote_Detail.data[v].risk_include_flood;
			data['building_make_safe'] = Get_Full_Quote_Detail.data[v].building_make_safe;
			data['contents_make_safe'] = Get_Full_Quote_Detail.data[v].contents_make_safe;
			
			perils['gc_flag'] = Get_Full_Quote_Detail.data[v].gc_flag;
			perils['flood_depth_20'] = Get_Full_Quote_Detail.data[v].flood_depth_20;
			perils['flood_depth_50'] = Get_Full_Quote_Detail.data[v].flood_depth_50;
			perils['flood_depth_100'] = Get_Full_Quote_Detail.data[v].flood_depth_100;
			perils['flood_depth_200'] = Get_Full_Quote_Detail.data[v].flood_depth_200;
			perils['flood_depth_500'] = Get_Full_Quote_Detail.data[v].flood_depth_500;
			perils['flood_depth_1000'] = Get_Full_Quote_Detail.data[v].flood_depth_1000;
			perils['flood_depth_extreme'] = Get_Full_Quote_Detail.data[v].flood_depth_extreme;
			perils['flood_ari_gl'] = Get_Full_Quote_Detail.data[v].flood_ari_gl;
			perils['flood_ari_gl1m'] = Get_Full_Quote_Detail.data[v].flood_ari_gl1m;
			perils['flood_ari_gl2m'] = Get_Full_Quote_Detail.data[v].flood_ari_gl2m;
			perils['riverine_percentage'] = Get_Full_Quote_Detail.data[v].riverine_percentage;
			perils['overland_percentage'] = Get_Full_Quote_Detail.data[v].overland_percentage;
			perils['elevation'] = Get_Full_Quote_Detail.data[v].elevation;
    	perils['ga_catchment'] = Get_Full_Quote_Detail.data[v].ga_catchment;
			perils['resolution'] = Get_Full_Quote_Detail.data[v].resolution;
			perils['levee_information'] = Get_Full_Quote_Detail.data[v].levee_information;
			perils['notes_id1'] = Get_Full_Quote_Detail.data[v].notes_id1;
			perils['notes_id2'] = Get_Full_Quote_Detail.data[v].notes_id2;
			perils['wfm_coverage_flag'] = Get_Full_Quote_Detail.data[v].wfm_coverage_flag;
			perils['fdi'] = Get_Full_Quote_Detail.data[v].fdi;
			perils['veg_type'] = Get_Full_Quote_Detail.data[v].veg_type;
			perils['distance'] = Get_Full_Quote_Detail.data[v].distance;
			perils['bushfire_attack_level'] = Get_Full_Quote_Detail.data[v].bushfire_attack_level;
			perils['bal_category'] = Get_Full_Quote_Detail.data[v].bal_category;
			perils['surroundedness'] = Get_Full_Quote_Detail.data[v].surroundedness;
			perils['windgust_5yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_5yr_ari;
			perils['windgust_10yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_10yr_ari;
			perils['windgust_25yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_25yr_ari;
			perils['windgust_50yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_50yr_ari;
			perils['windgust_100yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_100yr_ari;
			perils['windgust_250yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_250yr_ari;
			perils['windgust_500yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_500yr_ari;
			perils['windgust_1000yr_ari'] = Get_Full_Quote_Detail.data[v].windgust_1000yr_ari;
			perils['adjusted'] = Get_Full_Quote_Detail.data[v].adjusted;
			perils['sts_risk'] = Get_Full_Quote_Detail.data[v].sts_risk;
			perils['ot'] = Get_Full_Quote_Detail.data[v].ot;
			perils['radar'] = Get_Full_Quote_Detail.data[v].radar;
			perils['reanalysis'] = Get_Full_Quote_Detail.data[v].reanalysis;
			perils['obs_size_100'] = Get_Full_Quote_Detail.data[v].obs_size_100;
			perils['dist_coast'] = Get_Full_Quote_Detail.data[v].dist_coast;
			perils['terrain_location'] = Get_Full_Quote_Detail.data[v].terrain_location;
			perils['terrain_resolution'] = Get_Full_Quote_Detail.data[v].terrain_resolution;
			perils['remoteness_area'] = Get_Full_Quote_Detail.data[v].remoteness_area;

			rating['rating_risk_id'] = Get_Full_Quote_Detail.data[v].rating_risk_id;
			rating['rating_process'] = Get_Full_Quote_Detail.data[v].rating_process;
			rating['rating_version'] = Get_Full_Quote_Detail.data[v].rating_version;
			rating['quote_risk_id'] = Get_Full_Quote_Detail.data[v].quote_risk_id;
			rating['att_base'] = Get_Full_Quote_Detail.data[v].att_base;
			rating['att_occupancy'] = Get_Full_Quote_Detail.data[v].att_occupancy;
			rating['att_sum_insured'] = Get_Full_Quote_Detail.data[v].att_sum_insured;
			rating['att_hurdle'] = Get_Full_Quote_Detail.data[v].att_hurdle;
			rating['att_year_built'] = Get_Full_Quote_Detail.data[v].att_year_built;
			rating['att_fire_protection'] = Get_Full_Quote_Detail.data[v].att_fire_protection;
			rating['att_security_protection'] = Get_Full_Quote_Detail.data[v].att_security_protection;
			rating['att_heritage_listed'] = Get_Full_Quote_Detail.data[v].att_heritage_listed;
			rating['att_asbestos'] = Get_Full_Quote_Detail.data[v].att_asbestos;
			rating['att_eps'] = Get_Full_Quote_Detail.data[v].att_eps;
			rating['att_remote'] = Get_Full_Quote_Detail.data[v].att_remote;
			rating['att_cover_basis'] = Get_Full_Quote_Detail.data[v].att_cover_basis;
			rating['att_total'] = Get_Full_Quote_Detail.data[v].att_total;
			rating['lrg_base'] = Get_Full_Quote_Detail.data[v].lrg_base;
			rating['lrg_occupancy'] = Get_Full_Quote_Detail.data[v].lrg_occupancy;
			rating['lrg_sum_insured'] = Get_Full_Quote_Detail.data[v].lrg_sum_insured;
			rating['lrg_hurdle'] = Get_Full_Quote_Detail.data[v].lrg_hurdle;
			rating['lrg_year_built'] = Get_Full_Quote_Detail.data[v].lrg_year_built;
			rating['lrg_fire_protection'] = Get_Full_Quote_Detail.data[v].lrg_fire_protection;
			rating['lrg_security_protection'] = Get_Full_Quote_Detail.data[v].lrg_security_protection;
			rating['lrg_heritage_listed'] = Get_Full_Quote_Detail.data[v].lrg_heritage_listed;
			rating['lrg_asbestos'] = Get_Full_Quote_Detail.data[v].lrg_asbestos;
			rating['lrg_eps'] = Get_Full_Quote_Detail.data[v].lrg_eps;
			rating['lrg_remote'] = Get_Full_Quote_Detail.data[v].lrg_remote;
			rating['lrg_cover_basis'] = Get_Full_Quote_Detail.data[v].lrg_cover_basis;
			rating['lrg_total'] = Get_Full_Quote_Detail.data[v].lrg_total;
			rating['wea_base'] = Get_Full_Quote_Detail.data[v].wea_base;
			rating['wea_flood'] = Get_Full_Quote_Detail.data[v].wea_flood;
			rating['wea_bushfire'] = Get_Full_Quote_Detail.data[v].wea_bushfire;
			rating['wea_wind'] = Get_Full_Quote_Detail.data[v].wea_wind;
			rating['wea_occupancy'] = Get_Full_Quote_Detail.data[v].wea_occupancy;
			rating['wea_sum_insured'] = Get_Full_Quote_Detail.data[v].wea_sum_insured;
			rating['wea_hurdle'] = Get_Full_Quote_Detail.data[v].wea_hurdle;
			rating['wea_year_built'] = Get_Full_Quote_Detail.data[v].wea_year_built;
			rating['wea_fire_protection'] = Get_Full_Quote_Detail.data[v].wea_fire_protection;
			rating['wea_heritage_listed'] = Get_Full_Quote_Detail.data[v].wea_heritage_listed;
			rating['wea_asbestos'] = Get_Full_Quote_Detail.data[v].wea_asbestos;
			rating['wea_eps'] = Get_Full_Quote_Detail.data[v].wea_eps;
			rating['wea_remote'] = Get_Full_Quote_Detail.data[v].wea_remote;
			rating['wea_cover_basis'] = Get_Full_Quote_Detail.data[v].wea_cover_basis;
			rating['wea_total'] = Get_Full_Quote_Detail.data[v].wea_total;
			rating['cbc_ratio'] = Get_Full_Quote_Detail.data[v].cbc_ratio;
			rating['cbc_mean'] = Get_Full_Quote_Detail.data[v].cbc_mean;
			rating['cbc_st_dev'] = Get_Full_Quote_Detail.data[v].cbc_st_dev;
			rating['cbc_px_att'] = Get_Full_Quote_Detail.data[v].cbc_px_att;
			rating['cbc_px_lrg'] = Get_Full_Quote_Detail.data[v].cbc_px_lrg;
			rating['cbc_px_wea'] = Get_Full_Quote_Detail.data[v].cbc_px_wea;
			rating['att_lrg_wea_total'] = Get_Full_Quote_Detail.data[v].att_lrg_wea_total;
			rating['total_sum_insured'] = Get_Full_Quote_Detail.data[v].total_sum_insured;
			rating['wea_security_protection'] = Get_Full_Quote_Detail.data[v].wea_security_protection;
			
			var risk = { data: data, perils: perils, rating: rating };
			current_quote.risks.push(risk);			
		}
   
   storeValue('current_quote', current_quote, false);
	 console.log('The parsed structure: ' + JSON.stringify(current_quote));
	},
	
	update_protected_address: (risk) => {
	  
		var current_quote = appsmith.store.current_quote;
		var id = risk.data.quote_risk_id;
		var idx = _.findIndex(current_quote.risks, function(o) { return o.data.quote_risk_id == id;});
		storeValue('asset_list_table_last_idx', idx, false);
		var upd_risk = _.find(current_quote.risks, function(o) { return o.data.quote_risk_id == id; });
		
		upd_risk.data['building_name'] = qaBuildingName.inputText;
		upd_risk.data['group'] = qaGroup.inputText;
		upd_risk.data['address'] = qaAddress.inputText;
		upd_risk.data['state'] = qaState.selectedOptionValue;
		upd_risk.data['replacement_basis'] = qaReplacementBasis.selectedOptionValue;
		upd_risk.data['building_sum_insured'] = qaBuildingSI.value;
		upd_risk.data['contents_sum_insured'] = qaContentsSI.value;
		upd_risk.data['limit'] = qaLimit.value;
		upd_risk.data['professional_fees'] = qaProfFees.value;
		upd_risk.data['consequential_loss'] = qaConsLoss.value;
		upd_risk.data['hurdle'] = qaHurdle.value;
		upd_risk.data['anzsic_code'] = qaAnzsic.inputText;
		upd_risk.data['no_of_buildings'] = qaNoOfBuildings.inputText;
		upd_risk.data['no_levels'] = qaNoLevels.inputText;
		upd_risk.data['walls'] = qaWalls.selectedOptionValue;
		upd_risk.data['roof'] = qaRoof.selectedOptionValue;
		upd_risk.data['year_built'] = qaYearBuilt.inputText;
		upd_risk.data['fire_protection'] = qaFireProtection.selectedOptionValue;
		upd_risk.data['security_protection'] = qaSecurityProtection.selectedOptionValue;
		upd_risk.data['heritage_listed'] = qaHeritage.isChecked;
		upd_risk.data['asbestos'] = qaAsbestos.isChecked;
		upd_risk.data['eps_percentage'] = qaEPS.inputText;
		upd_risk.data['building_type'] = qaBuildingType.selectedOptionValue;
		upd_risk.data['gnaf_pid'] = qaGNAF.inputText;
		upd_risk.data['accurate'] = qaAccurate.isChecked;
		upd_risk.data['latitude'] = qaLatitude.inputText;
		upd_risk.data['longitude'] = qaLongitude.inputText;
		upd_risk.data['risk_include_flood'] = qaIncludeFlood.isChecked;
		upd_risk.data['building_make_safe'] = qaBuildingSI.value * 0.20;
		upd_risk.data['contents_make_safe'] = qaContentsSI.value * 0.10;
		
		current_quote.risks[idx] = upd_risk;
		
		storeValue('current_quote', current_quote, false);
	},
	
	update_perils: (risk) => {
		var current_quote = appsmith.store.current_quote;
		var id = risk.data.quote_risk_id;
		storeValue('asset_list_table_last_idx', idx, false);
		var idx = _.findIndex(current_quote.risks, function(o) { return o.data.quote_risk_id == id; });
		var upd_risk = _.find(current_quote.risks, function(o) { return o.data.quote_risk_id == id; });
		
		upd_risk.perils['gc_flag'] = qagcflag.inputText;
		upd_risk.perils['flood_depth_20'] = qaFloodDepth20.inputText;
		upd_risk.perils['flood_depth_50'] = qaFloodDepth50.inputText;
		upd_risk.perils['flood_depth_100'] = qaFloodDepth100.inputText;
		upd_risk.perils['flood_depth_200'] = qaFloodDepth200.inputText;
		upd_risk.perils['flood_depth_500'] = qaFloodDepth500.inputText;
		upd_risk.perils['flood_depth_1000'] = qaFloodDepth1000.inputText;
		upd_risk.perils['flood_depth_extreme'] = qaFloodDepthExtreme.inputText.inputText;
		upd_risk.perils['flood_ari_gl'] = qaFloodARIGL.inputText;
		upd_risk.perils['flood_ari_gl1m'] = qaFloodARIGL1m.inputText;
		upd_risk.perils['flood_ari_gl2m'] = qaFloodARIGL2m.inputText;
		upd_risk.perils['riverine_percentage'] = qaRiverine.inputText;
		upd_risk.perils['overland_percentage'] = qaOverland.inputText;
		upd_risk.perils['elevation'] = qaElevation.inputText;
		upd_risk.perils['ga_catchment'] = qaCatchment.inputText;
		upd_risk.perils['resolution'] = qaResolution.inputText;
		upd_risk.perils['levee_information'] = qalevee.inputText;
		upd_risk.perils['notes_id1'] =qaNotes1.inputText;
		upd_risk.perils['notes_id2'] = qaNotes2.inputText;
		upd_risk.perils['wfm_coverage_flag'] = qaWFM.inputText;
		upd_risk.perils['fdi'] = qaFDI.inputText;
		upd_risk.perils['veg_type'] = qaVegType.inputText;
		upd_risk.perils['distance'] = qaDistance.inputText;
		upd_risk.perils['bushfire_attack_level'] = qaBAL.inputText;
		upd_risk.perils['bal_category'] = qaBALCategory.text;
		upd_risk.perils['surroundedness'] = qaSurroundedness.inputText;
		upd_risk.perils['windgust_5yr_ari'] = qaWindgust5yr.inputText;
		upd_risk.perils['windgust_10yr_ari'] = qaWindgust10yr.inputText;
		upd_risk.perils['windgust_25yr_ari'] = qaWindgust25yr.inputText;
		upd_risk.perils['windgust_50yr_ari'] = qaWindgust50yr.inputText;
		upd_risk.perils['windgust_100yr_ari'] = qaWindgust100yr.inputText;
		upd_risk.perils['windgust_250yr_ari'] = qaWindgust250yr.inputText;
		upd_risk.perils['windgust_500yr_ari'] = qaWindgust500yr.inputText;
		upd_risk.perils['windgust_1000yr_ari'] = qaWindgust1000yr.inputText;
		upd_risk.perils['adjusted'] = qaAdjusted.inputText;
		upd_risk.perils['sts_risk'] = qaSTSRisk.inputText;
		upd_risk.perils['ot'] = qaOT.inputText;
		upd_risk.perils['radar'] = qaRadar.inputText;
		upd_risk.perils['reanalysis'] = qaReanalysis.inputText;
		upd_risk.perils['obs_size_100'] = qaOBSSize.inputText;
		upd_risk.perils['dist_coast'] = qaDistCoast.inputText;
		upd_risk.perils['terrain_location'] = qaTerrainLocation.inputText;
		upd_risk.perils['terrain_resolution'] = qaTerrainResolution.inputText;
		upd_risk.perils['remoteness_area'] = qaRemotenessArea.inputText;
		
		current_quote.risks[idx] = upd_risk;
		
		storeValue('current_quote', current_quote, false);
		
	},
	
	updateFormulaInput: () => {
		
		// apply to the database
		Update_Formula_Inputs.run()
		.then(
			() => {
				// update the stored value
				var current_quote = appsmith.store.current_quote;
				current_quote['is_rated'] = false;
				current_quote['saved_state'] = true;
				current_quote.detail['xol_premium_est'] = updXOL.inputText;
				current_quote.detail['weight_claims_exp'] = updWeightClaims.inputText;
				current_quote.detail['mutual_profit_margin'] = updProfitMargin.inputText;
				current_quote.detail['declared_building_val_adj'] = updDecValAdjuster.inputText;
				current_quote.detail['loading_discount'] =updLoading.inputText;
				current_quote.detail['claims_hist_to_incl'] = updClaimsHist.inputText;
				current_quote.detail['is_renewal'] = updIsRenewal.isChecked;
				current_quote.detail['product_name'] = updProductName.selectedOptionValue;
				current_quote.detail['claims_aal'] = updClaimsAAL.inputText;
				current_quote.detail['marketing_fee_pct'] = updMarketingFee.inputText;
				current_quote.detail['asset_include_flood'] = updAssetIncludeFlood.selectedOptionValue;
				current_quote.detail['payment_term_loading'] = updPayTermLoading.text;
				current_quote.detail['payment_term'] = updPaymentTerm.selectedOptionValue;
				current_quote.detail['mgmt_fee_pct'] = updMgmtFeePct.text;

				storeValue('current_quote', current_quote, false);
			})
		.catch(() => { 
			showAlert('Update of Formula Inputs has failed. ' + Update_Formula_Inputs.data, 'error');
		});
	},
	
	setPaymentTermLoading: () => {
		var current_quote = appsmith.store.current_quote;
		updPayTermLoading.value = (updPaymentTerm.selectedOptionValue == 'Monthly') ?	 4.5 : 0.0;
		current_quote.detail.payment_term_loading = updPayTermLoading.value;
		storeValue('current_quote', current_quote, false);
	}
	
}