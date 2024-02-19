echo "switching to branch master"
git checkout features/get-location-v2

echo "building app"


npm run build

echo "deploying files to server"

scp -P 4422 -r dist/* githubuser@10.247.5.180:/var/www/smartfind

echo "done!"