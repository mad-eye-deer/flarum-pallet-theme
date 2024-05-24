<?php

namespace MadEyeDeer\Pallet\Middleware;

use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Illuminate\Contracts\Container\Container;
use Flarum\Settings\SettingsRepositoryInterface;

use Flarum\Frontend\Assets;
use Flarum\Frontend\Compiler\Source\SourceCollector;

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
        $showSideNav = ($showSideNavToGuests == '1' || !$isGuest) ? 'true' : 'false';

        $this->container->resolving('flarum.assets.forum', function (Assets $assets) use ($showSideNav) {
            $assets->css(function (SourceCollector $sources) use ($showSideNav) {
                $sources->addString(function () use ($showSideNav) {
                    return "@show-side-nav: {$showSideNav};";
                });
            });
        });

        return $handler->handle($request);
    }
}
