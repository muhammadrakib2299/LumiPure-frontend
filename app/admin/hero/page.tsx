'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    Plus,
    Trash2,
    Edit3,
    X,
    Upload,
    GripVertical,
    Eye,
    EyeOff,
    Film,
    ImageIcon,
    Save,
} from 'lucide-react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface HeroSlide {
    _id: string;
    title: string;
    subtitle: string;
    mediaType: 'image' | 'video';
    media: { public_id: string; url: string };
    buttonText: string;
    buttonLink: string;
    order: number;
    isActive: boolean;
}

const emptyForm = {
    title: '',
    subtitle: '',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    order: 0,
    isActive: true,
};

export default function AdminHeroPage() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<HeroSlide | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const isDemoMode = typeof window !== 'undefined' && localStorage.getItem('admin_demo_mode') === 'true';

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            setIsLoading(true);
            if (isDemoMode) {
                setSlides([]);
                setIsLoading(false);
                return;
            }
            const res = await api.get('/hero/all');
            const data = res as unknown as { success: boolean; data: { slides: HeroSlide[] } };
            setSlides(data?.data?.slides || []);
        } catch {
            setSlides([]);
        } finally {
            setIsLoading(false);
        }
    };

    const openCreate = () => {
        setEditing(null);
        setForm({ ...emptyForm, order: slides.length });
        setFile(null);
        setPreview(null);
        setShowModal(true);
    };

    const openEdit = (slide: HeroSlide) => {
        setEditing(slide);
        setForm({
            title: slide.title || '',
            subtitle: slide.subtitle || '',
            buttonText: slide.buttonText || '',
            buttonLink: slide.buttonLink || '',
            order: slide.order,
            isActive: slide.isActive,
        });
        setFile(null);
        setPreview(slide.media?.url || null);
        setShowModal(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleSave = async () => {
        if (!editing && !file) {
            toast.error('Please upload an image or video');
            return;
        }

        setSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('subtitle', form.subtitle);
            formData.append('buttonText', form.buttonText);
            formData.append('buttonLink', form.buttonLink);
            formData.append('order', form.order.toString());
            formData.append('isActive', form.isActive.toString());
            if (file) {
                formData.append('media', file);
            }

            if (editing) {
                await api.put(`/hero/${editing._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                } as Record<string, unknown>);
                toast.success('Slide updated');
            } else {
                await api.post('/hero', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                } as Record<string, unknown>);
                toast.success('Slide created');
            }

            setShowModal(false);
            fetchSlides();
        } catch (err: unknown) {
            const message = err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : 'Failed to save';
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this hero slide?')) return;
        setDeleting(id);
        try {
            await api.delete(`/hero/${id}`);
            toast.success('Slide deleted');
            fetchSlides();
        } catch {
            toast.error('Failed to delete');
        } finally {
            setDeleting(null);
        }
    };

    const toggleActive = async (slide: HeroSlide) => {
        try {
            await api.put(`/hero/${slide._id}`, { isActive: !slide.isActive });
            toast.success(slide.isActive ? 'Slide hidden' : 'Slide visible');
            fetchSlides();
        } catch {
            toast.error('Failed to update');
        }
    };

    return (
        <AdminLayout>
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hero Slides</h1>
                    <p className="text-gray-600 mt-1">Manage the homepage hero banner images and videos</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
                >
                    <Plus size={18} />
                    Add Slide
                </button>
            </div>

            {/* Slides List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-32 bg-white rounded-lg border border-gray-200 animate-pulse" />
                    ))}
                </div>
            ) : slides.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hero slides yet</h3>
                    <p className="text-gray-500 mb-6">Add your first hero image or video to showcase on the homepage.</p>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
                    >
                        <Plus size={18} />
                        Add First Slide
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {slides.map((slide) => (
                        <div
                            key={slide._id}
                            className="flex items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow"
                        >
                            {/* Order handle */}
                            <div className="text-gray-300 cursor-grab">
                                <GripVertical size={20} />
                            </div>

                            {/* Thumbnail */}
                            <div className="relative w-36 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                {slide.mediaType === 'video' ? (
                                    <video src={slide.media.url} className="w-full h-full object-cover" muted />
                                ) : slide.media?.url ? (
                                    <Image src={slide.media.url} alt={slide.title || 'Slide'} fill className="object-cover" sizes="144px" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ImageIcon size={24} />
                                    </div>
                                )}
                                {/* Media type badge */}
                                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/60 text-white flex items-center gap-1">
                                    {slide.mediaType === 'video' ? <Film size={10} /> : <ImageIcon size={10} />}
                                    {slide.mediaType}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                    {slide.title || <span className="text-gray-400 italic">No title</span>}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {slide.subtitle || <span className="text-gray-300 italic">No subtitle</span>}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-gray-400">Order: {slide.order}</span>
                                    {slide.buttonText && (
                                        <span className="text-xs text-gray-400">
                                            Button: {slide.buttonText} &rarr; {slide.buttonLink}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                    slide.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-500'
                                }`}
                            >
                                {slide.isActive ? 'Active' : 'Hidden'}
                            </span>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => toggleActive(slide)}
                                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                    title={slide.isActive ? 'Hide' : 'Show'}
                                >
                                    {slide.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                                <button
                                    onClick={() => openEdit(slide)}
                                    className="p-2 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    title="Edit"
                                >
                                    <Edit3 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(slide._id)}
                                    disabled={deleting === slide._id}
                                    className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editing ? 'Edit Slide' : 'Add New Slide'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="px-6 py-5 space-y-5">
                            {/* Media upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image or Video {!editing && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*,video/mp4,video/webm,video/quicktime"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {preview ? (
                                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                        {file?.type.startsWith('video/') || (editing?.mediaType === 'video' && !file) ? (
                                            <video src={preview} className="w-full h-48 object-cover" muted controls />
                                        ) : (
                                            <div className="relative h-48">
                                                <Image src={preview} alt="Preview" fill className="object-cover" sizes="500px" />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => fileRef.current?.click()}
                                            className="absolute bottom-2 right-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700 hover:bg-white transition-colors shadow-sm"
                                        >
                                            Change
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => fileRef.current?.click()}
                                        className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                                    >
                                        <Upload size={24} />
                                        <span className="text-sm font-medium">Click to upload image or video</span>
                                        <span className="text-xs">JPG, PNG, WebP, MP4, WebM (max 50MB)</span>
                                    </button>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Summer Collection"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                    maxLength={100}
                                />
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                                <input
                                    type="text"
                                    value={form.subtitle}
                                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                    placeholder="e.g. Discover our new organic skincare line"
                                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                    maxLength={200}
                                />
                            </div>

                            {/* Button text + link */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Text</label>
                                    <input
                                        type="text"
                                        value={form.buttonText}
                                        onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                                        placeholder="Shop Now"
                                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                        maxLength={30}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Link</label>
                                    <input
                                        type="text"
                                        value={form.buttonLink}
                                        onChange={(e) => setForm({ ...form, buttonLink: e.target.value })}
                                        placeholder="/shop"
                                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                    />
                                </div>
                            </div>

                            {/* Order + Active */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Order</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                                        min={0}
                                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                    />
                                </div>
                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={form.isActive}
                                            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                            className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                        />
                                        <span className="text-sm font-medium text-gray-700">Active (visible on site)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium disabled:opacity-50"
                            >
                                <Save size={16} />
                                {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </AdminLayout>
    );
}
