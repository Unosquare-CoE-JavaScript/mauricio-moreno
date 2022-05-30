//@ts-ignore
import fs from "fs"

// Your classes need to have an specific purpose

interface IJournal {
  addEntry(text: string): number
  removeEntry(index: number): void
  toString(): string
}
class Journal implements IJournal {
  private entries: Array<string>
  private count: number
  constructor() {
    this.entries = []
    this.count = 0
  }

  addEntry(text: string) {
    let c = ++this.count
    let entry = `${c}: ${text}`
    this.entries[c] = entry
    return c
  }

  removeEntry(index: number) {
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

interface IPersistenceManager {
  saveToFile(journal: Journal, filename: string): void
}
class PersistenceManager implements IPersistenceManager {
  saveToFile(journal: Journal, filename: string): void {
    fs.writeFileSync(filename, journal.toString())
  }
  preprocess(j: any) {}
}

let journal = new Journal()
console.log(journal.addEntry("I cried today."))
journal.addEntry("I ate a bug.")
console.log(journal.toString())

let persistenceManager = new PersistenceManager()
let filename = "info.txt"

persistenceManager.saveToFile(journal, filename)
