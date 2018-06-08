declare module 'signale' {
  interface CommandType {
    badge: string
    color: string
    label: string
  }

  interface SignaleOptions<Types extends string = DefaultMethods> {
    config: any
    types: { [K in Types]: CommandType }
    interactive?: boolean
    timers?: Map<string, Date>
    stream?: NodeJS.WriteStream
  }

  class SignaleBase {
    constructor(options?: SignaleOptions)

    scopeName: string
    currentOptions: any
    date: string
    timestamp: string
    filename: string

    scope<TMethods extends DefaultMethods>(...name: string[]): Signale<TMethods>
    unscope(): void
    time(label: string): string
    timeEnd(label: string, span?: number): { label: string; span?: number }
  }

  type DefaultMethods =
    | 'await'
    | 'complete'
    | 'error'
    | 'debug'
    | 'fatal'
    | 'fav'
    | 'info'
    | 'note'
    | 'pause'
    | 'pending'
    | 'star'
    | 'start'
    | 'success'
    | 'warn'
    | 'watch'
    | 'log'

  type LoggerFunc = (message?: any, ...optionalArgs: any[]) => void
  type Signale<TMethods extends DefaultMethods> = SignaleBase & Record<TMethods, LoggerFunc>

  const singleton: Signale<DefaultMethods>
  export = singleton
}
