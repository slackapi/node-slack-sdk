export interface EmailDomainChangedEvent {
  type: 'email_domain_changed';
  email_domain: string;
  event_ts: string;
}
