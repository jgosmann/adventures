import Imap from "imap"

export default async (email: string): Promise<string> => {
  const imap = new Imap({
    user: email,
    password: "password",
    host: "127.0.0.1",
    port: 3143,
  })
  await new Promise<void>((resolve, reject) => {
    imap.once("ready", () => resolve())
    imap.once("error", (err: Error) => reject(err))
    imap.connect()
  })
  return await new Promise((resolve, reject) => {
    imap.openBox("INBOX", true, (err, box) => {
      if (err) {
        reject(err)
      }
      const fetch = imap.seq.fetch(box.messages.total + ":*", {
        bodies: "",
      })
      fetch.on("message", msg => {
        msg.on("body", stream => {
          let content = ""
          stream.on("data", chunk => {
            content += chunk.toString("utf-8")
          })
          stream.once("end", () => {
            resolve(content)
          })
        })
      })
    })
  })
}
