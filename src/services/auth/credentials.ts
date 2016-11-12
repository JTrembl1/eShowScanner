/**
 * TODO: This will probably be replaced by JWT at some point.
 *
 * This is an internal implementation. Do not use!
 */
export class Credentials {
  /** The user ID */
  id: string;

  /** The `remember_token` of the user. */
  token: string;

  /**
   * @constructor
   * @param id The ID of the user that is logged in.
   * @param token The remember_token of the user that is logged in.
   */
  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }
}
