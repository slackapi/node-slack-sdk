declare module 'rehype-stringify' {
  import { Processor } from 'unified';

  interface RehypeStringifySettings {
    [setting: string]: any
  }

  function documenter(
    this: Processor,
    settings?: RehypeStringifySettings | undefined
  ): void;
  export = documenter;
}
