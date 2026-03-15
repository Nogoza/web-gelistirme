// Başlangıç fikirleri (Initial Ideas)
export const initialIdeas = [
    {
        id: 1,
        title: "Mobil Uygulama Geliştir",
        description:
            "React Native kullanarak cross-platform bir fitness takip uygulaması geliştir. Kullanıcılar günlük egzersizlerini kaydedebilsin ve ilerleme grafiklerini görebilsin.",
        category: "Teknoloji",
        createdAt: new Date("2026-03-10").toLocaleDateString("tr-TR"),
    },
    {
        id: 2,
        title: "Online Kurs Platformu",
        description:
            "Türkçe içerikli, etkileşimli bir online eğitim platformu kur. Video dersler, quizler ve sertifika sistemi dahil.",
        category: "Eğitim",
        createdAt: new Date("2026-03-12").toLocaleDateString("tr-TR"),
    },
    {
        id: 3,
        title: "Sürdürülebilir Yaşam Blogu",
        description:
            "Çevre dostu yaşam ipuçları, geri dönüşüm rehberleri ve sürdürülebilir ürün önerileri içeren bir blog platformu oluştur.",
        category: "Yaşam",
        createdAt: new Date("2026-03-14").toLocaleDateString("tr-TR"),
    },
];

// Kategori listesi
export const categories = [
    "Teknoloji",
    "Eğitim",
    "Yaşam",
    "İş",
    "Sanat",
    "Sağlık",
    "Diğer",
];

// Yeni fikir oluşturmak için fabrika fonksiyonu
export const createIdea = (title, description, category) => ({
    id: Date.now(),
    title,
    description,
    category: category || "Diğer",
    createdAt: new Date().toLocaleDateString("tr-TR"),
});
