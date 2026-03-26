@extends('layouts/contentNavbarLayout')
@section('content')
    <h2>Hello {{ $contact->name }},</h2>

    <p>Thank you for contacting us.</p>

    <p><strong>Your Message:</strong></p>
    <p>{{ $contact->message }}</p>

    <hr>

    <p><strong>Our Response:</strong></p>
    <p>{{ $contact->response }}</p>

    <br>
    <p>Best regards,<br>Admin Team</p>
@endsection
@push('scripts')
    <script type="module">
    </script>
@endpush
