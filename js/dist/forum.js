module.exports=function(t){var e={};function a(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=31)}([function(t,e){t.exports=flarum.core.compat["common/app"]},function(t,e){t.exports=flarum.core.compat["common/extend"]},function(t,e){t.exports=flarum.core.compat["common/helpers/listItems"]},function(t,e){t.exports=flarum.core.compat["common/components/LinkButton"]},function(t,e){t.exports=flarum.core.compat["components/IndexPage"]},function(t,e){t.exports=flarum.core.compat["common/components/Button"]},function(t,e){t.exports=flarum.core.compat["tags/common/utils/sortTags"]},function(t,e){t.exports=flarum.core.compat["common/Component"]},function(t,e){t.exports=flarum.core.compat["components/Link"]},function(t,e){t.exports=flarum.core.compat["common/utils/ItemList"]},function(t,e){t.exports=flarum.core.compat["utils/formatNumber"]},function(t,e){t.exports=flarum.core.compat["tags/components/TagsPage"]},function(t,e){t.exports=flarum.core.compat["forum/components/AffixedSidebar"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionHero"]},function(t,e){t.exports=flarum.core.compat["forum/components/DiscussionList"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionListItem"]},function(t,e){t.exports=flarum.core.compat["forum/components/DiscussionPage"]},function(t,e){t.exports=flarum.core.compat["forum/ForumApplication"]},function(t,e){t.exports=flarum.core.compat["common/components/HeaderSecondary"]},function(t,e){t.exports=flarum.core.compat["components/LoadingIndicator"]},function(t,e){t.exports=flarum.core.compat["common/components/LogInModal"]},function(t,e){t.exports=flarum.core.compat["common/components/SignUpModal"]},function(t,e){t.exports=flarum.core.compat["common/helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["utils/humanTime"]},function(t,e){t.exports=flarum.core.compat["tags/components/TagHero"]},function(t,e){t.exports=flarum.core.compat["tags/components/TagLinkButton"]},function(t,e){t.exports=flarum.core.compat["helpers/humanTime"]},function(t,e){t.exports=flarum.core.compat["tags/common/helpers/tagIcon"]},function(t,e){t.exports=flarum.core.compat["tags/common/helpers/tagLabel"]},,,function(t,e,a){"use strict";a.r(e);var n=a(1),o=a(0),r=a.n(o),s=a(12),i=a.n(s),c=a(5),u=a.n(c),l=a(13),p=a.n(l),d=a(14),f=a.n(d),g=a(15),v=a.n(g),h=a(16),b=a.n(h),x=a(17),y=a.n(x),N=a(18),I=a.n(N),k=a(4),_=a.n(k),T=a(8),P=a.n(T),C=a(19),w=a.n(C);function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function j(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,O(t,e)}var A=a(7),B=a.n(A),D=a(9),L=a.n(D),S=a(3),M=a.n(S),E=a(20),U=a.n(E),F=function(t){function e(){return t.apply(this,arguments)||this}return j(e,t),e.prototype.view=function(){return m("li",{className:"separator"})},e}(B.a);F.isListItem=!0;var H=F,z=a(21),G=a.n(z),W=a(22),q=a.n(W),J=a(10),K=a.n(J),Q=a(23),R=a.n(Q),V=a(2),X=a.n(V),Y=function(t){function e(){return t.apply(this,arguments)||this}j(e,t);var a=e.prototype;return a.view=function(){var t=app.session.user;return m("div",{class:"App-sidebar-container"},m("div",{class:"App-sidebar-user-block"},t?[m("div",{className:"loggedIn"},m("div",{class:"avatarWrapper"},m("div",{className:"Avatar-container"},q()(t),m("ul",{className:"badges"},X()(t.badges().toArray())))),m("h4",null,t.username()),m("p",null,app.translator.trans("core.forum.user.joined_date_text",{ago:R()(t.joinTime())})),m("div",{class:"App-sidebar-user-stats"},m("div",{class:"statItem"},m("span",null,app.translator.trans("core.forum.user.posts_link")),m("span",null,K()(t.commentCount()))),m("div",{class:"statItem"},m("span",null,app.translator.trans("core.forum.user.discussions_link")),m("span",null,K()(t.discussionCount())))))]:[m("div",{className:"guest"},m("h4",{className:"guestGreeting"},app.translator.trans("the-turk-pallet-theme.forum.howdy")),m("p",{className:"guestMessage"},app.translator.trans("the-turk-pallet-theme.forum.involve")),m("div",{className:"guestButtons"},this.sessionItems().toArray()))]),m("div",{class:"App-sidebar-items"},m("div",{class:"App-sidebar-items-container"},m("ul",null,X()(this.items().toArray()),t?X()(this.sessionItems().toArray()):""))))},a.sessionItems=function(){var t=new L.a,e=app.session.user;return e?(t.add("profile",M.a.component({icon:"fas fa-user",href:app.route.user(e)},app.translator.trans("core.forum.header.profile_button")),40),t.add("settings",M.a.component({icon:"fas fa-cog",href:app.route("settings")},app.translator.trans("core.forum.header.settings_button")),30),t.add("separator",H.component(),25),app.forum.attribute("adminUrl")&&t.add("administration",M.a.component({icon:"fas fa-wrench",href:app.forum.attribute("adminUrl"),target:"_blank"},app.translator.trans("core.forum.header.admin_button")),20),t.add("logOut",M.a.component({icon:"fas fa-sign-out-alt",onclick:app.session.logout.bind(app.session)},app.translator.trans("core.forum.header.log_out_button")),10)):(app.forum.attribute("allowSignUp")&&t.add("signUp",u.a.component({className:"Button Button--secondary Button--block",onclick:function(){return app.modal.show(G.a)}},app.translator.trans("core.forum.header.sign_up_link")),20),t.add("logIn",u.a.component({className:"Button Button--secondary Button--block",onclick:function(){return app.modal.show(U.a)}},app.translator.trans("core.forum.header.log_in_link")),10)),t},a.items=function(){var t=new L.a,e=app.search.stickyParams(),a=app.session.user;return t.add("allDiscussions",M.a.component({href:app.route("index",e),icon:"far fa-comments"},app.translator.trans("core.forum.index.all_discussions_link")),40),t.add("tags",m(M.a,{icon:"fas fa-th-large",href:app.route("tags")},app.translator.trans("flarum-tags.forum.index.tags_link")),20),a&&(t.add("following",M.a.component({href:app.route("following",e),icon:"fas fa-star"},app.translator.trans("flarum-subscriptions.forum.index.following_link")),30),t.add("separator",H.component(),10)),t},e}(B.a),Z=a(24),tt=a.n(Z),et=a(25),at=a.n(et),nt=a(11),ot=a.n(nt),rt=a(26),st=a.n(rt),it=a(6),ct=a.n(it),mt=a(27),ut=a.n(mt),lt=a(28),pt=a.n(lt);function dt(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(t,e,a,n){return e+e+a+a+n+n}));var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?parseInt(e[1],16)+","+parseInt(e[2],16)+","+parseInt(e[3],16):null}r.a.initializers.add("the-turk-pallet-theme",(function(){r.a.initializers.has("flarum-tags")?(Object(n.extend)(p.a.prototype,"view",(function(t){if(0!=r.a.forum.attribute("darkFlarum")){var e=ct()(this.attrs.discussion.tags());if(e&&e.length){var a=e[0].color();a&&(t.attrs.style={backgroundColor:"rgba("+dt(a)+", 0.6)"})}}})),Object(n.extend)(v.a.prototype,"oncreate",(function(t,e){var a=$(e.dom).find(".DiscussionListItem-content"),n=a.find(".item-sticky"),o=a.find(".item-locked");n.length&&n.closest(".DiscussionListItem").addClass("stickyDiscussion"),o.length&&o.closest(".DiscussionListItem").addClass("lockedDiscussion")})),Object(n.extend)(b.a.prototype,"onupdate",(function(t,e){$(e.dom).find("nav .Button--primary").removeClass("Button--primary").addClass("Button--secondary")})),Object(n.extend)(y.a.prototype,"mount",(function(){var t=document.getElementById("header-primary"),e=document.createElement("div");e.className="App-sidebar",t.parentNode.insertBefore(e,t.nextSibling),m.mount(e,Y)})),Object(n.extend)(I.a.prototype,"items",(function(t){var e=r.a.forum.attribute("canStartDiscussion")||!r.a.session.user;t.add("newDiscussion",u.a.component({icon:"fas fa-edit",className:"Button Button--primary IndexPage-newDiscussion Button--header",itemClassName:"App-primaryControl",onclick:function(){return _.a.prototype.newDiscussionAction().catch((function(){}))},disabled:!e},r.a.translator.trans(e?"core.forum.index.start_discussion_button":"core.forum.index.cannot_start_discussion_button")),19)})),Object(n.extend)(_.a.prototype,"oncreate",(function(t,e){var a=this.currentTag(),n=$(e.dom).find(".container"),o=$(e.dom).find(".sideNav");o.addClass("sideNav--hidden"),n.addClass("container--shrink"),a&&(n.removeClass("container--shrink"),o.removeClass("sideNav--hidden"))})),Object(n.extend)(_.a.prototype,"navItems",(function(t){if(!r.a.current.matches(ot.a)){var e=r.a.search.stickyParams(),a=r.a.store.all("tags"),n=this.currentTag();if(n){var o=function(a){var o=n===a;o||(o=n.parent()===a),t.remove("tag"+a.id()),t.add("navTag"+a.id(),at.a.component({model:a,params:e,active:o},null==a?void 0:a.name()),-14)};ct()(a).filter((function(t){return null!==t.position()&&(!t.isChild()||t.parent()===n||t.parent()===n.parent())})).forEach((function(e){t.remove("tag"+e.id())})),ct()(a).filter((function(t){return null!==t.position()&&(t===n||t===n.parent()||t.isChild()&&(t.parent()===n||t.parent()===n.parent()))})).forEach(o);var s=a.filter((function(t){return null===t.position()})).sort((function(t,e){return e.discussionCount()-t.discussionCount()}));s.forEach(o),s.length&&t.remove("moreTags")}}})),Object(n.override)(_.a.prototype,"view",(function(){return m("div",{className:"IndexPage"},this.hero(),m("div",{className:"container"},m("div",{className:"sideNavContainer"},m(i.a,null,m("nav",{className:"IndexPage-nav sideNav"},m("ul",null,X()(this.sidebarItems().toArray())))),m("div",{className:"IndexPage-results sideNavOffset"},m("div",{className:"IndexPage-toolbar"},m("ul",{className:"IndexPage-toolbar-view"},X()(this.viewItems().toArray())),m("ul",{className:"IndexPage-toolbar-action"},X()(this.actionItems().toArray()))),m(f.a,{state:r.a.discussions})))))})),Object(n.extend)(tt.a.prototype,"view",(function(t){if(0!=r.a.forum.attribute("darkFlarum")){var e=this.attrs.model.color();t.attrs.style=e?{color:"#fff",backgroundColor:"rgba("+dt(e)+", 0.6)"}:""}})),Object(n.override)(ot.a.prototype,"view",(function(){if(this.loading)return m(w.a,null);var t=this.tags.filter((function(t){return null!==t.position()})),e=this.tags.filter((function(t){return null===t.position()}));return m("div",{className:"TagsPage"},_.a.prototype.hero(),m("div",{className:"container"},m("nav",{className:"TagsPage-nav IndexPage-nav sideNav"},m("ul",null,X()(_.a.prototype.sidebarItems().toArray()))),m("div",{className:"TagsPage-content"},m("div",{className:"TagFlex"},t.map((function(t){var e=t.lastPostedDiscussion(),a=ct()(t.children()||[]);return m("div",{className:"TagItem"},m("div",{className:"TagItem-borderLine",style:"border-color: rgba("+dt(t.color())+", 0.5)"}),m("div",{className:"TagItem-col"},m("div",{className:"TagItem-infoContainer"},m("div",{className:"TagItem-icon"},t.icon()&&ut()(t,{className:"fa-3x"},{useColor:!1})),m("div",{className:"TagItem-info"},m(P.a,{href:r.a.route.tag(t)},m("span",{className:"TagItem-title"},t.name())),m("p",{className:"TagItem-desc"},t.description()),a?m("div",{className:"TagItem-children"},a.map((function(t){return[m(P.a,{href:r.a.route.tag(t)},t.name())," "]}))):"")),e?m("div",{className:"TagItem-detailContainer"},m("div",{className:"TagItem-lastPostedDiscussion"},m(P.a,{className:"TagItem-lastPostedDiscussion-link",href:r.a.route.discussion(e,e.lastPostNumber())},m("span",{className:"TagItem-lastPostedDiscussion-title"},e.title())),st()(e.lastPostedAt()))):""))}))),e.length?m("div",{className:"TagCloud"},e.map((function(t){return[pt()(t,{link:!0})," "]}))):"")))}))):console.error("[the-turk/flarum-pallet-theme] flarum/tags is not enabled")}))}]);
//# sourceMappingURL=forum.js.map