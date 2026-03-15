import { useState, useEffect, useRef } from "react";
import { categories } from "../Interfaces/IdeaModel";

export default function IdeaForm({ onSubmit, editingIdea, onCancelEdit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Diğer");
    const formRef = useRef(null);

    // Düzenleme moduna geçerken formu doldur
    useEffect(() => {
        if (editingIdea) {
            setTitle(editingIdea.title);
            setDescription(editingIdea.description);
            setCategory(editingIdea.category);
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            setTitle("");
            setDescription("");
            setCategory("Diğer");
        }
    }, [editingIdea]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        onSubmit({ title: title.trim(), description: description.trim(), category });

        setTitle("");
        setDescription("");
        setCategory("Diğer");
    };

    const isEditing = !!editingIdea;

    return (
        <div ref={formRef} className="glass-card p-6 md:p-8 animate-fade-in">
            {/* Form Başlığı */}
            <div className="flex items-center gap-3 mb-6">
                <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg ${isEditing
                            ? "bg-gradient-to-br from-amber-400 to-orange-500"
                            : "bg-gradient-to-br from-primary-500 to-primary-600"
                        }`}
                >
                    {isEditing ? "✏️" : "💡"}
                </div>
                <div>
                    <h2 className="text-xl font-bold text-surface-800">
                        {isEditing ? "Fikri Düzenle" : "Yeni Fikir Ekle"}
                    </h2>
                    <p className="text-sm text-surface-300">
                        {isEditing
                            ? "Fikrinizi güncelleyin"
                            : "Hayalinizdeki fikri not edin"}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Başlık */}
                <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                        Başlık
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Fikrinize bir başlık verin..."
                        className="input-field"
                        required
                    />
                </div>

                {/* Açıklama */}
                <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                        Açıklama
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Fikrinizi detaylıca açıklayın..."
                        rows={4}
                        className="textarea-field"
                        required
                    />
                </div>

                {/* Kategori */}
                <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">
                        Kategori
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input-field cursor-pointer"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Butonlar */}
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn-primary flex-1">
                        {isEditing ? "💾 Güncelle" : "➕ Fikir Ekle"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="btn-secondary"
                        >
                            ✕ İptal
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
