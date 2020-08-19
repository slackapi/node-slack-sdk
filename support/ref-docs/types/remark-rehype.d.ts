declare module 'remark-rehype' {
  import { Processor } from 'unified';

  interface RemarkRehypeSettings {
    [setting: string]: any
  }

  function documenter(
    this: Processor,
    settings?: RemarkRehypeSettings | undefined
  ): void;
  export = documenter;
}
