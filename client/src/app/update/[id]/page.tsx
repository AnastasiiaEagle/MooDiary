'use client'

import { useEffect, useState } from "react";
import axios from '../../../utils/axios'
import { useParams, useRouter } from "next/navigation";


export default function Post() {
    const [title, setTitle] = useState('');
    const [content, setСontent] = useState('');
    const [emotion, setEmotion] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const router = useRouter()
    const params = useParams()
    const id = params.id

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        const postData = {
            title,
            content,
            emotion
        }
        console.log(postData)

        try {
            const res = await axios.patch(`/posts/${id}`, postData, 
            {
                withCredentials: true
            })

            setSuccess('Дані оновлено');
            setTitle('');
            setСontent('');
            setLoading(false)

            if(res.status === 200){
                router.push('/');
            }
        } catch (error: any) {
            console.log(error)
            if (error.response) {
                setError(error.response.data?.message || 'Щось пішло не так...');
            } else {
                setError('Помилка при надсиланні');
            }
        }
    }

    useEffect(()=>{
         const getPostId = async () => {
            try {
                const res = await axios.get(`/posts/${id}`,
                {
                    withCredentials: true
                })

                setTitle(res.data.title);
                setСontent(res.data.content);
                setEmotion(res.data.emotion)
            } catch (error) {
                
            }
        }
        getPostId()
    }, [id])


    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="space-y-4 p-6 border rounded-lg shadow-lg bg-white w-full max-w-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Залишити відмітку</h2>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва:</label>
                <input
                    type="text"
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Вміст:</label>
                <textarea
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={e => setСontent(e.target.value)}
                    value={content}
                    required
                />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваш настрій:</label>
                <select
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={emotion}
                    onChange={e => setEmotion(e.target.value)}
                    required
                >
                    <option value="">Оберіть настрій</option>
                    <option value="HAPPY">😊 Щасливий</option>
                    <option value="SAD">😢 Сумний</option>
                    <option value="ANGRY">😠 Злий</option>
                    <option value="CALM">😌 Спокій</option>
                    <option value="EXCITED">🤩 Схвильований</option>
                </select>
                </div>

                <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                disabled={loading}
                >
                {loading ? "Зачекайте..." : "Створити"}
                </button>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                {success && <p className="text-green-500 text-center mt-2">{success}</p>}
            </form>
        </div>
    )
}