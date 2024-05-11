
import FaqSchema from './FaqSchema.js';


const list = async (req, res) => {
    const page = req.query.page || 1;
    const limit = 5; 
    const skip = (page - 1) * limit;

    try {
        const totalQnaCount = await FaqSchema.countDocuments();
        const totalPages = Math.ceil(totalQnaCount / limit);

        const faqlist = await FaqSchema.find({}, 'no title content date').skip(skip).limit(limit);
        const searchlist = await FaqSchema.find({}, 'no title content date');

        res.json({
            faqlist: faqlist,
            totalPages: totalPages,
            searchlist:searchlist
        });
    } catch (error) {
        console.error('router get', error);
        res.status(404).json({ error: 'router get' });
    }
};

const post = async (req, res) => {
    const { no, title, content } = req.body;
    const date = new Date().toISOString(); 

    try {
        const newFaq = new FaqSchema({ no, title, content, date });
        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        console.error('router post', error);
        res.status(404).json({ error: 'router posr' });
    }
};

export {list, post}