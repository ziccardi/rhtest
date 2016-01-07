

# UserManager

This application provides rest services to manager a JSON file containing a list of users (https://gist.github.com/jasonmadigan/009c15b5dc4b4eccd32b)
It is just an exercise and must not be seen as production level (using the JSON just to exchange data and
persist them in a DB would have been far better, for example).

## Usage
Download all the files, then run the application with:

npm start

By default, the application starts a server on 127.0.0.1:1337. It can be modified editing the config.js file.
All the rest services are reachable on :

http://127.0.0.1:1337/users

The GET method is used to retrieve users, the PUT method is used to add a user and the DELETE method is used to remove a user.

### Getting the users

To get the user, you can filter using any of the attributes provider by the JSON, using a JSONPath like syntax.
For example, to get all the male user, you can use the following syntax:

http://127.0.0.1:1337/users?user.gender=male

More than one filter can be specified at once: they will get combined in AND mode, for example:

http://127.0.0.1:1337/users?user.gender=male&user.name.first=&user.name.first=andy


