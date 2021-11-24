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

module.exports = {setUniqueIndex, checkUniqueIndex}
