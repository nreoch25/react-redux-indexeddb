class IndexedDB {

  constructor() {
    this.indexedDB;
    this.dbName = "contentDB";
    this.dbVersion = 1;
  }

  createObjectStore(cb) {
    this.dbVersion++;
    let request = this.indexedDB.open(this.dbName, this.dbVersion);
    request.onupgradeneeded = function(event) {
      let contentDB = event.target.result;
      contentDB.createObjectStore("arts-content");
      contentDB.createObjectStore("news-content");
      contentDB.createObjectStore("sports-content");
    }
    request.onsuccess = function(event) {
      request.result.close();
      cb();
    }
  }

  storeContent(section, content, cb) {
    this.dbVersion++;
    let curStore = section.toLowerCase() + "-content";
    let request = this.indexedDB.open(this.dbName, this.dbVersion);
    request.onsuccess = function(event) {
      console.log("STORE OBJECTS HERE");
      let contentDB = event.target.result;
      let transaction = contentDB.transaction([curStore], "readwrite");
      console.log(transaction);
      request.result.close();
      cb();
    }
  }

  objectStoreExists(section, cb) {
    let request = this.indexedDB.open(this.dbName, this.dbVersion);
    request.onsuccess = function(event) {
      let contentDB = event.target.result;
      //Check if ObjectStore exists
      if(contentDB.objectStoreNames.contains(section + "-content")) {
        request.result.close();
        cb(true);
      } else {
        request.result.close();
        cb(false);
      }
    }
  }

  dbExists(cb) {
      let dbExists = true;
      let request = this.indexedDB.open(this.dbName);
      request.onsuccess = function() {
        request.result.close();
        cb(dbExists);
      }
      request.onupgradeneeded = function() {
        dbExists = false;
      }
  }

  init() {
    this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
  }

  /*initDB(section) {
    this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    let contentSection = section.toLowerCase();
    let request = this.indexedDB.open(this.dbName, this.dbVersion);

    // This is called the first time the contentDB is created
    // Also called when the db version number is incremented
    // Can be used for created the arts/news/sports objectStore
    request.onupgradeneeded = function(event) {
      // create your content ObjectStore here
      let newContent = event.target.result;
      newContent.createObjectStore(contentSection + "-content");
    }

    // This is called on open calls with the same version
    request.onsuccess = function(event) {
      console.log(event.target.result.objectStoreNames);

    }
  }*/

}

export default new IndexedDB();
