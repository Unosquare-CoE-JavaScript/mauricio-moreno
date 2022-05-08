let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
})

class Person {
  constructor(name) {
    this.name = name
  }
}

// LOW-LEVEl Module

class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === "RelationshipBrowser")
      throw new Error("RelationshipBrowser is abstract!")
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super()
    this.data = []
  }

  addParentAndChild(parent, child) {
    this.data.push({ from: parent, type: Relationship.parent, to: child })
  }

  findAllChildrenOf(name) {
    return this.data
      .filter(
        element =>
          element.from.name === name && element.type === Relationship.parent
      )
      .map(element => element.to)
  }
}

// High level module
/*
class Research {
  constructor(relationships) {
    //Fid all children
    let relations = relationships.data
    for (let relation of relations.filter(
      element =>
        element.from.name === "John" && element.type === Relationship.parent
    ))
      console.log(`John has a child named ${relation.to.name}`)
  }
}
*/

class Research {
  constructor(browser) {
    for (let person of browser.findAllChildrenOf("John"))
      console.log(`John has a child called ${person.name}`)
  }
}

let parent = new Person("John")
let child1 = new Person("Chris")
let child2 = new Person("Matt")

let relationships = new Relationships()
relationships.addParentAndChild(parent, child1)
relationships.addParentAndChild(parent, child2)

new Research(relationships)

/*
  Dependency Inversion means that High level modules should not depend on low
  level modules
*/
