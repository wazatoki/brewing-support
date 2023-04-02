export class AppUser {
  id: string;
  accountID: string;
  password: string;
  name: string;
  appUserGroups: { id: string; name: string }[];

  constructor(
    id = "",
    accountID = "",
    password = "",
    name = "",
    appUserGroups = []
  ) {
    this.id = id;
    this.accountID = accountID;
    this.password = password;
    this.name = name;
    this.appUserGroups = appUserGroups;
  }
}
