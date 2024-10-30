<?php

namespace ProcessMaker\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class ETagMiddleware
{
    public function handle(Request $request, Closure $next, ...$tableNames)
    {
        if (empty($tableNames)) {
            return $next($request);
        }

        // Concatenate all table tags
        $etag = Auth::id() ?: '';
        foreach ($tableNames as $tableName) {
            // Get the ETAG version of the cache
            $cacheKey = "etag_version_{$tableName}";
            $etag .= Cache::rememberForever($cacheKey, function () {
                return md5(time());
            });
        }

        // Format the ETag header
        $etagHeader = "\"{$etag}\"";
        $etagClient = $request->headers->get('If-None-Match');
        $etagClientClean = str_replace('-gzip', '', trim($etagClient, '"'));

        // Compare with the If-None-Match Header
        if ($etagClientClean === $etag) {
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
