export interface BotProfile {
  id: string;
  name: string;
  app_id: string;
  team_id: string;
  icons: {
    [size: string]: string;
  };
  updated: number;
  deleted: boolean;
}
