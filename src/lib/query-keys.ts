export const queryKeys = {
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
    list: (filters?: string) => ['users', 'list', filters] as const,
  },
  trips: {
    all: ['trips'] as const,
    detail: (id: string) => ['trips', id] as const,
  },
} as const;

