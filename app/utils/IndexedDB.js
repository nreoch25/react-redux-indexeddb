class IndexedDB {

  constructor() {
    this.indexedDB;
    this.dbName = "contentDB";
    this.dbVersion = 1;
  }

  checkObjectStore(section, cb) {
    cb("checking");
  }

  createObjectStore(cb) {
    this.dbVersion++;
    let request = this.indexedDB.open(this.dbName, this.dbVersion);
    request.onupgradeneeded = function(event) {
      let contentDB = event.target.result;
      contentDB.createObjectStore("arts-content", { autoIncrement : true });
      contentDB.createObjectStore("news-content", { autoIncrement : true });
      contentDB.createObjectStore("sports-content", { autoIncrement : true });
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
      let contentStore = transaction.objectStore(curStore);
      let contentStoreRequest = contentStore.put(content);
      contentDB.close();
      contentStoreRequest.onsuccess = function(event) {
        cb(section);
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

}

export default new IndexedDB();
