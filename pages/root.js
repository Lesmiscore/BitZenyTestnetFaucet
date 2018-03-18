const express = require('express');

module.exports = function (core) {
    var router = express.Router();

    router.get("/", (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        res.send({
            "hello": `${core.values.name} Faucet`.toUpperCase(),
            "message": `${core.values.name} Faucet by ${core.values.author}`,
            "requestsForUser": `Please send your coins back to ${core.keys.address}`,
            "sendBackTo": `${core.keys.address}`,
            "usage": {
                "toGetPaid": [
                    {
                        "method": "GET",
                        "endpoint": "/claim/quick/:address"
                    }, {
                        "method": "POST",
                        "endpoint": "/claim/",
                        "content": {
                            "address": ":address"
                        }
                    }
                ],
                "toWatchStock": [
                    {
                        "method": "GET",
                        "endpoint": "/stock"
                    }
                ]
            },
            "donations": core.values.donations
        });
    });
    router.get("/stock", (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        core.address(core.keys.address)
            .then((address) => {
                const sats = address.balance;
                res.send({
                    success: true,
                    balanceInSats: sats,
                    balance: sats / (10 ** core.values.decimals)
                });
            })
            .catch((err) => {
                res.send({
                    success: false,
                    error: err
                });
            });
    });

    return router;
};
