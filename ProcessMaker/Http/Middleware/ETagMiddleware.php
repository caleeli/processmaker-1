<?php

namespace ProcessMaker\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ETagMiddleware
{
    public function handle(Request $request, Closure $next, $tableName)
    {
        // Get the ETAG version of the cache
        $etag = Cache::rememberForever('etag_version_' . $tableName, function () {
            return md5(time());
        });

        // Format the ETag header
        $etagHeader = "\"{$etag}\"";

        // Compare with the If-None-Match Header
        if ($request->headers->get('If-None-Match') === $etagHeader) {
            // Return 304 Not Modified if it matches
            return response('', 304)->header('ETag', $etagHeader)
                ->header('Cache-Control', 'private, max-age=0');
        }

        // Continue with the request
        $response = $next($request);

        $sucess = $response->getStatusCode() === 200;
        if ($sucess) {
            // Set the ETag and Cache-Control headers in the response
            $response->headers->set('ETag', $etagHeader);
            $response->headers->set('Cache-Control', 'private, max-age=0');
        }

        return $response;
    }
}
