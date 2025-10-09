# Installable App

This project scaffolds a desktop-friendly Next.js + Tauri application managed with pnpm. It also ships with a ready-to-use VS Code Dev Container for reproducible local environments.

## Prerequisites

- Node.js 20+ with pnpm (`curl -fsSL https://get.pnpm.io/install.sh | sh -`)
- Rust toolchain (`rustup` with the stable profile)
- Platform prerequisites for [Tauri 2](https://v2.tauri.app/start/prerequisites/) (WebKit/Gtk packages on Linux, Xcode command line tools on macOS, etc.)

## Install dependencies

```bash
pnpm install
```

## Run in development

- `pnpm dev` – run the Next.js web experience only.
- `pnpm tauri:dev` – run the full desktop app (spawns the Next.js dev server and the Tauri shell).

The web UI is available at [http://localhost:3000](http://localhost:3000) and is proxied into the Tauri window during desktop development.

## Build for distribution

```bash
pnpm tauri:build
```

This script produces static web assets with `next build` + `next export`, then bundles platform-specific artifacts via Tauri into `src-tauri/target/`.

## Dev Container

A ready-to-use container definition lives in `.devcontainer/devcontainer.json`. It includes Node.js, pnpm, Rust, and the system dependencies needed by Tauri, plus common VS Code extensions. Opening the project in VS Code with the Remote Containers extension will prompt you to reopen inside this environment.

## Project layout

- `src/` – Next.js App Router source.
- `public/` – static assets for the web layer.
- `src-tauri/` – Rust backend & Tauri configuration.
- `pnpm-lock.yaml` – precise dependency lockfile.
- `.devcontainer/` – development container definition.

Refer to the official documentation for deeper customization:
- [Next.js Docs](https://nextjs.org/docs)
- [Tauri v2 Docs](https://v2.tauri.app/)
