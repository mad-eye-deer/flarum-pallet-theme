import { extend } from 'flarum/common/extend';

import app from 'flarum/admin/app';
import AppearancePage from 'flarum/components/AppearancePage';

app.initializers.add('madeyedeer-pallet-theme', (app) => {
  extend(AppearancePage.prototype, 'oncreate', function () {
    console.log(
      $(this.element)
        .find('.AppearancePage-colors > .helpText')
        .append('<p class="themeText">' + app.translator.trans('madeyedeer-pallet-theme.admin.info') + '</p>')
    );
  });
});
