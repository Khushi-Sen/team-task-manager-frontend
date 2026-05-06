export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="w-full bg-white shadow-sm px-8 py-4 flex justify-between items-center rounded-2xl">
      <h2 className="text-2xl font-bold">TaskFlow</h2>
      <div>
        <p className="font-medium">{user?.name}</p>
        <p className="text-sm text-slate-500">{user?.role}</p>
      </div>
    </div>
  );
}