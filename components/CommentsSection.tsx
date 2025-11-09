"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface CommentsSectionProps {
  exampleId: string;
}

export default function CommentsSection({ exampleId }: CommentsSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [exampleId]);

  const loadComments = async () => {
    setLoading(true);
    try {
      // TODO: Implement API endpoint for comments
      // const response = await fetch(`/api/examples/${exampleId}/comments`);
      // const data = await response.json();
      // setComments(data.comments || []);
      setComments([]);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    try {
      // TODO: Implement API endpoint for creating comments
      // const response = await fetch(`/api/examples/${exampleId}/comments`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text: newComment }),
      // });
      // const data = await response.json();
      // setComments([...comments, data.comment]);
      // setNewComment("");
      
      // Temporary: Just add to local state
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment,
        author: user.name || user.email || "Anonymous",
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
        Comments
      </h2>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="glass-strong rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-premium">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none mb-4"
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-strong rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8 text-center shadow-premium">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Sign in to leave a comment
          </p>
          <a
            href="/signin"
            className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
          >
            Sign In
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            Loading comments...
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="glass-strong rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-premium"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-premium">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {comment.author}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-600 dark:text-slate-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </section>
  );
}



