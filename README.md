# tut
# remove the env file from all branches as accidently push
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

rm -rf .git/refs/original
git reflog expire --expire=now --all
git gc --prune=now --aggressive

git push origin --force --all
git push origin --force --tags

# end of env remove

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



color: #42b983;


