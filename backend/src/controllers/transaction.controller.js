const Transaction = require('../models/transaction.model');

exports.getAll = async (req, res, next) => {
    try {
        const txs = await Transaction.find().sort({ date: -1 });
        res.json(txs);
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    try {
        const tx = await Transaction.findById(req.params.id);
        if (!tx) return res.status(404).json({ error: 'Not found' });
        res.json(tx);
    } catch (err) {
        next(err);
    }
};

exports.createOne = async (req, res, next) => {
    try {
        const newTx = await Transaction.create(req.body);
        res.status(201).json(newTx);
    } catch (err) {
        next(err);
    }
};

exports.updateOne = async (req, res, next) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteOne = async (req, res, next) => {
    try {
        const deleted = await Transaction.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};