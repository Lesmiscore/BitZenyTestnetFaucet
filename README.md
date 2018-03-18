# BitZenyTestnetFaucet
A fucking cryptocurrency faucet for Bitcoin-based coins

やりました... (達成感)    
BitZeny Testnetとか言ってますが他のコインでも出来るはずです。(出来るとは言ってない)

間違いなくガバガバなのでPR募集中

## 使い方
npmとnodeは入れておいてね:heart:

```bash
git clone https://github.com/nao20010128nao/BitZenyTestnetFaucet
cd BitZenyTestnetFaucet/
npm i
cp utils/keys.template.json utils/keys.json 
cp utils/values.template.json utils/values.json 
nano utils/keys.json
# 秘密鍵と対応するアドレスを設定
nano utils/values.json
# いろいろいじる
node index.js
```

