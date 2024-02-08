// models/user.ts
class Appointment {
  id:string;
  available?: boolean;
  title: string;
  start: string;
  end?: string;
  userId?:string | null;
    constructor(
      id:string,
      title: string,
      start: string,
      available?: boolean,
      end?: string,
      userId?:string | null,
    ) {
      this.id = id;
      this.available = available;
      this.title = title;
      this.start = start;
      this.end = end;
      this.userId = userId;
    }
  }
  
  // export interface Appointment {
  //   available?: boolean;
  //   title: string;
  //   start: string;
  //   end?: string;
  //   userId?:string | null;
  //   // Add other properties as needed
  // }
  
  export default Appointment;
  