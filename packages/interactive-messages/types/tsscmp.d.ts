declare module 'tsscmp' {
  function timingSafeCompare(sessionToken: string, givenToken: string): boolean;
  export = timingSafeCompare;
}
