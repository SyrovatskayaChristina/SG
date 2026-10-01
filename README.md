# SolanaGun Docs

Documentation for Solana Gun — a fast transaction landing service for Solana — built with [Mintlify](https://mintlify.com).

## Structure

```
docs.json              # Site config: theme, colors, navigation
introduction.mdx       # Overview, endpoints, tip addresses
how-to-set-up/
  quic.mdx             # QUIC (recommended)
  rpc.mdx              # RPC: JavaScript, Python, Go, Rust
  websocket.mdx        # WebSocket: Python
favicon.svg
```

## Local preview

```bash
npm i -g mint
mint dev
```

Open http://localhost:3000. Run the command from this folder (where `docs.json` is).

## Checks

```bash
mint broken-links
```

## Publishing

Connect this GitHub repository in the [Mintlify dashboard](https://dashboard.mintlify.com) — every push to the default branch deploys automatically.
