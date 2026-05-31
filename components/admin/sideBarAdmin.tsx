export default function SideBarAdmin() {
  return (
    <div className="w-64 h-screen bg-primary p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <a
          href="/admin/dashboard"
          className="text-secondary hover:text-accent transition"
        >
          Dashboard
        </a>
        <a
          href="/admin/events"
          className="text-secondary hover:text-accent transition"
        >
          Manage Events
        </a>
        <a
          href="/admin/users"
          className="text-secondary hover:text-accent transition"
        >
          Manage Users
        </a>
        <a
          href="/admin/settings"
          className="text-secondary hover:text-accent transition"
        >
          Settings
        </a>
      </nav>
    </div>
  );
}
