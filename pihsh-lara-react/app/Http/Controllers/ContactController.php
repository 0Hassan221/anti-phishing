<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show()
    {
        // Return the contact page if you have one
        return Inertia::render('home/Contact'); // Adjust to your actual component/page
    }

    public function store(Request $request)
    {
        // Validate the form data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // Handle the data (e.g., save to DB or send email)
        // For now, just return success
        // Example: Mail::to('admin@example.com')->send(new ContactMail($validated));

        return redirect()->back()->with('success', 'Message sent successfully!');
    }
}
/*************/