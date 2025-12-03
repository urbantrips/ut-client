export const queryKeys = {
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
    list: (filters?: string) => ['users', 'list', filters] as const,
  },
} as const;

