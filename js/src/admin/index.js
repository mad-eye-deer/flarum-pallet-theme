import { extend } from 'flarum/common/extend';

import app from 'flarum/admin/app';
import AppearancePage from 'flarum/components/AppearancePage';

app.initializers.add('madeyedeer-pallet-theme', (app) => {
  extend(AppearancePage.prototype, 'oncreate', function () {
    $(this.element)
      .find('.AppearancePage-colors > .helpText')
      .append('<p class="themeText">' + app.translator.trans('madeyedeer-pallet-theme.admin.info') + '</p>')
  });

  app.extensionData
    .for('madeyedeer-pallet-theme')
    .registerSetting({
      setting: 'madeyedeer-pallet-theme.show_side_nav_to_guests',
      name: 'showSideNavToGuests',
      type: 'boolean',
      label: app.translator.trans('madeyedeer-pallet-theme.admin.show_side_nav_to_guests_label'),
      default: 'wassup',
    });
});
