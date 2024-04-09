const { modelName } = require("../models/pessoa");
var Pessoa = require("../models/pessoa");

module.exports.list = () => {
  const result = Pessoa.find({}).exec();

  return result;
};

module.exports.findById = async (id) => {
  return Pessoa.find({ _id: id });
};

module.exports.insert = (pessoa) => {
  return Pessoa.create(pessoa);
};

module.exports.update = async (id, pessoa) => {
  let result = await Pessoa.updateOne({ _id: id }, pessoa).exec();

  if (result.modifiedCount > 0) {
    return Pessoa.find({ _id: id });
  } else {
    throw new Error("Error updating pessoa");
  }
};

module.exports.remove = async (id) => {
  let result = await Pessoa.deleteOne({ _id: id }).exec();

  if (result.deletedCount > 0) {
    return result;
  } else {
    throw new Error("Error deleting pessoa");
  }
};
