// NOTE: there may be a better way to add metadata to an error about being "unrecoverable" than to keep an
// independent enum, probably a Set (this isn't used as a type).
export enum UnrecoverableSocketModeStartError {
  NotAuthed = 'not_authed',
  InvalidAuth = 'invalid_auth',
  AccountInactive = 'account_inactive',
  UserRemovedFromTeam = 'user_removed_from_team',
  TeamDisabled = 'team_disabled',
}
