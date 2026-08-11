# === STAGE 1: Installer ===
FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Ambil package.json dari dalam folder src di host
COPY src/package.json src/package-lock.json* ./
RUN npm ci

# === STAGE 2: Builder ===
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Salin seluruh isi folder src ke container
COPY src/ .

# Jalankan kompilasi Next.js 16
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# === STAGE 3: Runner ===
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
