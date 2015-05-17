cd ./client
call npm install
call bower install
call grunt build

cd ../server
box install
box recipe build.boxr
