# Admin API Documentation

This document describes the Admin API endpoints for connecting the marketing examples website to your clientadmin project.

## Authentication

All admin API endpoints require authentication using an API key. You can send the API key in one of two ways:

1. **Header**: `X-API-Key: your-api-key`
2. **Authorization Header**: `Authorization: Bearer your-api-key`

The API key is configured in the `.env` file as `ADMIN_API_KEY`.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: Your deployed URL

## Endpoints

### 1. Get All Data (Counts + Details)

**Endpoint**: `GET /api/admin/data`

**Description**: Returns counts and optionally full details of all users, subscribers, examples, and categories.

**Query Parameters**:
- `includeDetails` (boolean, optional): If `true`, returns full details. Default: `false`
- `page` (number, optional): Page number for pagination. Default: `1`
- `limit` (number, optional): Items per page. Default: `100`

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/admin/data?includeDetails=true&page=1&limit=50" \
  -H "X-API-Key: your-api-key"
```

**Response** (with `includeDetails=true`):
```json
{
  "counts": {
    "totalUsers": 10,
    "totalSubscribers": 25,
    "totalExamples": 9,
    "totalCategories": 8
  },
  "details": {
    "users": [
      {
        "id": "clx...",
        "email": "user@example.com",
        "name": "John Doe",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "subscribers": [
      {
        "id": "clx...",
        "email": "subscriber@example.com",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "examples": [
      {
        "id": "clx...",
        "slug": "airbnb-email-campaign",
        "title": "Airbnb's Personalized Travel Recommendations",
        "description": "...",
        "body": "...",
        "imageUrl": "https://...",
        "monthlyRevenue": 120000,
        "categories": [
          {
            "id": "clx...",
            "name": "Email Marketing",
            "slug": "email-marketing"
          }
        ],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "categories": [
      {
        "id": "clx...",
        "name": "Email Marketing",
        "slug": "email-marketing",
        "exampleCount": 3,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 50,
    "hasMore": {
      "users": false,
      "subscribers": false,
      "examples": false
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response** (with `includeDetails=false` or omitted):
```json
{
  "counts": {
    "totalUsers": 10,
    "totalSubscribers": 25,
    "totalExamples": 9,
    "totalCategories": 8
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. Get Stats Only

**Endpoint**: `GET /api/admin/stats`

**Description**: Returns only the counts (no details).

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/admin/stats" \
  -H "X-API-Key: your-api-key"
```

**Response**:
```json
{
  "totalUsers": 10,
  "totalSubscribers": 25,
  "totalExamples": 9,
  "totalCategories": 8,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

### 3. Get Users

**Endpoint**: `GET /api/admin/users`

**Description**: Returns paginated list of all users (passwords are excluded).

**Query Parameters**:
- `page` (number, optional): Page number. Default: `1`
- `limit` (number, optional): Items per page. Default: `100`

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/admin/users?page=1&limit=50" \
  -H "X-API-Key: your-api-key"
```

**Response**:
```json
{
  "users": [
    {
      "id": "clx...",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 10,
    "totalPages": 1,
    "hasMore": false
  }
}
```

---

### 4. Get Subscribers

**Endpoint**: `GET /api/admin/subscribers`

**Description**: Returns paginated list of all newsletter subscribers.

**Query Parameters**:
- `page` (number, optional): Page number. Default: `1`
- `limit` (number, optional): Items per page. Default: `100`

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/admin/subscribers?page=1&limit=50" \
  -H "X-API-Key: your-api-key"
```

**Response**:
```json
{
  "subscribers": [
    {
      "id": "clx...",
      "email": "subscriber@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 25,
    "totalPages": 1,
    "hasMore": false
  }
}
```

---

### 5. Get Examples

**Endpoint**: `GET /api/admin/examples`

**Description**: Returns paginated list of all marketing examples with their categories.

**Query Parameters**:
- `page` (number, optional): Page number. Default: `1`
- `limit` (number, optional): Items per page. Default: `100`

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/admin/examples?page=1&limit=50" \
  -H "X-API-Key: your-api-key"
```

**Response**:
```json
{
  "examples": [
    {
      "id": "clx...",
      "slug": "airbnb-email-campaign",
      "title": "Airbnb's Personalized Travel Recommendations",
      "description": "...",
      "body": "...",
      "imageUrl": "https://...",
      "monthlyRevenue": 120000,
      "categories": [
        {
          "id": "clx...",
          "name": "Email Marketing",
          "slug": "email-marketing"
        }
      ],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 9,
    "totalPages": 1,
    "hasMore": false
  }
}
```

---

### 6. Get Categories

**Endpoint**: `GET /api/admin/categories`

**Description**: Returns all categories with example counts.

**Example Request**:
```bash
curl -X GET "http://localhost:3000/api/admin/categories" \
  -H "X-API-Key: your-api-key"
```

**Response**:
```json
{
  "categories": [
    {
      "id": "clx...",
      "name": "Email Marketing",
      "slug": "email-marketing",
      "exampleCount": 3,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 8
}
```

---

## Error Responses

All endpoints return standard error responses:

**401 Unauthorized**:
```json
{
  "error": "Unauthorized. Invalid or missing API key."
}
```

**500 Internal Server Error**:
```json
{
  "error": "Failed to fetch...",
  "details": "Error details (in development)"
}
```

---

## Integration Example (JavaScript/TypeScript)

```typescript
const API_BASE_URL = 'http://localhost:3000';
const API_KEY = 'your-api-key';

// Fetch all data with details
async function fetchAllData() {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/data?includeDetails=true`,
    {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
}

// Fetch only stats
async function fetchStats() {
  const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
}

// Usage
fetchAllData().then((data) => {
  console.log('Counts:', data.counts);
  console.log('Users:', data.details?.users);
  console.log('Examples:', data.details?.examples);
});
```

---

## CORS Configuration

The API is configured to allow cross-origin requests. Update `next.config.js` or set the `ALLOWED_ORIGIN` environment variable to specify allowed origins.

## Environment Variables

Add to your `.env` file:

```env
ADMIN_API_KEY=your-secure-admin-api-key-change-this-in-production-min-32-chars
ALLOWED_ORIGIN=http://localhost:3001  # Optional: Your clientadmin project URL
```

---

## Security Notes

1. **Change the API key** in production to a strong, random string (minimum 32 characters)
2. **Use HTTPS** in production
3. **Restrict CORS origins** to only your clientadmin project domain
4. **Rate limiting** should be implemented in production
5. **Monitor API usage** for suspicious activity


