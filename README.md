# mongodb-crud
Key Features:

Recipe Creation: Users can create new recipes by providing details such as recipe name, cooking time, ingredients, and serving size. The entered recipe data is stored in a MongoDB database.

Recipe Display: Users can view individual recipes by their unique ID. The application retrieves the recipe details from the database and displays them on a dedicated recipe page, including the name, cooking time, ingredients list, and serving size.

Recipe Listing: Users can access a list of all recipes available in the system. The application queries the MongoDB database to retrieve all recipe records and presents them in a visually appealing format.

Recipe Update: Users have the ability to update recipe information. They can modify fields such as recipe name, cooking time, ingredients, and serving size. The application utilizes the MongoDB findByIdAndUpdate method to update the corresponding recipe record.

Recipe Deletion: Users can delete a recipe from the system. By specifying the recipe's unique ID, the application uses the MongoDB findByIdAndDelete method to remove the recipe record from the database.

Technologies Used:

Node.js: A JavaScript runtime environment that allows executing JavaScript code outside of a web browser.
Express.js: A fast and minimalist web application framework for Node.js that simplifies the creation of web APIs and routes.
MongoDB: A NoSQL document database that provides a flexible and scalable way to store and manage data.
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js that provides a higher-level abstraction for interacting with the database.
EJS: A templating language for generating dynamic HTML templates in Node.js applications.
Postman: A popular API development and testing tool used to send requests to the server and analyze the responses.
