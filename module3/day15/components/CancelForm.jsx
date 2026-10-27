"use client";

import { useActionState } from "react";
import { cancelOrder } from "@/app/actions";

// With `orderId` it is a Cancel button. Without it, it is a TEST TOOL: type any id
// (e.g. another user's order) to prove the ownership check lives inside the action.
export default function CancelForm({ orderId }) {
  const [state, formAction, pending] = useActionState(cancelOrder, null);
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      {orderId ? (
        <input type="hidden" name="orderId" value={orderId} />
      ) : (
        <>
          <label htmlFor="cancel-id" className="text-sm">
            Cancel by order id
          </label>
          <input id="cancel-id" name="orderId" placeholder="ord_801" className="rounded border border-stone-400 px-2 py-1 text-sm" />
        </>
      )}
      <button disabled={pending} className="rounded border border-red-700 px-3 py-1 text-sm text-red-800 disabled:opacity-60">
        {pending ? "Cancelling…" : "Cancel order"}
      </button>
      {state && !state.ok && <span role="alert" className="text-sm text-red-800">{state.error}</span>}
    </form>
  );
}
