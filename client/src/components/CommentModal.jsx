import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send } from 'lucide-react';

export default function CommentModal({ isOpen, onClose, pageId, comments: initialComments = [] }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(initialComments);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            text: comment,
            author: "Current User", // This would come from auth context
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${Date.now()}`,
            createdAt: new Date().toISOString(),
            likes: 0,
            isLiked: false
        };

        setComments([newComment, ...comments]);
        setComment('');
    };

    const handleLike = (commentId) => {
        setComments(comments.map(c => {
            if (c.id === commentId) {
                return {
                    ...c,
                    likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                    isLiked: !c.isLiked
                };
            }
            return c;
        }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-base-100 w-full max-w-lg rounded-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-bold">Comments</h3>
                            <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
                            {/* Comment Form */}
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered flex-1"
                                    placeholder="Write a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary">
                                    <Send size={20} />
                                </button>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <motion.div
                                        key={comment.id}
                                        className="flex gap-3"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full">
                                                <img src={comment.avatar} alt={comment.author} />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-base-200 rounded-lg p-3">
                                                <p className="font-semibold">{comment.author}</p>
                                                <p>{comment.text}</p>
                                            </div>
                                            <div className="flex gap-4 mt-1 text-sm">
                                                <button
                                                    className={`flex items-center gap-1 hover:text-primary transition-colors ${
                                                        comment.isLiked ? 'text-primary' : 'text-gray-500'
                                                    }`}
                                                    onClick={() => handleLike(comment.id)}
                                                >
                                                    <Heart size={14} fill={comment.isLiked ? "currentColor" : "none"} />
                                                    {comment.likes}
                                                </button>
                                                <span className="text-gray-500">
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
