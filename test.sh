set -e

vue init . test

cd test
npm install --registry=https://registry.npm.taobao.org
npm run lint
npm test
npm run build
