import Button from 'flarum/common/components/Button';
import Component from 'flarum/common/Component';
import IndexPage from 'flarum/forum/components/IndexPage';
import ItemList from 'flarum/common/utils/ItemList';
import LinkButton from 'flarum/common/components/LinkButton';
import LogInModal from 'flarum/common/components/LogInModal';
import Separator from './Separator';
import SignUpModal from 'flarum/common/components/SignUpModal';

import avatar from 'flarum/common/helpers/avatar';
import formatNumber from 'flarum/utils/formatNumber';
import humanTime from 'flarum/utils/humanTime';
import listItems from 'flarum/common/helpers/listItems';

/**
 * The `Sidebar` component displays sidebar on the Forum Application.
 */
export default class Sidebar extends Component {
  view() {
    const user = app.session.user;
    if (app.forum.attribute('showSideNavToGuests') === false && !user) return;

    const indexPage = new IndexPage();
    const navItems = indexPage.navItems();

    return (
      <div class="App-sidebar-container">
        <div class="App-sidebar-user-block">
          {user
            ? [
                <div className="loggedIn">
                  <div class="avatarWrapper">
                    <div className="Avatar-container">
                      {avatar(user)}
                      <ul className="badges">{listItems(user.badges().toArray())}</ul>
                    </div>
                  </div>
                  <h4>{user.username()}</h4>
                  <p>
                    {app.translator.trans('core.forum.user.joined_date_text', {
                      ago: humanTime(user.joinTime()),
                    })}
                  </p>
                  <div class="App-sidebar-user-stats">
                    <div class="statItem">
                      <span>{app.translator.trans('core.forum.user.posts_link')}</span>
                      <span>{formatNumber(user.commentCount())}</span>
                    </div>
                    <div class="statItem">
                      <span>{app.translator.trans('core.forum.user.discussions_link')}</span>
                      <span>{formatNumber(user.discussionCount())}</span>
                    </div>
                  </div>
                </div>,
              ]
            : [
                <div className="guest">
                  <h4 className="guestGreeting">{app.translator.trans('madeyedeer-pallet-theme.forum.howdy')}</h4>
                  <p className="guestMessage">{app.translator.trans('madeyedeer-pallet-theme.forum.involve')}</p>
                  <div className="guestButtons">{this.sessionItems().toArray()}</div>
                </div>,
              ]}
        </div>
        <div class="App-sidebar-items">
          <div class="App-sidebar-items-container">
            <ul>
              {listItems(navItems.toArray())}
              {user ? listItems(this.sessionItems().toArray()) : ''}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Build an item list for users or visitors.
   *
   * @return {ItemList}
   */
  sessionItems() {
    const items = new ItemList();
    const user = app.session.user;

    if (user) {
      items.add('separator-top', Separator.component(), 50);

      items.add(
        'profile',
        LinkButton.component(
          {
            icon: 'fas fa-user',
            href: app.route.user(user),
          },
          app.translator.trans('core.forum.header.profile_button')
        ),
        40
      );

      items.add(
        'settings',
        LinkButton.component(
          {
            icon: 'fas fa-cog',
            href: app.route('settings'),
          },
          app.translator.trans('core.forum.header.settings_button')
        ),
        30
      );

      items.add('separator', Separator.component(), 25);

      if (app.forum.attribute('adminUrl')) {
        items.add(
          'administration',
          LinkButton.component(
            {
              icon: 'fas fa-wrench',
              href: app.forum.attribute('adminUrl'),
              target: '_blank',
            },
            app.translator.trans('core.forum.header.admin_button')
          ),
          20
        );
      }

      items.add(
        'logOut',
        LinkButton.component(
          {
            icon: 'fas fa-sign-out-alt',
            onclick: app.session.logout.bind(app.session),
          },
          app.translator.trans('core.forum.header.log_out_button')
        ),
        10
      );
    } else {
      if (app.forum.attribute('allowSignUp')) {
        items.add(
          'signUp',
          Button.component(
            {
              className: 'Button Button--secondary Button--block',
              onclick: () => app.modal.show(SignUpModal),
            },
            app.translator.trans('core.forum.header.sign_up_link')
          ),
          20
        );
      }

      items.add(
        'logIn',
        Button.component(
          {
            className: 'Button Button--secondary Button--block',
            onclick: () => app.modal.show(LogInModal),
          },
          app.translator.trans('core.forum.header.log_in_link')
        ),
        10
      );
    }

    return items;
  }
}
