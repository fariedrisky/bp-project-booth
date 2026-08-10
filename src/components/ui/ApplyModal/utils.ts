import { ApplicationFormData, ApplicationFormErrors } from "./types";

const GOOGLE_DRIVE_REGEX = /^https:\/\/(drive|docs)\.google\.com\/.+/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;

export function validateApplicationForm(
    data: ApplicationFormData,
): ApplicationFormErrors {
    const errors: ApplicationFormErrors = {};

    if (!data.fullName.trim()) {
        errors.fullName = "Nama lengkap wajib diisi";
    }

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

    if (!data.cvLink.trim()) {
        errors.cvLink = "Link CV wajib diisi";
    } else if (!GOOGLE_DRIVE_REGEX.test(data.cvLink.trim())) {
        errors.cvLink = "Link CV harus berupa link Google Drive yang valid";
    }

    return errors;
}