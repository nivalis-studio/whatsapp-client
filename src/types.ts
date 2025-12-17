export type Contact = {
  wa_id: number;
  created_at: string | null;
  last_message_at: string | null;
  profile_name: string | null;
  is_current?: boolean;
  in_chat: boolean;
};

export type WebhookImage = {
  id: string;
  sha256: string;
  mime_type: string;
};

export type WebhookMessage = {
  from: string;
  id: string;
  timestamp: string;
} & (
  | { type: 'image'; image: WebhookImage }
  | { type: 'reaction'; reaction: string }
  | {
      type: 'text';
      text: { body: string };
    }
  | {
      type: 'audio';
      audio: {
        mime_type: string;
        sha256: string;
        id: string;
        url: string;
        voice: boolean;
      };
    }
);

export type WebHookRequest = {
  object: 'whatsapp_business_account';
  entry: [
    {
      id: string;
      changes: [
        {
          field: string;
          value: {
            metadata: {
              display_phone_number: string;
              phone_number_id: string;
            };
            contacts: Array<Contact>;
            messages: Array<WebhookMessage>;
          };
        },
      ];
    },
  ];
};
