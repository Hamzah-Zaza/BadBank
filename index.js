var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');


// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


// Create user account - updated
app.get('/account/create/:name/:email/:password', function(req, res) {
    const name = req.params.name;
    const email = req.params.email;
    const password = req.params.password;

    // Check if the account exists by calling the 'find' function
    dal.find(email)
        .then((users) => {
            // If users array is not empty, it means the account already exists
            if (users.length > 0) {
                console.log('User already exists');
                res.send({ msg: 'User already exists' });
            } else {
                // If the account does not exist, create the user by calling the 'create' function
                dal.create(name, email, password)
                    .then((user) => {
                        console.log(user);
                        res.send(user);
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        res.status(500).send('An error occurred while creating user.');
                    });
            }
        })
        .catch((error) => {
            console.error('Error checking if account exists:', error);
            res.status(500).send('An error occurred while checking account existence.');
        });
});



// Login user
app.get('/account/login/:email/:password', function (req, res) {
    const email = req.params.email;
    const password = req.params.password;

    // Find the user account by email using 'findByEmail' function
    dal.findByEmail(email)
        .then(user => {
            // Check if user exists
            if (user !== null) {
                // Compare the provided password with the password stored in the user document
                if (user.password === password) {
                    // Password matches, send the user document in the response
                    res.send(JSON.stringify(user));
                } else {
                    // Password doesn't match, send a login failed message
                    res.send('Login failed: wrong password');
                }
            } else {
                // User not found, send a login failed message
                res.send('Login failed: user not found');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            res.status(500).send('An error occurred during login.');
        });
});

// Find user account(s) by email using 'find' function
app.get('/account/find/:email', function (req, res) {
    const email = req.params.email;

    dal.find(email)
        .then(user => {
            // Logging the result (array of user documents) to the console
            console.log(user);
            res.send(user); // Sending the user documents in the response
        })
        .catch(error => {
            console.error('Error during find by email:', error);
            res.status(500).send('An error occurred during find by email.');
        });
});

// Find one user by email using 'findByEmail' function as an alternative to 'find'
app.get('/account/findOne/:email', function (req, res) {
    const email = req.params.email;

    dal.findByEmail(email)
        .then(user => {
            // Logging the result (single user document) to the console
            console.log(user);
            res.send(user); // Sending the user document in the response
        })
        .catch(error => {
            console.error('Error during find one by email:', error);
            res.status(500).send('An error occurred during find one by email.');
        });
});

// Update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);

    // Call the 'update' function to update the balance for the user with the given email
    dal.update(req.params.email, amount)
        .then((response) => {
            // Logging the response (updated user document) to the console
            console.log(response);
            res.send(response); // Sending the updated user document in the response
        })
        .catch(error => {
            console.error('Error during update:', error);
            res.status(500).send('An error occurred during update.');
        });
});

// Retrieve all accounts
app.get('/account/all', function (req, res) {
    // Call the 'all' function to get all user accounts
    dal.all()
        .then(docs => {
            // Logging the result (array of all user documents) to the console
            console.log(docs);
            res.send(docs); // Sending the array of user documents in the response
        })
        .catch(error => {
            console.error('Error during retrieve all accounts:', error);
            res.status(500).send('An error occurred during retrieve all accounts.');
        });
});

// Update - deposit/withdraw amount with a message
app.get('/account/update/:email/:amount/:message', function (req, res) {
    let amount = Number(req.params.amount);
    console.log("inside index...amount: ", amount)

    // Call the 'transfer' function to update the balance and add a message for the user with the given email
    dal.transfer(req.params.email, amount, req.params.message)
        .then((response) => {
            // Logging the response (updated user document) to the console
            console.log(response);
            res.send(response); // Sending the updated user document in the response
        })
        .catch(error => {
            console.error('Error during transfer:', error);
            res.status(500).send('An error occurred during transfer.');
        });
});

// Get balance
app.get('/account/balance/:name/:email/:amount', function (req, res) {
    // Convert the 'amount' parameter to a number
    var amount = Number(req.params.amount);

    // Call the 'deposit' function to update the balance for the user with the given name and email
    dal.deposit(req.params.name, req.params.email, amount)
        .then((user) => {
            // Logging the result (updated user document) to the console
            console.log(user);
            res.send(user); // Sending the updated user document in the response
        })
        .catch(error => {
            console.error('Error during deposit:', error);
            res.status(500).send('An error occurred during deposit.');
        });
});


var port = 3000;
app.listen(process.env.PORT || port);
console.log('Running on port:' + port);
