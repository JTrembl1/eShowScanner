import { Injectable, ElementRef } from "@angular/core";
//import { LogLevel } from "log4ts/build/LogLevel";

/**
 * A wrapper for all Lopez app configuration. Can be injected into appropriate
 * services.
 */
@Injectable()
export class ApplicationConfig {

  /**
   * Provide a singleton instance of ourselves.
   */
  static instance() {
    return ApplicationConfig._self;
  }

  private static _self: ApplicationConfig = new ApplicationConfig();

  /** The URL to the Lopez API */
  API_URL: string = "http://localhost:9000";

  /** Prefix to used with the user's ID when making HTTP calls to the API. */
  API_PREFIX: string;

  /** String prefix sent with users credentials. This is the app prefix required by the Lopez API. */
  AUTH_PREFIX: string = "93BCAFD12EFADF2879A3D5F3EA232AD9F";

  /** User ID to use for login requests. API requires auth to auth a user... */
  AUTH_ID: string;

  /** User token to use for login requests. Api requires auth to auth a user... */
  AUTH_SECRET: string = "A3D5F3EADF2879AFD12EFA232AD9F93BC";

  /** The minimum logging level for the app. Lesser logs will be omitted. */
  //LOG_LEVEL: LogLevel = LogLevel.ALL;

  /** A complete list of the languages we support. Any lang outside of this list will revert to DEFAULT_LANG */
  SUPPORTED_LANGS: string[] = ["en"];

  /** The default lang. If an invalid lang is encountered, it will revert to this value. */
  DEFAULT_LANG: string = "en";

  /** If the app is in 'production' mode. */
  //IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";

  /** The current user language to use. */
  LANG: string;

  /**
   * Configure self from the attributes on the given html element. We expect that
   * the root element of the app to have been given HTML5 attributes for certain config
   * values. This allows the host page to control the configuration.
   *
   * See the README for more info on the config.
   *
   * @param el The root element, which is expected to have configuration attributes.
   */
  fromElement(el: ElementRef) {
    if (!el || !el.nativeElement) {
      return;
    }

    let n = el.nativeElement;

    if (n.getAttribute("api-url")) {
      let url = n.getAttribute("api-url");
      if (!url.endsWith("/")) {
        url += "/";
      }
      this.API_URL = url;
    }

    if (n.getAttribute("api-prefix")) {
      this.API_PREFIX = n.getAttribute("api-prefix");
    }

    if (n.getAttribute("api-auth-user")) {
      this.AUTH_ID = n.getAttribute("api-auth-user");
    }

    if (n.getAttribute("api-auth-prefix")) {
      this.AUTH_PREFIX = n.getAttribute("api-auth-prefix");
    }

    if (n.getAttribute("api-auth-secret")) {
      this.AUTH_SECRET = n.getAttribute("api-auth-secret");
    }

    if (n.getAttribute("user-lang")) {
      this.LANG = n.getAttribute("user-lang");
    }
  }
}
