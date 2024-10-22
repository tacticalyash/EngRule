const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Rule description
  root: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // Root node of AST
});

module.exports = mongoose.model('Rule', ruleSchema);
