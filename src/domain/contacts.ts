export default class Contacts {
  public email: string;
  public phone: string;
  public address: string;
  public socialLinks: {
    linkedin: string;
    behance: string;
    dribbble: string;
    whatsapp: string;
    telegram: string;
    instagram: string;
  };
  constructor({
    email,
    phone,
    address,
    linkedin,
    behance,
    dribbble,
    whatsapp,
    telegram,
    instagram,
  }: {
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    behance?: string;
    dribbble?: string;
    whatsapp?: string;
    telegram?: string;
    instagram?: string;
  }) {
    this.email = email ?? "";
    this.phone = phone ?? "";
    this.address = address ?? "";
    this.socialLinks = {
      linkedin: linkedin ?? "",
      behance: behance ?? "",
      dribbble: dribbble ?? "",
      whatsapp: whatsapp ?? "",
      telegram: telegram ?? "",
      instagram: instagram ?? "",
    };
  }

  // Static default instance for backward compatibility
  static readonly default = new Contacts({});
}
