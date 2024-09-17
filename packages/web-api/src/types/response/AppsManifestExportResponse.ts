/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// !!! DO NOT EDIT THIS FILE !!!                                                       //
//                                                                                     //
// This file is auto-generated by scripts/generate-web-api-types.sh in the repository. //
// Please refer to the script code to learn how to update the source data.             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////

import { WebAPICallResult } from '../../WebClient';
export type AppsManifestExportResponse = WebAPICallResult & {
  error?:    string;
  manifest?: Manifest;
  needed?:   string;
  ok?:       boolean;
  provided?: string;
};

export interface Manifest {
  _metadata?:           Metadata;
  display_information?: DisplayInformation;
  features?:            Features;
  functions?:           { [key: string]: Function };
  oauth_config?:        OauthConfig;
  settings?:            Settings;
}

export interface Metadata {
  major_version?: number;
  minor_version?: number;
}

export interface DisplayInformation {
  background_color?: string;
  description?:      string;
  long_description?: string;
  name?:             string;
}

export interface Features {
  app_home?:       AppHome;
  bot_user?:       BotUser;
  shortcuts?:      Shortcut[];
  slash_commands?: SlashCommand[];
  unfurl_domains?: string[];
}

export interface AppHome {
  home_tab_enabled?:               boolean;
  messages_tab_enabled?:           boolean;
  messages_tab_read_only_enabled?: boolean;
}

export interface BotUser {
  always_online?: boolean;
  display_name?:  string;
}

export interface Shortcut {
  callback_id?: string;
  description?: string;
  name?:        string;
  type?:        string;
}

export interface SlashCommand {
  command?:       string;
  description?:   string;
  should_escape?: boolean;
  url?:           string;
  usage_hint?:    string;
}

export interface Function {
  description?:       string;
  input_parameters?:  { [key: string]: PutParameter };
  output_parameters?: { [key: string]: PutParameter };
  title?:             string;
}

export interface PutParameter {
  description?: string;
  hint?:        string;
  is_required?: boolean;
  maxLength?:   number;
  maximum?:     number;
  minLength?:   number;
  minimum?:     number;
  name?:        string;
  title?:       string;
  type?:        string;
}

export interface OauthConfig {
  redirect_urls?:            string[];
  scopes?:                   Scopes;
  token_management_enabled?: boolean;
}

export interface Scopes {
  bot?:  string[];
  user?: string[];
}

export interface Settings {
  allowed_ip_address_ranges?: string[];
  background_color?:          string;
  description?:               string;
  event_subscriptions?:       EventSubscriptions;
  function_runtime?:          string;
  hermes_app_type?:           string;
  interactivity?:             Interactivity;
  long_description?:          string;
  org_deploy_enabled?:        boolean;
  socket_mode_enabled?:       boolean;
  token_rotation_enabled?:    boolean;
}

export interface EventSubscriptions {
  bot_events?:  string[];
  request_url?: string;
  user_events?: string[];
}

export interface Interactivity {
  is_enabled?:               boolean;
  message_menu_options_url?: string;
  request_url?:              string;
}
