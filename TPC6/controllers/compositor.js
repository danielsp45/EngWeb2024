const Compositor = require('../models/compositor');

module.exports.list = async () => {
  return await Compositor
    .find()
    .exec();
}

module.exports.findById = id => {
  return Compositor
    .findOne({ id: id })
    .exec();
}

module.exports.findByPeriodo = periodo => {
  return Compositor
    .find({ periodo: periodo })
    .exec();
}

module.exports.insert = compositor => {
  compositor.id = Math.floor(Math.random() * 1000000000000);
  return Compositor.create(compositor);
}

module.exports.removeById = id => {
  return Compositor.deleteOne({ id: id });
}

module.exports.update = (id, compositor) => {
  return Compositor.updateOne({ id: id }, compositor);
}
