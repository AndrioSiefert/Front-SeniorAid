interface IFeedback {
    giverId: number | null;
    receiverId: string | string[] | undefined;
    comment: string;
    rating: number;
}

export default IFeedback;
