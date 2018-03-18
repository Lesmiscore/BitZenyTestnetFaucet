const explorer = require("bitcore-explorers");
const bitcore = explorer.bitcore;

const keys = require("./keys");
const values = require("./values");

const Insight = explorer.Insight;
const Tx = bitcore.Transaction;

Tx.prototype.serialize = function () {
    return this.uncheckedSerialize();
};

bitcore.Networks.add(values.network);

const insig = new Insight(values.insight, values.network);

function utxos(address) {
    return new Promise(function (resolve, reject) {
        insig.getUtxos(address, function (err, utxos) {
            if (err) {
                reject(err);
            } else {
                resolve(utxos);
            }
        });
    });
}

function broadcast(tx) {
    return new Promise(function (resolve, reject) {
        insig.broadcast(tx, function (err, id) {
            if (err) {
                reject(err);
            } else {
                resolve(id);
            }
        });
    });
}

function sendTo(address) {
    var amount = parseInt(Math.abs(Math.random()) * 10 ** (values.decimals - 1));
    return utxos(keys.address)
        .then((txs) => {
            return new Tx()
                .fee(values.feeInSats)
                .from(txs)
                .change(keys.address)
                .to(address, amount)
                .sign(keys.private);
        })
        .then((tx) => broadcast(tx));
}

function addr(address) {
    return new Promise(function (resolve, reject) {
        insig.address(address, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    keys: keys,
    values: values,
    bitcore: bitcore,
    explorers: explorer,
    sendTo: sendTo,
    insight: insig,
    address: addr
};
