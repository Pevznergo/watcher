#!/bin/bash
set -e

APP_DIR="/var/www/watcher.aporto.tech"
APP_NAME="watcher-app"
PORT=3008

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Aporto.tech — Deploy Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Pull latest code ─────────────────────────
echo ""
echo "📦 [1/5] Pulling latest code from GitHub..."
cd "$APP_DIR" || { echo "❌ App directory not found: $APP_DIR"; exit 1; }
git pull origin main

# ── 2. Install dependencies ──────────────────────
echo ""
echo "📥 [2/5] Installing dependencies..."
cd my-app
npm ci --prefer-offline 2>/dev/null || npm install

# ── 3. Prisma — generate client & run migrations ─
echo ""
echo "🗄️  [3/5] Running Prisma migrations..."
npx prisma generate
npx prisma migrate deploy

# ── 4. Build Next.js ─────────────────────────────
echo ""
echo "🔨 [4/5] Building Next.js app..."
npm run build

# ── 5. Restart PM2 ───────────────────────────────
echo ""
echo "♻️  [5/5] Restarting application (PM2)..."
pm2 restart "$APP_NAME" 2>/dev/null || \
  pm2 start npm --name "$APP_NAME" -- start -- --port $PORT

pm2 save

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Deployment finished!"
echo "  🌍 https://aporto.tech"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
