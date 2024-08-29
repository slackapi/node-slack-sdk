export interface GridMigrationFinishedEvent {
  type: 'grid_migration_finished';
  enterprise_id: string;
}

export interface GridMigrationStartedEvent {
  type: 'grid_migration_started';
  enterprise_id: string;
}
