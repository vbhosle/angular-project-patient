export class Patient {
    patientId: number;
    patientName: string;
    dateOfBirth: Date;
    deleted: boolean;

    constructor(patientId: number, patientName: string, dateOfBirth: Date) {
        this.patientId = patientId;
        this.patientName = patientName;
        this.dateOfBirth = dateOfBirth;
    }

    //calculated property
    get age() {
       return Patient.calculateAge(this.dateOfBirth);
    }

    static isFutureDate(dob: Date):boolean{
        let now = new Date();
        if(dob > now) return true;
        return false;
    }

    static calculateAge(dob:Date):number{
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        var m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

}