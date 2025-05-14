"use client"
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Header from '@/components/Header/Header';
import { jwtDecode } from 'jwt-decode';
import axios from '../utils/axios'
import Card from '@/components/Card/Card';
import { CarInt } from '@/types/card';


export default function Home() {
  const [cards, setCards] = useState<CarInt[]>([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();

  function isAccessTokenValid(token: string): boolean {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
}

  const tokenSearch = async()=>{
    const token = Cookies.get('refreshToken');
    const localToken = localStorage.getItem('accessToken');
    
    if(!token && !localToken){
        console.log('Токен не знайдений');
        router.push('/auth');
    }else if(localToken !== null){
      if(!isAccessTokenValid(localToken)){
        try {
            const res = await axios.get('/auth/refresh',
            {
                withCredentials: true
            }
            );
            if (res.data.accessToken) {
                localStorage.setItem('accessToken', res.data.accessToken);
            }
        } catch (error: any) {
            console.log(error)
        }
      }
    }
  }

  const getPosts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/posts', 
            {
                withCredentials: true
            });
      
      setLoading(false)
      setCards(res.data)

    } catch (error) {
      
    }
  }

  // const handleDelete = (id: number) => {
  //   setCards(cards.filter(card => card.id !== id))
  // };
  // const fetchTasks = async () => {
  //   const token = Cookies.get('token');
  //   if(token){
  //     const res = await fetch('/api/tasks',{
  //       method: 'GET',
  //       headers: {
  //         'ContentType': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },}
  //     );
      // if (res.ok) {
      //   const data = await res.json();
      //   setTasks(data);
      // } else {
      //   console.error('Не вдалося отримати повідомлення');
      // }
      // setLoading(false);
  //   }
  // };

  // const filterTasks = async (progres: string) =>{
  //   if(progres!==""){
  //     const res = await fetch('/api/filter', {
  //       method: 'POST',
  //       headers: {
  //         'ContentType': 'application/json',
  //       },
  //       body: JSON.stringify({progres}),
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
       
  //       setTasks(data);
        
  //     } else {
  //       console.error('Не вдалося отримати повідомлення');
  //     }
  //     setLoading(false);
  //   }else{
  //     fetchTasks();
  //   }
  // }
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/posts/${id}`, 
            {
                withCredentials: true
            });

      if (res.status === 200) {
      setCards((card) => card.filter((msg) => msg.id !== id));
      } else {
        console.error('Не вдалося видалити повідомлення');
      }
    } catch (error) {
      
    }}

  useEffect(() => {
    tokenSearch();
    getPosts();
  }, []);

  return (
    <>
      <Header/>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 px-5">
          {Array.isArray(cards) ? cards.map((card) => (
            <Card
              key={card.id}
              id={card.id} 
              title={card.title}
              content={card.content}
              emotion={card.emotion}
              onDelete={(id) => {
                handleDelete(id).catch(console.error);
              }}
            />
          )): "Список порожній =("}
        </ul>
      )}
    </>
  );
}


// можна зробити поіменний вивід користувачів та їх карток на окремій сторінці