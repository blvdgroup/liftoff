import { EventEmitter } from 'events'

export default class ComponentHandler extends EventEmitter {
  private components = {}

  public import(name, component) {
    this.components[name] = component
    this.emit(`import-${name}`, component)
  }

  public isImported(name): boolean {
    return !(typeof this.components[name] === 'undefined')
  }

  public getComponent(name): void {
    return this.components[name]
  }
}
