export interface ApplicationFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    cvLink: string;
}

export type ApplicationFormErrors = Partial<
    Record<keyof ApplicationFormData, string>
>;
