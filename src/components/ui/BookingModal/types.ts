import { ServiceType } from "../ServiceCard";

export interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    eventDate: Date | null;
    eventTime: Date | null;
    eventLocation: string;
    paymentType: string;
    dpAmount: string;
    templateOption: string;
}

export interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: ServiceType;
}

export interface SectionProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    service: ServiceType;
    isSubmitting: boolean;
}
