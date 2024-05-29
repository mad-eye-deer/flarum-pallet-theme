import { extend, override } from 'flarum/common/extend';

import app from 'flarum/common/app';
import AffixedSidebar from 'flarum/forum/components/AffixedSidebar';
import DiscussionList from 'flarum/forum/components/DiscussionList';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import ForumApplication from 'flarum/forum/ForumApplication';
import HeaderSecondary from 'flarum/common/components/HeaderSecondary';
import IndexPage from 'flarum/components/IndexPage';
import Link from 'flarum/components/Link';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Sidebar from './components/Sidebar';
import TagLinkButton from 'flarum/tags/components/TagLinkButton';
import TagsPage from 'flarum/tags/components/TagsPage';

import humanTime from 'flarum/helpers/humanTime';
import listItems from 'flarum/common/helpers/listItems';
import sortTags from 'flarum/tags/common/utils/sortTags';
import tagIcon from 'flarum/tags/common/helpers/tagIcon';
import tagLabel from 'flarum/tags/common/helpers/tagLabel';

// Function for hex to RGB conversion
// https://stackoverflow.com/a/5624139
function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) : null;
}

app.initializers.add('madeyedeer-pallet-theme', () => {
  if (!app.initializers.has('flarum-tags')) {
    console.error('[madeyedeer/flarum-pallet-theme] flarum/tags is not enabled');
    return;
  }

  extend(DiscussionListItem.prototype, 'oncreate', (out, vnode) => {
    var $discussionItem = $(vnode.dom).find('.DiscussionListItem-content');
    var $sticky = $discussionItem.find('.item-sticky');
    var $locked = $discussionItem.find('.item-locked');

    if ($sticky.length) {
      $sticky.closest('.DiscussionListItem').addClass('stickyDiscussion');
    }

    if ($locked.length) {
      $locked.closest('.DiscussionListItem').addClass('lockedDiscussion');
    }
  });

  extend(DiscussionPage.prototype, 'onupdate', function (out, vnode) {
    $(vnode.dom).find('nav .Button--primary').removeClass('Button--primary').addClass('Button--secondary');
  });

  extend(ForumApplication.prototype, 'mount', () => {
    const user = app.session.user;
    if (app.forum.attribute('showSideNavToGuests') === false && !user) {
      document.querySelector('.App-content').style.marginLeft = '0';
      return;
    }

    const header = document.getElementById('header-primary');
    const sidebarContainer = document.createElement('div');

    sidebarContainer.className = 'App-sidebar';
    header.parentNode.insertBefore(sidebarContainer, header.nextSibling);

    m.mount(sidebarContainer, Sidebar);
  });

  extend(HeaderSecondary.prototype, 'items', function (items) {
    const indexPage = new IndexPage();
    const newDiscussion = indexPage.sidebarItems().get('newDiscussion');
    items.add('newDiscussion', newDiscussion, 19);
  });

  extend(IndexPage.prototype, 'oncreate', function (out, vnode) {
    var tag = this.currentTag();
    const $container = $(vnode.dom).find('.container');
    const $sideNav = $(vnode.dom).find('.sideNav');

    $sideNav.addClass('sideNav--hidden');
    $container.addClass('container--shrink');

    if (tag) {
      $container.removeClass('container--shrink');
      $sideNav.removeClass('sideNav--hidden');
    }
  });

  extend(IndexPage.prototype, 'navItems', function (items) {
    if (app.current.matches(TagsPage)) return;

    const params = app.search.stickyParams();
    const tags = app.store.all('tags');
    const currentTag = this.currentTag();

    sortTags(tags).forEach((tag) => {
      items.remove('tag' + tag.id());
    });

    if (items.has('moreTags')) items.remove('moreTags');

    if (!currentTag) return;

    const addTag = (tag) => {
      let active = currentTag === tag;

      if (!active) active = currentTag.parent() === tag;

      items.remove('tag' + tag.id());
      items.add('navTag' + tag.id(), TagLinkButton.component({ model: tag, params, active }, tag?.name()), -14);
    };

    sortTags(tags)
      .filter(
        (tag) =>
          tag.position() !== null &&
          (tag === currentTag ||
            tag === currentTag.parent() ||
            (tag.isChild() && (tag.parent() === currentTag || tag.parent() === currentTag.parent())))
      )
      .forEach(addTag);

    const more = tags.filter((tag) => tag.position() === null).sort((a, b) => b.discussionCount() - a.discussionCount());

    more.forEach(addTag);
  });

  override(IndexPage.prototype, 'view', function () {
    return (
      <div className="IndexPage">
        {this.hero()}
        <div className="container">
          <div className="sideNavContainer">
            <AffixedSidebar>
              <nav className="IndexPage-nav sideNav">
                <ul>{listItems(this.sidebarItems().toArray())}</ul>
              </nav>
            </AffixedSidebar>
            <div className="IndexPage-results sideNavOffset">
              <div className="IndexPage-toolbar">
                <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
                <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
              </div>
              <DiscussionList state={app.discussions} />
            </div>
          </div>
        </div>
      </div>
    );
  });

  override(TagsPage.prototype, 'view', function () {
    if (this.loading) return <LoadingIndicator />;

    const pinned = this.tags.filter((tag) => tag.position() !== null);
    const cloud = this.tags.filter((tag) => tag.position() === null);

    return (
      <div className="TagsPage">
        {IndexPage.prototype.hero()}
        <div className="container">
          <nav className="TagsPage-nav IndexPage-nav sideNav">
            <ul>{listItems(IndexPage.prototype.sidebarItems().toArray())}</ul>
          </nav>
          <div className="TagsPage-content">
            <div className="TagFlex">
              {pinned.map((tag) => {
                const lastPostedDiscussion = tag.lastPostedDiscussion();
                const children = sortTags(tag.children() || []);

                return (
                  <div className="TagItem">
                    <div className="TagItem-borderLine" style={'border-color: rgba(' + hexToRgb(tag.color()) + ', 0.5)'}></div>
                    <div className="TagItem-col">
                      <div className="TagItem-infoContainer">
                        {tag.icon() && (
                          <div className="TagItem-icon">{tag.icon() && tagIcon(tag, { className: 'fa-3x' }, { useColor: false })}</div>
                        )}
                        <div className="TagItem-info">
                          <Link href={app.route.tag(tag)}>
                            <span className="TagItem-title">{tag.name()}</span>
                          </Link>
                          <p className="TagItem-desc">{tag.description()}</p>
                          {children ? (
                            <div className="TagItem-children">
                              {children.map((child) => [<Link href={app.route.tag(child)}>{child.name()}</Link>, ' '])}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      {lastPostedDiscussion ? (
                        <div className="TagItem-detailContainer">
                          <div className="TagItem-lastPostedDiscussion">
                            <Link
                              className="TagItem-lastPostedDiscussion-link"
                              href={app.route.discussion(lastPostedDiscussion, lastPostedDiscussion.lastPostNumber())}
                            >
                              <span className="TagItem-lastPostedDiscussion-title">{lastPostedDiscussion.title()}</span>
                            </Link>
                            {humanTime(lastPostedDiscussion.lastPostedAt())}
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {cloud.length ? <div className="TagCloud">{cloud.map((tag) => [tagLabel(tag, { link: true }), ' '])}</div> : ''}
          </div>
        </div>
      </div>
    );
  });
});
