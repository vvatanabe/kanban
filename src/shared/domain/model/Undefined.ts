import { Identifier } from "./";

export class Undefined extends Identifier<any> {
  constructor() {
    super(undefined, true);
  }
  public equals(obj: any): boolean {
    return false;
  }
}
