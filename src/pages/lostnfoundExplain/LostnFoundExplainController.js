import LostnFoundExplainShema from "./LostnFoundExplainShema.js";

let currentNo = 22; 

const list = async (req, res) => {

    const LostnFoundExplain = await LostnFoundExplainShema.find({}, 'no item found date result company img');

    res.json({
        LostnFoundExplain: LostnFoundExplain
    });

};

const post =  async (req, res) => {
    const { no, item, found, result, company } = req.body;
    const date = new Date().toISOString().split('T')[0]; 
        const LostnFoundExplain2 = new LostnFoundExplainShema({ no: currentNo++, item, found, date, result, company });
        await LostnFoundExplain2.save();
        res.status(201).json({
            ...LostnFoundExplain2.toObject(), 
            date: date 
        });
};




export {list,post}
