import User from '../models/user';

declare module '*.json' {
  const value: any;
  export default value;
}

declare global {
  interface Error {}
}

export {};
