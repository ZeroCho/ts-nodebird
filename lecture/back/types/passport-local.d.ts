declare module "passport-local" {
  import { Request } from 'express';
  import { Strategy as PassportStrategy } from 'passport';

  export interface IVerifyOptions {
    [key: string]: any;
  }
  export interface IStrategyOptions {
    usernameField: string;
    passwordField: string;
    session?: boolean;
    passReqToCallback?: false;
  }
  export interface IStrategyOptionsWithRequest {
    usernameField: string;
    passwordField: string;
    session?: boolean;
    passReqToCallback: true;
  }
  export interface Done {
    (error: Error | null, user?: any, options?: IVerifyOptions): void;
  }
  export interface VerifyFunction {
    (username: string, password: string, done: Done): void | Promise<any>;
  }
  export interface VerifyFunctionWithRequest {
    (req: Request, username: string, password: string, done: Done): void | Promise<any>;
  }

  export class Strategy extends PassportStrategy {
    constructor(options: IStrategyOptions, verify: VerifyFunction)
    constructor(options: IStrategyOptionsWithRequest, verify: VerifyFunctionWithRequest)
  }
}
