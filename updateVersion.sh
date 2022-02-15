PACKAGE_VERSION=$(npx -c 'node -p "process.env.npm_package_version"')
echo $PACKAGE_VERSION
sed -i '' "s/v[0-9].[0-9].[0-9]*/v$PACKAGE_VERSION/" ./README.md