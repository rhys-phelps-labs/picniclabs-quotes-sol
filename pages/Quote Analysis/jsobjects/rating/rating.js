export default {
	
	ATTRITIONAL : 'att',
	LARGE : 'lrg',
	WEATHER : 'wea',
	TAX_RATE : 1.1,
	FLOOD_PROB_20 : (1.0 - Math.exp(-1.0/20.0)),
	FLOOD_PROB_50 : (1.0 - Math.exp(-1.0/50.0)),
	FLOOD_PROB_100 : (1.0 - Math.exp(-1.0/100.0)),
	FLOOD_PROB_200 : (1.0 - Math.exp(-1.0/200.0)),
	FLOOD_PROB_500 : (1.0 - Math.exp(-1.0/500.0)),
	FLOOD_PROB_1000 : (1.0 - Math.exp(-1.0/1000.0)),
	FLOOD_PROB_10000 : (1.0 - Math.exp(-1.0/10000.0)),
	
	
	loadRatingFactors: async () => {
		// load the whole rating factors into a cache and then search the cache for rating.
		await Get_Rating_Factors.run();
		storeValue('rating_factors', Get_Rating_Factors.data);		
	},
		
	insertQuoteRiskRating: (batch) => {
		  const calls = batch.map(risk => Insert_Quote_Risk_Rating.run({ 
				rating_process:  risk.rating.rating_process,
				rating_version: risk.rating.rating_version,
				quote_id: risk.data.quote,
				quote_risk_id: risk.rating.quote_risk_id,
				att_base: risk.rating.att_base,
				att_occupancy: risk.rating.att_occupancy,
				att_sum_insured: risk.rating.att_sum_insured,
				att_hurdle: risk.rating.att_hurdle,
				att_year_built: risk.rating.att_year_built,
				att_fire_protection: risk.rating.att_fire_protection,
				att_security_protection: risk.rating.att_security_protection,
				att_heritage_listed: risk.rating.att_heritage_listed,
				att_asbestos: risk.rating.att_asbestos,
				att_eps: risk.rating.att_eps,
				att_remote: risk.rating.att_remote,
				att_cover_basis: risk.rating.att_cover_basis,
				att_total: risk.rating.att_total,
				lrg_base: risk.rating.lrg_base,
				lrg_occupancy: risk.rating.lrg_occupancy,
				lrg_sum_insured: risk.rating.lrg_sum_insured,
				lrg_hurdle: risk.rating.lrg_hurdle,
				lrg_year_built: risk.rating.lrg_year_built,
				lrg_fire_protection: risk.rating.lrg_fire_protection,
				lrg_security_protection: risk.rating.lrg_security_protection,
				lrg_heritage_listed: risk.rating.lrg_heritage_listed,
				lrg_asbestos: risk.rating.lrg_asbestos,
				lrg_eps: risk.rating.lrg_eps,
				lrg_remote: risk.rating.lrg_remote,
				lrg_cover_basis: risk.rating.lrg_cover_basis,
				lrg_total: risk.rating.lrg_total,
				wea_base: risk.rating.wea_base,
				wea_bushfire: risk.rating.wea_bushfire,
				wea_wind: risk.rating.wea_wind,
				wea_flood: risk.rating.wea_flood,
				wea_occupancy: risk.rating.wea_occupancy,
				wea_sum_insured: risk.rating.wea_sum_insured,
				wea_hurdle: risk.rating.wea_hurdle,
				wea_year_built: risk.rating.wea_year_built,
				wea_fire_protection: risk.rating.wea_fire_protection,
				wea_security_protection: risk.rating.wea_security_protection,
				wea_heritage_listed: risk.rating.wea_heritage_listed,
				wea_asbestos: risk.rating.wea_asbestos,
				wea_eps: risk.rating.wea_eps,
				wea_remote: risk.rating.wea_remote,
				wea_cover_basis: risk.rating.wea_cover_basis,
				wea_total: risk.rating.wea_total,
				cbc_ratio: risk.rating.cbc_ratio,
				cbc_mean: risk.rating.cbc_mean,
				cbc_st_dev: risk.rating.cbc_st_dev,
				cbc_px_att: risk.rating.cbc_px_att,
				cbc_px_lrg: risk.rating.cbc_px_lrg,
				cbc_px_wea: risk.rating.cbc_px_wea,
				att_lrg_wea_total: risk.rating.att_lrg_wea_total,
				total_sum_insured:risk.rating.total_sum_insured
			}));
		return Promise.allSettled(calls);
	},
	
	performQuotePricing: async () => {	
	  
		// set the progress bar to zero
		PricingProgress.progress = 0;
		var progress_increment = 33.33/appsmith.store.current_quote.risks.length;
		
		// cache the rating factors
		await this.loadRatingFactors();
		// clear any previously rated values.
		storeValue('price_summary', null, false);
		// delete any quote_risk_ratings
		await Delete_Quote_Risk_Ratings.run({ quote_id : appsmith.store.current_quote.quote_id});
		
		// get the current quote data
		var current_quote = appsmith.store.current_quote;
		// rate each risk
		for(var r in current_quote.risks) {
			console.log('here');
			var rating_input = {
				data: {
					declared_value_adjustment: appsmith.store.current_quote.detail.declared_building_val_adj,
					isRenewal: appsmith.store.current_quote.detail.is_renewal,
					asset_include_flood: appsmith.store.current_quote.detail.asset_include_flood,
					replacement_basis: current_quote.risks[r].data.replacement_basis,
					building_sum_insured: current_quote.risks[r].data.building_sum_insured,
					contents_sum_insured: current_quote.risks[r].data.contents_sum_insured,
					limit: current_quote.risks[r].data.limit,
					professional_fees: current_quote.risks[r].data.professional_fees,
					consequential_loss: current_quote.risks[r].data.consequential_loss,
					hurdle: current_quote.risks[r].data.hurdle,
					anzsic_code: current_quote.risks[r].data.anzsic_code,
					no_of_buildings: current_quote.risks[r].data.no_of_buildings,
					no_levels: current_quote.risks[r].data.no_levels,
					walls: current_quote.risks[r].data.walls,
					roof: current_quote.risks[r].data.roof,
					year_built: current_quote.risks[r].data.year_built,
					fire_protection: current_quote.risks[r].data.fire_protection,
					security_protection: current_quote.risks[r].data.security_protection,
					heritage_listed: current_quote.risks[r].data.heritage_listed,
					asbestos: current_quote.risks[r].data.asbestos,
					eps_percentage: current_quote.risks[r].data.eps_percentage,
					building_type: current_quote.risks[r].data.building_type,
					latitude : current_quote.risks[r].perils.latitude,
					flood_depth_20: current_quote.risks[r].perils.flood_depth_20,
					flood_depth_50: current_quote.risks[r].perils.flood_depth_50,
					flood_depth_100: current_quote.risks[r].perils.flood_depth_100,
					flood_depth_200: current_quote.risks[r].perils.flood_depth_200,
					flood_depth_500: current_quote.risks[r].perils.flood_depth_500,
					flood_depth_1000: current_quote.risks[r].perils.flood_depth_1000,
					flood_depth_extreme: current_quote.risks[r].perils.flood_depth_extreme,
					bushfire_attack_level: current_quote.risks[r].perils.bushfire_attack_level,
					bal_category: current_quote.risks[r].perils.bal_category,
					windgust_5yr_ari: current_quote.risks[r].perils.windgust_5yr_ari,
					windgust_10yr_ari: current_quote.risks[r].perils.windgust_10yr_ari,
					windgust_25yr_ari: current_quote.risks[r].perils.windgust_25yr_ari,
					windgust_50yr_ari: current_quote.risks[r].perils.windgust_50yr_ari,
					windgust_100yr_ari: current_quote.risks[r].perils.windgust_100yr_ari,
					windgust_250yr_ari: current_quote.risks[r].perils.windgust_250yr_ari,
					windgust_500yr_ari: current_quote.risks[r].perils.windgust_500yr_ari,
					windgust_1000yr_ari: current_quote.risks[r].perils.windgust_1000yr_ari,
					sts_risk: current_quote.risks[r].perils.sts_risk,
					remoteness_area: current_quote.risks[r].perils.remoteness_area,
					risk_include_flood: current_quote.risks[r].data.risk_include_flood
				}
			};
			//console.log('Rating Input: ' + JSON.stringify(rating_input));
			
			var price = await rating.rate_protected_address(rating_input);
			price['quote_risk_id'] = current_quote.risks[r].data.quote_risk_id;
			current_quote.risks[r].rating = price;

			//console.log(risks[r]);
			PricingProgress.progress += progress_increment;
		}

		PricingProgress.progress = 50;

		// price whole quote
		
		var priceSummary = appsmith.store.price_summary;
		current_quote.detail['risk_total'] = priceSummary.att_risk_total + priceSummary.lrg_risk_total + priceSummary.wea_risk_total;
		current_quote.detail['att_risk_total'] = priceSummary.att_risk_total;
		current_quote.detail['lrg_risk_total'] = priceSummary.lrg_risk_total;
		current_quote.detail['wea_risk_total'] = priceSummary.wea_risk_total;
		current_quote.detail['xol_att'] = priceSummary.att_risk_total * (current_quote.detail.xol_premium_est / 100);
		current_quote.detail['xol_lrg'] = priceSummary.lrg_risk_total * (current_quote.detail.xol_premium_est / 100);
		current_quote.detail['xol_wea'] = priceSummary.wea_risk_total * (current_quote.detail.xol_premium_est / 100);
		current_quote.detail['xol_total'] = current_quote.detail.xol_att + current_quote.detail.xol_lrg + current_quote.detail.xol_wea;
		current_quote.detail['profit_att'] = priceSummary.att_risk_total * (current_quote.detail.mutual_profit_margin / 100);
		current_quote.detail['profit_lrg'] = priceSummary.lrg_risk_total * (current_quote.detail.mutual_profit_margin / 100);
		current_quote.detail['profit_wea'] = priceSummary.wea_risk_total * (current_quote.detail.mutual_profit_margin / 100);
		current_quote.detail['profit_total'] = current_quote.detail.profit_att + current_quote.detail.profit_lrg + current_quote.detail.profit_wea;
		current_quote.detail['xol_weighted_contribution'] = current_quote.detail.xol_total * ( 1.0 - (current_quote.detail.weight_claims_exp/100)) + (current_quote.detail.claims_aal * (current_quote.detail.weight_claims_exp/100) * (current_quote.detail.xol_premium_est/100));
		current_quote.detail['profit_weighted_contribution'] = current_quote.detail.profit_total * ( 1.0 - (current_quote.detail.weight_claims_exp/100)) + (current_quote.detail.claims_aal * (current_quote.detail.weight_claims_exp/100) * (current_quote.detail.mutual_profit_margin/100));
		
		await this.calculateManagementFee(current_quote.detail.product_name);	
		current_quote.detail['total_contribution'] = (priceSummary['mgmt_fee_total'] + 
																									current_quote.detail.xol_weighted_contribution + 
																									current_quote.detail.profit_weighted_contribution + 
																			 						(current_quote.detail.risk_total * 
																									 (1.0 - (current_quote.detail.weight_claims_exp/100))) + 
																									current_quote.detail.claims_aal * 
																									1.1 *
																									(current_quote.detail.weight_claims_exp/100)) / 
																			 					  (1.0 - (current_quote.detail.marketing_fee_pct/100)) * 
																									(1.0 + (current_quote.detail.loading_discount/100 )) *
																									(1.0 + (current_quote.detail.payment_term_loading/100));
		
		current_quote.detail['total_contribution_excl_gst'] = current_quote.detail.total_contribution / 1.1;
		current_quote.detail['gst'] = current_quote.detail.total_contribution_excl_gst * 0.1;
		current_quote.detail['marketing_fee_amt'] = current_quote.detail.total_contribution_excl_gst * (current_quote.detail.marketing_fee_pct / 100);
		current_quote.detail['base_contribution'] = current_quote.detail.total_contribution_excl_gst * (1.0 - current_quote.detail.marketing_fee_pct/ 100);
		
		current_quote.detail['total_properties_tropic'] = priceSummary['total_properties_tropic'];
		current_quote.detail['total_properties_nontropic'] = priceSummary['total_properties_nontropic'];
		current_quote.detail['tropics_total'] = priceSummary['tropics_total'];
		current_quote.detail['nontropics_total'] = priceSummary['nontropics_total'];
		current_quote.detail['tropics_1_total'] = priceSummary['tropics_1_total'];
		current_quote.detail['tropics_sub_total'] = priceSummary['tropics_sub_total'];
		current_quote.detail['nontropics_1_total'] = priceSummary['nontropics_1_total'];
		current_quote.detail['nontropics_sub_total'] = priceSummary['nontropics_sub_total'];
		current_quote.detail['declared_total'] = priceSummary['declared_total'];
		current_quote.detail['declared_limit_total'] = priceSummary['declared_limit_total'];
		current_quote.detail['declared_by_basis'] = priceSummary['declared_by_basis'];
		current_quote.detail['declared_contents_total'] = priceSummary['declared_contents_total'];
		current_quote.detail['declared_cons_loss_total'] = priceSummary['declared_cons_loss_total'];
		current_quote.detail['mgmt_fee_tropics_1_total'] = priceSummary['mgmt_fee_tropics_1_total'];
		current_quote.detail['mgmt_fee_tropics_sub_total'] = priceSummary['mgmt_fee_tropics_sub_total'];
		current_quote.detail['mgmt_fee_gst_tropics_total'] = priceSummary['mgmt_fee_gst_tropics_total'];
		current_quote.detail['mgmt_fee_tropics_total'] = priceSummary['mgmt_fee_tropics_total'];
		current_quote.detail['mgmt_fee_nontropics_1_total'] = priceSummary['mgmt_fee_nontropics_1_total'];
		current_quote.detail['mgmt_fee_nontropics_sub_total'] = priceSummary['mgmt_fee_nontropics_sub_total'];
		current_quote.detail['mgmt_fee_gst_nontropics_total'] = priceSummary['mgmt_fee_gst_nontropics_total'];
		current_quote.detail['mgmt_fee_nontropics_total'] = priceSummary['mgmt_fee_nontropics_total'];
		current_quote.detail['mgmt_fee_gst_total'] = priceSummary['mgmt_fee_gst_total'];
		current_quote.detail['mgmt_fee_total'] = priceSummary['mgmt_fee_total'];
		current_quote.detail['mgmt_fee_1_total'] = priceSummary['mgmt_fee_1_total'];
		current_quote.detail['mgmt_fee_sub_total'] = priceSummary['mgmt_fee_sub_total'];
		current_quote.detail['asbestos_count'] = priceSummary['asbestos_count'];
		current_quote.detail['heritage_listed_count'] = priceSummary['heritage_listed_count'];
		current_quote.detail['commercial_count'] = priceSummary['commercial_count'];
		
		// take all risks and save the data to quote_risk_ratings
		var batches = _.chunk(current_quote.risks, 10);
		for(var b in batches) {
			var resp = await this.insertQuoteRiskRating(batches[b]);
		}
		
		
		current_quote.is_rated = true;
		PricingProgress.progress = 90;
		await storeValue('current_quote', current_quote, false);
		await Upd_Quote_Pricing.run();
				
	},
	
	rate_protected_address: (input) => {
		var price = {};
		
		if(appsmith.store.rating_factors == null) {
			price['error'] = 'rating_factors could not be loaded. Rating has been aborted';
			return price;
		}
		
		price['rating_process'] = 'js appsmith';
		price['rating_version'] = 'v1.0';
		price['quote_risk_id'] = input.data.quote_id;
		price['valuation'] = input.data.limit + input.data.contents_sum_insured;
		price['total_sum_insured'] = (input.data.building_sum_insured + input.data.contents_sum_insured + input.data.consequential_loss) * input.data.declared_value_adjustment;
		
		if (input.data.building_sum_insured == 0 ) {
			price['cbc_ratio'] = 1;		
		} else {
			price['cbc_ratio'] = input.data.limit / input.data.building_sum_insured;
		}
		price['cbc_mean'] = input.data.building_sum_insured / 30;
		price['cbc_st_dev'] = input.data.building_sum_insured / 3;
		price['cbc_px_att'] = (price.valuation > 0) ? jStat.normal.cdf(price.valuation,price.cbc_mean, price.cbc_st_dev) : 0;
		price['cbc_px_lrg'] = this.getPXLarge(input, price.valuation, price.cbc_mean, price.cbc_st_dev, price.cbc_px_att);
		price['cbc_px_wea'] = this.getPXWeather(input, price.cbc_px_att);
		
		
		price['att_base'] = (price.total_sum_insured * 0.016) / 100;
		price['att_occupancy'] = this.getOccupancyFactor(input.data.anzsic_code, this.ATTRITIONAL);
		price['att_sum_insured'] = 1.0 / ((Math.pow(price.total_sum_insured,(1.0/5.0)) / 50) + (Math.pow(price.total_sum_insured, (1.0/7.0)) / 10.0));
		price['att_hurdle'] = 1 - input.data.hurdle / (500000 / 2);
		price['att_year_built'] = this.getYearBuiltFactor(input.data.year_built, this.ATTRITIONAL);
		price['att_fire_protection'] = this.getFireProtectionFactor(input.data.fire_protection, this.ATTRITIONAL); 
		price['att_security_protection'] = this.getSecurityProtectionFactor(input.data.security_protection, this.ATTRITIONAL); 
		price['att_heritage_listed'] = this.getHeritageListedFactor(input.data.heritage_listed, this.ATTRITIONAL);
		price['att_asbestos'] = this.getAsbestosFactor(input.data.asbestos, this.ATTRITIONAL);
		price['att_eps'] = this.getEPSFactor(input.data.eps_percentage, this.ATTRITIONAL);
		price['att_remote'] = this.getRemotenessFactor(input.data.remoteness_area, this.ATTRITIONAL);
		price['att_cover_basis'] = this.getReplacementBasisFactor(input.data.replacement_basis, this.ATTRITIONAL, price.cbc_px_att, input);
		price['att_total'] = price.att_base * price.att_occupancy * price.att_sum_insured * price.att_hurdle * price.att_year_built * price.att_fire_protection * price.att_security_protection * price.att_heritage_listed * price.att_asbestos * price.att_eps * price.att_remote * price.att_cover_basis;


		price['lrg_base'] = (price.total_sum_insured * 0.025) / 100;
		price['lrg_occupancy'] = this.getOccupancyFactor(input.data.anzsic_code, this.LARGE);
		price['lrg_sum_insured'] = (price.total_sum_insured >= 500000) ? (1.0 / (Math.pow(price.total_sum_insured,(1.0/6.0)) / 11.0)) : 0;
		price['lrg_hurdle'] = 1.0;
		price['lrg_year_built'] = this.getYearBuiltFactor(input.data.year_built, this.LARGE);
		price['lrg_fire_protection'] = this.getFireProtectionFactor(input.data.fire_protection, this.LARGE); 
		price['lrg_security_protection'] = this.getSecurityProtectionFactor(input.data.security_protection, this.LARGE); 
		price['lrg_heritage_listed'] = this.getHeritageListedFactor(input.data.heritage_listed, this.LARGE);
		price['lrg_asbestos'] = this.getAsbestosFactor(input.data.asbestos, this.LARGE);
		price['lrg_eps'] = this.getEPSFactor(input.data.eps_percentage, this.LARGE);
		price['lrg_remote'] = this.getRemotenessFactor(input.data.remoteness_area, this.LARGE);
		price['lrg_cover_basis'] = this.getReplacementBasisFactor(input.data.replacement_basis, this.LARGE, price.cbc_px_lrg, input);
		price['lrg_total'] = price.lrg_base * price.lrg_occupancy * price.lrg_sum_insured * price.lrg_hurdle * price.lrg_year_built * price.lrg_fire_protection * price.lrg_security_protection * price.lrg_heritage_listed * price.lrg_asbestos * price.lrg_eps * price.lrg_remote * price.lrg_cover_basis;

		price['wea_base'] = (price.total_sum_insured * 0.03) / 100 * input.data.sts_risk;
		
		if (input.data.asset_include_flood == 'Quote' || (input.data.asset_include_flood == 'Asset' && input.data.risk_include_flood == true)) {
			price['wea_flood'] = this.getFloodPeril(price.total_sum_insured, input);	
		} else {
			price['wea_flood'] = 0.00;
		} 
		
		price['wea_bushfire'] = this.getBushfirePeril(input, price.cbc_ratio);
		price['wea_wind'] = this.getWindPeril(price.total_sum_insured, input);
		price['wea_occupancy'] = this.getOccupancyFactor(input.data.anzsic_code, this.WEATHER);
		price['wea_sum_insured'] = 1.0 / ((Math.pow(price.total_sum_insured,(1.0/5.0)) / 50) + (Math.pow(price.total_sum_insured, (1.0/7.0)) / 10.0)); 
		price['wea_hurdle'] = Math.max(0.0,(1.0 - input.data.hurdle/(price.total_sum_insured/2.0)));
		price['wea_year_built'] = this.getYearBuiltFactor(input.data.year_built, this.WEATHER);
		price['wea_fire_protection'] = this.getFireProtectionFactor(input.data.fire_protection, this.WEATHER); 
		price['wea_security_protection'] = this.getSecurityProtectionFactor(input.data.security_protection, this.WEATHER); 
		price['wea_heritage_listed'] = this.getHeritageListedFactor(input.data.heritage_listed, this.WEATHER);
		price['wea_asbestos'] = this.getAsbestosFactor(input.data.asbestos, this.WEATHER);
		price['wea_eps'] = this.getEPSFactor(input.data.eps_percentage, this.WEATHER);
		price['wea_remote'] = this.getRemotenessFactor(input.data.remoteness_area, this.WEATHER);
		price['wea_cover_basis'] = this.getReplacementBasisFactor(input.data.replacement_basis, this.WEATHER, price.cbc_px_wea, input);
		price['wea_total'] = (price.wea_base + price.wea_flood + price.wea_bushfire + price.wea_wind) * (
													price.wea_occupancy * price.wea_sum_insured * price.wea_hurdle * price.wea_year_built * price.wea_fire_protection * price.wea_security_protection * price.wea_heritage_listed * price.wea_asbestos * price.wea_eps * price.wea_remote * price.wea_cover_basis
													);		
		price['att_lrg_wea_total'] = price.att_total + price.lrg_total + price.wea_total;
		
		this.priceSummaryProcess(price, input);
		
		return price;	
	},
	
	retCalcType: (rating_response, calc_type) => {
		if( calc_type == this.ATTRITIONAL ) { return rating_response[0].att_factor;}
		if( calc_type == this.LARGE ) { return rating_response[0].lrg_factor;}
		if( calc_type == this.WEATHER ) { return rating_response[0].wea_factor;}
		
	} ,
	
	getOccupancyFactor: (anzsic_code, calc_type) => {
		// exact match on the ANZSIC code. 
	  // if no result from exact match, search for the default (0) anszic code
	  var factor = 0.0;
		
		if(anzsic_code != null) {
			var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'occupancy', idx_text: anzsic_code});
			factor = this.retCalcType(factors, calc_type);
		}
		return factor;
	},
		
		
	test_getOccupancyFactor: () => {
		console.log(this.getOccupancyFactor(6711, this.ATTRITIONAL));  // 1.2
	},
	
	getYearBuiltFactor: (year_built, calc_type) => {
		var factor = 0.0;
		
		if(year_built != null) {
			var factors = _.filter(appsmith.store.rating_factors, function(o) { return o.lookup_name == 'year built' && year_built >= o.idx_range_start && year_built < o.idx_range_end;});
			factor = this.retCalcType(factors, calc_type);				
		}
		return factor;
	},
	
	test_getYearBuiltFactor: () => {
		console.log(this.getYearBuiltFactor(2010, this.ATTRITIONAL));
		console.log(this.getYearBuiltFactor(1981, this.ATTRITIONAL));
	},
	
	getFireProtectionFactor: (fire_protection, calc_type) => {
		var factor = 0.0;
		
		if(fire_protection != null) {
			var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'fire protection', idx_number: fire_protection});
			factor = this.retCalcType(factors, calc_type);
		}
		return factor;		
	},
	
	test_getFireProtectionFactor: () => {
		console.log(this.getFireProtectionFactor(0, this.ATTRITIONAL));
		console.log(this.getFireProtectionFactor(1, this.ATTRITIONAL));
		console.log(this.getFireProtectionFactor(2, this.ATTRITIONAL));
		console.log(this.getFireProtectionFactor(3, this.ATTRITIONAL));		
	},
	
	getSecurityProtectionFactor: (security_protection, calc_type) => {
		var factor = 0.0;
		
		if(security_protection != null) {
			var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'security protection', idx_number: security_protection});
			factor = this.retCalcType(factors, calc_type);
		}
		return factor;		
	},
	
	test_getSecurityProtectionFactor: () => {
		console.log(this.getSecurityProtectionFactor(0, this.ATTRITIONAL));
		console.log(this.getSecurityProtectionFactor(1, this.ATTRITIONAL));
		console.log(this.getSecurityProtectionFactor(2, this.ATTRITIONAL));
		console.log(this.getSecurityProtectionFactor(3, this.ATTRITIONAL));		
	},
	
	getHeritageListedFactor: (heritage_listed, calc_type) => {
		var factor = 0.0;
		
		if(heritage_listed !== null) {
			var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'heritage listed', idx_boolean: heritage_listed});
			factor = this.retCalcType(factors, calc_type);
		}
		return factor;
	},
	
	test_getHeritageListedFactor: () => {
		//console.log(this.getHeritageListedFactor(true, this.ATTRITIONAL));
		console.log(this.getHeritageListedFactor(false, this.ATTRITIONAL));
	},
	
	getAsbestosFactor: (asbestos, calc_type) => {
		var factor = 0.0;
		
		if(asbestos != null) {
			var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'asbestos', idx_boolean: asbestos});
			factor = this.retCalcType(factors, calc_type);
		}
		return factor;
	},
	
	test_getAsbestosFactor: () => {
		console.log(this.getAsbestosFactor(true, this.ATTRITIONAL));
		console.log(this.getAsbestosFactor(false, this.ATTRITIONAL));
	},
	
	getEPSFactor: (eps, calc_type) => {
		var factor = 0.0;
		
		if(eps != null) {
			if( eps == 0.0) {
				factor = 1.0;
			} else {
				var factors = _.filter(appsmith.store.rating_factors, function(o) { return o.lookup_name == 'eps' && eps >= o.idx_range_start && eps < o.idx_range_end;});		
				factor = this.retCalcType(factors, calc_type);
			}
		}
		return factor;
	},
	
	test_getEPSFactor:  () => {
		console.log(this.getEPSFactor(10, this.ATTRITIONAL));
		console.log(this.getEPSFactor(50, this.ATTRITIONAL));
	},
	
	
	getRemotenessFactor: (remoteness_area, calc_type) => {
		var factor = 0.0;
		
		if(remoteness_area != null) {
			var factors_area = _.filter(appsmith.store.rating_factors, { lookup_name: 'remoteness area', idx_text: remoteness_area});
			var factors =      _.filter(appsmith.store.rating_factors, { lookup_name: 'remoteness', idx_boolean: factors_area[0].idx_boolean});
			factor = this.retCalcType(factors, calc_type);
		}
		return factor;
	},
	
	test_getRemotenessFactor: () => {
		console.log(this.getRemotenessFactor('Remote Australia', this.ATTRITIONAL));
		console.log(this.getRemotenessFactor('Inner RegionalRemote Australia', this.ATTRITIONAL));
	},
	
	getReplacementBasisFactor: (replacement_basis, calc_type, cbc_px, input) => {
		
		var contents_factor = 0.0;
		var con_loss_factor = 0.0;
	  var replacement_basis_factor = 0.0;
		
		if(replacement_basis != null) {
			var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'replacement basis', idx_text: replacement_basis});
			
			factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'replacement basis', idx_text: 'Contents Only'});
			contents_factor = this.retCalcType(factors, calc_type);
			
			factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'replacement basis', idx_text: 'Consequential Loss'});
			con_loss_factor = this.retCalcType(factors, calc_type);
			
		}
		
		var building = input.data.building_sum_insured * cbc_px;
		var contents = input.data.contents_sum_insured * contents_factor;
		var consequential_loss = input.data.consequential_loss * con_loss_factor;
		replacement_basis_factor = (building + contents + consequential_loss) / (input.data.building_sum_insured + input.data.contents_sum_insured + input.data.consequential_loss);
		
		return replacement_basis_factor;
	},
	
	test_getReplacementBasisFactor: () => {
		var input = { data : {
			limit: 100,
			building_sum_insured: 100,
			contents_sum_insured: 100,
			consequential_loss : 100
		}}
		console.log(this.getReplacementBasisFactor('Full Replacement', this.ATTRITIONAL, input));
	},
	
	
	getFloodPeril: (total_sum_insured, input) => {
		var peril = 0.0;
		var fpb = 0.0;
		
		var dmg20 = 0.0;
		var dmg50 = 0.0;
		var dmg100 = 0.0;
		var dmg200 = 0.0;
		var dmg500 = 0.0;
		var dmg1000 = 0.0;
		var dmg10000 = 0.0;
		
		var r1 = 0.0;
		var D1 = 0.0;
		
		if(input.data.building_type.toUpperCase() == 'COMMERCIAL') {
			r1 = 0.540540541;
			D1 = 0.5;
		} else {
			if(input.data.no_levels == 1) {
				if( input.data.walls.toUpperCase() == 'BRICK' || input.data.walls.toUpperCase() == 'CONCRETE' || input.data.walls.toUpperCase() == 'STONE' || input.data.walls.toUpperCase() == 'UNKNOWN' ) {
					r1 = 0.68965517;
					D1 = 0.6;
				} else {
					r1 = 0.64516129;
					D1 = 0.7;
				}
			} else {
				if( input.data.walls.toUpperCase() == 'BRICK' || input.data.walls.toUpperCase() == 'CONCRETE' || input.data.walls.toUpperCase() == 'STONE' || input.data.walls.toUpperCase() == 'UNKNOWN' ) {
					r1 = 0.5;
					D1 = 0.34;
				} else {
					r1 = 0.43478261;
					D1 = 0.42;
				}
			}
		}
	
		if(input.data.flood_depth_20 > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_20/3.0)), r1);
			dmg20 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_20;
		}
		
		if(input.data.flood_depth_50 > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_50/3.0)), r1);
			dmg50 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_50;
		}
		
		if(input.data.flood_depth_100 > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_100/3.0)), r1);
			dmg100 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_100;
		}
		
		if(input.data.flood_depth_200 > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_200/3.0)), r1);
			dmg200 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_200;
		}
		
		if(input.data.flood_depth_500 > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_500/3.0)), r1);
			dmg500 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_500;
		}
		
		if(input.data.flood_depth_1000 > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_1000/3.0)), r1);
			dmg1000 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_1000;
		}
		
		if(input.data.flood_depth_extreme > 0.0) {
			fpb = Math.pow( Math.min(1.0, (input.data.flood_depth_extreme/3.0)), r1);
			dmg10000 = (fpb * D1 * ( 1.0 / input.data.no_levels) * total_sum_insured *  1.5) * this.FLOOD_PROB_10000;
		}
		
		peril = dmg20 + dmg50 + dmg100 + dmg500 + dmg1000 + dmg10000;
		return peril;
	},
	
	test_getFloodPeril: () => {
		this.FLOOD_PROB_20 = (1.0 - Math.exp(-1.0/20.0));
		this.FLOOD_PROB_50 = (1.0 - Math.exp(-1.0/50.0));
		this.FLOOD_PROB_100 = (1.0 - Math.exp(-1.0/100.0));
		this.FLOOD_PROB_200 = (1.0 - Math.exp(-1.0/200.0));
		this.FLOOD_PROB_500 = (1.0 - Math.exp(-1.0/500.0));
		this.FLOOD_PROB_1000 = (1.0 - Math.exp(-1.0/1000.0));
		this.FLOOD_PROB_10000 = (1.0 - Math.exp(-1.0/10000.0));
		
		var input = {
			data: {
				building_type: 'Commercial',
				no_levels: 1,
				walls: 'Brick',
				flood_depth_20: 0.25,
				flood_depth_50: 0.25,
				flood_depth_100: 0.25,
				flood_depth_200: 0.25,
				flood_depth_500: 0.25,
				flood_depth_1000: 0.25,
				flood_depth_extreme: 0.25,
			}
		};
		
		console.log(this.getFloodPeril(1000000, input));
	},
	
	getBushfirePeril: (input, cbc_ratio) => {
		
		var fire_risk = 'low';
		if (input.data.walls.toUpperCase() == 'BRICK' || input.data.walls.toUpperCase() == 'CONCRETE' || input.data.walls.toUpperCase() == 'STONE') {
			fire_risk = 'low';
		} else if (input.data.walls.toUpperCase() == 'EPS' || input.data.walls.toUpperCase() == 'TIMBER' || input.data.walls.toUpperCase() == 'WOOD') { 
			fire_risk = 'high';
		} else {
			fire_risk = 'medium';
		}
		
		var factors = _.filter(appsmith.store.rating_factors, { lookup_name: 'bushfire damage ratio', idx_number: input.data.bal_category, idx_text: fire_risk});
		var bal_factor = factors[0].single_factor;
		
		var rod = 0;
		if (input.data.replacement_basis == 'Make Safe') {
			rod = input.data.limit + (input.data.contents_sum_insured * 0.1);	
		} else {
			rod = (input.data.limit * 0.20) + (input.data.contents_sum_insured * 0.1);
		}
		
		var bushfire_sum_insured = input.data.building_sum_insured + input.data.contents_sum_insured + rod + input.data.professional_fees + input.data.consequential_loss;
		var peril = bal_factor * bushfire_sum_insured * input.data.declared_value_adjustment * cbc_ratio;
		return peril;		
	},
	
	test_getBushfirePeril: () => {
		var input = {
			data : {
				walls: 'Brick',
				building_sum_insured: 400000,
				limit: 400000,
				contents_sum_insured: 10000,
				consequential_loss: 0,
				professional_fees: 0,
				bal_category: 5,
				declared_value_adjustment: 1.1
			}
		};
		console.log(this.getBushfirePeril(input, 1));
	},
	
	getWindDamageRatio: (windgust) => {
		var factor = 0.0;
		if(windgust) {
			var factors = _.filter(appsmith.store.rating_factors, function(o) { return o.lookup_name == 'wind speed' && windgust >= o.idx_range_start && windgust < o.idx_range_end;});		
			factor = factors[0].single_factor;
		}
		return factor;
	},
	
	getWindPeril: (total_sum_insured, input) => {
		var prb5 = 1.0/5.0;
		var prb10 = 1.0/10.0;
		var prb25 = 1.0/25.0;
		var prb50 = 1.0/50.0;
		var prb100 = 1.0/100.0;
		var prb250 = 1.0/250.0;
		var prb500 = 1.0/500.0;
		var prb1000 = 1.0/1000.0;
		
		var dmg5 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_5yr_ari) * prb5;
		var dmg10 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_10yr_ari) * prb10;
		var dmg25 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_25yr_ari) * prb25;
		var dmg50 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_50yr_ari) * prb50;
		var dmg100 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_100yr_ari) * prb100;
		var dmg250 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_250yr_ari) * prb250;
		var dmg500 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_500yr_ari) * prb500;
		var dmg1000 = total_sum_insured * this.getWindDamageRatio(input.data.windgust_1000yr_ari) * prb1000;
		
		var peril = dmg5 + dmg10 + dmg25 + dmg50 + dmg100 + dmg250 + dmg500 + dmg1000;
		return peril;
	},
	
	
	test_getWindPeril: () => {
		var input = {
			data : {
				windgust_5yr_ari: 100,
				windgust_10yr_ari: 19,
				windgust_25yr_ari: 21,
				windgust_50yr_ari: 32,
				windgust_100yr_ari: 33,
				windgust_250yr_ari: 50,
				windgust_500yr_ari: 70,
				windgust_1000yr_ari: 90
			}
		};
		console.log(this.getWindPeril(1000000, input));
	},
	
	
	getPXLarge: (input, valuation, mean, stdev, cbc_px_att) => {
		var factor = 0.0;
		var large_limit = 500000;
		if( input.data.replacement_basis == 'Full Replacement') {
			factor = 1.05;
		}	else {
			if(valuation < large_limit) {
				factor = 0.0
			} else {
				var normdist_limit = jStat.normal.cdf(large_limit, mean, stdev );
				factor = (cbc_px_att - normdist_limit) / normdist_limit;
			}
		}
		return factor;
	},
	
	getPXWeather: (input, cbc_px_att) => {
		var factor = 0.0;
		if (input.data.replacement_basis == 'Full Replacement') {
			factor = 1.05;
		} else {
			factor = cbc_px_att;
		}
		return factor;
	},
	
	
	priceSummaryProcess: (price, input) => {
		
		var priceSummary = appsmith.store.price_summary;
		if(!priceSummary) {
			priceSummary = {};
			priceSummary['total_properties_tropic'] = 0;
			priceSummary['total_properties_nontropic'] = 0;
			priceSummary['tropics_total'] = 0;
			priceSummary['nontropics_total'] = 0;
			priceSummary['tropics_1_total'] = 0;
			priceSummary['tropics_sub_total'] = 0;
			priceSummary['nontropics_1_total'] = 0;
			priceSummary['nontropics_sub_total'] = 0;
			priceSummary['mgmt_fee_tropics_1_total'] = 0;
			priceSummary['mgmt_fee_tropics_sub_total'] = 0;
			priceSummary['mgmt_fee_nontropics_1_total'] = 0;
			priceSummary['mgmt_fee_nontropics_sub_total'] = 0;
			priceSummary['mgmt_fee_tropics_total'] = 0;
			priceSummary['mgmt_fee_gst_tropics_total'] = 0;
			priceSummary['mgmt_fee_nontropics_total'] = 0;
			priceSummary['mgmt_fee_gst_nontropics_total'] = 0;
			
			priceSummary['mgmt_fee_gst_total'] = 0;
			priceSummary['mgmt_fee_total'] = 0;
						
			priceSummary['declared_total'] = 0;
			priceSummary['declared_limit_total'] = 0;
			priceSummary['declared_by_basis'] = 0;
			priceSummary['declared_contents_total'] = 0;
			priceSummary['declared_cons_loss_total'] = 0;
			
			priceSummary['att_risk_total'] = 0;
			priceSummary['lrg_risk_total'] = 0;
			priceSummary['wea_risk_total'] = 0;
			
			priceSummary['asbestos_count'] = 0;
			priceSummary['heritage_listed_count'] = 0;
			priceSummary['commercial_count'] = 0;
			
						
		}
		
		// tropics totals
		if( price.latitude > -26.0) {
			// tropics
			priceSummary['total_properties_tropic'] += 1;
			priceSummary['tropics_total'] += price.valuation;
			
			if(input.data.isRenewal) {
				priceSummary['tropics_sub_total'] += price.valuation;
			} else {
				priceSummary['tropics_1_total'] += price.valuation;
			}
			
		} else {
			// nontropics
			priceSummary['total_properties_nontropic'] += 1;
			priceSummary['nontropics_total'] += price.valuation;
			
			if(input.data.isRenewal) {
				priceSummary['nontropics_sub_total'] += price.valuation;
			} else {
				priceSummary['nontropics_1_total'] += price.valuation;
			}
			
		}
		if(input.data.asbestos) { priceSummary['asbestos_count'] += 1; }
		if(input.data.heritage_listed) { priceSummary['heritage_listed_count'] += 1; }
		if(input.data.building_type == 'Commercial') { priceSummary['commercial_count'] += 1; }
		
		priceSummary['declared_total'] += input.data.building_sum_insured;
		priceSummary['declared_limit_total'] += input.data.limit;
		priceSummary['declared_by_basis'] += price.valuation;
		priceSummary['declared_contents_total'] += input.data.contents_sum_insured;
		priceSummary['declared_cons_loss_total'] += input.data.consequential_loss;
		priceSummary['att_risk_total'] += price.att_total;
		priceSummary['lrg_risk_total'] += price.lrg_total;
		priceSummary['wea_risk_total'] += price.wea_total;			
		
		storeValue('price_summary', priceSummary, false);
		
	},
	
	calculateManagementFee: async (product_name) => {
		
		var priceSummary = appsmith.store.price_summary;
		
		// lookup management_fees table using range for the product TypeError
		// must be completed for both tropics and nontropic locations
		
		if( priceSummary.tropics_1_total > 0 ) {
			await Get_Mgmt_Fee.run({product_name: product_name, lookup_value: priceSummary.tropics_1_total});
			priceSummary['mgmt_fee_tropics_1_total'] = Get_Mgmt_Fee.data[0].tropics_year1;
		}
	
		if( priceSummary.tropics_sub_total > 0 ) {
			await Get_Mgmt_Fee.run({product_name: product_name, lookup_value: priceSummary.tropics_sub_total});
			priceSummary['mgmt_fee_tropics_sub_total'] = Get_Mgmt_Fee.data[0].tropics_subsequent;
		}
		
		if (priceSummary.nontropics_1_total > 0 ) {
			await Get_Mgmt_Fee.run({product_name: product_name, lookup_value: priceSummary.nontropics_1_total});
			priceSummary['mgmt_fee_nontropics_1_total'] = Get_Mgmt_Fee.data[0].nontropics_year1;	
		}
		
		if (priceSummary.nontropics_sub_total > 0) {
			await Get_Mgmt_Fee.run({product_name: product_name, lookup_value: priceSummary.nontropics_sub_total});
			priceSummary['mgmt_fee_nontropics_sub_total'] = Get_Mgmt_Fee.data[0].nontropics_subsequent;
		}
		
		priceSummary['mgmt_fee_tropics_total'] = (priceSummary.mgmt_fee_tropics_1_total + priceSummary.mgmt_fee_tropics_sub_total) * 1.1;
		priceSummary['mgmt_fee_gst_tropics_total'] = (priceSummary.mgmt_fee_tropics_1_total + priceSummary.mgmt_fee_tropics_sub_total) * 0.1;
		priceSummary['mgmt_fee_nontropics_total'] = (priceSummary.mgmt_fee_nontropics_1_total + priceSummary.mgmt_fee_nontropics_sub_total) * 1.1;
		priceSummary['mgmt_fee_gst_nontropics_total'] = (priceSummary.mgmt_fee_nontropics_1_total + priceSummary.mgmt_fee_nontropics_sub_total) * 0.1;
		priceSummary['mgmt_fee_1_total'] = priceSummary.mgmt_fee_tropics_1_total + priceSummary.mgmt_fee_nontropics_1_total;
		priceSummary['mgmt_fee_sub_total'] = priceSummary.mgmt_fee_tropics_sub_total + priceSummary.mgmt_fee_nontropics_sub_total;
		priceSummary['mgmt_fee_total'] = priceSummary.mgmt_fee_tropics_total + priceSummary.mgmt_fee_nontropics_total;
		priceSummary['mgmt_fee_gst_total'] = priceSummary.mgmt_fee_gst_tropics_total + priceSummary.mgmt_fee_gst_nontropics_total;
		
		await storeValue('price_summary', priceSummary, false);
		
		console.log('mgmt fee: ' + JSON.stringify(priceSummary));
		
	},
	
	
	test_rate_protected_address: () => {
		var input = {
			data : {
				declared_value_adjustment: 1.2,
				replacement_basis: 'Full Replacement',
				building_sum_insured: 450000.00,
				contents_sum_insured: 15000,
				limit: 0,
				professional_fees: 250000,
				consequential_loss: 10400,
				hurdle: 1000,
				anzsic_code: 6711,
				no_of_buildings: 1,
				no_levels: 1,
				walls: 'Brick',
				roof: 'Tiles',
				year_built: 2010,
				fire_protection: 1,
				security_protection: 1,
				heritage_listed: false,
				asbestos: false,
				eps_percentage: 0,
				building_type: 'Commercial',
				flood_depth_20: 0.0,
				flood_depth_50: 0.0,
				flood_depth_100: 0.0,
				flood_depth_200: 0.0,
				flood_depth_500: 0.0,
				flood_depth_1000: 0.0,
				flood_depth_extreme: 0.0,
				bushfire_attack_level: 68.8,
				bal_category: 1,
				windgust_5yr_ari: 0,
				windgust_10yr_ari: 5.150,
				windgust_25yr_ari: 9.350,
				windgust_50yr_ari: 13.020,
				windgust_100yr_ari: 16.440,
				windgust_250yr_ari: 20.650,
				windgust_500yr_ari: 24.280,
				windgust_1000yr_ari: 28.010,
				sts_risk: 0.780,
				remoteness_area : 'Inner Regional Australia'
			}
		};
		console.log('PRICE: ' + JSON.stringify(this.rate_protected_address(input)));
	}
	
	
}