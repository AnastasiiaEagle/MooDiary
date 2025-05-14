import { useState } from "react";

type FilterProps = {
    onFilter: (emotion: string) => void;
}

export default function Filter({onFilter}:FilterProps) {
    const [emotion, setEmotion] = useState('');

    return (
        <div className="w-full bg-white shadow p-4 flex items-center justify-center">
            <div className="flex gap-4 w-full max-w-4xl">
                <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="border p-2 rounded w-full"
                >
                    <option value="">Оберіть настрій</option>
                    <option value="HAPPY">😊 Щасливий</option>
                    <option value="SAD">😢 Сумний</option>
                    <option value="ANGRY">😠 Злий</option>
                    <option value="CALM">😌 Спокій</option>
                    <option value="EXCITED">🤩 Схвильований</option>
                </select>

                <button
                onClick={() => onFilter(emotion)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                Пошук
                </button>
            </div>
        </div>
    );
}