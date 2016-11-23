import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { URLSearchParams } from "@angular/http";

import { AuthHttp } from "../../auth/auth-http";
import { ApplicationConfig } from "../../shared/application-config";
import { Exhibitor } from "../../models/exhibitor";

@Injectable()
export class BadgeService {


  constructor(
      private http: AuthHttp,
      private config: ApplicationConfig) { }

  /**
   * Fetch a user from the server which matches the given data.
   *
   * @param data The data of the badge to find.
   * @return An observable which emits the found attendee.
   */
  find(data: string): Observable<Exhibitor> {
    return this.http
      .get(`${this.config.API_URL}/badge/decode?BoothAttendee_scanfield=${data}`)
      .map((response) => response.json() as Exhibitor);
  }

  // /**
  //  * Search for exhibitors against the API.
  //  *
  //  * @return An observable which emits the API response.
  //  */
  // search(filters: any): Observable<PaginatedExhibitors[]> {
  //   let params: URLSearchParams = this.buildParams(filters);
  //
  //   filters.pageSize = filters.pageSize ? filters.pageSize : BadgeService.DEFAULT_PAGE_SIZE;
  //   params.set("limit", filters.pageSize.toString());
  //
  //   if (filters.page) {
  //     params.set("offset", ((filters.page - 1) * filters.pageSize).toString());
  //   }
  //
  //   if (filters.sort) {
  //     let sortDir = filters.sortDesc ? "DESC" : "ASC";
  //     params.set("orderBy", `${filters.sort} ${sortDir}`);
  //   }
  //
  //   return this.http
  //     .get(`${this.config.API_URL}/exhibitors`, {
  //       search: params
  //     })
  //     .map((response) => response.json())
  //     .map((exhibitors) => {
  //       projects.items
  //         .map((project) => this.normalizeStats(project))
  //         .map((project) => this.parseDateFields(project));
  //       return projects;
  //     });
  // }
  //
  // findByExhibitorId(id: string): Observable<Exhibitor[]> {
  //   return this.http
  //     .get(`${this.config.API_URL}/exhibitors/${id}/sites`)
  //     .map((response) => response.json())
  //     .map((json) => json.items as Project[])
  //     .map((projects) => projects.map((project) => this.normalizeStats(project)))
  //     .map((projects) => projects.map((project) => this.parseDateFields(project)));
  // }
  //
  // /**
  //  * create a project or site
  //  *
  //  * @param json is the json of the new project or site to create
  //  * @returns {Observable<R>} that emits the response json of the create site http request
  //  */
  // save(project: Project): Observable<Project> {
  //   let projectJson = JSON.stringify({ project });
  //   let obs;
  //
  //   if (project.id) {
  //     obs = this.http.put(`${this.config.API_URL}v1/projects/${project.id}`, projectJson);
  //   } else {
  //     obs = this.http.post(`${this.config.API_URL}v1/projects`, projectJson);
  //   }
  //
  //   return obs.map((response) => response.json())
  //     .map((json) => json as Project)
  //     .map((_project) => this.normalizeStats(_project))
  //     .map((_project) => this.parseDateFields(_project));
  // }
  //
  // delete(project: Project): Observable<boolean> {
  //   if (project.id) {
  //     return this.http
  //       .delete(`${this.config.API_URL}v1/projects/${project.id}`)
  //       .map((response) => true);
  //   }
  // }
  //
  // destroy(project: Project): Observable<boolean> {
  //   return this.http
  //     .delete(`${this.config.API_URL}v1/projects/${project.id}`)
  //     .map(response => true);
  // }
  //
  // protected normalizeStats(project): Project {
  //   ProjectService.STAT_FIELDS.map((field) => {
  //     project[field] = project[field] ? project[field] : 0;
  //   });
  //
  //   return project;
  // }
  //
  // protected parseDateFields(project): Project {
  //   ProjectService.DATE_FIELDS.map((field) => {
  //     if (project[field]) {
  //       let timeSpan: number = Date.parse(project[field]);
  //       project[field] = new Date(timeSpan);
  //     }
  //   });
  //
  //   return project;
  // }
  //
  // protected buildParams({ keywords, status, assignedTo }) {
  //   let params: URLSearchParams = new URLSearchParams();
  //   if (keywords) {
  //     params.set("q", keywords);
  //   }
  //
  //   if (status) {
  //     params.set("status", status);
  //   }
  //
  //   if (assignedTo && assignedTo === "unmanaged") {
  //     params.set("unmanaged", "true");
  //   } else if (assignedTo) {
  //     params.set("user_ids[]", assignedTo);
  //   }
  //
  //   return params;
  // }
}
//
// export interface PaginatedProjects {
//   items: Project[];
// }
