import LostnFoundSchema from "./LostnFoundSchema.js";

let currentNo = 22; 

const list =  async (req, res) => {

    const page = req.query.page || 1;
    const limit = 5; 
    const skip = (page - 1) * limit;
    const company = req.query.company; 

    let query = {}; 

    if (company) {

        query.company = company;
    }

        const totalLostFoundCount = await LostnFoundSchema.countDocuments(query);
        const totalPages = Math.ceil(totalLostFoundCount / limit);

        const lostnfoundlist = await LostnFoundSchema.find(query, 'no item found date result company').skip(skip).limit(limit);
        const searchlostn = await LostnFoundSchema.find({}, 'no item found date result company');
        
        res.json({
            lostnfoundlist: lostnfoundlist,
            totalPages: totalPages,
            searchlostn : searchlostn
        });

};

const listAll = async (req, res) => {
    try {
        const lostnfoundlist = await LostnFoundSchema.find({}, 'no item found date result company');
        res.json({ lostnfoundlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const post =  async (req, res) => {
    const { no, item, found, result, company } = req.body;
    const date = new Date().toISOString().split('T')[0]; 
        const newLostFound = new LostnFoundSchema({ no: currentNo++, item, found, date, result, company });
        await newLostFound.save();
        res.status(201).json({
            ...newLostFound.toObject(), 
            date: date 
        });
};

export {list, post, listAll}
