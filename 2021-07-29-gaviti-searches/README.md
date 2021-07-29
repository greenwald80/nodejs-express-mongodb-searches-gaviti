For start the project:

npm install 

npm run start
or
npm run dev - for developers

I used the postman for testing

Methods	Urls	Actions
GET	api/searches	get all searches
http://localhost:3000/api/searches

GET	api/searches/:id	get search by id
http://localhost:3000/api/searches/610266fc198ee5623873519c

POST	api/searches	add new search
Send json data in body: 
{
    "customerid": "customerid2",
    "invoiceid": "invoiceid2"
}

PUT	api/searches/:id	update search by id
http://localhost:3000/api/searches/610266fc198ee5623873519c
Send json data in body: 
{
    "customerid": "customerid2",
    "invoiceid": "invoiceid2"
}

DELETE	api/searches/:id	remove search by id
http://localhost:3000/api/searches/610266fc198ee5623873519c

DELETE	api/searches	remove all searches
http://localhost:3000/api/searches

GET	api/searches/bydate	find all published searches by dates
http://localhost:3000/api/searches/bydate?startdate=2021-07-28T08:30:41.735Z&enddate=2021-07-30T08:30:41.735Z