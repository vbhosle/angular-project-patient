export class Patient {
    patientId: number;
    patientName: string;
    dateOfBirth: Date;

    constructor(patientId: number, patientName: string, dateOfBirth: Date) {
        this.patientId = patientId;
        this.patientName = patientName;
        this.dateOfBirth = dateOfBirth;
    }

    //calculated property
    get age() {
        var today = new Date();
        var age = today.getFullYear() - this.dateOfBirth.getFullYear();
        var m = today.getMonth() - this.dateOfBirth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.dateOfBirth.getDate())) {
            age--;
        }
        return age;
    }

}