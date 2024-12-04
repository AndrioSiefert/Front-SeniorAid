interface IFeedback {
    id: Key | null | undefined;
    giverId: number | null;
    receiverId: string | string[] | undefined;
    comment: string;
    rating: number;
}

export default IFeedback;
