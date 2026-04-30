exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const authHeader = event.headers.authorization || '';
  if (!process.env.NOTIFY_ADMIN_KEY || authHeader !== `Bearer ${process.env.NOTIFY_ADMIN_KEY}`) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  let details;
  try {
    details = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { title, date, location, description, signupUrl } = details;
  if (!title) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Event title required' }) };
  }

  const listId = parseInt(process.env.BREVO_LIST_ID || '2', 10);
  const siteUrl = process.env.SITE_URL || 'https://coastalcleans.org';

  const htmlContent = `
    <div style="font-family:'Lato',Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#f5f1e8;">
      <div style="background:#0f2a5e;border-radius:12px;padding:32px;margin-bottom:24px;text-align:center;">
        <img src="${siteUrl}/assets/logo.jpg" alt="CoastalCleans" style="width:64px;height:64px;border-radius:50%;margin-bottom:16px;display:block;margin-inline:auto;">
        <p style="color:rgba(245,241,232,0.7);font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">New Event Posted</p>
        <h1 style="color:#f5f1e8;font-size:26px;margin:0;">${title}</h1>
      </div>
      <div style="background:#ffffff;border-radius:12px;padding:32px;">
        ${date ? `<p style="margin:0 0 12px;color:#333;"><strong>📅 Date:</strong> ${date}</p>` : ''}
        ${location ? `<p style="margin:0 0 12px;color:#333;"><strong>📍 Location:</strong> ${location}</p>` : ''}
        ${description ? `<p style="margin:0 0 24px;color:#555;line-height:1.6;">${description}</p>` : ''}
        <a href="${signupUrl || `${siteUrl}/get-involved.html#events`}" style="display:inline-block;background:#0f2a5e;color:#ffffff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
          ${signupUrl ? 'Sign Up →' : 'View Event →'}
        </a>
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:24px;">
        You're receiving this because you signed up for CoastalCleans event notifications.<br>
        <a href="{{unsubscribeLink}}" style="color:#999;">Unsubscribe</a>
      </p>
    </div>
  `;

  try {
    const createRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        name: `Event: ${title} — ${new Date().toISOString().slice(0, 10)}`,
        subject: `🌊 New CoastalCleans Event: ${title}`,
        sender: { name: 'CoastalCleans', email: 'coastal.clean.30@gmail.com' },
        type: 'classic',
        htmlContent,
        recipients: { listIds: [listId] },
      }),
    });

    if (!createRes.ok) {
      const data = await createRes.json();
      throw new Error(data.message || 'Failed to create campaign');
    }

    const campaign = await createRes.json();

    const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaign.id}/sendNow`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
    });

    if (!sendRes.ok) {
      const data = await sendRes.json();
      throw new Error(data.message || 'Failed to send campaign');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, campaignId: campaign.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
