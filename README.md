# @nivalis/whatsapp-client

A small, typed client for the **WhatsApp Cloud API** (Meta Graph API), focused on sending messages and handling common interactive patterns.

- ESM package (`"type": "module"`)
- Works in Node.js (fetch-enabled) and Bun
- TypeScript-first API

## Install

```bash
pnpm add @nivalis/whatsapp-client
```

Peer dependency: `typescript@^5`.

## Quick start

```ts
import { WhatsAppClient } from '@nivalis/whatsapp-client';

const client = new WhatsAppClient({
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID!,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
});

await client.sendMessage('15551234567', 'Hello from WhatsApp Cloud API');
```

## API

### `new WhatsAppClient(config)`

```ts
export type WhatsAppClientConfig = {
  phoneNumberId: string;
  accessToken: string;
};
```

The client sends requests to:

- `https://graph.facebook.com/v21.0/{phoneNumberId}/messages` for messaging operations
- `https://graph.facebook.com/v21.0/{mediaId}` for media lookups

### Send a text message

```ts
await client.sendMessage('15551234567', 'Hi!');
```

### React to a message

```ts
import { REACTION_EMOJIS } from '@nivalis/whatsapp-client';

await client.reactToMessage('15551234567', 'wamid.HBgLM...', REACTION_EMOJIS.SUCCESS);
```

Remove a reaction:

```ts
await client.removeReaction('15551234567', 'wamid.HBgLM...');
```

### Send interactive buttons

```ts
await client.sendInteractiveButtons('15551234567', 'Pick one:', [
  { id: 'choice_a', title: 'A' },
  { id: 'choice_b', title: 'B' },
]);
```

### Send a list message

```ts
await client.sendListMessage(
  '15551234567',
  'Choose a plan:',
  'View plans',
  [
    {
      title: 'Plans',
      rows: [
        { id: 'basic', title: 'Basic', description: '$9/mo' },
        { id: 'pro', title: 'Pro', description: '$19/mo' },
      ],
    },
  ],
);
```

Notes:

- Max 10 sections
- Max 10 rows per section

### Download media

```ts
const file = await client.downloadMedia('1234567890');
// `file` is a Buffer
```

## Error handling

If the Meta API responds with a non-2xx status, the client throws an error including the HTTP status and response body.

## Development

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

Useful scripts:

- `pnpm lint` / `pnpm lint:fix` (Biome)
- `pnpm test` (Bun)
- `pnpm build` (zshy)
- `pnpm ts` (typecheck)

## License

MIT
