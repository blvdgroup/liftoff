// Type definitions for Signale 1.1
// Project: https://github.com/klauscfhq/signale
// Definitions by: Resi Respati <https://github.com/resir014>
//                 kingdaro <https://github.com/kingdaro>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'signale' {
  export type DefaultMethods =
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

  export interface CommandType {
    badge: string
    color: string
    label: string
  }

  export interface SignaleConfig {
    displayScope?: boolean
    displayBadge?: boolean
    displayDate?: boolean
    displayFilename?: boolean
    displayLabel?: boolean
    displayTimestamp?: boolean
    underlineLabel?: boolean
    underlineMessage?: boolean
  }

  export interface SignaleOptions<TTypes extends string> {
    config?: SignaleConfig
    scope?: any
    types: Record<TTypes, CommandType>
    interactive?: boolean
    timers?: Map<string, Date>
    stream?: NodeJS.WriteStream
  }

  interface SignaleConstructor {
    new <TTypes extends string = DefaultMethods>(options?: SignaleOptions<TTypes>): Signale<TTypes>
  }

  interface SignaleBase {
    config<TTypes extends string = DefaultMethods>(configObj: SignaleConfig): Signale<TTypes>
    scope<TTypes extends string = DefaultMethods>(...name: string[]): Signale<TTypes>
    unscope(): void
    time(label: string): string
    timeEnd(label: string, span?: number): { label: string; span?: number }
  }

  type LoggerFunc = (message?: any, ...optionalArgs: any[]) => void
  type Signale<TTypes extends string = DefaultMethods> = SignaleBase & Record<TTypes, LoggerFunc>

  export const Signale: SignaleConstructor
  const singleton: Signale<DefaultMethods>
  export default singleton
}
