class Document {}

class Machine {
  constructor() {
    if (this.constructor.name === "Machine")
      throw new Error("Machine is abstract!")
  }
  print(document) {}
  fax(document) {}
  scan(document) {}
}

class MultiFunctionPrinter extends Machine {
  print(document) {}
  fax(document) {}
  scan(document) {}
}

class NotImplementedError extends Error {
  constructor(name) {
    super(`${name} is not implemented!`)
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError)
  }
}

class OldFashionedPrinter extends Machine {
  print(document) {
    // ok
  }
  // fax(document) {
  // 	// do nothing
  // }
  scan(document) {
    throw new NotImplementedError("Not implemented!")
  }
}

// ISP = segregate (split up)
class Printer {
  constructor() {
    if (this.constructor.name === "Printer")
      throw new Error("Printer is abstract!")
  }
  print() {}
}

class Scanner {
  constructor() {
    if (this.constructor.name === "Scanner")
      throw new Error("Scanner is abstract!")
  }
  scan() {}
}

class Photocopier extends aggregation(Printer, Scanner) {
  print() {}
  scan() {}
}

let printer = new OldFashionedPrinter()
