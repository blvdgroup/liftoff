interface Graph {
  [key: string]: [string, string[]]
  // first string is the script location, second is the list of adjacent pages
}

export default class GraphHandler {
  private graph: Graph
  private root: string

  constructor(graph: Graph) {
    this.graph = graph
  }

  public setRoot(root: string): void {
    this.root = root
  }

  public getRootScript() {
    return this.graph[this.root][0]
  }

  public traverseFrom(page: string): string[] {
    return this.graph[page] ? this.graph[page][1] : []
  }
}
