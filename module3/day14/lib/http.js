// One error shape everywhere: { error, fieldErrors }.
export function fail(error, status, fieldErrors = {}) {
  return Response.json({ error, fieldErrors }, { status });
}
