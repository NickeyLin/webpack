set -e

vue init . test

cd test

echo ">> npm install" 
npm install --registry=https://registry.npm.taobao.org
echo ">> npm run lint" 
npm run lint
echo ">> npm test" 
npm test
echo ">> npm run build" 
npm run build
echo ">> npm run build --target" 
npm run build --target=index
echo ">> npm run dev" 
npm run dev
