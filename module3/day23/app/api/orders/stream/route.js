import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(
        encoder.encode(
          `event: connected\ndata: {"message": "Live order stream connected"}\n\n`,
        ),
      );

      // Broadcast heartbeat & latest status every 4 seconds
      const interval = setInterval(() => {
        const payload = JSON.stringify({
          time: new Date().toISOString(),
          activeOrders: (globalThis.ORDERS_DB || []).length,
        });
        controller.enqueue(
          encoder.encode(`event: update\ndata: ${payload}\n\n`),
        );
      }, 4000);

      // Clean up on disconnect
      return () => clearInterval(interval);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
