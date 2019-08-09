declare module 'rehype-slug' {
  import { Processor } from 'unified';

  interface RehypeSlug {
    [setting: string]: any
  }

  function documenter(
    this: Processor,
    settings?: RehypeSlug | undefined
  ): void;
  export = documenter;
}
