declare module 'remark-toc' {
  import { Processor } from 'unified';

  interface RemarkTocSettings {
    heading?: string;
    maxDepth?: number;
    tight?: boolean;
    skip?: boolean;
  }

  function documenter(
    this: Processor,
    settings?: RemarkTocSettings | undefined
  ): void;
  export = documenter;
}
