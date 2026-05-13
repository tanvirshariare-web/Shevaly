import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const ProductReviews = ({ reviews = [], onAddReview, avgRating, reviewCount, productName }: any) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const productReviews = reviews[productName] || [];

  const handleAddReview = () => {
    if (comment.trim() && userName.trim()) {
      onAddReview({
        id: Date.now(),
        userName,
        rating,
        comment,
        productName,
        date: new Date().toLocaleDateString('en-GB')
      });
      setComment('');
      setUserName('');
      setRating(5);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-8">Rating & Reviews</h3>
      
      {/* Overview */}
      <div className="flex flex-col sm:flex-row items-center gap-10 mb-10">
        <div className="flex flex-col items-center justify-center p-6 bg-[#FDE2E4] rounded-2xl min-w-[200px]">
          <div className="text-6xl font-black text-gray-900 flex items-center gap-2 mb-2">
            {Number(avgRating || 5).toFixed(1)}
          </div>
          <div className="flex text-gray-800 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.round(Number(avgRating || 5)) ? 'fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">By Verified Buyers</span>
        </div>
        
        <div className="flex-1 w-full space-y-3">
          {[5, 4, 3, 2, 1].map(star => {
            const count = productReviews.filter((r: any) => Math.round(r.rating) === star).length;
            const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : (star === 5 ? 80 : star === 4 ? 20 : 0);
            return (
              <div key={star} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <span className="w-3 text-right">{star}</span>
                <Star className={`w-4 h-4 ${star <= Math.round(Number(avgRating || 5)) ? 'fill-gray-800 text-gray-800' : 'text-gray-300'}`} />
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e6e8ea] shadow-sm text-gray-900 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="w-4 text-right">{count || (star === 5 ? 3 : star === 4 ? 1 : 0)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-10">
        <h4 className="text-gray-800 font-bold text-lg border-b border-gray-100 pb-4">Customer Reviews ({reviewCount})</h4>
        {productReviews.length > 0 ? (
          productReviews.map((review: any) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {review.userName} 
                    <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold">Verified</span>
                  </div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gray-800 text-gray-800' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p>No reviews yet. Be the first to review!</p>
          </div>
        )}
      </div>

      {/* Add Review Form */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h4 className="text-gray-900 font-bold text-lg mb-4">Write a Review</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none hover:scale-110 transition-transform"
                >
                  <Star className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Alamin"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you think about this product?"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none transition-all"
            />
          </div>
          
          <button 
            onClick={handleAddReview}
            disabled={!comment.trim() || !userName.trim()}
            className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};
