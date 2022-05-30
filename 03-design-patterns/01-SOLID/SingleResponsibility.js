const fs = require("fs")

// Your classes need to have an specific purpose
class Journal {
  constructor() {
    this.entries = {}
  }

  addEntry(text) {
    let c = ++Journal.count
    let entry = `${c}: ${text}`
    this.entries[c] = entry
    return c
  }

  removeEntry(index) {
    delete this.entries[index]
  }

  toString() {
    return Object.values(this.entries).join("\n")
  }

  /*You can not add persistent management logic inside of a class
	That manages the creation and alteration of journals
	Instead you can create a specific class that does that*/
  // save(filename) {
  //   fs.writeFileSync(filename, this.toString())
  // }
  // load(filename) {}
  // loadFromUrl() {}
}

class PersistenceManager {
  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString())
  }
  preprocess(j) {}
}

Journal.count = 0

let journal = new Journal()
journal.addEntry("I cried today.")
journal.addEntry("I ate a bug.")
console.log(journal.toString())

let persistenceManager = new PersistenceManager()
let filename = "info.txt"

persistenceManager.saveToFile(journal, filename)
