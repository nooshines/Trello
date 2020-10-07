echo "*** STARTING BUILD PROCESS"

echo "*** Building Frontend ***"
cd client/trello
npm install
npm run build

echo "*** Copy React build to Express public ***"
cd ../..
mkdir -p ./server/public
cp -r ./client/trello/build/*  ./server/public/

echo "*** Building Backend ***"
cd server
npm install

cd ../ #return to app root

echo "*** Build Process complete ***"