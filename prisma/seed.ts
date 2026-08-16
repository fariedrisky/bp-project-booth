import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    await prisma.vacancy.upsert({
        where: {
            id: 1,
        },
        update: {
            title: "EVENT CREW",
            employmentType: "Freelance",
            image: "/assets/images/careers/crew-event.png",
            qualifications: [
                "Pria/Wanita, usia maksimal 25 tahun",
                "Bersemangat belajar dan siap berkembang bersama",
                "Menyukai dunia event & hospitality",
                "Bertanggung jawab serta mampu bekerja dalam tim",
                "Memiliki kendaraan pribadi (diutamakan dapat mengemudi)",
                "Mampu mengoperasikan komputer/laptop menjadi nilai tambah",
                "Terbuka untuk mahasiswa aktif",
            ],
            isActive: true,
        },
        create: {
            title: "EVENT CREW",
            employmentType: "Freelance",
            image: "/assets/images/careers/crew-event.png",
            qualifications: [
                "Pria/Wanita, usia maksimal 25 tahun",
                "Bersemangat belajar dan siap berkembang bersama",
                "Menyukai dunia event & hospitality",
                "Bertanggung jawab serta mampu bekerja dalam tim",
                "Memiliki kendaraan pribadi (diutamakan dapat mengemudi)",
                "Mampu mengoperasikan komputer/laptop menjadi nilai tambah",
                "Terbuka untuk mahasiswa aktif",
            ],
            isActive: true,
        },
    });

    console.log("Seed vacancy berhasil!");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });