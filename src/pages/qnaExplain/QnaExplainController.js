import QnaExplainShema from './QnaExplainShema.js'

let currentNo = 22; 


const list = async (req, res) => {
    try {
        const qnaexplain = await QnaExplainShema.find({}, 'no title content name');

        res.json({
            qnaexplain: qnaexplain
        });
    } catch (error) {
        console.error('router get', error);
        res.status(404).json({ error: 'router get' });
    }
};

const post = async (req, res) => {
    const { title, category, content } = req.body;
    const date = new Date().toISOString().split('T')[0]; 
    const newQnaExplain = new QnaExplainShema({ no: currentNo++, category, title, content, date });
    await newQnaExplain.save();
    res.status(201).json({
      ...newQnaExplain.toObject(), 
      date: date 
    });
    
   
};


export {list,post}