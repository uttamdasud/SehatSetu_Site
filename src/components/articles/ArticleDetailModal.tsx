import React, { useState } from 'react';
import {
  X,
  Clock,
  Heart,
  Share2,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { HealthArticle } from '../../types';
import { useApp } from '../../context/AppContext';

interface ArticleDetailModalProps {
  article: HealthArticle | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  const { doctors, startBooking, startInstantConsultation, showToast } = useApp();
  const [likes, setLikes] = useState(article?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);

  if (!article) return null;

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      showToast('Thank you for liking this article!');
    }
  };

  const handleConsultAuthor = () => {
    const matchedDoc = doctors.find((d) => d.name.toLowerCase().includes(article.doctorAuthorName.toLowerCase()));
    onClose();
    if (matchedDoc) {
      startBooking(matchedDoc);
    } else {
      startInstantConsultation();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Cover Image & Close */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-slate-100">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/40 p-1.5 text-white hover:bg-black/60 transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-sm">
              {article.category}
            </span>
            <h2 className="mt-1 text-xl font-black text-white font-heading leading-tight drop-shadow-sm">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Article Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Doctor Author Card */}
          <div className="flex items-center justify-between rounded-2xl bg-emerald-50/70 p-3.5 border border-emerald-100">
            <div className="flex items-center gap-3">
              <img
                src={article.doctorAuthorImage}
                alt={article.doctorAuthorName}
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{article.doctorAuthorName}</h4>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                </div>
                <p className="text-[11px] text-emerald-900 font-medium">{article.doctorAuthorSpecialty}</p>
                <span className="text-[10px] text-slate-400">Published on {article.publishedDate}</span>
              </div>
            </div>

            <button
              onClick={handleConsultAuthor}
              className="rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition active:scale-95 flex items-center gap-1"
            >
              <Stethoscope className="h-3.5 w-3.5" />
              <span>Consult Doctor</span>
            </button>
          </div>

          {/* Reading Meta */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>{article.readTimeMinutes} min read</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 font-bold transition ${
                  isLiked ? 'text-rose-600' : 'text-slate-600 hover:text-rose-600'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-600' : ''}`} />
                <span>{likes}</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Article link copied to clipboard!');
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed font-normal">
            <p className="font-semibold text-slate-900 text-sm">{article.summary}</p>
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-3">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Have questions about these symptoms?
          </div>
          <button
            onClick={handleConsultAuthor}
            className="rounded-xl bg-emerald-800 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition flex items-center gap-1"
          >
            <span>Ask a Doctor</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
