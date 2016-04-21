class IndexedDB {

  constructor() {
    this.indexedDB;
    this.dbName = "contentDB";
    this.dbVersion = 1;
  }

  initDB(section) {
    this.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    const contentSection = section.toLowerCase();
    const request = this.indexedDB.open(this.dbName, this.dbVersion);

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
  }

}

export default new IndexedDB();
