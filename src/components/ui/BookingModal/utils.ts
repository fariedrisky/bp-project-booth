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

// Format opening time and closing time together with WIB
export const formatBoothTime = (openBoothTime: Date | null, closeBoothTime: string): string => {
    if (!openBoothTime) return "-";

    const formattedOpenTime = formatWaktu(openBoothTime);

    // If we don't have a closing time, just return the opening time with WIB
    if (!closeBoothTime || closeBoothTime === "-") {
        return `${formattedOpenTime} WIB`;
    }

    // We need to extract just the time part from the closeBoothTime since it might already include "WIB"
    const closeTimeOnly = closeBoothTime.replace(" WIB", "");

    // Return the formatted range with a single WIB at the end
    return `${formattedOpenTime} - ${closeTimeOnly} WIB`;
};

export const formatWhatsAppMessage = (
    data: FormData & { selectedProduct: string },
    service: ServiceType
) => {
    const priceInfo =
        data.paymentType === "full"
            ? `Harga: Rp ${Number(service.totalPrice)?.toLocaleString("id-ID")}`
            : `Uang Muka (DP): Rp ${data.dpAmount ? Number(data.dpAmount).toLocaleString("id-ID") : ""}`;

    // Calculate close booth time based on open booth time and duration
    let closeTime = "";
    if (data.openBoothTime && service.selectedDuration?.value) {
        // Use the calculateEndTime utility if available
        if (typeof calculateEndTime === 'function') {
            closeTime = calculateEndTime(data.openBoothTime, service.selectedDuration.value);
        } else {
            // Fallback implementation if the utility isn't available
            const closeDate = new Date(data.openBoothTime);
            const durationHours = parseInt(service.selectedDuration.value.replace('h', ''), 10);
            closeDate.setHours(closeDate.getHours() + durationHours);
            closeTime = formatWaktu(closeDate);
        }
    }

    // Format the booth time range
    const boothTimeRange = data.openBoothTime
        ? `${formatWaktu(data.openBoothTime)} - ${closeTime} WIB`
        : "";

    return encodeURIComponent(`
*Permintaan Pemesanan Baru*
------------------------
*Data Pemesan:*
Nama Lengkap: ${data.fullName}
Telepon: ${data.phoneNumber}
Email: ${data.email}

*Detail Acara:*
Hari, Tanggal: ${data.eventDate ? formatTanggal(data.eventDate) : ""}
Jam Open Booth - Close Booth: ${boothTimeRange}
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
    if (!formData.openBoothTime) newErrors.openBoothTime = "Jam open booth wajib diisi";
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
        const minimumDp = service.totalPrice! * 0.5;
        if (isNaN(dpValue) || dpValue <= 0) {
            newErrors.dpAmount = "Jumlah uang muka harus lebih dari 0";
        } else if (dpValue < minimumDp) {
            newErrors.dpAmount = `Uang muka minimal 50% dari harga total (Rp ${Math.ceil(
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

// Function signature for calculateEndTime - this is just for TypeScript to recognize the function
// The actual implementation should be imported from @/utils/time-utils
declare function calculateEndTime(startTime: Date | null, durationString: string | undefined, timezone?: string): string;