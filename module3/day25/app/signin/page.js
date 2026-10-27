import { signIn } from "@/app/auth-actions";

export default async function SignInPage({ searchParams }) {
  // In Next.js 15+, searchParams is a Promise resolving to a plain object
  const params = await searchParams;
  const next = params?.next || "/";

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Sign In to Addis Eats
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Enter phone number to access protected routes.
        </p>

        <form action={signIn} className="flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              defaultValue="0911111111"
              required
              placeholder="0911111111 (Almaz), 0922222222 (Dawit)"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="text-xs text-slate-500 mt-1 block">
              Default: 0911111111 (Almaz / usr_1) | 0900000000 (Staff)
            </small>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Sign In &amp; Continue
          </button>
        </form>
      </div>
    </div>
  );
}
