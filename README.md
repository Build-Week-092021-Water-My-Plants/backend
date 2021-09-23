# back-end
**Water My Plants Endpoints:**

API: https://waterplantsbackend.herokuapp.com/api/

**Auth:**

*HTTP Methods:*

GET -
    `/auth/logout`

POST -
    `/auth/register` 
    `(required user properties: username, password, phone_number),`
    `.`
    `.`
    `/auth/login` 
    `(required properties: username, password) `

**Users:**



*HTTP Methods:*


GET - 
    `/users,` 
    `/users/:id, `
    `/users/:id/plants`

PUT - `/users/:id`


**Plants:**


*HTTP Methods:*


GET - 
    `/plants,`
    `/plants/:id`

PUT - 
    `/plants/:id`
    

POST - 
    `/plants`
    `(required plant properties: user_id, nickname, species, h2oFrequency)`

DELETE - 
    `/plants/:id`
