<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactSubmittedMail;
use App\Mail\ContactResponseMail;

class ContactController extends Controller
{
    // PUBLIC SUBMIT (from your React form)
    public function submit(Request $request)
    {

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
        $settings=Setting::first();
        $contact = Contact::create($data);

        // Send mail to admin
        Mail::to(config('mail.from.address'))
            ->send(new ContactSubmittedMail($contact,$settings));

        return redirect()->back()->with('success', "Thank you for your message! We'll get back to you soon.");
    }

    // ADMIN LISTING
    public function index()
    {
        $contacts = Contact::latest()->paginate(20);

        return inertia('Admin/Contacts/Index', [
            'contacts' => $contacts
        ]);
    }

    // ADMIN RESPONSE
    public function respond(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $request->validate([
            'response' => 'required|string'
        ]);

        $contact->update([
            'response' => $request->response,
            'responded_at' => now()
        ]);

        // Send response email
        Mail::to($contact->email)
            ->send(new ContactResponseMail($contact));

        return back()->with('success', 'Response sent successfully.');
    }
    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);

        if (!$contact->read_at) {
            $contact->update([
                'read_at' => now()
            ]);
        }

        return back();
    }

    public function destroy()
    {

    }
}
