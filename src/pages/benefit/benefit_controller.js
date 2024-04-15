import BenefitSchema from './benefit_schema.js';

const list = async (req, res) => {
	console.log(req.query);
	const {company, filter} = req.query;

	if(filter !== "all"){
		try{
			res.json(await BenefitSchema.find({company: company, benefit_type: filter}));
		}catch(err){
			res.json(await BenefitSchema.find({company: company}));
		}
	}else{
		res.json(await BenefitSchema.find({company: company}));
	}
}

export {list};