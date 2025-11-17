export interface ApiKey {
  id: number;
  name: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
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
