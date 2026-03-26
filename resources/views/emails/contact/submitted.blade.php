<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New contact message – notification</title>
    <style>
        /* Reset and base styles – works in all major email clients */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            background-color: #e9f0f5;  /* soft background outside card */
            padding: 20px 12px;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        /* Outer container – centered card */
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 28px 28px 24px 24px;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(0, 20, 50, 0.12);
            border: 1px solid #dee9f0;
        }

        /* Header – company name with brand accent */
        .company-header {
            background: linear-gradient(135deg, #0b2b4f 0%, #123b66 100%);
            padding: 24px 28px 22px 28px;
            text-align: left;
        }
        .company-name {
            color: #ffffff;
            font-size: 26px;
            font-weight: 600;
            letter-spacing: -0.3px;
            line-height: 1.2;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .company-name span {
            font-weight: 300;
            color: #b6d4fe;
            font-size: 24px;
        }

        /* middle content area – message details */
        .content-area {
            padding: 32px 30px 30px 30px;
            background-color: #ffffff;
        }

        /* heading inside content */
        .mail-intro {
            margin-bottom: 28px;
            border-bottom: 2px solid #eef3f8;
            padding-bottom: 12px;
        }
        .mail-intro h2 {
            font-size: 22px;
            font-weight: 600;
            color: #1c2f48;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .mail-intro h2:before {
            content: "✉️";
            font-size: 26px;
            margin-right: 8px;
        }

        /* field rows – like name, email, subject */
        .field-row {
            margin-bottom: 18px;
            display: flex;
            align-items: flex-start;
            line-height: 1.5;
        }
        .field-label {
            min-width: 90px;
            font-weight: 600;
            color: #2e475d;
            font-size: 16px;
        }
        .field-value {
            color: #173247;
            font-size: 17px;
            font-weight: 500;
            word-break: break-word;
            flex: 1;
        }

        /* message box – distinct background */
        .message-box {
            background: #f4f9ff;
            border-left: 5px solid #2266a8;
            padding: 22px 22px 18px 22px;
            border-radius: 18px;
            margin: 24px 0 16px 0;
        }
        .message-box p strong {
            font-size: 17px;
            color: #0b2b4f;
            display: inline-block;
            margin-bottom: 10px;
        }
        .message-content {
            font-size: 16px;
            line-height: 1.7;
            color: #1f3a4f;
            white-space: pre-line;          /* respect line breaks */
            word-wrap: break-word;
            background-color: #ffffff;
            padding: 18px 20px;
            border-radius: 14px;
            border: 1px solid #d9e6f2;
            margin-top: 8px;
        }

        /* subtle metadata line (optional) */
        .submitted-note {
            font-size: 14px;
            color: #667f99;
            margin-top: 10px;
            font-style: italic;
            border-top: 1px dashed #cbdae7;
            padding-top: 15px;
        }

        /* footer – company address & phone from settings simulation */
        .company-footer {
            background-color: #f0f6fd;
            padding: 24px 30px 26px 30px;
            border-top: 1px solid #cbdbe9;
            text-align: left;
        }
        .footer-contact {
            display: flex;
            flex-wrap: wrap;
            gap: 28px;
            align-items: center;
            justify-content: flex-start;
        }
        .address-block, .phone-block {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #1f3f5c;
            font-size: 16px;
            font-weight: 500;
            background: rgba(255,255,255,0.5);
            padding: 6px 16px 6px 10px;
            border-radius: 40px;
            backdrop-filter: blur(2px);
        }
        .address-icon, .phone-icon {
            font-size: 22px;
            line-height: 1;
        }
        .footer-text {
            width: 100%;
            margin-top: 16px;
            font-size: 14px;
            color: #4d6278;
            border-top: 1px solid #c5d6e8;
            padding-top: 16px;
            text-align: center;
        }

        /* responsive tweaks for tiny screens */
        @media screen and (max-width: 480px) {
            body { padding: 8px; }
            .company-header { padding: 20px 18px; }
            .company-name { font-size: 22px; }
            .content-area { padding: 20px 18px; }
            .field-row { flex-direction: column; margin-bottom: 14px; }
            .field-label { min-width: auto; margin-bottom: 3px; font-size: 15px; }
            .field-value { font-size: 16px; }
            .message-box { padding: 16px; }
            .message-content { padding: 14px; }
            .company-footer { padding: 20px 18px; }
            .footer-contact { gap: 18px; }
        }

        /* outlook / desktop spacing */
        .fallback-table {
            width: 100%;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
<!-- main card wrapper -->
<div class="email-wrapper">

    <!-- HEADER: company name (from settings / static) -->
    <div class="company-header">
        <div class="company-name">
            Cloud<span>Com</span>  <!-- you can replace with dynamic company name -->
        </div>
    </div>

    <!-- MIDDLE: message content + fields -->
    <div class="content-area">
        <div class="mail-intro">
            <h2>New Enquiry message</h2>
        </div>

        <!-- dynamic contact data (Laravel $contact) -->
        <div class="field-row">
            <div class="field-label">Name</div>
            <div class="field-value">{{ $contact->name }}</div>
        </div>
        <div class="field-row">
            <div class="field-label">Email</div>
            <div class="field-value">{{ $contact->email }}</div>
        </div>
        <div class="field-row">
            <div class="field-label">Phone</div>
            <div class="field-value">{{ $contact->phone }}</div>
        </div>
        <div class="field-row">
            <div class="field-label">Subject</div>
            <div class="field-value">{{ $contact->subject }}</div>
        </div>

        <!-- message block with extra styling -->
        <div class="message-box">
            <p><strong>📬 Message</strong></p>
            <div class="message-content">
                {{ $contact->message }}
            </div>
        </div>

        <!-- optional submitted timestamp (can be omitted or added via controller) -->
        <div class="submitted-note">
            ⏱️ submitted via website contact form
        </div>
    </div>

    <!-- FOOTER: address & phone from settings table -->
    <div class="company-footer">
        <div class="footer-contact">
            <!-- address with dynamic value from settings -->
            <div class="address-block">
                <span class="address-icon">🏢</span>
                <span>{{ $settings->address ?? '123 Business Park, Suite 100' }}</span>
            </div>
            <!-- phone with dynamic value from settings -->
            <div class="phone-block">
                <span class="phone-icon">📞</span>
                <span>{{ $settings->phone ?? '+1 (800) 555-0199' }}</span>
            </div>
        </div>
        <!-- small print / tagline -->
        <div class="footer-text">
            © CloudCom – intelligent software solutions
        </div>
    </div>
</div>

<!-- fallback note for email clients that disable external styles (already inlined) -->
<div style="display: none;">&#8203;</div>
</body>
</html>
