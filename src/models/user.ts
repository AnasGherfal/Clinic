class User {
  id: string;
  firstName: string;
  lastName: string;
  email:string;
  role:string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email:string,
    role:string,

  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;

  }
}

export default User;
