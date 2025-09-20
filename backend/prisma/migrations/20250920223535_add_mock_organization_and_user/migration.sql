-- Insert mock organization
INSERT INTO "public"."Organization" ("id", "name", "createdAt", "updatedAt") VALUES
('04549232-1eaa-40a4-90d2-6fe4a5b19bfc', 'My org', '2025-09-20 13:35:13.725', '2025-09-20 13:35:13.725');

-- Insert mock user
INSERT INTO "public"."User" ("id", "email", "displayName", "createdAt", "updatedAt", "organizationId") VALUES
('B4549232-1eaa-40a4-90d2-6fe4a5b19bff', 'kevinpiac@gmail.com', 'Kevin', '2025-09-20 13:35:39.235', '2025-09-20 13:35:39.235', '04549232-1eaa-40a4-90d2-6fe4a5b19bfc');
