import Center from '../components/Center';
import Sidebar from '../components/Sidebar';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div>{/* {Player} */}</div>
      </div>
    );
  }

  return <div>Loading...</div>;
}
