
// TODO: We want this to be an interface
export class Attendee {
  id: string;
  name: string;
  address1?: string;
  address2?: string;
  customer?: string;
  status?: string;
  description?: string;
  updated_at?: Date;
  created_at?: Date;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.name = json.name;
      this.status = json.status;
      this.address1 = json.address1;
    }
  }
}
