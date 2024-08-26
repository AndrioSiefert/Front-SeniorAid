import { useState } from 'react';
import { Star, StarOff } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    setRating: (rating: number) => void;
}

export function StarRating({ rating, setRating }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className='flex'>
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type='button'
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                >
                    {star <= (hoverRating || rating) ? (
                        <Star className='text-yellow-500' />
                    ) : (
                        <StarOff className='text-gray-300' />
                    )}
                </button>
            ))}
        </div>
    );
}
