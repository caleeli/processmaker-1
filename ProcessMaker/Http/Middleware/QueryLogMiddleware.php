<?php

namespace ProcessMaker\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class QueryLogMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        global $serviceProviderTimes;
        $startTime = microtime(true);

        // enableQueryTracking();
        $response = $next($request);

        $queries = closeQueryTracking();
        $totalQueryTime = 0;
        foreach ($queries as $query) {
            $totalQueryTime += $query['time'] ?? 0;
        }
        $totalRequestTime = microtime(true) - LARAVEL_START;
        $endpointTime = microtime(true) - $startTime;

        // Formatear los tiempos para el header de Server-Timing
        $serverTiming = '';
        $i = 1;
        $totalServiceProviderTime = 0;
        foreach ($serviceProviderTimes as $time) {
            $dur = $time['time'];
            $totalServiceProviderTime += $dur;
            if ($time['time'] < 0.001) {
                continue;
            }
            $serverTiming .= $this->formatIndex($i++) . ".{$time['name']};dur=" . ($dur * 1000) . ",";
        }
        $serverTiming .= $this->formatIndex($i++) . ".TOTAL_ServiceProviders;dur=" . ($totalServiceProviderTime * 1000) . ",";

        $serverTiming .= $this->formatIndex($i++) . ".db;dur={$totalQueryTime},"
            . $this->formatIndex($i++).".endpoint;dur=" . ($endpointTime * 1000) . ","
            . $this->formatIndex($i++).".total;dur=" . ($totalRequestTime * 1000);

        // Agregar el header de Server-Timing a la respuesta
        $response->headers->set('Server-Timing', $serverTiming);

        return $response;
    }

    private function formatIndex($index): string
    {
        return str_pad($index, 2, '0', STR_PAD_LEFT);
    }
}
