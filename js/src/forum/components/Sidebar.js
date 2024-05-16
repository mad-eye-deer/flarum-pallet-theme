import Button from 'flarum/common/components/Button';
import Component from 'flarum/common/Component';
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
              {listItems(this.items().toArray())}
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

  /**
   * Build an item list for navigation.
   *
   * @return {ItemList}
   */
  items() {
    const items = new ItemList();
    const params = app.search.stickyParams();
    const user = app.session.user;

    items.add(
      'allDiscussions',
      LinkButton.component(
        {
          href: app.route('index', params),
          icon: 'far fa-comments',
        },
        app.translator.trans('core.forum.index.all_discussions_link')
      ),
      40
    );

    // ext: v17development/flarum-blog
    if (app.forum.attribute('blogAddSidebarNav') && app.forum.attribute('blogAddSidebarNav') !== '0') {
      items.add(
        'blog',
        <LinkButton icon="fas fa-comment" href={app.route('blog')}>
          {app.translator.trans('v17development-flarum-blog.forum.blog')}
        </LinkButton>,
        39
      );
    }

    items.add(
      'tags',
      <LinkButton icon="fas fa-th-large" href={app.route('tags')}>
        {app.translator.trans('flarum-tags.forum.index.tags_link')}
      </LinkButton>,
      20
    );

    // ext: justoverclock/flarum-ext-keywords
    if (app.initializers.has('justoverclock/flarum-ext-keywords')) {
      items.add(
        'Glossary',
        <LinkButton href={app.route('GlossaryPage')} icon="fas fa-atlas">
          {app.translator.trans('flarum-ext-keywords.forum.title')}
        </LinkButton>,
        21
      );
    }

    // ext: fof/byobu
    if (app.initializers.has('askvortsov/flarum-categories')) {
      items.add(
        'categories',
        <LinkButton icon="fas fa-th-list" href={app.route('categories')}>
          {app.translator.trans('askvortsov-categories.forum.index.categories_link')}
        </LinkButton>,
        22
      );
    }

    // ext: clarkwinkelmann/flarum-ext-group-list
    if (app.forum.attribute('clarkwinkelmann-group-list.showSideNavLink')) {
      items.add(
        'clarkwinkelmann-group-list-item',
        LinkButton.component(
          {
            href: app.route('clarkwinkelmann-group-list'),
            icon: 'fas fa-users',
          },
          app.translator.trans('clarkwinkelmann-group-list.forum.nav')
        ),
        23
      );
    }

    // ext: fof/user-directory
    if (app.forum.attribute('canSeeUserDirectoryLink')) {
      items.add(
        'fof-user-directory',
        LinkButton.component(
          {
            href: app.route('fof_user_directory'),
            icon: 'far fa-address-book',
          },
          app.translator.trans('fof-user-directory.forum.page.nav')
        ),
        24
      );
    }

    if (user) {
      // ext: fof/byobu
      if (app.initializers.has('fof-byobu')) {
        items.add(
          'privateDiscussions',
          LinkButton.component(
            {
              icon: app.forum.data.attributes['byobu.icon-badge'],
              href: app.route('byobuPrivate'),
            },
            app.translator.trans('fof-byobu.forum.nav.nav_item')
          ),
          29
        );
      }

      items.add(
        'following',
        LinkButton.component(
          {
            href: app.route('following', params),
            icon: 'fas fa-star',
          },
          app.translator.trans('flarum-subscriptions.forum.index.following_link')
        ),
        30
      );

      items.add('separator', Separator.component(), 10);
    }

    // ext: justoverclock/flarum-ext-contactme
    if (app.initializers.has('justoverclock/flarum-ext-contactme')) {
      items.add(
        'contactPage',
        <LinkButton href={app.route('contactPage')} icon="fas fa-at">
          {app.translator.trans('flarum-ext-contactme.forum.title')}
        </LinkButton>,
        8
      );
    }

    return items;
  }
}
