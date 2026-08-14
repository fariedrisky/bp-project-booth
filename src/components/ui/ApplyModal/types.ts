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
    photo: File | null; // foto ukuran postcard 2x3

    // Pendidikan
    lastEducation: LastEducation;
    isCurrentlyStudying: boolean;
    currentStudyProgram: string; // diisi kalau isCurrentlyStudying true

    // Pengalaman kerja — hanya 1 entri (yang terakhir/paling relevan)
    hasNoWorkExperience: boolean;
    workExperience: WorkExperienceEntry;

    // Kontak
    email: string;
    phoneNumber: string;
}

export type ApplicationFormErrors = Partial<
    Record<
        | "fullName"
        | "dateOfBirth"
        | "gender"
        | "photo"
        | "lastEducation"
        | "currentStudyProgram"
        | "workExperience"
        | "email"
        | "phoneNumber",
        string
    >
>;

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
    { value: "male", label: "Pria" },
    { value: "female", label: "Wanita" },
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
        id: "work-experience",
        companyName: "",
        position: "",
        jobDescription: "",
        startYear: "",
        endYear: "",
        isCurrent: false,
    };
}