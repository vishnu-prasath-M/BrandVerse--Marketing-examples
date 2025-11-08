"use client";

import { useEffect, useState } from "react";

interface ActivityLog {
  id: string;
  type: string;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalSubscribers: number;
    totalExamples: number;
    totalCategories: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/stats", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load stats");
        setStats(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load stats");
      }
    };
    const loadActivity = async () => {
      try {
        const res = await fetch("/api/admin/activity", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load activity logs");
        setActivityLogs(data);
      } catch (e: any) {
        setError(e?.message || "Failed to load activity logs");
      }
    };
    load();
    loadActivity();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Key metrics at a glance</p>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-300/60 text-red-700 dark:text-red-300 rounded bg-red-50 dark:bg-red-900/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats ? stats.totalUsers : "—"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats ? stats.totalSubscribers : "—"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Examples</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats ? stats.totalExamples : "—"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Categories</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {stats ? stats.totalCategories : "—"}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
        <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {activityLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{log.user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{log.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.type === 'signup' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}



