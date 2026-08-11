export type Gender = "male" | "female" | "";

export type LastEducation =
    | "sd"
    | "smp"
    | "sma"
    | "d3"
    | "s1"
    | "s2"
    | "s3"
    | "";

export interface WorkExperienceEntry {
    id: string;
    companyName: string;
    position: string;
    jobDescription: string;
    startYear: string;
    endYear: string;
    isCurrent: boolean; // true = masih bekerja di sini sampai sekarang
}

export interface ApplicationFormData {
    // Data diri
    fullName: string;
    dateOfBirth: string; // ISO date string, dari <input type="date">
    gender: Gender;

    // Pendidikan
    lastEducation: LastEducation;
    isCurrentlyStudying: boolean;
    currentStudyProgram: string; // diisi kalau isCurrentlyStudying true

    // Pengalaman kerja
    hasNoWorkExperience: boolean;
    workExperiences: WorkExperienceEntry[];

    // Kontak
    email: string;
    phoneNumber: string;
}

export type ApplicationFormErrors = Partial<
    Record<
        | "fullName"
        | "dateOfBirth"
        | "gender"
        | "lastEducation"
        | "currentStudyProgram"
        | "workExperiences"
        | "email"
        | "phoneNumber",
        string
    >
>;

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" },
];

export const EDUCATION_OPTIONS: { value: LastEducation; label: string }[] = [
    { value: "sd", label: "SD / Sederajat" },
    { value: "smp", label: "SMP / Sederajat" },
    { value: "sma", label: "SMA / SMK / Sederajat" },
    { value: "d3", label: "D3" },
    { value: "s1", label: "S1" },
    { value: "s2", label: "S2" },
    { value: "s3", label: "S3" },
];

export function createEmptyExperience(): WorkExperienceEntry {
    return {
        id: Math.random().toString(36).slice(2),
        companyName: "",
        position: "",
        jobDescription: "",
        startYear: "",
        endYear: "",
        isCurrent: false,
    };
}