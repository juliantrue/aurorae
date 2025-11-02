FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    git \
    perl \
    cpanminus \
    libcgi-pm-perl \
    libhtml-parser-perl \
    gnupg \
    lsb-release \
    pkg-config \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    libjavascriptcoregtk-4.1-dev \
    libwebkit2gtk-4.1-dev \
    libsoup2.4-dev \
    librsvg2-dev \
    libssl-dev \
    ssh \
    xdg-utils \
    zip \
  && cpanm --notest CGI \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
  && apt-get update \
  && apt-get install -y --no-install-recommends nodejs \
  && npm install -g pnpm@latest-10 \
  && rm -rf /var/lib/apt/lists/*

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
  && . /root/.cargo/env \
  && cargo install tauri-cli tauri-driver

ENV PATH="/root/.cargo/bin:${PATH}"
