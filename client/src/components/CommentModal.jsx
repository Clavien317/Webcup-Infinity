/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUp, ArrowDown, Send } from 'lucide-react';

export default function CommentModal({ isOpen, onClose, pageId, comments: initialComments = [] }) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(initialComments);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            text: comment,
            author: "Current User",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${Date.now()}`,
            createdAt: new Date().toISOString(),
            votes: 0,
            hasVoted: null // null, 'up', or 'down'
        };

        setComments([newComment, ...comments]);
        setComment('');
    };

    const handleVote = (commentId, voteType) => {
        setComments(comments.map(c => {
            if (c.id === commentId) {
                const currentVote = c.hasVoted;
                let newVotes = c.votes;

                if (currentVote === voteType) {
                    // Annuler le vote
                    newVotes += (voteType === 'up' ? -1 : 1);
                    return { ...c, votes: newVotes, hasVoted: null };
                } else {
                    // Changer ou ajouter un vote
                    if (currentVote) {
                        newVotes += (currentVote === 'up' ? -1 : 1);
                    }
                    newVotes += (voteType === 'up' ? 1 : -1);
                    return { ...c, votes: newVotes, hasVoted: voteType };
                }
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
                            <h3 className="text-lg font-bold">Commentaires</h3>
                            <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    className="input input-bordered flex-1"
                                    placeholder="Ajouter un commentaire..."
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
                                        <div className="flex flex-col items-center gap-1">
                                            <button
                                                className={`btn btn-xs btn-ghost ${comment.hasVoted === 'up' ? 'text-primary' : ''}`}
                                                onClick={() => handleVote(comment.id, 'up')}
                                            >
                                                <ArrowUp size={16} />
                                            </button>
                                            <span className={`text-sm font-bold ${comment.votes > 0 ? 'text-primary' : comment.votes < 0 ? 'text-error' : ''}`}>
                                                {comment.votes}
                                            </span>
                                            <button
                                                className={`btn btn-xs btn-ghost ${comment.hasVoted === 'down' ? 'text-error' : ''}`}
                                                onClick={() => handleVote(comment.id, 'down')}
                                            >
                                                <ArrowDown size={16} />
                                            </button>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-base-200 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="avatar">
                                                        <div className="w-6 h-6 rounded-full">
                                                            <img src={comment.avatar} alt={comment.author} />
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold">{comment.author}</span>
                                                    <span className="text-xs opacity-50">
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p>{comment.text}</p>
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
