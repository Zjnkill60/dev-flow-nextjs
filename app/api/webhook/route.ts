import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { createUser, updateUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

//@ts-ignore
const webhookSecret: string = process.env.WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    return res.status(400).json({});
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    const userMongo = await createUser({
      clerkId: id,
      name: first_name + last_name,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    });
    return NextResponse.json({ message: "OK", user: userMongo });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    const userMongo = await updateUser({
      clerkId: id,
      dataUpdate: {
        name: first_name + last_name,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      },
    });
    return NextResponse.json({ message: "OK", user: userMongo });
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
