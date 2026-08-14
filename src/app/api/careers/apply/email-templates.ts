// Template email HTML untuk notifikasi lamaran karir.
// Ditulis pakai inline style + table layout karena sebagian besar email
// client (Gmail, Outlook) tidak mendukung Tailwind / class CSS eksternal.

// TODO: ganti dengan URL publik logo kamu — HARUS format PNG (bukan SVG!).
// Banyak email client (Outlook, sebagian proxy gambar Gmail) tidak render
// SVG di dalam email sama sekali, hasilnya gambar kosong/patah.
const LOGO_URL = "https://bp-projectbooth.com/assets/images/logo-email.png";

// Font stack: "Google Sans" & "Inter" ditulis duluan untuk client yang
// kebetulan punya font itu terpasang di sistem (mis. Android tertentu),
// sisanya fallback ke font sistem yang tampilannya paling mendekati
// (Gmail/Outlook TIDAK bisa load font eksternal seperti Google Fonts).
const FONT_STACK =
    "'Google Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const COLORS = {
    pageBg: "#f4f4f5",
    cardBg: "#ffffff",
    accent: "#C78D4E", // warna aksen / tombol / border table
    textPrimary: "#111827",
    textMuted: "#6b7280",
    footerBg: "#000000",
    footerText: "#d1d5db",
    border: "#e5e7eb",
};

const CONTACT = {
    whatsapp: "+62 851-5731-6767",
    whatsappHref: "https://wa.me/6285157316767",
    email: "bp.project835@gmail.com",
    instagram: "@bp.projectbooth",
    instagramHref: "https://www.instagram.com/bp.projectbooth/",
    tiktok: "@bp.projectbooth",
    tiktokHref: "https://www.tiktok.com/@bp.projectbooth",
};

const GENDER_LABELS: Record<string, string> = {
    male: "Pria",
    female: "Wanita",
};

const EDUCATION_LABELS: Record<string, string> = {
    sd: "SD / Sederajat",
    smp: "SMP / Sederajat",
    sma: "SMA / SMK / Sederajat",
    d3: "D3",
    s1: "S1",
    s2: "S2",
    s3: "S3",
};

