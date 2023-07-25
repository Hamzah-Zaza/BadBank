const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://hamzahzaza:GXYEMiOTESIMi5ZD@cluster0.dr3un1z.mongodb.net/?retryWrites=true&w=majority`;
let db = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected successfully to db server');
    const dbName = 'databasename';
    // connect to myproject database
    db = client.db(dbName);
});

// create user account
// Create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        // Access the 'users' collection in the database
        const collection = db.collection('users');

        // Create a document representing the user account
        const doc = {
            name: name,           // User's name
            email: email,         // User's email
            password: password,   // User's password
            balance: 0            // User's initial balance is set to 0
        };

        // Insert the document into the 'users' collection
        collection.insertOne(doc, { w: 1 }, function (err, result) {
            if (err) {
                // If there's an error, reject the promise with the error
                reject(err);
            } else {
                // If successful, resolve the promise with the newly created document
                resolve(doc);
            }
        });
    });
};


// find user account
// Find user account by email
function find(email) {
    return new Promise((resolve, reject) => {
        // Access the 'users' collection in the database
        const customers = db.collection('users');

        // Search for documents where the 'email' field matches the provided email
        customers.find({ email: email }).toArray(function (err, docs) {
            if (err) {
                // If there's an error, reject the promise with the error
                reject(err);
            } else {
                // If successful, resolve the promise with the array of matching documents
                resolve(docs);
            }
        });
    });
}


// find user account
// Find one user by email
function findByEmail(email) {
    return new Promise((resolve, reject) => {
        // Access the 'users' collection in the database
        const customers = db.collection('users');

        // Search for a single document where the 'email' field matches the provided email
        customers.findOne({ email: email })
            .then((doc) => {
                // If a document is found, resolve the promise with the document
                resolve(doc);
            })
            .catch((err) => {
                // If there's an error, reject the promise with the error
                reject(err);
            });
    });
}


// update - deposit/withdraw amount
function update(email, amount) {
    const amountNum = Number(amount);

    return new Promise((resolve, reject) => {
        // Access the 'users' collection in the database
        const customers = db.collection('users');

        // Find a single document where the 'email' field matches the provided email
        // and update the 'balance' field by adding the amountNum to it
        // The { returnOriginal: false } option ensures that the updated document is returned
        customers.findOneAndUpdate(
            { email: email },
            { $inc: { balance: amountNum } },
            { returnOriginal: false },
            function (err, updatedDocument) {
                if (err) {
                    // If there's an error, reject the promise with the error
                    reject(err);
                } else {
                    // If successful, resolve the promise with the updated document
                    resolve(updatedDocument);
                }
            }
        );
    });
}

// all users
// Retrieve all user accounts
function all() {
    return new Promise((resolve, reject) => {
        // Access the 'users' collection in the database
        const customers = db.collection('users');

        // Find all documents in the 'users' collection
        customers.find({}).toArray(function (err, docs) {
            if (err) {
                // If there's an error, reject the promise with the error
                reject(err);
            } else {
                // If successful, resolve the promise with the array of all documents
                resolve(docs);
            }
        });
    });
}


// update

// Update 'message' field to "none" for all user documents
function updateAll() {
    return new Promise((resolve, reject) => {
        // Access the 'users' collection in the database
        const customers = db.collection('users');

        // Update all documents in the 'users' collection
        customers.updateMany(
            {},
            { $set: { message: "none" } },
            function (err, result) {
                if (err) {
                    // If there's an error, reject the promise with the error
                    reject(err);
                } else {
                    // If successful, resolve the promise with the result
                    resolve(result);
                }
            }
        );
    });
}

module.exports = {create, find, findByEmail, update, all, updateAll};
