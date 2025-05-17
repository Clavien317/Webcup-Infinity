import { useState, useEffect } from "react";
import { User, Send, ThumbsUp, Flag, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function CommentSection({ pageId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des commentaires
    const fetchComments = async () => {
      setLoading(true);

      // Ici, vous feriez un appel API réel
      // const response = await fetch(`/api/pages/${pageId}/comments`);
      // const data = await response.json();

      // Données simulées
      const mockComments = [
        {
          id: 1,
          text: "This really touched my heart. I went through something similar last year.",
          author: "Michael Brown",
          createdAt: "2023-09-10T14:30:00Z",
          likes: 12,
        },
        {
          id: 2,
          text: "Beautifully written. Wishing you strength and peace as you move forward.",
          author: "Jennifer Lopez",
          createdAt: "2023-09-10T15:45:00Z",
          likes: 8,
        },
        {
          id: 3,
          text: "Thank you for sharing your story. It's inspiring to see how you're handling this difficult transition.",
          author: "Alex Johnson",
          createdAt: "2023-09-11T09:20:00Z",
          likes: 5,
        },
      ];

      setTimeout(() => {
        setComments(mockComments);
        setLoading(false);
      }, 500);
    };

    fetchComments();
  }, [pageId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Dans une application réelle, vous enverriez ceci à votre API
    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      author: "Current User", // Normalement, vous obtiendriez ceci de l'état d'authentification
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");

    // Appel API simulé
    // await fetch(`/api/pages/${pageId}/comments`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ text: newComment })
    // });
  };

  const handleLikeComment = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );

    // Appel API simulé
    // await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-base-300">
      <h3 className="font-medium mb-4">Comments</h3>

      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 mx-auto opacity-30 mb-2" />
          <p className="text-lg font-medium">No comments yet</p>
          <p className="text-sm opacity-70">
            Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              className={`bg-base-200 rounded-lg p-4 ${
                comment.isNew ? "border-l-4 border-primary" : ""
              }`}
              initial={comment.isNew ? { opacity: 0, y: -20 } : { opacity: 1 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <User className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-xs opacity-70 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                  <p className="text-sm mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <button
                        className={`btn btn-ghost btn-xs ${
                          comment.userVoted === "up" ? "text-primary" : ""
                        }`}
                        onClick={() => handleVote(comment.id, "up")}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <span className="text-xs">{comment.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className={`btn btn-ghost btn-xs ${
                          comment.userVoted === "down" ? "text-error" : ""
                        }`}
                        onClick={() => handleVote(comment.id, "down")}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <span className="text-xs">{comment.downvotes}</span>
                    </div>
                    <button className="btn btn-ghost btn-xs">
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="form-control">
          <div className="flex gap-2">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <User className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                  disabled={!newComment.trim()}
                >
                  <Send className="w-4 h-4" />
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {comments.length > 3 && (
        <div className="flex justify-center mt-6">
          <button className="btn btn-outline btn-sm">Load More Comments</button>
        </div>
      )}
    </div>
  );
}