function formatDateID(isoDate: string): string {
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return isoDate;
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

function calculateAge(isoDate: string): number | null {
    const dob = new Date(isoDate);
    if (Number.isNaN(dob.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

function formatDateWithAge(isoDate: string): string {
    const formatted = formatDateID(isoDate);
    const age = calculateAge(isoDate);
    return age !== null ? `${formatted} (${age} Tahun)` : formatted;
}

interface WorkExperienceInput {
    companyName: string;
    position: string;
    jobDescription: string;
    startYear: string;
    endYear: string;
    isCurrent: boolean;
}

function formatWorkExperience(
    hasNoWorkExperience: boolean,
    workExperience: WorkExperienceInput,
): string {
    if (hasNoWorkExperience) {
        return "Belum memiliki pengalaman kerja";
    }

    const period = `${workExperience.startYear} - ${workExperience.isCurrent ? "Sekarang" : workExperience.endYear
        }`;
    return `<strong>${workExperience.position}</strong> di ${workExperience.companyName} (${period})<br/>&nbsp;&nbsp;&nbsp;Tugas: ${workExperience.jobDescription}`;
}

interface DetailRow {
    label: string;
    value: string;
    isLink?: boolean;
    isHtml?: boolean;
}

function renderDetailsTable(rows: DetailRow[]): string {
    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 24px 0;">
      ${rows
            .map(
                (row) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border}; font-size: 14px; font-family: ${FONT_STACK}; color: ${COLORS.textMuted}; width: 35%; vertical-align: top;">
            ${row.label}
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid ${COLORS.border}; font-size: 14px; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary}; font-weight: ${row.isHtml ? 400 : 600}; vertical-align: top;">
            ${row.isLink
                        ? `<a href="${row.value}" style="color: ${COLORS.accent}; text-decoration: underline; word-break: break-all;">${row.value}</a>`
                        : row.value
                    }
          </td>
        </tr>
      `,
            )
            .join("")}
    </table>
  `;
}

function renderFooter(): string {
    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.footerBg};">
      <tr>
        <td style="padding: 28px 32px; text-align: center;">
          <p style="margin: 0 0 12px; font-size: 14px; font-weight: 600; font-family: ${FONT_STACK}; color: #ffffff;">
            BP Project Booth
          </p>
          <p style="margin: 0 0 4px; font-size: 13px; font-family: ${FONT_STACK}; color: ${COLORS.footerText};">
            <a href="${CONTACT.whatsappHref}" style="color: ${COLORS.footerText}; text-decoration: none;">WhatsApp: ${CONTACT.whatsapp}</a>
          </p>
          <p style="margin: 0 0 4px; font-size: 13px; font-family: ${FONT_STACK}; color: ${COLORS.footerText};">
            <a href="mailto:${CONTACT.email}" style="color: ${COLORS.footerText}; text-decoration: none;">${CONTACT.email}</a>
          </p>
          <p style="margin: 0 0 16px; font-size: 13px; font-family: ${FONT_STACK}; color: ${COLORS.footerText};">
            <a href="${CONTACT.instagramHref}" style="color: ${COLORS.footerText}; text-decoration: none;">Instagram ${CONTACT.instagram}</a>
            &nbsp;&middot;&nbsp;
            <a href="${CONTACT.tiktokHref}" style="color: ${COLORS.footerText}; text-decoration: none;">TikTok ${CONTACT.tiktok}</a>
          </p>
          <p style="margin: 0; font-size: 11px; font-family: ${FONT_STACK}; color: #6b7280;">
            &copy; ${new Date().getFullYear()} BP Project Booth. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  `;
}

function renderLayout(opts: {
    previewText: string;
    heading: string;
    bodyHtml: string;
}): string {
    const { previewText, heading, bodyHtml } = opts;

    return `
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${heading}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${COLORS.pageBg}; font-family: ${FONT_STACK};">
    <!-- Preview text (tersembunyi, muncul di preview inbox) -->
    <div style="display: none; max-height: 0; overflow: hidden;">${previewText}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${COLORS.pageBg}; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: ${COLORS.cardBg}; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <!-- Header / Logo -->
            <tr>
              <td style="padding: 32px 32px 16px; text-align: center;">
                <img src="${LOGO_URL}" alt="BP Project Booth" width="140" height="74" style="display: inline-block; max-width: 140px; height: auto;" />
              </td>
            </tr>

            <!-- Accent divider -->
            <tr>
              <td style="padding: 0 32px;">
                <div style="height: 3px; background-color: ${COLORS.accent};"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 28px 32px 8px;">
                <h1 style="margin: 0 0 4px; font-size: 20px; font-weight: 700; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary};">
                  ${heading}
                </h1>
                ${bodyHtml}
              </td>
            </tr>

            <tr>
              <td style="padding: 8px 0 0;">
                ${renderFooter()}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

interface ApplicantEmailData {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    lastEducation: string;
    isCurrentlyStudying: boolean;
    currentStudyProgram: string;
    hasNoWorkExperience: boolean;
    workExperience: WorkExperienceInput;
    email: string;
    phoneNumber: string;
    position: string;
}

function buildDetailRows(data: ApplicantEmailData, positionLabel: string): DetailRow[] {
    const rows: DetailRow[] = [
        { label: "Posisi Dilamar", value: positionLabel },
        { label: "Nama Lengkap", value: data.fullName },
        { label: "Tanggal Lahir", value: formatDateWithAge(data.dateOfBirth) },
        { label: "Jenis Kelamin", value: GENDER_LABELS[data.gender] ?? data.gender },
        {
            label: "Pendidikan Terakhir",
            value: EDUCATION_LABELS[data.lastEducation] ?? data.lastEducation,
        },
    ];

    if (data.isCurrentlyStudying) {
        rows.push({
            label: "Sedang Studi",
            value: data.currentStudyProgram || "-",
        });
    }

    rows.push({
        label: "Pengalaman Kerja",
        value: formatWorkExperience(
            data.hasNoWorkExperience,
            data.workExperience,
        ),
        isHtml: true,
    });

    rows.push({ label: "Email", value: data.email });
    rows.push({ label: "Nomor Telepon (WhatsApp)", value: data.phoneNumber });

    return rows;
}

export function getApplicantConfirmationEmail(
    data: ApplicantEmailData,
): { subject: string; html: string } {
    const positionLabel = data.position || "posisi yang tersedia";

    const bodyHtml = `
    <p style="margin: 12px 0; font-size: 14px; line-height: 1.6; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary};">
      Halo <strong>${data.fullName}</strong>,
    </p>
    <p style="margin: 12px 0; font-size: 14px; line-height: 1.6; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary};">
      Terima kasih telah melamar sebagai <strong>${positionLabel}</strong> melalui
      program Open Recruitment BP Project Booth. Lamaran Anda telah kami terima
      dengan detail sebagai berikut:
    </p>

    ${renderDetailsTable(buildDetailRows(data, positionLabel))}

    <p style="margin: 12px 0; font-size: 14px; line-height: 1.6; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary};">
      Tim HR kami akan meninjau lamaran Anda dan akan menghubungi Anda melalui
      email ini apabila Anda lolos ke tahap selanjutnya.
    </p>
    <p style="margin: 20px 0 4px; font-size: 14px; line-height: 1.6; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary};">
      Salam,<br/>Tim HR BP Project Booth
    </p>
  `;

    return {
        subject: `Lamaran Anda Telah Kami Terima - ${positionLabel} - BP Project Booth`,
        html: renderLayout({
            previewText: `Lamaran Anda sebagai ${positionLabel} telah kami terima.`,
            heading: "Lamaran Anda Telah Kami Terima",
            bodyHtml,
        }),
    };
}

interface HrEmailData extends Omit<ApplicantEmailData, "position"> {
    position?: string;
}

export function getHrNotificationEmail(
    data: HrEmailData,
): { subject: string; html: string } {
    const positionLabel = data.position || "-";

    const bodyHtml = `
    <p style="margin: 12px 0; font-size: 14px; line-height: 1.6; font-family: ${FONT_STACK}; color: ${COLORS.textPrimary};">
      Ada lamaran baru masuk melalui form Open Recruitment:
    </p>

    ${renderDetailsTable(buildDetailRows({ ...data, position: positionLabel }, positionLabel))}

    <p style="margin: 12px 0; font-size: 13px; line-height: 1.6; font-family: ${FONT_STACK}; color: ${COLORS.textMuted};">
      Balas email ini untuk menghubungi pelamar langsung.
    </p>
  `;

    return {
        subject: data.position
            ? `Lamaran Baru: ${data.fullName} - ${data.position}`
            : `Lamaran Baru: ${data.fullName}`,
        html: renderLayout({
            previewText: `Lamaran baru dari ${data.fullName}`,
            heading: "Lamaran Baru Masuk",
            bodyHtml,
        }),
    };
}