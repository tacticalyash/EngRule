const NodeModel = require('../models/nodeModel');
const RuleModel = require('../models/ruleModel');

// Create rule (AST) from rule string
exports.createRule = async (req, res) => {
  const { ruleString } = req.body;

  try {
    const ast = createASTFromRuleString(ruleString); // Function to parse rule
    const rootNode = await NodeModel.create(ast);
    const rule = await RuleModel.create({ name: ruleString, root: rootNode._id });
    res.status(201).json(rule);
  } catch (error) {
    res.status(400).json({ error: 'Invalid rule string.' });
  }
};

// Combine rules
exports.combineRules = async (req, res) => {
  const { ruleIds } = req.body;
  try {
    const rules = await RuleModel.find({ _id: { $in: ruleIds } });
    const combinedAST = combineRules(rules);
    const rootNode = await NodeModel.create(combinedAST);
    const combinedRule = await RuleModel.create({ name: 'Combined Rule', root: rootNode._id });
    res.status(201).json(combinedRule);
  } catch (error) {
    res.status(400).json({ error: 'Error combining rules.' });
  }
};

// Evaluate rule
exports.evaluateRule = async (req, res) => {
  const { ruleId, data } = req.body;
  try {
    const rule = await RuleModel.findById(ruleId).populate('root');
    const result = evaluateRule(rule.root, data);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Error evaluating rule.' });
  }
};
