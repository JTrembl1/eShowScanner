import { RouterState } from "@ngrx/router-store";
import { User } from "./user";
import { Attendee } from "./attendee";
/**
 * Provide an interface to our application state. This is the object tree that
 * represents the entire application's state. New key/values can be added to it
 * as additional state is needed.
 */
export interface AppState {

  /**
   * The state of our router. We no longer interact with the router directly. Instead,
   * we dispatch an 'action' to the store, which, via ngrx/router-store, creates
   * a route change for us.
   *
   * We do this abstraction so that we can subscribe into route changes easily
   * (e.g., using the same redux mechanisms we are using for everything else),
   * and also so that all route changes can be managed and traversed like a Stack.
   *
   * @see https://github.com/ngrx/router-store
   */
  router: RouterState;

  /**
   * The state for project searching / all projects / project details / etc.
   */
  projectSearch: AttendeeSearchState;

  attendeeDashboard: AttendeeDashboardState;

  auth: AuthState;
}

/**
 * This is a generic state for searching/sorting/pagination purposes,
 * which you can extend and use it for your component state. For example:
 * export interface YOURSEARCHSTATE extends SearchState { entities: TYPE }
 * is using all the existing propertis in SearchState plus has its own custom
 * types for the entities to perform searching/sorting/pagination actions.
 */
export interface SearchState {
  entities: any[];
  entitiesStart: number;
  entitiesEnd: number;
  count: number;
  isLoading: boolean;
  page: number;
  pageSize: number;
  sort: string;
  sortDesc: boolean;
}

export interface AttendeeSearchState extends SearchState {
  entities: Attendee[];
  filters: any; // TODO: specify this!
  editModal: any;
}

export interface AttendeeDashboardState {
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;

  // The selected project. The one the overview tab focuses on.
  attendee: Attendee;
  attendeeId: string;

  editAttendee: any;
  errors: any;
}

export interface AuthState {
  user: User;
}
