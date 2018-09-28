var itemDB = ( function() {
  var iDB = {};
  let databases = [];
  var datastores = [];

 /**
 * Open a connection to the datastore.
 * Parameters:
 * databaseName - string name of the database.
 * datastoreName - string name of the datastore in the database.
 * key_path - the property of the object which uniquely identifies the entry.
 * indices - a string array of properties the datastore will contain.
 * callback - function to call once the database has been opened.
 */
  iDB.open = function(databaseName, version, datastoreName, key_path, indices, useAutoIncrement,callback) {
    // Open a connection to the datastore.
    console.log("version: " + version);
    var request = indexedDB.open(databaseName, version);

    // Handle datastore upgrades.
    request.onupgradeneeded = function(e) {
      var db = e.target.result;

      e.target.transaction.onerror = iDB.onerror;
      //save local data for repopulation.
      //

      // Delete the old datastore.
      if (db.objectStoreNames.contains(datastoreName)) {
        db.deleteObjectStore(datastoreName);
      }

      // Create a new datastore.
      if(useAutoIncrement){
        var store = db.createObjectStore(datastoreName, {
          keyPath: "id",
          autoIncrement: true
        });
      }
      else{
        var store = db.createObjectStore(datastoreName, {
          keyPath: key_path
        });
      }

      console.log("In onupgradeneeded...");
      indices.forEach( (prop) => {
        store.createIndex(prop, prop, { unique: false});
      });

      //repopulate
    };

    // Handle successful datastore access.
    request.onsuccess = function(e) {
      // Get a reference to the DB.
      let db = e.target.result;

      datastores[datastoreName] = db;
      console.log(e.target.result);

      databases[databaseName] = request.result;

      // Execute the callback.
      callback("open");
    };

    // Handle errors when opening the datastore.
    request.onerror = iDB.onerror;
  };

  iDB.close = (databaseName, callback) => {
    databases[databaseName].close();

    callback('Database closed');
  };

  iDB.delete = (databaseName, callback) => {
    indexedDB.deleteDatabase(databaseName);

    callback();
  };

  /**
  * Opens a simple instance of the database with just the name and version
  */
   iDB.simpleOpen = function(databaseName, version, datastoreName, callback){
     // Open a connection to the datastore.
     console.log("version: " + version);
     var request = indexedDB.open(databaseName, version);

     // Handle successful datastore access.
     request.onsuccess = function(e) {
       // Get a reference to the DB.
       let db = e.target.result;

       datastores[datastoreName] = db;
       console.log(e.target.result);

       databases[databaseName] = request.result;

       callback();
     };

     // Handle errors when opening the datastore.
     request.onerror = iDB.onerror;
   };

   /**
   * Checks if a datastore exists in the database
   */
   iDB.databaseExists = function(databaseName, version, datastoreName, callback){
     var dbStoreExists = true;
     var request = indexedDB.open(databaseName, version);

     request.onupgradeneeded = function(e) {
       var db = e.target.result;

       // Delete the old datastore.
       if (!db.objectStoreNames.contains(datastoreName)) {
         dbStoreExists = false;
         db.close();
         indexedDB.deleteDatabase(databaseName);
       }
       else{
         e.target.transaction.abort();
       }
     };
    callback(dbStoreExists);
  };

  /**
  * Returns all database objects with the specific properties that match the
  * particular values.
  * Parameters:
  * datastoreName - string name of the datastore in the database.
  * property - the property of the object which we wish to search for.
  * value - the value of the object we wish to match.
  * callback - function to call once the database has been opened.
  */
  iDB.fetchAllByQuery = (datastoreName, property, value, callback) => {
      let db = datastores[datastoreName];
      let transaction = db.transaction([datastoreName], 'readwrite');
      let objStore = transaction.objectStore(datastoreName);

      let request = objStore.index(property).getAll(value);

      transaction.oncomplete = function(e) {
      callback(request.result);
    };
    transaction.onsuccess = function(e) {
      console.log('Request successful...');
    };
    request.onerror = iDB.onerror;
  };

  /**
  * Finds the first record that matches the query
  * Parameters:
  * datastoreName - string name of the datastore in the database.
  * property - the property of the object which we wish to search for.
  * value - the value of the object we wish to match.
  * callback - function to call once the database has been opened.
  */
 iDB.fetchOneByIndex = function(datastoreName, property, value, callback) {
   let db = datastores[datastoreName];
   let transaction = db.transaction([datastoreName], 'readwrite');
   let objStore = transaction.objectStore(datastoreName);

   let request = objStore.index(property).get(value);

   transaction.oncomplete = function(e) {
     callback(request.result);
   };

   transaction.onsuccess = function(e) {
     console.log('Request successful...');
   };

   request.onerror = iDB.onerror;
 };

  /**
 * Finds the first record that matches the query
 * Parameters:
 * datastoreName - string name of the datastore in the database.
 * key - the key of the object we wish to match to keyPath.
 * callback - function to call once the database has been opened.
 */
iDB.fetchOneByKey = function(datastoreName, key, callback) {
  let db = datastores[datastoreName];
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  let request = objStore.get(key);

  transaction.oncomplete = function(e) {
    callback(request.result);
  };

  transaction.onsuccess = function(e) {
    console.log('Request successful...');
  };

  request.onerror = iDB.onerror;
};

/**
* Returns all records of a particular datastore
* Parameters:
* datastoreName - string name of the datastore in the database.
* callback - function to call once the database has been opened.
*/
iDB.fetchAll = (datastoreName, callback) => {
  let db = datastores[datastoreName];
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  //var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = objStore.openCursor();

  let items = [];
  cursorRequest.onsuccess = (event) => { // STILL NOT WORKING
    let cursor = event.target.result;

    if (!!cursor == false) {
      return;
    }

    items.push(cursor.value);
    console.log("added to 'items' " + JSON.stringify(cursor.value));
    cursor.continue();
  };

  transaction.oncomplete = function(e) {
    // Execute the callback function.
    callback(items);
  };

  transaction.onerror = (e) => {
    console.log(e);
  }

  cursorRequest.onerror = iDB.onerror;
};

/**
* Create a new item.
* Parameters:
* datastoreName: string name of the datastore in the database.
* item - the JSON object to store.
* callback - function to call once the database has been opened.
*/
iDB.createItem = function(datastoreName, item, callback) {
  console.log("In createItem of " + datastoreName + "...");
  // Get a reference to the db.
  var db = datastores[datastoreName];

  // Initiate a new transaction.
  var transaction = db.transaction([datastoreName], 'readwrite');

  // Get the datastore.
  var objStore = transaction.objectStore(datastoreName);

  // Create an object for the item and deep copy.
  var newItem = iterationCopy(item);

  // Create the datastore request.
  var request = objStore.put(newItem);

  // Handle a successful datastore put.
  request.onsuccess = function(e) {
    // Execute the callback function.
    console.log("creation successful...");
    callback("Create Item");
  };

  // Handle errors.
  request.onerror = iDB.onerror;
};

/**
* Delete an item.
* Parameters:
* datastoreName: string name of the datastore in the database.
* key - the key to identify the item to delete.
* callback - function to call once the database has been opened.
*/
iDB.deleteItem = function(datastoreName, key, callback) {
  var db = datastores[datastoreName];
  var transaction = db.transaction([datastoreName], 'readwrite');
  var objStore = transaction.objectStore(datastoreName);

  var request = objStore.delete(key);

  request.onsuccess = function(e) {
    callback("delete");
  }

  request.onerror = function(e) {
    console.log(e);
  }
};

/**
* Update Item.
* Parameters:
* datastoreName - The name of the datastore.
* key_path - the property representing the key.
* key - the key to identify the item to delete.
* item - The updated object to change in the database.
* callback - function to call once the database has been opened.
*/
iDB.updateItem = (datastoreName, key_path, key, item, callback) => {
  console.log("Updating item in '" + datastoreName + "'...");
  let db = datastores[datastoreName];
  let transaction = db.transaction([datastoreName], 'readwrite');
  let objStore = transaction.objectStore(datastoreName);

  objStore.openCursor().onsuccess = (event) => {
    var cursor = event.target.result;
    if(cursor){
      if(cursor.value[key_path] === key){
        var request = cursor.update(item);
        request.onsuccess = () => {
          console.log('Update Successful');
          callback("Update");
        };
        request.onerror = (e) => {
          console.log(e);
        };
      }
      cursor.continue();
    }
  }
};

  // Export the iDB object.
  return iDB;
}());

/**
* Iteration Copy to ensure a deep copy of the JSON Object is created.
*/
function iterationCopy(src) {
  let target = {};
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      target[prop] = src[prop];
    }
  }
  return target;
}
