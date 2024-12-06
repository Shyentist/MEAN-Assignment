//this function takes an object (usually req.query) and the schema it must conform to, and filters the object so
//that it only contains the keys present in the schema with a non-empty value
function filterBySchema(query, schema) {
    let validQuery = {};

    if (Object.entries(query).length !== 0) {
        Object.entries(query).forEach(([key, value]) => {
            if (Object.keys(schema.obj).includes(key) && value) {
                validQuery[key] = value;
            }
        })
    }

    return validQuery
}

module.exports = filterBySchema;
