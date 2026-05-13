<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Setting;

class TrackSiteVisits
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip for asset requests, API, etc. (optional but recommended)
        if ($this->shouldSkip($request)) {
            return $next($request);
        }

        // Increment only once per request (safe even if middleware runs multiple times)
        static $alreadyIncremented = false;

        if (!$alreadyIncremented) {
            Setting::incrementVisits();
            $alreadyIncremented = true;
        }

        return $next($request);
    }

    /**
     * Decide whether to skip tracking
     */
    protected function shouldSkip(Request $request): bool
    {
        return $request->is('admin/*') ||          // skip admin panel
            $request->is('api/*') ||            // skip API routes
            $request->wantsJson() ||            // skip JSON responses
            str_starts_with($request->path(), '_debugbar') ||
            str_starts_with($request->path(), 'horizon') ||
            str_starts_with($request->path(), 'telescope');
    }
}
