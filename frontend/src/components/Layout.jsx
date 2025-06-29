import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
    <main className="flex-1 h-screen overflow-auto p-6 bg-[#f5f6fa]">{children}</main>
    </div>
  );
}
