<?php

/**
 * Fork of Pallet theme for your forum. Original by Hasan Özbey.
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 *
 * @package    madeyedeer/flarum-pallet-theme
 * @author     Adrian McCay <opensource@madeyedeer.com>
 * @author     Hasan Özbey <hasanoozbey@gmail.com>
 * @copyright  2024 Adrian McCay
 * @copyright  2020 Hasan Özbey
 * @license    The MIT License
 * @version    Release: 0.2.0
 * @link       https://github.com/MadEyeDeer/flarum-pallet-theme
 * @link       https://github.com/the-turk/flarum-pallet-theme
 */

namespace MadEyeDeer\Pallet;

use Flarum\Extend;
use MadEyeDeer\Pallet\Middleware\PalletThemeMiddleware;

return [
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Settings())
        ->default('madeyedeer-pallet-theme.show_side_nav_to_guests', true)
        ->serializeToForum('showSideNavToGuests', 'madeyedeer-pallet-theme.show_side_nav_to_guests', 'boolval'),

    (new Extend\Middleware('forum'))
        ->add(PalletThemeMiddleware::class),

];
