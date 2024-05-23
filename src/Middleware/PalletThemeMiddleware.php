<?php

namespace MadEyeDeer\Pallet\Middleware;

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Illuminate\Contracts\Container\Container;
use Flarum\Settings\SettingsRepositoryInterface;

class PalletThemeMiddleware implements MiddlewareInterface
{
    protected Container $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $settings = $this->container->make(SettingsRepositoryInterface::class);
        $actor = $request->getAttribute('actor');
        $isGuest = $actor ? $actor->isGuest() : true;
        $showSideNavToGuests = $settings->get('madeyedeer-pallet-theme.show_side_nav_to_guests');

        $this->container->extend('flarum.less.custom_variables', function ($variables) use ($isGuest, $showSideNavToGuests) {
            $variables['show-side-nav'] = function() use ($showSideNavToGuests, $isGuest){
                return ($showSideNavToGuests == '1' || !$isGuest) ? 'true' : 'false';
            };
            return $variables;
        });

        return $handler->handle($request);
    }
}
