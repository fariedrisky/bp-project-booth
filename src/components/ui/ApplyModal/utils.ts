import { ApplicationFormData, ApplicationFormErrors } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
const YEAR_REGEX = /^(19|20)\d{2}$/;
const MAX_PHOTO_SIZE_MB = 5;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export function validateApplicationForm(
    data: ApplicationFormData,
): ApplicationFormErrors {
    const errors: ApplicationFormErrors = {};

    // Data diri
    if (!data.fullName.trim()) {
        errors.fullName = "Nama lengkap wajib diisi";
    }

    if (!data.dateOfBirth) {
        errors.dateOfBirth = "Tanggal lahir wajib diisi";
    } else {
        const dob = new Date(data.dateOfBirth);
        if (Number.isNaN(dob.getTime()) || dob > new Date()) {
            errors.dateOfBirth = "Tanggal lahir tidak valid";
        }
    }

    if (!data.gender) {
        errors.gender = "Jenis kelamin wajib dipilih";
    }

    if (!data.photo) {
        errors.photo = "Foto ukuran postcard 2x3 wajib diunggah";
    } else if (!ALLOWED_PHOTO_TYPES.includes(data.photo.type)) {
        errors.photo = "Format foto harus JPG atau PNG";
    } else if (data.photo.size > MAX_PHOTO_SIZE_MB * 1024 * 1024) {
        errors.photo = `Ukuran foto maksimal ${MAX_PHOTO_SIZE_MB}MB`;
    }

    // Pendidikan
    if (!data.lastEducation) {
        errors.lastEducation = "Pendidikan terakhir wajib dipilih";
    }

    if (data.isCurrentlyStudying && !data.currentStudyProgram.trim()) {
        errors.currentStudyProgram = "Program studi/jurusan wajib diisi";
    }

    // Pengalaman kerja: kalau bukan "tidak ada pengalaman", entri (tunggal)
    // harus lengkap (nama tempat kerja, posisi, deskripsi tugas, tahun
    // mulai, dan tahun selesai — kecuali masih bekerja di sana)
    if (!data.hasNoWorkExperience) {
        const exp = data.workExperience;
        const missingBasicFields =
            !exp.companyName.trim() ||
            !exp.position.trim() ||
            !exp.jobDescription.trim();

        const invalidStartYear = !YEAR_REGEX.test(exp.startYear.trim());
        const invalidEndYear =
            !exp.isCurrent && !YEAR_REGEX.test(exp.endYear.trim());

        if (missingBasicFields || invalidStartYear || invalidEndYear) {
            errors.workExperience =
                'Lengkapi pengalaman kerja (termasuk periode tahun), atau centang "Tidak memiliki pengalaman"';
        }
    }

    // Kontak
    if (!data.email.trim()) {
        errors.email = "Email wajib diisi";
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
        errors.email = "Format email tidak valid";
    }

    if (!data.phoneNumber.trim()) {
        errors.phoneNumber = "Nomor telepon wajib diisi";
    } else if (!PHONE_REGEX.test(data.phoneNumber.trim())) {
        errors.phoneNumber = "Format nomor telepon tidak valid";
    }

    return errors;
}