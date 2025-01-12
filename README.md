
# task manager web application

## about

Users can creata account and login into their account and manage their tasks.
users can perform crud operations on their tasks.
they can see their completed and uncompleted tasks saperately.

they have therir setting page in the profile page to add email also os if they forget the password they can recover their account with email otp. 

adding the email is done but forget password is not implemented yet.

## backend code link

[backend repositery](https://github.com/fi020/backend-task-tracker)

# below this is for me only



connecting to the server (backend) for the first time takes time may be because keeping the server open for 24/7 when it is not in use so the server might be partily off so while signup or login please wait a minute so the backend get started.
## to run on local follow below steps
add env file

VUE_APP_API_URL=your_localhost_backend

run the command npm run serve

## to run on local follow above ^ steps

# f-tt















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









# content below this is for me only
# need to learn some advance functionalities of git and github
# remove the env file from all branches as accidently push
git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

git filter-branch --index-filter "git rm -rf --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

rm -rf .git/refs/original
git reflog expire --expire=now --all
git gc --prune=now --aggressive

git push origin --force --all
git push origin --force --tags

# end of env remove
