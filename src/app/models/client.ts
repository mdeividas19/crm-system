export class Client {
    public id: string | null = null;
    public company_name: string | null = null;
    public company_code: number | null = null;
    public vat_code: string | null = null;
    public address: string | null = null;
    public email: string | null = null;
    public phone_number: string | null = null;
    public contacts: Contact[] = [];
}

export class Contact {
    public first_name: string | null = null;
    public last_name: string | null = null;
    public position: string | null = null;
    public phone_number: string | null = null;
}