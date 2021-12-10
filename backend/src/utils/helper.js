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
            if (err) console.log(err);
        }
    )
}

module.exports = {setUniqueIndex}
