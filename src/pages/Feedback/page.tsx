export default function Feedback() {
    return (
        <div>
            <h1>Feedback</h1>;
            <div>
                <h2>Feedback Form</h2>
                <form>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' />
                    </div>
                    <div>
                        <label htmlFor='feedback'>Feedback</label>
                        <textarea id='feedback' name='feedback'></textarea>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}
