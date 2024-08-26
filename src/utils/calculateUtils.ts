export function calculateRating(ratings: number[]) {
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating, 0);
    return totalRatings ? sumRatings / totalRatings : 0;
}
