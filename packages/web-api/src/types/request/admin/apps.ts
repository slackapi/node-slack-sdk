import type { OptionalArgument } from '../../helpers';

import type { AppID, CursorPaginationEnabled, TeamID, TokenOverridable } from '../common';

export interface RequestID {
  /** @description The id of the request. */
  request_id: string;
}
// Models either app_id or request_id - but not both.
type AppOrRequestID = (AppID & { request_id?: never }) | (RequestID & { app_id?: never });
export interface EnterpriseID {
  /** @description The ID of the enterprise. */
  enterprise_id: string;
}
// Models either enterprise_id or team_id - but not both.
type TeamOrEnterpriseID = (EnterpriseID & { team_id?: never }) | (TeamID & { enterprise_id?: never });
export interface Certified {
  /**
   * @description Include certified apps. Defaults to `false`.
   */
  certified?: boolean;
}

// https://api.slack.com/methods/admin.apps.activities.list
export type AdminAppsActivitiesListArguments = OptionalArgument<
  Partial<AppID> &
    Partial<TeamID> &
    TokenOverridable &
    CursorPaginationEnabled & {
      /**
       * @description The component ID of log events to be returned. Will be `FnXXXXXX` for functions,
       * and `WfXXXXXX` for worflows.
       */
      component_id?: string;
      /** @description The component type of log events to be returned. */
      component_type?: 'events_api' | 'workflows' | 'functions' | 'tables';
      /** @description The event type of log events to be returned. */
      log_event_type?: string;
      /** @description The latest timestamp of the log to retrieve (epoch microseconds). */
      max_date_created?: number;
      /** @description The earliest timestamp of the log to retrieve (epoch microseconds). */
      min_date_created?: number;
      /** @description The minimum log level of the log events to be returned. Defaults to `info`. */
      min_log_level?: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
      /** @description The direction you want the data sorted by (always by timestamp). */
      sort_direction?: 'asc' | 'desc';
      /** @description The source of log events to be returned. */
      source?: 'slack' | 'developer';
      /** @description The trace ID of log events to be returned. */
      trace_id?: string;
    }
>;

// https://api.slack.com/methods/admin.apps.approve
export type AdminAppsApproveArguments = AppOrRequestID & TeamOrEnterpriseID & TokenOverridable;

// https://api.slack.com/methods/admin.apps.approved.list
export type AdminAppsApprovedListArguments = Partial<TeamOrEnterpriseID> &
  TokenOverridable &
  CursorPaginationEnabled &
  Certified;

// https://api.slack.com/methods/admin.apps.clearResolution
export type AdminAppsClearResolutionArguments = AppID & TeamOrEnterpriseID & TokenOverridable;

// https://api.slack.com/methods/admin.apps.config.lookup
export interface AdminAppsConfigLookupArguments extends TokenOverridable {
  /** @description An array of app IDs to get app configs for. */
  app_ids: string[];
}

// https://api.slack.com/methods/admin.apps.config.set
export interface AdminAppsConfigSetArguments extends AppID, TokenOverridable {
  /** @description Domain restrictions for the app. */
  domain_restrictions?: {
    /** @description Sets allowed URLs for the app. */
    urls?: string[];
    /** @description Sets emails for connector authorization. */
    emails?: string[];
  };
  /** @description The workflow auth permission. */
  workflow_auth_strategy?: 'builder_choice' | 'end_user_only';
}

// https://api.slack.com/methods/admin.apps.requests.cancel
export type AdminAppsRequestsCancelArguments = RequestID & TeamOrEnterpriseID & TokenOverridable;

// https://api.slack.com/methods/admin.apps.requests.list
export type AdminAppsRequestsListArguments = TeamOrEnterpriseID &
  Certified &
  TokenOverridable &
  CursorPaginationEnabled;

// https://api.slack.com/methods/admin.apps.restrict
export type AdminAppsRestrictArguments = AppOrRequestID & TeamOrEnterpriseID & TokenOverridable;

// https://api.slack.com/methods/admin.apps.restricted.list
export type AdminAppsRestrictedListArguments = TeamOrEnterpriseID &
  Certified &
  TokenOverridable &
  CursorPaginationEnabled;

// https://api.slack.com/methods/admin.apps.uninstall
export type AdminAppsUninstallArguments = AppID & TeamOrEnterpriseID & TokenOverridable;
