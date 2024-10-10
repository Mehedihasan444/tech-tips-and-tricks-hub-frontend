type IEducation={
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa: string;

}
type ISocialMedia={
    name: string;
    url: string;
}
export interface IUser {
    _id: string;
    name: string;
    role: string;
    email: string;
    status: string;
    mobileNumber: string;
    profilePhoto: string;
    bio?: string;
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    education?:IEducation[];
    socialMedia?: ISocialMedia[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }
  