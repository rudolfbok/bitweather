export default function RoundBox({ children }) {
    return (
        <div className={`flex flex-col rounded-3xl backdrop-blur-3xl bg-black/5 w-full items-center mt-5 p-4`}>
            {children}
        </div>
    );
}
