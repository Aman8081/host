const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const { company,name,featured,sort ,select} = req.query;
    const queryObjects = {};

    if (company) {
        queryObjects.company = company;
    }
    if (featured) {
        queryObjects.featured = featured;
        
    }
    let apiData = Product.find(queryObjects);

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        let selectFix = select.split(",") .join(" ");
        apiData = apiData.select(selectFix);
    }
    if (name) {
        queryObjects.name = { $regex: name, $options: "i" };
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;
    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData;
    res.status(200).json({ myData,nbHits: myData.length});

};



const getAllProductsTesting = async (req, res) => {
    const {name} = req.query;
    const queryObjects = {};

    if (name) {
        // queryObjects.name = name;
        queryObjects.name = { $regex: name, $options: "i" };
        //'i' is represented caseinsitive(capital/small ) search allow, mongoose allow to search sentance
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;
    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log( queryObjects);

    const myData = await apiData;
    res.status(200).json({ myData,nbHits: myData.length});
};

module.exports = { getAllProducts, getAllProductsTesting };
