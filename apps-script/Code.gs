/**
 * Kepram contact form — Apps Script web app backend.
 *
 * Receives POSTs from the contact form on kepram.com, filters spam, then:
 *   - appends a row to the "Kepram Leads" sheet
 *   - emails a notification to NOTIFY_EMAIL
 *
 * Spam handling: when a submission looks like spam we DO NOT save or email,
 * and we return a normal "success" response so bots don't detect the block
 * and iterate. Legit submissions are saved + emailed as before.
 *
 * IMPORTANT: editing this file does nothing live until you redeploy.
 *   Deploy ▸ Manage deployments ▸ (pencil) ▸ Version: New version ▸ Deploy.
 * The form's action URL stays the same as long as you edit the existing
 * deployment instead of creating a new one.
 */

var NOTIFY_EMAIL = 'aravindmurari@gmail.com';
var MIN_FILL_MS  = 3000; // submissions faster than this are bots

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    var lead = {
      name:     (p.name     || '').trim(),
      business: (p.business || '').trim(),
      email:    (p.email    || '').trim(),
      phone:    (p.phone    || '').trim(),
      message:  (p.message  || '').trim(),
      website:  (p.website  || '').trim(),        // honeypot
      loadedAt: parseInt(p.form_loaded_at, 10)    // ms timestamp from page load
    };

    if (isSpam(lead)) {
      // Silent success — never saved, never emailed.
      return jsonSuccess();
    }

    saveLead(lead);
    emailLead(lead);
    return jsonSuccess();

  } catch (err) {
    // Don't leak errors to the client. Log for debugging in Executions.
    console.error('doPost failed: ' + (err && err.stack ? err.stack : err));
    return jsonSuccess();
  }
}

/**
 * Returns true if the submission should be silently dropped.
 * Ordered cheapest-and-most-certain first.
 */
function isSpam(lead) {
  // 1. Honeypot — a human never sees or fills this. Any value = bot.
  if (lead.website) return true;

  // 2. Time gap — page-load stamp vs now. Too fast = bot. Missing stamp is
  //    suspicious but not conclusive on its own, so it only adds to the score.
  if (!isNaN(lead.loadedAt)) {
    var elapsed = Date.now() - lead.loadedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) return true;
  }

  var blob = [lead.name, lead.business, lead.message].join(' ');

  // 3. Non-Latin script (Cyrillic / CJK / Arabic) in the human-typed fields.
  //    Kepram's market is English-speaking SMBs; this is a strong spam signal
  //    and would have killed the "RobertBip / Latvian message" lead.
  if (/[Ѐ-ӿ一-鿿぀-ヿ؀-ۿ]/.test(blob)) return true;

  // 4. Links anywhere — real prospects describe a problem, spam drops URLs/BBCode.
  if (/(https?:\/\/|www\.|\[url|<a\s)/i.test(blob)) return true;

  // 5. Soft signals — each weak alone; drop only when several stack up.
  var score = 0;
  if (!lead.business) score++;                                   // no business name
  if (/^[A-Z][a-z]+[A-Z][a-z]+$/.test(lead.name)) score++;       // "RobertBip" run-on
  if (!/\s/.test(lead.name) && lead.name.length > 0) score++;    // single token name
  if (/^[a-z]+\d{2,}@/i.test(lead.email)) score++;               // "zekisuquc419@..."
  if (lead.message.length < 15) score++;                         // too short to be real
  if (score >= 3) return true;

  return false;
}

function saveLead(lead) {
  // Same target as the original script — the active sheet of the bound spreadsheet.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    lead.name,
    lead.business,
    lead.email,
    lead.phone,
    lead.message
  ]);
}

function emailLead(lead) {
  var subject = 'New Kepram lead: ' + (lead.name || '(no name)');
  var body =
    'New contact form submission on kepram.com\n\n' +
    'Name:     ' + lead.name + '\n' +
    'Business: ' + lead.business + '\n' +
    'Email:    ' + lead.email + '\n' +
    'Phone:    ' + lead.phone + '\n\n' +
    'Message:\n' + lead.message + '\n\n' +
    'Submitted: ' + new Date().toString();
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function jsonSuccess() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
