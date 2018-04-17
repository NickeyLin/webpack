set -e

vue init . test

cd test

echo ">> yarn" 
yarn
echo ">> yarn run lint" 
yarn run lint
echo ">> yarn test" 
yarn test
echo ">> yarn run build" 
yarn run build
echo ">> yarn run build --target" 
yarn run build --target=index
echo ">> yarn run dev" 
yarn run dev
