exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let email, firstname, lastname;
  try {
    const body = JSON.parse(event.body);
    email     = (body.email     || '').trim().toLowerCase();
    firstname = (body.firstname || '').trim();
    lastname  = (body.lastname  || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid email');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) };
  }

  const groupId = process.env.SENDER_GROUP_ID || 'dBvyON';
  const payload = { email, groups: [groupId] };
  if (firstname) payload.firstname = firstname;
  if (lastname)  payload.lastname  = lastname;

  try {
    const res = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDER_API_KEY}`,
        'Content-Type':  'application/json',
        'Accept':        'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true }),
      };
    }

    // Duplicate subscriber is fine — they're already on the list
    const msg = (data.message || '').toLowerCase();
    if (msg.includes('already') || msg.includes('exist') || msg.includes('duplicate')) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true }),
      };
    }

    throw new Error(data.message || 'Sender API error');
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
