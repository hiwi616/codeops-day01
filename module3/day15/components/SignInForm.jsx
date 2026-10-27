import { signIn } from "@/app/actions";
import { USERS } from "@/lib/session";

// Server component using a server action as the form action (works without JS).
export default function SignInForm({ next = "/checkout" }) {
  return (
    <form action={signIn} className="mt-4 rounded border border-stone-300 bg-white p-4">
      <p className="font-semibold">Sign in (demo accounts)</p>
      <input type="hidden" name="next" value={next} />
      <div className="mt-3 flex flex-wrap gap-3">
        {USERS.map((u) => (
          <button
            key={u.id}
            name="userId"
            value={u.id}
            className="rounded bg-green-800 px-4 py-2 text-sm text-white"
          >
            Continue as {u.name}
          </button>
        ))}
      </div>
    </form>
  );
}
