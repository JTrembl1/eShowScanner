export class User {
  id: string;
  locale: string;
  time_zone?: string;
  time_zone_offset?: number;
  first_name: string;
  last_name: string;
  email: string;

  company_address1?: string;
  company_address2?: string;
  city?: string;
  state_code?: string;
  postal_code?: string;
  country_code?: string;
}
