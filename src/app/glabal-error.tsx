"use client";

export default function GlobalError() {
  return (
    <html>
      <body>
        <div>
          <h1 className="text-2xl mb-4 font-bold">Something went wrong</h1>
          <button
            className="flex gap-2 p-2 bg-grayishDark rounded-md items-center"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
