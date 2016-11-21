import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { BadgeService } from "./badge-service";
import { Exhibitor } from "../../models/exhibitor";

@Injectable()
export class BadgeStore {
  constructor(private badgeService: BadgeService) { }

  /**
   * Find a badge with the given Date in our store. Fetch it from the server if
   * it does not exist.
   *
   * @param id The ID of the badge to find.
   * @return An observable which emits the found badge.
   */
  find(data: string): Observable<Exhibitor> {
    return this.badgeService.find(data);
  }
}
