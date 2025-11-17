export interface ApiKey {
  id: number;
  name: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  last_used_at: string | null;
}

export interface ApiKeyWithKey extends ApiKey {
  key: string; // Only returned on creation
}

export interface CreateApiKeyRequest {
  username: string;
}

export interface UpdateApiKeyRequest {
  name?: string;
  enabled?: boolean;
}
