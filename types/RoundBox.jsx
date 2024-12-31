export default function RoundBox({ children }) {
    return (
        <div className={`flex flex-col rounded-3xl bg-gray-50 w-full items-center mt-5 p-4`}>
            {children}
        </div>
    );
}
