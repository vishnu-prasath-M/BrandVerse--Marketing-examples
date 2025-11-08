# ClientAdmin Integration Guide

This guide shows how to connect your **clientadmin** project to the marketing examples website API.

## Quick Start

### 1. Set Up Environment Variables

In your **clientadmin** project, add these environment variables:

```env
MARKETING_API_URL=http://localhost:3000
MARKETING_API_KEY=your-secure-admin-api-key-change-this-in-production-min-32-chars
```

**Note**: Make sure the `MARKETING_API_KEY` matches the `ADMIN_API_KEY` in the marketing website's `.env` file.

### 2. Install Dependencies (if needed)

If you're using fetch in Node.js (older versions), you might need:

```bash
npm install node-fetch
# or
npm install axios
```

### 3. Create API Client

Create a file `lib/marketingApi.ts` (or `.js`) in your clientadmin project:

```typescript
// lib/marketingApi.ts

const API_URL = process.env.MARKETING_API_URL || 'http://localhost:3000';
const API_KEY = process.env.MARKETING_API_KEY || '';

interface MarketingStats {
  totalUsers: number;
  totalSubscribers: number;
  totalExamples: number;
  totalCategories: number;
  timestamp: string;
}

interface MarketingUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MarketingSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

interface MarketingExample {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  monthlyRevenue: number;
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface MarketingCategory {
  id: string;
  name: string;
  slug: string;
  exampleCount: number;
  createdAt: string;
  updatedAt: string;
}

class MarketingApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = API_URL;
    this.apiKey = API_KEY;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-API-Key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Get stats only
  async getStats(): Promise<MarketingStats> {
    return this.request<MarketingStats>('/api/admin/stats');
  }

  // Get all data with details
  async getAllData(includeDetails = true, page = 1, limit = 100) {
    const params = new URLSearchParams({
      includeDetails: includeDetails.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request(`/api/admin/data?${params}`);
  }

  // Get users
  async getUsers(page = 1, limit = 100) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request<{
      users: MarketingUser[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
      };
    }>(`/api/admin/users?${params}`);
  }

  // Get subscribers
  async getSubscribers(page = 1, limit = 100) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request<{
      subscribers: MarketingSubscriber[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
      };
    }>(`/api/admin/subscribers?${params}`);
  }

  // Get examples
  async getExamples(page = 1, limit = 100) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request<{
      examples: MarketingExample[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
      };
    }>(`/api/admin/examples?${params}`);
  }

  // Get categories
  async getCategories() {
    return this.request<{
      categories: MarketingCategory[];
      total: number;
    }>('/api/admin/categories');
  }
}

export const marketingApi = new MarketingApiClient();
export type {
  MarketingStats,
  MarketingUser,
  MarketingSubscriber,
  MarketingExample,
  MarketingCategory,
};
```

### 4. Use in Your ClientAdmin Dashboard

Example usage in a Next.js page or component:

```typescript
// app/dashboard/marketing/page.tsx (or similar)

'use client';

import { useEffect, useState } from 'react';
import { marketingApi, MarketingStats } from '@/lib/marketingApi';

export default function MarketingDashboard() {
  const [stats, setStats] = useState<MarketingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await marketingApi.getStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return null;

  return (
    <div>
      <h1>Marketing Website Stats</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="card">
          <h3>Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Subscribers</h3>
          <p className="text-2xl font-bold">{stats.totalSubscribers}</p>
        </div>
        <div className="card">
          <h3>Examples</h3>
          <p className="text-2xl font-bold">{stats.totalExamples}</p>
        </div>
        <div className="card">
          <h3>Categories</h3>
          <p className="text-2xl font-bold">{stats.totalCategories}</p>
        </div>
      </div>
    </div>
  );
}
```

### 5. Server-Side Usage (Next.js API Route)

```typescript
// app/api/admin/marketing-stats/route.ts

import { NextResponse } from 'next/server';
import { marketingApi } from '@/lib/marketingApi';

export async function GET() {
  try {
    const stats = await marketingApi.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch marketing stats' },
      { status: 500 }
    );
  }
}
```

## API Endpoints Summary

| Endpoint | Description | Returns |
|----------|-------------|---------|
| `GET /api/admin/stats` | Get counts only | `{ totalUsers, totalSubscribers, totalExamples, totalCategories, timestamp }` |
| `GET /api/admin/data?includeDetails=true` | Get counts + all details | Full data object with users, subscribers, examples, categories |
| `GET /api/admin/users?page=1&limit=100` | Get paginated users | `{ users: [...], pagination: {...} }` |
| `GET /api/admin/subscribers?page=1&limit=100` | Get paginated subscribers | `{ subscribers: [...], pagination: {...} }` |
| `GET /api/admin/examples?page=1&limit=100` | Get paginated examples | `{ examples: [...], pagination: {...} }` |
| `GET /api/admin/categories` | Get all categories | `{ categories: [...], total: number }` |

## Testing the Connection

Test the API connection from your terminal:

```bash
# Test stats endpoint
curl -X GET "http://localhost:3000/api/admin/stats" \
  -H "X-API-Key: your-api-key"

# Test full data endpoint
curl -X GET "http://localhost:3000/api/admin/data?includeDetails=true" \
  -H "X-API-Key: your-api-key"
```

## Troubleshooting

### CORS Errors

If you get CORS errors, make sure:
1. The `ALLOWED_ORIGIN` in the marketing website's `.env` matches your clientadmin URL
2. Or update `next.config.js` in the marketing website to allow your origin

### Authentication Errors

If you get 401 Unauthorized:
1. Check that `MARKETING_API_KEY` in clientadmin matches `ADMIN_API_KEY` in marketing website
2. Verify the API key is being sent in the `X-API-Key` header

### Connection Errors

If you can't connect:
1. Make sure the marketing website is running (`npm run dev`)
2. Check the `MARKETING_API_URL` is correct
3. Verify both projects are on the same network (or use the correct production URL)

## Production Deployment

1. **Update API URL**: Set `MARKETING_API_URL` to your production URL
2. **Use Strong API Key**: Generate a secure random API key (32+ characters)
3. **Restrict CORS**: Set `ALLOWED_ORIGIN` to your production clientadmin domain
4. **Use HTTPS**: Always use HTTPS in production
5. **Monitor Usage**: Add rate limiting and monitoring

## Example: Display All Data

```typescript
// Fetch and display all marketing data
async function displayAllMarketingData() {
  try {
    const data = await marketingApi.getAllData(true, 1, 100);
    
    console.log('Counts:', data.counts);
    console.log('Users:', data.details.users);
    console.log('Subscribers:', data.details.subscribers);
    console.log('Examples:', data.details.examples);
    console.log('Categories:', data.details.categories);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

That's it! Your clientadmin project is now connected to the marketing examples website API.


