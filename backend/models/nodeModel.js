const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'operator' or 'operand'
  left: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // Left child node
  right: { type: mongoose.Schema.Types.ObjectId, ref: 'Node' }, // Right child node
  value: { type: String }, // Operand value (e.g., "age > 30")
});

module.exports = mongoose.model('Node', nodeSchema);
