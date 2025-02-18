import { FormData } from "./types";
import { ServiceType } from "../ServiceCard";

export const formatTanggal = (date: Date): string => {
    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const formatWaktu = (date: Date): string => {
    return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatWhatsAppMessage = (
    data: FormData & { selectedProduct: string },
    service: ServiceType
) => {
    const priceInfo =
        data.paymentType === "full"
            ? `Harga: Rp ${Number(service.totalPrice)?.toLocaleString("id-ID")}`
            : `Uang Muka: Rp ${data.dpAmount ? Number(data.dpAmount).toLocaleString("id-ID") : ""
            }`;

    return encodeURIComponent(`
*Permintaan Pemesanan Baru*
------------------------
*Data Pemesan:*
Nama Lengkap: ${data.fullName}
Telepon: ${data.phoneNumber}
Email: ${data.email}

*Detail Acara:*
Tanggal: ${data.eventDate ? formatTanggal(data.eventDate) : ""}
Jam: ${data.eventTime ? formatWaktu(data.eventTime) : ""}
Lokasi: ${data.eventLocation}

*Detail Paket:*
Paket Dipilih: ${data.selectedProduct}
Durasi: ${service.selectedDuration?.label || "4 Jam"}
Cetak: ${service.selectedPrint?.label || "-"}
Template: ${data.templateOption || "-"}

Jenis Pembayaran: ${data.paymentType === "full" ? "Pembayaran Penuh (Full)" : "Uang Muka (DP)"}
${priceInfo}
`);
};

export const validateForm = (
    formData: FormData,
    service: ServiceType,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.phoneNumber)
        newErrors.phoneNumber = "Nomor telepon wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.eventDate) newErrors.eventDate = "Tanggal acara wajib diisi";
    if (!formData.eventTime) newErrors.eventTime = "Jam acara wajib diisi";
    if (!formData.eventLocation)
        newErrors.eventLocation = "Lokasi acara wajib diisi";
    if (!formData.paymentType)
        newErrors.paymentType = "Jenis pembayaran wajib diisi";
    if (
        service.templateOptions &&
        service.templateOptions.length > 0 &&
        !formData.templateOption
    )
        newErrors.templateOption = "Template wajib dipilih";

    if (formData.paymentType === "dp" && !formData.dpAmount) {
        newErrors.dpAmount = "Jumlah uang muka wajib diisi";
    } else if (formData.paymentType === "dp") {
        const dpValue = parseInt(formData.dpAmount);
        const minimumDp = service.totalPrice! * 0.3;
        if (isNaN(dpValue) || dpValue <= 0) {
            newErrors.dpAmount = "Jumlah uang muka harus lebih dari 0";
        } else if (dpValue < minimumDp) {
            newErrors.dpAmount = `Uang muka minimal 30% dari harga total (Rp ${Math.ceil(
                minimumDp
            ).toLocaleString("id-ID")})`;
        } else if (dpValue >= service.totalPrice!) {
            newErrors.dpAmount = "Jumlah uang muka harus kurang dari harga total";
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Masukkan alamat email yang valid";
    }

    // Phone number validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber =
            "Masukkan nomor telepon yang valid (format: 08xxxxxxxxxx)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
