/** Cross-generation readback for the host code worker.
 *  Older hosts publish the program return value as value.result; the 0.2.3 scoped
 *  REPL rejects a top-level return and publishes inspect output as value.logs.
 *  Suites that need a value back must await into a slot and inspect JSON. */
export function ptcCallBody(name, argsText) {
  return "const __ptc_value = await tools." + name + "(" + argsText + "); inspect(JSON.stringify(__ptc_value));"
}

export function ptcProgramValue(result) {
  const log = result?.value?.logs?.[0]
  if (typeof log === "string" && log.trim() !== "") return JSON.parse(log.replace(/\n$/, ""))
  return result?.value?.result
}
