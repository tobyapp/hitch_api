#Hitch API

Repo for backend API for iOS app Hitch.

##API:

###POST /createUser
http://localhost:3000/createUser

Create a new user using a POST request with a JSON file in the body of the request in the form:

{ 
  "userName":"John Smith",
  "userAge":"30", 
  "userEducation":"Test School", 
  "userGender":"Male", 
  "userEmailAddress":"test@test.com"
}

HEADERS:
Content-Type : application/json

###GET /getUsers
http://localhost:3000/getUsers

Retrieve all users from MongoDB using a GET request

###PUT /findUser  
http://localhost:3000/findUser

Retrieve a user using a PUT request with a JSON file containing the 'userId' in the body of the request in the form:

{ "userId" : "58999b70e272b808bf1ae61b" }

NOTE: If the 'userId' supplied does not match any 'userId' in the collections then it will return an error

HEADERS:
Content-Type : application/json

###PUT /updateUser
http://localhost:3000/updateUser

Update a current users record using a PUT request with a JSON file in the body of the request which contains the 'userId' and the fields that are to be updated in the form:

{ 
  "userAge": 75,
  "userId" : "58999b70e272b808bf1ae61b", 
  "userGender": "Female", 
  "userName":"Lucy Smith", 
  "userEmailAddress": "lucy.smith@test.com" 
}

NOTE: If the 'userId' supplied does not match any 'userId' in the collections then it will return an error

HEADERS:
Content-Type : application/json
