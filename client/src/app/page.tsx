
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
import Header from '@/components/Header/Header';

export default function Home() {
  
  // const router = useRouter();

  // const tokenSearch = ()=>{
  //   const token = Cookies.get('token'); // Отримуємо токен з куків
  //   if (token) {
  //       console.log('Токен знайдений:', token);
  //   } else {
  //       console.log('Токен не знайдений');
  //       router.push('/auth');
  //   }
  // }

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

  // const deleteTask = async (id: number) => {
  //   const res = await fetch('/api/tasks', {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ id }),
  //   });

  //   if (res.ok) {
  //     setTasks((prev) => prev.filter((msg) => msg.id !== id));
  //   } else {
  //     console.error('Не вдалося видалити повідомлення');
  //   }
  // };

  // useEffect(() => {
  //   tokenSearch();
  //   fetchTasks();
  // }, []);

  return (
    <>
      <Header/>
    </>
  );
}
