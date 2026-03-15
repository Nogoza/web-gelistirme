import { useState } from "react";
import { initialIdeas, createIdea } from "../Interfaces/IdeaModel";
import IdeaForm from "../Components/IdeaForm";
import IdeaCard from "../Components/IdeaCard";

export default function Home() {
    const [ideas, setIdeas] = useState(initialIdeas);
    const [editingIdea, setEditingIdea] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("Tümü");

    // Fikir Ekle veya Güncelle
    const handleSubmit = ({ title, description, category }) => {
        if (editingIdea) {
            // Güncelle
            setIdeas((prev) =>
                prev.map((idea) =>
                    idea.id === editingIdea.id
                        ? { ...idea, title, description, category }
                        : idea
                )
            );
            setEditingIdea(null);
        } else {
            // Yeni Ekle
            const newIdea = createIdea(title, description, category);
            setIdeas((prev) => [newIdea, ...prev]);
        }
    };

    // Fikir Sil
    const handleDelete = (id) => {
        setIdeas((prev) => prev.filter((idea) => idea.id !== id));
        if (editingIdea?.id === id) setEditingIdea(null);
    };

    // Düzenleme Modu
    const handleEdit = (idea) => {
        setEditingIdea(idea);
    };

    // Düzenleme İptal
    const handleCancelEdit = () => {
        setEditingIdea(null);
    };

    // Filtreleme
    const filteredIdeas = ideas.filter((idea) => {
        const matchSearch =
            idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            idea.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory =
            filterCategory === "Tümü" || idea.category === filterCategory;
        return matchSearch && matchCategory;
    });

    // Benzersiz kategoriler
    const allCategories = ["Tümü", ...new Set(ideas.map((i) => i.category))];

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xl shadow-lg shadow-primary-500/30">
                                💡
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                                    Fikir Kutusu
                                </h1>
                                <p className="text-xs text-surface-300 hidden sm:block">
                                    Hayallerinizdeki fikirleri not edin
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-xl">
                            <span className="text-2xl">🚀</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-primary-600">
                                    {ideas.length}
                                </span>
                                <p className="text-xs text-primary-400 font-medium">Fikir</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Ana İçerik */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {/* Üst: Form Bölümü */}
                <section className="mb-10">
                    <IdeaForm
                        onSubmit={handleSubmit}
                        editingIdea={editingIdea}
                        onCancelEdit={handleCancelEdit}
                    />
                </section>

                {/* Filtre ve Arama Bölümü */}
                <section className="glass-card p-4 md:p-5 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Arama */}
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-300">
                                🔍
                            </span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Fikir ara..."
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Kategori Filtre */}
                        <div className="flex flex-wrap gap-2">
                            {allCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filterCategory === cat
                                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/25"
                                        : "bg-white/60 text-surface-700 hover:bg-primary-50 hover:text-primary-600 border border-surface-200/50"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fikirler Grid */}
                {filteredIdeas.length > 0 ? (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredIdeas.map((idea) => (
                            <IdeaCard
                                key={idea.id}
                                idea={idea}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))}
                    </section>
                ) : (
                    <section className="glass-card p-12 text-center animate-fade-in">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-surface-700 mb-2">
                            Fikir Bulunamadı
                        </h3>
                        <p className="text-surface-300">
                            {ideas.length === 0
                                ? "Henüz bir fikir eklemediniz. Yukarıdaki formu kullanarak başlayın!"
                                : "Arama kriterlerinize uygun fikir bulunamadı."}
                        </p>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/30 bg-white/40 backdrop-blur-sm mt-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
                    <p className="text-sm text-surface-300">
                        💡 <span className="font-semibold text-primary-500">Fikir Kutusu</span>{" "}
                        — Hayallerinizdeki fikirleri not edin ve yönetin
                    </p>
                    <p className="text-xs text-surface-300 mt-1">
                        React + Vite + Tailwind CSS ile geliştirildi &copy; 2026
                    </p>
                </div>
            </footer>
        </div>
    );
}
