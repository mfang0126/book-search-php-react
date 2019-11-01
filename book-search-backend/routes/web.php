<?php
    $router->group([
        'prefix' => 'api/',
    ], function () use ($router) {
        $router->get('/search', 'SearchController@search');
    });
