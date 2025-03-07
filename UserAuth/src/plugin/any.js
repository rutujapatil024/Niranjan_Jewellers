module.exports = (schema,options)=> {
    schema.statics.exists = async function (query) {
        const result = await this.findOne(query).select("_id").lean();
        console.log(result)
        console.log(await this.findOne(query).select("_id"))
        return result ? true : false;
    };

    schema.statics.get = async function (query) {
        const result = await this.findOne(query);
        return result;
    };
}