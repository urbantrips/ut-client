'use client';

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-md">
        <p
          className="text-red-600 text-center text-sm"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {error}
        </p>
      </div>
    </div>
  );
}

