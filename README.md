

# UserManager

This application provides rest services to manager a JSON file containing a list of users (https://gist.github.com/jasonmadigan/009c15b5dc4b4eccd32b)
It is just an exercise and must not be seen as production level (using the JSON just to exchange data and
persist them in a DB would have been far better, for example).

## Installing

Download the code and run

```
npm install
```

## Testing

You can run the tests by issuing 

```
npm test
```
## Usage
Download all the files, then run the application with:

```
npm start
```

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

### Deleting a list of users

To delete one or more user, use the syntax is exactly the same to be used to get user, with the exception that here an HTTP DELETE method must be used.

In the body of the delete action, put a field named as the attribute you want to use to select the users to be deleted.
For example, to delete all the male users named 'andy', you will have to put the following attributes inside the body:

* user.gender with value 'male'
* user.name.first with value 'andy'

### Adding a new user

To add a new user, you must use the POST method and insert a 'user' field inside the body of the message.
The content of the 'user' field must be a JSon describing a User, for example:

```
{
    "user": {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "user1",
        "last": "user1"
      },
      "location": {
        "street": "12 The dunes",
        "city": "Newbridge",
        "state": "ohio",
        "zip": 28782
      },
      "email": "alison.reid@example.com",
      "username": "tinywolf709",
      "password": "rockon",
      "salt": "lypI10wj",
      "md5": "bbdd6140e188e3bf68ae7ae67345df65",
      "sha1": "4572d25c99aa65bbf0368168f65d9770b7cacfe6",
      "sha256": "ec0705aec7393e2269d4593f248e649400d4879b2209f11bb2e012628115a4eb",
      "registered": 1237176893,
      "dob": 932871968,
      "phone": "031-541-9181",
      "cell": "081-647-4650",
      "PPS": "3302243T",
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/60.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/60.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/60.jpg"
      }
    }
  }
```

### Update a user

To update a user user, you must use the PUT method and insert a 'user' field inside the body of the message (as per the add user) and a filter field (as per the get user).

N.B. : all the users matching the filter will be deleted and the new passed in user will be inserted, so pay attention to make the filter match the user you want to update.
