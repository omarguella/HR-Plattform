const Product = require("../models/Product");

async function setUniqueIndex(db, collection, field) {
    db.collection(collection).createIndex(
        {
            [field]: 1,
        },
        {
            unique: true
        },

        function (err, res) {
            if (err) console.log(err)
            else console.log(`${res} is set to unique`);
        }
    )
}

async function checkUniqueIndex(db, collection, field) {
    const x = (await db.collection(collection)
        .indexes())
        .find(index => index.name === field + "_1" && index.unique === true)

    return x !== undefined;
}

async function createProductFromOpenCrx(openCrxData) {
    const id = openCrxData.identity.split("/").at(-1);
    const name = openCrxData.name;
    const minPositions = openCrxData.minPositions;
    const maxPositions = openCrxData.maxPositions;

    return new Product(id, name, minPositions, maxPositions);
}

module.exports = {setUniqueIndex, checkUniqueIndex, createProductFromOpenCrx}
