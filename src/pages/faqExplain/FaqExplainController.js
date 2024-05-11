import FaqExplainSchema from "./FaqExplainSchema.js";



const list =  async (req, res) => {
    try {
        const faqexplain = await FaqExplainSchema.find({}, 'no title content');

        res.json({
            faqexplain: faqexplain
        });
    } catch (error) {
        console.error('router get', error);
        res.status(404).json({ error: 'router get' });
    }
};

export {list}
