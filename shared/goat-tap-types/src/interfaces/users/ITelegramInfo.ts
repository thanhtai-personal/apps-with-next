export interface ITelegramInfo {
  telegramId: number | string;
  first_name: string;
  last_name?: string;
  username?: string;
  phone?: string;
  about?: string;
  photo_url?: string;
  auth_date?: string;
}
