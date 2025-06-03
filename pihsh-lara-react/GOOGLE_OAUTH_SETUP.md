# Google OAuth Setup Instructions

## 🚀 Quick Setup Guide

### 1. Install Laravel Socialite
```bash
composer require laravel/socialite
```

### 2. Run Database Migration
```bash
php artisan migrate
```

### 3. Create Google OAuth Application

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:8000/auth/google/callback` (for local development)
     - `https://yourdomain.com/auth/google/callback` (for production)

### 4. Configure Environment Variables

Add these to your `.env` file:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

### 5. Clear Config Cache
```bash
php artisan config:clear
php artisan cache:clear
```

## 🎯 How It Works

### Authentication Flow:
1. User clicks "Sign in with Google" button
2. Redirected to Google OAuth consent screen
3. User grants permissions
4. Google redirects back to your app with authorization code
5. App exchanges code for user information
6. User is created/logged in automatically

### Features Implemented:
- ✅ **Google Sign-In in Login Page** - "Continue with Google" button
- ✅ **Google Sign-Up in Register Page** - "Sign up with Google" button
- ✅ **Regular Navbar Buttons** - "Sign In" and "Sign Up" route to auth pages
- ✅ **Account Linking** - Links Google account to existing email accounts
- ✅ **Avatar Display** - Shows Google profile pictures in navbar
- ✅ **Automatic Registration** - Creates new users from Google data
- ✅ **Email Verification** - Google emails are pre-verified
- ✅ **Secure Authentication** - Uses Laravel's built-in auth system

### Database Changes:
- Added `google_id` field to store Google user ID
- Added `avatar` field to store profile picture URL
- Added `provider` field to track authentication method

## 🔧 Testing

### Local Testing:
1. Make sure your `.env` has correct Google credentials
2. Visit your app and click "Sign in with Google"
3. Complete Google OAuth flow
4. You should be logged in and redirected to dashboard

### Production Deployment:
1. Update `GOOGLE_REDIRECT_URI` in `.env` to your production domain
2. Add production URL to Google OAuth authorized redirect URIs
3. Test the complete flow on production

## 🛠 Troubleshooting

### Common Issues:

**"redirect_uri_mismatch" Error:**
- Check that your redirect URI in Google Console matches exactly
- Make sure there are no trailing slashes
- Verify the protocol (http vs https)

**"Client ID not found" Error:**
- Double-check your `GOOGLE_CLIENT_ID` in `.env`
- Run `php artisan config:clear`

**"Invalid client secret" Error:**
- Verify your `GOOGLE_CLIENT_SECRET` in `.env`
- Make sure there are no extra spaces

**User not being created:**
- Check Laravel logs: `tail -f storage/logs/laravel.log`
- Verify database connection
- Check if email already exists in database

## 🔐 Security Notes

- Google OAuth tokens are handled server-side for security
- User passwords are auto-generated for Google sign-ups
- Email verification is automatic for Google accounts
- All authentication uses Laravel's secure session management

## 📱 UI Features

### Navbar (Desktop & Mobile):
- **"Sign In"** button → Routes to `/login` page
- **"Sign Up"** button → Routes to `/register` page
- Shows user avatar when logged in (Google profile pic if available)

### Login Page (`/login`):
- **"Continue with Google"** button at the top
- Divider: "Or continue with email"
- Regular email/password form below
- "Don't have an account? Sign up here" link

### Register Page (`/register`):
- **"Sign up with Google"** button at the top
- Divider: "Or sign up with email"
- Regular registration form below
- Terms of service checkbox still required

### User Avatar Display:
- Shows Google profile picture when available
- Falls back to default user icon
- Displays in both desktop and mobile navbar menus

## 🎨 Customization

The Google sign-in buttons use official Google colors and styling guidelines. You can customize the appearance by modifying the CSS classes in `Navbar.jsx`.

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check Laravel logs for detailed error messages
4. Ensure Google OAuth app is properly configured
