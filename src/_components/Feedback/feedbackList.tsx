import IFeedback from '@/Interface/IFeedback';
import { useState } from 'react';

export default function FeedbackList() {
    const [feedbackList, setFeedbackList] = useState<IFeedback[]>([]);

    

    return (
        <div>
            {feedbackList.map((feedback) => (
                <div key={feedback.id}>
                    <h2>{feedback.comment}</h2>
                    <p>{feedback.rating}</p>
                </div>
            ))}
        </div>
    );
}
