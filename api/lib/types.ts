export type Theme = "light" | "dark";

export interface ParsedRequest {
  dappSlug: string;
  theme: Theme;
  image: any;
  uawValue: any;
  uawChange: any;
  transactionsValue: any;
  transactionsChange: any;
  volumeValue: any;
  volumeChange: any;
  balanceValue: any;
  balanceChange: any;
}
