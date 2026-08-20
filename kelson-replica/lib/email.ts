const recipient = "info@kelson.co.zm";

async function getGraphAccessToken() {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph email settings are not configured.");
  }

  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Microsoft Graph token request failed with status ${response.status}.`);
  }

  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token) {
    throw new Error("Microsoft Graph token response did not contain an access token.");
  }

  return body.access_token;
}

export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const sender = process.env.GRAPH_SENDER || recipient;
  const token = await getGraphAccessToken();
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: `Contact form: ${subject}`,
        body: {
          contentType: "Text",
          content: [`Name: ${name}`, `Email: ${email}`, `Subject: ${subject}`, "", message].join("\n"),
        },
        from: { emailAddress: { address: sender } },
        toRecipients: [{ emailAddress: { address: recipient } }],
        replyTo: [{ emailAddress: { address: email } }],
      },
      saveToSentItems: true,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Microsoft Graph sendMail failed with status ${response.status}.`);
  }
}
