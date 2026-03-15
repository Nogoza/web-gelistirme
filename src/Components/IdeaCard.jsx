import { useState } from "react";

// Kategori renklerini eşleştir
const categoryColors = {
    Teknoloji: "from-blue-500 to-cyan-500",
    Eğitim: "from-emerald-500 to-teal-500",
    Yaşam: "from-pink-500 to-rose-500",
    İş: "from-amber-500 to-orange-500",
    Sanat: "from-purple-500 to-violet-500",
    Sağlık: "from-green-500 to-lime-500",
    Diğer: "from-gray-500 to-slate-500",
};

const categoryIcons = {
    Teknoloji: "💻",
    Eğitim: "📚",
    Yaşam: "🌿",
    İş: "💼",
    Sanat: "🎨",
    Sağlık: "❤️",
    Diğer: "📌",
};

export default function IdeaCard({ idea, onDelete, onEdit }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => onDelete(idea.id), 400);
    };

    const gradient = categoryColors[idea.category] || categoryColors["Diğer"];
    const icon = categoryIcons[idea.category] || "📌";

    return (
        <div
            className={`glass-card group overflow-hidden animate-slide-up transition-all duration-500 ${isDeleting ? "opacity-0 scale-95 translate-y-4" : ""
                }`}
        >
            {/* Üst Gradient Bar */}
            <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

            <div className="p-5 md:p-6">
                {/* Üst Bilgi */}
                <div className="flex items-start justify-between mb-3">
                    <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white bg-gradient-to-r ${gradient} shadow-sm`}
                    >
                        {icon} {idea.category}
                    </span>
                    <span className="text-xs text-surface-300 font-medium">
                        📅 {idea.createdAt}
                    </span>
                </div>

                {/* Başlık */}
                <h3 className="text-lg font-bold text-surface-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {idea.title}
                </h3>

                {/* Açıklama */}
                <p className="text-sm text-surface-700/70 leading-relaxed mb-5 line-clamp-3">
                    {idea.description}
                </p>

                {/* Alt Butonlar */}
                <div className="flex gap-2 pt-3 border-t border-surface-200/50">
                    <button
                        onClick={() => onEdit(idea)}
                        className="btn-secondary flex-1 text-sm flex items-center justify-center gap-1.5"
                    >
                        ✏️ Düzenle
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn-danger flex-1 text-sm flex items-center justify-center gap-1.5"
                    >
                        🗑️ Sil
                    </button>
                </div>
            </div>
        </div>
    );
}
