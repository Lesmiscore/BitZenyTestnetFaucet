const express = require('express');

module.exports = function (core) {
    var router = express.Router();

    function sendNow(address, res) {
        if (address == core.keys.address) {
            res.send({
                success: false,
                error: "You may not try to send coins to stock address."
            });
            return;
        }
        core.sendTo(address)
            .then((id) => {
                res.send({
                    success: true,
                    txid: id
                });
            })
            .catch((err) => {
                res.send({
                    success: false,
                    error: err
                });
            });
    }

    router.post("/", (req, res, next) => {
        const body = req.body || {};
        const address = body.address + "";
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        sendNow(address, res);
    });
    router.get("/quick/:address", (req, res, next) => {
        const address = req.params.address;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        sendNow(address, res);
    });

    return router;
};
