/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "window",
    name: "Window",
    category: "web",
    description: "The Window widget displays content in a modal or non-modal HTML window.",
    depends: [ "draganddrop" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Draggable = kendo.ui.Draggable,
        isPlainObject = $.isPlainObject,
        activeElement = kendo._activeElement,
        proxy = $.proxy,
        extend = $.extend,
        each = $.each,
        template = kendo.template,
        BODY = "body",
        templates,
        NS = ".kendoWindow",
        // classNames
        KWINDOW = ".k-window",
        KWINDOWTITLE = ".k-window-title",
        KWINDOWTITLEBAR = KWINDOWTITLE + "bar",
        KWINDOWCONTENT = ".k-window-content",
        KWINDOWRESIZEHANDLES = ".k-resize-handle",
        KOVERLAY = ".k-overlay",
        KCONTENTFRAME = "k-content-frame",
        LOADING = "k-loading",
        KHOVERSTATE = "k-state-hover",
        KFOCUSEDSTATE = "k-state-focused",
        // constants
        VISIBLE = ":visible",
        HIDDEN = "hidden",
        CURSOR = "cursor",
        // events
        OPEN = "open",
        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",
        CLOSE = "close",
        REFRESH = "refresh",
        RESIZE = "resize",
        DRAGSTART = "dragstart",
        DRAGEND = "dragend",
        ERROR = "error",
        OVERFLOW = "overflow",
        ZINDEX = "zIndex",
        MINIMIZE_MAXIMIZE = ".k-window-actions .k-i-minimize,.k-window-actions .k-i-maximize",
        TITLEBAR_BUTTONS = ".k-window-titlebar .k-window-action",
        isLocalUrl = kendo.isLocalUrl;

    function defined(x) {
        return (typeof x != "undefined");
    }

    function constrain(value, low, high) {
        return Math.max(Math.min(value, high), low);
    }

    function windowObject(element, name) {
        var contentElement = element.children(KWINDOWCONTENT);

        return contentElement.data("kendoWindow") || contentElement.data("kendo" + name);
    }

    function openedModalWindows(name) {
        return $(KWINDOW).filter(function() {
            var wnd = $(this),
                winObj = windowObject(wnd, name);
            return winObj.options.modal && wnd.is(VISIBLE) && winObj.options.visible;
        }).sort(function(a, b){
            return +$(a).css("zIndex") - +$(b).css("zIndex");
        });
    }

    function sizingAction(actionId, callback) {
        return function() {
            var that = this,
                wrapper = that.wrapper,
                style = wrapper[0].style,
                options = that.options;

            if (options.isMaximized || options.isMinimized) {
                return;
            }

            that.restoreOptions = {
                width: style.width,
                height: style.height
            };

            wrapper
                .find(KWINDOWRESIZEHANDLES).hide().end()
                .find(MINIMIZE_MAXIMIZE).parent().hide()
                    .eq(0).before(templates.action({ name: "Restore" }));

            callback.call(that);

            return that;
        };
    }

    var Window = Widget.extend({
        init: function(element, options) {
            var that = this,
                wrapper,
                offset, visibility, display,
                isVisible = false,
                content,
                windowContent,
                id;

            Widget.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;
            content = options.content;

            that.appendTo = $(options.appendTo || document.body);

            that._animations();

            if (content && !isPlainObject(content)) {
                content = options.content = { url: content };
            }

            // remove script blocks to prevent double-execution
            element.find("script").filter(function() {
                return !this.type || this.type.toLowerCase().indexOf("script") >= 0;
            }).remove();

            if (!element.parent().is(that.appendTo)) {
                if (element.is(VISIBLE)) {
                    offset = element.offset();
                    isVisible = true;
                } else {
                    visibility = element.css("visibility");
                    display = element.css("display");

                    element.css({ visibility: HIDDEN, display: "" });
                    offset = element.offset();
                    element.css({ visibility: visibility, display: display });
                }
            }

            if (!defined(options.visible) || options.visible === null) {
                options.visible = element.is(VISIBLE);
            }

            wrapper = that.wrapper = element.closest(KWINDOW);

            if (!element.is(".k-content") || !wrapper[0]) {
                element.addClass("k-window-content k-content");
                that._createWindow(element, options);
                wrapper = that.wrapper = element.closest(KWINDOW);

                that._dimensions();
            }

            if (offset) {
                wrapper.css({
                    top: offset.top,
                    left: offset.left
                });
            }

            if (content) {
                that.refresh(content);
            }

            if (options.visible) {
                that.toFront();
            }

            windowContent = wrapper.children(KWINDOWCONTENT);
            that._tabindex(windowContent);

            if (options.visible && options.modal) {
                that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
            }

            wrapper
                .on("mouseenter" + NS, TITLEBAR_BUTTONS, function () { $(this).addClass(KHOVERSTATE); })
                .on("mouseleave" + NS, TITLEBAR_BUTTONS, function () { $(this).removeClass(KHOVERSTATE); })
                .on("click" + NS, TITLEBAR_BUTTONS, proxy(that._windowActionHandler, that));

            windowContent
                .on("keydown" + NS, proxy(that._keydown, that))
                .on("focus" + NS, function() { wrapper.addClass(KFOCUSEDSTATE); })
                .on("blur" + NS, function() { wrapper.removeClass(KFOCUSEDSTATE); });

            if (options.resizable) {
                wrapper.on("dblclick" + NS, KWINDOWTITLEBAR, function(e) {
                    if (!$(e.target).closest(".k-window-action").length) {
                        that.toggleMaximization();
                    }

                    return this;
                });

                each("n e s w se sw ne nw".split(" "), function(index, handler) {
                    wrapper.append(templates.resizeHandle(handler));
                });

                that.resizing = new WindowResizing(that);
            }

            if (options.draggable) {
                that.dragging = new WindowDragging(that);
            }

            id = element.attr("id");
            if (id) {
                id = id + "_wnd_title";
                wrapper.find(KWINDOWTITLEBAR)
                       .children(KWINDOWTITLE)
                       .attr("id", id);

                windowContent
                    .attr({
                        "role": "dialog",
                        "aria-labelledby": id
                    });
            }

            wrapper.add(wrapper.find(".k-resize-handle,.k-window-titlebar"))
                    .on("mousedown" + NS, proxy(that.toFront, that));

            that.touchScroller = kendo.touchScroller(element);

            that._resizeHandler = function(e) {
                return that._onDocumentResize(e);
            };

            $(window).on("resize", that._resizeHandler);

            if (options.visible) {
                that.trigger(OPEN);
                that.trigger(ACTIVATE);
            }

            kendo.notify(that);
        },

        _dimensions: function() {
            var that = this,
                wrapper = that.wrapper,
                element = that.element,
                options = that.options;

            that.title(options.title);

            each(["minWidth","minHeight","maxWidth","maxHeight"], function(_, prop) {
                var value = options[prop];
                if (value && value != Infinity) {
                    element.css(prop, value);
                }
            });

            if (options.width) {
                wrapper.width(constrain(parseInt(options.width, 10), options.minWidth, options.maxWidth));
            }

            if (options.height) {
                wrapper.height(constrain(parseInt(options.height, 10), options.minHeight, options.maxHeight));
            }

            if (!options.visible) {
                wrapper.hide();
            }
        },

        _animations: function() {
            var options = this.options;

            if (options.animation === false) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
            this._animations();
            this._dimensions();
        },

        events:[
            OPEN,
            ACTIVATE,
            DEACTIVATE,
            CLOSE,
            REFRESH,
            RESIZE,
            DRAGSTART,
            DRAGEND,
            ERROR
        ],

        options: {
            name: "Window",
            animation: {
                open: {
                    effects: { zoom: { direction: "in" }, fade: { direction: "in" } },
                    duration: 350
                },
                close: {
                    effects: { zoom: { direction: "out", properties: { scale: 0.7 } }, fade: { direction: "out" } },
                    duration: 350,
                    hide: true
                }
            },
            title: "",
            actions: ["Close"],
            modal: false,
            resizable: true,
            draggable: true,
            minWidth: 90,
            minHeight: 50,
            maxWidth: Infinity,
            maxHeight: Infinity,
            visible: null,
            height: null,
            width: null
        },

        _closable: function() {
            return $.inArray("close", $.map(this.options.actions, function(x) { return x.toLowerCase(); })) > -1;
        },

        _keydown: function(e) {
            var that = this,
                options = that.options,
                keys = kendo.keys,
                keyCode = e.keyCode,
                wrapper = that.wrapper,
                offset, handled,
                distance = 10,
                isMaximized = that.options.isMaximized,
                newWidth, newHeight;

            if (e.target != e.currentTarget) {
                return;
            }

            if (keyCode == keys.ESC && that._closable()) {
                that._close(true);
            }

            if (options.draggable && !e.ctrlKey && !isMaximized) {
                offset = kendo.getOffset(wrapper);

                if (keyCode == keys.UP) {
                    handled = wrapper.css("top", offset.top - distance);
                } else if (keyCode == keys.DOWN) {
                    handled = wrapper.css("top", offset.top + distance);
                } else if (keyCode == keys.LEFT) {
                    handled = wrapper.css("left", offset.left - distance);
                } else if (keyCode == keys.RIGHT) {
                    handled = wrapper.css("left", offset.left + distance);
                }
            }

            if (options.resizable && e.ctrlKey && !isMaximized) {
                if (keyCode == keys.UP) {
                    handled = true;
                    newHeight = wrapper.height() - distance;
                } else if (keyCode == keys.DOWN) {
                    handled = true;
                    newHeight = wrapper.height() + distance;
                } if (keyCode == keys.LEFT) {
                    handled = true;
                    newWidth = wrapper.width() - distance;
                } else if (keyCode == keys.RIGHT) {
                    handled = true;
                    newWidth = wrapper.width() + distance;
                }

                if (handled) {
                    wrapper.css({
                        width: constrain(newWidth, options.minWidth, options.maxWidth),
                        height: constrain(newHeight, options.minHeight, options.maxHeight)
                    });

                    that.trigger(RESIZE);
                }
            }

            if (handled) {
                e.preventDefault();
            }
        },

        _overlay: function (visible) {
            var overlay = this.appendTo.children(".k-overlay"),
                wrapper = this.wrapper;

            if (!overlay.length) {
                overlay = $("<div class='k-overlay' />");
            }

            overlay
                .insertBefore(wrapper[0])
                .toggle(visible)
                .css(ZINDEX, parseInt(wrapper.css(ZINDEX), 10) - 1);

            return overlay;
        },

        _windowActionHandler: function (e) {
            var target = $(e.target).closest(".k-window-action").find(".k-icon"),
                that = this;

            if (that._closing) {
                return;
            }

            each({
                "k-i-close": function() { that._close(true); },
                "k-i-maximize": that.maximize,
                "k-i-minimize": that.minimize,
                "k-i-restore": that.restore,
                "k-i-refresh": that.refresh
            }, function (commandName, handler) {
                if (target.hasClass(commandName)) {
                    e.preventDefault();
                    handler.call(that);
                    return false;
                }
            });
        },

        center: function () {
            var wrapper = this.wrapper,
                documentWindow = $(window);

            wrapper.css({
                left: documentWindow.scrollLeft() + Math.max(0, (documentWindow.width() - wrapper.width()) / 2),
                top: documentWindow.scrollTop() + Math.max(0, (documentWindow.height() - wrapper.height()) / 2)
            });

            return this;
        },

        title: function (text) {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                titleBar = wrapper.find(KWINDOWTITLEBAR),
                title = titleBar.children(KWINDOWTITLE),
                titleBarHeight = titleBar.outerHeight();

            if (!arguments.length) {
                return title.text();
            }

            if (text === false) {
                wrapper.addClass("k-window-titleless");
                titleBar.remove();
            } else {
                if (!titleBar.length) {
                    wrapper.prepend(templates.titlebar(extend(templates, options)));
                }

                wrapper.css("padding-top", titleBarHeight);
                titleBar.css("margin-top", -titleBarHeight);
            }

            title.text(text);

            return that;
        },

        content: function (html) {
            var content = this.wrapper.children(KWINDOWCONTENT),
                scrollContainer = content.children(".km-scroll-container");

            content = scrollContainer[0] ? scrollContainer : content;

            if (!html) {
                return content.html();
            }

            content.html(html);
            return this;
        },

        open: function () {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                showOptions = options.animation.open,
                contentElement = wrapper.children(KWINDOWCONTENT),
                initialOverflow = contentElement.css(OVERFLOW),
                overlay;

            if (!that.trigger(OPEN)) {
                that._closing = false;

                that.toFront();

                that.element.focus();

                options.visible = true;

                if (options.modal) {
                    overlay = that._overlay(false);

                    if (showOptions.duration) {
                        overlay.kendoStop().kendoAnimate({ effects: "fade:in", duration: showOptions.duration });
                    } else {
                        overlay.css("opacity", 0.5).show();
                    }
                }

                if (!wrapper.is(VISIBLE)) {
                    contentElement.css(OVERFLOW, HIDDEN);
                    wrapper.show().kendoStop().kendoAnimate({
                        effects: showOptions.effects,
                        duration: showOptions.duration,
                        complete: function() {
                            that.element.focus();
                            that.trigger(ACTIVATE);
                            contentElement.css(OVERFLOW, initialOverflow);
                        }
                    });
                }
            }

            if (options.isMaximized) {
                that._documentScrollTop = $(document).scrollTop();
                $("html, body").css(OVERFLOW, HIDDEN);
            }

            return that;
        },

        _close: function(userTriggered) {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                showOptions = options.animation.open,
                hideOptions = options.animation.close,
                modalWindows,
                shouldHideOverlay, overlay;

            if (wrapper.is(VISIBLE) && !that.trigger(CLOSE, { userTriggered: !!userTriggered })) {
                that._closing = true;
                options.visible = false;

                $(KWINDOW).each(function(i, element) {
                    var windowObject = $(element),
                        contentElement = windowObject.find(KWINDOWCONTENT);

                    // Remove overlay set by toFront
                    if (element != wrapper && contentElement.find("> ." + KCONTENTFRAME).length > 0) {
                        contentElement.children(".k-overlay").remove();
                    }
                });

                modalWindows = openedModalWindows(options.name);

                shouldHideOverlay = options.modal && !modalWindows.length;

                overlay = options.modal ? that._overlay(true) : $(undefined);

                if (shouldHideOverlay) {
                    if (hideOptions.duration) {
                        overlay.kendoStop().kendoAnimate({
                             effects: "fade:out",
                             duration: hideOptions.duration,
                             hide: true
                         });
                    } else {
                        overlay.hide();
                    }
                } else if (modalWindows.length) {
                    windowObject(modalWindows.eq(modalWindows.length - 1), options.name)._overlay(true);
                }

                wrapper.kendoStop().kendoAnimate({
                    effects: hideOptions.effects || showOptions.effects,
                    reverse: hideOptions.reverse === true,
                    duration: hideOptions.duration,
                    complete: function() {
                        wrapper.hide();
                        that.trigger(DEACTIVATE);
                    }
                });
            }

            if (that.options.isMaximized) {
                $("html, body").css(OVERFLOW, "");
                if (that._documentScrollTop && that._documentScrollTop > 0) {
                    $(document).scrollTop(that._documentScrollTop);
                }
            }
        },

        close: function () {
            this._close(false);
            return this;
        },

        toFront: function (e) {
            var that = this,
                wrapper = that.wrapper,
                currentWindow = wrapper[0],
                zIndex = +wrapper.css(ZINDEX),
                originalZIndex = zIndex,
                active = activeElement(),
                winElement = that.element,
                target = e && e.target ? e.target : null;

            $(KWINDOW).each(function(i, element) {
                var windowObject = $(element),
                    zIndexNew = windowObject.css(ZINDEX),
                    contentElement = windowObject.find(KWINDOWCONTENT);

                if (!isNaN(zIndexNew)) {
                    zIndex = Math.max(+zIndexNew, zIndex);
                }

                // Add overlay to windows with iframes and lower z-index to prevent
                // trapping of events when resizing / dragging
                if (element != currentWindow && contentElement.find("> ." + KCONTENTFRAME).length > 0) {
                    contentElement.append(templates.overlay);
                }
            });

            if (zIndex == 10001 || originalZIndex < zIndex) {
                wrapper.css(ZINDEX, zIndex + 2);
            }
            that.element.find("> .k-overlay").remove();

            if (!$(active).is(winElement) &&
                !$(target).is(TITLEBAR_BUTTONS + "," + TITLEBAR_BUTTONS + " .k-icon,:input") &&
                (!winElement.find(active).length || !winElement.find(target).length)) {
                winElement.focus();

                var scrollTop = $(window).scrollTop(),
                    windowTop = parseInt(that.wrapper.position().top, 10);
                if (windowTop > 0 && windowTop - scrollTop < 0) {
                    if (scrollTop > 0) {
                        $(window).scrollTop(windowTop);
                    } else {
                        that.wrapper.css("top", scrollTop);
                    }
                }
            }

            return that;
        },

        toggleMaximization: function () {
            if (this._closing) {
                return this;
            }

            return this[this.options.isMaximized ? "restore" : "maximize"]();
        },

        restore: function () {
            var that = this,
                options = that.options,
                restoreOptions = that.restoreOptions;

            if (!options.isMaximized && !options.isMinimized) {
                return;
            }

            that.wrapper
                .css({
                    position: "absolute",
                    left: restoreOptions.left,
                    top: restoreOptions.top,
                    width: restoreOptions.width,
                    height: restoreOptions.height
                })
                .find(".k-window-content,.k-resize-handle").show().end()
                .find(".k-window-titlebar .k-i-restore").parent().remove().end().end()
                .find(MINIMIZE_MAXIMIZE).parent().show();

            $("html, body").css(OVERFLOW, "");
            if (this._documentScrollTop && this._documentScrollTop > 0) {
                $(document).scrollTop(this._documentScrollTop);
            }

            options.isMaximized = options.isMinimized = false;

            that.trigger(RESIZE);

            return that;
        },

        maximize: sizingAction("maximize", function() {
            var that = this,
                wrapper = that.wrapper,
                position = wrapper.position();

            extend(that.restoreOptions, {
                left: position.left,
                top: position.top
            });

            wrapper.css({
                    left: 0,
                    top: 0,
                    position: "fixed"
                });

            this._documentScrollTop = $(document).scrollTop();
            $("html, body").css(OVERFLOW, HIDDEN);

            that.options.isMaximized = true;

            that._onDocumentResize();
        }),

        minimize: sizingAction("minimize", function() {
            var that = this;

            that.wrapper.css("height", "");
            that.element.hide();

            that.options.isMinimized = true;
        }),

        _onDocumentResize: function () {
            var that = this,
                wrapper = that.wrapper,
                wnd = $(window);

            if (!that.options.isMaximized) {
                return;
            }

            wrapper.css({
                    width: wnd.width(),
                    height: wnd.height() - parseInt(wrapper.css("padding-top"), 10)
                });

            that.trigger(RESIZE);
        },

        refresh: function (options) {
            var that = this,
                initOptions = that.options,
                element = $(that.element),
                iframe,
                showIframe,
                url;

            if (!isPlainObject(options)) {
                options = { url: options };
            }

            options = extend({}, initOptions.content, options);

            showIframe = defined(initOptions.iframe) ? initOptions.iframe : options.iframe;

            url = options.url;

            if (url) {
                if (!defined(showIframe)) {
                    showIframe = !isLocalUrl(url);
                }

                if (!showIframe) {
                    // perform AJAX request
                    that._ajaxRequest(options);
                } else {
                    iframe = element.find("." + KCONTENTFRAME)[0];

                    if (iframe) {
                        // refresh existing iframe
                        iframe.src = url || iframe.src;
                    } else {
                        // render new iframe
                        element.html(templates.contentFrame(extend({}, initOptions, { content: options })));
                    }

                    element.find("." + KCONTENTFRAME)
                        .unbind("load" + NS)
                        .on("load" + NS, function(){
                            that.trigger(REFRESH);
                        });
                }
            } else {
                if (options.template) {
                    // refresh template
                    that.content(template(options.template)({}));
                }

                that.trigger(REFRESH);
            }

            return that;
        },

        _ajaxRequest: function (options) {
            var that = this,
                contentTemplate = options.template,
                refreshIcon = that.wrapper.find(".k-window-titlebar .k-i-refresh"),
                loadingIconTimeout = setTimeout(function () {
                    refreshIcon.addClass(LOADING);
                }, 100);

            $.ajax(extend({
                type: "GET",
                dataType: "html",
                cache: false,
                error: proxy(function (xhr, status) {
                    that.trigger(ERROR, {
                        status: status,
                        xhr: xhr
                    });
                }, that),
                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    refreshIcon.removeClass(LOADING);
                },
                success: proxy(function (data) {
                    if (contentTemplate) {
                        data = template(contentTemplate)(data || {});
                    }

                    that.content(data);
                    that.element.prop("scrollTop", 0);

                    that.trigger(REFRESH);
                }, that)
            }, options));
        },

        destroy: function () {
            var that = this,
                modalWindows,
                shouldHideOverlay;

            Widget.fn.destroy.call(that);

            kendo.destroy(that.wrapper);

            if (that.resizing) {
                that.resizing.destroy();
            }

            if (that.dragging) {
                that.dragging.destroy();
            }

            that.element.children("iframe").remove();
            that.wrapper.remove().add(that.wrapper.find(".k-resize-handle,.k-window-titlebar")).off(NS);

            $(window).off("resize", that._resizeHandler);

            modalWindows = openedModalWindows();

            shouldHideOverlay = that.options.modal && !modalWindows.length;

            if (shouldHideOverlay) {
                that._overlay(false).remove();
            } else if (modalWindows.length > 0) {
                windowObject(modalWindows.eq(modalWindows.length - 1), that.options.name)._overlay(true);
            }
        },

        _createWindow: function() {
            var that = this,
                contentHtml = that.element,
                options = that.options,
                iframeSrcAttributes,
                wrapper,
                isRtl = kendo.support.isRtl(contentHtml);

            if (options.scrollable === false) {
                contentHtml.attr("style", "overflow:hidden;");
            }

            wrapper = $(templates.wrapper(options));

            if (options.title !== false) {
                wrapper.append(templates.titlebar(extend(templates, options)));
            }

            // Collect the src attributes of all iframes and then set them to empty string.
            // This seems to fix this IE9 "feature": http://msdn.microsoft.com/en-us/library/gg622929%28v=VS.85%29.aspx?ppud=4
            iframeSrcAttributes = contentHtml.find("iframe:not(.k-content)").map(function() {
                var src = this.getAttribute("src");
                this.src = "";
                return src;
            });

            // Make sure the wrapper is appended to the body only once. IE9+ will throw exceptions if you move iframes in DOM
            wrapper
                .toggleClass("k-rtl", isRtl)
                .appendTo(that.appendTo)
                .append(contentHtml)
                .find("iframe:not(.k-content)").each(function(index) {
                   // Restore the src attribute of the iframes when they are part of the live DOM tree
                   this.src = iframeSrcAttributes[index];
                });

            wrapper.find(".k-window-title")
                .css(isRtl ? "left" : "right", wrapper.find(".k-window-actions").outerWidth() + 10);

            contentHtml.show();
        }
    });

    templates = {
        wrapper: template("<div class='k-widget k-window' />"),
        action: template(
            "<a role='button' href='\\#' class='k-window-action k-link'>" +
                "<span role='presentation' class='k-icon k-i-#= name.toLowerCase() #'>#= name #</span>" +
            "</a>"
        ),
        titlebar: template(
            "<div class='k-window-titlebar k-header'>&nbsp;" +
                "<span class='k-window-title'>#= title #</span>" +
                "<div class='k-window-actions'>" +
                "# for (var i = 0; i < actions.length; i++) { #" +
                    "#= action({ name: actions[i] }) #" +
                "# } #" +
                "</div>" +
            "</div>"
        ),
        overlay: "<div class='k-overlay' />",
        contentFrame: template(
            "<iframe frameborder='0' title='#= title #' class='" + KCONTENTFRAME + "' " +
                "src='#= content.url #'>" +
                    "This page requires frames in order to show content" +
            "</iframe>"
        ),
        resizeHandle: template("<div class='k-resize-handle k-resize-#= data #'></div>")
    };


    function WindowResizing(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: KWINDOWRESIZEHANDLES,
            group: wnd.wrapper.id + "-resizing",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that)
        });
    }

    WindowResizing.prototype = {
        dragstart: function (e) {
            var that = this,
                wnd = that.owner,
                wrapper = wnd.wrapper;

            that.elementPadding = parseInt(wnd.wrapper.css("padding-top"), 10);
            that.initialCursorPosition = kendo.getOffset(wrapper, "position");

            that.resizeDirection = e.currentTarget.prop("className").replace("k-resize-handle k-resize-", "");

            that.initialSize = {
                width: wrapper.width(),
                height: wrapper.height()
            };

            that.containerOffset = kendo.getOffset(wnd.appendTo);

            wrapper
                .append(templates.overlay)
                .find(KWINDOWRESIZEHANDLES).not(e.currentTarget).hide();

            $(BODY).css(CURSOR, e.currentTarget.css(CURSOR));
        },
        drag: function (e) {
            var that = this,
                wnd = that.owner,
                wrapper = wnd.wrapper,
                options = wnd.options,
                direction = that.resizeDirection,
                containerOffset = that.containerOffset,
                initialPosition = that.initialCursorPosition,
                initialSize = that.initialSize,
                newWidth, newHeight,
                windowBottom, windowRight,
                x = e.x.location,
                y = e.y.location;

            if (direction.indexOf("e") >= 0) {
                newWidth = x - initialPosition.left;

                wrapper.width(constrain(newWidth, options.minWidth, options.maxWidth));
            } else if (direction.indexOf("w") >= 0) {
                windowRight = initialPosition.left + initialSize.width;
                newWidth = constrain(windowRight - x, options.minWidth, options.maxWidth);

                wrapper.css({
                    left: windowRight - newWidth - containerOffset.left,
                    width: newWidth
                });
            }

            if (direction.indexOf("s") >= 0) {
                newHeight = y - initialPosition.top - that.elementPadding;

                wrapper.height(constrain(newHeight, options.minHeight, options.maxHeight));
            } else if (direction.indexOf("n") >= 0) {
                windowBottom = initialPosition.top + initialSize.height;
                newHeight = constrain(windowBottom - y, options.minHeight, options.maxHeight);

                wrapper.css({
                    top: windowBottom - newHeight - containerOffset.top,
                    height: newHeight
                });
            }

            wnd.trigger(RESIZE);
        },
        dragend: function (e) {
            var that = this,
                wnd = that.owner,
                wrapper = wnd.wrapper;

            wrapper
                .find(KOVERLAY).remove().end()
                .find(KWINDOWRESIZEHANDLES).not(e.currentTarget).show();

            $(BODY).css(CURSOR, "");

            if (wnd.touchScroller) {
               wnd.touchScroller.reset();
            }
            if (e.keyCode == 27) {
                wrapper.css(that.initialCursorPosition)
                    .css(that.initialSize);
            }

            return false;
        },
        destroy: function() {
            this._draggable.destroy();
        }
    };

    function WindowDragging(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: KWINDOWTITLEBAR,
            group: wnd.wrapper.id + "-moving",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that),
            dragcancel: proxy(that.dragcancel, that)
        });
    }

    WindowDragging.prototype = {
        dragstart: function (e) {
            var wnd = this.owner,
                element = wnd.element,
                actions = element.find(".k-window-actions"),
                containerOffset = kendo.getOffset(wnd.appendTo);

            wnd.trigger(DRAGSTART);

            wnd.initialWindowPosition = kendo.getOffset(wnd.wrapper, "position");

            wnd.startPosition = {
                left: e.x.client - wnd.initialWindowPosition.left,
                top: e.y.client - wnd.initialWindowPosition.top
            };

            if (actions.length > 0) {
                wnd.minLeftPosition = actions.outerWidth() + parseInt(actions.css("right"), 10) - element.outerWidth();
            } else {
                wnd.minLeftPosition =  20 - element.outerWidth(); // at least 20px remain visible
            }

            wnd.minLeftPosition -= containerOffset.left;
            wnd.minTopPosition = -containerOffset.top;

            wnd.wrapper
                .append(templates.overlay)
                .find(KWINDOWRESIZEHANDLES).hide();

            $(BODY).css(CURSOR, e.currentTarget.css(CURSOR));
        },

        drag: function (e) {
            var wnd = this.owner,
                coordinates = {
                    left: Math.max(e.x.client - wnd.startPosition.left, wnd.minLeftPosition),
                    top: Math.max(e.y.client - wnd.startPosition.top, wnd.minTopPosition)
                };

            $(wnd.wrapper).css(coordinates);
        },

        _finishDrag: function() {
            var wnd = this.owner;

            wnd.wrapper
                .find(KWINDOWRESIZEHANDLES).toggle(!wnd.options.isMinimized).end()
                .find(KOVERLAY).remove();

            $(BODY).css(CURSOR, "");
        },

        dragcancel: function (e) {
            this._finishDrag();

            e.currentTarget.closest(KWINDOW).css(this.owner.initialWindowPosition);
        },

        dragend: function () {
            this._finishDrag();

            this.owner.trigger(DRAGEND);

            return false;
        },
        destroy: function() {
            this._draggable.destroy();
        }
    };

    kendo.ui.plugin(Window);

})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "popup",
    name: "Pop-up",
    category: "framework",
    depends: [ "core" ],
    advanced: true
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        getOffset = kendo.getOffset,
        activeElement = kendo._activeElement,
        OPEN = "open",
        CLOSE = "close",
        DEACTIVATE = "deactivate",
        ACTIVATE = "activate",
        CENTER = "center",
        LEFT = "left",
        RIGHT = "right",
        TOP = "top",
        BOTTOM = "bottom",
        ABSOLUTE = "absolute",
        HIDDEN = "hidden",
        BODY = "body",
        LOCATION = "location",
        POSITION = "position",
        VISIBLE = "visible",
        EFFECTS = "effects",
        ACTIVE = "k-state-active",
        ACTIVEBORDER = "k-state-border",
        ACTIVECHILDREN = ".k-picker-wrap, .k-dropdown-wrap, .k-link",
        MOUSEDOWN = "down",
        WINDOW = $(window),
        DOCUMENT_ELEMENT = $(document.documentElement),
        RESIZE_SCROLL = "resize scroll",
        cssPrefix = support.transitions.css,
        TRANSFORM = cssPrefix + "transform",
        extend = $.extend,
        NS = ".kendoPopup",
        styles = ["font-family",
                   "font-size",
                   "font-stretch",
                   "font-style",
                   "font-weight",
                   "line-height"];

    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var Popup = Widget.extend({
        init: function(element, options) {
            var that = this, parentPopup;

            options = options || {};

            if (options.isRtl) {
                options.origin = options.origin || BOTTOM + " " + RIGHT;
                options.position = options.position || TOP + " " + RIGHT;
            }

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that.collisions = options.collision ? options.collision.split(" ") : [];

            if (that.collisions.length === 1) {
                that.collisions.push(that.collisions[0]);
            }

            parentPopup = $(that.options.anchor).closest(".k-popup,.k-group").filter(":not([class^=km-])"); // When popup is in another popup, make it relative.
            options.appendTo = $($(options.appendTo)[0] || parentPopup[0] || BODY);

            that.element.hide()
                .addClass("k-popup k-group k-reset")
                .toggleClass("k-rtl", !!options.isRtl)
                .css({ position : ABSOLUTE })
                .appendTo(options.appendTo)
                .on("mouseenter" + NS, function() {
                    that._hovered = true;
                })
                .on("mouseleave" + NS, function() {
                    that._hovered = false;
                });

            that.wrapper = $();

            if (options.animation === false) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }

            extend(options.animation.open, {
                complete: function() {
                    that.wrapper.css({ overflow: VISIBLE }); // Forcing refresh causes flickering in mobile.
                    that.trigger(ACTIVATE);
                }
            });

            extend(options.animation.close, {
                complete: function() {
                    that.wrapper.hide();

                    var location = that.wrapper.data(LOCATION),
                        anchor = $(options.anchor),
                        direction, dirClass;

                    if (location) {
                        that.wrapper.css(location);
                    }

                    if (options.anchor != BODY) {
                        direction = anchor.hasClass(ACTIVEBORDER + "-down") ? "down" : "up";
                        dirClass = ACTIVEBORDER + "-" + direction;

                        anchor
                            .removeClass(dirClass)
                            .children(ACTIVECHILDREN)
                            .removeClass(ACTIVE)
                            .removeClass(dirClass);

                        element.removeClass(ACTIVEBORDER + "-" + kendo.directions[direction].reverse);
                    }

                    that._closing = false;
                    that.trigger(DEACTIVATE);
                }
            });

            that._mousedownProxy = function(e) {
                that._mousedown(e);
            };

            that._resizeProxy = function(e) {
                that._resize(e);
            };

            if (options.toggleTarget) {
                $(options.toggleTarget).on(options.toggleEvent + NS, $.proxy(that.toggle, that));
            }
        },

        events: [
            OPEN,
            ACTIVATE,
            CLOSE,
            DEACTIVATE
        ],

        options: {
            name: "Popup",
            toggleEvent: "click",
            origin: BOTTOM + " " + LEFT,
            position: TOP + " " + LEFT,
            anchor: BODY,
            collision: "flip fit",
            viewport: window,
            copyAnchorStyles: true,
            animation: {
                open: {
                    effects: "slideIn:down",
                    transition: true,
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100,
                    hide: true
                }
            }
        },

        destroy: function() {
            var that = this,
                options = that.options,
                element = that.element.off(NS),
                parent;

            Widget.fn.destroy.call(that);

            if (options.toggleTarget) {
                $(options.toggleTarget).off(NS);
            }

            DOCUMENT_ELEMENT.unbind(MOUSEDOWN, that._mousedownProxy);
            WINDOW.unbind(RESIZE_SCROLL, that._resizeProxy);

            if (options.appendTo[0] === document.body) {
                parent = element.parent(".k-animation-container");

                if (parent[0]) {
                    parent.remove();
                } else {
                    element.remove();
                }
            }

            kendo.destroy(that.element.children());
        },

        open: function(x, y) {
            var that = this,
                fixed = { isFixed: !isNaN(parseInt(y,10)), x: x, y: y },
                element = that.element,
                options = that.options,
                direction = "down",
                animation, wrapper,
                anchor = $(options.anchor);

            if (!that.visible()) {
                if (options.copyAnchorStyles) {
                    element.css(kendo.getComputedStyles(anchor[0], styles));
                }

                if (element.data("animating") || that.trigger(OPEN)) {
                    return;
                }

                DOCUMENT_ELEMENT.unbind(MOUSEDOWN, that._mousedownProxy)
                                .bind(MOUSEDOWN, that._mousedownProxy);

                // this binding hangs iOS in editor
                if (!(support.mobileOS.ios || support.mobileOS.android)) {
                    WINDOW.unbind(RESIZE_SCROLL, that._resizeProxy)
                          .bind(RESIZE_SCROLL, that._resizeProxy);
                }

                that.wrapper = wrapper = kendo.wrap(element)
                                        .css({
                                            overflow: HIDDEN,
                                            display: "block",
                                            position: ABSOLUTE
                                        });

                if (support.mobileOS.android) {
                    wrapper.add(anchor).css(TRANSFORM, "translatez(0)"); // Android is VERY slow otherwise. Should be tested in other droids as well since it may cause blur.
                }

                wrapper.css(POSITION);

                if ($(options.appendTo)[0] == document.body) {
                    wrapper.css(TOP, "-10000px");
                }

                animation = extend(true, {}, options.animation.open);
                that.flipped = that._position(fixed);
                animation.effects = kendo.parseEffects(animation.effects, that.flipped);

                direction = animation.effects.slideIn ? animation.effects.slideIn.direction : direction;

                if (options.anchor != BODY) {
                    var dirClass = ACTIVEBORDER + "-" + direction;

                    element.addClass(ACTIVEBORDER + "-" + kendo.directions[direction].reverse);

                    anchor
                        .addClass(dirClass)
                        .children(ACTIVECHILDREN)
                        .addClass(ACTIVE)
                        .addClass(dirClass);
                }

                element.data(EFFECTS, animation.effects)
                       .kendoStop(true)
                       .kendoAnimate(animation);
            }
        },

        toggle: function() {
            var that = this;

            that[that.visible() ? CLOSE : OPEN]();
        },

        visible: function() {
            return this.element.is(":" + VISIBLE);
        },

        close: function() {
            var that = this,
                options = that.options, wrap,
                animation, openEffects, closeEffects;

            if (that.visible()) {
                wrap = (that.wrapper[0] ? that.wrapper : kendo.wrap(that.element).hide());

                if (that._closing || that.trigger(CLOSE)) {
                    return;
                }

                // Close all inclusive popups.
                that.element.find(".k-popup").each(function () {
                    var that = $(this),
                        popup = that.data("kendoPopup");

                    if (popup) {
                        popup.close();
                    }
                });

                DOCUMENT_ELEMENT.unbind(MOUSEDOWN, that._mousedownProxy);
                WINDOW.unbind(RESIZE_SCROLL, that._resizeProxy);

                animation = extend(true, {}, options.animation.close);
                openEffects = that.element.data(EFFECTS);
                closeEffects = animation.effects;

                if (!closeEffects && !kendo.size(closeEffects) && openEffects && kendo.size(openEffects)) {
                    animation.effects = openEffects;
                    animation.reverse = true;
                }

                that._closing = true;

                that.element.kendoStop(true);
                wrap.css({ overflow: HIDDEN }); // stop callback will remove hidden overflow
                that.element.kendoAnimate(animation);
            }
        },

        _resize: function(e) {
            var that = this;

            if (e.type === "resize") {
                clearTimeout(that._resizeTimeout);
                that._resizeTimeout = setTimeout(function() {
                    that._position();
                    that._resizeTimeout = null;
                }, 50);
            } else {
                if (!that._hovered && !contains(that.element[0], activeElement())) {
                    that.close();
                }
            }
        },

        _mousedown: function(e) {
            var that = this,
                container = that.element[0],
                options = that.options,
                anchor = $(options.anchor)[0],
                toggleTarget = options.toggleTarget,
                target = kendo.eventTarget(e),
                popup = $(target).closest(".k-popup")[0];

            if (popup && popup !== that.element[0] ){
                return;
            }

            if (!contains(container, target) && !contains(anchor, target) && !(toggleTarget && contains($(toggleTarget)[0], target))) {
                that.close();
            }
        },

        _fit: function(position, size, viewPortSize) {
            var output = 0;

            if (position + size > viewPortSize) {
                output = viewPortSize - (position + size);
            }

            if (position < 0) {
                output = -position;
            }

            return output;
        },

        _flip: function(offset, size, anchorSize, viewPortSize, origin, position, boxSize) {
            var output = 0;
                boxSize = boxSize || size;

            if (position !== origin && position !== CENTER && origin !== CENTER) {
                if (offset + boxSize > viewPortSize) {
                    output += -(anchorSize + size);
                }

                if (offset + output < 0) {
                    output += anchorSize + size;
                }
            }
            return output;
        },

        _position: function(fixed) {
            var that = this,
                element = that.element.css(POSITION, ""),
                wrapper = that.wrapper,
                options = that.options,
                viewport = $(options.viewport),
                viewportOffset = $(viewport).offset(),
                anchor = $(options.anchor),
                origins = options.origin.toLowerCase().split(" "),
                positions = options.position.toLowerCase().split(" "),
                collisions = that.collisions,
                zoomLevel = support.zoomLevel(),
                siblingContainer, parents,
                parentZIndex, zIndex = 10002,
                idx = 0, length;

            siblingContainer = anchor.parents().filter(wrapper.siblings());

            if (siblingContainer[0]) {
                parentZIndex = Number($(siblingContainer).css("zIndex"));
                if (parentZIndex) {
                    zIndex = parentZIndex + 1;
                } else {
                    parents = anchor.parentsUntil(siblingContainer);
                    for (length = parents.length; idx < length; idx++) {
                        parentZIndex = Number($(parents[idx]).css("zIndex"));
                        if (parentZIndex && zIndex < parentZIndex) {
                            zIndex = parentZIndex + 1;
                        }
                    }
                }
            }

            wrapper.css("zIndex", zIndex);

            if (fixed && fixed.isFixed) {
                wrapper.css({ left: fixed.x, top: fixed.y });
            } else {
                wrapper.css(that._align(origins, positions));
            }

            var pos = getOffset(wrapper, POSITION, anchor[0] === wrapper.offsetParent()[0]),
                offset = getOffset(wrapper),
                anchorParent = anchor.offsetParent().parent(".k-animation-container,.k-popup,.k-group"); // If the parent is positioned, get the current positions

            if (anchorParent.length) {
                pos = getOffset(wrapper, POSITION, true);
                offset = getOffset(wrapper);
            }

            if (viewport[0] === window) {
                offset.top -= (window.pageYOffset || document.documentElement.scrollTop || 0);
                offset.left -= (window.pageXOffset || document.documentElement.scrollLeft || 0);
            }
            else {
                offset.top -= viewportOffset.top;
                offset.left -= viewportOffset.left;
            }

            if (!that.wrapper.data(LOCATION)) { // Needed to reset the popup location after every closure - fixes the resize bugs.
                wrapper.data(LOCATION, extend({}, pos));
            }

            var offsets = extend({}, offset),
                location = extend({}, pos);

            if (collisions[0] === "fit") {
                location.top += that._fit(offsets.top, wrapper.outerHeight(), viewport.height() / zoomLevel);
            }

            if (collisions[1] === "fit") {
                location.left += that._fit(offsets.left, wrapper.outerWidth(), viewport.width() / zoomLevel);
            }

            var flipPos = extend({}, location);

            if (collisions[0] === "flip") {
                location.top += that._flip(offsets.top, element.outerHeight(), anchor.outerHeight(), viewport.height() / zoomLevel, origins[0], positions[0], wrapper.outerHeight());
            }

            if (collisions[1] === "flip") {
                location.left += that._flip(offsets.left, element.outerWidth(), anchor.outerWidth(), viewport.width() / zoomLevel, origins[1], positions[1], wrapper.outerWidth());
            }

            element.css(POSITION, ABSOLUTE);
            wrapper.css(location);

            return (location.left != flipPos.left || location.top != flipPos.top);
        },

        _align: function(origin, position) {
            var that = this,
                element = that.wrapper,
                anchor = $(that.options.anchor),
                verticalOrigin = origin[0],
                horizontalOrigin = origin[1],
                verticalPosition = position[0],
                horizontalPosition = position[1],
                anchorOffset = getOffset(anchor),
                appendTo = $(that.options.appendTo),
                appendToOffset,
                width = element.outerWidth(),
                height = element.outerHeight(),
                anchorWidth = anchor.outerWidth(),
                anchorHeight = anchor.outerHeight(),
                top = anchorOffset.top,
                left = anchorOffset.left,
                round = Math.round;

            if (appendTo[0] != document.body) {
                appendToOffset = getOffset(appendTo);
                top -= appendToOffset.top;
                left -= appendToOffset.left;
            }


            if (verticalOrigin === BOTTOM) {
                top += anchorHeight;
            }

            if (verticalOrigin === CENTER) {
                top += round(anchorHeight / 2);
            }

            if (verticalPosition === BOTTOM) {
                top -= height;
            }

            if (verticalPosition === CENTER) {
                top -= round(height / 2);
            }

            if (horizontalOrigin === RIGHT) {
                left += anchorWidth;
            }

            if (horizontalOrigin === CENTER) {
                left += round(anchorWidth / 2);
            }

            if (horizontalPosition === RIGHT) {
                left -= width;
            }

            if (horizontalPosition === CENTER) {
                left -= round(width / 2);
            }

            return {
                top: top,
                left: left
            };
        }
    });

    ui.plugin(Popup);
})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "data",
    name: "Data source",
    category: "framework",
    description: "Powerful component for using local and remote data.Fully supports CRUD, Sorting, Paging, Filtering, Grouping, and Aggregates.",
    depends: [ "core" ],
    features: [ {
        id: "data-odata",
        name: "OData",
        description: "Support for accessing Open Data Protocol (OData) services.",
        depends: [ "data.odata" ]
    }, {
        id: "data-XML",
        name: "XML",
        description: "Support for binding to XML.",
        depends: [ "data.xml" ]
    } ]
});

(function($, undefined) {
    var extend = $.extend,
        proxy = $.proxy,
        isFunction = $.isFunction,
        isPlainObject = $.isPlainObject,
        isEmptyObject = $.isEmptyObject,
        isArray = $.isArray,
        grep = $.grep,
        ajax = $.ajax,
        map,
        each = $.each,
        noop = $.noop,
        kendo = window.kendo,
        Observable = kendo.Observable,
        Class = kendo.Class,
        STRING = "string",
        FUNCTION = "function",
        CREATE = "create",
        READ = "read",
        UPDATE = "update",
        DESTROY = "destroy",
        CHANGE = "change",
        SYNC = "sync",
        GET = "get",
        ERROR = "error",
        REQUESTSTART = "requestStart",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        crud = [CREATE, READ, UPDATE, DESTROY],
        identity = function(o) { return o; },
        getter = kendo.getter,
        stringify = kendo.stringify,
        math = Math,
        push = [].push,
        join = [].join,
        pop = [].pop,
        splice = [].splice,
        shift = [].shift,
        slice = [].slice,
        unshift = [].unshift,
        toString = {}.toString,
        stableSort = kendo.support.stableSort,
        dateRegExp = /^\/Date\((.*?)\)\/$/,
        newLineRegExp = /(\r+|\n+)/g,
        quoteRegExp = /(?=['\\])/g;

    var ObservableArray = Observable.extend({
        init: function(array, type) {
            var that = this;

            that.type = type || ObservableObject;

            Observable.fn.init.call(that);

            that.length = array.length;

            that.wrapAll(array, that);
        },

        toJSON: function() {
            var idx, length = this.length, value, json = new Array(length);

            for (idx = 0; idx < length; idx++){
                value = this[idx];

                if (value instanceof ObservableObject) {
                    value = value.toJSON();
                }

                json[idx] = value;
            }

            return json;
        },

        parent: noop,

        wrapAll: function(source, target) {
            var that = this,
                idx,
                length,
                parent = function() {
                    return that;
                };

            target = target || [];

            for (idx = 0, length = source.length; idx < length; idx++) {
                target[idx] = that.wrap(source[idx], parent);
            }

            return target;
        },

        wrap: function(object, parent) {
            var that = this,
                observable;

            if (object !== null && toString.call(object) === "[object Object]") {
                observable = object instanceof that.type || object instanceof Model;

                if (!observable) {
                    object = object instanceof ObservableObject ? object.toJSON() : object;
                    object = new that.type(object);
                }

                object.parent = parent;

                object.bind(CHANGE, function(e) {
                    that.trigger(CHANGE, {
                        field: e.field,
                        node: e.node,
                        index: e.index,
                        items: e.items || [this],
                        action: e.node  ? (e.action || "itemchange") : "itemchange"
                    });
                });
            }

            return object;
        },

        push: function() {
            var index = this.length,
                items = this.wrapAll(arguments),
                result;

            result = push.apply(this, items);

            this.trigger(CHANGE, {
                action: "add",
                index: index,
                items: items
            });

            return result;
        },

        slice: slice,

        join: join,

        pop: function() {
            var length = this.length, result = pop.apply(this);

            if (length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: length - 1,
                    items:[result]
                });
            }

            return result;
        },

        splice: function(index, howMany, item) {
            var items = this.wrapAll(slice.call(arguments, 2)),
                result, i, len;

            result = splice.apply(this, [index, howMany].concat(items));

            if (result.length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: index,
                    items: result
                });

                for (i = 0, len = result.length; i < len; i++) {
                    if (result[i].children) {
                        result[i].unbind(CHANGE);
                    }
                }
            }

            if (item) {
                this.trigger(CHANGE, {
                    action: "add",
                    index: index,
                    items: items
                });
            }
            return result;
        },

        shift: function() {
            var length = this.length, result = shift.apply(this);

            if (length) {
                this.trigger(CHANGE, {
                    action: "remove",
                    index: 0,
                    items:[result]
                });
            }

            return result;
        },

        unshift: function() {
            var items = this.wrapAll(arguments),
                result;

            result = unshift.apply(this, items);

            this.trigger(CHANGE, {
                action: "add",
                index: 0,
                items: items
            });

            return result;
        },

        indexOf: function(item) {
            var that = this,
                idx,
                length;

            for (idx = 0, length = that.length; idx < length; idx++) {
                if (that[idx] === item) {
                    return idx;
                }
            }
            return -1;
        },

        forEach: function(callback) {
            var idx = 0,
                length = this.length;

            for (; idx < length; idx++) {
                callback(this[idx], idx, this);
            }
        },

        map: function(callback) {
            var idx = 0,
                result = [],
                length = this.length;

            for (; idx < length; idx++) {
                result[idx] = callback(this[idx], idx, this);
            }

            return result;
        },

        filter: function(callback) {
            var idx = 0,
                result = [],
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    result[result.length] = item;
                }
            }

            return result;
        },

        find: function(callback) {
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    return item;
                }
            }
        },

        every: function(callback) {
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (!callback(item, idx, this)) {
                    return false;
                }
            }

            return true;
        },

        some: function(callback) {
            var idx = 0,
                item,
                length = this.length;

            for (; idx < length; idx++) {
                item = this[idx];
                if (callback(item, idx, this)) {
                    return true;
                }
            }

            return false;
        },

        // non-standard collection methods
        remove: function(item) {
            this.splice(this.indexOf(item), 1);
        }
    });

    function eventHandler(context, type, field, prefix) {
        return function(e) {
            var event = {}, key;

            for (key in e) {
                event[key] = e[key];
            }

            if (prefix) {
                event.field = field + "." + e.field;
            } else {
                event.field = field;
            }

            context.trigger(type, event);
        };
    }

    var ObservableObject = Observable.extend({
        init: function(value) {
            var that = this,
                member,
                field,
                parent = function() {
                    return that;
                };

            Observable.fn.init.call(this);

            for (field in value) {
                member = value[field];

                if (field.charAt(0) != "_") {
                    member = that.wrap(member, field, parent);
                }

                that[field] = member;
            }

            that.uid = kendo.guid();
        },

        shouldSerialize: function(field) {
            return this.hasOwnProperty(field) && field !== "_events" && typeof this[field] !== FUNCTION && field !== "uid";
        },

        forEach: function(f) {
            for (var i in this) {
                if (this.shouldSerialize(i)) {
                    f(this[i], i);
                }
            }
        },

        toJSON: function() {
            var result = {}, value, field;

            for (field in this) {
                if (this.shouldSerialize(field)) {
                    value = this[field];

                    if (value instanceof ObservableObject || value instanceof ObservableArray) {
                        value = value.toJSON();
                    }

                    result[field] = value;
                }
            }

            return result;
        },

        get: function(field) {
            var that = this, result;

            that.trigger(GET, { field: field });

            if (field === "this") {
                result = that;
            } else {
                result = kendo.getter(field, true)(that);
            }

            return result;
        },

        _set: function(field, value) {
            var that = this;
            if (field.indexOf(".")) {
                var paths = field.split("."),
                    path = "";

                while (paths.length > 1) {
                    path += paths.shift();
                    var obj = kendo.getter(path, true)(that);
                    if (obj instanceof ObservableObject) {
                        obj.set(paths.join("."), value);
                        return;
                    }
                    path += ".";
                }
            }

            kendo.setter(field)(that, value);
        },

        set: function(field, value) {
            var that = this,
                current = kendo.getter(field, true)(that);

            if (current !== value) {

                if (!that.trigger("set", { field: field, value: value })) {
                    that._set(field, that.wrap(value, field, function() { return that; }));

                    that.trigger(CHANGE, { field: field });
                }
            }
        },

        parent: noop,

        wrap: function(object, field, parent) {
            var that = this,
                type = toString.call(object);

            if (object !== null && (type === "[object Object]" || type === "[object Array]")) {
                var isObservableArray = object instanceof ObservableArray;
                var isDataSource = object instanceof DataSource;

                if (type === "[object Object]" && !isDataSource && !isObservableArray) {
                    if (!(object instanceof ObservableObject)) {
                        object = new ObservableObject(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(GET, eventHandler(that, GET, field, true));
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, true));
                    }
                } else if (type === "[object Array]" || isObservableArray || isDataSource) {
                    if (!isObservableArray && !isDataSource) {
                        object = new ObservableArray(object);
                    }

                    if (object.parent() != parent()) {
                        object.bind(CHANGE, eventHandler(that, CHANGE, field, false));
                    }
                }

                object.parent = parent;
            }

            return object;
        }
    });

    function equal(x, y) {
        if (x === y) {
            return true;
        }

        var xtype = $.type(x), ytype = $.type(y), field;

        if (xtype !== ytype) {
            return false;
        }

        if (xtype === "date") {
            return x.getTime() === y.getTime();
        }

        if (xtype !== "object" && xtype !== "array") {
            return false;
        }

        for (field in x) {
            if (!equal(x[field], y[field])) {
                return false;
            }
        }

        return true;
    }

    var parsers = {
        "number": function(value) {
            return kendo.parseFloat(value);
        },

        "date": function(value) {
            return kendo.parseDate(value);
        },

        "boolean": function(value) {
            if (typeof value === STRING) {
                return value.toLowerCase() === "true";
            }
            return value != null ? !!value : value;
        },

        "string": function(value) {
            return value != null ? (value + "") : value;
        },

        "default": function(value) {
            return value;
        }
    };

    var defaultValues = {
        "string": "",
        "number": 0,
        "date": new Date(),
        "boolean": false,
        "default": ""
    };

    function getFieldByName(obj, name) {
        var field,
            fieldName;

        for (fieldName in obj) {
            field = obj[fieldName];
            if (isPlainObject(field) && field.field && field.field === name) {
                return field;
            } else if (field === name) {
                return field;
            }
        }
        return null;
    }

    var Model = ObservableObject.extend({
        init: function(data) {
            var that = this;

            if (!data || $.isEmptyObject(data)) {
                data = $.extend({}, that.defaults, data);
            }

            ObservableObject.fn.init.call(that, data);

            that.dirty = false;

            if (that.idField) {
                that.id = that.get(that.idField);

                if (that.id === undefined) {
                    that.id = that._defaultId;
                }
            }
        },

        shouldSerialize: function(field) {
            return ObservableObject.fn.shouldSerialize.call(this, field) && field !== "uid" && !(this.idField !== "id" && field === "id") && field !== "dirty" && field !== "_accessors";
        },

        _parse: function(field, value) {
            var that = this,
                fieldName = field,
                fields = (that.fields || {}),
                parse;

            field = fields[field];
            if (!field) {
                field = getFieldByName(fields, fieldName);
            }
            if (field) {
                parse = field.parse;
                if (!parse && field.type) {
                    parse = parsers[field.type.toLowerCase()];
                }
            }

            return parse ? parse(value) : value;
        },

        editable: function(field) {
            field = (this.fields || {})[field];
            return field ? field.editable !== false : true;
        },

        set: function(field, value, initiator) {
            var that = this;

            if (that.editable(field)) {
                value = that._parse(field, value);

                if (!equal(value, that.get(field))) {
                    that.dirty = true;
                    ObservableObject.fn.set.call(that, field, value, initiator);
                }
            }
        },

        accept: function(data) {
            var that = this,
                parent = function() { return that; },
                field;

            for (field in data) {
                that._set(field, that.wrap(data[field], field, parent));
            }

            if (that.idField) {
                that.id = that.get(that.idField);
            }

            that.dirty = false;
        },

        isNew: function() {
            return this.id === this._defaultId;
        }
    });

    Model.define = function(base, options) {
        if (options === undefined) {
            options = base;
            base = Model;
        }

        var model,
            proto = extend({ defaults: {} }, options),
            name,
            field,
            type,
            value,
            idx,
            length,
            fields = {},
            id = proto.id;

        if (id) {
            proto.idField = id;
        }

        if (proto.id) {
            delete proto.id;
        }

        if (id) {
            proto.defaults[id] = proto._defaultId = "";
        }

        if (toString.call(proto.fields) === "[object Array]") {
            for (idx = 0, length = proto.fields.length; idx < length; idx++) {
                field = proto.fields[idx];
                if (typeof field === STRING) {
                    fields[field] = {};
                } else if (field.field) {
                    fields[field.field] = field;
                }
            }
            proto.fields = fields;
        }

        for (name in proto.fields) {
            field = proto.fields[name];
            type = field.type || "default";
            value = null;

            name = typeof (field.field) === STRING ? field.field : name;

            if (!field.nullable) {
                value = proto.defaults[name] = field.defaultValue !== undefined ? field.defaultValue : defaultValues[type.toLowerCase()];
            }

            if (options.id === name) {
                proto._defaultId = value;
            }

            proto.defaults[name] = value;

            field.parse = field.parse || parsers[type];
        }

        model = base.extend(proto);
        model.define = function(options) {
            return Model.define(model, options);
        };

        if (proto.fields) {
            model.fields = proto.fields;
            model.idField = proto.idField;
        }

        return model;
    };

    var Comparer = {
        selector: function(field) {
            return isFunction(field) ? field : getter(field);
        },

        asc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                if (a == null && b ==null) {
                    return 0;
                }

                if ((a && !b && a > 0) || b == null) {
                    return 1;
                }

                if (b && !a && b > 0) {
                    return -1;
                }

                return a > b ? 1 : (a < b ? -1 : 0);
            };
        },

        desc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                a = selector(a);
                b = selector(b);

                if (a == null && b == null) {
                    return 0;
                }

                if ((a && !b && a > 0) || b == null) {
                    return -1;
                }

                if ((b && !a && b > 0) || a == null) {
                    return 1;
                }

                return a < b ? 1 : (a > b ? -1 : 0);
            };
        },

        create: function(descriptor) {
            return this[descriptor.dir.toLowerCase()](descriptor.field);
        },

        combine: function(comparers) {
            return function(a, b) {
                var result = comparers[0](a, b),
                    idx,
                    length;

                for (idx = 1, length = comparers.length; idx < length; idx ++) {
                    result = result || comparers[idx](a, b);
                }

                return result;
            };
        }
    };

    var PositionComparer = extend({}, Comparer, {
        asc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                var valueA = selector(a);
                var valueB = selector(b);

                if (valueA && valueA.getTime && valueB && valueB.getTime) {
                    valueA = valueA.getTime();
                    valueB = valueB.getTime();
                }

                if (valueA === valueB) {
                    return a.__position - b.__position;
                }

                if (valueB == null) {
                    return 1;
                }

                return valueA > valueB ? 1 : (valueA < valueB ? -1 : 0);
            };
        },

        desc: function(field) {
            var selector = this.selector(field);
            return function (a, b) {
                var valueA = selector(a);
                var valueB = selector(b);

                if (valueA && valueA.getTime && valueB && valueB.getTime) {
                    valueA = valueA.getTime();
                    valueB = valueB.getTime();
                }

                if (valueA === valueB) {
                    return a.__position - b.__position;
                }

                return valueA < valueB ? 1 : (valueA > valueB ? -1 : 0);
            };
        }
    });

    map = function (array, callback) {
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = callback(array[idx], idx, array);
        }

        return result;
    };

    var operators = (function(){

        function quote(value) {
            return value.replace(quoteRegExp, "\\").replace(newLineRegExp, "");
        }

        function operator(op, a, b, ignore) {
            var date;

            if (b != null) {
                if (typeof b === STRING) {
                    b = quote(b);
                    date = dateRegExp.exec(b);
                    if (date) {
                        b = new Date(+date[1]);
                    } else if (ignore) {
                        b = "'" + b.toLowerCase() + "'";
                        a = "(" + a + " || '').toLowerCase()";
                    } else {
                        b = "'" + b + "'";
                    }
                }

                if (b.getTime) {
                    //b looks like a Date
                    a = "(" + a + "?" + a + ".getTime():" + a + ")";
                    b = b.getTime();
                }
            }

            return a + " " + op + " " + b;
        }

        return {
            eq: function(a, b, ignore) {
                return operator("==", a, b, ignore);
            },
            neq: function(a, b, ignore) {
                return operator("!=", a, b, ignore);
            },
            gt: function(a, b, ignore) {
                return operator(">", a, b, ignore);
            },
            gte: function(a, b, ignore) {
                return operator(">=", a, b, ignore);
            },
            lt: function(a, b, ignore) {
                return operator("<", a, b, ignore);
            },
            lte: function(a, b, ignore) {
                return operator("<=", a, b, ignore);
            },
            startswith: function(a, b, ignore) {
                if (ignore) {
                    a = a + ".toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".lastIndexOf('" + b + "', 0) == 0";
            },
            endswith: function(a, b, ignore) {
                if (ignore) {
                    a = a + ".toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "', " + a + ".length - " + (b || "").length + ") >= 0";
            },
            contains: function(a, b, ignore) {
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "') >= 0";
            },
            doesnotcontain: function(a, b, ignore) {
                if (ignore) {
                    a = "(" + a + " || '').toLowerCase()";
                    if (b) {
                        b = b.toLowerCase();
                    }
                }

                if (b) {
                    b = quote(b);
                }

                return a + ".indexOf('" + b + "') == -1";
            }
        };
    })();

    function Query(data) {
        this.data = data || [];
    }

    Query.filterExpr = function(expression) {
        var expressions = [],
            logic = { and: " && ", or: " || " },
            idx,
            length,
            filter,
            expr,
            fieldFunctions = [],
            operatorFunctions = [],
            field,
            operator,
            filters = expression.filters;

        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            operator = filter.operator;

            if (filter.filters) {
                expr = Query.filterExpr(filter);
                //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
                filter = expr.expression
                .replace(/__o\[(\d+)\]/g, function(match, index) {
                    index = +index;
                    return "__o[" + (operatorFunctions.length + index) + "]";
                })
                .replace(/__f\[(\d+)\]/g, function(match, index) {
                    index = +index;
                    return "__f[" + (fieldFunctions.length + index) + "]";
                });

                operatorFunctions.push.apply(operatorFunctions, expr.operators);
                fieldFunctions.push.apply(fieldFunctions, expr.fields);
            } else {
                if (typeof field === FUNCTION) {
                    expr = "__f[" + fieldFunctions.length +"](d)";
                    fieldFunctions.push(field);
                } else {
                    expr = kendo.expr(field);
                }

                if (typeof operator === FUNCTION) {
                    filter = "__o[" + operatorFunctions.length + "](" + expr + ", " + filter.value + ")";
                    operatorFunctions.push(operator);
                } else {
                    filter = operators[(operator || "eq").toLowerCase()](expr, filter.value, filter.ignoreCase !== undefined? filter.ignoreCase : true);
                }
            }

            expressions.push(filter);
        }

        return  { expression: "(" + expressions.join(logic[expression.logic]) + ")", fields: fieldFunctions, operators: operatorFunctions };
    };

    function normalizeSort(field, dir) {
        if (field) {
            var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
            descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

            return grep(descriptors, function(d) { return !!d.dir; });
        }
    }

    var operatorMap = {
        "==": "eq",
        equals: "eq",
        isequalto: "eq",
        equalto: "eq",
        equal: "eq",
        "!=": "neq",
        ne: "neq",
        notequals: "neq",
        isnotequalto: "neq",
        notequalto: "neq",
        notequal: "neq",
        "<": "lt",
        islessthan: "lt",
        lessthan: "lt",
        less: "lt",
        "<=": "lte",
        le: "lte",
        islessthanorequalto: "lte",
        lessthanequal: "lte",
        ">": "gt",
        isgreaterthan: "gt",
        greaterthan: "gt",
        greater: "gt",
        ">=": "gte",
        isgreaterthanorequalto: "gte",
        greaterthanequal: "gte",
        ge: "gte",
        notsubstringof: "doesnotcontain"
    };

    function normalizeOperator(expression) {
        var idx,
        length,
        filter,
        operator,
        filters = expression.filters;

        if (filters) {
            for (idx = 0, length = filters.length; idx < length; idx++) {
                filter = filters[idx];
                operator = filter.operator;

                if (operator && typeof operator === STRING) {
                    filter.operator = operatorMap[operator.toLowerCase()] || operator;
                }

                normalizeOperator(filter);
            }
        }
    }

    function normalizeFilter(expression) {
        if (expression && !isEmptyObject(expression)) {
            if (isArray(expression) || !expression.filters) {
                expression = {
                    logic: "and",
                    filters: isArray(expression) ? expression : [expression]
                };
            }

            normalizeOperator(expression);

            return expression;
        }
    }

    Query.normalizeFilter = normalizeFilter;

    function normalizeAggregate(expressions) {
        return isArray(expressions) ? expressions : [expressions];
    }

    function normalizeGroup(field, dir) {
        var descriptor = typeof field === STRING ? { field: field, dir: dir } : field,
        descriptors = isArray(descriptor) ? descriptor : (descriptor !== undefined ? [descriptor] : []);

        return map(descriptors, function(d) { return { field: d.field, dir: d.dir || "asc", aggregates: d.aggregates }; });
    }

    Query.prototype = {
        toArray: function () {
            return this.data;
        },
        range: function(index, count) {
            return new Query(this.data.slice(index, index + count));
        },
        skip: function (count) {
            return new Query(this.data.slice(count));
        },
        take: function (count) {
            return new Query(this.data.slice(0, count));
        },
        select: function (selector) {
            return new Query(map(this.data, selector));
        },
        orderBy: function (selector) {
            var result = this.data.slice(0),
            comparer = isFunction(selector) || !selector ? Comparer.asc(selector) : selector.compare;

            return new Query(result.sort(comparer));
        },
        orderByDescending: function (selector) {
            return new Query(this.data.slice(0).sort(Comparer.desc(selector)));
        },
        sort: function(field, dir, comparer) {
            var idx,
            length,
            descriptors = normalizeSort(field, dir),
            comparers = [];

            comparer = comparer || Comparer;

            if (descriptors.length) {
                for (idx = 0, length = descriptors.length; idx < length; idx++) {
                    comparers.push(comparer.create(descriptors[idx]));
                }

                return this.orderBy({ compare: comparer.combine(comparers) });
            }

            return this;
        },

        filter: function(expressions) {
            var idx,
            current,
            length,
            compiled,
            predicate,
            data = this.data,
            fields,
            operators,
            result = [],
            filter;

            expressions = normalizeFilter(expressions);

            if (!expressions || expressions.filters.length === 0) {
                return this;
            }

            compiled = Query.filterExpr(expressions);
            fields = compiled.fields;
            operators = compiled.operators;

            predicate = filter = new Function("d, __f, __o", "return " + compiled.expression);

            if (fields.length || operators.length) {
                filter = function(d) {
                    return predicate(d, fields, operators);
                };
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                current = data[idx];

                if (filter(current)) {
                    result.push(current);
                }
            }
            return new Query(result);
        },

        group: function(descriptors, allData) {
            descriptors =  normalizeGroup(descriptors || []);
            allData = allData || this.data;

            var that = this,
            result = new Query(that.data),
            descriptor;

            if (descriptors.length > 0) {
                descriptor = descriptors[0];
                result = result.groupBy(descriptor).select(function(group) {
                    var data = new Query(allData).filter([ { field: group.field, operator: "eq", value: group.value } ]);
                    return {
                        field: group.field,
                        value: group.value,
                        items: descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), data.toArray()).toArray() : group.items,
                        hasSubgroups: descriptors.length > 1,
                        aggregates: data.aggregate(descriptor.aggregates)
                    };
                });
            }
            return result;
        },

        groupBy: function(descriptor) {
            if (isEmptyObject(descriptor) || !this.data.length) {
                return new Query([]);
            }

            var field = descriptor.field,
                sorted = this._sortForGrouping(field, descriptor.dir || "asc"),
                accessor = kendo.accessor(field),
                item,
                groupValue = accessor.get(sorted[0], field),
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                },
                currentValue,
                idx,
                len,
                result = [group];

            for(idx = 0, len = sorted.length; idx < len; idx++) {
                item = sorted[idx];
                currentValue = accessor.get(item, field);
                if(!groupValueComparer(groupValue, currentValue)) {
                    groupValue = currentValue;
                    group = {
                        field: field,
                        value: groupValue,
                        items: []
                    };
                    result.push(group);
                }
                group.items.push(item);
            }
            return new Query(result);
        },

        _sortForGrouping: function(field, dir) {
            var idx, length,
                data = this.data;

            if (!stableSort) {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    data[idx].__position = idx;
                }

                data = new Query(data).sort(field, dir, PositionComparer).toArray();

                for (idx = 0, length = data.length; idx < length; idx++) {
                    delete data[idx].__position;
                }
                return data;
            }
            return this.sort(field, dir).toArray();
        },

        aggregate: function (aggregates) {
            var idx,
            len,
            result = {};

            if (aggregates && aggregates.length) {
                for(idx = 0, len = this.data.length; idx < len; idx++) {
                    calculateAggregate(result, aggregates, this.data[idx], idx, len);
                }
            }
            return result;
        }
    };

    function groupValueComparer(a, b) {
        if (a && a.getTime && b && b.getTime) {
            return a.getTime() === b.getTime();
        }
        return a === b;
    }

    function calculateAggregate(accumulator, aggregates, item, index, length) {
        aggregates = aggregates || [];
        var idx,
        aggr,
        functionName,
        len = aggregates.length;

        for (idx = 0; idx < len; idx++) {
            aggr = aggregates[idx];
            functionName = aggr.aggregate;
            var field = aggr.field;
            accumulator[field] = accumulator[field] || {};
            accumulator[field][functionName] = functions[functionName.toLowerCase()](accumulator[field][functionName], item, kendo.accessor(field), index, length);
        }
    }

    var functions = {
        sum: function(accumulator, item, accessor) {
            return (accumulator || 0) + accessor.get(item);
        },
        count: function(accumulator) {
            return (accumulator || 0) + 1;
        },
        average: function(accumulator, item, accessor, index, length) {
            accumulator = (accumulator || 0) + accessor.get(item);
            if(index == length - 1) {
                accumulator = accumulator / length;
            }
            return accumulator;
        },
        max: function(accumulator, item, accessor) {
            var value = accessor.get(item);

            accumulator = accumulator || 0;

            if(accumulator < value) {
                accumulator = value;
            }
            return accumulator;
        },
        min: function(accumulator, item, accessor) {
            var value = accessor.get(item);

            accumulator = (accumulator || value);

            if(accumulator > value) {
                accumulator = value;
            }
            return accumulator;
        }
    };

    function toJSON(array) {
        var idx, length = array.length, result = new Array(length);

        for (idx = 0; idx < length; idx++) {
            result[idx] = array[idx].toJSON();
        }

        return result;
    }

    Query.process = function(data, options) {
        options = options || {};

        var query = new Query(data),
            group = options.group,
            sort = normalizeGroup(group || []).concat(normalizeSort(options.sort || [])),
            total,
            filter = options.filter,
            skip = options.skip,
            take = options.take;

        if (filter) {
            query = query.filter(filter);
            total = query.toArray().length;
        }

        if (sort) {
            query = query.sort(sort);

            if (group) {
                data = query.toArray();
            }
        }

        if (skip !== undefined && take !== undefined) {
            query = query.range(skip, take);
        }

        if (group) {
            query = query.group(group, data);
        }

        return {
            total: total,
            data: query.toArray()
        };
    };

    function calculateAggregates(data, options) {
        options = options || {};

        var query = new Query(data),
            aggregates = options.aggregate,
            filter = options.filter;

        if(filter) {
            query = query.filter(filter);
        }

        return query.aggregate(aggregates);
    }

    var LocalTransport = Class.extend({
        init: function(options) {
            this.data = options.data;
        },

        read: function(options) {
            options.success(this.data);
        },
        update: function(options) {
            options.success(options.data);
        },
        create: function(options) {
            options.success(options.data);
        },
        destroy: function(options) {
            options.success(options.data);
        }
    });

    var RemoteTransport = Class.extend( {
        init: function(options) {
            var that = this, parameterMap;

            options = that.options = extend({}, that.options, options);

            each(crud, function(index, type) {
                if (typeof options[type] === STRING) {
                    options[type] = {
                        url: options[type]
                    };
                }
            });

            that.cache = options.cache? Cache.create(options.cache) : {
                find: noop,
                add: noop
            };

            parameterMap = options.parameterMap;

            that.parameterMap = isFunction(parameterMap) ? parameterMap : function(options) {
                var result = {};

                each(options, function(option, value) {
                    if (option in parameterMap) {
                        option = parameterMap[option];
                        if (isPlainObject(option)) {
                            value = option.value(value);
                            option = option.key;
                        }
                    }

                    result[option] = value;
                });

                return result;
            };
        },

        options: {
            parameterMap: identity
        },

        create: function(options) {
            return ajax(this.setup(options, CREATE));
        },

        read: function(options) {
            var that = this,
                success,
                error,
                result,
                cache = that.cache;

            options = that.setup(options, READ);

            success = options.success || noop;
            error = options.error || noop;

            result = cache.find(options.data);

            if(result !== undefined) {
                success(result);
            } else {
                options.success = function(result) {
                    cache.add(options.data, result);

                    success(result);
                };

                $.ajax(options);
            }
        },

        update: function(options) {
            return ajax(this.setup(options, UPDATE));
        },

        destroy: function(options) {
            return ajax(this.setup(options, DESTROY));
        },

        setup: function(options, type) {
            options = options || {};

            var that = this,
                parameters,
                operation = that.options[type],
                data = isFunction(operation.data) ? operation.data(options.data) : operation.data;

            options = extend(true, {}, operation, options);
            parameters = extend(true, {}, data, options.data);

            options.data = that.parameterMap(parameters, type);

            if (isFunction(options.url)) {
                options.url = options.url(parameters);
            }

            return options;
        }
    });

    var Cache = Class.extend({
        init: function() {
            this._store = {};
        },
        add: function(key, data) {
            if(key !== undefined) {
                this._store[stringify(key)] = data;
            }
        },
        find: function(key) {
            return this._store[stringify(key)];
        },
        clear: function() {
            this._store = {};
        },
        remove: function(key) {
            delete this._store[stringify(key)];
        }
    });

    Cache.create = function(options) {
        var store = {
            "inmemory": function() { return new Cache(); }
        };

        if (isPlainObject(options) && isFunction(options.find)) {
            return options;
        }

        if (options === true) {
            return new Cache();
        }

        return store[options]();
    };

    function convertRecords(data, getters, modelInstance) {
        var record,
            getter,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            for (getter in getters) {
                record[getter] = modelInstance._parse(getter, getters[getter](record));
            }
        }
    }

    function convertGroup(data, getters, modelInstance) {
        var record,
            idx,
            length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            record = data[idx];
            record.value = modelInstance._parse(record.field, record.value);

            if (record.hasSubgroups) {
                convertGroup(record.items, getters, modelInstance);
            } else {
                convertRecords(record.items, getters, modelInstance);
            }
        }
    }

    function wrapDataAccess(originalFunction, model, converter, getters) {
        return function(data) {
            data = originalFunction(data);

            if (data && !isEmptyObject(getters)) {
                if (toString.call(data) !== "[object Array]" && !(data instanceof ObservableArray)) {
                    data = [data];
                }

                converter(data, getters, new model());
            }

            return data || [];
        };
    }

    var DataReader = Class.extend({
        init: function(schema) {
            var that = this, member, get, model, base;

            schema = schema || {};

            for (member in schema) {
                get = schema[member];

                that[member] = typeof get === STRING ? getter(get) : get;
            }

            base = schema.modelBase || Model;

            if (isPlainObject(that.model)) {
                that.model = model = base.define(that.model);
            }

            if (that.model) {
                var dataFunction = proxy(that.data, that),
                    groupsFunction = proxy(that.groups, that),
                    getters = {};

                model = that.model;

                if (model.fields) {
                    each(model.fields, function(field, value) {
                        if (isPlainObject(value) && value.field) {
                            getters[value.field] = getter(value.field);
                        } else {
                            getters[field] = getter(field);
                        }
                    });
                }

                that.data = wrapDataAccess(dataFunction, model, convertRecords, getters);
                that.groups = wrapDataAccess(groupsFunction, model, convertGroup, getters);
            }
        },
        errors: function(data) {
            return data ? data.errors : null;
        },
        parse: identity,
        data: identity,
        total: function(data) {
            return data.length;
        },
        groups: identity,
        status: function(data) {
            return data.status;
        },
        aggregates: function() {
            return {};
        }
    });

    function mergeGroups(target, dest, start, count) {
        var group,
            idx = 0,
            items;

        while (dest.length && count) {
            group = dest[idx];
            items = group.items;

            if (target && target.field === group.field && target.value === group.value) {
                if (target.hasSubgroups && target.items.length) {
                    mergeGroups(target.items[target.items.length - 1], group.items, start, count);
                } else {
                    items = items.slice(start, count);
                    count -= items.length;
                    target.items = target.items.concat(items);
                }
                dest.splice(idx--, 1);
            } else {
                items = items.slice(start, count);
                count -= items.length;
                group.items = items;
                if (!group.items.length) {
                    dest.splice(idx--, 1);
                }
            }

            start = 0;
            if (++idx >= dest.length) {
                break;
            }
        }
    }

    function flattenGroups(data) {
        var idx, length, result = [];

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                result = result.concat(flattenGroups(data[idx].items));
            } else {
                result = result.concat(data[idx].items.slice());
            }
        }
        return result;
    }

    function wrapGroupItems(data, model) {
        var idx, length, group, items;
        if (model) {
            for (idx = 0, length = data.length; idx < length; idx++) {
                group = data[idx];
                items = group.items;

                if (group.hasSubgroups) {
                    wrapGroupItems(items, model);
                } else if (items.length && !(items[0] instanceof model)) {
                    items.type = model;
                    items.wrapAll(items, items);
                }
            }
        }
    }

    function eachGroupItems(data, func) {
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].hasSubgroups) {
                if (eachGroupItems(data[idx].items, func)) {
                    return true;
                }
            } else if (func(data[idx].items, data[idx])) {
                return true;
            }
        }
    }

    function removeModel(data, model) {
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (data[idx].uid == model.uid) {
                model = data[idx];
                data.splice(idx, 1);
                return model;
            }
        }
    }

    function wrapInEmptyGroup(groups, model) {
        var parent,
            group,
            idx,
            length;

        for (idx = groups.length-1, length = 0; idx >= length; idx--) {
            group = groups[idx];
            parent = {
                value: model.get(group.field),
                field: group.field,
                items: parent ? [parent] : [model],
                hasSubgroups: !!parent,
                aggregates: {}
            };
        }

        return parent;
    }

    function indexOfPristineModel(data, model) {
        if (model) {
            return indexOf(data, function(item) {
                return item[model.idField] === model.id;
            });
        }
        return -1;
    }

    function indexOfModel(data, model) {
        if (model) {
            return indexOf(data, function(item) {
                return item.uid == model.uid;
            });
        }
        return -1;
    }

    function indexOf(data, comparer) {
        var idx, length;

        for (idx = 0, length = data.length; idx < length; idx++) {
            if (comparer(data[idx])) {
                return idx;
            }
        }

        return -1;
    }

    var DataSource = Observable.extend({
        init: function(options) {
            var that = this, model, data;

            if (options) {
                data = options.data;
            }

            options = that.options = extend({}, that.options, options);

            that._map = {};
            that._prefetch = {};
            that._data = [];
            that._ranges = [];
            that._view = [];
            that._pristine = [];
            that._destroyed = [];
            that._pageSize = options.pageSize;
            that._page = options.page  || (options.pageSize ? 1 : undefined);
            that._sort = normalizeSort(options.sort);
            that._filter = normalizeFilter(options.filter);
            that._group = normalizeGroup(options.group);
            that._aggregate = options.aggregate;
            that._total = options.total;

            Observable.fn.init.call(that);

            that.transport = Transport.create(options, data);

            that.reader = new kendo.data.readers[options.schema.type || "json" ](options.schema);

            model = that.reader.model || {};

            that._data = that._observe(that._data);

            that.bind([ERROR, CHANGE, REQUESTSTART, SYNC, REQUESTEND, PROGRESS], options);
        },

        options: {
            data: [],
            schema: {
               modelBase: Model
            },
            serverSorting: false,
            serverPaging: false,
            serverFiltering: false,
            serverGrouping: false,
            serverAggregates: false,
            batch: false
        },

        _isServerGrouped: function() {
            var group = this.group() || [];

            return this.options.serverGrouping && group.length;
        },

        _flatData: function(data) {
            if (this._isServerGrouped()) {
                return flattenGroups(data);
            }
            return data;
        },

        parent: noop,

        get: function(id) {
            var idx, length, data = this._flatData(this._data);

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].id == id) {
                    return data[idx];
                }
            }
        },

        getByUid: function(id) {
            var idx, length, data = this._flatData(this._data);

            if (!data) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].uid == id) {
                    return data[idx];
                }
            }
        },

        indexOf: function(model) {
            return indexOfModel(this._data, model);
        },

        at: function(index) {
            return this._data[index];
        },

        data: function(value) {
            var that = this;
            if (value !== undefined) {
                that._data = this._observe(value);

                that._ranges = [];
                that._addRange(that._data);

                that._total = that._data.length;

                that._process(that._data);
            } else {
                return that._data;
            }
        },

        view: function() {
            return this._view;
        },

        add: function(model) {
            return this.insert(this._data.length, model);
        },

        insert: function(index, model) {
            if (!model) {
                model = index;
                index = 0;
            }

            if (!(model instanceof Model)) {
                if (this.reader.model) {
                    model = new this.reader.model(model);
                } else {
                    model = new ObservableObject(model);
                }
            }

            if (this._isServerGrouped()) {
                this._data.splice(index, 0, wrapInEmptyGroup(this.group(), model));
            } else {
                this._data.splice(index, 0, model);
            }

            return model;
        },

        remove: function(model) {
            var result,
                that = this,
                hasGroups = that._isServerGrouped();

            this._eachItem(that._data, function(items) {
                result = removeModel(items, model);
                if (result && hasGroups) {
                    if (!result.isNew || !result.isNew()) {
                        that._destroyed.push(result);
                    }
                    return true;
                }
            });
            return model;
        },

        sync: function() {
            var that = this,
                idx,
                length,
                created = [],
                updated = [],
                destroyed = that._destroyed,
                data = that._flatData(that._data);

            if (!that.reader.model) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].isNew()) {
                    created.push(data[idx]);
                } else if (data[idx].dirty) {
                    updated.push(data[idx]);
                }
            }

            var promises = that._send("create", created);

            promises.push.apply(promises ,that._send("update", updated));
            promises.push.apply(promises ,that._send("destroy", destroyed));

            $.when.apply(null, promises)
                .then(function() {
                    var idx, length;

                    for (idx = 0, length = arguments.length; idx < length; idx++){
                        that._accept(arguments[idx]);
                    }

                    that._change({ action: "sync" });

                    that.trigger(SYNC);
                });
        },

        cancelChanges: function(model) {
            var that = this,
                pristine = that._readData(that._pristine);

            if (model instanceof kendo.data.Model) {
                that._cancelModel(model);
            } else {
                that._destroyed = [];
                that._data = that._observe(pristine);
                if (that.options.serverPaging) {
                    that._total = that.reader.total(that._pristine);
                }
                that._change();
            }
        },

        hasChanges: function() {
            var idx,
                length,
                data = this._data;

            if (this._destroyed.length) {
                return true;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (data[idx].isNew() || data[idx].dirty) {
                    return true;
                }
            }

            return false;
        },

        _accept: function(result) {
            var that = this,
                models = result.models,
                response = result.response,
                idx = 0,
                serverGroup = that._isServerGrouped(),
                pristine = that._readData(that._pristine),
                type = result.type,
                length;

            that.trigger(REQUESTEND, { response: response, type: type });

            if (response) {
                response = that.reader.parse(response);

                if (that._handleCustomErrors(response)) {
                    return;
                }

                response = that.reader.data(response);

                if (!$.isArray(response)) {
                    response = [response];
                }
            } else {
                response = $.map(models, function(model) { return model.toJSON(); } );
            }

            if (type === "destroy") {
                that._destroyed = [];
            }

            for (idx = 0, length = models.length; idx < length; idx++) {
                if (type !== "destroy") {
                    models[idx].accept(response[idx]);

                    if (type === "create") {
                        pristine.push(serverGroup ? wrapInEmptyGroup(that.group(), models[idx]) : response[idx]);
                    } else if (type === "update") {
                        that._updatePristineForModel(models[idx], response[idx]);
                    }
                } else {
                    that._removePristineForModel(models[idx]);
                }
            }
        },

        _updatePristineForModel: function(model, values) {
            this._executeOnPristineForModel(model, function(index, items) {
                extend(true, items[index], values);
            });
        },

        _executeOnPristineForModel: function(model, callback) {
            this._eachPristineItem(
                function(items) {
                    var index = indexOfPristineModel(items, model);
                    if (index > -1) {
                        callback(index, items);
                        return true;
                    }
                });
        },

        _removePristineForModel: function(model) {
            this._executeOnPristineForModel(model, function(index, items) {
                items.splice(index, 1);
            });
        },

        _readData: function(data) {
            var read = !this._isServerGrouped() ? this.reader.data : this.reader.groups;
            return read(data);
        },

        _eachPristineItem: function(callback) {
            this._eachItem(this._readData(this._pristine), callback);
        },

       _eachItem: function(data, callback) {
            if (data && data.length) {
                if (this._isServerGrouped()) {
                    eachGroupItems(data, callback);
                } else {
                    callback(data);
                }
            }
        },

        _pristineForModel: function(model) {
            var pristine,
                idx,
                callback = function(items) {
                    idx = indexOfPristineModel(items, model);
                    if (idx > -1) {
                        pristine = items[idx];
                        return true;
                    }
                };

            this._eachPristineItem(callback);

            return pristine;
        },

        _cancelModel: function(model) {
            var pristine = this._pristineForModel(model),
                idx;

           this._eachItem(this._data, function(items) {
                idx = indexOfModel(items, model);
                if (idx != -1) {
                    if (!model.isNew() && pristine) {
                        items[idx].accept(pristine);
                    } else {
                        items.splice(idx, 1);
                    }
                }
            });
        },

        _promise: function(data, models, type) {
            var that = this,
            transport = that.transport;

            return $.Deferred(function(deferred) {
                transport[type].call(transport, extend({
                    success: function(response) {
                        deferred.resolve({
                            response: response,
                            models: models,
                            type: type
                        });
                    },
                    error: function(response, status, error) {
                        deferred.reject(response);
                        that.error(response, status, error);
                    }
                }, data)
                );
            }).promise();
        },

        _send: function(method, data) {
            var that = this,
                idx,
                length,
                promises = [];

            if (that.options.batch) {
                if (data.length) {
                    promises.push(that._promise( { data: { models: toJSON(data) } }, data , method));
                }
            } else {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    promises.push(that._promise( { data: data[idx].toJSON() }, [ data[idx] ], method));
                }
            }

            return promises;
        },

        read: function(data) {
            var that = this, params = that._params(data);

            that._queueRequest(params, function() {
                if (!that.trigger(REQUESTSTART)) {
                    that.trigger(PROGRESS);

                    that._ranges = [];
                    that.transport.read({
                        data: params,
                        success: proxy(that.success, that),
                        error: proxy(that.error, that)
                    });
                } else {
                    that._dequeueRequest();
                }
            });
        },

        success: function(data) {
            var that = this,
                options = that.options;

            that.trigger(REQUESTEND, { response: data, type: "read" });

            data = that.reader.parse(data);

            if (that._handleCustomErrors(data)) {
                that._dequeueRequest();
                return;
            }

            that._pristine = isPlainObject(data) ? $.extend(true, {}, data) : data.slice ? data.slice(0) : data;

            that._total = that.reader.total(data);

            if (that._aggregate && options.serverAggregates) {
                that._aggregateResult = that.reader.aggregates(data);
            }

            data = that._readData(data);

            that._data = that._observe(data);

            that._addRange(that._data);

            that._dequeueRequest();
            that._process(that._data);
        },

        _addRange: function(data) {
            var that = this,
                start = that._skip || 0,
                end = start + that._flatData(data).length;

            that._ranges.push({ start: start, end: end, data: data });
            that._ranges.sort( function(x, y) { return x.start - y.start; } );
        },

        error: function(xhr, status, errorThrown) {
            this._dequeueRequest();
            this.trigger(REQUESTEND, { });
            this.trigger(ERROR, { xhr: xhr, status: status, errorThrown: errorThrown });
        },

        _params: function(data) {
            var that = this,
                options =  extend({
                    take: that.take(),
                    skip: that.skip(),
                    page: that.page(),
                    pageSize: that.pageSize(),
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                }, data);

            if (!that.options.serverPaging) {
                delete options.take;
                delete options.skip;
                delete options.page;
                delete options.pageSize;
            }
            if (!that.options.serverGrouping) {
                delete options.group;
            }
            if (!that.options.serverFiltering) {
                delete options.filter;
            }
            if (!that.options.serverSorting) {
                delete options.sort;
            }
            if (!that.options.serverAggregates) {
                delete options.aggregate;
            }
            return options;
        },

        _queueRequest: function(options, callback) {
            var that = this;
            if (!that._requestInProgress) {
                that._requestInProgress = true;
                that._pending = undefined;
                callback();
            } else {
                that._pending = { callback: proxy(callback, that), options: options };
            }
        },

        _dequeueRequest: function() {
            var that = this;
            that._requestInProgress = false;
            if (that._pending) {
                that._queueRequest(that._pending.options, that._pending.callback);
            }
        },

        _handleCustomErrors: function(response) {
            if (this.reader.errors) {
                var errors = this.reader.errors(response);
                if (errors) {
                    this.trigger(ERROR, { xhr: null, status: "customerror", errorThrown: "custom error", errors: errors });
                    return true;
                }
            }
            return false;
        },
        _observe: function(data) {
            var that = this,
                model = that.reader.model,
                wrap = false;

            if (model && data.length) {
                wrap = !(data[0] instanceof model);
            }

            if (data instanceof ObservableArray) {
                if (wrap) {
                    data.type = that.reader.model;
                    data.wrapAll(data, data);
                }
            } else {
                data = new ObservableArray(data, that.reader.model);
                data.parent = function() { return that.parent(); };
            }

            if (that._isServerGrouped()) {
                wrapGroupItems(data, model);
            }

            return data.bind(CHANGE, proxy(that._change, that));
        },

        _change: function(e) {
            var that = this, idx, length, action = e ? e.action : "";

            if (action === "remove") {
                for (idx = 0, length = e.items.length; idx < length; idx++) {
                    if (!e.items[idx].isNew || !e.items[idx].isNew()) {
                        that._destroyed.push(e.items[idx]);
                    }
                }
            }

            if (that.options.autoSync && (action === "add" || action === "remove" || action === "itemchange")) {
                that.sync();
            } else {
                var total = that._total || that.reader.total(that._pristine);
                if (action === "add") {
                    total++;
                } else if (action === "remove") {
                    total--;
                } else if (action !== "itemchange" && action !== "sync" && !that.options.serverPaging) {
                    total = that.reader.total(that._pristine);
                }

                that._total = total;

                that._process(that._data, e);
            }
        },

        _process: function (data, e) {
            var that = this,
                options = {},
                result;

            if (that.options.serverPaging !== true) {
                options.skip = that._skip;
                options.take = that._take || that._pageSize;

                if(options.skip === undefined && that._page !== undefined && that._pageSize !== undefined) {
                    options.skip = (that._page - 1) * that._pageSize;
                }
            }

            if (that.options.serverSorting !== true) {
                options.sort = that._sort;
            }

            if (that.options.serverFiltering !== true) {
                options.filter = that._filter;
            }

            if (that.options.serverGrouping !== true) {
                options.group = that._group;
            }

            if (that.options.serverAggregates !== true) {
                options.aggregate = that._aggregate;
                that._aggregateResult = calculateAggregates(data, options);
            }

            result = Query.process(data, options);

            that._view = result.data;

            if (result.total !== undefined && !that.options.serverFiltering) {
                that._total = result.total;
            }

            e = e || {};

            e.items = e.items || that._view;

            that.trigger(CHANGE, e);
        },

        _mergeState: function(options) {
            var that = this;

            if (options !== undefined) {
                that._pageSize = options.pageSize;
                that._page = options.page;
                that._sort = options.sort;
                that._filter = options.filter;
                that._group = options.group;
                that._aggregate = options.aggregate;
                that._skip = options.skip;
                that._take = options.take;

                if(that._skip === undefined) {
                    that._skip = that.skip();
                    options.skip = that.skip();
                }

                if(that._take === undefined && that._pageSize !== undefined) {
                    that._take = that._pageSize;
                    options.take = that._take;
                }

                if (options.sort) {
                    that._sort = options.sort = normalizeSort(options.sort);
                }

                if (options.filter) {
                    that._filter = options.filter = normalizeFilter(options.filter);
                }

                if (options.group) {
                    that._group = options.group = normalizeGroup(options.group);
                }
                if (options.aggregate) {
                    that._aggregate = options.aggregate = normalizeAggregate(options.aggregate);
                }
            }
            return options;
        },

        query: function(options) {
            var that = this,
                result,
                remote = that.options.serverSorting || that.options.serverPaging || that.options.serverFiltering || that.options.serverGrouping || that.options.serverAggregates;

            if (remote || (that._data === undefined || that._data.length === 0)) {
                that.read(that._mergeState(options));
            } else {
                if (!that.trigger(REQUESTSTART)) {
                    that.trigger(PROGRESS);

                    result = Query.process(that._data, that._mergeState(options));

                    if (!that.options.serverFiltering) {
                        if (result.total !== undefined) {
                            that._total = result.total;
                        } else {
                            that._total = that._data.length;
                        }
                    }

                    that._view = result.data;
                    that._aggregateResult = calculateAggregates(that._data, options);
                    that.trigger(REQUESTEND, { });
                    that.trigger(CHANGE, { items: result.data });
                }
            }
        },

        fetch: function(callback) {
            var that = this;

            if (callback && isFunction(callback)) {
                that.one(CHANGE, callback);
            }

            that._query();
        },

        _query: function(options) {
            var that = this;

            that.query(extend({}, {
                page: that.page(),
                pageSize: that.pageSize(),
                sort: that.sort(),
                filter: that.filter(),
                group: that.group(),
                aggregate: that.aggregate()
            }, options));
        },

        next: function(options) {
            var that = this,
                page = that.page(),
                total = that.total();

            options = options || {};

            if (!page || (total && page + 1 > that.totalPages())) {
                return;
            }

            that._skip = page * that.take();

            page += 1;
            options.page = page;

            that._query(options);

            return page;
        },

        prev: function(options) {
            var that = this,
                page = that.page();

            options = options || {};

            if (!page || page === 1) {
                return;
            }

            that._skip = that._skip - that.take();

            page -= 1;
            options.page = page;

            that._query(options);

            return page;
        },

        page: function(val) {
            var that = this,
            skip;

            if(val !== undefined) {
                val = math.max(math.min(math.max(val, 1), that.totalPages()), 1);
                that._query({ page: val });
                return;
            }
            skip = that.skip();

            return skip !== undefined ? math.round((skip || 0) / (that.take() || 1)) + 1 : undefined;
        },

        pageSize: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ pageSize: val, page: 1 });
                return;
            }

            return that.take();
        },

        sort: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ sort: val });
                return;
            }

            return that._sort;
        },

        filter: function(val) {
            var that = this;

            if (val === undefined) {
                return that._filter;
            }

            that._query({ filter: val, page: 1 });
        },

        group: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ group: val });
                return;
            }

            return that._group;
        },

        total: function() {
            return this._total || 0;
        },

        aggregate: function(val) {
            var that = this;

            if(val !== undefined) {
                that._query({ aggregate: val });
                return;
            }

            return that._aggregate;
        },

        aggregates: function() {
            return this._aggregateResult;
        },

        totalPages: function() {
            var that = this,
            pageSize = that.pageSize() || that.total();

            return math.ceil((that.total() || 0) / pageSize);
        },

        inRange: function(skip, take) {
            var that = this,
            end = math.min(skip + take, that.total());

            if (!that.options.serverPaging && that.data.length > 0) {
                return true;
            }

            return that._findRange(skip, end).length > 0;
        },

        range: function(skip, take) {
            skip = math.min(skip || 0, this.total());
            var that = this,
            pageSkip = math.max(math.floor(skip / take), 0) * take,
            size = math.min(pageSkip + take, that.total()),
            data;

            data = that._findRange(skip, math.min(skip + take, that.total()));

            if (data.length) {
                that._skip = skip > that.skip() ? math.min(size, (that.totalPages() - 1) * that.take()) : pageSkip;

                that._take = take;

                var paging = that.options.serverPaging;
                var sorting = that.options.serverSorting;
                var filtering = that.options.serverFiltering;
                try {
                    that.options.serverPaging = true;
                    that.options.serverSorting = true;
                    that.options.serverFiltering = true;
                    if (paging) {
                        that._data = data = that._observe(data);
                    }
                    that._process(data);
                } finally {
                    that.options.serverPaging = paging;
                    that.options.serverSorting = sorting;
                    that.options.serverFiltering = filtering;
                }

                return;
            }

            if (take !== undefined) {
                if (!that._rangeExists(pageSkip, size)) {
                    that.prefetch(pageSkip, take, function() {
                        if (skip > pageSkip && size < that.total() && !that._rangeExists(size, math.min(size + take, that.total()))) {
                            that.prefetch(size, take, function() {
                                that.range(skip, take);
                            });
                        } else {
                            that.range(skip, take);
                        }
                    });
                } else if (pageSkip < skip) {
                    that.prefetch(size, take, function() {
                        that.range(skip, take);
                    });
                }
            }
        },

        _findRange: function(start, end) {
            var that = this,
                ranges = that._ranges,
                range,
                data = [],
                skipIdx,
                takeIdx,
                startIndex,
                endIndex,
                rangeData,
                rangeEnd,
                processed,
                options = that.options,
                remote = options.serverSorting || options.serverPaging || options.serverFiltering || options.serverGrouping || options.serverAggregates,
                flatData,
                count,
                length;

            for (skipIdx = 0, length = ranges.length; skipIdx < length; skipIdx++) {
                range = ranges[skipIdx];
                if (start >= range.start && start <= range.end) {
                    count = 0;

                    for (takeIdx = skipIdx; takeIdx < length; takeIdx++) {
                        range = ranges[takeIdx];
                        flatData = that._flatData(range.data);

                        if (flatData.length && start + count >= range.start) {
                            rangeData = range.data;
                            rangeEnd = range.end;

                            if (!remote) {
                                var sort = normalizeGroup(that.group() || []).concat(normalizeSort(that.sort() || []));
                                processed = Query.process(range.data, { sort: sort, filter: that.filter() });
                                flatData = rangeData = processed.data;

                                if (processed.total !== undefined) {
                                    rangeEnd = processed.total;
                                }
                            }

                            startIndex = 0;
                            if (start + count > range.start) {
                                startIndex = (start + count) - range.start;
                            }
                            endIndex = flatData.length;
                            if (rangeEnd > end) {
                                endIndex = endIndex - (rangeEnd - end);
                            }
                            count += endIndex - startIndex;
                            data = that._mergeGroups(data, rangeData, startIndex, endIndex);

                            if (end <= range.end && count == end - start) {
                                return data;
                            }
                        }
                    }
                    break;
                }
            }
            return [];
        },

        _mergeGroups: function(data, range, startIndex, endIndex) {
            if (this._isServerGrouped()) {
                var temp = range.toJSON(),
                    prevGroup;

                if (data.length) {
                    prevGroup = data[data.length - 1];
                }

                mergeGroups(prevGroup, temp, startIndex, endIndex);

                return data.concat(temp);
            }
            return data.concat(range.slice(startIndex, endIndex));
        },

        skip: function() {
            var that = this;

            if (that._skip === undefined) {
                return (that._page !== undefined ? (that._page  - 1) * (that.take() || 1) : undefined);
            }
            return that._skip;
        },

        take: function() {
            return this._take || this._pageSize;
        },

        _prefetchSuccessHandler: function (skip, size, callback) {
            var that = this;
            return function(data) {
                var found = false,
                    range = { start: skip, end: size, data: [] },
                    idx,
                    length;

                that._dequeueRequest();

                for (idx = 0, length = that._ranges.length; idx < length; idx++) {
                    if (that._ranges[idx].start === skip) {
                        found = true;
                        range = that._ranges[idx];
                        break;
                    }
                }
                if (!found) {
                    that._ranges.push(range);
                }

                data = that.reader.parse(data);
                range.data = that._observe(that._readData(data));
                range.end = range.start + that._flatData(range.data).length;
                that._ranges.sort( function(x, y) { return x.start - y.start; } );
                that._total = that.reader.total(data);
                if (callback) {
                    callback();
                }
            };
        },

        prefetch: function(skip, take, callback) {
            var that = this,
                size = math.min(skip + take, that.total()),
                options = {
                    take: take,
                    skip: skip,
                    page: skip / take + 1,
                    pageSize: take,
                    sort: that._sort,
                    filter: that._filter,
                    group: that._group,
                    aggregate: that._aggregate
                };

            if (!that._rangeExists(skip, size)) {
                clearTimeout(that._timeout);

                that._timeout = setTimeout(function() {
                    that._queueRequest(options, function() {
                        that.transport.read({
                            data: options,
                            success: that._prefetchSuccessHandler(skip, size, callback)
                        });
                    });
                }, 100);
            } else if (callback) {
                callback();
            }
        },

        _rangeExists: function(start, end) {
            var that = this,
            ranges = that._ranges,
            idx,
            length;

            for (idx = 0, length = ranges.length; idx < length; idx++) {
                if (ranges[idx].start <= start && ranges[idx].end >= end) {
                    return true;
                }
            }
            return false;
        }
    });

    var Transport = {};

    Transport.create = function(options, data) {
        var transport,
            transportOptions = options.transport;

        if (transportOptions) {
            transportOptions.read = typeof transportOptions.read === STRING ? { url: transportOptions.read } : transportOptions.read;

            if (options.type) {
                if (kendo.data.transports[options.type] && !isPlainObject(kendo.data.transports[options.type])) {
                    transport = new kendo.data.transports[options.type](extend(transportOptions, { data: data }));
                } else {
                    transportOptions = extend(true, {}, kendo.data.transports[options.type], transportOptions);
                }

                options.schema = extend(true, {}, kendo.data.schemas[options.type], options.schema);
            }

            if (!transport) {
                transport = isFunction(transportOptions.read) ? transportOptions: new RemoteTransport(transportOptions);
            }
        } else {
            transport = new LocalTransport({ data: options.data });
        }
        return transport;
    };

    DataSource.create = function(options) {
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
        data = dataSource.data,
        fields = dataSource.fields,
        table = dataSource.table,
        select = dataSource.select,
        idx,
        length,
        model = {},
        field;

        if (!data && fields && !dataSource.transport) {
            if (table) {
                data = inferTable(table, fields);
            } else if (select) {
                data = inferSelect(select, fields);
            }
        }

        if (kendo.data.Model && fields && (!dataSource.schema || !dataSource.schema.model)) {
            for (idx = 0, length = fields.length; idx < length; idx++) {
                field = fields[idx];
                if (field.type) {
                    model[field.field] = field;
                }
            }

            if (!isEmptyObject(model)) {
                dataSource.schema = extend(true, dataSource.schema, { model:  { fields: model } });
            }
        }

        dataSource.data = data;

        return dataSource instanceof DataSource ? dataSource : new DataSource(dataSource);
    };

    function inferSelect(select, fields) {
        var options = $(select)[0].children,
            idx,
            length,
            data = [],
            record,
            firstField = fields[0],
            secondField = fields[1],
            value,
            option;

        for (idx = 0, length = options.length; idx < length; idx++) {
            record = {};
            option = options[idx];

            if (option.disabled) {
                continue;
            }

            record[firstField.field] = option.text;

            value = option.attributes.value;

            if (value && value.specified) {
                value = option.value;
            } else {
                value = option.text;
            }

            record[secondField.field] = value;

            data.push(record);
        }

        return data;
    }

    function inferTable(table, fields) {
        var tbody = $(table)[0].tBodies[0],
        rows = tbody ? tbody.rows : [],
        idx,
        length,
        fieldIndex,
        fieldCount = fields.length,
        data = [],
        cells,
        record,
        cell,
        empty;

        for (idx = 0, length = rows.length; idx < length; idx++) {
            record = {};
            empty = true;
            cells = rows[idx].cells;

            for (fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++) {
                cell = cells[fieldIndex];
                if(cell.nodeName.toLowerCase() !== "th") {
                    empty = false;
                    record[fields[fieldIndex].field] = cell.innerHTML;
                }
            }
            if(!empty) {
                data.push(record);
            }
        }

        return data;
    }

    var Node = Model.define({
        init: function(value) {
            var that = this,
                hasChildren = that.hasChildren || value && value.hasChildren,
                childrenField = "items",
                childrenOptions = {};

            kendo.data.Model.fn.init.call(that, value);


            if (typeof that.children === STRING) {
                childrenField = that.children;
            }

            childrenOptions = {
                schema: {
                    data: childrenField,
                    model: {
                        hasChildren: hasChildren,
                        id: that.idField
                    }
                }
            };

            if (typeof that.children !== STRING) {
                extend(childrenOptions, that.children);
            }

            childrenOptions.data = value;

            if (!hasChildren) {
                hasChildren = childrenOptions.schema.data;
            }

            if (typeof hasChildren === STRING) {
                hasChildren = kendo.getter(hasChildren);
            }

            if (isFunction(hasChildren)) {
                that.hasChildren = !!hasChildren.call(that, that);
            }

            that._childrenOptions = childrenOptions;

            if (that.hasChildren) {
                that._initChildren();
            }

            that._loaded = !!(value && value[childrenField]);
        },

        _initChildren: function() {
            var that = this;

            if (!(that.children instanceof HierarchicalDataSource)) {
                that.children = new HierarchicalDataSource(that._childrenOptions);
                that.children.parent = function(){
                    return that;
                };

                that.children.bind(CHANGE, function(e){
                    e.node = e.node || that;
                    that.trigger(CHANGE, e);
                });

                that._updateChildrenField();
            }
        },

        append: function(model) {
            this._initChildren();
            this.loaded(true);
            this.children.add(model);
        },

        hasChildren: false,

        level: function() {
            var parentNode = this.parentNode(),
                level = 0;

            while (parentNode && parentNode.parentNode) {
                level++;
                parentNode = parentNode.parentNode ? parentNode.parentNode() : null;
            }

            return level;
        },

        _updateChildrenField: function() {
            var fieldName = this._childrenOptions.schema.data;

            this[fieldName || "items"] = this.children.data();
        },

        load: function() {
            var that = this,
                options = {};

            if (that.hasChildren) {
                that._initChildren();

                options[that.idField || "id"] = that.id;

                if (!that._loaded) {
                    that.children._data = undefined;
                }

                that.children.one(CHANGE, function() {
                            that._loaded = true;

                            that._updateChildrenField();
                        })
                        ._query(options);
            }
        },

        parentNode: function() {
            var array = this.parent();

            return array.parent();
        },

        loaded: function(value) {
            if (value !== undefined) {
                this._loaded = value;
            } else {
                return this._loaded;
            }
        },

        shouldSerialize: function(field) {
            return Model.fn.shouldSerialize.call(this, field) &&
                    field !== "children" &&
                    field !== "_loaded" &&
                    field !== "hasChildren" &&
                    field !== "_childrenOptions";
        }
    });

    var HierarchicalDataSource = DataSource.extend({
        init: function(options) {
            var node = Node.define({
                children: options
            });

            DataSource.fn.init.call(this, extend(true, {}, { schema: { modelBase: node, model: node } }, options));
        },

        remove: function(node){
            var parentNode = node.parentNode(),
                dataSource = this,
                result;

            if (parentNode) {
                dataSource = parentNode.children;
            }

            result = DataSource.fn.remove.call(dataSource, node);

            if (parentNode && !dataSource.data().length) {
                parentNode.hasChildren = false;
            }

            return result;
        },

        insert: function(index, model) {
            var parentNode = this.parent();

            if (parentNode) {
                parentNode.hasChildren = true;
                parentNode._initChildren();
            }

            return DataSource.fn.insert.call(this, index, model);
        },

        _find: function(method, value) {
            var idx, length, node, data, children;

            node = DataSource.fn[method].call(this, value);

            if (node) {
                return node;
            }

            data = this._flatData(this.data());

            if (!data) {
                return;
            }

            for (idx = 0, length = data.length; idx < length; idx++) {
                children = data[idx].children;

                if (!(children instanceof HierarchicalDataSource)) {
                    continue;
                }

                node = children[method](value);

                if (node) {
                    return node;
                }
            }
        },

        get: function(id) {
            return this._find("get", id);
        },

        getByUid: function(uid) {
            return this._find("getByUid", uid);
        }
    });

    function inferList(list, fields) {
        var items = $(list).children(),
            idx,
            length,
            data = [],
            record,
            textField = fields[0].field,
            urlField = fields[1] && fields[1].field,
            spriteCssClassField = fields[2] && fields[2].field,
            imageUrlField = fields[3] && fields[3].field,
            item,
            id,
            textChild,
            className,
            children;

        for (idx = 0, length = items.length; idx < length; idx++) {
            record = {};
            item = items.eq(idx);

            textChild = item[0].firstChild;
            children = item.children();
            list = children.filter("ul");
            children = children.filter(":not(ul)");

            id = item.attr("data-id");

            if (id) {
                record.id = id;
            }

            if (textChild) {
                record[textField] = textChild.nodeType == 3 ? textChild.nodeValue : children.text();
            }

            if (urlField) {
                record[urlField] = children.find("a").attr("href");
            }

            if (imageUrlField) {
                record[imageUrlField] = children.find("img").attr("src");
            }

            if (spriteCssClassField) {
                className = children.find(".k-sprite").prop("className");
                record[spriteCssClassField] = className && $.trim(className.replace("k-sprite", ""));
            }

            if (list.length) {
                record.items = inferList(list.eq(0), fields);
            }

            if (item.attr("data-hasChildren") == "true") {
                record.hasChildren = true;
            }

            data.push(record);
        }

        return data;
    }

    HierarchicalDataSource.create = function(options) {
        options = options && options.push ? { data: options } : options;

        var dataSource = options || {},
            data = dataSource.data,
            fields = dataSource.fields,
            list = dataSource.list;

        if (data && data._dataSource) {
            return data._dataSource;
        }

        if (!data && fields && !dataSource.transport) {
            if (list) {
                data = inferList(list, fields);
            }
        }

        dataSource.data = data;

        return dataSource instanceof HierarchicalDataSource ? dataSource : new HierarchicalDataSource(dataSource);
    };

    extend(true, kendo.data, {
        readers: {
            json: DataReader
        },
        Query: Query,
        DataSource: DataSource,
        HierarchicalDataSource: HierarchicalDataSource,
        Node: Node,
        ObservableObject: ObservableObject,
        ObservableArray: ObservableArray,
        LocalTransport: LocalTransport,
        RemoteTransport: RemoteTransport,
        Cache: Cache,
        DataReader: DataReader,
        Model: Model
    });
})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "list",
    name: "List",
    category: "framework",
    depends: [ "data", "popup" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        keys = kendo.keys,
        support = kendo.support,
        htmlEncode = kendo.htmlEncode,
        activeElement = kendo._activeElement,
        ID = "id",
        LI = "li",
        CHANGE = "change",
        CHARACTER = "character",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        LOADING = "k-loading",
        OPEN = "open",
        CLOSE = "close",
        SELECT = "select",
        PROGRESS = "progress",
        REQUESTEND = "requestEnd",
        WIDTH = "width",
        extend = $.extend,
        proxy = $.proxy,
        browser = support.browser,
        isIE8 = browser.msie && browser.version < 9,
        quotRegExp = /"/g,
        alternativeNames = {
            "ComboBox": "DropDownList",
            "DropDownList": "ComboBox"
        };

    var List = Widget.extend({
        init: function(element, options) {
            var that = this,
                ns = that.ns,
                id;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            that._isSelect = element.is(SELECT);
            that._template();

            that.ul = $('<ul unselectable="on" class="k-list k-reset"/>')
                        .css({ overflow: support.kineticScrollNeeded ? "": "auto" })
                        .on("mouseenter" + ns, LI, function() { $(this).addClass(HOVER); })
                        .on("mouseleave" + ns, LI, function() { $(this).removeClass(HOVER); })
                        .on("click" + ns, LI, proxy(that._click, that))
                        .attr({
                            tabIndex: -1,
                            role: "listbox",
                            "aria-hidden": true
                        });

            that.list = $("<div class='k-list-container'/>")
                        .append(that.ul)
                        .on("mousedown" + ns, function(e) {
                            e.preventDefault();
                        });

            id = element.attr(ID);

            if (id) {
                that.list.attr(ID, id + "-list");
                that.ul.attr(ID, id + "_listbox");
                that._optionID = id + "_option_selected";
            }

            that._initValue();
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            if (options && options.enable !== undefined) {
                options.enabled = options.enable;
            }
        },

        focus: function() {
            this._focused.focus();
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        _filterSource: function(filter) {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                expression = dataSource.filter() || {};

            removeFiltersForField(expression, options.dataTextField);

            if (filter) {
                expression = expression.filters || [];
                expression.push(filter);
            }

            dataSource.filter(expression);
        },


        _initValue: function() {
            var that = this,
                value = that.options.value;

            if (value) {
                that.element.val(value);
            } else {
                value = that.element.val();
            }

            that._old = value;
        },

        _ignoreCase: function() {
            var that = this,
                model = that.dataSource.reader.model,
                field;

            if (model && model.fields) {
                field = model.fields[that.options.dataTextField];

                if (field && field.type && field.type !== "string") {
                    that.options.ignoreCase = false;
                }
            }
        },

        items: function() {
            return this.ul[0].children;
        },

        current: function(candidate) {
            var that = this,
                id = that._optionID;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current
                        .removeClass(FOCUSED)
                        .removeAttr("aria-selected")
                        .removeAttr(ID);

                    that._focused
                        .removeAttr("aria-activedescendant");
                }

                if (candidate) {
                    candidate.addClass(FOCUSED);
                    that._scroll(candidate);

                    if (id) {
                        candidate.attr("id", id);
                        that._focused.attr("aria-activedescendant", id);
                    }
                }

                that._current = candidate;
            } else {
                return that._current;
            }
        },

        destroy: function() {
            var that = this,
                ns = that.ns;

            Widget.fn.destroy.call(that);

            that._unbindDataSource();

            that.ul.off(ns);
            that.list.off(ns);

            that.popup.destroy();

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        dataItem: function(index) {
            var that = this;

            if (index === undefined) {
                index = that.selectedIndex;
            }

            return that._data()[index];
        },

        _accessors: function() {
            var that = this,
                element = that.element,
                options = that.options,
                getter = kendo.getter,
                textField = element.attr(kendo.attr("text-field")),
                valueField = element.attr(kendo.attr("value-field"));

            if (textField) {
                options.dataTextField = textField;
            }

            if (valueField) {
                options.dataValueField = valueField;
            }

            that._text = getter(options.dataTextField);
            that._value = getter(options.dataValueField);
        },

        _aria: function(id) {
            var that = this,
                options = that.options,
                element = that._focused;

            if (options.suggest !== undefined) {
                element.attr("aria-autocomplete", options.suggest ? "both" : "list");
            }

            id = id ? id + " " + that.ul[0].id : that.ul[0].id;

            element.attr("aria-owns", id);

            that.ul.attr("aria-live", !options.filter || options.filter === "none" ? "off" : "polite");
        },

        _blur: function() {
            var that = this;

            that._change();
            that.close();
        },

        _change: function() {
            var that = this,
                index = that.selectedIndex,
                optionValue = that.options.value,
                value = that.value(),
                trigger;

            if (that._isSelect && !that._bound && optionValue) {
                value = optionValue;
            }

            if (value !== that._old) {
                trigger = true;
            } else if (index !== undefined && index !== that._oldIndex) {
                trigger = true;
            }

            if (trigger) {
                that._old = value;
                that._oldIndex = index;

                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _click: function(e) {
            if (!e.isDefaultPrevented()) {
                this._accept($(e.currentTarget));
            }
        },

        _data: function() {
            return this.dataSource.view();
        },

        _enable: function() {
            var that = this,
                options = that.options,
                disabled = that.element.is("[disabled]");

            if (options.enable !== undefined) {
                options.enabled = options.enable;
            }

            if (!options.enabled || disabled) {
                that.enable(false);
            } else {
                that.readonly(that.element.is("[readonly]"));
            }
        },

        _focus: function(li) {
            var that = this;

            if (that.popup.visible() && li && that.trigger(SELECT, {item: li})) {
                that.close();
                return;
            }

            that._select(li);
            that._triggerCascade();

            that._blur();
        },

        _index: function(value) {
            var that = this,
                idx,
                length,
                data = that._data();

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (that._dataValue(data[idx]) == value) {
                    return idx;
                }
            }

            return -1;
        },

        _dataValue: function(dataItem) {
            var value = this._value(dataItem);

            if (value === undefined) {
                value = this._text(dataItem);
            }

            return value;
        },

        _height: function(length) {
            if (length) {
                var that = this,
                    list = that.list,
                    visible = that.popup.visible(),
                    height = that.options.height;

                list = list.add(list.parent(".k-animation-container")).show()
                           .height(that.ul[0].scrollHeight > height ? height : "auto");

                if (!visible) {
                    list.hide();
                }
            }
        },

        _adjustListWidth: function() {
            var list = this.list,
                width = list[0].style.width,
                wrapper = this.wrapper,
                computedStyle, computedWidth;

            if (!list.data(WIDTH) && width) {
                return;
            }

            computedStyle = window.getComputedStyle ? window.getComputedStyle(wrapper[0], null) : 0;
            computedWidth = computedStyle ? parseFloat(computedStyle.width) : wrapper.outerWidth();

            if (computedStyle && (browser.mozilla || browser.msie)) { // getComputedStyle returns different box in FF and IE.
                computedWidth += parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight) + parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth);
            }

            width = computedWidth - (list.outerWidth() - list.width());

            list.css({
                fontFamily: wrapper.css("font-family"),
                width: width
            })
            .data(WIDTH, width);

            return true;
        },

        _popup: function() {
            var that = this,
                list = that.list,
                focused = that._focused,
                options = that.options,
                wrapper = that.wrapper;

            that.popup = new ui.Popup(list, extend({}, options.popup, {
                anchor: wrapper,
                open: function(e) {
                    that._adjustListWidth();

                    if (that.trigger(OPEN)) {
                        e.preventDefault();
                    } else {
                        focused.attr("aria-expanded", true);
                        that.ul.attr("aria-hidden", false);
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE)) {
                        e.preventDefault();
                    } else {
                        focused.attr("aria-expanded", false);
                        that.ul.attr("aria-hidden", true);
                    }
                },
                animation: options.animation,
                isRtl: support.isRtl(wrapper)
            }));

            that.popup.one(OPEN, function() {
                that._height(that._data().length);
            });

            that._touchScroller = kendo.touchScroller(that.popup.element);
        },

        _makeUnselectable: function() {
            if (isIE8) {
                this.list.find("*").attr("unselectable", "on");
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggle: function(open) {
            var that = this;
            open = open !== undefined? open : !that.popup.visible();

            if (!support.touch && that._focused[0] !== activeElement()) {
                that._focused.focus();
            }

            that[open ? OPEN : CLOSE]();
        },

        _scroll: function (item) {

            if (!item) {
                return;
            }

            if (item[0]) {
                item = item[0];
            }

            var ul = this.ul[0],
                itemOffsetTop = item.offsetTop,
                itemOffsetHeight = item.offsetHeight,
                ulScrollTop = ul.scrollTop,
                ulOffsetHeight = ul.clientHeight,
                bottomDistance = itemOffsetTop + itemOffsetHeight;

            ul.scrollTop = ulScrollTop > itemOffsetTop ?
                           itemOffsetTop : bottomDistance > (ulScrollTop + ulOffsetHeight) ?
                           bottomDistance - ulOffsetHeight : ulScrollTop;
        },

        _template: function() {
            var that = this,
                options = that.options,
                template = options.template,
                hasDataSource = options.dataSource;

            if (that._isSelect && that.element[0].length) {
                if (!hasDataSource) {
                    options.dataTextField = options.dataTextField || "text";
                    options.dataValueField = options.dataValueField || "value";
                }
            }

            if (!template) {
                that.template = kendo.template('<li tabindex="-1" role="option" unselectable="on" class="k-item">${' + kendo.expr(options.dataTextField, "data") + "}</li>", { useWithBlock: false });
            } else {
                template = kendo.template(template);
                that.template = function(data) {
                    return '<li tabindex="-1" role="option" unselectable="on" class="k-item">' + template(data) + "</li>";
                };
            }
        },

       _triggerCascade: function() {
            var that = this,
                value = that.value();
            if ((!that._bound && value) || that._old !== value) {
                that.trigger("cascade");
            }
        },

       _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler)
                           .unbind(PROGRESS, that._progressHandler)
                           .unbind(REQUESTEND, that._requestEndHandler);
        }
    });

    extend(List, {
        caret: function(element) {
            var caret,
                selection = element.ownerDocument.selection;

            if (selection) {
                caret = Math.abs(selection.createRange().moveStart(CHARACTER, -element.value.length));
            } else {
                caret = element.selectionStart;
            }

            return caret;
        },

        selectText: function (element, selectionStart, selectionEnd) {
            try {
                if (element.createTextRange) {
                        element.focus();
                        var textRange = element.createTextRange();
                        textRange.collapse(true);
                        textRange.moveStart(CHARACTER, selectionStart);
                        textRange.moveEnd(CHARACTER, selectionEnd - selectionStart);
                        textRange.select();
                } else {
                    element.setSelectionRange(selectionStart, selectionEnd);
                }
            } catch(e) { /* element is not focused or it is not in the DOM */ }
        },
        inArray: function(node, parentNode) {
            var idx, length, siblings = parentNode.children;

            if (!node || node.parentNode !== parentNode) {
                return -1;
            }

            for (idx = 0, length = siblings.length; idx < length; idx++) {
                if (node === siblings[idx]) {
                    return idx;
                }
            }

            return -1;
        }
    });

    kendo.ui.List = List;

    ui.Select = List.extend({
        init: function(element, options) {
            List.fn.init.call(this, element, options);
            this._initial = this.element.val();
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        close: function() {
            this.popup.close();
        },

        select: function(li) {
            var that = this;

            if (li === undefined) {
                return that.selectedIndex;
            } else {
                that._select(li);
                that._triggerCascade();
                that._old = that._accessor();
                that._oldIndex = that.selectedIndex;
            }
        },

        _accessor: function(value, idx) {
            var element = this.element,
                isSelect = this._isSelect,
                option, selectedIndex;

            element = element[0];

            if (value === undefined) {
                if (isSelect) {
                    selectedIndex = element.selectedIndex;

                    if (selectedIndex > -1) {
                        option = element.options[selectedIndex];

                        if (option) {
                            value = option.value;
                        }
                    }
                } else {
                    value = element.value;
                }
                return value;
            } else {
                if (isSelect) {
                    element.selectedIndex = idx;
                } else {
                    element.value = value;
                }
            }
        },

        _hideBusy: function () {
            var that = this;
            clearTimeout(that._busy);
            that._arrow.removeClass(LOADING);
            that._focused.attr("aria-busy", false);
            that._busy = null;
        },

        _showBusy: function () {
            var that = this;

            that._request = true;

            if (that._busy) {
                return;
            }

            that._busy = setTimeout(function () {
                that._focused.attr("aria-busy", true);
                that._arrow.addClass(LOADING);
            }, 100);
        },

        _requestEnd: function() {
            this._request = false;
        },

        _dataSource: function() {
            var that = this,
                element = that.element,
                options = that.options,
                dataSource = options.dataSource || {},
                idx;

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            if (that._isSelect) {
                idx = element[0].selectedIndex;
                if (idx > -1) {
                    options.index = idx;
                }

                dataSource.select = element;
                dataSource.fields = [{ field: options.dataTextField },
                                     { field: options.dataValueField }];
            }

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._showBusy, that);
                that._requestEndHandler = proxy(that._requestEnd, that);
            }

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                   .bind(CHANGE, that._refreshHandler)
                                   .bind(PROGRESS, that._progressHandler)
                                   .bind(REQUESTEND, that._requestEndHandler);
        },

        _get: function(li) {
            var that = this,
                data = that._data(),
                idx, length;

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                if (li < 0) {
                    return $();
                }

                li = $(that.ul[0].children[li]);
            }

            if (li && li.nodeType) {
                li = $(li);
            }

            return li;
        },

        _move: function(e) {
            var that = this,
                key = e.keyCode,
                ul = that.ul[0],
                methodName = that.popup.visible() ? "_select" : "_accept",
                current = that._current,
                down = key === keys.DOWN,
                pressed;

            if (key === keys.UP || down) {
                if (e.altKey) {
                    that.toggle(down);
                } else if (down) {
                    if (!current || (that.selectedIndex === -1 && !that.value() && current[0] === ul.firstChild)) {
                        current = ul.firstChild;
                    } else {
                        current = current[0].nextSibling;
                    }

                    that[methodName](current);
                } else {
                    that[methodName](current ? current[0].previousSibling : ul.lastChild);
                }
                e.preventDefault();
                pressed = true;
            } else if (key === keys.ENTER || key === keys.TAB) {

                if (that.popup.visible()) {
                    e.preventDefault();
                }

                that._accept(current);
                pressed = true;
            } else if (key === keys.ESC) {
                if (that.popup.visible()) {
                    e.preventDefault();
                }
                that.close();
                pressed = true;
            }

            return pressed;
        },

        _selectItem: function(value) {
            var that = this,
                options = that.options;

            value = that._selectedValue || options.value || that._accessor();

            if (value) {
                that.value(value);
            } else if (!that._bound) {
                that.select(options.index);
            }
        },

        _fetchItems: function(value) {
            var that = this,
                hasItems = that.ul[0].firstChild;

            //if request is started avoid datasource.fetch
            if (that._request) {
                return true;
            }

            if (!that._fetch && !hasItems) {
                if (that.options.cascadeFrom) {
                    return !hasItems;
                }

                that.dataSource.one(CHANGE, function() {
                    that.value(value);
                    that._fetch = false;
                });

                that._fetch = true;
                that.dataSource.fetch();

                return true;
            }
        },

        _options: function(data, optionLabel) {
            var that = this,
                element = that.element,
                selectedIndex = element[0].selectedIndex,
                length = data.length,
                options = "",
                option,
                dataItem,
                dataText,
                dataValue,
                idx = 0;

            if (optionLabel) {
                options = optionLabel;
                selectedIndex += 1;
                idx = 1;
            }

            for (; idx < length; idx++) {
                option = "<option";
                dataItem = data[idx];
                dataText = that._text(dataItem);
                dataValue = that._value(dataItem);

                if (dataValue !== undefined) {
                    dataValue += "";

                    if (dataValue.indexOf('"') !== -1) {
                        dataValue = dataValue.replace(quotRegExp, "&quot;");
                    }

                    option += ' value="' + dataValue + '"';
                }

                option += ">";

                if (dataText !== undefined) {
                    option += htmlEncode(dataText);
                }

                option += "</option>";
                options += option;
            }

            element.html(options);
            element[0].selectedIndex = selectedIndex;
        },

        _reset: function() {
            var that = this,
                element = that.element,
                form = element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(that._initial);
                    });
                };

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _cascade: function() {
            var that = this,
                options = that.options,
                cascade = options.cascadeFrom,
                parent, parentElement,
                select, valueField,
                change;

            if (cascade) {
                that._selectedValue = options.value || that._accessor();

                parentElement = $("#" + cascade);
                parent = parentElement.data("kendo" + options.name);

                if (!parent) {
                    parent = parentElement.data("kendo" + alternativeNames[options.name]);
                }

                if (!parent) {
                    return;
                }

                valueField = parent.options.dataValueField;
                change = function() {
                    var value = that._selectedValue || that.value();
                    if (value) {
                        that.value(value);
                        if (!that.dataSource.view()[0] || that.selectedIndex === -1) {
                            that._clearSelection(parent, true);
                        }
                    } else {
                        that.select(options.index);
                    }

                    that.enable();
                };
                select = function() {
                    var dataItem = parent.dataItem(),
                        filterValue = dataItem ? parent._value(dataItem) : null,
                        expressions, filters;

                    if (filterValue) {
                        expressions = that.dataSource.filter() || {};
                        removeFiltersForField(expressions, valueField);
                        filters = expressions.filters || [];

                        filters.push({
                            field: valueField,
                            operator: "eq",
                            value: filterValue
                        });

                        that.dataSource
                            .one(CHANGE, change)
                            .filter(filters);

                    } else {
                        that.enable(false);
                        that._clearSelection(parent);
                    }

                    that._triggerCascade();
                };

                parent.bind("cascade", function() { select(); });

                //refresh was called
                if (parent._bound) {
                    select();
                } else if (!parent.value()) {
                    that.enable(false);
                }
            }
        }
    });

    function removeFiltersForField(expression, field) {
        if (expression.filters) {
            expression.filters = $.grep(expression.filters, function(filter) {
                removeFiltersForField(filter, field);
                if (filter.filters) {
                    return filter.filters.length;
                } else {
                    return filter.field != field;
                }
            });
        }
    }
})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "dropdownlist",
    name: "DropDownList",
    category: "web",
    description: "The DropDownList widget displays a list of values and allows the selection of a single value from the list.",
    depends: [ "list" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Select = ui.Select,
        os = kendo.support.mobileOS,
        ns = ".kendoDropDownList",
        DISABLED = "disabled",
        READONLY = "readonly",
        CHANGE = "change",
        SELECT = "select",
        FOCUSED = "k-state-focused",
        DEFAULT = "k-state-default",
        STATEDISABLED = "k-state-disabled",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        SELECTED = "k-state-selected",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        TABINDEX = "tabindex",
        proxy = $.proxy;

    var DropDownList = Select.extend( {
        init: function(element, options) {
            var that = this,
                index = options && options.index,
                optionLabel, useOptionLabel, text;

            that.ns = ns;
            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            that._focusHandler = function() {
                that.wrapper.focus();
            };

            options = that.options;
            element = that.element.on("focus" + ns, that._focusHandler);

            that._reset();

            that._word = "";

            that._wrapper();

            that._tabindex();
            that.wrapper.data(TABINDEX, that.wrapper.attr(TABINDEX));

            that._aria();

            that._span();

            that._popup();

            that._mobile();

            that._accessors();

            that._dataSource();
            that._ignoreCase();

            that._enable();

            that._cascade();

            that._oldIndex = that.selectedIndex = -1;
            if (index !== undefined) {
                options.index = index;
            }

            if (options.autoBind) {
                that.dataSource.fetch();
            } else {
                text = options.text || "";
                if (!text) {
                    optionLabel = that._optionLabelText(options.optionLabel),
                    useOptionLabel = optionLabel && options.index === 0;

                    if (element.is(SELECT)) {
                        if (useOptionLabel) {
                            text = optionLabel;
                        } else {
                            text = element.children(":selected").text();
                        }
                    } else if (!element[0].value && useOptionLabel) {
                        text = optionLabel;
                    }
                }

                that.text(text);
            }

            kendo.notify(that);
        },

        options: {
            name: "DropDownList",
            enabled: true,
            autoBind: true,
            index: 0,
            text: null,
            value: null,
            template: "",
            delay: 500,
            height: 200,
            dataTextField: "",
            dataValueField: "",
            optionLabel: "",
            cascadeFrom: "",
            ignoreCase: true,
            animation: {}
        },
        events: [
            "open",
            "close",
            CHANGE,
            "select",
            "dataBinding",
            "dataBound",
            "cascade"
        ],

        setOptions: function(options) {
            Select.fn.setOptions.call(this, options);

            this._template();
            this._accessors();
            this._aria();
        },

        destroy: function() {
            var that = this;

            that.wrapper.off(ns);
            that.element.off(ns);
            that._inputWrapper.off(ns);

            Select.fn.destroy.call(that);
        },

        open: function() {
            var that = this;

            if (!that.ul[0].firstChild) {
                that._open = true;

                if (!that._request) {
                    that.dataSource.fetch();
                }
            } else {
                that.popup.open();
                that._scroll(that._current);
            }
        },

        toggle: function(toggle) {
            this._toggle(toggle);
        },

        refresh: function() {
            var that = this,
                data = that._data(),
                length = data.length,
                optionLabel = that.options.optionLabel;

            that.trigger("dataBinding");
            if (that._current) {
                that.current(null);
            }

            that.ul[0].innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.popup.visible()) {
                that.popup._position();
            }

            if (that.element.is(SELECT)) {
                if (optionLabel && length) {
                    optionLabel = that._optionLabelText(optionLabel);
                    optionLabel = '<option value="">' + optionLabel + "</option>";
                }

                that._options(data, optionLabel);
            }

            if (that._open) {
                that._open = false;
                that.toggle(!!length);
            }

            that._hideBusy();
            that._makeUnselectable();

            if (!that._fetch && length /*do set value when no data*/) {
                that._selectItem();
            }

            that._bound = true;
            that.trigger("dataBound");
        },



        search: function(word) {
            if (word) {
                var that = this,
                    ignoreCase = that.options.ignoreCase;

                if (ignoreCase) {
                    word = word.toLowerCase();
                }

                that._select(function(dataItem) {
                    var text = that._text(dataItem);

                    if (text !== undefined) {
                        text = (text + "");
                        if (ignoreCase) {
                            text = text.toLowerCase();
                        }

                        return text.indexOf(word) === 0;
                    }
                });
            }
        },

        text: function (text) {
            var span = this.span;

            if (text !== undefined) {
                span.text(text);
            } else {
                return span.text();
            }
        },

        value: function(value) {
            var that = this,
                idx, hasValue;

            if (value !== undefined) {
                if (value !== null) {
                    value = value.toString();
                }

                that._selectedValue = value;

                hasValue = value || (that.options.optionLabel && !that.element[0].disabled && value === "");
                if (hasValue && that._fetchItems(value)) {
                    return;
                }

                idx = that._index(value);
                that.select(idx > -1 ? idx : 0);
            } else {
                return that._accessor();
            }
        },

        _editable: function(options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                wrapper = that.wrapper.off(ns),
                dropDownWrapper = that._inputWrapper.off(HOVEREVENTS);

            if (!readonly && !disable) {
                element.removeAttr(DISABLED).removeAttr(READONLY);

                dropDownWrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                wrapper
                    .attr(TABINDEX, wrapper.data(TABINDEX))
                    .attr(ARIA_DISABLED, false)
                    .attr(ARIA_READONLY, false)
                    .on("click" + ns, function(e) {
                            that._blured = false;
                            e.preventDefault();
                            that.toggle();
                    })
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("focusin" + ns, function() {
                        dropDownWrapper.addClass(FOCUSED);
                        that._blured = false;
                    })
                    .on("focusout" + ns, function() {
                        if (!that._blured) {
                            that._triggerCascade();
                            that._blur();
                            dropDownWrapper.removeClass(FOCUSED);

                            that._blured = true;
                            element.blur();
                        }
                    });

            } else {
                if (disable) {
                    wrapper.removeAttr(TABINDEX);
                    dropDownWrapper
                        .addClass(STATEDISABLED)
                        .removeClass(DEFAULT);
                } else {
                    dropDownWrapper
                        .addClass(DEFAULT)
                        .removeClass(STATEDISABLED);
                }

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly);

                wrapper.attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },

        _accept: function(li) {
            this._focus(li);
        },

        _optionLabelText: function() {
            var options = this.options,
                dataTextField = options.dataTextField,
                optionLabel = options.optionLabel;

            if (optionLabel && dataTextField && typeof optionLabel === "object") {
                return this._text(optionLabel);
            }

            return optionLabel;
        },

        _data: function() {
            var that = this,
                options = that.options,
                optionLabel = options.optionLabel,
                textField = options.dataTextField,
                valueField = options.dataValueField,
                data = that.dataSource.view(),
                length = data.length,
                first = optionLabel,
                idx = 0;

            if (optionLabel && length) {
                if (typeof optionLabel === "object") {
                    first = optionLabel;
                } else if (textField) {
                    first = {};

                    textField = textField.split(".");
                    valueField = valueField.split(".");

                    assign(first, valueField, "");
                    assign(first, textField, optionLabel);
                }

                first = new kendo.data.ObservableArray([first]);

                for (; idx < length; idx++) {
                    first.push(data[idx]);
                }
                data = first;
            }

            return data;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys,
                ul = that.ul[0];

            if (key === keys.LEFT) {
                key = keys.UP;
            } else if (key === keys.RIGHT) {
                key = keys.DOWN;
            }

            e.keyCode = key;
            that._move(e);

            if (key === keys.HOME) {
                e.preventDefault();
                that._select(ul.firstChild);
            } else if (key === keys.END) {
                e.preventDefault();
                that._select(ul.lastChild);
            }
        },

        _selectNext: function(character, index) {
            var that = this,
                ignoreCase = that.options.ignoreCase,
                data = that._data(),
                length = data.length,
                text;

            for (; index < length; index++) {
                text = that._text(data[index]);
                if (text) {
                    text = text + "";
                    if (ignoreCase) {
                        text = text.toLowerCase();
                    }

                    if (text.indexOf(character) === 0) {
                        that._select(index);
                        that._triggerEvents();
                        return true;
                    }
                }
            }

            return false;
        },

        _keypress: function(e) {
            var that = this;

            setTimeout(function() {
                var character = String.fromCharCode(e.keyCode || e.charCode),
                    index = that.selectedIndex;

                if (that.options.ignoreCase) {
                    character = character.toLowerCase();
                }

                if (character === that._last && index > -1) {
                    that._word = character;
                    if (that._selectNext(character, index + 1)) {
                        return;
                    }
                } else {
                    that._word += character;
                }

                that._last = character;
                that._search();
            });
        },

        _popup: function() {
            Select.fn._popup.call(this);
            this.popup.one("open", function() {
                this.wrapper = kendo.wrap(this.element)
                                    .addClass("km-popup");
            });
        },

        _search: function() {
            var that = this,
                dataSource = that.dataSource,
                word = that._word;

            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                that._word = "";
            }, that.options.delay);

            if (!that.ul[0].firstChild) {
                dataSource.one(CHANGE, function () {
                    if (dataSource.data()[0]) {
                        that.search(word);
                    }
                }).fetch();
                return;
            }

            that.search(word);
            that._triggerEvents();
        },

        _select: function(li) {
            var that = this,
                current = that._current,
                data = that._data(),
                value,
                text,
                idx;

            li = that._get(li);

            if (li && li[0] && !li.hasClass(SELECTED)) {
                if (current) {
                    current.removeClass(SELECTED);
                }

                idx = ui.List.inArray(li[0], that.ul[0]);
                if (idx > -1) {
                    data = data[idx];
                    text = that._text(data);
                    value = that._value(data);
                    that.selectedIndex = idx;

                    that.text(text);
                    that._accessor(value !== undefined ? value : text, idx);
                    that._selectedValue = that._accessor();

                    that.current(li.addClass(SELECTED));

                    if (that._optionID) {
                        that._current.attr("aria-selected", true);
                    }
                }
            }
        },

        _triggerEvents: function() {
            if (!this.popup.visible()) {
                this._triggerCascade();
                this._change();
            }
        },

        _mobile: function() {
            var that = this,
                popup = that.popup,
                root = popup.element.parents(".km-root").eq(0);

            if (root.length && os) {
                popup.options.animation.open.effects = (os.android || os.meego) ? "fadeIn" : (os.ios || os.wp) ? "slideIn:up" : popup.options.animation.open.effects;
            }
        },

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = "span.k-input",
                span;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                wrapper.append('<span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">&nbsp;</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span>')
                       .append(that.element);

                span = wrapper.find(SELECTOR);
            }

            that.span = span;
            that._inputWrapper = $(wrapper[0].firstChild);
            that._arrow = wrapper.find(".k-icon").mousedown(function(e) { e.preventDefault(); });
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-widget")) {
                wrapper = element.wrap("<span />").parent();
                wrapper[0].style.cssText = DOMelement.style.cssText;
            }

            element.hide();

            that._focused = that.wrapper = wrapper
                              .addClass("k-widget k-dropdown k-header")
                              .addClass(DOMelement.className)
                              .css("display", "")
                              .attr({
                                  unselectable: "on",
                                  role: "listbox",
                                  "aria-haspopup": true,
                                  "aria-expanded": false
                              });
        },

        _clearSelection: function() {
            var that = this,
                optionLabel = that.options.optionLabel;

            if (that.dataSource.view()[0] && optionLabel) {
                that.select(0);
                return;
            }

            that.text(optionLabel);
            that.element.val("");
            that.selectedIndex = -1;
        }
    });

    function assign(instance, fields, value) {
        var idx = 0,
            lastIndex = fields.length - 1,
            field;

        for (; idx < lastIndex; ++idx) {
            field = fields[idx];

            if (!(field in instance)) {
                instance[field] = {};
            }

            instance = instance[field];
        }

        instance[fields[lastIndex]] = value;
    }

    ui.plugin(DropDownList);
})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "fx",
    name: "Effects",
    category: "framework",
    description: "Required for animation effects in all Kendo UI widgets.",
    depends: [ "core" ]
});

(function($, undefined) {
    /**
     * @name kendo.fx
     * @namespace This object contains the fx library that is used by all widgets using animation.
     * If this file is not included, all animations will be disabled but the basic functionality preserved.
     */
    var kendo = window.kendo,
        fx = kendo.fx,
        each = $.each,
        extend = $.extend,
        proxy = $.proxy,
        support = kendo.support,
        browser = support.browser,
        transforms = support.transforms,
        transitions = support.transitions,
        scaleProperties = { scale: 0, scalex: 0, scaley: 0, scale3d: 0 },
        translateProperties = { translate: 0, translatex: 0, translatey: 0, translate3d: 0 },
        hasZoom = (typeof document.documentElement.style.zoom !== "undefined") && !transforms,
        matrix3dRegExp = /matrix3?d?\s*\(.*,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?,\s*([\d\.\-]+)\w*?/i,
        cssParamsRegExp = /^(-?[\d\.\-]+)?[\w\s]*,?\s*(-?[\d\.\-]+)?[\w\s]*/i,
        translateXRegExp = /translatex?$/i,
        oldEffectsRegExp = /(zoom|fade|expand)(\w+)/,
        singleEffectRegExp = /(zoom|fade|expand)/,
        unitRegExp = /[xy]$/i,
        transformProps = ["perspective", "rotate", "rotatex", "rotatey", "rotatez", "rotate3d", "scale", "scalex", "scaley", "scalez", "scale3d", "skew", "skewx", "skewy", "translate", "translatex", "translatey", "translatez", "translate3d", "matrix", "matrix3d"],
        transform2d = ["rotate", "scale", "scalex", "scaley", "skew", "skewx", "skewy", "translate", "translatex", "translatey", "matrix"],
        transform2units = { "rotate": "deg", scale: "", skew: "px", translate: "px" },
        cssPrefix = transforms.css,
        Effects = {},
        round = Math.round,
        BLANK = "",
        PX = "px",
        NONE = "none",
        AUTO = "auto",
        WIDTH = "width",
        HEIGHT = "height",
        HIDDEN = "hidden",
        ORIGIN = "origin",
        ABORT_ID = "abortId",
        OVERFLOW = "overflow",
        TRANSLATE = "translate",
        COMPLETE_CALLBACK = "completeCallback",
        TRANSITION = cssPrefix + "transition",
        TRANSFORM = cssPrefix + "transform",
        BACKFACE = cssPrefix + "backface-visibility",
        PERSPECTIVE = cssPrefix + "perspective",
        DEFAULT_PERSPECTIVE = "800px",
        TRANSFORM_PERSPECTIVE = "perspective(" + DEFAULT_PERSPECTIVE + ")",
        directions = {
            left: {
                reverse: "right",
                property: "left",
                transition: "translatex",
                vertical: false,
                modifier: -1
            },
            right: {
                reverse: "left",
                property: "left",
                transition: "translatex",
                vertical: false,
                modifier: 1
            },
            down: {
                reverse: "up",
                property: "top",
                transition: "translatey",
                vertical: true,
                modifier: 1
            },
            up: {
                reverse: "down",
                property: "top",
                transition: "translatey",
                vertical: true,
                modifier: -1
            },
            top: {
                reverse: "bottom"
            },
            bottom: {
                reverse: "top"
            },
            "in": {
                reverse: "out",
                modifier: -1
            },
            out: {
                reverse: "in",
                modifier: 1
            },

            vertical: {
                reverse: "vertical"
            },

            horizontal: {
                reverse: "horizontal"
            }
        };

        kendo.directions = directions;

    extend($.fn, {
        kendoStop: function(clearQueue, gotoEnd) {
            if (transitions) {
                return kendo.fx.stopQueue(this, clearQueue || false, gotoEnd || false);
            } else {
                return this.stop(clearQueue, gotoEnd);
            }
        }
    });

    /* jQuery support for all transform animations (FF 3.5/3.6, Opera 10.x, IE9 */

    if (transforms && !transitions) {
        each(transform2d, function(idx, value) {
            $.fn[value] = function(val) {
                if (typeof val == "undefined") {
                    return animationProperty(this, value);
                } else {
                    var that = $(this)[0],
                        transformValue = value + "(" + val + transform2units[value.replace(unitRegExp, "")] + ")";

                    if (that.style.cssText.indexOf(TRANSFORM) == -1) {
                        $(this).css(TRANSFORM, transformValue);
                    } else {
                        that.style.cssText = that.style.cssText.replace(new RegExp(value + "\\(.*?\\)", "i"), transformValue);
                    }
                }
                return this;
            };

            $.fx.step[value] = function (fx) {
                $(fx.elem)[value](fx.now);
            };
        });

        var curProxy = $.fx.prototype.cur;
        $.fx.prototype.cur = function () {
            if (transform2d.indexOf(this.prop) != -1) {
                return parseFloat($(this.elem)[this.prop]());
            }

            return curProxy.apply(this, arguments);
        };
    }

    kendo.toggleClass = function(element, classes, options, add) {
        if (classes) {
            classes = classes.split(" ");

            if (transitions) {
                options = extend({
                    exclusive: "all",
                    duration: 400,
                    ease: "ease-out"
                }, options);

                element.css(TRANSITION, options.exclusive + " " + options.duration + "ms " + options.ease);
                setTimeout(function() {
                    element.css(TRANSITION, "").css(HEIGHT);
                }, options.duration); // TODO: this should fire a kendoAnimate session instead.
            }

            each(classes, function(idx, value) {
                element.toggleClass(value, add);
            });
        }

        return element;
    };

    kendo.parseEffects = function(input, mirror) {
        var effects = {};

        if (typeof input === "string") {
            each(input.split(" "), function(idx, value) {
                var redirectedEffect = !singleEffectRegExp.test(value),
                    resolved = value.replace(oldEffectsRegExp, function(match, $1, $2) {
                        return $1 + ":" + $2.toLowerCase();
                    }), // Support for old zoomIn/fadeOut style, now deprecated.
                    effect = resolved.split(":"),
                    direction = effect[1],
                    effectBody = {};

                if (effect.length > 1) {
                    effectBody.direction = (mirror && redirectedEffect ? directions[direction].reverse : direction);
                }

                effects[effect[0]] = effectBody;
            });
        } else {
            each(input, function(idx) {
                var direction = this.direction;

                if (direction && mirror && !singleEffectRegExp.test(idx)) {
                    this.direction = directions[direction].reverse;
                }

                effects[idx] = this;
            });
        }

        return effects;
    };

    function parseInteger(value) {
        return parseInt(value, 10);
    }

    function parseCSS(element, property) {
        return parseInteger(element.css(property));
    }


    function parseTransitionEffects(options) {
        var effects = options.effects;

        if (effects === "zoom") {
            effects = "zoom:in fade:in";
        }
        if (effects === "fade") {
            effects = "fade:in";
        }
        if (effects === "slide") {
            effects = "tile:left";
        }
        if (/^slide:(.+)$/.test(effects)) {
            effects = "tile:" + RegExp.$1;
        }
        if (effects === "overlay") {
            effects = "slideIn:left";
        }
        if (/^overlay:(.+)$/.test(effects)) {
            effects = "slideIn:" + RegExp.$1;
        }

        options.effects = kendo.parseEffects(effects);

        return options;
    }

    function keys(obj) {
        var acc = [];
        for (var propertyName in obj) {
            acc.push(propertyName);
        }
        return acc;
    }

    function strip3DTransforms(properties) {
        for (var key in properties) {
            if (transformProps.indexOf(key) != -1 && transform2d.indexOf(key) == -1) {
                delete properties[key];
            }
        }

        return properties;
    }

    function normalizeCSS(element, properties) {
        var transformation = [], cssValues = {}, lowerKey, key, value, isTransformed;

        for (key in properties) {
            lowerKey = key.toLowerCase();
            isTransformed = transforms && transformProps.indexOf(lowerKey) != -1;

            if (!support.hasHW3D && isTransformed && transform2d.indexOf(lowerKey) == -1) {
                delete properties[key];
            } else {
                value = properties[key];

                if (isTransformed) {
                    transformation.push(key + "(" + value + ")");
                } else {
                    cssValues[key] = value;
                }
            }
        }

        if (transformation.length) {
            cssValues[TRANSFORM] = transformation.join(" ");
        }

        return cssValues;
    }

    if (transitions) {
        extend(kendo.fx, {
            transition: function(element, properties, options) {
                var css,
                    delay = 0,
                    oldKeys = element.data("keys") || [],
                    timeoutID;

                options = extend({
                        duration: 200,
                        ease: "ease-out",
                        complete: null,
                        exclusive: "all"
                    },
                    options
                );

                var stopTransitionCalled = false;

                var stopTransition = function() {
                    if (!stopTransitionCalled) {
                        stopTransitionCalled = true;

                        if (timeoutID) {
                            clearTimeout(timeoutID);
                            timeoutID = null;
                        }

                        element
                        .removeData(ABORT_ID)
                        .dequeue()
                        .css(TRANSITION, "")
                        .css(TRANSITION);

                        options.complete.call(element);
                    }
                };

                options.duration = $.fx ? $.fx.speeds[options.duration] || options.duration : options.duration;

                css = normalizeCSS(element, properties);

                $.merge(oldKeys, keys(css));
                element
                    .data("keys", $.unique(oldKeys))
                    .height();

                element.css(TRANSITION, options.exclusive + " " + options.duration + "ms " + options.ease).css(TRANSITION);
                element.css(css).css(TRANSFORM);

                /**
                 * Use transitionEnd event for browsers who support it - but duplicate it with setTimeout, as the transitionEnd event will not be triggered if no CSS properties change.
                 * This should be cleaned up at some point (widget by widget), and refactored to widgets not relying on the complete callback if no transition occurs.
                 *
                 * For IE9 and below, resort to setTimeout.
                 */
                if (transitions.event) {
                    element.one(transitions.event, stopTransition);
                    if (options.duration !== 0) {
                        delay = 500;
                    }
                }

                timeoutID = setTimeout(stopTransition, options.duration + delay);
                element.data(ABORT_ID, timeoutID);
                element.data(COMPLETE_CALLBACK, stopTransition);
            },

            stopQueue: function(element, clearQueue, gotoEnd) {
                var cssValues,
                    taskKeys = element.data("keys"),
                    retainPosition = (!gotoEnd && taskKeys),
                    completeCallback = element.data(COMPLETE_CALLBACK);

                if (retainPosition) {
                    cssValues = kendo.getComputedStyles(element[0], taskKeys);
                }

                if (completeCallback) {
                    completeCallback();
                }

                if (retainPosition) {
                    element.css(cssValues);
                }

                return element
                        .removeData("keys")
                        .stop(clearQueue);
            }
        });
    }

    function animationProperty(element, property) {
        if (transforms) {
            var transform = element.css(TRANSFORM);
            if (transform == NONE) {
                return property == "scale" ? 1 : 0;
            }

            var match = transform.match(new RegExp(property + "\\s*\\(([\\d\\w\\.]+)")),
                computed = 0;

            if (match) {
                computed = parseInteger(match[1]);
            } else {
                match = transform.match(matrix3dRegExp) || [0, 0, 0, 0, 0];
                property = property.toLowerCase();

                if (translateXRegExp.test(property)) {
                    computed = parseFloat(match[3] / match[2]);
                } else if (property == "translatey") {
                    computed = parseFloat(match[4] / match[2]);
                } else if (property == "scale") {
                    computed = parseFloat(match[2]);
                } else if (property == "rotate") {
                    computed = parseFloat(Math.atan2(match[2], match[1]));
                }
            }

            return computed;
        } else {
            return parseFloat(element.css(property));
        }
    }

    var EffectSet = kendo.Class.extend({
        init: function(element, options) {
            var that = this;

            that.element = element;
            that.effects = [];
            that.options = options;
            that.restore = [];
        },

        run: function(effects) {
            var that = this,
                effect,
                idx, jdx,
                length = effects.length,
                element = that.element,
                options = that.options,
                deferred = $.Deferred(),
                start = {},
                end = {},
                target,
                children,
                childrenLength;

            that.effects = effects;

            deferred.then($.proxy(that, "complete"));

            element.data("animating", true);

            for (idx = 0; idx < length; idx ++) {
                effect = effects[idx];

                effect.setReverse(options.reverse);
                effect.setOptions(options);

                that.addRestoreProperties(effect.restore);

                effect.prepare(start, end);

                children = effect.children();

                for (jdx = 0, childrenLength = children.length; jdx < childrenLength; jdx ++) {
                    children[jdx].duration(options.duration).run();
                }
            }

            // legacy support for options.properties
            for (var effectName in options.effects) {
                extend(end, options.effects[effectName].properties);
            }

            // Show the element initially
            if (!element.is(":visible")) {
                extend(start, { display: element.data("olddisplay") || "block" });
            }

            if (transforms && !options.reset) {
                target = element.data("targetTransform");

                if (target) {
                    start = extend(target, start);
                }
            }

            start = normalizeCSS(element, start);

            if (transforms && !transitions) {
                start = strip3DTransforms(start);
            }

            element.css(start)
                   .css(TRANSFORM); // Nudge

            for (idx = 0; idx < length; idx ++) {
                effects[idx].setup();
            }

            if (options.init) {
                options.init();
            }

            element.data("targetTransform", end);
            kendo.fx.animate(element, end, extend({}, options, { complete: deferred.resolve }));

            return deferred.promise();
        },

        stop: function() {
            $(this.element).kendoStop(true, true);
        },

        addRestoreProperties: function(restore) {
            var element = this.element,
                value,
                i = 0,
                length = restore.length;

            for (; i < length; i ++) {
                value = restore[i];

                this.restore.push(value);

                if (!element.data(value)) {
                    element.data(value, element.css(value));
                }
            }
        },

        restoreCallback: function() {
            var element = this.element;

            for (var i = 0, length = this.restore.length; i < length; i ++) {
                var value = this.restore[i];
                element.css(value, element.data(value));
            }
        },

        complete: function() {
            var that = this,
                idx = 0,
                element = that.element,
                options = that.options,
                effects = that.effects,
                length = effects.length;

            element
                .removeData("animating")
                .dequeue(); // call next animation from the queue

            if (options.hide) {
                element.data("olddisplay", element.css("display")).hide();
            }

            this.restoreCallback();

            if (hasZoom && !transforms) {
                setTimeout($.proxy(this, "restoreCallback"), 0); // Again jQuery callback in IE8-
            }

            for (; idx < length; idx ++) {
                effects[idx].teardown();
            }

            if (options.completeCallback) {
                options.completeCallback(element);
            }
        }
    });

    kendo.fx.promise = function(element, options) {
        var effects = [],
            effectClass,
            effectSet = new EffectSet(element, options),
            parsedEffects = kendo.parseEffects(options.effects),
            effect;

        options.effects = parsedEffects;

        for (var effectName in parsedEffects) {
            effectClass = Effects[effectName];

            if (effectClass) {
                effect = new effectClass(element, parsedEffects[effectName].direction);
                effects.push(effect);
           }
        }

        if (effects[0]) {
            effectSet.run(effects);
        } else { // Not sure how would an fx promise reach this state - means that you call kendoAnimate with no valid effects? Why?
            if (!element.is(":visible")) {
                element.css({ display: element.data("olddisplay") || "block" }).css("display");
            }

            if (options.init) {
                options.init();
            }

            element.dequeue();
            effectSet.complete();
        }
    };

    kendo.fx.transitionPromise = function(element, destination, options) {
        kendo.fx.animateTo(element, destination, options);
        return element;
    };

    extend(kendo.fx, {
        animate: function(elements, properties, options) {
            var useTransition = options.transition !== false;
            delete options.transition;

            if (transitions && "transition" in fx && useTransition) {
                fx.transition(elements, properties, options);
            } else {
                if (transforms) {
                    elements.animate(strip3DTransforms(properties), { queue: false, show: false, hide: false, duration: options.duration, complete: options.complete }); // Stop animate from showing/hiding the element to be able to hide it later on.
                } else {
                    elements.each(function() {
                        var element = $(this),
                            multiple = {};

                        each(transformProps, function(idx, value) { // remove transforms to avoid IE and older browsers confusion
                            var params,
                                currentValue = properties ? properties[value]+ " " : null; // We need to match

                            if (currentValue) {
                                var single = properties;

                                if (value in scaleProperties && properties[value] !== undefined) {
                                    params = currentValue.match(cssParamsRegExp);
                                    if (transforms) {
                                        extend(single, { scale: +params[0] });
                                    }
                                } else {
                                    if (value in translateProperties && properties[value] !== undefined) {
                                        var position = element.css("position"),
                                            isFixed = (position == "absolute" || position == "fixed");

                                        if (!element.data(TRANSLATE)) {
                                            if (isFixed) {
                                                element.data(TRANSLATE, {
                                                    top: parseCSS(element, "top") || 0,
                                                    left: parseCSS(element, "left") || 0,
                                                    bottom: parseCSS(element, "bottom"),
                                                    right: parseCSS(element, "right")
                                                });
                                            } else {
                                                element.data(TRANSLATE, {
                                                    top: parseCSS(element, "marginTop") || 0,
                                                    left: parseCSS(element, "marginLeft") || 0
                                                });
                                            }
                                        }

                                        var originalPosition = element.data(TRANSLATE);

                                        params = currentValue.match(cssParamsRegExp);
                                        if (params) {

                                            var dX = value == TRANSLATE + "y" ? +null : +params[1],
                                                dY = value == TRANSLATE + "y" ? +params[1] : +params[2];

                                            if (isFixed) {
                                                if (!isNaN(originalPosition.right)) {
                                                    if (!isNaN(dX)) { extend(single, { right: originalPosition.right - dX }); }
                                                } else {
                                                    if (!isNaN(dX)) { extend(single, { left: originalPosition.left + dX }); }
                                                }

                                                if (!isNaN(originalPosition.bottom)) {
                                                    if (!isNaN(dY)) { extend(single, { bottom: originalPosition.bottom - dY }); }
                                                } else {
                                                    if (!isNaN(dY)) { extend(single, { top: originalPosition.top + dY }); }
                                                }
                                            } else {
                                                if (!isNaN(dX)) { extend(single, { marginLeft: originalPosition.left + dX }); }
                                                if (!isNaN(dY)) { extend(single, { marginTop: originalPosition.top + dY }); }
                                            }
                                        }
                                    }
                                }

                                if (!transforms && value != "scale" && value in single) {
                                    delete single[value];
                                }

                                if (single) {
                                    extend(multiple, single);
                                }
                            }
                        });

                        if (browser.msie) {
                            delete multiple.scale;
                        }

                        element.animate(multiple, { queue: false, show: false, hide: false, duration: options.duration, complete: options.complete }); // Stop animate from showing/hiding the element to be able to hide it later on.
                    });
                }
            }
        },

        animateTo: function(element, destination, options) {
            var direction,
                commonParent = element.parents().filter(destination.parents()).first(),
                originalOverflow;

            options = parseTransitionEffects(options);
            if (!support.mobileOS.android) {
                originalOverflow = commonParent.css(OVERFLOW);
                commonParent.css(OVERFLOW, "hidden");
            }

            $.each(options.effects, function(name, definition) {
                direction = direction || definition.direction;
            });

            function complete(animatedElement) {
                destination[0].style.cssText = "";
                element[0].style.cssText = ""; // Removing the whole style attribute breaks Android.
                if (!support.mobileOS.android) {
                    commonParent.css(OVERFLOW, originalOverflow);
                }
                if (options.completeCallback) {
                    options.completeCallback.call(element, animatedElement);
                }
            }

            options.complete = browser.msie ? function() { setTimeout(complete, 0); } : complete;
            options.previous = (options.reverse ? destination : element);

            options.reset = true; // Reset transforms if there are any.

            // execute callback only once, and hook up derived animations to previous view only once.
            (options.reverse ? element : destination).each(function() {
                $(this).kendoAnimate(extend(true, {}, options));
                options.complete = null;
                options.previous = null;
            });
        }
    });

    var Effect = kendo.Class.extend({
        init: function(element, direction) {
            var that = this;
            that.element = element;
            that._direction = direction;
            that.options = {};
            that._additionalEffects = [];

            if (!that.restore) {
                that.restore = [];
            }
        },

// Public API
        reverse: function() {
            this._reverse = true;
            return this.run();
        },

        play: function() {
            this._reverse = false;
            return this.run();
        },

        add: function(additional) {
            this._additionalEffects.push(additional);
            return this;
        },

        direction: function(value) {
            this._direction = value;
            return this;
        },

        duration: function(duration) {
            this._duration = duration;
            return this;
        },

        compositeRun: function() {
            var that = this,
                effectSet = new EffectSet(that.element, { reverse: that._reverse, duration: that._duration }),
                effects = that._additionalEffects.concat([ that ]);

            return effectSet.run(effects);
        },

        run: function() {
            if (this._additionalEffects && this._additionalEffects[0]) {
                return this.compositeRun();
            }

            var that = this,
                element = that.element,
                idx = 0,
                restore = that.restore,
                length = restore.length,
                value,
                deferred = $.Deferred(),
                start = {},
                end = {},
                target,
                children = that.children(),
                childrenLength = children.length;

            deferred.then($.proxy(that, "_complete"));

            element.data("animating", true);

            for (idx = 0; idx < length; idx ++) {
                value = restore[idx];

                if (!element.data(value)) {
                    element.data(value, element.css(value));
                }
            }

            for (idx = 0; idx < childrenLength; idx ++) {
                children[idx].duration(that._duration).run();
            }

            that.prepare(start, end);

            if (!element.is(":visible")) {
                extend(start, { display: element.data("olddisplay") || "block" });
            }

            if (transforms) {
                target = element.data("targetTransform");

                if (target) {
                    start = extend(target, start);
                }
            }

            start = normalizeCSS(element, start);

            if (transforms && !transitions) {
                start = strip3DTransforms(start);
            }

            element.css(start).css(TRANSFORM); // Nudge

            that.setup();

            element.data("targetTransform", end);
            kendo.fx.animate(element, end, { duration: that._duration, complete: deferred.resolve });

            return deferred.promise();
        },

        stop: function() {
            var idx = 0,
                children = this.children(),
                childrenLength = children.length;

            for (idx = 0; idx < childrenLength; idx ++) {
                children[idx].stop();
            }

            $(this.element).kendoStop(true, true);
            return this;
        },

        restoreCallback: function() {
            var element = this.element;

            for (var i = 0, length = this.restore.length; i < length; i ++) {
                var value = this.restore[i];
                element.css(value, element.data(value));
            }
        },

        _complete: function() {
            var that = this,
                element = that.element;

            element
                .removeData("animating")
                .dequeue(); // call next animation from the queue

            that.restoreCallback();

            if (that.shouldHide()) {
                element.data("olddisplay", element.css("display")).hide();
            }

            if (hasZoom && !transforms) {
                setTimeout($.proxy(that, "restoreCallback"), 0); // Again jQuery callback in IE8-
            }

            that.teardown();
        },

        /////////////////////////// Support for kendo.animate;
        setOptions: function(options) {
            extend(true, this.options, options);
        },

        children: function() {
            return [];
        },

        shouldHide: $.noop,

        setup: $.noop,
        prepare: $.noop,
        teardown: $.noop,
        directions: [],

        setReverse: function(reverse) {
            this._reverse = reverse;
            return this;
        }
    });

    function toUpperCase(letter) {
        return letter.toUpperCase();
    }

    function capitalize(word) {
        return word.replace(/^./, toUpperCase);
    }

    function createEffect(name, definition) {
        var effectClass = Effect.extend(definition),
            directions = effectClass.prototype.directions;

        Effects[name] = effectClass;

        fx.Element.prototype[name] = function(direction, opt1, opt2, opt3) {
            return new effectClass(this.element, direction, opt1, opt2, opt3);
        };

        each(directions, function(idx, theDirection) {
            fx.Element.prototype[name + capitalize(theDirection)] = function(opt1, opt2, opt3) {
                return new effectClass(this.element, theDirection, opt1, opt2, opt3);
            };
        });
    }

    var FOUR_DIRECTIONS = ["left", "right", "up", "down"],
        IN_OUT = ["in", "out"];

    createEffect("slideIn", {
        directions: FOUR_DIRECTIONS,

        prepare: function(start, end) {
            var that = this,
                tmp,
                element = that.element,
                direction = directions[that._direction],
                offset = -direction.modifier * (direction.vertical ? element.outerHeight() : element.outerWidth()),
                startValue = offset / (that.options && that.options.divisor || 1) + PX,
                endValue = "0px";

            if (that._reverse) {
                tmp = start;
                start = end;
                end = tmp;
            }

            if (transforms) {
                start[direction.transition] = startValue;
                end[direction.transition] = endValue;
            } else {
                start[direction.property] = startValue;
                end[direction.property] = endValue;
            }
        }
    });

    createEffect("tile", {
        directions: FOUR_DIRECTIONS,

        init: function(element, direction, previous) {
            Effect.prototype.init.call(this, element, direction);
            this.options = { previous: previous };
        },

        children: function() {
            var that = this,
                reverse = that._reverse,
                previous = that.options.previous,
                dir = that._direction;

            var children = [ fx(that.element).slideIn(dir).setReverse(reverse) ];

            if (previous) {
                children.push( fx(previous).slideIn(directions[dir].reverse).setReverse(!reverse) );
            }

            return children;
        }
    });

    function createToggleEffect(name, property, endValue) {
        createEffect(name, {
            directions: IN_OUT,

            restore: [ property ],

            startValue: function(value) {
                this._startValue = value;
                return this;
            },

            endValue: function(value) {
                this._endValue = value;
                return this;
            },

            shouldHide: function() {
               return (this._direction === "out" && this._end() === endValue) ? !this._reverse : this._reverse;
            },

            _end: function() {
                return this._endValue || endValue;
            },

            _start: function() {
                return this._startValue || 1;
            },

            prepare: function(start, end) {
                var that = this,
                    opacity = that.element.data(property),
                    out = that.shouldHide(),
                    value = isNaN(opacity) || opacity === "" ? that._start() : opacity;

                start[property] = end[property] = that._end();

                if (out) {
                    start[property] = value;
                } else {
                    end[property] = value;
                }
            }
        });
    }

    createToggleEffect("fade", "opacity", 0);
    createToggleEffect("zoom", "scale", 0.01);

    createEffect("slideMargin", {
        prepare: function(start, end) {
            var that = this,
                element = that.element,
                options = that.options,
                origin = element.data(ORIGIN),
                offset = options.offset,
                margin,
                reverse = that._reverse;

            if (!reverse && origin === null) {
                element.data(ORIGIN, parseFloat(element.css("margin-" + options.axis)));
            }

            margin = (element.data(ORIGIN) || 0);
            end["margin-" + options.axis] = !reverse ? margin + offset : margin;
        }
    });

    createEffect("slideTo", {
        prepare: function(start, end) {
            var that = this,
                element = that.element,
                options = that.options,
                offset = options.offset.split(","),
                reverse = that._reverse;

            if (transforms) {
                end.translatex = !reverse ? offset[0] : 0;
                end.translatey = !reverse ? offset[1] : 0;
            } else {
                end.left = !reverse ? offset[0] : 0;
                end.top = !reverse ? offset[1] : 0;
            }
            element.css("left");
        }
    });

    createEffect("expand", {
        directions: ["horizontal", "vertical"],

        restore: [ OVERFLOW ],

        prepare: function(start, end) {
            var that = this,
                element = that.element,
                options = that.options,
                reverse = that._reverse,
                property = that._direction === "vertical" ? HEIGHT : WIDTH,
                setLength = element[0].style[property],
                oldLength = element.data(property),
                length = parseFloat(oldLength || setLength),
                realLength = round(element.css(property, AUTO)[property]());

            start.overflow = HIDDEN;

            length = (options && options.reset) ? realLength || length : length || realLength;

            end[property] = (reverse ? 0 : length) + PX;
            start[property] = (reverse ? length : 0) + PX;

            if (oldLength === undefined) {
                element.data(property, setLength);
            }
        },

        shouldHide: function() {
           return this._reverse;
        },

        teardown: function() {
            var that = this,
                element = that.element,
                property = that._direction === "vertical" ? HEIGHT : WIDTH,
                length = element.data(property);

            if (length == AUTO || length === BLANK) {
                setTimeout(function() { element.css(property, AUTO).css(property); }, 0); // jQuery animate complete callback in IE is called before the last animation step!
            }
        }
    });

    var TRANSFER_START_STATE = { position: "absolute", marginLeft: 0, marginTop: 0, scale: 1 };
    /**
     * Intersection point formulas are taken from here - http://zonalandeducation.com/mmts/intersections/intersectionOfTwoLines1/intersectionOfTwoLines1.html
     * Formula for a linear function from two points from here - http://demo.activemath.org/ActiveMath2/search/show.cmd?id=mbase://AC_UK_calculus/functions/ex_linear_equation_two_points
     * The transform origin point is the intersection point of the two lines from the top left corners/top right corners of the element and target.
     * The math and variables below MAY BE SIMPLIFIED (zeroes removed), but this would make the formula too cryptic.
     */
    createEffect("transfer", {
        init: function(element, target) {
            this.element = element;
            this.options = { target: target };
            this.restore = [];
        },

        setup: function() {
            this.element.appendTo(document.body);
        },

        prepare: function(start, end) {
            var that = this,
                element = that.element,
                options = that.options,
                reverse = that._reverse,
                target = options.target,
                offset,
                currentScale = animationProperty(element, "scale"),
                targetOffset = target.offset(),
                scale = target.outerHeight() / element.outerHeight();

            extend(start, TRANSFER_START_STATE);
            end.scale = 1;

            element.css(TRANSFORM, "scale(1)").css(TRANSFORM);
            offset = element.offset();
            element.css(TRANSFORM, "scale(" + currentScale + ")");

            var x1 = 0,
                y1 = 0,

                x2 = targetOffset.left - offset.left,
                y2 = targetOffset.top - offset.top,

                x3 = x1 + element.outerWidth(),
                y3 = y1,

                x4 = x2 + target.outerWidth(),
                y4 = y2,

                Z1 = (y2 - y1) / (x2 - x1),
                Z2 = (y4 - y3) / (x4 - x3),

                X = (y1 - y3 - Z1 * x1 + Z2 * x3) / (Z2 - Z1),
                Y = y1 + Z1 * (X - x1);

            start.top = offset.top;
            start.left = offset.left;
            start.transformOrigin = X + PX + " " + Y + PX;

            if (reverse) {
                start.scale = scale;
            } else {
                end.scale = scale;
            }
        }
    });


    var CLIPS = {
        top: "rect(auto auto $size auto)",
        bottom: "rect($size auto auto auto)",
        left: "rect(auto $size auto auto)",
        right: "rect(auto auto auto $size)"
    };

    var ROTATIONS = {
        top:    { start: "rotatex(0deg)", end: "rotatex(180deg)" },
        bottom: { start: "rotatex(-180deg)", end: "rotatex(0deg)" },
        left:   { start: "rotatey(0deg)", end: "rotatey(-180deg)" },
        right:  { start: "rotatey(180deg)", end: "rotatey(0deg)" }
    };

    function clipInHalf(container, direction) {
        var vertical = kendo.directions[direction].vertical,
            size = (container[vertical ? HEIGHT : WIDTH]() / 2) + "px";

        return CLIPS[direction].replace("$size", size);
    }

    createEffect("turningPage", {
        directions: FOUR_DIRECTIONS,

        init: function(element, direction, container) {
            Effect.prototype.init.call(this, element, direction);
            this._container = container;
        },

        prepare: function(start, end) {
            var that = this,
                reverse = that._reverse,
                direction = reverse ? directions[that._direction].reverse : that._direction,
                rotation = ROTATIONS[direction];

            start.zIndex = 1;

            if (that._clipInHalf) {
               start.clip = clipInHalf(that._container, kendo.directions[direction].reverse);
            }

            start[BACKFACE] = HIDDEN;

            end[TRANSFORM] = TRANSFORM_PERSPECTIVE + (reverse ? rotation.start : rotation.end);
            start[TRANSFORM] = TRANSFORM_PERSPECTIVE + (reverse ? rotation.end : rotation.start);
        },

        setup: function() {
            this._container.append(this.element);
        },

        face: function(value) {
            this._face = value;
            return this;
        },

        shouldHide: function() {
            var that = this,
                reverse = that._reverse,
                face = that._face;

            return (reverse && !face) || (!reverse && face);
        },

        clipInHalf: function(value) {
            this._clipInHalf = value;
            return this;
        },

        temporary: function(value) {
            this._temporary = value;
            return this;
        },

        teardown: function() {
            if (this._temporary) {
                this.element.remove();
            }
        }
    });

    createEffect("staticPage", {
        directions: FOUR_DIRECTIONS,

        init: function(element, direction, container) {
            Effect.prototype.init.call(this, element, direction);
            this._container = container;
        },

        restore: ["clip"],

        prepare: function(start) {
            var that = this,
                direction = that._reverse ? directions[that._direction].reverse : that._direction;

            start.clip = clipInHalf(that._container, direction);
        },

        shouldHide: function() {
            var that = this,
                reverse = that._reverse,
                face = that._face;

            return (reverse && !face) || (!reverse && face);
        },

        face: function(value) {
            this._face = value;
            return this;
        }
    });

    createEffect("pageturn", {
        directions: ["horizontal", "vertical"],

        init: function(element, direction, face, back) {
            Effect.prototype.init.call(this, element, direction);
            this.options = {};
            this.options.face = face;
            this.options.back = back;
        },

        children: function() {
            var that = this,
                options = that.options,
                direction = that._direction === "horizontal" ? "left" : "top",
                reverseDirection = kendo.directions[direction].reverse,
                reverse = that._reverse,
                temp,
                faceClone = options.face.clone(true).removeAttr("id"),
                backClone = options.back.clone(true).removeAttr("id"),
                element = that.element;

            if (reverse) {
                temp = direction;
                direction = reverseDirection;
                reverseDirection = temp;
            }

            return [
                fx(options.face).staticPage(direction, element).face(true).setReverse(reverse),
                fx(options.back).staticPage(reverseDirection, element).setReverse(reverse),
                fx(faceClone).turningPage(direction, element).face(true).clipInHalf(true).temporary(true).setReverse(reverse),
                fx(backClone).turningPage(reverseDirection, element).clipInHalf(true).temporary(true).setReverse(reverse)
            ];
        },

        prepare: function(start) {
            start[PERSPECTIVE] = DEFAULT_PERSPECTIVE;
            start.transformStyle = "preserve-3d";
        },

        teardown: function() {
            this.element.find(".temp-pages").remove();
        }
    });

    createEffect("flip", {
        directions: ["horizontal", "vertical"],

        init: function(element, direction, face, back) {
            Effect.prototype.init.call(this, element, direction);
            this.options = {};
            this.options.face = face;
            this.options.back = back;
        },

        children: function() {
            var that = this,
                options = that.options,
                direction = that._direction === "horizontal" ? "left" : "top",
                reverseDirection = kendo.directions[direction].reverse,
                reverse = that._reverse,
                temp,
                element = that.element;

            if (reverse) {
                temp = direction;
                direction = reverseDirection;
                reverseDirection = temp;
            }

            return [
                fx(options.face).turningPage(direction, element).face(true).setReverse(reverse),
                fx(options.back).turningPage(reverseDirection, element).setReverse(reverse)
            ];
        },

        prepare: function(start) {
            start[PERSPECTIVE] = DEFAULT_PERSPECTIVE;
            start.transformStyle = "preserve-3d";
        }
    });

    var animationFrame  = window.requestAnimationFrame       ||
                          window.webkitRequestAnimationFrame ||
                          window.mozRequestAnimationFrame    ||
                          window.oRequestAnimationFrame      ||
                          window.msRequestAnimationFrame     ||
                          function(callback){ setTimeout(callback, 1000 / 60); };

    var Animation = kendo.Class.extend({
        init: function() {
            var that = this;
            that._tickProxy = proxy(that._tick, that);
            that._started = false;
        },

        tick: $.noop,
        done: $.noop,
        onEnd: $.noop,
        onCancel: $.noop,

        start: function() {
            if (!this.done()) {
                this._started = true;
                animationFrame(this._tickProxy);
            }
        },

        cancel: function() {
            this._started = false;
            this.onCancel();
        },

        _tick: function() {
            var that = this;
            if (!that._started) { return; }

            that.tick();

            if (!that.done()) {
                animationFrame(that._tickProxy);
            } else {
                that._started = false;
                that.onEnd();
            }
        }
    });

    var Transition = Animation.extend({
        init: function(options) {
            var that = this;
            extend(that, options);
            Animation.fn.init.call(that);
        },

        done: function() {
            return this.timePassed() >= this.duration;
        },

        timePassed: function() {
            return Math.min(this.duration, (Date.now()) - this.startDate);
        },

        moveTo: function(options) {
            var that = this,
                movable = that.movable;

            that.initial = movable[that.axis];
            that.delta = options.location - that.initial;

            that.duration = options.duration || 300;

            that.tick = that._easeProxy(options.ease);

            that.startDate = Date.now();
            that.start();
        },

        _easeProxy: function(ease) {
            var that = this;

            return function() {
                that.movable.moveAxis(that.axis, ease(that.timePassed(), that.initial, that.delta, that.duration));
            };
        }
    });

    extend(Transition, {
        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        easeOutBack: function (t, b, c, d, s) {
            s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    });

    fx.Animation = Animation;
    fx.Transition = Transition;
    fx.createEffect = createEffect;
    fx.Effects = Effects;
})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "tabstrip",
    name: "TabStrip",
    category: "web",
    description: "The TabStrip widget displays a collection of tabs with associated tab content.",
    depends: [ "data" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        map = $.map,
        each = $.each,
        trim = $.trim,
        extend = $.extend,
        template = kendo.template,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(a|div)$/i,
        NS = ".kendoTabStrip",
        IMG = "img",
        HREF = "href",
        PREV = "prev",
        LINK = "k-link",
        LAST = "k-last",
        CLICK = "click",
        ERROR = "error",
        EMPTY = ":empty",
        IMAGE = "k-image",
        FIRST = "k-first",
        SELECT = "select",
        ACTIVATE = "activate",
        CONTENT = "k-content",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        DISABLEDSTATE = "k-state-disabled",
        DEFAULTSTATE = "k-state-default",
        ACTIVESTATE = "k-state-active",
        FOCUSEDSTATE = "k-state-focused",
        HOVERSTATE = "k-state-hover",
        TABONTOP = "k-tab-on-top",
        NAVIGATABLEITEMS = ".k-item:not(." + DISABLEDSTATE + ")",
        HOVERABLEITEMS = ".k-tabstrip-items > " + NAVIGATABLEITEMS + ":not(." + ACTIVESTATE + ")",

        templates = {
            content: template(
                "<div class='k-content'#= contentAttributes(data) # role='tabpanel'>#= content(item) #</div>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='k-link'#= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #' role='tab' #=item.active ? \"aria-selected='true'\" : ''#>" +
                    "#= itemWrapper(data) #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
            sprite: template("<span class='k-sprite #= spriteCssClass #'></span>"),
            empty: template("")
        },

        rendering = {
            wrapperCssClass: function (group, item) {
                var result = "k-item",
                    index = item.index;

                if (item.enabled === false) {
                    result += " k-state-disabled";
                } else {
                    result += " k-state-default";
                }

                if (index === 0) {
                    result += " k-first";
                }

                if (index == group.length-1) {
                    result += " k-last";
                }

                return result;
            },
            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },
            text: function(item) {
                return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
            },
            tag: function(item) {
                return item.url ? "a" : "span";
            },
            contentAttributes: function(content) {
                return content.active !== true ? " style='display:none' aria-hidden='true' aria-expanded='false'" : "";
            },
            content: function(item) {
                return item.content ? item.content : item.contentUrl ? "" : "&nbsp;";
            },
            contentUrl: function(item) {
                return item.contentUrl ? kendo.attr("content-url") + '="' + item.contentUrl + '"' : "";
            }
        };

    function updateTabClasses (tabs) {
        tabs.children(IMG)
            .addClass(IMAGE);

        tabs.children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);

        tabs.filter(":not([disabled]):not([class*=k-state-disabled])")
            .addClass(DEFAULTSTATE);

        tabs.filter("li[disabled]")
            .addClass(DISABLEDSTATE)
            .removeAttr("disabled");

        tabs.filter(":not([class*=k-state])")
            .children("a")
            .filter(":focus")
            .parent()
            .addClass(ACTIVESTATE + " " + TABONTOP);

        tabs.attr("role", "tab");
        tabs.filter("." + ACTIVESTATE)
            .attr("aria-selected", true);


        tabs.each(function() {
            var item = $(this);

            if (!item.children("." + LINK).length) {
                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !trim(this.nodeValue))); })
                    .wrapAll("<a class='" + LINK + "'/>");
            }
        });

    }

    function updateFirstLast (tabGroup) {
        var tabs = tabGroup.children(".k-item");

        tabs.filter(".k-first:not(:first-child)").removeClass(FIRST);
        tabs.filter(".k-last:not(:last-child)").removeClass(LAST);
        tabs.filter(":first-child").addClass(FIRST);
        tabs.filter(":last-child").addClass(LAST);
    }

    var TabStrip = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._animations(that.options);

            if (that.element.is("ul")) {
                that.wrapper = that.element.wrapAll("<div />").parent();
            } else {
                that.wrapper = that.element;
            }

            options = that.options;

            that._isRtl = kendo.support.isRtl(that.wrapper);

            that._tabindex();

            that._updateClasses();

            that._dataSource();

            if (options.dataSource) {
                that.dataSource.fetch();
            }

            if (that.options.contentUrls) {
                that.wrapper.find(".k-tabstrip-items > .k-item")
                    .each(function(index, item) {
                        $(item).find(">." + LINK).data(CONTENTURL, that.options.contentUrls[index]);
                    });
            }

            that.wrapper
                .on(MOUSEENTER + NS + " " + MOUSELEAVE + NS, HOVERABLEITEMS, that._toggleHover)
                .on("keydown" + NS, $.proxy(that._keydown, that))
                .on("focus" + NS, $.proxy(that._active, that))
                .on("blur" + NS, function() { that._current(null); });

            that.wrapper.children(".k-tabstrip-items")
                .on(CLICK + NS, ".k-state-disabled .k-link", false)
                .on(CLICK + NS, " > " + NAVIGATABLEITEMS, function(e) {
                    if (that._click($(e.currentTarget))) {
                        e.preventDefault();
                    }
                });

            var selectedItems = that.tabGroup.children("li." + ACTIVESTATE),
                content = that.contentHolder(selectedItems.index());

            if (content.length > 0 && content[0].childNodes.length === 0) {
                that.activateTab(selectedItems.eq(0));
            }

            that.element.attr("role", "tablist");

            if (that.element[0].id) {
                that._ariaId = that.element[0].id + "_ts_active";
            }

            kendo.notify(that);
        },

        _active: function() {
            var item = this.tabGroup.children().filter("." + ACTIVESTATE);

            item = item[0] ? item : this._endItem("first");
            if (item[0]) {
                this._current(item);
            }
        },

        _endItem: function(action) {
            return this.tabGroup.children(NAVIGATABLEITEMS)[action]();
        },

        _item: function(item, action) {
            var endItem;
            if (action === PREV) {
                endItem = "last";
            } else {
                endItem = "first";
            }

            if (!item) {
                return this._endItem(endItem);
            }

            item = item[action]();

            if (!item[0]) {
                item = this._endItem(endItem);
            }

            if (item.hasClass(DISABLEDSTATE)) {
                item = this._item(item, action);
            }

            return item;
        },

        _current: function(candidate) {
            var that = this,
                focused = that._focused,
                id = that._ariaId;

            if (candidate === undefined) {
                return focused;
            }

            if (focused) {
                if (focused[0].id === id) {
                    focused.removeAttr("id");
                }
                focused.removeClass(FOCUSEDSTATE);
            }

            if (candidate) {
                if (!candidate.hasClass(ACTIVESTATE)) {
                    candidate.addClass(FOCUSEDSTATE);
                }

                that.element.removeAttr("aria-activedescendant");

                id = candidate[0].id || id;

                if (id) {
                    candidate.attr("id", id);
                    that.element.attr("aria-activedescendant", id);
                }
            }

            that._focused = candidate;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                current = that._current(),
                rtl = that._isRtl,
                action;

            if (e.target != e.currentTarget) {
                return;
            }

            if (key == keys.DOWN || key == keys.RIGHT) {
                action = rtl ? PREV : "next";
            } else if (key == keys.UP || key == keys.LEFT) {
                action = rtl ? "next" : PREV;
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                that._click(current);
                e.preventDefault();
            } else if (key == keys.HOME) {
                that._click(that._endItem("first"));
                e.preventDefault();
                return;
            } else if (key == keys.END) {
                that._click(that._endItem("last"));
                e.preventDefault();
                return;
            }

            if (action) {
                that._click(that._item(current, action));
                e.preventDefault();
            }
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            } else {
                that._refreshHandler = $.proxy(that.refresh, that);
            }

            that.dataSource = kendo.data.DataSource.create(that.options.dataSource)
                                .bind("change", that._refreshHandler);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();
            dataSource.fetch();
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation
            }
        },

        refresh: function(e) {
            var that = this,
                options = that.options,
                text = kendo.getter(options.dataTextField),
                content = kendo.getter(options.dataContentField),
                contentUrl = kendo.getter(options.dataContentUrlField),
                image = kendo.getter(options.dataImageUrlField),
                url = kendo.getter(options.dataUrlField),
                sprite = kendo.getter(options.dataSpriteCssClass),
                idx,
                tabs = [],
                tab,
                action,
                view = that.dataSource.view(),
                length;


            e = e || {};
            action = e.action;

            if (action) {
               view = e.items;
            }

            for (idx = 0, length = view.length; idx < length; idx ++) {
                tab = {
                    text: text(view[idx])
                };

                if (options.dataContentField) {
                    tab.content = content(view[idx]);
                }

                if (options.dataContentUrlField) {
                    tab.contentUrl = contentUrl(view[idx]);
                }

                if (options.dataUrlField) {
                    tab.url = url(view[idx]);
                }

                if (options.dataImageUrlField) {
                    tab.imageUrl = image(view[idx]);
                }

                if (options.dataSpriteCssClass) {
                    tab.spriteCssClass = sprite(view[idx]);
                }

                tabs[idx] = tab;
            }

            if (e.action == "add") {
                if (e.index < that.tabGroup.children().length) {
                    that.insertBefore(tabs, that.tabGroup.children().eq(e.index));
                } else {
                    that.append(tabs);
                }
            } else if (e.action == "remove") {
                for (idx = 0; idx < view.length; idx++) {
                   that.remove(e.index);
                }
            } else if (e.action == "itemchange") {
                idx = that.dataSource.view().indexOf(view[0]);
                if (e.field === options.dataTextField) {
                    that.tabGroup.children().eq(idx).find(".k-link").text(view[0].get(e.field));
                }
            } else {
                that.trigger("dataBinding");
                that.remove("li");
                that.append(tabs);
                that.trigger("dataBound");
            }
        },

        value: function(value) {
            var that = this;

            if (value !== undefined) {
                if (value != that.value()) {
                   that.tabGroup.children().each(function() {
                        if ($.trim($(this).text()) == value) {
                            that.select(this);
                        }
                   });
                }
            } else {
                return that.select().text();
            }
        },

        items: function() {
            return this.tabGroup[0].children;
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            Widget.fn.setOptions.call(this, options);
        },

        events: [
            SELECT,
            ACTIVATE,
            ERROR,
            CONTENTLOAD,
            "change",
            "dataBinding",
            "dataBound"
        ],

        options: {
            name: "TabStrip",
            dataTextField: "",
            dataContentField: "",
            dataImageUrlField: "",
            dataUrlField: "",
            dataSpriteCssClass: "",
            dataContentUrlField: "",
            animation: {
                open: {
                    effects: "expand:vertical fadeIn",
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200
                }
            },
            collapsible: false
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            if (that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            }

            that.wrapper.off(NS);
            kendo.destroy(that.wrapper);
        },

        select: function (element) {
            var that = this;

            if (arguments.length === 0) {
                return that.tabGroup.children("li." + ACTIVESTATE);
            }

            if (!isNaN(element)) {
                element = that.tabGroup.children().get(element);
            }

            element = that.tabGroup.find(element);
            $(element).each(function (index, item) {
                item = $(item);
                if (!item.hasClass(ACTIVESTATE) && !that.trigger(SELECT, { item: item[0], contentElement: that.contentHolder(item.index())[0] })) {
                    that.activateTab(item);
                }
            });

            return that;
        },

        enable: function (element, state) {
            this._toggleDisabled(element, state !== false);

            return this;
        },

        disable: function (element) {
            this._toggleDisabled(element, false);

            return this;
        },

        reload: function (element) {
            element = this.tabGroup.find(element);
            var that = this;

            element.each(function () {
                var item = $(this),
                    contentUrl = item.find("." + LINK).data(CONTENTURL),
                    content = that.contentHolder(item.index());

                if (contentUrl) {
                    that.ajaxRequest(item, content, null, contentUrl);
                }
            });

            return that;
        },

        append: function (tab) {
            var that = this,
                inserted = that._create(tab);

            each(inserted.tabs, function (idx) {
                that.tabGroup.append(this);
                that.wrapper.append(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        insertBefore: function (tab, referenceTab) {
            var that = this,
                inserted = that._create(tab),
                referenceContent = $(that.contentElement(referenceTab.index()));

            each(inserted.tabs, function (idx) {
                referenceTab.before(this);
                referenceContent.before(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        insertAfter: function (tab, referenceTab) {
            var that = this,
                inserted = that._create(tab),
                referenceContent = $(that.contentElement(referenceTab.index()));

            each(inserted.tabs, function (idx) {
                referenceTab.after(this);
                referenceContent.after(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        remove: function (elements) {
            var that = this,
                type = typeof elements,
                contents = $();

            if (type === "string") {
                elements = that.tabGroup.find(elements);
            } else if (type === "number") {
                elements = that.tabGroup.children().eq(elements);
            }

            elements.each(function () {
                contents.push(that.contentElement($(this).index()));
            });
            elements.remove();
            contents.remove();

            that._updateContentElements();

            return that;
        },

        _create: function (tab) {
            var plain = $.isPlainObject(tab),
                that = this, tabs, contents;

            if (plain || $.isArray(tab)) {
                tab = $.isArray(tab) ? tab : [tab];

                tabs = map(tab, function (value, idx) {
                            return $(TabStrip.renderItem({
                                group: that.tabGroup,
                                item: extend(value, { index: idx })
                            }));
                        });

                contents = map( tab, function (value, idx) {
                            if (value.content || value.contentUrl) {
                                return $(TabStrip.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });
            } else {
                tabs = $(tab);
                contents = $("<div class='" + CONTENT + "'/>");

                updateTabClasses(tabs);
            }

            return { tabs: tabs, contents: contents };
        },

        _toggleDisabled: function(element, enable) {
            element = this.tabGroup.find(element);
            element.each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable);
            });
        },

        _updateClasses: function() {
            var that = this,
                tabs, activeItem, activeTab;

            that.wrapper.addClass("k-widget k-header k-tabstrip");

            that.tabGroup = that.wrapper.children("ul").addClass("k-tabstrip-items k-reset");

            if (!that.tabGroup[0]) {
                that.tabGroup = $("<ul class='k-tabstrip-items k-reset'/>").appendTo(that.wrapper);
            }

            tabs = that.tabGroup.find("li").addClass("k-item");

            if (tabs.length) {
                activeItem = tabs.filter("." + ACTIVESTATE).index();
                activeTab = activeItem >= 0 ? activeItem : undefined;

                that.tabGroup // Remove empty text nodes
                    .contents()
                    .filter(function () { return (this.nodeType == 3 && !trim(this.nodeValue)); })
                    .remove();
            }

            if (activeItem >= 0) {
                tabs.eq(activeItem).addClass(TABONTOP);
            }

            that.contentElements = that.wrapper.children("div");

            that.contentElements
                .addClass(CONTENT)
                .eq(activeTab)
                .addClass(ACTIVESTATE)
                .css({ display: "block" });

            if (tabs.length) {
                updateTabClasses(tabs);

                updateFirstLast(that.tabGroup);
                that._updateContentElements();
            }
        },

        _updateContentElements: function() {
            var that = this,
                contentUrls = that.options.contentUrls || [],
                tabStripID = that.element.attr("id"),
                contentElements = that.wrapper.children("div");

            that.tabGroup.find(".k-item").each(function(idx) {
                var currentContent = contentElements.eq(idx),
                    id = tabStripID + "-" + (idx+1);

                this.setAttribute("aria-controls", id);

                if (!currentContent.length && contentUrls[idx]) {
                    $("<div id='"+ id +"' class='" + CONTENT + "'/>").appendTo(that.wrapper);
                } else {
                    currentContent.attr("id", id);
                }
                currentContent.attr("role", "tabpanel");
                currentContent.filter(":not(." + ACTIVESTATE + ")").attr("aria-hidden", true).attr("aria-expanded", false);
                currentContent.filter("." + ACTIVESTATE).attr("aria-expanded", true);
            });

            that.contentElements = that.contentAnimators = that.wrapper.children("div"); // refresh the contents

            if (kendo.kineticScrollNeeded && kendo.mobile.ui.Scroller) {
                kendo.touchScroller(that.contentElements);
                that.contentElements = that.contentElements.children(".km-scroll-container");
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _click: function (item) {
            var that = this,
                link = item.find("." + LINK),
                href = link.attr(HREF),
                collapse = that.options.collapsible,
                contentHolder = that.contentHolder(item.index()),
                prevent, isAnchor;

            if (item.closest(".k-widget")[0] != that.wrapper[0]) {
                return;
            }

            if (item.is("." + DISABLEDSTATE + (!collapse ? ",." + ACTIVESTATE : ""))) {
                return true;
            }

            isAnchor = link.data(CONTENTURL) || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));
            prevent = !href || isAnchor;

            if (that.tabGroup.children("[data-animating]").length) {
                return prevent;
            }

            if (that.trigger(SELECT, { item: item[0], contentElement: contentHolder[0] })) {
                return true;
            }

            if (prevent === false) {
                return;
            }

            if (collapse && item.is("." + ACTIVESTATE)) {
                that.deactivateTab(item);
                return true;
            }

            if (that.activateTab(item)) {
                prevent = true;
            }

            return prevent;
        },

        deactivateTab: function (item) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close;
            item = that.tabGroup.find(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { hide: true });

            if (kendo.size(animation.effects)) {
                item.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                item.kendoRemoveClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                item.addClass(DEFAULTSTATE);
                item.removeClass(ACTIVESTATE);
            }

            item.removeAttr("aria-selected");

            that.contentAnimators
                    .filter("." + ACTIVESTATE)
                    .kendoStop(true, true)
                    .kendoAnimate( close )
                    .removeClass(ACTIVESTATE)
                    .attr("aria-hidden", true);
        },

        activateTab: function (item) {
            item = this.tabGroup.find(item);

            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter("." + ACTIVESTATE),
                itemIndex = neighbours.index(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { hide: true });
            // deactivate previously active tab
            if (kendo.size(animation.effects)) {
                oldTab.kendoRemoveClass(ACTIVESTATE, { duration: close.duration });
                item.kendoRemoveClass(HOVERSTATE, { duration: close.duration });
            } else {
                oldTab.removeClass(ACTIVESTATE);
                item.removeClass(HOVERSTATE);
            }

            // handle content elements
            var contentAnimators = that.contentAnimators;

            if (item.data("in-request")) {
                that.xhr.abort();
                item.removeAttr("data-in-request");
            }

            if (contentAnimators.length === 0) {
                oldTab.removeClass(TABONTOP);
                item.addClass(TABONTOP) // change these directly to bring the tab on top.
                    .css("z-index");

                item.addClass(ACTIVESTATE);
                that._current(item);

                that.trigger("change");

                return false;
            }

            var visibleContents = contentAnimators.filter("." + ACTIVESTATE),
                contentHolder = that.contentHolder(itemIndex),
                contentElement = contentHolder.closest(".k-content");

            if (contentHolder.length === 0) {
                visibleContents
                    .removeClass( ACTIVESTATE )
                    .attr("aria-hidden", true)
                    .kendoStop(true, true)
                    .kendoAnimate( close );
                return false;
            }

            item.attr("data-animating", true);

            var isAjaxContent = (item.children("." + LINK).data(CONTENTURL) || false) && contentHolder.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeClass(TABONTOP);
                    item.addClass(TABONTOP) // change these directly to bring the tab on top.
                        .css("z-index");

                    if (kendo.size(animation.effects)) {
                        oldTab.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                        item.kendoAddClass(ACTIVESTATE, { duration: animation.duration });
                    } else {
                        oldTab.addClass(DEFAULTSTATE);
                        item.addClass(ACTIVESTATE);
                    }
                    oldTab.removeAttr("aria-selected");
                    item.attr("aria-selected", true);

                    that._current(item);

                    contentElement
                        .addClass(ACTIVESTATE)
                        .removeAttr("aria-hidden")
                        .kendoStop(true, true)
                        .attr("aria-expanded", true)
                        .kendoAnimate( extend({ init: function () {
                            that.trigger(ACTIVATE, { item: item[0], contentElement: contentHolder[0] });
                        } }, animation, { complete: function () { item.removeAttr("data-animating"); } } ) );
                },
                showContent = function() {
                    if (!isAjaxContent) {
                        showContentElement();
                        that.trigger("change");
                    } else {
                        item.removeAttr("data-animating");
                        that.ajaxRequest(item, contentHolder, function () {
                            item.attr("data-animating", true);
                            showContentElement();
                            that.trigger("change");
                        });
                    }
                };

            visibleContents
                    .removeClass(ACTIVESTATE);

            visibleContents.attr("aria-hidden", true);
            visibleContents.attr("aria-expanded", false);

            if (visibleContents.length) {
                visibleContents
                    .kendoStop(true, true)
                    .kendoAnimate(extend( {
                        complete: showContent
                   }, close ));
            } else {
                showContent();
            }

            return true;
        },

        contentElement: function (itemIndex) {
            if (isNaN(itemIndex - 0)) {
                return undefined;
            }

            var contentElements = this.contentElements && this.contentElements[0] && !kendo.kineticScrollNeeded ? this.contentElements : this.contentAnimators,
                idTest = new RegExp("-" + (itemIndex + 1) + "$");

            if (contentElements) {
                for (var i = 0, len = contentElements.length; i < len; i++) {
                    if (idTest.test(contentElements.closest(".k-content")[i].id)) {
                        return contentElements[i];
                    }
                }
            }

            return undefined;
        },

        contentHolder: function (itemIndex) {
            var contentElement = $(this.contentElement(itemIndex)),
                scrollContainer = contentElement.children(".km-scroll-container");

            return kendo.support.touch && scrollContainer[0] ? scrollContainer : contentElement;
        },

        ajaxRequest: function (element, content, complete, url) {
            element = this.tabGroup.find(element);
            if (element.find(".k-loading").length) {
                return;
            }

            var that = this,
                link = element.find("." + LINK),
                data = {},
                statusIcon = null,
                loadingIconTimeout = setTimeout(function () {
                    statusIcon = $("<span class='k-icon k-loading'/>").prependTo(link);
                }, 100);

            url = url || link.data(CONTENTURL) || link.attr(HREF);
            element.attr("data-in-request", true);

            that.xhr = $.ajax({
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    if (that.trigger("error", { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                complete: function () {
                    element.removeAttr("data-in-request");

                    clearTimeout(loadingIconTimeout);
                    if (statusIcon !== null) {
                        statusIcon.remove();
                    }
                },

                success: function (data) {
                    try {
                        content.html(data);
                    } catch (e) {
                        var console = window.console;

                        if (console && console.error) {
                            console.error(e.name + ": " + e.message + " in " + url);
                        }
                        this.error(this.xhr, "error");
                    }

                    if (complete) {
                        complete.call(that, content);
                    }

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: content[0] });
                }
            });
        }
    });

    // client-side rendering
    extend(TabStrip, {
        renderItem: function (options) {
            options = extend({ tabStrip: {}, group: {} }, options);

            var empty = templates.empty,
                item = options.item;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper
            }, rendering));
        },

        renderContent: function (options) {
            return templates.content(extend(options, rendering));
        }
    });

    kendo.ui.plugin(TabStrip);

})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "grid",
    name: "Grid",
    category: "web",
    description: "The Grid widget displays tabular data and offers rich support for interacting with data,including paging, sorting, grouping, and selection.",
    depends: [ "data" ],
    features: [ {
        id: "grid-editing",
        name: "Editing",
        description: "Support for record editing",
        depends: [ "editable", "window" ]
    }, {
        id: "grid-filtering",
        name: "Filtering",
        description: "Support for record filtering",
        depends: [ "filtermenu" ]
    }, {
        id: "grid-columnmenu",
        name: "Column menu",
        description: "Support for header column menu",
        depends: [ "columnmenu" ]
    }, {
        id: "grid-grouping",
        name: "Grouping",
        description: "Support for grid grouping",
        depends: [ "groupable" ]
    }, {
        id: "grid-paging",
        name: "Paging",
        description: "Suppot for grid paging",
        depends: [ "pager" ]
    }, {
        id: "grid-selection",
        name: "Selection",
        description: "Support for row selection",
        depends: [ "selectable" ]
    }, {
        id: "grid-sorting",
        name: "Sorting",
        description: "Support for grid sorting",
        depends: [ "sortable" ]
    }, {
        id: "grid-column-reorder",
        name: "Column reordering",
        description: "Support for column reordering",
        depends: [ "reorderable" ]
    }, {
        id: "grid-column-resize",
        name: "Column resizing",
        description: "Support for column resizing",
        depends: [ "resizable" ]
    } ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Groupable = ui.Groupable,
        tbodySupportsInnerHtml = kendo.support.tbodyInnerHtml,
        activeElement = kendo._activeElement,
        Widget = ui.Widget,
        keys = kendo.keys,
        isPlainObject = $.isPlainObject,
        extend = $.extend,
        map = $.map,
        grep = $.grep,
        isArray = $.isArray,
        inArray = $.inArray,
        proxy = $.proxy,
        isFunction = $.isFunction,
        isEmptyObject = $.isEmptyObject,
        math = Math,
        PROGRESS = "progress",
        ERROR = "error",
        DATA_CELL = ":not(.k-group-cell):not(.k-hierarchy-cell):visible",
        SELECTION_CELL_SELECTOR = "tbody>tr:not(.k-grouping-row):not(.k-detail-row):not(.k-group-footer) > td:not(.k-group-cell):not(.k-hierarchy-cell)",
        NAVROW = "tr:not(.k-footer-template):visible",
        NAVCELL = ":not(.k-group-cell):not(.k-hierarchy-cell):visible",
        FIRSTNAVITEM = NAVROW + ":first>" + NAVCELL + ":first",
        HEADERCELLS = "th.k-header:not(.k-group-cell,.k-hierarchy-cell)",
        GROUPINGDRAGGABLES = HEADERCELLS + ":visible[" + kendo.attr("field") + "]",
        GROUPINGFILTER =  HEADERCELLS + "[" + kendo.attr("field") + "]",
        NS = ".kendoGrid",
        EDIT = "edit",
        SAVE = "save",
        REMOVE = "remove",
        DETAILINIT = "detailInit",
        FILTERMENUINIT = "filterMenuInit",
        COLUMNMENUINIT = "columnMenuInit",
        CHANGE = "change",
        COLUMNHIDE = "columnHide",
        COLUMNSHOW = "columnShow",
        SAVECHANGES = "saveChanges",
        DATABOUND = "dataBound",
        DETAILEXPAND = "detailExpand",
        DETAILCOLLAPSE = "detailCollapse",
        FOCUSED = "k-state-focused",
        SELECTED = "k-state-selected",
        COLUMNRESIZE = "columnResize",
        COLUMNREORDER = "columnReorder",
        CLICK = "click",
        HEIGHT = "height",
        TABINDEX = "tabIndex",
        FUNCTION = "function",
        STRING = "string",
        DELETECONFIRM = "Are you sure you want to delete this record?",
        formatRegExp = /(\}|\#)/ig,
        indicatorWidth = 3,
        templateHashRegExp = /#/ig,
        whitespaceRegExp = "[\\x20\\t\\r\\n\\f]",
        nonDataCellsRegExp = new RegExp("(^|" + whitespaceRegExp + ")" + "(k-group-cell|k-hierarchy-cell)" + "(" + whitespaceRegExp + "|$)"),
        COMMANDBUTTONTMPL = '<a class="k-button k-button-icontext #=className#" #=attr# href="\\#"><span class="#=iconClass# #=imageClass#"></span>#=text#</a>',
        isRtl = false;

    var VirtualScrollable =  Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            that._refreshHandler = proxy(that.refresh, that);
            that.setDataSource(options.dataSource);
            that.wrap();
        },

        setDataSource: function(dataSource) {
            var that = this;
            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            }
            that.dataSource = dataSource;
            that.dataSource.bind(CHANGE, that._refreshHandler);
        },

        options: {
            name: "VirtualScrollable",
            itemHeight: $.noop
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.dataSource.unbind(CHANGE, that._refreshHandler);
            that.wrapper.add(that.verticalScrollbar).off(NS);

            if (that.drag) {
                that.drag.destroy();
            }
        },

        wrap: function() {
            var that = this,
                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                scrollbar = kendo.support.scrollbar() + 1,
                element = that.element,
                wrapper;

            element.css( {
                width: "auto",
                overflow: "hidden"
            }).css((isRtl ? "padding-left" : "padding-right"), scrollbar);
            that.content = element.children().first();
            wrapper = that.wrapper = that.content.wrap('<div class="k-virtual-scrollable-wrap"/>')
                                .parent()
                                .bind("DOMMouseScroll" + NS + " mousewheel" + NS, proxy(that._wheelScroll, that));

            if (kendo.support.kineticScrollNeeded) {
                that.drag = new kendo.UserEvents(that.wrapper, {
                    global: true,
                    move: function(e) {
                        that.verticalScrollbar.scrollTop(that.verticalScrollbar.scrollTop() - e.y.delta);
                        wrapper.scrollLeft(wrapper.scrollLeft() - e.x.delta);
                        e.preventDefault();
                    }
                });
            }

            that.verticalScrollbar = $('<div class="k-scrollbar k-scrollbar-vertical" />')
                                        .css({
                                            width: scrollbar
                                        }).appendTo(element)
                                        .bind("scroll" + NS, proxy(that._scroll, that));
        },

        _wheelScroll: function(e) {
            var that = this,
                scrollTop = that.verticalScrollbar.scrollTop(),
                originalEvent = e.originalEvent,
                deltaY = originalEvent.wheelDeltaY,
                delta;


            if (originalEvent.wheelDelta) { // Webkit and IE
                if (deltaY === undefined || deltaY) { // IE does not have deltaY, thus always scroll (horizontal scrolling is treated as vertical)
                    delta = originalEvent.wheelDelta;
                }
            } else if (originalEvent.detail && originalEvent.axis === originalEvent.VERTICAL_AXIS) { // Firefox and Opera
                delta = (-originalEvent.detail) * 10;
            }

            if (delta) {
                e.preventDefault();
                that.verticalScrollbar.scrollTop(scrollTop + (-delta));
            }
        },

        _scroll: function(e) {
            var that = this,
                scrollTop = e.currentTarget.scrollTop,
                dataSource = that.dataSource,
                rowHeight = that.itemHeight,
                skip = dataSource.skip() || 0,
                start = that._rangeStart || skip,
                height = that.element.innerHeight(),
                isScrollingUp = !!(that._scrollbarTop && that._scrollbarTop > scrollTop),
                firstItemIndex = math.max(math.floor(scrollTop / rowHeight), 0),
                lastItemIndex = math.max(firstItemIndex + math.floor(height / rowHeight), 0);

            that._scrollTop = scrollTop - (start * rowHeight);
            that._scrollbarTop = scrollTop;

            if (!that._fetch(firstItemIndex, lastItemIndex, isScrollingUp)) {
                that.wrapper[0].scrollTop = that._scrollTop;
            }
        },

        _fetch: function(firstItemIndex, lastItemIndex, scrollingUp) {
            var that = this,
                dataSource = that.dataSource,
                itemHeight = that.itemHeight,
                take = dataSource.take(),
                rangeStart = that._rangeStart || dataSource.skip() || 0,
                currentSkip = math.floor(firstItemIndex / take) * take,
                fetching = false,
                prefetchAt = 0.33;

            if (firstItemIndex < rangeStart) {

                fetching = true;
                rangeStart = math.max(0, lastItemIndex - take);
                that._scrollTop = (firstItemIndex - rangeStart) * itemHeight;
                that._page(rangeStart, take);

            } else if (lastItemIndex >= rangeStart + take && !scrollingUp) {

                fetching = true;
                rangeStart = firstItemIndex;
                that._scrollTop = itemHeight;
                that._page(rangeStart, take);

            } else if (!that._fetching) {

                if (firstItemIndex < (currentSkip + take) - take * prefetchAt && firstItemIndex > take) {
                    dataSource.prefetch(currentSkip - take, take);
                }
                if (lastItemIndex > currentSkip + take * prefetchAt) {
                    dataSource.prefetch(currentSkip + take, take);
                }

            }
            return fetching;
        },

        _page: function(skip, take) {
            var that = this,
                dataSource = that.dataSource;

            clearTimeout(that._timeout);
            that._fetching = true;
            that._rangeStart = skip;

            if (dataSource.inRange(skip, take)) {
                dataSource.range(skip, take);
            } else {
                kendo.ui.progress(that.wrapper.parent(), true);
                that._timeout = setTimeout(function() {
                    dataSource.range(skip, take);
                }, 100);
            }
        },

        refresh: function() {
            var that = this,
                html = "",
                maxHeight = 250000,
                dataSource = that.dataSource,
                rangeStart = that._rangeStart,
                scrollbar = !kendo.support.kineticScrollNeeded ? kendo.support.scrollbar() : 0,
                wrapperElement = that.wrapper[0],
                totalHeight,
                idx,
                itemHeight;

            kendo.ui.progress(that.wrapper.parent(), false);
            clearTimeout(that._timeout);

            itemHeight = that.itemHeight = that.options.itemHeight() || 0;

            var addScrollBarHeight = (wrapperElement.scrollWidth > wrapperElement.offsetWidth) ? scrollbar : 0;

            totalHeight = dataSource.total() * itemHeight + addScrollBarHeight;

            for (idx = 0; idx < math.floor(totalHeight / maxHeight); idx++) {
                html += '<div style="width:1px;height:' + maxHeight + 'px"></div>';
            }

            if (totalHeight % maxHeight) {
                html += '<div style="width:1px;height:' + (totalHeight % maxHeight) + 'px"></div>';
            }

            that.verticalScrollbar.html(html);
            wrapperElement.scrollTop = that._scrollTop;

            if (that.drag) {
                that.drag.cancel();
            }

            if (rangeStart && !that._fetching) { // we are rebound from outside local range should be reset
                that._rangeStart = dataSource.skip();
            }
            that._fetching = false;
        }
    });

    function groupCells(count) {
        return new Array(count + 1).join('<td class="k-group-cell">&nbsp;</td>');
    }

    function stringifyAttributes(attributes) {
        var attr,
            result = " ";

        if (attributes) {
            if (typeof attributes === STRING) {
                return attributes;
            }

            for (attr in attributes) {
                result += attr + '="' + attributes[attr] + '"';
            }
        }
        return result;
    }

    var defaultCommands = {
        create: {
            text: "Add new record",
            imageClass: "k-add",
            className: "k-grid-add",
            iconClass: "k-icon"
        },
        cancel: {
            text: "Cancel changes",
            imageClass: "k-cancel",
            className: "k-grid-cancel-changes",
            iconClass: "k-icon"
        },
        save: {
            text: "Save changes",
            imageClass: "k-update",
            className: "k-grid-save-changes",
            iconClass: "k-icon"
        },
        destroy: {
            text: "Delete",
            imageClass: "k-delete",
            className: "k-grid-delete",
            iconClass: "k-icon"
        },
        edit: {
            text: "Edit",
            imageClass: "k-edit",
            className: "k-grid-edit",
            iconClass: "k-icon"
        },
        update: {
            text: "Update",
            imageClass: "k-update",
            className: "k-grid-update",
            iconClass: "k-icon"
        },
        canceledit: {
            text: "Cancel",
            imageClass: "k-cancel",
            className: "k-grid-cancel",
            iconClass: "k-icon"
        }
    };

    function heightAboveHeader(context) {
        var top = 0;
        $('> .k-grouping-header, > .k-grid-toolbar', context).each(function () {
            top += this.offsetHeight;
        });
        return top;
    }

    function cursor(context, value) {
        $('th, th .k-grid-filter, th .k-link', context)
            .add(document.body)
            .css('cursor', value);
    }

    function buildEmptyAggregatesObject(aggregates) {
            var idx,
                length,
                aggregate = {},
                fieldsMap = {};

            if (!isEmptyObject(aggregates)) {
                if (!isArray(aggregates)){
                    aggregates = [aggregates];
                }

                for (idx = 0, length = aggregates.length; idx < length; idx++) {
                    aggregate[aggregates[idx].aggregate] = 0;
                    fieldsMap[aggregates[idx].field] = aggregate;
                }
            }

            return fieldsMap;
    }

    function reorder(selector, sourceIndex, destIndex) {
        var source = selector.eq(sourceIndex),
            dest = selector.eq(destIndex);

        source[sourceIndex > destIndex ? "insertBefore" : "insertAfter"](dest);
    }

    function attachCustomCommandEvent(context, container, commands) {
        var idx,
            length,
            command,
            commandName;

        commands = !isArray(commands) ? [commands] : commands;

        for (idx = 0, length = commands.length; idx < length; idx++) {
            command = commands[idx];

            if (isPlainObject(command) && command.click) {
                commandName = command.name || command.text;
                container.on(CLICK + NS, "a.k-grid-" + (commandName || "").replace(/\s/g, ""), { commandName: commandName }, proxy(command.click, context));
            }
        }
    }

    function visibleColumns(columns) {
        return grep(columns, function(column) {
            return !column.hidden;
        });
    }

    function addHiddenStyle(attr) {
        attr = attr || {};
        var style = attr.style;

        if(!style) {
            style = "display:none";
        } else {
            style = style.replace(/((.*)?display)(.*)?:([^;]*)/i, "$1:none");
            if(style === attr.style) {
                style = style.replace(/(.*)?/i, "display:none;$1");
            }
        }

        return extend({}, attr, { style: style });
    }

    function removeHiddenStyle(attr) {
        attr = attr || {};
        var style = attr.style;

        if(style) {
            attr.style = style.replace(/(display\s*:\s*none\s*;?)*/ig, "");
        }

        return attr;
    }

    function normalizeCols(table, visibleColumns, hasDetails, groups) {
        var colgroup = table.find(">colgroup"),
            width,
            browser = kendo.support.browser,
            cols = map(visibleColumns, function(column) {
                    width = column.width;
                    if (width && parseInt(width, 10) !== 0) {
                        return kendo.format('<col style="width:{0}"/>', typeof width === STRING? width : width + "px");
                    }

                    return "<col />";
                });

        if (hasDetails || colgroup.find(".k-hierarchy-col").length) {
            cols.splice(0, 0, '<col class="k-hierarchy-col" />');
        }

        if (colgroup.length) {
            colgroup.remove();
        }

        colgroup = $("<colgroup/>").append($(new Array(groups + 1).join('<col class="k-group-col">') + cols.join("")));

        table.prepend(colgroup);

        // fill gap after column hiding
        if (browser.msie && browser.version == 8) {
            table.css("display", "inline-table");
            window.setTimeout(function(){table.css("display", "");}, 1);
        }
    }

    function convertToObject(array) {
        var result = {},
            item,
            idx,
            length;

        for (idx = 0, length = array.length; idx < length; idx++) {
            item = array[idx];
            result[item.value] = item.text;
        }

        return result;
    }

    function formatGroupValue(value, format, columnValues) {
        var isForiegnKey = columnValues && columnValues.length && isPlainObject(columnValues[0]) && "value" in columnValues[0],
            groupValue = isForiegnKey ? convertToObject(columnValues)[value] : value;

        groupValue = groupValue != null ? groupValue : "";

        return format ? kendo.format(format, groupValue) : groupValue;
    }

    function setCellVisibility(cells, index, visible) {
        var pad = 0,
            state,
            cell = cells[pad];

        while (cell) {
            state = visible ? true : cell.style.display !== "none";

            if (state && !nonDataCellsRegExp.test(cell.className) && --index < 0) {
                cell.style.display = visible ? "" : "none";
                break;
            }

            cell = cells[++pad];
        }
    }

    var Grid = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = isArray(options) ? { dataSource: options } : options;

            Widget.fn.init.call(that, element, options);

            isRtl = kendo.support.isRtl(element);

            that._element();

            that._aria();

            that._columns(that.options.columns);

            that._dataSource();

            that._tbody();

            that._pageable();

            that._thead();

            that._groupable();

            that._toolbar();

            that._setContentHeight();

            that._templates();

            that._navigatable();

            that._selectable();

            that._details();

            that._editable();

            that._attachCustomCommandsEvent();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            } else {
                that._footer();
            }

            kendo.notify(that);
        },

        events: [
           CHANGE,
           "dataBinding",
           "cancel",
           DATABOUND,
           DETAILEXPAND,
           DETAILCOLLAPSE,
           DETAILINIT,
           FILTERMENUINIT,
           COLUMNMENUINIT,
           EDIT,
           SAVE,
           REMOVE,
           SAVECHANGES,
           COLUMNRESIZE,
           COLUMNREORDER,
           COLUMNSHOW,
           COLUMNHIDE
        ],

        setDataSource: function(dataSource) {
            var that = this;

            that.options.dataSource = dataSource;

            that._dataSource();

            that._pageable();

            if (that.options.groupable) {
                that._groupable();
            }

            that._thead();

            if (that.virtualScrollable) {
                that.virtualScrollable.setDataSource(that.options.dataSource);
            }

            if (that.options.autoBind) {
                dataSource.fetch();
            }
        },

        options: {
            name: "Grid",
            columns: [],
            toolbar: null,
            autoBind: true,
            filterable: false,
            scrollable: true,
            sortable: false,
            selectable: false,
            navigatable: false,
            pageable: false,
            editable: false,
            groupable: false,
            rowTemplate: "",
            altRowTemplate: "",
            dataSource: {},
            height: null,
            resizable: false,
            reorderable: false,
            columnMenu: false,
            detailTemplate: null
        },

        destroy: function() {
            var that = this,
                element;

            Widget.fn.destroy.call(that);

            if (that.pager) {
                that.pager.destroy();
            }

            if (that.groupable) {
                that.groupable.destroy();
            }

            if (that.virtualScrollable) {
                that.virtualScrollable.destroy();
            }

            that._destroyColumnAttachments();

            that._destroyEditable();

            that.dataSource.unbind(CHANGE, that._refreshHandler)
                           .unbind(PROGRESS, that._progressHandler)
                           .unbind(ERROR, that._errorHandler);

            element = that.element
                .add(that.wrapper)
                .add(that.table)
                .add(that.thead)
                .add(that.wrapper.find(">.k-grid-toolbar"));

            if (that.content) {
                element = element
                        .add(that.content)
                        .add(that.content.find(">.k-virtual-scrollable-wrap"));
            }

            element.off(NS);

            kendo.destroy(that.wrapper);
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(this, options);

            that._templates();
        },

        items: function() {
            return this.tbody.children(':not(.k-grouping-row,.k-detail-row,.k-group-footer)');
        },

        _destroyColumnAttachments: function() {
            var that = this;

            that.thead.find("th").each(function(){
                var th = $(this),
                    filterMenu = th.data("kendoFilterMenu"),
                    sortable = th.data("kendoSortable"),
                    columnMenu = th.data("kendoColumnMenu");

                if (filterMenu) {
                    filterMenu.destroy();
                }

                if (sortable) {
                    sortable.destroy();
                }

                if (columnMenu) {
                    columnMenu.destroy();
                }
            });
        },

        _attachCustomCommandsEvent: function() {
            var that = this,
                columns = that.columns || [],
                command,
                idx,
                length;

            for (idx = 0, length = columns.length; idx < length; idx++) {
                command = columns[idx].command;

                if (command) {
                    attachCustomCommandEvent(that, that.wrapper, command);
                }
            }
        },

        _aria: function() {
            var id = this.element.attr("id") || "aria";

            if (id) {
                this._cellId = id + "_active_cell";
            }
        },

        _element: function() {
            var that = this,
                table = that.element;

            if (!table.is("table")) {
                if (that.options.scrollable) {
                    table = that.element.find("> .k-grid-content > table");
                } else {
                    table = that.element.children("table");
                }

                if (!table.length) {
                    table = $("<table />").appendTo(that.element);
                }
            }

            that.table = table.attr("cellspacing", 0).attr("role", that._hasDetails() ? "treegrid" : "grid");

            that._wrapper();
        },

        _positionColumnResizeHandle: function(container) {
            var that = this,
                scrollable = that.options.scrollable,
                resizeHandle = that.resizeHandle,
                left;

            that.thead.on("mousemove" + NS, "th:not(.k-group-cell,.k-hierarchy-cell)", function(e) {
                 var th = $(this),
                    clientX = e.clientX,
                    winScrollLeft = $(window).scrollLeft(),
                    position = th.offset().left + (!isRtl ? this.offsetWidth : 0);

                if(clientX + winScrollLeft > position - indicatorWidth &&  clientX + winScrollLeft < position + indicatorWidth) {
                    if (!resizeHandle) {
                        resizeHandle = that.resizeHandle = $('<div class="k-resize-handle"/>');
                        container.append(resizeHandle);
                    }

                    if (!isRtl) {
                        left = this.offsetWidth;

                        th.prevAll(":visible").each(function() {
                            left += this.offsetWidth;
                        });
                    } else {
                        var headerWrap = th.closest(".k-grid-header-wrap"),
                            ieCorrection = kendo.support.browser.msie ? headerWrap.scrollLeft() : 0,
                            webkitCorrection = kendo.support.browser.webkit ? (headerWrap[0].scrollWidth - headerWrap[0].offsetWidth - headerWrap.scrollLeft()) : 0,
                            firefoxCorrection = kendo.support.browser.mozilla ? (headerWrap[0].scrollWidth - headerWrap[0].offsetWidth - (headerWrap[0].scrollWidth - headerWrap[0].offsetWidth - headerWrap.scrollLeft())) : 0;
                        left = th.position().left - webkitCorrection + firefoxCorrection - ieCorrection;
                    }

                    resizeHandle.css({
                        top: scrollable ? 0 : heightAboveHeader(that.wrapper),
                        left: left - indicatorWidth,
                        height: th.outerHeight(),
                        width: indicatorWidth * 3
                    })
                    .data("th", th)
                    .show();

                } else {

                   if (resizeHandle) {
                       resizeHandle.hide();
                   } else {
                       cursor(that.wrapper, "");
                   }
                }
            });
        },

        _resizable: function() {
            var that = this,
                options = that.options,
                container,
                columnStart,
                columnWidth,
                gridWidth,
                col;

            if (options.resizable) {
                container = options.scrollable ? that.wrapper.find(".k-grid-header-wrap:first") : that.wrapper;

                that._positionColumnResizeHandle(container);

                container.kendoResizable({
                    handle: ".k-resize-handle",
                    hint: function(handle) {
                        return $('<div class="k-grid-resize-indicator" />').css({
                            height: handle.data("th").outerHeight() + that.tbody.attr("clientHeight")
                        });
                    },
                    start: function(e) {
                        var th = $(e.currentTarget).data("th"),
                            index = $.inArray(th[0], th.parent().children(":visible")),
                            contentTable = that.tbody.parent(),
                            footer = that.footer || $();

                        cursor(that.wrapper, 'col-resize');

                        if (options.scrollable) {
                            col = that.thead.parent().find("col:eq(" + index + ")")
                                .add(contentTable.children("colgroup").find("col:eq(" + index + ")"))
                                .add(footer.find("colgroup").find("col:eq(" + index + ")"));
                        } else {
                            col = contentTable.children("colgroup").find("col:eq(" + index + ")");
                        }

                        columnStart = e.x.location;
                        columnWidth = th.outerWidth();
                        gridWidth = that.tbody.outerWidth();
                    },
                    resize: function(e) {

                        var rtlMultiplier = isRtl ? -1 : 1,
                            width = columnWidth + (e.x.location * rtlMultiplier) - (columnStart * rtlMultiplier),
                            footer = that.footer || $();

                        if (width > 10) {
                            col.css('width', width);

                            if (options.scrollable) {
                                that._footerWidth = gridWidth + (e.x.location * rtlMultiplier) - (columnStart * rtlMultiplier);
                                that.tbody.parent()
                                    .add(that.thead.parent())
                                    .add(footer.find("table"))
                                    .css('width', that._footerWidth);
                            }
                        }
                    },
                    resizeend: function(e) {
                        var th = $(e.currentTarget).data("th"),
                            newWidth = th.outerWidth(),
                            column;

                        cursor(that.wrapper, "");

                        if (columnWidth != newWidth) {
                            column = that.columns[th.parent().find("th:not(.k-group-cell,.k-hierarchy-cell)").index(th)];

                            column.width = newWidth;

                            that.trigger(COLUMNRESIZE, {
                                column: column,
                                oldWidth: columnWidth,
                                newWidth: newWidth
                            });
                        }
                        that.resizeHandle.hide();
                    }
                });
            }
        },

        _draggable: function() {
            var that = this;
            if (that.options.reorderable) {
                if (that._draggableInstance) {
                    that._draggableInstance.destroy();
                }

                that._draggableInstance = that.wrapper.kendoDraggable({
                    group: kendo.guid(),
                    filter: that.content ? ">.k-grid-header " + HEADERCELLS : ">table>.k-grid-header " + HEADERCELLS,
                    hint: function(target) {
                        return $('<div class="k-header k-drag-clue" />')
                            .css({
                                width: target.width(),
                                paddingLeft: target.css("paddingLeft"),
                                paddingRight: target.css("paddingRight"),
                                lineHeight: target.height() + "px",
                                paddingTop: target.css("paddingTop"),
                                paddingBottom: target.css("paddingBottom")
                            })
                            .html(target.attr(kendo.attr("title")) || target.attr(kendo.attr("field")) || target.text())
                            .prepend('<span class="k-icon k-drag-status k-denied" />');
                    }
                }).data("kendoDraggable");
            }
        },

        _reorderable: function() {
            var that = this;
            if (that.options.reorderable) {
                that.wrapper.kendoReorderable({
                    draggable: that._draggableInstance,
                    change: function(e) {
                        var newIndex = inArray(that.columns[e.newIndex], that.columns),
                            column = that.columns[e.oldIndex];

                        that.trigger(COLUMNREORDER, {
                            newIndex: newIndex,
                            oldIndex: inArray(column, that.columns),
                            column: column
                        });
                        that.reorderColumn(newIndex, column);
                    }
                });
            }
        },

        reorderColumn: function(destIndex, column) {
            var that = this,
                sourceIndex = inArray(column, that.columns),
                colSourceIndex = inArray(column, visibleColumns(that.columns)),
                colDestIndex = inArray(that.columns[destIndex], visibleColumns(that.columns)),
                rows,
                idx,
                length,
                footer = that.footer || that.wrapper.find(".k-grid-footer");

            if (sourceIndex === destIndex) {
                return;
            }

            that.columns.splice(sourceIndex, 1);
            that.columns.splice(destIndex, 0, column);
            that._templates();

            reorder(that.thead.prev().find("col:not(.k-group-col,.k-hierarchy-col)"), colSourceIndex, colDestIndex);
            if (that.options.scrollable) {
                reorder(that.tbody.prev().find("col:not(.k-group-col,.k-hierarchy-col)"), colSourceIndex, colDestIndex);
            }

            reorder(that.thead.find(".k-header:not(.k-group-cell,.k-hierarchy-cell)"), sourceIndex, destIndex);

            if (footer && footer.length) {
                reorder(footer.find(".k-grid-footer-wrap>table>colgroup>col:not(.k-group-col,.k-hierarchy-col)"), colSourceIndex, colDestIndex);
                reorder(footer.find(".k-footer-template>td:not(.k-group-cell,.k-hierarchy-cell)"), sourceIndex, destIndex);
            }

            rows = that.tbody.children(":not(.k-grouping-row,.k-detail-row)");
            for (idx = 0, length = rows.length; idx < length; idx += 1) {
                reorder(rows.eq(idx).find(">td:not(.k-group-cell,.k-hierarchy-cell)"), sourceIndex, destIndex);
            }
        },

        cellIndex: function(td) {
            return $(td).parent().children('td:not(.k-group-cell,.k-hierarchy-cell)').index(td);
        },

        _modelForContainer: function(container) {
            container = $(container);

            if (!container.is("tr") && this._editMode() !== "popup") {
                container = container.closest("tr");
            }

            var id = container.attr(kendo.attr("uid"));

            return this.dataSource.getByUid(id);
        },

        _editable: function() {
            var that = this,
                selectable = that.selectable && that.selectable.options.multiple,
                editable = that.options.editable,
                handler = function () {
                    var target = activeElement(),
                        cell = that._editContainer;

                    if (cell && !$.contains(cell[0], target) && cell[0] !== target && !$(target).closest(".k-animation-container").length) {
                        if (that.editable.end()) {
                            that.closeCell();
                        }
                    }
                };

            if (editable) {
                var mode = that._editMode();
                if (mode === "incell") {
                    if (editable.update !== false) {
                        that.wrapper.on(CLICK + NS, "tr:not(.k-grouping-row) > td", function(e) {
                            var td = $(this);

                            if (td.hasClass("k-hierarchy-cell") ||
                                td.hasClass("k-detail-cell") ||
                                td.hasClass("k-group-cell") ||
                                td.hasClass("k-edit-cell") ||
                                td.has("a.k-grid-delete").length ||
                                td.has("button.k-grid-delete").length ||
                                td.closest("tbody")[0] !== that.tbody[0] || $(e.target).is(":input")) {
                                return;
                            }

                            if (that.editable) {
                                if (that.editable.end()) {
                                    if (selectable) {
                                        $(activeElement()).blur();
                                    }
                                    that.closeCell();
                                    that.editCell(td);
                                }
                            } else {
                                that.editCell(td);
                            }

                        })
                        .on("focusin" + NS, function() {
                            clearTimeout(that.timer);
                            that.timer = null;
                        })
                        .on("focusout" + NS, function() {
                            that.timer = setTimeout(handler, 1);
                        });
                    }
                } else {
                    if (editable.update !== false) {
                        that.wrapper.on(CLICK + NS, "tbody>tr:not(.k-detail-row,.k-grouping-row):visible a.k-grid-edit", function(e) {
                            e.preventDefault();
                            that.editRow($(this).closest("tr"));
                        });
                    }
                }

                if (editable.destroy !== false) {
                    that.wrapper.on(CLICK + NS, "tbody>tr:not(.k-detail-row,.k-grouping-row):visible .k-grid-delete", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        that.removeRow($(this).closest("tr"));
                    });
                } else {
                    //Required for the MVC server wrapper delete button
                    that.wrapper.on(CLICK + NS, "tbody>tr:not(.k-detail-row,.k-grouping-row):visible button.k-grid-delete", function(e) {
                        if (!that._confirmation()) {
                            e.preventDefault();
                        }
                    });
                }
            }
        },

        editCell: function(cell) {
            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell);


            if (model && (!model.editable || model.editable(column.field)) && !column.command && column.field) {

                that._attachModelChange(model);

                that._editContainer = cell;

                that.editable = cell.addClass("k-edit-cell")
                    .kendoEditable({
                        fields: { field: column.field, format: column.format, editor: column.editor, values: column.values },
                        model: model,
                        change: function(e) {
                            if (that.trigger(SAVE, { values: e.values, container: cell, model: model } )) {
                                e.preventDefault();
                            }
                        }
                    }).data("kendoEditable");

                cell.parent().addClass("k-grid-edit-row");

                that.trigger(EDIT, { container: cell, model: model });
            }
        },

        _destroyEditable: function() {
            var that = this;

            var destroy = function() {
                if (that.editable) {
                    that._detachModelChange();
                    that.editable.destroy();
                    that.editable = null;
                    that._editContainer = null;
                }
            };

            if (that.editable) {
                if (that._editMode() === "popup") {
                    that._editContainer.data("kendoWindow").bind("deactivate", destroy).close();
                } else {
                    destroy();
                }
            }
        },

        _attachModelChange: function(model) {
            var that = this;

            that._modelChangeHandler = function(e) {
                that._modelChange({ field: e.field, model: this });
            };

            model.bind("change", that._modelChangeHandler);
        },

        _detachModelChange: function() {
            var that = this,
                container = that._editContainer,
                model = that._modelForContainer(container);

            if (model) {
                model.unbind(CHANGE, that._modelChangeHandler);
            }
        },

        closeCell: function() {
            var that = this,
                cell,
                id,
                column,
                model;

            if (!that._editContainer) {
                return;
            }

            cell = that._editContainer.removeClass("k-edit-cell");
            id = cell.closest("tr").attr(kendo.attr("uid"));
            column = that.columns[that.cellIndex(cell)];
            model = that.dataSource.getByUid(id);

            cell.parent().removeClass("k-grid-edit-row");

            that._destroyEditable(); // editable should be destoryed before content of the container is changed

            that._displayCell(cell, column, model);

            if (cell.hasClass("k-dirty-cell")) {
                $('<span class="k-dirty"/>').prependTo(cell);
            }
        },

        _displayCell: function(cell, column, dataItem) {
            var that = this,
                state = { storage: {}, count: 0 },
                settings = extend({}, kendo.Template, that.options.templateSettings),
                tmpl = kendo.template(that._cellTmpl(column, state), settings);

            if (state.count > 0) {
                tmpl = proxy(tmpl, state.storage);
            }

            cell.empty().html(tmpl(dataItem));
        },

        removeRow: function(row) {
            var that = this,
                model,
                mode;

            if (!that._confirmation()) {
                return;
            }

            row = $(row).hide();
            model = that._modelForContainer(row);

            if (model && !that.trigger(REMOVE, { row: row, model: model })) {
                mode = that._editMode();

                if (mode !== "incell") {
                    that.cancelRow();
                }

                that.dataSource.remove(model);

                if (mode === "inline" || mode === "popup") {
                    that.dataSource.sync();
                }
            }
        },

        _editMode: function() {
            var mode = "incell",
                editable = this.options.editable;

            if (editable !== true) {
                if (typeof editable == "string") {
                    mode = editable;
                } else {
                    mode = editable.mode || mode;
                }
            }

            return mode;
        },

        editRow: function(row) {
            var that = this,
                model = that._modelForContainer(row),
                mode = that._editMode(),
                navigatable = that.options.navigatable,
                container;

            that.cancelRow();

            if (model) {

                that._attachModelChange(model);

                if (mode === "popup") {
                    that._createPopupEditor(model);
                } else if (mode === "inline") {
                    that._createInlineEditor(row, model);
                } else if (mode === "incell") {
                    $(row).children(DATA_CELL).each(function() {
                        var cell = $(this);
                        var column = that.columns[cell.index()];

                        model = that._modelForContainer(cell);

                        if (model && (!model.editable || model.editable(column.field)) && column.field) {
                            that.editCell(cell);
                            return false;
                        }
                    });
                }

                container = that._editContainer;

                container.on(CLICK + NS, "a.k-grid-cancel", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (that.trigger("cancel", { container: container, model: model })) {
                        return;
                    }

                    var currentIndex = that.items().index($(that.current()).parent());

                    that.cancelRow();

                    if (navigatable) {
                        that.current(that.items().eq(currentIndex).children().filter(NAVCELL).first());
                        focusTable(that.table, true);
                    }
                });

                container.on(CLICK + NS, "a.k-grid-update", function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    that.saveRow();
                });
            }
        },

        _createPopupEditor: function(model) {
            var that = this,
                html = '<div ' + kendo.attr("uid") + '="' + model.uid + '"><div class="k-edit-form-container">',
                column,
                command,
                fields = [],
                idx,
                length,
                tmpl,
                updateText,
                cancelText,
                tempCommand,
                attr,
                editable = that.options.editable,
                template = editable.template,
                options = isPlainObject(editable) ? editable.window : {},
                settings = extend({}, kendo.Template, that.options.templateSettings);

            if (template) {
                if (typeof template === STRING) {
                    template = window.unescape(template);
                }

                html += (kendo.template(template, settings))(model);

                for (idx = 0, length = that.columns.length; idx < length; idx++) {
                    column = that.columns[idx];
                    if (column.command) {
                        tempCommand = getCommand(column.command, "edit");
                        if (tempCommand) {
                            command = tempCommand;
                        }
                    }
                }
            } else {
                for (idx = 0, length = that.columns.length; idx < length; idx++) {
                    column = that.columns[idx];

                    if (!column.command) {
                        html += '<div class="k-edit-label"><label for="' + column.field + '">' + (column.title || column.field || "") + '</label></div>';

                        if ((!model.editable || model.editable(column.field)) && column.field) {
                            fields.push({ field: column.field, format: column.format, editor: column.editor, values: column.values });
                            html += '<div ' + kendo.attr("container-for") + '="' + column.field + '" class="k-edit-field"></div>';
                        } else {
                            var state = { storage: {}, count: 0 };

                            tmpl = kendo.template(that._cellTmpl(column, state), settings);

                            if (state.count > 0) {
                                tmpl = proxy(tmpl, state.storage);
                            }

                            html += '<div class="k-edit-field">' + tmpl(model) + '</div>';
                        }
                    } else if (column.command) {
                        tempCommand = getCommand(column.command, "edit");
                        if (tempCommand) {
                            command = tempCommand;
                        }
                    }
                }
            }

            if (command) {
                if (isPlainObject(command)) {
                   if (command.text && isPlainObject(command.text)) {
                       updateText = command.text.update;
                       cancelText = command.text.cancel;
                   }

                   if (command.attr) {
                       attr = command.attr;
                   }
                }
            }

            html += that._createButton({ name: "update", text: updateText, attr: attr }) + that._createButton({ name: "canceledit", text: cancelText, attr: attr });
            html += '</div></div>';

            var container = that._editContainer = $(html)
                .appendTo(that.wrapper).eq(0)
                .kendoWindow(extend({
                    modal: true,
                    resizable: false,
                    draggable: true,
                    title: "Edit",
                    visible: false,
                    close: function(e) {
                        if (e.userTriggered) {
                            if (that.trigger("cancel", { container: container, model: model })) {
                                e.preventDefault();
                                return;
                            }

                            var currentIndex = that.items().index($(that.current()).parent());

                            that.cancelRow();
                            if (that.options.navigatable) {
                                that.current(that.items().eq(currentIndex).children().filter(NAVCELL).first());
                                focusTable(that.table, true);
                            }
                        }
                    }
                }, options));

            that.editable = that._editContainer
                .kendoEditable({
                    fields: fields,
                    model: model,
                    clearContainer: false
                }).data("kendoEditable");

            container.data("kendoWindow").center().open();

            that.trigger(EDIT, { container: container, model: model });
        },

        _createInlineEditor: function(row, model) {
            var that = this,
                column,
                cell,
                command,
                fields = [];

            row.children(":not(.k-group-cell,.k-hierarchy-cell)").each(function() {
                cell = $(this);
                column = that.columns[that.cellIndex(cell)];

                if (!column.command && column.field && (!model.editable || model.editable(column.field))) {
                    fields.push({ field: column.field, format: column.format, editor: column.editor, values: column.values });
                    cell.attr(kendo.attr("container-for"), column.field);
                    cell.empty();
                } else if (column.command) {
                    command = getCommand(column.command, "edit");
                    if (command) {
                        cell.empty();

                        var updateText,
                            cancelText,
                            attr;

                        if (isPlainObject(command)) {
                            if (command.text && isPlainObject(command.text)) {
                                updateText = command.text.update;
                                cancelText = command.text.cancel;
                            }

                            if (command.attr) {
                                attr = command.attr;
                            }
                        }

                        $(that._createButton({ name: "update", text: updateText, attr: attr }) +
                            that._createButton({ name: "canceledit", text: cancelText, attr: attr})).appendTo(cell);
                    }
                }
            });

            that._editContainer = row;

            that.editable = row
                .addClass("k-grid-edit-row")
                .kendoEditable({
                    fields: fields,
                    model: model,
                    clearContainer: false
                }).data("kendoEditable");

            that.trigger(EDIT, { container: row, model: model });
        },

        cancelRow: function() {
            var that = this,
                container = that._editContainer,
                model;

            if (container) {
                model = that._modelForContainer(container);

                that.dataSource.cancelChanges(model);

                if (that._editMode() !== "popup") {
                    that._displayRow(container);
                } else {
                    that._displayRow(that.items().filter("[" + kendo.attr("uid") + "=" + model.uid + "]"));
                }

                that._destroyEditable();
            }
        },

        saveRow: function() {
            var that = this,
                container = that._editContainer,
                model = that._modelForContainer(container),
                editable = that.editable;

            if (container && editable && editable.end() &&
                !that.trigger(SAVE, { container: container, model: model } )) {

                that.dataSource.sync();
            }
        },

        _displayRow: function(row) {
            var that = this,
                model = that._modelForContainer(row);

            if (model) {
                row.replaceWith($((row.hasClass("k-alt") ? that.altRowTemplate : that.rowTemplate)(model)));
            }
        },

        _showMessage: function(text) {
            return window.confirm(text);
        },

        _confirmation: function() {
            var that = this,
                editable = that.options.editable,
                confirmation = editable === true || typeof editable === STRING ? DELETECONFIRM : editable.confirmation;

            return confirmation !== false && confirmation != null ? that._showMessage(confirmation) : true;
        },

        cancelChanges: function() {
            this.dataSource.cancelChanges();
        },

        saveChanges: function() {
            var that = this;

            if (((that.editable && that.editable.end()) || !that.editable) && !that.trigger(SAVECHANGES)) {
                that.dataSource.sync();
            }
        },

        addRow: function() {
            var that = this,
                index,
                dataSource = that.dataSource,
                mode = that._editMode(),
                createAt = that.options.editable.createAt || "",
                pageSize = dataSource.pageSize(),
                view = dataSource.view() || [];

            if ((that.editable && that.editable.end()) || !that.editable) {
                if (mode != "incell") {
                    that.cancelRow();
                }

                index = dataSource.indexOf(view[0]);

                if (createAt.toLowerCase() == "bottom") {
                    index += view.length;

                    if (pageSize && !dataSource.options.serverPaging && pageSize <= view.length) {
                        index -= 1;
                    }
                }

                if (index < 0) {
                    if (dataSource.page() > dataSource.totalPages()) {
                        index = (dataSource.page() - 1) * pageSize;
                    } else {
                        index = 0;
                    }
                }

                var model = dataSource.insert(index, {}),
                    id = model.uid,
                    row = that.table.find("tr[" + kendo.attr("uid") + "=" + id + "]"),
                    cell = row.children("td:not(.k-group-cell,.k-hierarchy-cell)").eq(that._firstEditableColumnIndex(row));

                if ((mode === "inline" || mode === "popup") && row.length) {
                    that.editRow(row);
                } else if (cell.length) {
                    that.editCell(cell);
                }
            }
        },

        _firstEditableColumnIndex: function(container) {
            var that = this,
                column,
                columns = that.columns,
                idx,
                length,
                model = that._modelForContainer(container);

            for (idx = 0, length = columns.length; idx < length; idx++) {
                column = columns[idx];

                if (model && (!model.editable || model.editable(column.field)) && !column.command && column.field) {
                    return idx;
                }
            }
            return -1;
        },

        _toolbar: function() {
            var that = this,
                wrapper = that.wrapper,
                toolbar = that.options.toolbar,
                editable = that.options.editable,
                container;

            if (toolbar) {
                container = that.wrapper.find(".k-grid-toolbar");

                if (!container.length) {
                    if (!isFunction(toolbar)) {
                        toolbar = (typeof toolbar === STRING ? toolbar : that._toolbarTmpl(toolbar).replace(templateHashRegExp, "\\#"));
                        toolbar = proxy(kendo.template(toolbar), that);
                    }

                    container = $('<div class="k-toolbar k-grid-toolbar" />')
                        .html(toolbar({}))
                        .prependTo(wrapper);
                }

                if (editable && editable.create !== false) {
                    container.on(CLICK + NS, ".k-grid-add", function(e) { e.preventDefault(); that.addRow(); })
                        .on(CLICK + NS, ".k-grid-cancel-changes", function(e) { e.preventDefault(); that.cancelChanges(); })
                        .on(CLICK + NS, ".k-grid-save-changes", function(e) { e.preventDefault(); that.saveChanges(); });
                }
            }
        },

        _toolbarTmpl: function(commands) {
            var that = this,
                idx,
                length,
                html = "";

            if (isArray(commands)) {
                for (idx = 0, length = commands.length; idx < length; idx++) {
                    html += that._createButton(commands[idx]);
                }
            }
            return html;
        },

        _createButton: function(command) {
            var template = command.template || COMMANDBUTTONTMPL,
                commandName = typeof command === STRING ? command : command.name || command.text,
                options = { className: "k-grid-" + (commandName || "").replace(/\s/g, ""), text: commandName, imageClass: "", attr: "", iconClass: "" };

            if (!commandName && !(isPlainObject(command) && command.template))  {
                throw new Error("Custom commands should have name specified");
            }

            if (isPlainObject(command)) {
                if (command.className) {
                    command.className += " " + options.className;
                }

                if (commandName === "edit" && isPlainObject(command.text)) {
                    command = extend(true, {}, command);
                    command.text = command.text.edit;
                }

                if (command.attr && isPlainObject(command.attr)) {
                    command.attr = stringifyAttributes(command.attr);
                }

                options = extend(true, options, defaultCommands[commandName], command);
            } else {
                options = extend(true, options, defaultCommands[commandName]);
            }

            return kendo.template(template)(options);
        },

        _groupable: function() {
            var that = this;

            that.table.on(CLICK + NS, ".k-grouping-row .k-i-collapse, .k-grouping-row .k-i-expand", function(e) {
                var element = $(this),
                group = element.closest("tr");

                if(element.hasClass('k-i-collapse')) {
                    that.collapseGroup(group);
                } else {
                    that.expandGroup(group);
                }
                e.preventDefault();
                e.stopPropagation();
            });

            that._attachGroupable();
        },

        _attachGroupable: function() {
            var that = this,
                wrapper = that.wrapper,
                groupable = that.options.groupable;

            if (groupable) {
                if(!wrapper.has("div.k-grouping-header")[0]) {
                    $("<div>&nbsp;</div>").addClass("k-grouping-header").prependTo(wrapper);
                }

                if (that.groupable) {
                    that.groupable.destroy();
                }

                that.groupable = new Groupable(wrapper, extend({}, groupable, {
                    draggable: that._draggableInstance,
                    groupContainer: ">div.k-grouping-header",
                    dataSource: that.dataSource,
                    draggableElements: that.content ? ">.k-grid-header " + GROUPINGDRAGGABLES : ">table>.k-grid-header " + GROUPINGDRAGGABLES,
                    filter: that.content ? ">.k-grid-header " + GROUPINGFILTER : ">table>.k-grid-header " + GROUPINGFILTER,
                    allowDrag: that.options.reorderable
                }));
            }
        },

        _selectable: function() {
            var that = this,
                multi,
                cell,
                selectable = that.options.selectable;

            if (selectable) {
                multi = typeof selectable === STRING && selectable.toLowerCase().indexOf("multiple") > -1;
                cell = typeof selectable === STRING && selectable.toLowerCase().indexOf("cell") > -1;

                that.selectable = new kendo.ui.Selectable(that.table, {
                    filter: ">" + (cell ? SELECTION_CELL_SELECTOR : "tbody>tr:not(.k-grouping-row,.k-detail-row,.k-group-footer)"),
                    aria: true,
                    multiple: multi,
                    change: function() {
                        that.trigger(CHANGE);
                    }
                });

                if (that.options.navigatable) {
                    that.table.on("keydown" + NS, function(e) {
                        var current = that.current();
                        if (e.keyCode === keys.SPACEBAR && e.target == that.table[0] &&
                            !current.is(".k-edit-cell,.k-header") &&
                            current.parent().is(":not(.k-grouping-row,.k-detail-row,.k-group-footer)")) {
                            e.preventDefault();
                            e.stopPropagation();
                            current = cell ? current : current.parent();

                            if(multi) {
                                if(!e.ctrlKey) {
                                    that.selectable.clear();
                                } else {
                                    if(current.hasClass(SELECTED)) {
                                        current.removeClass(SELECTED);
                                        that.trigger(CHANGE);
                                        return;
                                    }
                                }
                            } else {
                                that.selectable.clear();
                            }

                            that.selectable.value(current);
                        }
                    });
                }
            }
        },

        clearSelection: function() {
            var that = this;
            that.selectable.clear();
            that.trigger(CHANGE);
        },

        select: function(items) {
            var that = this,
                selectable = that.selectable;

            items = $(items);
            if(items.length) {
                if(!selectable.options.multiple) {
                    selectable.clear();
                    items = items.first();
                }
                selectable.value(items);
                return;
            }

            return selectable.value();
        },

        current: function(element) {
            var that = this,
                scrollable = that.options.scrollable,
                current = that._current,
                table = that.table.add(that.thead.parent());

            if (element !== undefined && element.length) {
                if (!current || current[0] !== element[0]) {
                    if (current) {
                        current.removeClass(FOCUSED).removeAttr("id");
                        table.removeAttr("aria-activedescendant");
                    }

                    element.attr("id", that._cellId);
                    that._current = element.addClass(FOCUSED);

                    table.attr("aria-activedescendant", that._cellId);

                    if(element.length && scrollable) {
                        if ($.contains(that.content[0], element[0])) {
                            that._scrollTo(element.parent()[0], that.content[0]);
                        }
                        if (scrollable.virtual) {
                            that._scrollTo(element[0], that.content.find(">.k-virtual-scrollable-wrap")[0]);
                        } else {
                            that._scrollTo(element[0], that.content[0]);
                        }
                    }
                }
            }

            return that._current;
        },

        _removeCurrent: function() {
            if (this._current) {
                this._current.removeClass(FOCUSED);
                this._current = null;
            }
        },

        _scrollTo: function(element, container) {
            var elementToLowercase = element.tagName.toLowerCase(),
                isHorizontal =  elementToLowercase === "td" || elementToLowercase === "th",
                elementOffset = element[isHorizontal ? "offsetLeft" : "offsetTop"],
                elementOffsetDir = element[isHorizontal ? "offsetWidth" : "offsetHeight"],
                containerScroll = container[isHorizontal ? "scrollLeft" : "scrollTop"],
                containerOffsetDir = container[isHorizontal ? "clientWidth" : "clientHeight"],
                bottomDistance = elementOffset + elementOffsetDir,
                result = 0;

                if (containerScroll > elementOffset) {
                    result = elementOffset;
                } else if (bottomDistance > (containerScroll + containerOffsetDir)) {
                    if (elementOffsetDir <= containerOffsetDir) {
                        result = (bottomDistance - containerOffsetDir);
                    } else {
                        result = elementOffset;
                    }
                } else {
                    result = containerScroll;
                }
                container[isHorizontal ? "scrollLeft" : "scrollTop"] = result;
        },

        _navigatable: function() {
            var that = this,
                currentProxy = proxy(that.current, that),
                table = that.table,
                headerTable = that.thead.parent(),
                dataTable = table,
                isRtl = kendo.support.isRtl(that.element);

            if (!that.options.navigatable) {
                return;
            }

            if (that.options.scrollable) {
                dataTable = table.add(headerTable);
                headerTable.attr(TABINDEX, -1);

                //required for FF
                //that.content.attr("tabindex", -1);
            }

            headerTable.on("keydown" + NS, function(e) {
                if (e.altKey && e.keyCode == keys.DOWN) {
                    currentProxy().find(".k-grid-filter, .k-header-column-menu").click();
                    e.stopImmediatePropagation();
                }
            })
            .find("a.k-link").attr("tabIndex", -1);

            table
            .attr(TABINDEX, math.max(table.attr(TABINDEX) || 0, 0))
            .on("mousedown" + NS + " keydown" + NS, ".k-detail-cell", function(e) {
                if (e.target !== e.currentTarget) {
                    e.stopImmediatePropagation();
                }
            });

            dataTable
            .on((kendo.support.touch ? "touchstart" + NS : "mousedown" + NS), NAVROW + ">" + NAVCELL, proxy(tableClick, that))
            .on("focus" + NS, function() {
                var current = currentProxy();
                if (current && current.is(":visible")) {
                    current.addClass(FOCUSED);
                } else {
                    currentProxy($(this).find(FIRSTNAVITEM));
                }

                if (this == table[0]) {
                    headerTable.attr(TABINDEX, -1);
                    table.attr(TABINDEX, 0);
                } else {
                    table.attr(TABINDEX, -1);
                    headerTable.attr(TABINDEX, 0);
                }
            })
            .on("focusout" + NS, function() {
                var current = currentProxy();
                if (current) {
                    current.removeClass(FOCUSED);
                }
            })
            .on("keydown" + NS, function(e) {
                var key = e.keyCode,
                    handled = false,
                    canHandle = !e.isDefaultPrevented() && !$(e.target).is(":button,a,:input,a>.k-icon"),
                    pageable = that.options.pageable,
                    dataSource = that.dataSource,
                    isInCell = that._editMode() == "incell",
                    active,
                    currentIndex,
                    row,
                    index,
                    tableToFocus,
                    shiftKey = e.shiftKey,
                    browser = kendo.support.browser,
                    current = currentProxy();

                if (current && current.is("th")) {
                    canHandle = true;
                }

                if (canHandle && key == keys.UP) {
                    if (current) {
                        row = current.parent().prevAll(NAVROW).first();
                        if (!row[0]) {
                            tableToFocus = that.thead.parent();
                            focusTable(tableToFocus, true);
                            row = tableToFocus.find(NAVROW).first();
                        }

                        index = current.index();
                        current = row.children().eq(index);
                        if (!current[0] || !current.is(NAVCELL)) {
                            current = row.children(NAVCELL).first();
                        }
                    } else {
                        current = table.find(FIRSTNAVITEM);
                    }

                    handled = true;
                    currentProxy(current);
                } else if (canHandle && key == keys.DOWN) {
                    if (current) {
                        row = current.parent().nextAll(NAVROW).first();
                        if (!row[0] && current.is("th")) {
                            focusTable(that.tbody.parent());
                            row = that.tbody.find(NAVROW).first();
                        }
                        index = current.index();
                        current = row.children().eq(index);
                        if (!current[0] || !current.is(NAVCELL)) {
                            current = row.children(NAVCELL).first();
                        }
                    } else {
                        current = table.find(FIRSTNAVITEM);
                    }

                    handled = true;
                    currentProxy(current);
                } else if (canHandle && key == (isRtl ? keys.RIGHT : keys.LEFT)) {
                    currentProxy(current ? current.prevAll(DATA_CELL + ":first") : table.find(FIRSTNAVITEM));
                    handled = true;
                } else if (canHandle && key == (isRtl ? keys.LEFT : keys.RIGHT)) {
                    if (current) {
                        if (current.next()[0]) {
                            current = current.nextAll(DATA_CELL + ":first");
                        }
                    } else {
                        current = table.find(FIRSTNAVITEM);
                    }

                    handled = true;
                    currentProxy(current);
                } else if (canHandle && pageable && keys.PAGEDOWN == key) {
                    dataSource.page(dataSource.page() + 1);
                    handled = true;
                } else if (canHandle && pageable && keys.PAGEUP == key) {
                    dataSource.page(dataSource.page() - 1);
                    handled = true;
                } else if (key == keys.ENTER || keys.F2 == key) {
                    current = current ? current : table.find(FIRSTNAVITEM);
                    if (current.is("th")) {
                        current.find(".k-link").click();
                        handled = true;
                    } else if (current.parent().is(".k-master-row,.k-grouping-row")) {
                        current.parent().find(".k-icon:first").click();
                        handled = true;
                    } else {
                        var focusable = current.find(":focusable:first");
                        if (!current.hasClass("k-edit-cell") && focusable[0] && current.hasClass("k-state-focused")) {
                            focusable.focus();
                            handled = true;
                        } else if (that.options.editable && !$(e.target).is(":button,.k-button")) {
                            that._handleEditing(current);
                            handled = true;
                        }
                    }
                } else if (keys.ESC == key) {
                    active = activeElement();
                    if (current && $.contains(current[0], active) && !current.hasClass("k-edit-cell") && !current.parent().hasClass("k-grid-edit-row")) {
                        focusTable(that.table[0], true);
                        handled = true;
                    } else if (that._editContainer && (!current || that._editContainer.has(current[0]) || current[0] === that._editContainer[0])) {
                        if (isInCell) {
                            that.closeCell();
                        } else {
                            currentIndex = that.items().index($(current).parent());
                            if (active) {
                                active.blur();
                            }
                            that.cancelRow();
                            if (currentIndex >= 0) {
                                that.current(that.items().eq(currentIndex).children().filter(NAVCELL).first());
                            }
                        }

                        if (browser.msie && browser.version < 9) {
                            document.body.focus();
                        }
                        focusTable(table, true);
                        handled = true;
                    }
                } else if (keys.TAB == key) {
                    var cell;

                    current = $(current);
                    if (that.options.editable && isInCell) {
                         cell = $(activeElement()).closest(".k-edit-cell");

                         if (cell[0] && cell[0] !== current[0]) {
                             current = cell;
                         }
                    }

                    cell = shiftKey ? current.prevAll(DATA_CELL + ":first") : current.nextAll(":visible:first");
                    if (!cell.length) {
                        cell = current.parent()[shiftKey ? "prevAll" : "nextAll"]("tr:not(.k-grouping-row):not(.k-detail-row):visible:first")
                        .children(DATA_CELL + (shiftKey ? ":last" : ":first"));
                    }

                    if (!current.is("th") && cell.length && that.options.editable && isInCell) {
                        that._handleEditing(current, cell);
                        handled = true;
                    }
                }

                if (handled) {
                    //prevent browser scrolling
                    e.preventDefault();
                    //required in hierarchy
                    e.stopPropagation();
                }
            });
        },

        _handleEditing: function(current, next) {
            var that = this,
                active = $(activeElement()),
                mode = that._editMode(),
                editContainer = that._editContainer,
                focusable,
                isEdited;

            if (mode == "incell") {
                isEdited = current.hasClass("k-edit-cell");
            } else {
                isEdited = current.parent().hasClass("k-grid-edit-row");
            }

            if (that.editable) {
                if ($.contains(editContainer[0], active[0])) {
                    active.blur();
                    if (kendo.support.browser.opera) {
                        active.change();
                    }
                }

                if (!that.editable) {
                    focusTable(that.table);
                    return;
                }

                if (that.editable.end()) {
                    if (mode == "incell") {
                        that.closeCell();
                    } else {
                        that.saveRow();
                        isEdited = true;
                    }
                } else {
                    if (mode == "incell") {
                        that.current(editContainer);
                    } else {
                        that.current(editContainer.children().filter(DATA_CELL).first());
                    }
                    focusable = editContainer.find(":focusable:first")[0];
                    if (focusable) {
                        focusable.focus();
                    }
                    return;
                }
            }

            if (next) {
                that.current(next);
            }

            focusTable(that.table, true);
            if ((!isEdited && !next) || next) {
                if (mode == "incell") {
                    that.editCell(that.current());
                } else {
                    that.editRow(that.current().parent());
                }
            }
        },

        _wrapper: function() {
            var that = this,
                table = that.table,
                height = that.options.height,
                wrapper = that.element;

            if (!wrapper.is("div")) {
               wrapper = wrapper.wrap("<div/>").parent();
            }

            that.wrapper = wrapper.addClass("k-grid k-widget");/*
                                  .attr(TABINDEX, math.max(table.attr(TABINDEX) || 0, 0));

            table.removeAttr(TABINDEX);
            */

            if (height) {
                that.wrapper.css(HEIGHT, height);
                table.css(HEIGHT, "auto");
            }
        },

        _tbody: function() {
            var that = this,
                table = that.table,
                tbody;

            tbody = table.find(">tbody");

            if (!tbody.length) {
                tbody = $("<tbody/>").appendTo(table);
            }

            that.tbody = tbody;
        },

        _scrollable: function() {
            var that = this,
                header,
                table,
                options = that.options,
                scrollable = options.scrollable,
                hasVirtualScroll = scrollable !== true && scrollable.virtual && !that.virtualScrollable,
                scrollbar = !kendo.support.kineticScrollNeeded || hasVirtualScroll ? kendo.support.scrollbar() : 0;

            if (scrollable) {
                header = that.wrapper.children(".k-grid-header");

                if (!header[0]) {
                    header = $('<div class="k-grid-header" />').insertBefore(that.table);
                }

                // workaround for IE issue where scroll is not raised if container is same width as the scrollbar
                header.css((isRtl ? "padding-left" : "padding-right"), scrollable.virtual ? scrollbar + 1 : scrollbar);
                table = $('<table role="grid" cellspacing="0" />');
                table.append(that.thead);
                header.empty().append($('<div class="k-grid-header-wrap" />').append(table));

                that.content = that.table.parent();

                if (that.content.is(".k-virtual-scrollable-wrap")) {
                    that.content = that.content.parent();
                }

                if (!that.content.is(".k-grid-content, .k-virtual-scrollable-wrap")) {
                    that.content = that.table.wrap('<div class="k-grid-content" />').parent();
                }
                if (hasVirtualScroll) {
                    that.virtualScrollable = new VirtualScrollable(that.content, {
                        dataSource: that.dataSource,
                        itemHeight: proxy(that._averageRowHeight, that)
                    });
                }

                that.scrollables = header.children(".k-grid-header-wrap");

                // the footer may exists if rendered from the server
                var footer = that.wrapper.find(".k-grid-footer"),
                    webKitRtlCorrection = (isRtl && kendo.support.browser.webkit) ? scrollbar : 0;

                if (footer.length) {
                    that.scrollables = that.scrollables.add(footer.children(".k-grid-footer-wrap"));
                }

                if (scrollable.virtual) {
                    that.content.find(">.k-virtual-scrollable-wrap").bind("scroll" + NS, function () {
                        that.scrollables.scrollLeft(this.scrollLeft + webKitRtlCorrection);
                    });
                } else {
                    that.content.bind("scroll" + NS, function () {
                        that.scrollables.scrollLeft(this.scrollLeft + webKitRtlCorrection);
                    });

                    var touchScroller = kendo.touchScroller(that.content);
                    if (touchScroller && touchScroller.movable) {
                        touchScroller.movable.bind("change", function(e) {
                            that.scrollables.scrollLeft(-e.sender.x);
                        });
                    }
                }
            }
        },

        _setContentHeight: function() {
            var that = this,
                options = that.options,
                height = that.wrapper.innerHeight(),
                header = that.wrapper.children(".k-grid-header"),
                scrollbar = kendo.support.scrollbar();

            if (options.scrollable) {

                height -= header.outerHeight();

                if (that.pager) {
                    height -= that.pager.element.outerHeight();
                }

                if(options.groupable) {
                    height -= that.wrapper.children(".k-grouping-header").outerHeight();
                }

                if(options.toolbar) {
                    height -= that.wrapper.children(".k-grid-toolbar").outerHeight();
                }

                if (that.footerTemplate) {
                    height -= that.wrapper.children(".k-grid-footer").outerHeight();
                }

                var isGridHeightSet = function(el) {
                    var initialHeight, newHeight;
                    if (el[0].style.height) {
                        return true;
                    } else {
                        initialHeight = el.height();
                    }

                    el.height("auto");
                    newHeight = el.height();

                    if (initialHeight != newHeight) {
                        el.height("");
                        return true;
                    }
                    el.height("");
                    return false;
                };

                if (isGridHeightSet(that.wrapper)) { // set content height only if needed
                    if (height > scrollbar * 2) { // do not set height if proper scrollbar cannot be displayed
                        that.content.height(height);
                    } else {
                        that.content.height(scrollbar * 2 + 1);
                    }
                }
            }
        },

        _averageRowHeight: function() {
            var that = this,
                rowHeight = that._rowHeight;

            if (!that._rowHeight) {
                that._rowHeight = rowHeight = that.table.outerHeight() / that.items().length;
                that._sum = rowHeight;
                that._measures = 1;
            }

            var currentRowHeight = that.table.outerHeight() / that.items().length;

            if (rowHeight !== currentRowHeight) {
                that._measures ++;
                that._sum += currentRowHeight;
                that._rowHeight = that._sum / that._measures;
            }
            return rowHeight;
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                pageable,
                dataSource = options.dataSource;

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (isPlainObject(dataSource)) {
                extend(dataSource, { table: that.table, fields: that.columns });

                pageable = options.pageable;

                if (isPlainObject(pageable) && pageable.pageSize !== undefined) {
                    dataSource.pageSize = pageable.pageSize;
                }
            }

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind(CHANGE, that._refreshHandler)
                                .unbind(PROGRESS, that._progressHandler)
                                .unbind(ERROR, that._errorHandler);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._requestStart, that);
                that._errorHandler = proxy(that._error, that);
            }

            that.dataSource = DataSource.create(dataSource)
                                .bind(CHANGE, that._refreshHandler)
                                .bind(PROGRESS, that._progressHandler)
                                .bind(ERROR, that._errorHandler);
        },

        _error: function() {
            this._progress(false);
        },

        _requestStart: function() {
            this._progress(true);
        },

        _modelChange: function(e) {
            var that = this,
                model = e.model,
                row = that.tbody.find("tr[" + kendo.attr("uid") + "=" + model.uid +"]"),
                cell,
                column,
                isAlt = row.hasClass("k-alt"),
                tmp,
                idx = that.items().index(row),
                length;

            if (row.children(".k-edit-cell").length && !that.options.rowTemplate) {
                row.children(":not(.k-group-cell,.k-hierarchy-cell)").each(function() {
                    cell = $(this);
                    column = that.columns[that.cellIndex(cell)];

                    if (column.field === e.field) {
                        if (!cell.hasClass("k-edit-cell")) {
                            that._displayCell(cell, column, model);
                            $('<span class="k-dirty"/>').prependTo(cell);
                        } else {
                            cell.addClass("k-dirty-cell");
                        }
                    }
                });

            } else if (!row.hasClass("k-grid-edit-row")) {
                tmp = (isAlt ? that.altRowTemplate : that.rowTemplate)(model);

                row.replaceWith(tmp);
                tmp = that.items().eq(idx);

                for (idx = 0, length = that.columns.length; idx < length; idx++) {
                    column = that.columns[idx];

                    if (column.field === e.field) {
                        cell = tmp.children(":not(.k-group-cell,.k-hierarchy-cell)").eq(idx);
                        $('<span class="k-dirty"/>').prependTo(cell);
                    }
                }
                that.trigger("itemChange", { item: tmp, data: model, ns: ui });
            }

        },

        _pageable: function() {
            var that = this,
                wrapper,
                pageable = that.options.pageable;

            if (pageable) {
                wrapper = that.wrapper.children("div.k-grid-pager");

                if (!wrapper.length) {
                    wrapper = $('<div class="k-pager-wrap k-grid-pager"/>').appendTo(that.wrapper);
                }

                if (that.pager) {
                    that.pager.destroy();
                }

                if (typeof pageable === "object" && pageable instanceof kendo.ui.Pager) {
                    that.pager = pageable;
                } else {
                    that.pager = new kendo.ui.Pager(wrapper, extend({}, pageable, { dataSource: that.dataSource }));
                }
            }
        },

        _footer: function() {
            var that = this,
                aggregates = that.dataSource.aggregates(),
                html = "",
                footerTemplate = that.footerTemplate,
                options = that.options,
                footerWrap,
                footer = that.footer || that.wrapper.find(".k-grid-footer");

            if (footerTemplate) {
                aggregates = !isEmptyObject(aggregates) ? aggregates : buildEmptyAggregatesObject(that.dataSource.aggregate());

                html = $(that._wrapFooter(footerTemplate(aggregates)));

                if (footer.length) {
                    var tmp = html;

                    footer.replaceWith(tmp);
                    footer = that.footer = tmp;
                } else {
                    if (options.scrollable) {
                        footer = that.footer = options.pageable ? html.insertBefore(that.wrapper.children("div.k-grid-pager")) : html.appendTo(that.wrapper);
                    } else {
                        footer = that.footer = html.insertBefore(that.tbody);
                    }
                }
            } else if (footer && !that.footer) {
                that.footer = footer;
            }

            if (footer.length) {
                if (options.scrollable) {
                    footerWrap = footer.attr("tabindex", -1).children(".k-grid-footer-wrap");
                    that.scrollables = that.scrollables
                        .not(".k-grid-footer-wrap")
                        .add(footerWrap);
                }

                if (that._footerWidth) {
                    footer.find("table").css('width', that._footerWidth);
                }

                if (footerWrap) {
                    footerWrap.scrollLeft(that.content.scrollLeft());
                }
            }
        },

        _wrapFooter: function(footerRow) {
            var that = this,
                html = "",
                scrollbar = !kendo.support.mobileOS ? kendo.support.scrollbar() : 0;

            if (that.options.scrollable) {
                html = $('<div class="k-grid-footer"><div class="k-grid-footer-wrap"><table cellspacing="0"><tbody>' + footerRow + '</tbody></table></div></div>');
                that._appendCols(html.find("table"));
                html.css((isRtl ? "padding-left" : "padding-right"), scrollbar); // Update inner fix.

                return html;
            }

            return '<tfoot class="k-grid-footer">' + footerRow + '</tfoot>';
        },

        _columnMenu: function() {
            var that = this,
                menu,
                columns = that.columns,
                column,
                options = that.options,
                columnMenu = options.columnMenu,
                menuOptions,
                sortable,
                filterable,
                closeCallback = function() {
                    focusTable(that.thead.parent(), true);
                },
                initCallback = function(e) {
                    that.trigger(COLUMNMENUINIT, { field: e.field, container: e.container });
                },
                cell;

            if (columnMenu) {
                if (typeof columnMenu == "boolean") {
                    columnMenu = {};
                }

                that.thead
                    .find("th:not(.k-hierarchy-cell,.k-group-cell)")
                    .each(function (index) {
                        column = columns[index];
                        cell = $(this);

                        if (!column.command && (column.field || cell.attr("data-" + kendo.ns + "field"))) {
                            menu = cell.data("kendoColumnMenu");
                            if (menu) {
                                menu.destroy();
                            }
                            sortable = column.sortable !== false && columnMenu.sortable !== false ? options.sortable : false;
                            filterable = options.filterable && column.filterable !== false && columnMenu.filterable !== false ? extend({}, column.filterable, options.filterable) : false;
                            menuOptions = {
                                dataSource: that.dataSource,
                                values: column.values,
                                columns: columnMenu.columns,
                                sortable: sortable,
                                filterable: filterable,
                                messages: columnMenu.messages,
                                owner: that,
                                closeCallback: closeCallback,
                                init: initCallback
                            };

                            cell.kendoColumnMenu(menuOptions);
                        }
                    });
            }
        },

        _filterable: function() {
            var that = this,
                columns = that.columns,
                cell,
                filterMenu,
                closeCallback = function() {
                    focusTable(that.thead.parent(), true);
                },
                filterable = that.options.filterable;

            if (filterable && !that.options.columnMenu) {
                that.thead
                    .find("th:not(.k-hierarchy-cell,.k-group-cell)")
                    .each(function(index) {
                        cell = $(this);
                        if (columns[index].filterable !== false && !columns[index].command && (columns[index].field || cell.attr("data-" + kendo.ns + "field"))) {
                            filterMenu = cell.data("kendoFilterMenu");
                            if (filterMenu) {
                                filterMenu.destroy();
                            }
                            cell.kendoFilterMenu(extend(true, {}, filterable, columns[index].filterable, {
                                dataSource: that.dataSource,
                                values: columns[index].values,
                                closeCallback: closeCallback,
                                init: function(e) {
                                    that.trigger(FILTERMENUINIT, { field: e.field, container: e.container });
                                }
                            }));
                        }
                    });
            }
        },

        _sortable: function() {
            var that = this,
                columns = that.columns,
                column,
                cell,
                sortableInstance,
                sortable = that.options.sortable;

            if (sortable) {
                that.thead
                    .find("th:not(.k-hierarchy-cell,.k-group-cell)")
                    .each(function(index) {
                        column = columns[index];
                        if (column.sortable !== false && !column.command && column.field) {
                            cell = $(this);

                            sortableInstance = cell.data("kendoSortable");

                            if (sortableInstance) {
                                sortableInstance.destroy();
                            }

                            cell.attr("data-" + kendo.ns +"field", column.field)
                                .kendoSortable(extend({}, sortable, { dataSource: that.dataSource, aria: true }));
                        }
                    });
            }
        },

        _columns: function(columns) {
            var that = this,
                table = that.table,
                encoded,
                cols = table.find("col"),
                dataSource = that.options.dataSource;

            // using HTML5 data attributes as a configuration option e.g. <th data-field="foo">Foo</foo>
            columns = columns.length ? columns : map(table.find("th"), function(th, idx) {
                th = $(th);
                var sortable = th.attr(kendo.attr("sortable")),
                    filterable = th.attr(kendo.attr("filterable")),
                    type = th.attr(kendo.attr("type")),
                    groupable = th.attr(kendo.attr("groupable")),
                    field = th.attr(kendo.attr("field")),
                    menu = th.attr(kendo.attr("menu"));

                if (!field) {
                   field = th.text().replace(/\s|[^A-z0-9]/g, "");
                }

                return {
                    field: field,
                    type: type,
                    sortable: sortable !== "false",
                    filterable: filterable !== "false",
                    groupable: groupable !== "false",
                    menu: menu,
                    template: th.attr(kendo.attr("template")),
                    width: cols.eq(idx).css("width")
                };
            });

            encoded = !(that.table.find("tbody tr").length > 0 && (!dataSource || !dataSource.transport));

            that.columns = map(columns, function(column) {
                column = typeof column === STRING ? { field: column } : column;
                if (column.hidden) {
                    column.attributes = addHiddenStyle(column.attributes);
                    column.footerAttributes = addHiddenStyle(column.footerAttributes);
                    column.headerAttributes = addHiddenStyle(column.headerAttributes);
                }

                return extend({ encoded: encoded }, column);
            });
        },

        _groups: function() {
            var group = this.dataSource.group();

            return group ? group.length : 0;
        },

        _tmpl: function(rowTemplate, alt) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                idx,
                length = that.columns.length,
                template,
                state = { storage: {}, count: 0 },
                column,
                type,
                hasDetails = that._hasDetails(),
                className = [],
                groups = that._groups();

            if (!rowTemplate) {
                rowTemplate = "<tr";

                if (alt) {
                    className.push("k-alt");
                }

                if (hasDetails) {
                    className.push("k-master-row");
                }

                if (className.length) {
                    rowTemplate += ' class="' + className.join(" ") + '"';
                }

                if (length) { // data item is an object
                    rowTemplate += ' ' + kendo.attr("uid") + '="#=' + kendo.expr("uid", settings.paramName) + '#"';
                }

                rowTemplate += " role='row'>";

                if (groups > 0) {
                    rowTemplate += groupCells(groups);
                }

                if (hasDetails) {
                    rowTemplate += '<td class="k-hierarchy-cell"><a class="k-icon k-plus" href="\\#" tabindex="-1"></a></td>';
                }

                for (idx = 0; idx < length; idx++) {
                    column = that.columns[idx];
                    template = column.template;
                    type = typeof template;

                    rowTemplate += "<td" + stringifyAttributes(column.attributes) + " role='gridcell'>";
                    rowTemplate += that._cellTmpl(column, state);

                    rowTemplate += "</td>";
                }

                rowTemplate += "</tr>";
            }

            rowTemplate = kendo.template(rowTemplate, settings);

            if (state.count > 0) {
                return proxy(rowTemplate, state.storage);
            }

            return rowTemplate;
        },

        _headerCellText: function(column) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                template = column.headerTemplate,
                type = typeof(template),
                text = column.title || column.field || "";

            if (type === FUNCTION) {
                text = kendo.template(template, settings)({});
            } else if (type === STRING) {
                text = template;
            }
            return text;
        },

        _cellTmpl: function(column, state) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                template = column.template,
                paramName = settings.paramName,
                field = column.field,
                html = "",
                idx,
                length,
                format = column.format,
                type = typeof template,
                columnValues = column.values;

            if (column.command) {
                if (isArray(column.command)) {
                    for (idx = 0, length = column.command.length; idx < length; idx++) {
                        html += that._createButton(column.command[idx]);
                    }
                    return html.replace(templateHashRegExp, "\\#");
                }
                return that._createButton(column.command).replace(templateHashRegExp, "\\#");
            }
            if (type === FUNCTION) {
                state.storage["tmpl" + state.count] = template;
                html += "#=this.tmpl" + state.count + "(" + paramName + ")#";
                state.count ++;
            } else if (type === STRING) {
                html += template;
            } else if (columnValues && columnValues.length && isPlainObject(columnValues[0]) && "value" in columnValues[0] && field) {
                html += "#var v =" + kendo.stringify(convertToObject(columnValues)) + "#";
                html += "#var f = v[";

                if (!settings.useWithBlock) {
                    html += paramName + ".";
                }

                html += field + "]#";
                html += "${f != null ? f : ''}";
            } else {
                html += column.encoded ? "#:" : "#=";

                if (format) {
                    html += 'kendo.format(\"' + format.replace(formatRegExp,"\\$1") + '\",';
                }

                if (field) {
                    field = kendo.expr(field, paramName);
                    html += field + "==null?'':" + field;
                } else {
                    html += "''";
                }

                if (format) {
                    html += ")";
                }

                html += "#";
            }
            return html;
        },

        _templates: function() {
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                groups = dataSource.group(),
                footer = that.footer || that.wrapper.find(".k-grid-footer"),
                aggregates = dataSource.aggregate();

            that.rowTemplate = that._tmpl(options.rowTemplate);
            that.altRowTemplate = that._tmpl(options.altRowTemplate || options.rowTemplate, true);

            if (that._hasDetails()) {
                that.detailTemplate = that._detailTmpl(options.detailTemplate || "");
            }

            if ((that._group && !isEmptyObject(aggregates)) || (!isEmptyObject(aggregates) && !footer.length) ||
                grep(that.columns, function(column) { return column.footerTemplate; }).length) {

                that.footerTemplate = that._footerTmpl(aggregates, "footerTemplate", "k-footer-template");
            }

            if (groups && grep(that.columns, function(column) { return column.groupFooterTemplate; }).length) {
                aggregates = $.map(groups, function(g) { return g.aggregates; });
                that.groupFooterTemplate = that._footerTmpl(aggregates, "groupFooterTemplate", "k-group-footer");
            }
        },

        _footerTmpl: function(aggregates, templateName, rowClass) {
            var that = this,
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                html = "",
                idx,
                length,
                columns = that.columns,
                template,
                type,
                storage = {},
                count = 0,
                scope = {},
                groups = that._groups(),
                fieldsMap = buildEmptyAggregatesObject(aggregates),
                column;

            html += '<tr class="' + rowClass + '">';

            if (groups > 0) {
                html += groupCells(groups);
            }

            if (that._hasDetails()) {
                html += '<td class="k-hierarchy-cell">&nbsp;</td>';
            }

            for (idx = 0, length = that.columns.length; idx < length; idx++) {
                column = columns[idx];
                template = column[templateName];
                type = typeof template;

                html += "<td" + stringifyAttributes(column.footerAttributes) + ">";

                if (template) {
                    if (type !== FUNCTION) {
                        scope = fieldsMap[column.field] ? extend({}, settings, { paramName: paramName + "." + column.field }) : {};
                        template = kendo.template(template, scope);
                    }

                    storage["tmpl" + count] = template;
                    html += "#=this.tmpl" + count + "(" + paramName + ")#";
                    count ++;
                } else {
                    html += "&nbsp;";
                }

                html += "</td>";
            }

            html += '</tr>';

            html = kendo.template(html, settings);

            if (count > 0) {
                return proxy(html, storage);
            }

            return html;
        },

        _detailTmpl: function(template) {
            var that = this,
                html = "",
                settings = extend({}, kendo.Template, that.options.templateSettings),
                paramName = settings.paramName,
                templateFunctionStorage = {},
                templateFunctionCount = 0,
                groups = that._groups(),
                colspan = visibleColumns(that.columns).length,
                type = typeof template;

            html += '<tr class="k-detail-row">';
            if (groups > 0) {
                html += groupCells(groups);
            }
            html += '<td class="k-hierarchy-cell"></td><td class="k-detail-cell"' + (colspan? ' colspan="' + colspan + '"' : '') + ">";

            if (type === FUNCTION) {
                templateFunctionStorage["tmpl" + templateFunctionCount] = template;
                html += "#=this.tmpl" + templateFunctionCount + "(" + paramName + ")#";
                templateFunctionCount ++;
            } else {
                html += template;
            }

            html += "</td></tr>";

            html = kendo.template(html, settings);

            if (templateFunctionCount > 0) {
                return proxy(html, templateFunctionStorage);
            }

            return html;
        },

        _hasDetails: function() {
            var that = this;

            return that.options.detailTemplate !== null  || (that._events[DETAILINIT] || []).length;
        },

        _details: function() {
            var that = this;

            that.table.on(CLICK + NS, ".k-hierarchy-cell .k-plus, .k-hierarchy-cell .k-minus", function(e) {
                var button = $(this),
                    expanding = button.hasClass("k-plus"),
                    masterRow = button.closest("tr.k-master-row"),
                    detailRow,
                    detailTemplate = that.detailTemplate,
                    data,
                    hasDetails = that._hasDetails();

                button.toggleClass("k-plus", !expanding)
                    .toggleClass("k-minus", expanding);

                if(hasDetails && !masterRow.next().hasClass("k-detail-row")) {
                    data = that.dataItem(masterRow);
                    $(detailTemplate(data))
                        .addClass(masterRow.hasClass("k-alt") ? "k-alt" : "")
                        .insertAfter(masterRow);

                    that.trigger(DETAILINIT, { masterRow: masterRow, detailRow: masterRow.next(), data: data, detailCell: masterRow.next().find(".k-detail-cell") });
                }

                detailRow = masterRow.next();

                that.trigger(expanding ? DETAILEXPAND : DETAILCOLLAPSE, { masterRow: masterRow, detailRow: detailRow});
                detailRow.toggle(expanding);

                if (that._current) {
                    that._current.attr("aria-expanded", expanding);
                }

                e.preventDefault();
                return false;
            });
        },

        dataItem: function(tr) {
            return this._data[this.tbody.find('> tr:not(.k-grouping-row,.k-detail-row,.k-group-footer)').index($(tr))];
        },

        expandRow: function(tr) {
            $(tr).find('> td .k-plus, > td .k-i-expand').click();
        },

        collapseRow: function(tr) {
            $(tr).find('> td .k-minus, > td .k-i-collapse').click();
        },

        _thead: function() {
            var that = this,
                columns = that.columns,
                hasDetails = that._hasDetails() && columns.length,
                idx,
                length,
                html = "",
                thead = that.table.find(">thead"),
                tr,
                text,
                th;

            if (!thead.length) {
                thead = $("<thead/>").insertBefore(that.tbody);
            }

            tr = that.element.find("tr:has(th):first");

            if (!tr.length) {
                tr = thead.children().first();
                if (!tr.length) {
                    tr = $("<tr/>");
                }
            }

            if (!tr.children().length) {
                if (hasDetails) {
                    html += '<th class="k-hierarchy-cell">&nbsp;</th>';
                }

                for (idx = 0, length = columns.length; idx < length; idx++) {
                    th = columns[idx];
                    text = that._headerCellText(th);

                    if (!th.command) {
                        html += "<th role='columnheader' " + kendo.attr("field") + "='" + (th.field || "") + "' ";
                        if (th.title) {
                            html += kendo.attr("title") + '="' + th.title.replace(/'/g, "\'") + '" ';
                        }

                        if (th.groupable !== undefined) {
                            html += kendo.attr("groupable") + "='" + th.groupable + "' ";
                        }

                        if (th.aggregates) {
                            html += kendo.attr("aggregates") + "='" + th.aggregates + "'";
                        }

                        html += stringifyAttributes(th.headerAttributes);

                        html += ">" + text + "</th>";
                    } else {
                        html += "<th" + stringifyAttributes(th.headerAttributes) + ">" + text + "</th>";
                    }
                }

                tr.html(html);
            } else if (hasDetails && !tr.find(".k-hierarchy-cell")[0]) {
                tr.prepend('<th class="k-hierarchy-cell">&nbsp;</th>');
            }

            tr.find("th").addClass("k-header");

            if(!that.options.scrollable) {
                thead.addClass("k-grid-header");
            }

            tr.find("script").remove().end().appendTo(thead);

            if (that.thead) {
                that._destroyColumnAttachments();
            }

            that.thead = thead;

            that._sortable();

            that._filterable();

            that._scrollable();

            that._updateCols();

            that._resizable();

            that._draggable();

            that._reorderable();

            if (that.groupable) {
                that._attachGroupable();
            }

            that._columnMenu();
        },

        _updateCols: function() {
            var that = this;

            that._appendCols(that.thead.parent().add(that.table));
        },

        _appendCols: function(table) {
            var that = this;

            normalizeCols(table, visibleColumns(that.columns), that._hasDetails(), that._groups());
        },

        _autoColumns: function(schema) {
            if (schema && schema.toJSON) {
                var that = this,
                    field;

                schema = schema.toJSON();

                for (field in schema) {
                    that.columns.push({ field: field });
                }

                that._thead();

                that._templates();
            }
        },

        _rowsHtml: function(data) {
            var that = this,
                html = "",
                idx,
                length,
                rowTemplate = that.rowTemplate,
                altRowTemplate = that.altRowTemplate;

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altRowTemplate(data[idx]);
                } else {
                    html += rowTemplate(data[idx]);
                }

                that._data.push(data[idx]);
            }

            return html;
        },

        _groupRowHtml: function(group, colspan, level) {
            var that = this,
                html = "",
                idx,
                length,
                field = group.field,
                column = grep(that.columns, function(column) { return column.field == field; })[0] || { },
                template = column.groupHeaderTemplate,
                text =  (column.title || field) + ': ' + formatGroupValue(group.value, column.format, column.values),
                data = extend({}, { field: group.field, value: group.value }, group.aggregates[group.field]),
                footerDefaults = that._groupAggregatesDefaultObject || {},
                groupItems = group.items;

            if (template) {
                text  = typeof template === FUNCTION ? template(data) : kendo.template(template)(data);
            }

            html +=  '<tr class="k-grouping-row">' + groupCells(level) +
                      '<td colspan="' + colspan + '" aria-expanded="true">' +
                        '<p class="k-reset">' +
                         '<a class="k-icon k-i-collapse" href="#" tabindex="-1"></a>' + text +
                         '</p></td></tr>';

            if(group.hasSubgroups) {
                for(idx = 0, length = groupItems.length; idx < length; idx++) {
                    html += that._groupRowHtml(groupItems[idx], colspan - 1, level + 1);
                }
            } else {
                html += that._rowsHtml(groupItems);
            }

            if (that.groupFooterTemplate) {
                html += that.groupFooterTemplate(extend(footerDefaults, group.aggregates));
            }
            return html;
        },

        collapseGroup: function(group) {
            group = $(group).find(".k-icon").addClass("k-i-expand").removeClass("k-i-collapse").end();

            var level = group.find(".k-group-cell").length,
                footerCount = 1,
                offset,
                tr;

            group.find("td:first").attr("aria-expanded", false);
            group.nextAll("tr").each(function() {
                tr = $(this);
                offset = tr.find(".k-group-cell").length;

                if (tr.hasClass("k-grouping-row")) {
                    footerCount++;
                } else if (tr.hasClass("k-group-footer")) {
                    footerCount--;
                }

                if (offset <= level || (tr.hasClass("k-group-footer") && footerCount < 0)) {
                    return false;
                }

                tr.hide();
            });
        },

        expandGroup: function(group) {
            group = $(group).find(".k-icon").addClass("k-i-collapse").removeClass("k-i-expand").end();
            var that = this,
                level = group.find(".k-group-cell").length,
                tr,
                offset,
                groupsCount = 1;

            group.find("td:first").attr("aria-expanded", true);
            group.nextAll("tr").each(function () {
                tr = $(this);
                offset = tr.find(".k-group-cell").length;
                if (offset <= level) {
                    return false;
                }

                if (offset == level + 1 && !tr.hasClass("k-detail-row")) {
                    tr.show();

                    if (tr.hasClass("k-grouping-row") && tr.find(".k-icon").hasClass("k-i-collapse")) {
                        that.expandGroup(tr);
                    }

                    if (tr.hasClass("k-master-row") && tr.find(".k-icon").hasClass("k-minus")) {
                        tr.next().show();
                    }
                }

                if (tr.hasClass("k-grouping-row")) {
                    groupsCount ++;
                }

                if (tr.hasClass("k-group-footer")) {
                    if (groupsCount == 1) {
                        tr.show();
                    } else {
                        groupsCount --;
                    }
                }
            });
        },

        _updateHeader: function(groups) {
            var that = this,
                cells = that.thead.find("th.k-group-cell"),
                length = cells.length;

            if(groups > length) {
                $(new Array(groups - length + 1).join('<th class="k-group-cell k-header">&nbsp;</th>')).prependTo(that.thead.find("tr"));
            } else if(groups < length) {
                length = length - groups;
                $(grep(cells, function(item, index) { return length > index; } )).remove();
            }
        },

        _firstDataItem: function(data, grouped) {
            if(data && grouped) {
                if(data.hasSubgroups) {
                    data = this._firstDataItem(data.items[0], grouped);
                } else {
                    data = data.items[0];
                }
            }
            return data;
        },

        hideColumn: function(column) {
            var that = this,
                rows,
                row,
                cell,
                tables,
                idx,
                cols,
                colWidth,
                width = 0,
                length,
                footer = that.footer || that.wrapper.find(".k-grid-footer"),
                columns = that.columns,
                columnIndex,
                browser = kendo.support.browser;

            if (typeof column == "number") {
                column = columns[column];
            } else {
                column = grep(columns, function(item) {
                    return item.field === column;
                })[0];
            }

            if (!column || column.hidden) {
                return;
            }

            columnIndex = inArray(column, visibleColumns(columns));
            column.hidden = true;
            column.attributes = addHiddenStyle(column.attributes);
            column.footerAttributes = addHiddenStyle(column.footerAttributes);
            column.headerAttributes = addHiddenStyle(column.headerAttributes);
            that._templates();

            that._updateCols();
            that.thead.find(">tr>th:not(.k-hierarchy-cell,.k-group-cell):visible").eq(columnIndex).hide();
            if (footer) {
                that._appendCols(footer.find("table:first"));
                footer.find(".k-footer-template>td:not(.k-hierarchy-cell,.k-group-cell):visible").eq(columnIndex).hide();
            }

            rows = that.tbody.children();

            for (idx = 0, length = rows.length; idx < length; idx += 1) {
                row = rows.eq(idx);
                if (row.is(".k-grouping-row,.k-detail-row")) {
                    cell = row.children(":not(.k-group-cell):first,.k-detail-cell").last();
                    cell.attr("colspan", parseInt(cell.attr("colspan"), 10) - 1);
                } else {
                    if (row.hasClass("k-grid-edit-row") && (cell = row.children(".k-edit-container")[0])) {
                        cell = $(cell);
                        cell.attr("colspan", parseInt(cell.attr("colspan"), 10) - 1);
                        cell.find("col").eq(columnIndex).remove();
                        row = cell.find("tr:first");
                    }

                    setCellVisibility(row[0].cells, columnIndex, false);
                }
            }

            cols = that.thead.prev().find("col");
            for (idx = 0, length = cols.length; idx < length; idx += 1) {
                colWidth = cols[idx].style.width;
                if (colWidth && colWidth.indexOf("%") == -1) {
                    width += parseInt(colWidth, 10);
                } else {
                    width = 0;
                    break;
                }
            }

            tables = $(">.k-grid-header table:first,>.k-grid-footer table:first",that.wrapper).add(that.table);
            that._footerWidth = null;

            if (width) {
                tables.width(width);
                that._footerWidth = width;
            }

            if(browser.msie && browser.version == 8) {
                tables.css("display", "inline-table");
                setTimeout(function() {
                    tables.css("display", "table");
                }, 1);
            }

            that.trigger(COLUMNHIDE, { column: column });
        },

        showColumn: function(column) {
            var that = this,
                rows,
                idx,
                length,
                row,
                cell,
                tables,
                width,
                colWidth,
                cols,
                columns = that.columns,
                footer = that.footer || that.wrapper.find(".k-grid-footer"),
                columnIndex;

            if (typeof column == "number") {
                column = columns[column];
            } else {
                column = grep(columns, function(item) {
                    return item.field === column;
                })[0];
            }

            if (!column || !column.hidden) {
                return;
            }

            columnIndex = inArray(column, columns);
            column.hidden = false;
            column.attributes = removeHiddenStyle(column.attributes);
            column.footerAttributes = removeHiddenStyle(column.footerAttributes);
            column.headerAttributes = removeHiddenStyle(column.headerAttributes);
            that._templates();

            that._updateCols();
            that.thead.find(">tr>th:not(.k-hierarchy-cell,.k-group-cell)").eq(columnIndex).show();
            if (footer) {
                that._appendCols(footer.find("table:first"));
                footer.find(".k-footer-template>td:not(.k-hierarchy-cell,.k-group-cell)").eq(columnIndex).show();
            }

            rows = that.tbody.children();
            for (idx = 0, length = rows.length; idx < length; idx += 1) {
                row = rows.eq(idx);
                if (row.is(".k-grouping-row,.k-detail-row")) {
                    cell = row.children(":not(.k-group-cell):first,.k-detail-cell").last();
                    cell.attr("colspan", parseInt(cell.attr("colspan"), 10) + 1);
                } else {
                    if (row.hasClass("k-grid-edit-row") && (cell = row.children(".k-edit-container")[0])) {
                        cell = $(cell);
                        cell.attr("colspan", parseInt(cell.attr("colspan"), 10) + 1);
                        normalizeCols(cell.find(">form>table"), visibleColumns(columns), false,  0);
                        row = cell.find("tr:first");
                    }

                    setCellVisibility(row[0].cells, columnIndex, true);
                }
            }

            tables = $(">.k-grid-header table:first,>.k-grid-footer table:first",that.wrapper).add(that.table);
            if (!column.width) {
                tables.width("");
            } else {
                width = 0;
                cols = that.thead.prev().find("col");
                for (idx = 0, length = cols.length; idx < length; idx += 1) {
                    colWidth = cols[idx].style.width;
                    if (colWidth.indexOf("%") > -1) {
                        width = 0;
                        break;
                    }
                    width += parseInt(colWidth, 10);
                }

                that._footerWidth = null;
                if (width) {
                    tables.width(width);
                    that._footerWidth = width;
                }
            }

            that.trigger(COLUMNSHOW, { column: column });
        },

        _progress: function(toggle) {
            var that = this,
                element = that.element.is("table") ? that.element.parent() : (that.content && that.content.length ? that.content : that.element);

            kendo.ui.progress(element, toggle);
        },

        refresh: function(e) {
            var that = this,
                length,
                idx,
                html = "",
                data = that.dataSource.view(),
                navigatable = that.options.navigatable,
                tbody,
                placeholder,
                currentIndex,
                current = $(that.current()),
                isCurrentInHeader = false,
                groups = (that.dataSource.group() || []).length,
                colspan = groups + visibleColumns(that.columns).length,
                active;

            if (e && e.action === "itemchange" && that.editable) { // skip rebinding if editing is in progress
                return;
            }

            e = e || {};

            if (that.trigger("dataBinding", { action: e.action || "rebind", index: e.index, items: e.items })) {
                return;
            }

            active = activeElement();
            if (navigatable && (that.table[0] === active || $.contains(that.table[0], active) || (that._editContainer && that._editContainer.data("kendoWindow")))) {
                isCurrentInHeader = current.is("th");
                currentIndex = 0;
                if (isCurrentInHeader) {
                    currentIndex = that.thead.find("th:not(.k-group-cell)").index(current);
                }
            }

            that._destroyEditable();

            that._progress(false);

            that._data = [];

            if (!that.columns.length) {
                that._autoColumns(that._firstDataItem(data[0], groups));
                colspan = groups + that.columns.length;
            }

            that._group = groups > 0 || that._group;

            if(that._group) {
                that._templates();
                that._updateCols();
                that._updateHeader(groups);
                that._group = groups > 0;
            }

            if(groups > 0) {
                if (that.detailTemplate) {
                    colspan++;
                }

                if (that.groupFooterTemplate) {
                    that._groupAggregatesDefaultObject = buildEmptyAggregatesObject(that.dataSource.aggregate());
                }

                for (idx = 0, length = data.length; idx < length; idx++) {
                    html += that._groupRowHtml(data[idx], colspan, 0);
                }
            } else {
                html += that._rowsHtml(data);
            }

            if (tbodySupportsInnerHtml) {
                that.tbody[0].innerHTML = html;
            } else {
                placeholder = document.createElement("div");
                placeholder.innerHTML = "<table><tbody>" + html + "</tbody></table>";
                tbody = placeholder.firstChild.firstChild;
                that.table[0].replaceChild(tbody, that.tbody[0]);
                that.tbody = $(tbody);
            }

            that._footer();

            that._setContentHeight();

            if (currentIndex >= 0) {
                that._removeCurrent();
                if (!isCurrentInHeader) {
                    that.current(that.items().eq(currentIndex).children().filter(DATA_CELL).first());
                } else {
                    that.current(that.thead.find("th:not(.k-group-cell)").eq(currentIndex));
                }

                if (that._current) {
                    focusTable(that._current.closest("table")[0], true);
                }
            }

            that.trigger(DATABOUND);
       }
   });

   function getCommand(commands, name) {
       var idx, length, command;

       if (typeof commands === STRING && commands === name) {
          return commands;
       }

       if (isPlainObject(commands) && commands.name === name) {
           return commands;
       }

       if (isArray(commands)) {
           for (idx = 0, length = commands.length; idx < length; idx++) {
               command = commands[idx];

               if ((typeof command === STRING && command === name) || (command.name === name)) {
                   return command;
               }
           }
       }
       return null;
   }

    function focusTable(table, direct) {
        var msie = kendo.support.browser.msie;
        if (direct === true) {
            table = $(table);
            var condition = msie && table.parent().is(".k-grid-content,.k-grid-header-wrap"),
                scrollTop, scrollLeft;
                if (condition) {
                    scrollTop = table.parent().scrollTop();
                    scrollLeft = table.parent().scrollLeft();
                }

                if (msie) {
                    try {
                        //The setActive method does not cause the document to scroll to the active object in the current page
                        table[0].setActive();
                    } catch(e) {
                        table[0].focus();
                    }
                } else {
                    table[0].focus(); //because preventDefault bellow, IE cannot focus the table alternative is unselectable=on
                }

                if (condition) {
                    table.parent().scrollTop(scrollTop);
                    table.parent().scrollLeft(scrollLeft);
                }

        } else {
            $(table).one("focusin", function(e) { e.preventDefault(); }).focus();
        }
    }

   function tableClick(e) {
       var currentTarget = $(e.currentTarget),
           isHeader = currentTarget.is("th"),
           currentTable = currentTarget.closest("table")[0];

       if (currentTable !== this.table[0] && currentTable !== this.thead.parent()[0]) {
           return;
       }

       this.current(currentTarget);

       if (isHeader || !$(e.target).is(":button,a,:input,a>.k-icon,textarea,span.k-icon,.k-input")) {
           setTimeout(function() {
               //DOMElement.focus() only for header, because IE doesn't really focus the table
               focusTable(currentTable, true);
           });
       }

       if (isHeader) {
           e.preventDefault(); //if any problem occurs, call preventDefault only for the clicked header links
       }
   }

   ui.plugin(Grid);
   ui.plugin(VirtualScrollable);
})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "slider",
    name: "Slider",
    category: "web",
    description: "The Slider widget provides a rich input for selecting values or ranges of values.",
    depends: [ "draganddrop" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Draggable = kendo.ui.Draggable,
        extend = $.extend,
        format = kendo.format,
        parse = kendo.parseFloat,
        proxy = $.proxy,
        isArray = $.isArray,
        math = Math,
        support = kendo.support,
        pointers = support.pointers,
        CHANGE = "change",
        SLIDE = "slide",
        NS = ".slider",
        MOUSE_DOWN = "touchstart" + NS + " mousedown" + NS,
        TRACK_MOUSE_DOWN = pointers ? "MSPointerDown" + NS : "mousedown" + NS + " touchstart" + NS,
        MOUSE_UP = "touchend" + NS + " mouseup" + NS,
        MOVE_SELECTION = "moveSelection",
        KEY_DOWN = "keydown" + NS,
        CLICK = "click" + NS,
        MOUSE_OVER = "mouseover" + NS,
        FOCUS = "focus" + NS,
        BLUR = "blur" + NS,
        DRAG_HANDLE = ".k-draghandle",
        TRACK_SELECTOR = ".k-slider-track",
        TICK_SELECTOR = ".k-tick",
        STATE_SELECTED = "k-state-selected",
        STATE_DEFAULT = "k-state-default",
        STATE_DISABLED = "k-state-disabled",
        PRECISION = 3,
        DISABLED = "disabled",
        UNDEFINED = "undefined",
        TABINDEX = "tabindex",
        getTouches = kendo.getTouches;

    var SliderBase = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that._distance = options.max - options.min;
            that._isHorizontal = options.orientation == "horizontal";
            that._isRtl = that._isHorizontal && kendo.support.isRtl(element);
            that._position = that._isHorizontal ? "left" : "bottom";
            that._size = that._isHorizontal ? "width" : "height";
            that._outerSize = that._isHorizontal ? "outerWidth" : "outerHeight";

            options.tooltip.format = options.tooltip.enabled ? options.tooltip.format || "{0}" : "{0}";

            that._createHtml();
            that.wrapper = that.element.closest(".k-slider");
            that._trackDiv = that.wrapper.find(TRACK_SELECTOR);

            that._setTrackDivWidth();

            that._maxSelection = that._trackDiv[that._size]();

            var sizeBetweenTicks = that._maxSelection / ((options.max - options.min) / options.smallStep);
            var pixelWidths = that._calculateItemsWidth(math.floor(that._distance / options.smallStep));

            if (options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
                that._trackDiv.before(createSliderItems(options, that._distance));
                that._setItemsWidth(pixelWidths);
                that._setItemsTitle();
                that._setItemsLargeTick();
            }

            that._calculateSteps(pixelWidths);

            that._tabindex(that.wrapper.find(DRAG_HANDLE));

            that[options.enabled ? "enable" : "disable"]();

            var rtlDirectionSign = kendo.support.isRtl(that.wrapper) ? -1 : 1;

            that._keyMap = {
                37: step(-1 * rtlDirectionSign * options.smallStep), // left arrow
                40: step(-options.smallStep), // down arrow
                39: step(+1 * rtlDirectionSign * options.smallStep), // right arrow
                38: step(+options.smallStep), // up arrow
                35: setValue(options.max), // end
                36: setValue(options.min), // home
                33: step(+options.largeStep), // page up
                34: step(-options.largeStep)  // page down
            };

            kendo.notify(that);
        },

        events: [
            CHANGE,
            SLIDE
        ],

        options: {
            enabled: true,
            min: 0,
            max: 10,
            smallStep: 1,
            largeStep: 5,
            orientation: "horizontal",
            tickPlacement: "both",
            tooltip: { enabled: true, format: "{0}" }
        },

        _setTrackDivWidth: function() {
            var that = this,
                trackDivPosition = parseFloat(that._trackDiv.css(that._isRtl ? "right" : that._position), 10) * 2;

            that._trackDiv[that._size]((that.wrapper[that._size]() - 2) - trackDivPosition);
        },

        _setItemsWidth: function(pixelWidths) {
            var that = this,
                options = that.options,
                first = 0,
                last = pixelWidths.length - 1,
                items = that.wrapper.find(TICK_SELECTOR),
                i,
                paddingTop = 0,
                bordersWidth = 2,
                count = items.length,
                selection = 0;

            for (i = 0; i < count - 2; i++) {
                $(items[i + 1])[that._size](pixelWidths[i]);
            }

            if (that._isHorizontal) {
                $(items[first]).addClass("k-first")[that._size](pixelWidths[last - 1]);
                $(items[last]).addClass("k-last")[that._size](pixelWidths[last]);
            } else {
                $(items[last]).addClass("k-first")[that._size](pixelWidths[last]);
                $(items[first]).addClass("k-last")[that._size](pixelWidths[last - 1]);
            }

            if (that._distance % options.smallStep !== 0 && !that._isHorizontal) {
                for (i = 0; i < pixelWidths.length; i++) {
                    selection += pixelWidths[i];
                }

                paddingTop = that._maxSelection - selection;
                paddingTop += parseFloat(that._trackDiv.css(that._position), 10) + bordersWidth;

                that.wrapper.find(".k-slider-items").css("padding-top", paddingTop);
            }
        },

        _setItemsTitle: function() {
            var that = this,
                options = that.options,
                items = that.wrapper.find(TICK_SELECTOR),
                titleNumber = options.min,
                count = items.length,
                i = that._isHorizontal && !that._isRtl ? 0 : count - 1,
                limit = that._isHorizontal && !that._isRtl ? count : -1,
                increment = that._isHorizontal && !that._isRtl ? 1 : -1;

            for (; i - limit !== 0 ; i += increment) {
                $(items[i]).attr("title", format(options.tooltip.format, round(titleNumber)));
                titleNumber += options.smallStep;
            }
        },

        _setItemsLargeTick: function() {
            var that = this,
                options = that.options,
                i,
                items = that.wrapper.find(TICK_SELECTOR),
                item = {},
                step = round(options.largeStep / options.smallStep);

            if ((1000 * options.largeStep) % (1000 * options.smallStep) === 0) {
                if (that._isHorizontal && !that._isRtl) {
                    for (i = 0; i < items.length; i = round(i + step)) {
                        item = $(items[i]);

                        item.addClass("k-tick-large")
                            .html("<span class='k-label'>" + item.attr("title") + "</span>");
                    }
                } else {
                    for (i = items.length - 1; i >= 0; i = round(i - step)) {
                        item = $(items[i]);

                        item.addClass("k-tick-large")
                            .html("<span class='k-label'>" + item.attr("title") + "</span>");

                        if (!that._isRtl) {
                            if (i !== 0 && i !== items.length - 1) {
                                item.css("line-height", item[that._size]() + "px");
                            }
                        }
                    }
                }
            }
        },

        _calculateItemsWidth: function(itemsCount) {
            var that = this,
                options = that.options,
                trackDivSize = parseFloat(that._trackDiv.css(that._size)) + 1,
                pixelStep = trackDivSize / that._distance,
                itemWidth,
                pixelWidths,
                i;

            if ((that._distance / options.smallStep) - math.floor(that._distance / options.smallStep) > 0) {
                trackDivSize -= ((that._distance % options.smallStep) * pixelStep);
            }

            itemWidth = trackDivSize / itemsCount;
            pixelWidths = [];

            for (i = 0; i < itemsCount - 1; i++) {
                pixelWidths[i] = itemWidth;
            }

            pixelWidths[itemsCount - 1] = pixelWidths[itemsCount] = itemWidth / 2;
            return that._roundWidths(pixelWidths);
        },

        _roundWidths: function(pixelWidthsArray) {
            var balance = 0,
                count = pixelWidthsArray.length,
                i;

            for (i = 0; i < count; i++) {
                balance += (pixelWidthsArray[i] - math.floor(pixelWidthsArray[i]));
                pixelWidthsArray[i] = math.floor(pixelWidthsArray[i]);
            }

            balance = math.round(balance);

            return this._addAdditionalSize(balance, pixelWidthsArray);
        },

        _addAdditionalSize: function(additionalSize, pixelWidthsArray) {
            if (additionalSize === 0) {
                return pixelWidthsArray;
            }

            //set step size
            var step = parseFloat(pixelWidthsArray.length - 1) / parseFloat(additionalSize == 1 ? additionalSize : additionalSize - 1),
                i;

            for (i = 0; i < additionalSize; i++) {
                pixelWidthsArray[parseInt(math.round(step * i), 10)] += 1;
            }

            return pixelWidthsArray;
        },

        _calculateSteps: function(pixelWidths) {
            var that = this,
                options = that.options,
                val = options.min,
                selection = 0,
                itemsCount = math.ceil(that._distance / options.smallStep),
                i = 1,
                lastItem;

            itemsCount += (that._distance / options.smallStep) % 1 === 0 ? 1 : 0;
            pixelWidths.splice(0, 0, pixelWidths[itemsCount - 2] * 2);
            pixelWidths.splice(itemsCount -1, 1, pixelWidths.pop() * 2);

            that._pixelSteps = [selection];
            that._values = [val];

            if (itemsCount === 0) {
                return;
            }

            while (i < itemsCount) {
                selection += (pixelWidths[i - 1] + pixelWidths[i]) / 2;
                that._pixelSteps[i] = selection;
                that._values[i] = val += options.smallStep;

                i++;
            }

            lastItem = that._distance % options.smallStep === 0 ? itemsCount - 1 : itemsCount;

            that._pixelSteps[lastItem] = that._maxSelection;
            that._values[lastItem] = options.max;

            if (that._isRtl) {
                that._pixelSteps.reverse();
                that._values.reverse();
            }
        },

        _getValueFromPosition: function(mousePosition, dragableArea) {
            var that = this,
                options = that.options,
                step = math.max(options.smallStep * (that._maxSelection / that._distance), 0),
                position = 0,
                halfStep = (step / 2),
                i;

            if (that._isHorizontal) {
                position = mousePosition - dragableArea.startPoint;
                if (that._isRtl) {
                    position = that._maxSelection - position;
                }
            } else {
                position = dragableArea.startPoint - mousePosition;
            }

            if (that._maxSelection - ((parseInt(that._maxSelection % step, 10) - 3) / 2) < position) {
                return options.max;
            }

            for (i = 0; i < that._pixelSteps.length; i++) {
                if (math.abs(that._pixelSteps[i] - position) - 1 <= halfStep) {
                    return round(that._values[i]);
                }
            }
        },

        _getFormattedValue: function(val, drag) {
            var that = this,
                html = "",
                tooltip = that.options.tooltip,
                tooltipTemplate,
                selectionStart,
                selectionEnd;

            if (isArray(val)) {
                selectionStart = val[0];
                selectionEnd = val[1];
            } else if (drag && drag.type) {
                selectionStart = drag.selectionStart;
                selectionEnd = drag.selectionEnd;
            }

            if (drag) {
                tooltipTemplate = drag.tooltipTemplate;
            }

            if (!tooltipTemplate && tooltip.template) {
                tooltipTemplate = kendo.template(tooltip.template);
            }

            if (isArray(val) || (drag && drag.type)) {

                if (tooltipTemplate) {
                    html = tooltipTemplate({
                        selectionStart: selectionStart,
                        selectionEnd: selectionEnd
                    });
                } else {
                    selectionStart = format(tooltip.format, selectionStart);
                    selectionEnd = format(tooltip.format, selectionEnd);
                    html = selectionStart + " - " + selectionEnd;
                }
            } else {
                if (drag) {
                    drag.val = val;
                }

                if (tooltipTemplate) {
                    html = tooltipTemplate({
                        value: val
                    });
                } else {
                    html = format(tooltip.format, val);
                }
            }
            return html;
        },

        _getDraggableArea: function() {
            var that = this,
                offset = kendo.getOffset(that._trackDiv);

            return {
                startPoint: that._isHorizontal ? offset.left : offset.top + that._maxSelection,
                endPoint: that._isHorizontal ? offset.left + that._maxSelection : offset.top
            };
        },

        _createHtml: function() {
            var that = this,
                element = that.element,
                options = that.options,
                inputs = element.find("input");

            if (inputs.length == 2) {
                inputs.eq(0).val(options.selectionStart);
                inputs.eq(1).val(options.selectionEnd);
            } else {
                element.val(options.value);
            }

            element.wrap(createWrapper(options, element, that._isHorizontal)).hide();

            if (options.showButtons) {
                element.before(createButton(options, "increase", that._isHorizontal))
                       .before(createButton(options, "decrease", that._isHorizontal));
            }

            element.before(createTrack(options, element));
        },

        _focus: function(e) {
            var that = this,
                target = e.target,
                val = that.value(),
                drag = that._drag;

            if (!drag) {
                if (target == that.wrapper.find(DRAG_HANDLE).eq(0)[0]) {
                    drag = that._firstHandleDrag;
                    that._activeHandle = 0;
                } else {
                    drag = that._lastHandleDrag;
                    that._activeHandle = 1;
                }
                val = val[that._activeHandle];
            }

            $(target).addClass(STATE_SELECTED);

            if (drag) {
                that._activeHandleDrag = drag;

                drag.selectionStart = that.options.selectionStart;
                drag.selectionEnd = that.options.selectionEnd;

                drag._updateTooltip(val);
            }
        },

        _focusWithMouse: function(e) {
            var that = this,
                target = $(e.target),
                idx = target.is(DRAG_HANDLE) ? target.index() : 0;

            window.setTimeout(function(){
                that.wrapper.find(DRAG_HANDLE)[idx == 2 ? 1 : 0].focus();
            }, 1);

            that._setTooltipTimeout();
        },

        _blur: function(e) {
            var that = this,
                drag = that._activeHandleDrag;

            $(e.target).removeClass(STATE_SELECTED);

            if (drag) {
                drag._removeTooltip();
                delete that._activeHandleDrag;
                delete that._activeHandle;
            }
        },

        _setTooltipTimeout: function() {
            var that = this;
            that._tooltipTimeout = window.setTimeout(function(){
                var drag = that._drag || that._activeHandleDrag;
                if (drag) {
                    drag._removeTooltip();
                }
            }, 300);
        },

        _clearTooltipTimeout: function() {
            var that = this;
            window.clearTimeout(this._tooltipTimeout);
            var drag = that._drag || that._activeHandleDrag;
            if (drag && drag.tooltipDiv) {
                drag.tooltipDiv.stop(true, false).css("opacity", 1);
            }
        }
    });

    function createWrapper (options, element, isHorizontal) {
        var orientationCssClass = isHorizontal ? " k-slider-horizontal" : " k-slider-vertical",
            style = options.style ? options.style : element.attr("style"),
            cssClasses = element.attr("class") ? (" " + element.attr("class")) : "",
            tickPlacementCssClass = "";

        if (options.tickPlacement == "bottomRight") {
            tickPlacementCssClass = " k-slider-bottomright";
        } else if (options.tickPlacement == "topLeft") {
            tickPlacementCssClass = " k-slider-topleft";
        }

        style = style ? " style='" + style + "'" : "";

        return "<div class='k-widget k-slider" + orientationCssClass + cssClasses + "'" + style + ">" +
               "<div class='k-slider-wrap" + (options.showButtons ? " k-slider-buttons" : "") + tickPlacementCssClass +
               "'></div></div>";
    }

    function createButton (options, type, isHorizontal) {
        var buttonCssClass = "";

        if (type == "increase") {
            buttonCssClass = isHorizontal ? "k-i-arrow-e" : "k-i-arrow-n";
        } else {
            buttonCssClass = isHorizontal ? "k-i-arrow-w" : "k-i-arrow-s";
        }

        return "<a class='k-button k-button-" + type + "'><span class='k-icon " + buttonCssClass +
               "' title='" + options[type + "ButtonTitle"] + "'>" + options[type + "ButtonTitle"] + "</span></a>";
    }

    function createSliderItems (options, distance) {
        var result = "<ul class='k-reset k-slider-items'>",
            count = math.floor(round(distance / options.smallStep)) + 1,
            i;

        for(i = 0; i < count; i++) {
            result += "<li class='k-tick' role='presentation'>&nbsp;</li>";
        }

        result += "</ul>";

        return result;
    }

    function createTrack (options, element) {
        var dragHandleCount = element.is("input") ? 1 : 2,
            firstDragHandleTitle = dragHandleCount == 2 ? options.leftDragHandleTitle : options.dragHandleTitle;

        return "<div class='k-slider-track'><div class='k-slider-selection'><!-- --></div>" +
               "<a href='#' class='k-draghandle' title='" + firstDragHandleTitle + "' role='slider' aria-valuemin='" + options.min + "' aria-valuemax='" + options.max + "' aria-valuenow='" + (dragHandleCount > 1 ? (options.selectionStart || options.min) : options.value || options.min) + "'>Drag</a>" +
               (dragHandleCount > 1 ? "<a href='#' class='k-draghandle' title='" + options.rightDragHandleTitle + "'role='slider' aria-valuemin='" + options.min + "' aria-valuemax='" + options.max + "' aria-valuenow='" + (options.selectionEnd || options.max) + "'>Drag</a>" : "") +
               "</div>";
    }

    function step(stepValue) {
        return function (value) {
            return value + stepValue;
        };
    }

    function setValue(value) {
        return function () {
            return value;
        };
    }

    function formatValue(value) {
        return (value + "").replace(".", kendo.cultures.current.numberFormat["."]);
    }

    function round(value) {
        value = parseFloat(value, 10);
        var power = math.pow(10, PRECISION || 0);
        return math.round(value * power) / power;
    }

    function parseAttr(element, name) {
        var value = parse(element.getAttribute(name));
        if (value === null) {
            value = undefined;
        }
        return value;
    }

    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    var Slider = SliderBase.extend({
        init: function(element, options) {
            var that = this,
                dragHandle;

            element.type = "text";
            options = extend({}, {
                value: parseAttr(element, "value"),
                min: parseAttr(element, "min"),
                max: parseAttr(element, "max"),
                smallStep: parseAttr(element, "step")
            }, options);

            element = $(element);

            if (options && options.enabled === undefined) {
                options.enabled = !element.is("[disabled]");
            }

            SliderBase.fn.init.call(that, element, options);
            options = that.options;
            if (!defined(options.value) || options.value === null) {
                options.value = options.min;
                element.val(options.min);
            }
            options.value = math.max(math.min(options.value, options.max), options.min);

            dragHandle = that.wrapper.find(DRAG_HANDLE);

            new Slider.Selection(dragHandle, that, options);
            that._drag = new Slider.Drag(dragHandle, "", that, options);
        },

        options: {
            name: "Slider",
            showButtons: true,
            increaseButtonTitle: "Increase",
            decreaseButtonTitle: "Decrease",
            dragHandleTitle: "drag",
            tooltip: { format: "{0}" },
            value: null
        },

        enable: function (enable) {
            var that = this,
                options = that.options,
                clickHandler,
                move;

            that.disable();
            if (enable === false) {
                return;
            }

            that.wrapper
                .removeClass(STATE_DISABLED)
                .addClass(STATE_DEFAULT);

            that.wrapper.find("input").removeAttr(DISABLED);

            clickHandler = function (e) {
                var touch = getTouches(e)[0];

                if (!touch) {
                    return;
                }

                var mousePosition = that._isHorizontal ? touch.location.pageX : touch.location.pageY,
                    dragableArea = that._getDraggableArea(),
                    target = $(e.target);

                if (target.hasClass("k-draghandle")) {
                    target.addClass(STATE_SELECTED);
                    return;
                }

                that._update(that._getValueFromPosition(mousePosition, dragableArea));

                that._focusWithMouse(e);

                that._drag.dragstart(e);
                e.preventDefault();
            };

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR)
                    .on(TRACK_MOUSE_DOWN, clickHandler)
                    .end()
                    .on(TRACK_MOUSE_DOWN, function() {
                        $(document.documentElement).one("selectstart", kendo.preventDefault);
                    });

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, 0)
                .on(MOUSE_UP, function () {
                    that._setTooltipTimeout();
                })
                .on(CLICK, function (e) {
                    that._focusWithMouse(e);
                    e.preventDefault();
                })
                .on(FOCUS, proxy(that._focus, that))
                .on(BLUR, proxy(that._blur, that));

            move = proxy(function (sign) {
                var newVal = that._nextValueByIndex(that._valueIndex + (sign * 1));
                that._setValueInRange(newVal);
                that._drag._updateTooltip(newVal);
            }, that);

            if (options.showButtons) {
                var mouseDownHandler = proxy(function(e, sign) {
                    this._clearTooltipTimeout();
                    if (e.which === 1 || (support.touch && e.which === 0)) {
                        move(sign);

                        this.timeout = setTimeout(proxy(function () {
                            this.timer = setInterval(function () {
                                move(sign);
                            }, 60);
                        }, this), 200);
                    }
                }, that);

                that.wrapper.find(".k-button")
                    .on(MOUSE_UP, proxy(function (e) {
                        this._clearTimer();
                        that._focusWithMouse(e);
                    }, that))
                    .on(MOUSE_OVER, function (e) {
                        $(e.currentTarget).addClass("k-state-hover");
                    })
                    .on("mouseout" + NS, proxy(function (e) {
                        $(e.currentTarget).removeClass("k-state-hover");
                        this._clearTimer();
                    }, that))
                    .eq(0)
                    .on(MOUSE_DOWN, proxy(function (e) {
                        mouseDownHandler(e, 1);
                    }, that))
                    .click(false)
                    .end()
                    .eq(1)
                    .on(MOUSE_DOWN, proxy(function (e) {
                        mouseDownHandler(e, -1);
                    }, that))
                    .click(kendo.preventDefault);
            }

            that.wrapper
                .find(DRAG_HANDLE)
                .off(KEY_DOWN, false)
                .on(KEY_DOWN, proxy(this._keydown, that));

            options.enabled = true;
        },

        disable: function () {
            var that = this;

            that.wrapper
                .removeClass(STATE_DEFAULT)
                .addClass(STATE_DISABLED);

            $(that.element).prop(DISABLED, DISABLED);

            that.wrapper
                .find(".k-button")
                .off(MOUSE_DOWN)
                .on(MOUSE_DOWN, kendo.preventDefault)
                .off(MOUSE_UP)
                .on(MOUSE_UP, kendo.preventDefault)
                .off("mouseleave" + NS)
                .on("mouseleave" + NS, kendo.preventDefault)
                .off(MOUSE_OVER)
                .on(MOUSE_OVER, kendo.preventDefault);

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(TRACK_MOUSE_DOWN);

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, -1)
                .off(MOUSE_UP)
                .off(KEY_DOWN)
                .off(CLICK)
                .off(FOCUS)
                .off(BLUR);

            that.options.enabled = false;
        },

        _update: function (val) {
            var that = this,
                change = that.value() != val;

            that.value(val);

            if (change) {
                that.trigger(CHANGE, { value: that.options.value });
            }
        },

        value: function (value) {
            var that = this,
                options = that.options;

            value = round(value);
            if (isNaN(value)) {
                return options.value;
            }

            if (value >= options.min && value <= options.max) {
                if (options.value != value) {
                    that.element.prop("value", formatValue(value));
                    options.value = value;
                    that._refreshAriaAttr(value);
                    that._refresh();
                }
            }
        },

        _refresh: function () {
            this.trigger(MOVE_SELECTION, { value: this.options.value });
        },

        _refreshAriaAttr: function(value) {
            var that = this,
                drag = that._drag,
                formattedValue;

            if (drag && drag._tooltipDiv) {
                formattedValue = drag._tooltipDiv.text();
            } else {
                formattedValue = that._getFormattedValue(value, null);
            }
            this.wrapper.find(DRAG_HANDLE).attr("aria-valuenow", value).attr("aria-valuetext", formattedValue);
        },

        _clearTimer: function () {
            clearTimeout(this.timeout);
            clearInterval(this.timer);
        },

        _keydown: function (e) {
            var that = this;

            if (e.keyCode in that._keyMap) {
                that._clearTooltipTimeout();
                that._setValueInRange(that._keyMap[e.keyCode](that.options.value));
                that._drag._updateTooltip(that.value());
                e.preventDefault();
            }
        },

        _setValueInRange: function (val) {
            var that = this,
                options = that.options;

            val = round(val);
            if (isNaN(val)) {
                that._update(options.min);
                return;
            }

            val = math.max(math.min(val, options.max), options.min);
            that._update(val);
        },

        _nextValueByIndex: function (index) {
            var count = this._values.length;
            if (this._isRtl) {
                index = count - 1 - index;
            }
            return this._values[math.max(0, math.min(index, count - 1))];
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.wrapper.off(NS)
                .find(".k-button").off(NS)
                .end()
                .find(DRAG_HANDLE).off(NS)
                .end()
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(NS)
                .end();

            that._drag.draggable.destroy();
        }
    });

    Slider.Selection = function (dragHandle, that, options) {
        function moveSelection (val) {
            var selectionValue = val - options.min,
                index = that._valueIndex = math.ceil(round(selectionValue / options.smallStep)),
                selection = parseInt(that._pixelSteps[index], 10),
                selectionDiv = that._trackDiv.find(".k-slider-selection"),
                halfDragHanndle = parseInt(dragHandle[that._outerSize]() / 2, 10),
                rtlCorrection = that._isRtl ? 2 : 0;

            selectionDiv[that._size](that._isRtl ? that._maxSelection - selection : selection);
            dragHandle.css(that._position, selection - halfDragHanndle - rtlCorrection);
        }

        moveSelection(options.value);

        that.bind([CHANGE, SLIDE, MOVE_SELECTION], function (e) {
            moveSelection(parseFloat(e.value, 10));
        });
    };

    Slider.Drag = function (dragHandle, type, owner, options) {
        var that = this;
        that.owner = owner;
        that.options = options;
        that.dragHandle = dragHandle;
        that.dragHandleSize = dragHandle[owner._outerSize]();
        that.type = type;

        that.draggable = new Draggable(dragHandle, {
            distance: 0,
            dragstart: proxy(that._dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that),
            dragcancel: proxy(that.dragcancel, that)
        });

        dragHandle.click(false);
    };

    Slider.Drag.prototype = {
        dragstart: function(e) {
            // HACK to initiate click on the line
            this.draggable.userEvents._start(e);
        },

        _dragstart: function(e) {
            var that = this,
                owner = that.owner,
                options = that.options;

            if (!options.enabled) {
                e.preventDefault();
                return;
            }

            owner.element.off(MOUSE_OVER);
            that.dragHandle.addClass(STATE_SELECTED);
            $(document.documentElement).css("cursor", "pointer");

            that.dragableArea = owner._getDraggableArea();
            that.step = math.max(options.smallStep * (owner._maxSelection / owner._distance), 0);

            if (that.type) {
                that.selectionStart = options.selectionStart;
                that.selectionEnd = options.selectionEnd;
                owner._setZIndex(that.type);
            } else {
                that.oldVal = that.val = options.value;
            }

            that._removeTooltip(true);
            that._createTooltip();
        },

        _createTooltip: function() {
            var that = this,
                owner = that.owner,
                tooltip = that.options.tooltip,
                html = '',
                wnd = $(window),
                tooltipTemplate, colloutCssClass;

            if (!tooltip.enabled) {
                return;
            }

            if (tooltip.template) {
                tooltipTemplate = that.tooltipTemplate = kendo.template(tooltip.template);
            }

            $(".k-slider-tooltip").remove(); // if user changes window while tooltip is visible, a second one will be created
            that.tooltipDiv = $("<div class='k-widget k-tooltip k-slider-tooltip'><!-- --></div>").appendTo(document.body);

            html = owner._getFormattedValue(that.val || owner.value(), that);

            if (!that.type) {
                colloutCssClass = "k-callout-" + (owner._isHorizontal ? 's' : 'e');
                that.tooltipInnerDiv = "<div class='k-callout " + colloutCssClass + "'><!-- --></div>";
                html += that.tooltipInnerDiv;
            }

            that.tooltipDiv.html(html);

            that._scrollOffset = {
                top: wnd.scrollTop(),
                left: wnd.scrollLeft()
            };

            that.moveTooltip();
        },

        drag: function (e) {
            var that = this,
                owner = that.owner,
                x = e.x.location,
                y = e.y.location,
                startPoint = that.dragableArea.startPoint,
                endPoint = that.dragableArea.endPoint,
                slideParams;

            e.preventDefault();

            if (owner._isHorizontal) {
                if (owner._isRtl) {
                    that.val = that.constrainValue(x, startPoint, endPoint, x < endPoint);
                } else {
                    that.val = that.constrainValue(x, startPoint, endPoint, x >= endPoint);
                }
            } else {
                that.val = that.constrainValue(y, endPoint, startPoint, y <= endPoint);
            }

            if (that.oldVal != that.val) {
                that.oldVal = that.val;

                if (that.type) {
                    if (that.type == "firstHandle") {
                        if (that.val < that.selectionEnd) {
                            that.selectionStart = that.val;
                        } else {
                            that.selectionStart = that.selectionEnd = that.val;
                        }
                    } else {
                        if (that.val > that.selectionStart) {
                            that.selectionEnd = that.val;
                        } else {
                            that.selectionStart = that.selectionEnd = that.val;
                        }
                    }
                    slideParams = {
                        values: [that.selectionStart, that.selectionEnd],
                        value: [that.selectionStart, that.selectionEnd]
                    };
                } else {
                    slideParams = { value: that.val };
                }

                owner.trigger(SLIDE, slideParams);
            }

            that._updateTooltip(that.val);
        },

        _updateTooltip: function(val) {
            var that = this,
                options = that.options,
                tooltip = options.tooltip,
                html = "";

            if (!tooltip.enabled) {
                return;
            }

            if (!that.tooltipDiv) {
                that._createTooltip();
            }

            html = that.owner._getFormattedValue(round(val), that);

            if (!that.type) {
                html += that.tooltipInnerDiv;
            }

            that.tooltipDiv.html(html);
            that.moveTooltip();
        },

        dragcancel: function() {
            this.owner._refresh();
            $(document.documentElement).css("cursor", "");
            return this._end();
        },

        dragend: function() {
            var that = this,
                owner = that.owner;

            $(document.documentElement).css("cursor", "");

            if (that.type) {
                owner._update(that.selectionStart, that.selectionEnd);
            } else {
                owner._update(that.val);
            }

            return that._end();
        },

        _end: function() {
            var that = this,
                owner = that.owner;

            owner._focusWithMouse({"target":that.dragHandle[0]});

            owner.element.on(MOUSE_OVER);

            return false;
        },

        _removeTooltip: function(noAnimation) {
            var that = this,
                owner = that.owner;

            if (that.tooltipDiv && owner.options.tooltip.enabled && owner.options.enabled) {
                if (noAnimation) {
                    that.tooltipDiv.remove();
                    that.tooltipDiv = null;
                } else {
                    that.tooltipDiv.fadeOut("slow", function(){
                        $(this).remove();
                        that.tooltipDiv = null;
                    });
                }
            }
        },

        moveTooltip: function () {
            var that = this,
                owner = that.owner,
                top = 0,
                left = 0,
                dragHandle = that.dragHandle,
                offset = kendo.getOffset(dragHandle),
                margin = 8,
                viewport = $(window),
                callout = that.tooltipDiv.find(".k-callout"),
                width = that.tooltipDiv.outerWidth(),
                height = that.tooltipDiv.outerHeight(),
                dragHandles, sdhOffset, diff, anchorSize;

            if (that.type) {
                dragHandles = owner.wrapper.find(DRAG_HANDLE);
                offset = kendo.getOffset(dragHandles.eq(0));
                sdhOffset = kendo.getOffset(dragHandles.eq(1));

                if (owner._isHorizontal) {
                    top = sdhOffset.top;
                    left = offset.left + ((sdhOffset.left - offset.left) / 2);
                } else {
                    top = offset.top + ((sdhOffset.top - offset.top) / 2);
                    left = sdhOffset.left;
                }

                anchorSize = dragHandles.eq(0).outerWidth() + 2 * margin;
            } else {
                top = offset.top;
                left = offset.left;
                anchorSize = dragHandle.outerWidth() + 2 * margin;
            }

            if (owner._isHorizontal) {
                left -= parseInt((width - dragHandle[owner._outerSize]()) / 2, 10);
                top -= height + callout.height() + margin;
            } else {
                top -= parseInt((height - dragHandle[owner._outerSize]()) / 2, 10);
                left -= width + callout.width() + margin;
            }

            if (owner._isHorizontal) {
                diff = that._flip(top, height, anchorSize, viewport.outerHeight() + that._scrollOffset.top);
                top += diff;
                left += that._fit(left, width, viewport.outerWidth() + that._scrollOffset.left);
            } else {
                diff = that._flip(left, width, anchorSize, viewport.outerWidth() + that._scrollOffset.left);
                top += that._fit(top, height, viewport.outerHeight() + that._scrollOffset.top);
                left += diff;
            }

            if (diff > 0 && callout) {
                callout.removeClass();
                callout.addClass("k-callout k-callout-" + (owner._isHorizontal ? "n" : "w"));
            }

            that.tooltipDiv.css({ top: top, left: left });
        },

        _fit: function(position, size, viewPortEnd) {
            var output = 0;

            if (position + size > viewPortEnd) {
                output = viewPortEnd - (position + size);
            }

            if (position < 0) {
                output = -position;
            }

            return output;
        },

        _flip: function(offset, size, anchorSize, viewPortEnd) {
            var output = 0;

            if (offset + size > viewPortEnd) {
                output += -(anchorSize + size);
            }

            if (offset + output < 0) {
                output += anchorSize + size;
            }

            return output;
        },

        constrainValue: function (position, min, max, maxOverflow) {
            var that = this,
                val = 0;

            if (min < position && position < max) {
                val = that.owner._getValueFromPosition(position, that.dragableArea);
            } else {
                if (maxOverflow ) {
                    val = that.options.max;
                } else {
                    val = that.options.min;
                }
            }

            return val;
        }

    };

    kendo.ui.plugin(Slider);

    var RangeSlider = SliderBase.extend({
        init: function(element, options) {
            var that = this,
                inputs = $(element).find("input"),
                firstInput = inputs.eq(0)[0],
                secondInput = inputs.eq(1)[0];

            firstInput.type = "text";
            secondInput.type = "text";

            options = extend({}, {
                selectionStart: parseAttr(firstInput, "value"),
                min: parseAttr(firstInput, "min"),
                max: parseAttr(firstInput, "max"),
                smallStep: parseAttr(firstInput, "step")
            }, {
                selectionEnd: parseAttr(secondInput, "value"),
                min: parseAttr(secondInput, "min"),
                max: parseAttr(secondInput, "max"),
                smallStep: parseAttr(secondInput, "step")
            }, options);

            if (options && options.enabled === undefined) {
                options.enabled = !inputs.is("[disabled]");
            }

            SliderBase.fn.init.call(that, element, options);
            options = that.options;
            if (!defined(options.selectionStart) || options.selectionStart === null) {
                options.selectionStart = options.min;
                inputs.eq(0).val(options.min);
            }

            if (!defined(options.selectionEnd) || options.selectionEnd === null) {
                options.selectionEnd = options.max;
                inputs.eq(1).val(options.max);
            }

            var dragHandles = that.wrapper.find(DRAG_HANDLE);

            new RangeSlider.Selection(dragHandles, that, options);
            that._firstHandleDrag = new Slider.Drag(dragHandles.eq(0), "firstHandle", that, options);
            that._lastHandleDrag = new Slider.Drag(dragHandles.eq(1), "lastHandle" , that, options);
        },

        options: {
            name: "RangeSlider",
            leftDragHandleTitle: "drag",
            rightDragHandleTitle: "drag",
            tooltip: { format: "{0}" },
            selectionStart: null,
            selectionEnd: null
        },

        enable: function (enable) {
            var that = this,
                options = that.options,
                clickHandler;

            that.disable();
            if (enable === false) {
                return;
            }

            that.wrapper
                .removeClass(STATE_DISABLED)
                .addClass(STATE_DEFAULT);

            that.wrapper.find("input").removeAttr(DISABLED);

            clickHandler = function (e) {
                var touch = getTouches(e)[0];

                if (!touch) {
                    return;
                }

                var mousePosition = that._isHorizontal ? touch.location.pageX : touch.location.pageY,
                    dragableArea = that._getDraggableArea(),
                    val = that._getValueFromPosition(mousePosition, dragableArea),
                    target = $(e.target),
                    idx;

                if (target.hasClass("k-draghandle")) {
                    target.addClass(STATE_SELECTED);
                    return;
                }

                if (val < options.selectionStart) {
                    that._setValueInRange(val, options.selectionEnd);
                    that._firstHandleDrag.dragstart(e);
                    idx = 0;
                } else if (val > that.selectionEnd) {
                    that._setValueInRange(options.selectionStart, val);
                    that._lastHandleDrag.dragstart(e);
                    idx = 1;
                } else {
                    if (val - options.selectionStart <= options.selectionEnd - val) {
                        that._setValueInRange(val, options.selectionEnd);
                        that._firstHandleDrag.dragstart(e);
                        idx = 0;
                    } else {
                        that._setValueInRange(options.selectionStart, val);
                        that._lastHandleDrag.dragstart(e);
                        idx = 1;
                    }
                }
                that._focusWithMouse({"target":that.wrapper.find(DRAG_HANDLE)[idx]});
            };

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR)
                    .on(TRACK_MOUSE_DOWN, clickHandler)
                    .end()
                    .on(TRACK_MOUSE_DOWN, function() {
                        $(document.documentElement).one("selectstart", kendo.preventDefault);
                    });

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, 0)
                .on(MOUSE_UP, function () {
                    that._setTooltipTimeout();
                })
                .on(CLICK, function (e) {
                    that._focusWithMouse(e);
                    e.preventDefault();
                })
                .on(FOCUS, proxy(that._focus, that))
                .on(BLUR, proxy(that._blur, that));

            that.wrapper.find(DRAG_HANDLE)
                .off(KEY_DOWN, kendo.preventDefault)
                .eq(0).on(KEY_DOWN,
                    proxy(function(e) {
                        this._keydown(e, "firstHandle");
                    }, that)
                )
                .end()
                .eq(1).on(KEY_DOWN,
                    proxy(function(e) {
                        this._keydown(e, "lastHandle");
                    }, that)
                );

            that.options.enabled = true;
        },

        disable: function () {
            var that = this;

            that.wrapper
                .removeClass(STATE_DEFAULT)
                .addClass(STATE_DISABLED);

            that.wrapper.find("input").prop(DISABLED, DISABLED);

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(TRACK_MOUSE_DOWN);

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, -1)
                .off(MOUSE_UP)
                .off(KEY_DOWN)
                .off(CLICK)
                .off(FOCUS)
                .off(BLUR);

            that.options.enabled = false;
        },

        _keydown: function (e, handle) {
            var that = this,
                selectionStartValue = that.options.selectionStart,
                selectionEndValue = that.options.selectionEnd,
                dragSelectionStart,
                dragSelectionEnd,
                activeHandleDrag;

            if (e.keyCode in that._keyMap) {

                that._clearTooltipTimeout();

                if (handle == "firstHandle") {
                    activeHandleDrag = that._activeHandleDrag = that._firstHandleDrag;
                    selectionStartValue = that._keyMap[e.keyCode](selectionStartValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionEndValue = selectionStartValue;
                    }
                } else {
                    activeHandleDrag = that._activeHandleDrag = that._lastHandleDrag;
                    selectionEndValue = that._keyMap[e.keyCode](selectionEndValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionStartValue = selectionEndValue;
                    }
                }

                that._setValueInRange(selectionStartValue, selectionEndValue);

                dragSelectionStart = Math.max(selectionStartValue, that.options.selectionStart);
                dragSelectionEnd = Math.min(selectionEndValue, that.options.selectionEnd);

                activeHandleDrag.selectionEnd = Math.max(dragSelectionEnd, that.options.selectionStart);
                activeHandleDrag.selectionStart = Math.min(dragSelectionStart, that.options.selectionEnd);

                activeHandleDrag._updateTooltip(that.value()[that._activeHandle]);

                e.preventDefault();
            }
        },

        _update: function (selectionStart, selectionEnd) {
            var that = this,
                values = that.value();

            var change = values[0] != selectionStart || values[1] != selectionEnd;

            that.value([selectionStart, selectionEnd]);

            if (change) {
                that.trigger(CHANGE, {
                    values: [selectionStart, selectionEnd],
                    value: [selectionStart, selectionEnd]
                });
            }
        },

        value: function(value) {
            if (value && value.length) {
                return this._value(value[0], value[1]);
            } else {
                return this._value();
            }
        },

        _value: function(start, end) {
            var that = this,
                options = that.options,
                selectionStart = options.selectionStart,
                selectionEnd = options.selectionEnd;

            if (isNaN(start) && isNaN(end)) {
                return [selectionStart, selectionEnd];
            } else {
                start = round(start);
                end = round(end);
            }

            if (start >= options.min && start <= options.max &&
                end >= options.min && end <= options.max && start <= end) {
                if (selectionStart != start || selectionEnd != end) {
                    that.element.find("input")
                        .eq(0).prop("value", formatValue(start))
                        .end()
                        .eq(1).prop("value", formatValue(end));

                    options.selectionStart = start;
                    options.selectionEnd = end;
                    that._refresh();
                    that._refreshAriaAttr(start, end);
                }
            }
        },

        values: function (start, end) {
            if (isArray(start)) {
                return this._value(start[0], start[1]);
            } else {
                return this._value(start, end);
            }
        },

        _refresh: function() {
            var that = this,
                options = that.options;

            that.trigger(MOVE_SELECTION, {
                values: [options.selectionStart, options.selectionEnd],
                value: [options.selectionStart, options.selectionEnd]
            });

            if (options.selectionStart == options.max && options.selectionEnd == options.max) {
                that._setZIndex("firstHandle");
            }
        },

        _refreshAriaAttr: function(start, end) {
            var that = this,
                dragHandles = that.wrapper.find(DRAG_HANDLE),
                drag = that._activeHandleDrag,
                formattedValue;

            formattedValue = that._getFormattedValue([start, end], drag);

            dragHandles.eq(0).attr("aria-valuenow", start);
            dragHandles.eq(1).attr("aria-valuenow", end);
            dragHandles.attr("aria-valuetext", formattedValue);
        },

        _setValueInRange: function (selectionStart, selectionEnd) {
            var options = this.options;

            selectionStart = math.max(math.min(selectionStart, options.max), options.min);

            selectionEnd = math.max(math.min(selectionEnd, options.max), options.min);

            if (selectionStart == options.max && selectionEnd == options.max) {
                this._setZIndex("firstHandle");
            }

            this._update(math.min(selectionStart, selectionEnd), math.max(selectionStart, selectionEnd));
        },

        _setZIndex: function (type) {
            this.wrapper.find(DRAG_HANDLE).each(function (index) {
                $(this).css("z-index", type == "firstHandle" ? 1 - index : index);
            });
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.wrapper.off(NS)
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(NS)
                .end()
                .find(DRAG_HANDLE).off(NS);

            that._firstHandleDrag.draggable.destroy();
            that._lastHandleDrag.draggable.destroy();
        }
    });

    RangeSlider.Selection = function (dragHandles, that, options) {
        function moveSelection(value) {
            value = value || [];
            var selectionStartValue = value[0] - options.min,
                selectionEndValue = value[1] - options.min,
                selectionStartIndex = math.ceil(round(selectionStartValue / options.smallStep)),
                selectionEndIndex = math.ceil(round(selectionEndValue / options.smallStep)),
                selectionStart = that._pixelSteps[selectionStartIndex],
                selectionEnd = that._pixelSteps[selectionEndIndex],
                halfHandle = parseInt(dragHandles.eq(0)[that._outerSize]() / 2, 10),
                rtlCorrection = that._isRtl ? 2 : 0;

            dragHandles.eq(0).css(that._position, selectionStart - halfHandle - rtlCorrection)
                       .end()
                       .eq(1).css(that._position, selectionEnd - halfHandle - rtlCorrection);

            makeSelection(selectionStart, selectionEnd);
        }

        function makeSelection(selectionStart, selectionEnd) {
            var selection,
                selectionPosition,
                selectionDiv = that._trackDiv.find(".k-slider-selection");

            selection = math.abs(selectionStart - selectionEnd);

            selectionDiv[that._size](selection);
            if (that._isRtl) {
                selectionPosition = math.max(selectionStart, selectionEnd);
                selectionDiv.css("right", that._maxSelection - selectionPosition - 1);
            } else {
                selectionPosition = math.min(selectionStart, selectionEnd);
                selectionDiv.css(that._position, selectionPosition - 1);
            }
        }

        moveSelection(that.value());

        that.bind([ CHANGE, SLIDE, MOVE_SELECTION ], function (e) {
            moveSelection(e.values);
        });
    };

    kendo.ui.plugin(RangeSlider);

})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "splitter",
    name: "Splitter",
    category: "web",
    description: "The Splitter widget provides an easy way to create a dynamic layout of resizable and collapsible panes.",
    depends: [ "resizable" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        extend = $.extend,
        proxy = $.proxy,
        Widget = ui.Widget,
        pxUnitsRegex = /^\d+(\.\d+)?px$/i,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        NS = ".kendoSplitter",
        EXPAND = "expand",
        COLLAPSE = "collapse",
        CONTENTLOAD = "contentLoad",
        RESIZE = "resize",
        LAYOUTCHANGE = "layoutChange",
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        MOUSEENTER = "mouseenter",
        CLICK = "click",
        PANE = "pane",
        MOUSELEAVE = "mouseleave",
        FOCUSED = "k-state-focused",
        KPANE = "k-" + PANE,
        PANECLASS = "." + KPANE;

    function isPercentageSize(size) {
        return percentageUnitsRegex.test(size);
    }

    function isPixelSize(size) {
        return pxUnitsRegex.test(size) || /^\d+$/.test(size);
    }

    function isFluid(size) {
        return !isPercentageSize(size) && !isPixelSize(size);
    }

    function panePropertyAccessor(propertyName, triggersResize) {
        return function(pane, value) {
            var paneConfig = this.element.find(pane).data(PANE);

            if (arguments.length == 1) {
                return paneConfig[propertyName];
            }

            paneConfig[propertyName] = value;

            if (triggersResize) {
                var splitter = this.element.data("kendoSplitter");
                splitter.trigger(RESIZE);
            }
        };
    }

    var Splitter = Widget.extend({
        init: function(element, options) {
            var that = this,
                isHorizontal;

            Widget.fn.init.call(that, element, options);

            that.wrapper = that.element;

            isHorizontal = that.options.orientation.toLowerCase() != VERTICAL;
            that.orientation = isHorizontal ? HORIZONTAL : VERTICAL;
            that._dimension = isHorizontal ? "width" : "height";
            that._keys = {
                decrease: isHorizontal ? keys.LEFT : keys.UP,
                increase: isHorizontal ? keys.RIGHT : keys.DOWN
            };

            that._resizeStep = 10;

            that.bind(RESIZE, proxy(that._resize, that));

            that._marker = kendo.guid().substring(0, 8);

            that._initPanes();

            that._resizeHandler = function() {
                that.trigger(RESIZE);
            };

            that._attachEvents();

            $(window).on("resize", that._resizeHandler);

            that.resizing = new PaneResizing(that);

            that.element.triggerHandler("init.kendoSplitter");
        },
        events: [
            EXPAND,

            COLLAPSE,

            CONTENTLOAD,

            RESIZE,

            LAYOUTCHANGE
        ],

        _attachEvents: function() {
            var that = this,
                orientation = that.options.orientation,
                splitbarDraggableSelector = "> .k-splitbar-draggable-" + orientation;

            // do not use delegated events to increase performance of nested elements
            that.element
                .find(splitbarDraggableSelector)
                    .on("keydown" + NS, $.proxy(that._keydown, that))
                    .on("mousedown" + NS, function(e) { e.currentTarget.focus(); })
                    .on("focus" + NS, function(e) { $(e.currentTarget).addClass(FOCUSED);  })
                    .on("blur" + NS, function(e) { $(e.currentTarget).removeClass(FOCUSED); that.resizing.end(); })
                    .on(MOUSEENTER + NS, function() { $(this).addClass("k-splitbar-" + that.orientation + "-hover"); })
                    .on(MOUSELEAVE + NS, function() { $(this).removeClass("k-splitbar-" + that.orientation + "-hover"); })
                    .on("mousedown" + NS, function() { that._panes().append("<div class='k-splitter-overlay k-overlay' />"); })
                    .on("mouseup" + NS, function() { that._panes().children(".k-splitter-overlay").remove(); })
                .end()
                .on(CLICK + NS, ".k-splitbar .k-collapse-next, .k-splitbar .k-collapse-prev", that._arrowClick(COLLAPSE))
                .on(CLICK + NS, ".k-splitbar .k-expand-next, .k-splitbar .k-expand-prev", that._arrowClick(EXPAND))
                .on("dblclick" + NS, ".k-splitbar", proxy(that._togglePane, that))
                .parent().closest(".k-splitter").each(function() {
                    var parentSplitter = $(this),
                        splitter = parentSplitter.data("kendoSplitter");

                    if (splitter) {
                        splitter.bind(RESIZE, that._resizeHandler);
                    } else {
                        parentSplitter.one("init" + NS, function() {
                            $(this).data("kendoSplitter").bind(RESIZE, that._resizeHandler);
                            that._resizeHandler();
                        });
                    }
                });
        },

        options: {
            name: "Splitter",
            orientation: HORIZONTAL,
            panes: []
        },

        destroy: function() {
            var that = this,
                orientation = that.options.orientation,
                splitbarDraggableSelector = "> .k-splitbar-draggable-" + orientation;

            Widget.fn.destroy.call(that);

            that.element.off(NS)
                .find(splitbarDraggableSelector).off(NS);

            that.resizing.destroy();

            $(window).off("resize", that._resizeHandler);

            kendo.destroy(that.element);
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                resizing = that.resizing,
                target = $(e.currentTarget),
                navigationKeys = that._keys,
                increase = key === navigationKeys.increase,
                decrease = key === navigationKeys.decrease,
                pane;

            if (increase || decrease) {
                if (e.ctrlKey) {
                    pane = target[decrease ? "next" : "prev"]();

                    if (resizing.isResizing()) {
                        resizing.end();
                    }

                    if (!pane[that._dimension]()) {
                        that._triggerAction(EXPAND, pane);
                    } else {
                        that._triggerAction(COLLAPSE, target[decrease ? "prev" : "next"]());
                    }
                } else {
                    resizing.move((decrease ? -1 : 1) * that._resizeStep, target);
                }
                e.preventDefault();
            } else if (key === keys.ENTER) {
                resizing.end();
                e.preventDefault();
            }
        },

        _initPanes: function() {
            var that = this,
                panesConfig = that.options.panes || [];

            that.element
                .addClass("k-widget").addClass("k-splitter")
                .children()
                .each(function (index, pane) {
                    var config = panesConfig && panesConfig[index];

                    pane = $(pane).attr("role", "group").addClass(KPANE);

                    pane.data(PANE, config ? config : {})
                        .toggleClass("k-scrollable", config ? config.scrollable !== false : true);
                    that.ajaxRequest(pane);
                })
                .end();

            that.trigger(RESIZE);
        },

        ajaxRequest: function(pane, url, data) {
            var that = this,
                paneConfig;

            pane = that.element.find(pane);
            paneConfig = pane.data(PANE);

            url = url || paneConfig.contentUrl;

            if (url) {
                pane.append("<span class='k-icon k-loading k-pane-loading' />");

                if (kendo.isLocalUrl(url)) {
                    jQuery.ajax({
                        url: url,
                        data: data || {},
                        type: "GET",
                        dataType: "html",
                        success: function (data) {
                            pane.html(data);

                            that.trigger(CONTENTLOAD, { pane: pane[0] });
                        }
                    });
                } else {
                    pane.removeClass("k-scrollable")
                        .html("<iframe src='" + url + "' frameborder='0' class='k-content-frame'>" +
                                "This page requires frames in order to show content" +
                              "</iframe>");
                }
            }
        },
        _triggerAction: function(type, pane) {
            if (!this.trigger(type, { pane: pane[0] })) {
                this[type](pane[0]);
            }
        },

        _togglePane: function(e) {
            var that = this,
                target = $(e.target),
                arrow;

            if (target.closest(".k-splitter")[0] != that.element[0]) {
                return;
            }

            arrow = target.children(".k-icon:not(.k-resize-handle)");

            if (arrow.length !== 1) {
                return;
            }

            if (arrow.is(".k-collapse-prev")) {
                that._triggerAction(COLLAPSE, target.prev());
            } else if (arrow.is(".k-collapse-next")) {
                that._triggerAction(COLLAPSE, target.next());
            } else if (arrow.is(".k-expand-prev")) {
                that._triggerAction(EXPAND, target.prev());
            } else if (arrow.is(".k-expand-next")) {
                that._triggerAction(EXPAND, target.next());
            }
        },
        _arrowClick: function (arrowType) {
            var that = this;

            return function(e) {
                var target = $(e.target),
                    pane;

                if (target.closest(".k-splitter")[0] != that.element[0]) {
                    return;
                }

                if (target.is(".k-" + arrowType + "-prev")) {
                    pane = target.parent().prev();
                } else {
                    pane = target.parent().next();
                }
                that._triggerAction(arrowType, pane);
            };
        },
        _updateSplitBar: function(splitbar, previousPane, nextPane) {
            var catIconIf = function(iconType, condition) {
                   return condition ? "<div class='k-icon " + iconType + "' />" : "";
                },
                orientation = this.orientation,
                draggable = (previousPane.resizable !== false) && (nextPane.resizable !== false),
                prevCollapsible = previousPane.collapsible,
                prevCollapsed = previousPane.collapsed,
                nextCollapsible = nextPane.collapsible,
                nextCollapsed = nextPane.collapsed;

            splitbar.addClass("k-splitbar k-state-default k-splitbar-" + orientation)
                    .attr("role", "separator")
                    .attr("aria-expanded", !(prevCollapsed || nextCollapsed))
                    .removeClass("k-splitbar-" + orientation + "-hover")
                    .toggleClass("k-splitbar-draggable-" + orientation,
                        draggable && !prevCollapsed && !nextCollapsed)
                    .toggleClass("k-splitbar-static-" + orientation,
                        !draggable && !prevCollapsible && !nextCollapsible)
                    .html(
                        catIconIf("k-collapse-prev", prevCollapsible && !prevCollapsed && !nextCollapsed) +
                        catIconIf("k-expand-prev", prevCollapsible && prevCollapsed && !nextCollapsed) +
                        catIconIf("k-resize-handle", draggable) +
                        catIconIf("k-collapse-next", nextCollapsible && !nextCollapsed && !prevCollapsed) +
                        catIconIf("k-expand-next", nextCollapsible && nextCollapsed && !prevCollapsed)
                    );
        },
        _updateSplitBars: function() {
            var that = this;

            this.element.children(".k-splitbar").each(function() {
                var splitbar = $(this),
                    previousPane = splitbar.prev(PANECLASS).data(PANE),
                    nextPane = splitbar.next(PANECLASS).data(PANE);

                if (!nextPane) {
                    return;
                }

                that._updateSplitBar(splitbar, previousPane, nextPane);
            });
        },
        _panes: function() {
            return this.element.children(PANECLASS);
        },
        _resize: function() {
            var that = this,
                element = that.element,
                panes = element.children(":not(.k-splitbar)"),
                isHorizontal = that.orientation == HORIZONTAL,
                splitBars = element.children(".k-splitbar"),
                splitBarsCount = splitBars.length,
                sizingProperty = isHorizontal ? "width" : "height",
                totalSize = element[sizingProperty]();

            if (splitBarsCount === 0) {
                splitBarsCount = panes.length - 1;
                panes.slice(0, splitBarsCount)
                     .after("<div tabindex='0' class='k-splitbar' data-marker='" + that._marker + "' />");

                that._updateSplitBars();
                splitBars = element.children(".k-splitbar");
            } else {
                that._updateSplitBars();
            }

            // discard splitbar sizes from total size
            splitBars.each(function() {
                totalSize -= this[isHorizontal ? "offsetWidth" : "offsetHeight"];
            });

            var sizedPanesWidth = 0,
                sizedPanesCount = 0,
                freeSizedPanes = $();

            panes.css({ position: "absolute", top: 0 })
                [sizingProperty](function() {
                    var config = $(this).data(PANE) || {}, size;

                    if (config.collapsed) {
                        size = 0;
                        $(this).css("overflow", "hidden");
                    } else if (isFluid(config.size)) {
                        freeSizedPanes = freeSizedPanes.add(this);
                        return;
                    } else { // sized in px/%, not collapsed
                        size = parseInt(config.size, 10);

                        if (isPercentageSize(config.size)) {
                            size = Math.floor(size * totalSize / 100);
                        }
                    }

                    sizedPanesCount++;
                    sizedPanesWidth += size;

                    return size;
                });

            totalSize -= sizedPanesWidth;

            var freeSizePanesCount = freeSizedPanes.length,
                freeSizePaneWidth = Math.floor(totalSize / freeSizePanesCount);

            freeSizedPanes
                .slice(0, freeSizePanesCount - 1)
                    .css(sizingProperty, freeSizePaneWidth)
                .end()
                .eq(freeSizePanesCount - 1)
                    .css(sizingProperty, totalSize - (freeSizePanesCount - 1) * freeSizePaneWidth);

            // arrange panes
            var sum = 0,
                alternateSizingProperty = isHorizontal ? "height" : "width",
                positioningProperty = isHorizontal ? "left" : "top",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight";

            if (freeSizePanesCount === 0) {
                var lastNonCollapsedPane = panes.filter(function() {
                    return !(($(this).data(PANE) || {}).collapsed);
                }).last();

                lastNonCollapsedPane[sizingProperty](totalSize + lastNonCollapsedPane[0][sizingDomProperty]);
            }

            element.children()
                .css(alternateSizingProperty, element[alternateSizingProperty]())
                .each(function (i, child) {
                    child.style[positioningProperty] = Math.floor(sum) + "px";
                    sum += child[sizingDomProperty];
                });

            that.trigger(LAYOUTCHANGE);
        },

        toggle: function(pane, expand) {
            var paneConfig;

            pane = this.element.find(pane);
            paneConfig = pane.data(PANE);

            if (!expand && !paneConfig.collapsible) {
                return;
            }

            if (arguments.length == 1) {
                expand = paneConfig.collapsed === undefined ? false : paneConfig.collapsed;
            }

            paneConfig.collapsed = !expand;

            if (paneConfig.collapsed) {
                pane.css("overflow", "hidden");
            } else {
                pane.css("overflow", "");
            }

            this.trigger(RESIZE);

            this.resizing.destroy();
            this.resizing = new PaneResizing(this);
        },

        collapse: function(pane) {
            this.toggle(pane, false);
        },

        expand: function(pane) {
            this.toggle(pane, true);
        },

        size: panePropertyAccessor("size", true),

        min: panePropertyAccessor("min"),

        max: panePropertyAccessor("max")
    });

    ui.plugin(Splitter);

    var verticalDefaults = {
            sizingProperty: "height",
            sizingDomProperty: "offsetHeight",
            alternateSizingProperty: "width",
            positioningProperty: "top",
            mousePositioningProperty: "pageY"
        };

    var horizontalDefaults = {
            sizingProperty: "width",
            sizingDomProperty: "offsetWidth",
            alternateSizingProperty: "height",
            positioningProperty: "left",
            mousePositioningProperty: "pageX"
        };

    function PaneResizing(splitter) {
        var that = this,
            orientation = splitter.orientation;

        that.owner = splitter;
        that._element = splitter.element;
        that.orientation = orientation;

        extend(that, orientation === HORIZONTAL ? horizontalDefaults : verticalDefaults);

        that._resizable = new kendo.ui.Resizable(splitter.element, {
            orientation: orientation,
            handle: ".k-splitbar-draggable-" + orientation + "[data-marker=" + splitter._marker + "]",
            hint: proxy(that._createHint, that),
            start: proxy(that._start, that),
            max: proxy(that._max, that),
            min: proxy(that._min, that),
            invalidClass:"k-restricted-size-" + orientation,
            resizeend: proxy(that._stop, that)
        });
    }

    PaneResizing.prototype = {
        press: function(target) {
            this._resizable.press(target);
        },

        move: function(delta, target) {
            if (!this.pressed) {
                this.press(target);
                this.pressed = true;
            }

            if (!this._resizable.target) {
                this._resizable.press(target);
            }

            this._resizable.move(delta);
        },

        end: function() {
            this._resizable.end();
            this.pressed = false;
        },

        destroy: function() {
            this._resizable.destroy();
        },

        isResizing: function() {
            return this._resizable.resizing;
        },

        _createHint: function(handle) {
            var that = this;
            return $("<div class='k-ghost-splitbar k-ghost-splitbar-" + that.orientation + " k-state-default' />")
                        .css(that.alternateSizingProperty, handle[that.alternateSizingProperty]());
        },

        _start: function(e) {
            var that = this,
                splitbar = $(e.currentTarget),
                previousPane = splitbar.prev(),
                nextPane = splitbar.next(),
                previousPaneConfig = previousPane.data(PANE),
                nextPaneConfig = nextPane.data(PANE),
                prevBoundary = parseInt(previousPane[0].style[that.positioningProperty], 10),
                nextBoundary = parseInt(nextPane[0].style[that.positioningProperty], 10) + nextPane[0][that.sizingDomProperty] - splitbar[0][that.sizingDomProperty],
                totalSize = parseInt(that._element.css(that.sizingProperty), 10),
                toPx = function (value) {
                    var val = parseInt(value, 10);
                    return (isPixelSize(value) ? val : (totalSize * val) / 100) || 0;
                },
                prevMinSize = toPx(previousPaneConfig.min),
                prevMaxSize = toPx(previousPaneConfig.max) || nextBoundary - prevBoundary,
                nextMinSize = toPx(nextPaneConfig.min),
                nextMaxSize = toPx(nextPaneConfig.max) || nextBoundary - prevBoundary;

            that.previousPane = previousPane;
            that.nextPane = nextPane;
            that._maxPosition = Math.min(nextBoundary - nextMinSize, prevBoundary + prevMaxSize);
            that._minPosition = Math.max(prevBoundary + prevMinSize, nextBoundary - nextMaxSize);
        },
        _max: function() {
              return this._maxPosition;
        },
        _min: function() {
            return this._minPosition;
        },
        _stop: function(e) {
            var that = this,
                splitbar = $(e.currentTarget),
                owner = that.owner;

            owner._panes().children(".k-splitter-overlay").remove();

            if (e.keyCode !== kendo.keys.ESC) {
                var ghostPosition = e.position,
                    previousPane = splitbar.prev(),
                    nextPane = splitbar.next(),
                    previousPaneConfig = previousPane.data(PANE),
                    nextPaneConfig = nextPane.data(PANE),
                    previousPaneNewSize = ghostPosition - parseInt(previousPane[0].style[that.positioningProperty], 10),
                    nextPaneNewSize = parseInt(nextPane[0].style[that.positioningProperty], 10) + nextPane[0][that.sizingDomProperty] - ghostPosition - splitbar[0][that.sizingDomProperty],
                    fluidPanesCount = that._element.children(PANECLASS).filter(function() { return isFluid($(this).data(PANE).size); }).length;

                if (!isFluid(previousPaneConfig.size) || fluidPanesCount > 1) {
                    if (isFluid(previousPaneConfig.size)) {
                        fluidPanesCount--;
                    }

                    previousPaneConfig.size = previousPaneNewSize + "px";
                }

                if (!isFluid(nextPaneConfig.size) || fluidPanesCount > 1) {
                    nextPaneConfig.size = nextPaneNewSize + "px";
                }

                owner.trigger(RESIZE);
            }

            return false;
        }
    };

})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "userevents",
    name: "User Events",
    category: "framework",
    depends: [ "core" ],
    hidden: true
});

(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        pointers = support.pointers,
        document = window.document,
        SURFACE = $(document.documentElement),
        Class = kendo.Class,
        Observable = kendo.Observable,
        now = $.now,
        extend = $.extend,
        OS = support.mobileOS,
        invalidZeroEvents = OS && OS.android,

        // UserEvents events
        PRESS = "press",
        SELECT = "select",
        START = "start",
        MOVE = "move",
        END = "end",
        CANCEL = "cancel",
        TAP = "tap",
        GESTURESTART = "gesturestart",
        GESTURECHANGE = "gesturechange",
        GESTUREEND = "gestureend",
        GESTURETAP = "gesturetap";

    function touchDelta(touch1, touch2) {
        var x1 = touch1.x.location,
            y1 = touch1.y.location,
            x2 = touch2.x.location,
            y2 = touch2.y.location,
            dx = x1 - x2,
            dy = y1 - y2;

        return {
            center: {
               x: (x1 + x2) / 2,
               y: (y1 + y2) / 2
            },

            distance: Math.sqrt(dx*dx + dy*dy)
        };
    }

    function getTouches(e) {
        var touches = [],
            originalEvent = e.originalEvent,
            currentTarget = e.currentTarget,
            idx = 0, length,
            changedTouches,
            touch;

        if (e.api) {
            touches.push({
                id: 2,  // hardcoded ID for API call;
                event: e,
                target: e.target,
                currentTarget: e.target,
                location: e
            });
        }
        else if (e.type.match(/touch/)) {
            changedTouches = originalEvent ? originalEvent.changedTouches : [];
            for (length = changedTouches.length; idx < length; idx ++) {
                touch = changedTouches[idx];
                touches.push({
                    location: touch,
                    event: e,
                    target: touch.target,
                    currentTarget: currentTarget,
                    id: touch.identifier
                });
            }
        }
        else if (support.pointers) {
            touches.push({
                location: originalEvent,
                event: e,
                target: e.target,
                currentTarget: currentTarget,
                id: originalEvent.pointerId
            });
        } else {
            touches.push({
                id: 1, // hardcoded ID for mouse event;
                event: e,
                target: e.target,
                currentTarget: currentTarget,
                location: e
            });
        }

        return touches;
    }

    var TouchAxis = Class.extend({
        init: function(axis, location) {
            var that = this;

            that.axis = axis;

            that._updateLocationData(location);

            that.startLocation = that.location;
            that.velocity = that.delta = 0;
            that.timeStamp = now();
        },

        move: function(location) {
            var that = this,
                offset = location["page" + that.axis],
                timeStamp = now(),
                timeDelta = (timeStamp - that.timeStamp) || 1; // Firing manually events in tests can make this 0;

            if (!offset && invalidZeroEvents) {
                return;
            }

            that.delta = offset - that.location;

            that._updateLocationData(location);

            that.initialDelta = offset - that.startLocation;
            that.velocity = that.delta / timeDelta;
            that.timeStamp = timeStamp;
        },

        _updateLocationData: function(location) {
            var that = this, axis = that.axis;

            that.location = location["page" + axis];
            that.client = location["client" + axis];
            that.screen = location["screen" + axis];
        }
    });

    var Touch = Class.extend({
        init: function(userEvents, target, touchInfo) {
            var that = this;

            extend(that, {
                x: new TouchAxis("X", touchInfo.location),
                y: new TouchAxis("Y", touchInfo.location),
                userEvents: userEvents,
                target: target,
                currentTarget: touchInfo.currentTarget,
                initialTouch: touchInfo.target,
                id: touchInfo.id,
                _moved: false,
                _finished: false
            });

            that.notifyInit = function() {
                that._trigger(PRESS, touchInfo);
            };
        },

        move: function(touchInfo) {
            var that = this;

            if (that._finished) { return; }

            that.x.move(touchInfo.location);
            that.y.move(touchInfo.location);

            if (!that._moved) {
                if (that._withinIgnoreThreshold()) {
                    return;
                }

                if (!UserEvents.current || UserEvents.current === that.userEvents) {
                    that._start(touchInfo);
                } else {
                    return that.dispose();
                }
            }

            // Event handlers may cancel the drag in the START event handler, hence the double check for pressed.
            if (!that._finished) {
                that._trigger(MOVE, touchInfo);
            }
        },

        end: function(touchInfo) {
            var that = this;

            that.endTime = now();

            if (that._finished) { return; }

            if (that._moved) {
                that._trigger(END, touchInfo);
            } else {
                that._trigger(TAP, touchInfo);
            }

            that.dispose();
        },

        dispose: function() {
            var that = this,
                userEvents = that.userEvents,
                activeTouches = userEvents.touches;

            that._finished = true;

            activeTouches.splice($.inArray(that, activeTouches), 1);
        },

        skip: function() {
            this.dispose();
        },

        cancel: function() {
            this.dispose();
        },

        isMoved: function() {
            return this._moved;
        },

        _start: function(touchInfo) {
            this.startTime = now();
            this._moved = true;
            this._trigger(START, touchInfo);
        },

        _trigger: function(name, touchInfo) {
            var that = this,
                jQueryEvent = touchInfo.event,
                data = {
                    touch: that,
                    x: that.x,
                    y: that.y,
                    target: that.target,
                    event: jQueryEvent
                };

            if(that.userEvents.notify(name, data)) {
                jQueryEvent.preventDefault();
            }
        },

        _withinIgnoreThreshold: function() {
            var xDelta = this.x.initialDelta,
                yDelta = this.y.initialDelta;

            return Math.sqrt(xDelta * xDelta + yDelta * yDelta) <= this.userEvents.threshold;
        }
    });

    function preventTrigger(e) {
        e.preventDefault();

        var target = $(e.data.root),   // Determine the correct parent to receive the event and bubble.
            parent = target.closest(".k-widget").parent();

        if (!parent[0]) {
            parent = target.parent();
        }

        parent.trigger($.Event(e.type, { target: target[0] }));
    }

    var UserEvents = Observable.extend({
        init: function(element, options) {
            var that = this,
                filter,
                ns = kendo.guid();

            options = options || {};
            filter = that.filter = options.filter;
            that.threshold = options.threshold || 0;
            that.touches = [];
            that._maxTouches = options.multiTouch ? 2 : 1;
            that.allowSelection = options.allowSelection;
            that.eventNS = ns;

            element = $(element).handler(that);
            Observable.fn.init.call(that);

            extend(that, {
                element: element,
                surface: options.global ? SURFACE : options.surface || element,
                stopPropagation: options.stopPropagation,
                pressed: false
            });

            that.surface.handler(that)
                .on(kendo.applyEventMap("move", ns), "_move")
                .on(kendo.applyEventMap("up cancel", ns), "_end");

            element.on(kendo.applyEventMap("down", ns), filter, "_start");

            if (pointers) {
                element.css("-ms-touch-action", "pinch-zoom double-tap-zoom");
            }

            if (options.preventDragEvent) {
                element.on(kendo.applyEventMap("dragstart", ns), kendo.preventDefault);
            }

            element.on(kendo.applyEventMap("mousedown selectstart", ns), filter, { root: element }, "_select");

            if (support.eventCapture) {
                var downEvents = kendo.eventMap.up.split(" "),
                    idx = 0,
                    length = downEvents.length,
                    surfaceElement = that.surface[0],
                    preventIfMoving = function(e) {
                        if (that._isMoved()) {
                            e.preventDefault();
                        }
                    };

                for(; idx < length; idx ++) {
                    surfaceElement.addEventListener(downEvents[idx], preventIfMoving, true);
                }
            }

            that.bind([
            PRESS,
            TAP,
            START,
            MOVE,
            END,
            CANCEL,
            GESTURESTART,
            GESTURECHANGE,
            GESTUREEND,
            GESTURETAP,
            SELECT
            ], options);
        },

        destroy: function() {
            var that = this;
            that.element.kendoDestroy(that.eventNS);
            that.surface.kendoDestroy(that.eventNS);
            that._disposeAll();
            that.unbind();
        },

        capture: function() {
            UserEvents.current = this;
        },

        cancel: function() {
            this._disposeAll();
            this.trigger(CANCEL);
        },

        notify: function(eventName, data) {
            var that = this,
                touches = that.touches;

            if (this._isMultiTouch()) {
                switch(eventName) {
                    case MOVE:
                        eventName = GESTURECHANGE;
                        break;
                    case END:
                        eventName = GESTUREEND;
                        break;
                    case TAP:
                        eventName = GESTURETAP;
                        break;
                }

                extend(data, {touches: touches}, touchDelta(touches[0], touches[1]));
            }

            return this.trigger(eventName, data);
        },

        // API
        press: function(x, y, target) {
            this._apiCall("_start", x, y, target);
        },

        move: function(x, y) {
            this._apiCall("_move", x, y);
        },

        end: function(x, y) {
            this._apiCall("_end", x, y);
        },

        _isMultiTouch: function() {
            return this.touches.length > 1;
        },

        _maxTouchesReached: function() {
            return this.touches.length >= this._maxTouches;
        },

        _disposeAll: function() {
            $.each(this.touches, function() {
                this.dispose();
            });
        },

        _isMoved: function() {
            return $.grep(this.touches, function(touch) {
                return touch.isMoved();
            }).length;
        },

        _select: function(e) {
           if (!this.allowSelection || this.trigger(SELECT, { event: e })) {
                preventTrigger(e);
           }
        },

        _start: function(e) {
            var that = this,
                idx = 0,
                filter = that.filter,
                target,
                touches = getTouches(e),
                length = touches.length,
                touch;

            if (that._maxTouchesReached()) {
                return;
            }

            UserEvents.current = null;

            that.currentTarget = e.currentTarget;

            if (that.stopPropagation) {
                e.stopPropagation();
            }

            for (; idx < length; idx ++) {
                if (that._maxTouchesReached()) {
                    break;
                }

                touch = touches[idx];

                if (filter) {
                    target = $(touch.currentTarget); // target.is(filter) ? target : target.closest(filter, that.element);
                } else {
                    target = that.element;
                }

                if (!target.length) {
                    continue;
                }

                touch = new Touch(that, target, touch);
                that.touches.push(touch);
                touch.notifyInit();

                if (that._isMultiTouch()) {
                    that.notify("gesturestart", {});
                }
            }
        },

        _move: function(e) {
            this._eachTouch("move", e);
        },

        _end: function(e) {
            this._eachTouch("end", e);
        },

        _eachTouch: function(methodName, e) {
            var that = this,
                dict = {},
                touches = getTouches(e),
                activeTouches = that.touches,
                idx,
                touch,
                touchInfo,
                matchingTouch;

            for (idx = 0; idx < activeTouches.length; idx ++) {
                touch = activeTouches[idx];
                dict[touch.id] = touch;
            }

            for (idx = 0; idx < touches.length; idx ++) {
                touchInfo = touches[idx];
                matchingTouch = dict[touchInfo.id];

                if (matchingTouch) {
                    matchingTouch[methodName](touchInfo);
                }
            }
        },

        _apiCall: function(type, x, y, target) {
            this[type]({
                api: true,
                pageX: x,
                pageY: y,
                target: target || this.element,
                stopPropagation: $.noop,
                preventDefault: $.noop
            });
        }
    });

    kendo.getTouches = getTouches;
    kendo.touchDelta = touchDelta;
    kendo.UserEvents = UserEvents;
 })(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "draganddrop",
    name: "Drag & drop",
    category: "framework",
    description: "Drag & drop functionality for any DOM element.",
    depends: [ "core", "userevents" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        document = window.document,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        Observable = kendo.Observable,
        UserEvents = kendo.UserEvents,
        proxy = $.proxy,
        extend = $.extend,
        getOffset = kendo.getOffset,
        draggables = {},
        dropTargets = {},
        dropAreas = {},
        lastDropTarget,
        OS = support.mobileOS,
        invalidZeroEvents = OS && OS.android,
        mobileChrome = (invalidZeroEvents && OS.browser == "chrome"),
        KEYUP = "keyup",
        CHANGE = "change",

        // Draggable events
        DRAGSTART = "dragstart",
        DRAG = "drag",
        DRAGEND = "dragend",
        DRAGCANCEL = "dragcancel",

        // DropTarget events
        DRAGENTER = "dragenter",
        DRAGLEAVE = "dragleave",
        DROP = "drop";

    function contains(parent, child) {
        try {
            return $.contains(parent, child) || parent == child;
        } catch (e) {
            return false;
        }
    }

    function elementUnderCursor(e) {
        if (mobileChrome) {
            return document.elementFromPoint(e.x.screen, e.y.screen);
        } else {
            return document.elementFromPoint(e.x.client, e.y.client);
        }
    }

    function numericCssPropery(element, property) {
        return parseInt(element.css(property), 10) || 0;
    }

    function within(value, range) {
        return Math.min(Math.max(value, range.min), range.max);
    }

    function containerBoundaries(container, element) {
        var offset = getOffset(container),
            minX = offset.left + numericCssPropery(container, "borderLeftWidth") + numericCssPropery(container, "paddingLeft"),
            minY = offset.top + numericCssPropery(container, "borderTopWidth") + numericCssPropery(container, "paddingTop"),
            maxX = minX + container.width() - element.outerWidth(true),
            maxY = minY + container.height() - element.outerHeight(true);

        return {
            x: { min: minX, max: maxX },
            y: { min: minY, max: maxY }
        };
    }

    function checkTarget(target, targets, areas) {
        var theTarget, theFilter, i = 0,
            targetLen = targets && targets.length,
            areaLen = areas && areas.length;

        while (target && target.parentNode) {
            for (i = 0; i < targetLen; i ++) {
                theTarget = targets[i];
                if (theTarget.element[0] === target) {
                    return { target: theTarget, targetElement: target };
                }
            }

            for (i = 0; i < areaLen; i ++) {
                theFilter = areas[i];
                if (support.matchesSelector.call(target, theFilter.options.filter)) {
                    return { target: theFilter, targetElement: target };
                }
            }

            target = target.parentNode;
        }

        return undefined;
    }

    var TapCapture = Observable.extend({
        init: function(element, options) {
            var that = this,
                domElement = element[0];

            that.capture = false;
            $.each(kendo.eventMap.down.split(" "), function() {
                domElement.addEventListener(this, proxy(that._press, that), true);
            });
            $.each(kendo.eventMap.up.split(" "), function() {
                domElement.addEventListener(this, proxy(that._release, that), true);
            });

            Observable.fn.init.call(that);

            that.bind(["press", "release"], options || {});
        },

        captureNext: function() {
            this.capture = true;
        },

        cancelCapture: function() {
            this.capture = false;
        },

        _press: function(e) {
            var that = this;
            that.trigger("press");
            if (that.capture) {
                e.preventDefault();
            }
        },

        _release: function(e) {
            var that = this;
            that.trigger("release");

            if (that.capture) {
                e.preventDefault();
                that.cancelCapture();
            }
        }
    });

    var PaneDimension = Observable.extend({
        init: function(options) {
            var that = this;
            Observable.fn.init.call(that);

            that.forcedEnabled = false;

            $.extend(that, options);

            that.scale = 1;
            that.max = 0;

            if (that.horizontal) {
                that.measure = "width";
                that.scrollSize = "scrollWidth";
                that.axis = "x";
            } else {
                that.measure = "height";
                that.scrollSize = "scrollHeight";
                that.axis = "y";
            }
        },

        outOfBounds: function(offset) {
            return  offset > this.max || offset < this.min;
        },

        forceEnabled: function() {
            this.forcedEnabled = true;
        },

        getSize: function() {
            return this.container[this.measure]();
        },

        getTotal: function() {
            return this.element[0][this.scrollSize];
        },

        rescale: function(scale) {
            this.scale = scale;
        },

        update: function(silent) {
            var that = this,
                total = that.getTotal(),
                scaledTotal = total * that.scale,
                size = that.getSize();

            that.size = size;
            that.total = scaledTotal;
            that.min = Math.min(that.max, that.size - scaledTotal);
            that.minScale = that.size / total;

            that.enabled = that.forcedEnabled || (scaledTotal > size);

            if (!silent) {
                that.trigger(CHANGE, that);
            }
        }
    });

    var PaneDimensions = Observable.extend({
        init: function(options) {
            var that = this,
                refresh = proxy(that.refresh, that);

            Observable.fn.init.call(that);

            that.x = new PaneDimension(extend({horizontal: true}, options));
            that.y = new PaneDimension(extend({horizontal: false}, options));
            that.forcedMinScale = options.minScale;

            that.bind(CHANGE, options);

            kendo.onResize(refresh);
        },

        rescale: function(newScale) {
            this.x.rescale(newScale);
            this.y.rescale(newScale);
            this.refresh();
        },

        refresh: function() {
            var that = this;
            that.x.update();
            that.y.update();
            that.enabled = that.x.enabled || that.y.enabled;
            that.minScale = that.forcedMinScale || Math.max(that.x.minScale, that.y.minScale);
            that.trigger(CHANGE);
        }
    });

    var PaneAxis = Observable.extend({
        init: function(options) {
            var that = this;
            extend(that, options);
            Observable.fn.init.call(that);
        },

        dragMove: function(delta) {
            var that = this,
                dimension = that.dimension,
                axis = that.axis,
                movable = that.movable,
                position = movable[axis] + delta;

            if (!dimension.enabled) {
                return;
            }

            if ((position < dimension.min && delta < 0) || (position > dimension.max && delta > 0)) {
                delta *= that.resistance;
            }

            movable.translateAxis(axis, delta);
            that.trigger(CHANGE, that);
        }
    });

    var Pane = Class.extend({

        init: function(options) {
            var that = this,
                x,
                y,
                resistance,
                movable;

            extend(that, {elastic: true}, options);

            resistance = that.elastic ? 0.5 : 0;
            movable = that.movable;

            that.x = x = new PaneAxis({
                axis: "x",
                dimension: that.dimensions.x,
                resistance: resistance,
                movable: movable
            });

            that.y = y = new PaneAxis({
                axis: "y",
                dimension: that.dimensions.y,
                resistance: resistance,
                movable: movable
            });

            that.userEvents.bind(["move", "end", "gesturestart", "gesturechange"], {
                gesturestart: function(e) {
                    that.gesture = e;
                },

                gesturechange: function(e) {
                    var previousGesture = that.gesture,
                        previousCenter = previousGesture.center,

                        center = e.center,

                        scaleDelta = e.distance / previousGesture.distance,

                        minScale = that.dimensions.minScale,
                        coordinates;

                    if (movable.scale <= minScale && scaleDelta < 1) {
                        // Resist shrinking. Instead of shrinking from 1 to 0.5, it will shrink to 0.5 + (1 /* minScale */ - 0.5) * 0.8 = 0.9;
                        scaleDelta += (1 - scaleDelta) * 0.8;
                    }

                    coordinates = {
                        x: (movable.x - previousCenter.x) * scaleDelta + center.x - movable.x,
                        y: (movable.y - previousCenter.y) * scaleDelta + center.y - movable.y
                    };

                    movable.scaleWith(scaleDelta);

                    x.dragMove(coordinates.x);
                    y.dragMove(coordinates.y);

                    that.dimensions.rescale(movable.scale);
                    that.gesture = e;
                },

                move: function(e) {
                    if (x.dimension.enabled || y.dimension.enabled) {
                        x.dragMove(e.x.delta);
                        y.dragMove(e.y.delta);
                        e.preventDefault();
                    } else {
                        e.touch.skip();
                    }
                },

                end: function(e) {
                    e.preventDefault();
                }
            });
        }
    });

    var TRANSFORM_STYLE = support.transitions.prefix + "Transform",
        round = Math.round,
        translate;

    if (support.hasHW3D) {
        translate = function(x, y, scale) {
            return "translate3d(" + round(x) + "px," + round(y) +"px,0) scale(" + scale + ")";
        };
    } else {
        translate = function(x, y, scale) {
            return "translate(" + round(x) + "px," + round(y) +"px) scale(" + scale + ")";
        };
    }

    var Movable = Observable.extend({
        init: function(element) {
            var that = this;

            Observable.fn.init.call(that);

            that.element = $(element);
            that.element[0].style.webkitTransformOrigin = "left top";
            that.x = 0;
            that.y = 0;
            that.scale = 1;
            that._saveCoordinates(translate(that.x, that.y, that.scale));
        },

        translateAxis: function(axis, by) {
            this[axis] += by;
            this.refresh();
        },

        scaleTo: function(scale) {
            this.scale = scale;
            this.refresh();
        },

        scaleWith: function(scaleDelta) {
            this.scale *= scaleDelta;
            this.refresh();
        },

        translate: function(coordinates) {
            this.x += coordinates.x;
            this.y += coordinates.y;
            this.refresh();
        },

        moveAxis: function(axis, value) {
            this[axis] = value;
            this.refresh();
        },

        moveTo: function(coordinates) {
            extend(this, coordinates);
            this.refresh();
        },

        refresh: function() {
            var that = this,
                newCoordinates = translate(that.x, that.y, that.scale);

            if (newCoordinates != that.coordinates) {
                that.element[0].style[TRANSFORM_STYLE] = newCoordinates;
                that._saveCoordinates(newCoordinates);
                that.trigger(CHANGE);
            }
        },

        _saveCoordinates: function(coordinates) {
            this.coordinates = coordinates;
        }
    });

    var DropTarget = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            var group = that.options.group;

            if (!(group in dropTargets)) {
                dropTargets[group] = [ that ];
            } else {
                dropTargets[group].push( that );
            }
        },

        events: [
            DRAGENTER,
            DRAGLEAVE,
            DROP
        ],

        options: {
            name: "DropTarget",
            group: "default"
        },

        destroy: function() {
            var groupName = this.options.group,
                group = dropTargets[groupName] || dropAreas[groupName],
                i;

            if (group.length > 1) {
                Widget.fn.destroy.call(this);

                for (i = 0; i < group.length; i++) {
                    if (group[i] == this) {
                        group.splice(i, 1);
                        break;
                    }
                }
            } else {
                DropTarget.destroyGroup(groupName);
            }
        },

        _trigger: function(eventName, e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                return that.trigger(eventName, extend({}, e.event, {
                           draggable: draggable,
                           dropTarget: e.dropTarget
                       }));
            }
        },

        _over: function(e) {
            this._trigger(DRAGENTER, e);
        },

        _out: function(e) {
            this._trigger(DRAGLEAVE, e);
        },

        _drop: function(e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                draggable.dropped = !that._trigger(DROP, e);
            }
        }
    });

    DropTarget.destroyGroup = function(groupName) {
        var group = dropTargets[groupName] || dropAreas[groupName],
            i;

        if (group) {
            for (i = 0; i < group.length; i++) {
                Widget.fn.destroy.call(group[i]);
            }

            group.length = 0;
            delete dropTargets[groupName];
            delete dropAreas[groupName];
        }
    };

    DropTarget._cache = dropTargets;

    var DropTargetArea = DropTarget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            var group = that.options.group;

            if (!(group in dropAreas)) {
                dropAreas[group] = [ that ];
            } else {
                dropAreas[group].push( that );
            }
        },

        options: {
            name: "DropTargetArea",
            group: "default",
            filter: null
        }
    });

    var Draggable = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.userEvents = new UserEvents(that.element, {
                global: true,
                stopPropagation: true,
                filter: that.options.filter,
                threshold: that.options.distance,
                start: proxy(that._start, that),
                move: proxy(that._drag, that),
                end: proxy(that._end, that),
                cancel: proxy(that._cancel, that)
            });

            that._afterEndHandler = proxy(that._afterEnd, that);
            that.captureEscape = function(e) {
                if (e.keyCode === kendo.keys.ESC) {
                    that._trigger(DRAGCANCEL, {event: e});
                    that.userEvents.cancel();
                }
            };
        },

        events: [
            DRAGSTART,
            DRAG,
            DRAGEND,
            DRAGCANCEL
        ],

        options: {
            name: "Draggable",
            distance: 5,
            group: "default",
            cursorOffset: null,
            axis: null,
            container: null,
            dropped: false
        },

        _updateHint: function(e) {
            var that = this,
                coordinates,
                options = that.options,
                boundaries = that.boundaries,
                axis = options.axis,
                cursorOffset = that.options.cursorOffset;

            if (cursorOffset) {
               coordinates = { left: e.x.location + cursorOffset.left, top: e.y.location + cursorOffset.top };
            } else {
               that.hintOffset.left += e.x.delta;
               that.hintOffset.top += e.y.delta;
               coordinates = $.extend({}, that.hintOffset);
            }

            if (boundaries) {
                coordinates.top = within(coordinates.top, boundaries.y);
                coordinates.left = within(coordinates.left, boundaries.x);
            }

            if (axis === "x") {
                delete coordinates.top;
            } else if (axis === "y") {
                delete coordinates.left;
            }

            that.hint.css(coordinates);
        },

        _start: function(e) {
            var that = this,
                options = that.options,
                container = options.container,
                hint = options.hint;

            that.currentTarget = e.target;
            that.currentTargetOffset = getOffset(that.currentTarget);

            if (hint) {
                if (that.hint) {
                    that.hint.stop(true, true).remove();
                }

                that.hint = $.isFunction(hint) ? $(hint.call(that, that.currentTarget)) : hint;

                var offset = getOffset(that.currentTarget);
                that.hintOffset = offset;

                that.hint.css( {
                    position: "absolute",
                    zIndex: 20000, // the Window's z-index is 10000 and can be raised because of z-stacking
                    left: offset.left,
                    top: offset.top
                })
                .appendTo(document.body);
            }

            draggables[options.group] = that;

            that.dropped = false;

            if (container) {
                that.boundaries = containerBoundaries(container, that.hint);
            }

            if (that._trigger(DRAGSTART, e)) {
                that.userEvents.cancel();
                that._afterEnd();
            }

            $(document).on(KEYUP, that.captureEscape);
        },

        _drag: function(e) {
            var that = this;

            e.preventDefault();

            that._withDropTarget(e, function(target, targetElement) {
                if (!target) {
                    if (lastDropTarget) {
                        lastDropTarget._trigger(DRAGLEAVE, extend(e, { dropTarget: $(lastDropTarget.targetElement) }));
                        lastDropTarget = null;
                    }
                    return;
                }

                if (lastDropTarget) {
                    if (targetElement === lastDropTarget.targetElement) {
                        return;
                    }

                    lastDropTarget._trigger(DRAGLEAVE, extend(e, { dropTarget: $(lastDropTarget.targetElement) }));
                }

                target._trigger(DRAGENTER, extend(e, { dropTarget: $(targetElement) }));
                lastDropTarget = extend(target, { targetElement: targetElement });
            });

            that._trigger(DRAG, e);

            if (that.hint) {
                that._updateHint(e);
            }
        },

        _end: function(e) {
            var that = this;

            that._withDropTarget(e, function(target, targetElement) {
                if (target) {
                    target._drop(extend({}, e, { dropTarget: $(targetElement) }));
                    lastDropTarget = null;
                }
            });

            that._trigger(DRAGEND, e);
            that._cancel(e.event);
        },

        _cancel: function() {
            var that = this;

            if (that.hint && !that.dropped) {
                setTimeout(function() {
                    that.hint.stop(true, true).animate(that.currentTargetOffset, "fast", that._afterEndHandler);
                }, 0);

            } else {
                that._afterEnd();
            }
        },

        _trigger: function(eventName, e) {
            var that = this;

            return that.trigger(
                eventName, extend(
                {},
                e.event,
                {
                    x: e.x,
                    y: e.y,
                    currentTarget: that.currentTarget,
                    dropTarget: e.dropTarget
                }
            ));
        },

        _withDropTarget: function(e, callback) {
            var that = this,
                target, result,
                options = that.options,
                targets = dropTargets[options.group],
                areas = dropAreas[options.group];

            if (targets && targets.length || areas && areas.length) {

                target = elementUnderCursor(e);

                if (that.hint && contains(that.hint[0], target)) {
                    that.hint.hide();
                    target = elementUnderCursor(e);
                    // IE8 does not return the element in iframe from first attempt
                    if (!target) {
                        target = elementUnderCursor(e);
                    }
                    that.hint.show();
                }

                result = checkTarget(target, targets, areas);

                if (result) {
                    callback(result.target, result.targetElement);
                } else {
                    callback();
                }
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that._afterEnd();

            that.userEvents.destroy();
        },

        _afterEnd: function() {
            var that = this;

            if (that.hint) {
                that.hint.remove();
            }

            delete draggables[that.options.group];

            that.trigger("destroy");
            $(document).off(KEYUP, that.captureEscape);
        }
    });

    kendo.ui.plugin(DropTarget);
    kendo.ui.plugin(DropTargetArea);
    kendo.ui.plugin(Draggable);
    kendo.TapCapture = TapCapture;
    kendo.containerBoundaries = containerBoundaries;

    extend(kendo.ui, {
        Pane: Pane,
        PaneDimensions: PaneDimensions,
        Movable: Movable
    });

 })(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed by the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "resizable",
    name: "Resizable",
    category: "framework",
    depends: [ "core", "draganddrop" ],
    advanced: true
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        proxy = $.proxy,
        isFunction = $.isFunction,
        extend = $.extend,
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        START = "start",
        RESIZE = "resize",
        RESIZEEND = "resizeend";

    var Resizable = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.orientation = that.options.orientation.toLowerCase() != VERTICAL ? HORIZONTAL : VERTICAL;
            that._positionMouse = that.orientation == HORIZONTAL ? "x" : "y";
            that._position = that.orientation == HORIZONTAL ? "left" : "top";
            that._sizingDom = that.orientation == HORIZONTAL ? "outerWidth" : "outerHeight";

            that.draggable = new ui.Draggable(element, {
                distance: 0,
                filter: options.handle,
                drag: proxy(that._resize, that),
                dragcancel: proxy(that._cancel, that),
                dragstart: proxy(that._start, that),
                dragend: proxy(that._stop, that)
            });

            that.userEvents = that.draggable.userEvents;
        },

        events: [
            RESIZE,
            RESIZEEND,
            START
        ],

        options: {
            name: "Resizable",
            orientation: HORIZONTAL
        },

        _max: function(e) {
            var that = this,
                hintSize = that.hint ? that.hint[that._sizingDom]() : 0,
                size = that.options.max;

            return isFunction(size) ? size(e) : size !== undefined ? (that._initialElementPosition + size) - hintSize : size;
        },

        _min: function(e) {
            var that = this,
                size = that.options.min;

            return isFunction(size) ? size(e) : size !== undefined ? that._initialElementPosition + size : size;
        },

        _start: function(e) {
            var that = this,
                hint = that.options.hint,
                el = $(e.currentTarget);

            that._initialElementPosition = el.position()[that._position];
            that._initialMousePosition = e[that._positionMouse].startLocation;

            if (hint) {
                that.hint = isFunction(hint) ? $(hint(el)) : hint;

                that.hint.css({
                    position: "absolute"
                })
                .css(that._position, that._initialElementPosition)
                .appendTo(that.element);
            }

            that.trigger(START, e);

            that._maxPosition = that._max(e);
            that._minPosition = that._min(e);

            $(document.body).css("cursor", el.css("cursor"));
        },

        _resize: function(e) {
            var that = this,
                handle = $(e.currentTarget),
                maxPosition = that._maxPosition,
                minPosition = that._minPosition,
                currentPosition = that._initialElementPosition + (e[that._positionMouse].location - that._initialMousePosition),
                position;

            position = minPosition !== undefined ? Math.max(minPosition, currentPosition) : currentPosition;
            that.position = position =  maxPosition !== undefined ? Math.min(maxPosition, position) : position;

            if(that.hint) {
                that.hint.toggleClass(that.options.invalidClass || "", position == maxPosition || position == minPosition)
                         .css(that._position, position);
            }

            that.resizing = true;
            that.trigger(RESIZE, extend(e, { position: position }));
        },

        _stop: function(e) {
            var that = this;

            if(that.hint) {
                that.hint.remove();
            }

            that.resizing = false;
            that.trigger(RESIZEEND, extend(e, { position: that.position }));
            $(document.body).css("cursor", "");
        },

        _cancel: function(e) {
            var that = this;

            if (that.hint) {
                that.position = undefined;
                that.hint.css(that._position, that._initialElementPosition);
                that._stop(e);
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            if (that.draggable) {
                that.draggable.destroy();
            }
        },

        press: function(target) {
            if (!target) {
                return;
            }

            var position = target.position(),
                that = this;

            that.userEvents.press(position.left, position.top, target[0]);
            that.targetPosition = position;
            that.target = target;
        },

        move: function(delta) {
            var that = this,
                orientation = that._position,
                position = that.targetPosition,
                current = that.position;

            if (current === undefined) {
                current = position[orientation];
            }

            position[orientation] = current + delta;

            that.userEvents.move(position.left, position.top);
        },

        end: function() {
            this.userEvents.end();
            this.target = this.position = undefined;
        }
    });

    kendo.ui.plugin(Resizable);

})(window.kendo.jQuery);
/*
* Kendo UI Web v2013.1.319 (http://kendoui.com)
* Copyright 2013 Telerik AD. All rights reserved.
*
* Kendo UI Web commercial licenses may be obtained at
* https://www.kendoui.com/purchase/license-agreement/kendo-ui-web-commercial.aspx
* If you do not own a commercial license, this file shall be governed y the
* GNU General Public License (GPL) version 3.
* For GPL requirements, please review: http://www.gnu.org/copyleft/gpl.html
*/
kendo_module({
    id: "treeview",
    name: "TreeView",
    category: "web",
    description: "The TreeView widget displays hierarchical data in a traditional tree structure,with support for interactive drag-and-drop operations.",
    depends: [ "data", "draganddrop" ]
});

(function($, undefined){
    var kendo = window.kendo,
        ui = kendo.ui,
        data = kendo.data,
        extend = $.extend,
        template = kendo.template,
        isArray = $.isArray,
        Widget = ui.Widget,
        HierarchicalDataSource = data.HierarchicalDataSource,
        proxy = $.proxy,
        keys = kendo.keys,
        NS = ".kendoTreeView",
        SELECT = "select",
        NAVIGATE = "navigate",
        EXPAND = "expand",
        CHANGE = "change",
        CHECKED = "checked",
        COLLAPSE = "collapse",
        DRAGSTART = "dragstart",
        DRAG = "drag",
        DROP = "drop",
        DRAGEND = "dragend",
        DATABOUND = "dataBound",
        CLICK = "click",
        VISIBILITY = "visibility",
        UNDEFINED = "undefined",
        KSTATEHOVER = "k-state-hover",
        KTREEVIEW = "k-treeview",
        VISIBLE = ":visible",
        NODE = ".k-item",
        STRING = "string",
        ARIASELECTED = "aria-selected",
        ARIADISABLED = "aria-disabled",
        TreeView,
        subGroup, nodeContents, nodeIcon,
        bindings = {
            text: "dataTextField",
            url: "dataUrlField",
            spriteCssClass: "dataSpriteCssClassField",
            imageUrl: "dataImageUrlField"
        },
        isDomElement = function (o){
            return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName === STRING
            );
        };

    function contentChild(filter) {
        return function(node) {
            var result = node.children(".k-animation-container");

            if (!result.length) {
                result = node;
            }

            return result.children(filter);
        };
    }

    subGroup = contentChild(".k-group");
    nodeContents = contentChild(".k-group,.k-content");
    nodeIcon = function(node) {
        return node.children("div").children(".k-icon");
    };

    function checkboxes(node) {
        return node.children("div").find(".k-checkbox:first :checkbox");
    }

    function updateNodeHtml(node) {
        var wrapper = node.children("div"),
            group = node.children("ul"),
            toggleButton = wrapper.children(".k-icon"),
            checkbox = node.children(":checkbox"),
            innerWrapper = wrapper.children(".k-in"),
            currentNode, tmp;

        if (node.hasClass("k-treeview")) {
            return;
        }

        if (!wrapper.length) {
            wrapper = $("<div />").prependTo(node);
        }

        if (!toggleButton.length && group.length) {
            toggleButton = $("<span class='k-icon' />").prependTo(wrapper);
        } else if (!group.length || !group.children().length) {
            toggleButton.remove();
            group.remove();
        }

        if (checkbox.length) {
            $("<span class='k-checkbox' />").appendTo(wrapper).append(checkbox);
        }

        if (!innerWrapper.length) {
            innerWrapper = $("<span class='k-in' />").appendTo(wrapper)[0];

            // move all non-group content in the k-in container
            currentNode = wrapper[0].nextSibling;
            innerWrapper = wrapper.find(".k-in")[0];

            while (currentNode && currentNode.nodeName.toLowerCase() != "ul") {
                tmp = currentNode;
                currentNode = currentNode.nextSibling;

                if (tmp.nodeType == 3) {
                    tmp.nodeValue = $.trim(tmp.nodeValue);
                }

                innerWrapper.appendChild(tmp);
            }
        }
    }

    TreeView = Widget.extend({
        init: function (element, options) {
            var that = this,
                dataInit,
                inferred = false;

            if (isArray(options)) {
                dataInit = true;
                options = { dataSource: options };
            }

            if (options && typeof options.loadOnDemand == UNDEFINED && isArray(options.dataSource)) {
                options.loadOnDemand = false;
            }

            Widget.prototype.init.call(that, element, options);

            element = that.element;
            options = that.options;

            inferred = element.is("ul") || element.hasClass(KTREEVIEW);

            if (inferred) {
                options.dataSource.list = element.is("ul") ? element : element.children("ul");
            }

            that._animation();

            that._accessors();

            that._templates();

            // render treeview if it's not already rendered
            if (!element.hasClass(KTREEVIEW)) {
                that._wrapper();

                if (inferred) {
                    that.root = element;
                    that._group(that.wrapper);
                }
            } else {
                // otherwise just initialize properties
                that.wrapper = element;
                that.root = element.children("ul").eq(0);
            }

            that._tabindex();

            if (!that.wrapper.filter("[role=tree]").length) {
                that.wrapper.attr("role", "tree");
            }

            that._dataSource(inferred);

            that._attachEvents();

            if (options.dragAndDrop) {
                that.dragging = new TreeViewDragAndDrop(that);
            }

            if (!inferred) {
                if (options.autoBind) {
                    that._progress(true);
                    that.dataSource.fetch();
                }
            } else {
                that._attachUids();
            }

            if (options.checkboxes && options.checkboxes.checkChildren) {
                that._updateIndeterminateInitial(that.wrapper);
            }

            if (that.element[0].id) {
                that._ariaId = kendo.format("{0}_tv_active", that.element[0].id);
            }
        },

        _attachEvents: function() {
            var that = this,
                clickableItems = ".k-in:not(.k-state-selected,.k-state-disabled)",
                MOUSEENTER = "mouseenter";

            that.wrapper
                .on(MOUSEENTER + NS, ".k-in.k-state-selected", function(e) { e.preventDefault(); })
                .on(MOUSEENTER + NS, clickableItems, function () { $(this).addClass(KSTATEHOVER); })
                .on("mouseleave" + NS, clickableItems, function () { $(this).removeClass(KSTATEHOVER); })
                .on(CLICK + NS, clickableItems, proxy(that._click, that))
                .on("dblclick" + NS, ".k-in:not(.k-state-disabled)", proxy(that._toggleButtonClick, that))
                .on(CLICK + NS, ".k-plus,.k-minus", proxy(that._toggleButtonClick, that))
                .on("keydown" + NS, proxy(that._keydown, that))
                .on("focus" + NS, proxy(that._focus, that))
                .on("blur" + NS, proxy(that._blur, that))
                .on("mousedown" + NS, ".k-in,.k-checkbox :checkbox,.k-plus,.k-minus", proxy(that._mousedown, that))
                .on("change" + NS, ".k-checkbox :checkbox", proxy(that._checkboxChange, that))
                .on("click" + NS, ".k-checkbox :checkbox", proxy(that._checkboxClick, that))
                .on("click" + NS, function(e) {
                    if (!$(e.target).is(":focusable")) {
                        that.focus();
                    }
                });
        },

        _checkboxClick: function(e) {
            var checkbox = $(e.target);

            if (checkbox.data("indeterminate")) {
                checkbox
                    .data("indeterminate", false)
                    .prop("indeterminate", false)
                    .prop(CHECKED, true);

                this._checkboxChange(e);
            }
        },

        _attachUids: function(root, dataSource) {
            var that = this,
                data,
                uidAttr = kendo.attr("uid");

            root = root || that.root;
            dataSource = dataSource || that.dataSource;

            data = dataSource.view();

            root.children("li").each(function(index, item) {
                item = $(item).attr(uidAttr, data[index].uid);
                item.attr("role", "treeitem");
                that._attachUids(item.children("ul"), data[index].children);
            });
        },

        _animation: function() {
            var options = this.options,
                animationOptions = options.animation;

            if (animationOptions === false) {
                animationOptions = {
                    expand: { effects: {} },
                    collapse: { hide: true, effects: {} }
                };
            } else if (!animationOptions.collapse || !("effects" in animationOptions.collapse)) {
                animationOptions.collapse = extend({ reverse: true }, animationOptions.expand);
            }

            extend(animationOptions.collapse, { hide: true });

            options.animation = animationOptions;
        },

        _templates: function() {
            var that = this,
                options = that.options,
                fieldAccessor = proxy(that._fieldAccessor, that);

            if (options.template && typeof options.template == STRING) {
                options.template = template(options.template);
            } else if (!options.template) {
                options.template = template(
                    "# var text = " + fieldAccessor("text") + "(item); #" +
                    "# if (typeof item.encoded != 'undefined' && item.encoded === false) {#" +
                        "#= text #" +
                    "# } else { #" +
                        "#: text #" +
                    "# } #"
                );
            }

            that._checkboxes();

            that.templates = {
                wrapperCssClass: function (group, item) {
                    var result = "k-item",
                        index = item.index;

                    if (group.firstLevel && index === 0) {
                        result += " k-first";
                    }

                    if (index == group.length-1) {
                        result += " k-last";
                    }

                    return result;
                },
                cssClass: function(group, item) {
                    var result = "",
                        index = item.index,
                        groupLength = group.length - 1;

                    if (group.firstLevel && index === 0) {
                        result += "k-top ";
                    }

                    if (index === 0 && index != groupLength) {
                        result += "k-top";
                    } else if (index == groupLength) {
                        result += "k-bot";
                    } else {
                        result += "k-mid";
                    }

                    return result;
                },
                textClass: function(item) {
                    var result = "k-in";

                    if (item.enabled === false) {
                        result += " k-state-disabled";
                    }

                    if (item.selected === true) {
                        result += " k-state-selected";
                    }

                    return result;
                },
                toggleButtonClass: function(item) {
                    var result = "k-icon";

                    if (item.expanded !== true) {
                        result += " k-plus";
                    } else {
                        result += " k-minus";
                    }

                    if (item.enabled === false) {
                        result += "-disabled";
                    }

                    return result;
                },
                groupAttributes: function(group) {
                    return group.expanded !== true ? " style='display:none'" : "";
                },
                groupCssClass: function(group) {
                    var cssClass = "k-group";

                    if (group.firstLevel) {
                        cssClass += " k-treeview-lines";
                    }

                    return cssClass;
                },
                dragClue: template(
                    "<div class='k-header k-drag-clue'>" +
                        "<span class='k-icon k-drag-status'></span>" +
                        "#= treeview.template(data) #" +
                    "</div>"
                ),
                group: template(
                    "<ul class='#= r.groupCssClass(group) #'#= r.groupAttributes(group) # role='group'>" +
                        "#= renderItems(data) #" +
                    "</ul>"
                ),
                itemContent: template(
                    "# var imageUrl = " + fieldAccessor("imageUrl") + "(item); #" +
                    "# var spriteCssClass = " + fieldAccessor("spriteCssClass") + "(item); #" +
                    "# if (imageUrl) { #" +
                        "<img class='k-image' alt='' src='#= imageUrl #'>" +
                    "# } #" +

                    "# if (spriteCssClass) { #" +
                        "<span class='k-sprite #= spriteCssClass #'></span>" +
                    "# } #" +

                    "#= treeview.template(data) #"
                ),
                itemElement: template(
                    "# var url = " + fieldAccessor("url") + "(item); #" +
                    "<div class='#= r.cssClass(group, item) #'>" +
                        "# if (item.hasChildren) { #" +
                            "<span class='#= r.toggleButtonClass(item) #' role='presentation'></span>" +
                        "# } #" +

                        "# if (treeview.checkboxes) { #" +
                            "<span class='k-checkbox' role='presentation'>" +
                                "#= treeview.checkboxes.template(data) #" +
                            "</span>" +
                        "# } #" +

                        "# var tag = url ? 'a' : 'span'; #" +
                        "# var textAttr = url ? ' href=\\'' + url + '\\'' : ''; #" +

                        "<#=tag#  class='#= r.textClass(item) #'#= textAttr #>" +
                            "#= r.itemContent(data) #" +
                        "</#=tag#>" +
                    "</div>"
                ),
                item: template(
                    "<li role='treeitem' class='#= r.wrapperCssClass(group, item) #'" +
                        " " + kendo.attr("uid") + "='#= item.uid #'" +
                        "#=item.selected ? \"aria-selected='true'\" : ''#" +
                        "#=item.enabled === false ? \"aria-disabled='true'\" : ''#" +
                    ">" +
                        "#= r.itemElement(data) #" +
                    "</li>"
                ),
                loading: template(
                    "<div class='k-icon k-loading' /> Loading..."
                )
            };
        },

        items: function() {
            return this.element.find(".k-item");
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;

            this._dataSource();

            this.dataSource.fetch();
        },

        _dataSource: function(silentRead) {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            function recursiveRead(data) {
                for (var i = 0; i < data.length; i++) {
                    data[i]._initChildren();

                    data[i].children.fetch();

                    recursiveRead(data[i].children.view());
                }
            }

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);
            } else {
                that._refreshHandler = proxy(that.refresh, that);
            }

            if (!dataSource.fields) {
                dataSource.fields = [
                    { field: "text" },
                    { field: "url" },
                    { field: "spriteCssClass" },
                    { field: "imageUrl" }
                ];
            }

            that.dataSource = HierarchicalDataSource.create(dataSource);

            if (silentRead) {
                that.dataSource.fetch();

                recursiveRead(that.dataSource.view());
            }

            that.dataSource.bind(CHANGE, that._refreshHandler);
        },

        events: [
            DRAGSTART,
            DRAG,
            DROP,
            DRAGEND,

            DATABOUND,

            EXPAND,
            COLLAPSE,
            SELECT,
            CHANGE,
            NAVIGATE
        ],

        options: {
            name: "TreeView",
            dataSource: {},
            animation: {
                expand: {
                    effects: "expand:vertical",
                    duration: 200
                }, collapse: {
                    duration: 100
                }
            },
            dragAndDrop: false,
            checkboxes: false,
            autoBind: true,
            loadOnDemand: true,
            template: "",
            dataTextField: null
        },

        _accessors: function() {
            var that = this,
                options = that.options,
                i, field, textField,
                element = that.element;

            for (i in bindings) {
                field = options[bindings[i]];
                textField = element.attr(kendo.attr(i + "-field"));

                if (!field && textField) {
                    field = textField;
                }

                if (!field) {
                    field = i;
                }

                if (!isArray(field)) {
                    field = [field];
                }

                options[bindings[i]] = field;
            }
        },

        _fieldAccessor: function(fieldName) {
            var fieldBindings = this.options[bindings[fieldName]],
                count = fieldBindings.length,
                result = "(function(item) {";

            if (count === 0) {
                result += "return item['" + fieldName + "'];";
            } else {
                result += "var level = item.level();" +
                          "var levels = [" +
                            $.map(fieldBindings, function(x) {
                                return "function(d){ return " + kendo.expr(x) + "}";
                            }).join(",") + "];";

                // generates levels[level < 3 ? level : 2](item);
                result += "return levels[Math.min(level, " + count + "-1)](item)";
            }

            result += "})";

            return result;
        },

        setOptions: function(options) {
            var that = this;

            if (("dragAndDrop" in options) && options.dragAndDrop && !that.options.dragAndDrop) {
                that.dragging = new TreeViewDragAndDrop(that);
            }

            Widget.fn.setOptions.call(that, options);

            that._animation();

            that._templates();
        },

        _trigger: function (eventName, node) {
            return this.trigger(eventName, {
                node: node.closest(NODE)[0]
            });
        },

        _setIndeterminate: function(node) {
            var group = subGroup(node),
                siblings, length,
                all = true,
                i;

            if (!group.length) {
                return;
            }

            siblings = checkboxes(group.children());
            length = siblings.length;

            if (length > 1) {
                for (i = 1; i < length; i++) {
                    if (siblings[i].checked != siblings[i-1].checked ||
                        siblings[i].indeterminate || siblings[i-1].indeterminate) {
                        all = false;
                        break;
                    }
                }
            } else {
                all = !siblings[0].indeterminate;
            }

            checkboxes(node)
                .data("indeterminate", !all)
                .prop("indeterminate", !all)
                .prop(CHECKED, all && siblings[0].checked);
        },

        _updateIndeterminateInitial: function(node) {
            var subnodes = subGroup(node).children(), i;

            if (subnodes.length) {
                for (i = 0; i < subnodes.length; i++) {
                    this._updateIndeterminateInitial(subnodes.eq(i));
                }

                this._setIndeterminate(node);
            }
        },

        _updateIndeterminate: function(node) {
            var parentNode = this.parent(node),
                checkbox;

            if (parentNode.length) {
                this._setIndeterminate(parentNode);
                checkbox = parentNode.children("div").find(".k-checkbox > :checkbox");

                if (checkbox.prop("indeterminate") === false) {
                    this.dataItem(parentNode).set(CHECKED, checkbox.prop(CHECKED));
                } else {
                    this.dataItem(parentNode).checked = false;
                }

                this._updateIndeterminate(parentNode);
            }
        },

        _checkboxChange: function(e) {
            var checkbox = $(e.target),
                isChecked = checkbox.prop(CHECKED),
                node = checkbox.closest(NODE),
                that = this;

            that.dataItem(node).set(CHECKED, isChecked);
        },

        _toggleButtonClick: function (e) {
            this.toggle($(e.target).closest(NODE));
        },

        _mousedown: function(e) {
            var node = $(e.currentTarget).closest(NODE);

            this._clickTarget = node;
            this.current(node);
        },

        _focusable: function (node) {
            return node && node.length && node.is(":visible") && !node.find(".k-in:first").hasClass("k-state-disabled");
        },

        _focus: function() {
            var current = this.select(),
                clickTarget = this._clickTarget;

            // suppress initial focus state on touch devices (until keyboard is used)
            if (kendo.support.touch) {
                return;
            }

            if (clickTarget && clickTarget.length) {
                current = clickTarget;
            }

            if (!this._focusable(current)) {
                current = this.current();
            }

            if (!this._focusable(current)) {
                current = this._nextVisible($());
            }

            this.current(current);
        },

        focus: function() {
            var wrapper = this.wrapper,
                scrollContainer = wrapper[0],
                scrollTop,
                body = document.body;

            do {
                scrollContainer = scrollContainer.parentNode;
            } while (scrollContainer.scrollHeight <= scrollContainer.clientHeight && scrollContainer != body);

            scrollTop = scrollContainer.scrollTop;

            wrapper.focus();

            scrollContainer.scrollTop = scrollTop;
        },

        _blur: function() {
            this.current().find(".k-in:first").removeClass("k-state-focused");
        },

        _enabled: function(node) {
            return !node.children("div").children(".k-in").hasClass("k-state-disabled");
        },

        parent: function(node) {
            var wrapperRe = /\bk-treeview\b/,
                itemRe = /\bk-item\b/,
                result,
                skipSelf;

            if (typeof node == STRING) {
                node = this.element.find(node);
            }

            if (!isDomElement(node)) {
                node = node[0];
            }

            skipSelf = itemRe.test(node.className);

            do {
                node = node.parentNode;

                if (itemRe.test(node.className)) {
                    if (skipSelf) {
                        result = node;
                    } else {
                        skipSelf = true;
                    }
                }
            } while (!wrapperRe.test(node.className) && !result);

            return $(result);
        },

        _nextVisible: function(node) {
            var that = this,
                expanded = that._expanded(node),
                result;

            if (!node.length || !node.is(":visible")) {
                result = that.root.children().eq(0);
            } else if (expanded) {
                result = subGroup(node).children().first();
            } else {
                while (node.length && !node.next().length) {
                    node = that.parent(node);
                }

                if (node.next().length) {
                    result = node.next();
                } else {
                    result = node;
                }
            }

            if (!that._enabled(result)) {
                result = that._nextVisible(result);
            }

            return result;
        },

        _previousVisible: function(node) {
            var that = this,
                result;

            if (!node.length || node.prev().length) {
                if (node.length) {
                    result = node.prev();
                } else {
                    result = that.root.children().last();
                }

                while (that._expanded(result)) {
                    result = subGroup(result).children().last();
                }
            } else {
                result = that.parent(node) || node;
            }

            if (!that._enabled(result)) {
                result = that._previousVisible(result);
            }

            return result;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                target,
                focused = that.current(),
                expanded = that._expanded(focused),
                checkbox = focused.find(".k-checkbox:first :checkbox"),
                rtl = kendo.support.isRtl(that.element);

            if (e.target != e.currentTarget) {
                return;
            }

            if ((!rtl && key == keys.RIGHT) || (rtl && key == keys.LEFT)) {
                if (expanded) {
                    target = that._nextVisible(focused);
                } else {
                    that.expand(focused);
                }
            } else if ((!rtl && key == keys.LEFT) || (rtl && key == keys.RIGHT)) {
                if (expanded) {
                    that.collapse(focused);
                } else {
                    target = that.parent(focused);

                    if (!that._enabled(target)) {
                        target = undefined;
                    }
                }
            } else if (key == keys.DOWN) {
                target = that._nextVisible(focused);
            } else if (key == keys.UP) {
                target = that._previousVisible(focused);
            } else if (key == keys.HOME) {
                target = that._nextVisible($());
            } else if (key == keys.END) {
                target = that._previousVisible($());
            } else if (key == keys.ENTER) {
                if (!focused.find(".k-in:first").hasClass("k-state-selected")) {
                    if (!that._trigger(SELECT, focused)) {
                        that.select(focused);
                    }
                }
            } else if (key == keys.SPACEBAR && checkbox.length) {
                checkbox.prop(CHECKED, !checkbox.prop(CHECKED))
                    .data("indeterminate", false)
                    .prop("indeterminate", false);

                that._checkboxChange({ target: checkbox });

                target = focused;
            }

            if (target) {
                e.preventDefault();

                if (focused[0] != target[0]) {
                    that._trigger(NAVIGATE, target);
                    that.current(target);
                }
            }
        },

        _click: function (e) {
            var that = this,
                node = $(e.target),
                contents = nodeContents(node.closest(NODE)),
                href = node.attr("href"),
                shouldNavigate;

            if (href) {
                shouldNavigate = href == "#" || href.indexOf("#" + this.element.id + "-") >= 0;
            } else {
                shouldNavigate = contents.length && !contents.children().length;
            }

            if (shouldNavigate) {
                e.preventDefault();
            }

            if (!node.hasClass(".k-state-selected") && !that._trigger(SELECT, node)) {
                that.select(node);
            }
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper, root,
                wrapperClasses = "k-widget k-treeview";

            if (element.is("div")) {
                wrapper = element;
                root = wrapper.children("ul").eq(0);
            } else { // element is ul
                wrapper = element.wrap('<div />').parent();
                root = element;
            }

            that.wrapper = wrapper.addClass(wrapperClasses);
            that.root = root;
        },

        _group: function(item) {
            var that = this,
                firstLevel = item.hasClass(KTREEVIEW),
                group = {
                    firstLevel: firstLevel,
                    expanded: firstLevel || that._expanded(item)
                },
                groupElement = item.children("ul");

            groupElement
                .addClass(that.templates.groupCssClass(group))
                .css("display", group.expanded ? "" : "none");

            that._nodes(groupElement, group);
        },

        _nodes: function(groupElement, groupData) {
            var that = this,
                nodes = groupElement.children("li"),
                nodeData;

            groupData = extend({ length: nodes.length }, groupData);

            nodes.each(function(i, node) {
                node = $(node);

                nodeData = { index: i, expanded: that._expanded(node) };

                updateNodeHtml(node);

                that._updateNodeClasses(node, groupData, nodeData);

                // iterate over child nodes
                that._group(node);
            });
        },

        _checkboxes: function() {
            var options = this.options,
                checkboxOptions = options.checkboxes,
                checkboxTemplate;

            if (checkboxOptions || options.checkboxTemplate) {

                if (options.checkboxTemplate) {
                    checkboxTemplate = options.checkboxTemplate;
                } else {
                    checkboxTemplate = "<input type='checkbox' #= (item.enabled === false) ? 'disabled' : '' # #= item.checked ? 'checked' : '' #";

                    if (checkboxOptions.name) {
                        checkboxTemplate += " name='" + checkboxOptions.name + "'";
                    }

                    checkboxTemplate += " />";
                }

                checkboxOptions = extend({
                    template: checkboxTemplate
                }, options.checkboxes);

                if (typeof checkboxOptions.template == STRING) {
                    checkboxOptions.template = template(checkboxOptions.template);
                }

                options.checkboxes = checkboxOptions;
            }
        },

        _updateNodeClasses: function (node, groupData, nodeData) {
            var wrapper = node.children("div"),
                group = node.children("ul"),
                templates = this.templates;

            if (node.hasClass("k-treeview")) {
                return;
            }

            nodeData = nodeData || {};
            nodeData.expanded = typeof nodeData.expanded != UNDEFINED ? nodeData.expanded : this._expanded(node);
            nodeData.index = typeof nodeData.index != UNDEFINED ? nodeData.index : node.index();
            nodeData.enabled = typeof nodeData.enabled != UNDEFINED ? nodeData.enabled : !wrapper.children(".k-in").hasClass("k-state-disabled");

            groupData = groupData || {};
            groupData.firstLevel = typeof groupData.firstLevel != UNDEFINED ? groupData.firstLevel : node.parent().parent().hasClass(KTREEVIEW);
            groupData.length = typeof groupData.length != UNDEFINED ? groupData.length : node.parent().children().length;

            // li
            node.removeClass("k-first k-last")
                .addClass(templates.wrapperCssClass(groupData, nodeData));

            // div
            wrapper.removeClass("k-top k-mid k-bot")
                   .addClass(templates.cssClass(groupData, nodeData));

            // span
            wrapper.children(".k-in").removeClass("k-in k-state-default k-state-disabled")
                .addClass(templates.textClass(nodeData));

            // toggle button
            if (group.length || node.attr("data-hasChildren") == "true") {
                wrapper.children(".k-icon").removeClass("k-plus k-minus k-plus-disabled k-minus-disabled")
                    .addClass(templates.toggleButtonClass(nodeData));

                group.addClass("k-group");
            }
        },


        _processNodes: function(nodes, callback) {
            var that = this;
            that.element.find(nodes).each(function(index, item) {
                callback.call(that, index, $(item).closest(NODE));
            });
        },

        dataItem: function(node) {
            var uid = $(node).closest(NODE).attr(kendo.attr("uid")),
                dataSource = this.dataSource;

            return dataSource && dataSource.getByUid(uid);
        },

        _insertNode: function(nodeData, index, parentNode, insertCallback, collapsed) {
            var that = this,
                group = subGroup(parentNode),
                updatedGroupLength = group.children().length + 1,
                childrenData,
                groupData = {
                    firstLevel: parentNode.hasClass(KTREEVIEW),
                    expanded: !collapsed,
                    length: updatedGroupLength
                }, node, i, item, nodeHtml = "",
                append = function(item, group) {
                    item.appendTo(group);
                };

            for (i = 0; i < nodeData.length; i++) {
                item = nodeData[i];

                item.index = index + i;

                nodeHtml += that._renderItem({
                    group: groupData,
                    item: item
                });
            }

            node = $(nodeHtml);

            if (!node.length) {
                return;
            }

            if (!group.length) {
                group = $(that._renderGroup({
                    group: groupData
                })).appendTo(parentNode);
            }

            insertCallback(node, group);

            if (parentNode.hasClass("k-item")) {
                updateNodeHtml(parentNode);
                that._updateNodeClasses(parentNode);
            }

            that._updateNodeClasses(node.prev().first());
            that._updateNodeClasses(node.next().last());

            // render sub-nodes
            for (i = 0; i < nodeData.length; i++) {
                item = nodeData[i];

                if (item.hasChildren) {
                    childrenData = item.children.data();

                    if (childrenData.length) {
                        that._insertNode(childrenData, item.index, node.eq(i), append, !that._expanded(node.eq(i)));
                    }
                }
            }

            return node;
        },

        _updateNode: function(field, items) {
            var that = this, i, node, item,
                isChecked, isCollapsed,
                context = { treeview: that.options, item: item };

            function setChecked() {
                that.dataItem(this).set(CHECKED, isChecked);
            }

            if (field == "selected") {
                item = items[0];

                node = that.findByUid(item.uid).find(".k-in:first")
                        .removeClass("k-state-hover")
                        .toggleClass("k-state-selected", item[field])
                        .end();

                if (item[field]) {
                    that.current(node);
                    node.attr(ARIASELECTED, true);
                } else {
                    node.attr(ARIASELECTED, false);
                }
            } else {
                for (i = 0; i < items.length; i++) {
                    context.item = item = items[i];

                    if (field == "spriteCssClass" || field == "imageUrl" ||
                        $.inArray(field, that.options.dataTextField) >= 0) {
                        that.findByUid(item.uid).find(">div>.k-in").html(that.templates.itemContent(context));
                    } else if (field == CHECKED) {
                        node = that.findByUid(item.uid);

                        isChecked = item[field];

                        node.children("div").find(".k-checkbox :checkbox")
                            .prop(CHECKED, item[field])
                            .data("indeterminate", false)
                            .prop("indeterminate", false);

                        if (that.options.checkboxes.checkChildren) {
                            node.find(".k-checkbox :checkbox").each(setChecked);

                            that._updateIndeterminate(node);
                        }
                    } else if (field == "expanded") {
                        that._toggle(that.findByUid(item.uid), item, item[field]);
                    } else if (field == "enabled") {
                        node = that.findByUid(item.uid);

                        node.find(".k-checkbox :checkbox").prop("disabled", !item[field]);

                        isCollapsed = !nodeContents(node).is(VISIBLE);

                        node.removeAttr(ARIADISABLED);

                        if (!item[field]) {
                            if (item.selected) {
                                item.set("selected", false);
                            }

                            if (item.expanded) {
                                item.set("expanded", false);
                            }

                            isCollapsed = true;
                            node.removeAttr(ARIASELECTED)
                                .attr(ARIADISABLED, true);
                        }

                        that._updateNodeClasses(node, {}, { enabled: item[field], expanded: !isCollapsed });
                    }
                }
            }
        },

        refresh: function(e) {
            var that = this,
                parentNode = that.wrapper,
                node = e.node,
                action = e.action,
                items = e.items,
                index = e.index,
                options = that.options,
                loadOnDemand = options.loadOnDemand,
                checkChildren = options.checkboxes && options.checkboxes.checkChildren,
                i;

            function append(items, parentNode) {
                var group = subGroup(parentNode),
                    children = group.children(),
                    collapsed = !that._expanded(parentNode);

                if (typeof index == UNDEFINED) {
                    index = children.length;
                }

                that._insertNode(items, index, parentNode, function(item, group) {
                    // insert node into DOM
                    if (index == children.length) {
                        item.appendTo(group);
                    } else {
                        item.insertBefore(children.eq(index));
                    }
                }, collapsed);

                if (that._expanded(parentNode)) {
                    that._updateNodeClasses(parentNode);
                    subGroup(parentNode).css("display", "block");
                }
            }

            if (e.field) {
                return that._updateNode(e.field, items);
            }

            if (node) {
                parentNode = that.findByUid(node.uid);
                that._progress(parentNode, false);
            }

            if (checkChildren && action != "remove" && node && node.checked) {
                for (i = 0; i < items.length; i++) {
                    items[i].checked = true;
                }
            }

            if (action == "add") {
                append(items, parentNode);
            } else if (action == "remove") {
                that._remove(that.findByUid(items[0].uid), false);
            } else {
                if (node) {
                    subGroup(parentNode).empty();

                    append(items, parentNode);
                } else {
                    that.root = that.wrapper.html(that._renderGroup({
                        items: items,
                        group: {
                            firstLevel: true,
                            expanded: true
                        }
                    })).children("ul");
                }
            }

            for (i = 0; i < items.length; i++) {
                if (!loadOnDemand || items[i].expanded) {
                    items[i].load();
                }
            }

            that.trigger(DATABOUND, {
                node: node ? parentNode : undefined
            });
        },

        expand: function (nodes) {
            this._processNodes(nodes, function (index, item) {
                this.toggle(item, true);
            });
        },

        collapse: function (nodes) {
            this._processNodes(nodes, function (index, item) {
                this.toggle(item, false);
            });
        },

        enable: function (nodes, enable) {
            enable = arguments.length == 2 ? !!enable : true;

            this._processNodes(nodes, function (index, item) {
                this.dataItem(item).set("enabled", enable);
            });
        },

        current: function(node) {
            var that = this,
                current = that._current,
                element = that.element,
                id = that._ariaId;

            if (arguments.length > 0 && node && node.length) {
                if (current) {
                    if (current[0].id === id) {
                        current.removeAttr("id");
                    }

                    current.find(".k-in:first").removeClass("k-state-focused");
                }

                current = that._current = $(node, element).closest(NODE);

                current.find(".k-in:first").addClass("k-state-focused");

                id = current[0].id || id;

                if (id) {
                    that.wrapper.removeAttr("aria-activedescendant");
                    current.attr("id", id);
                    that.wrapper.attr("aria-activedescendant", id);
                }

                return;
            }

            if (!current) {
                current = that._nextVisible($());
            }

            return current;
        },

        select: function (node) {
            var that = this,
                element = that.element;

            if (!arguments.length) {
                return element.find(".k-state-selected").closest(NODE);
            }

            node = $(node, element).closest(NODE);

            element.find(".k-state-selected").each(function() {
                var dataItem = that.dataItem(this);
                dataItem.set("selected", false);
                delete dataItem.selected;
            });

            if (node.length) {
                that.dataItem(node).set("selected", true);
            }

            that.trigger(CHANGE);
        },

        _toggle: function(node, dataItem, expand) {
            var that = this,
                options = that.options,
                contents = nodeContents(node),
                direction = expand ? "expand" : "collapse",
                animation = options.animation[direction],
                loaded;

            if (contents.data("animating")) {
                return;
            }

            if (!that._trigger(direction, node)) {
                that._expanded(node, expand);

                loaded = dataItem && dataItem.loaded();

                if (loaded && contents.children().length > 0) {
                    that._updateNodeClasses(node, {}, { expanded: expand });

                    if (contents.css("display") == (expand ? "block" : "none")) {
                        return;
                    }

                    if (!expand) {
                        contents.css("height", contents.height()).css("height");
                    }

                    contents.kendoStop(true, true).kendoAnimate(extend({ reset: true }, animation, {
                        complete: function() {
                            if (expand) {
                                contents.css("height", "");
                            }
                        }
                    }));
                } else if (!loaded || (loaded && expand)) {
                    if (options.loadOnDemand) {
                        that._progress(node, true);
                    }

                    contents.remove();
                    dataItem.load();
                }
            }
        },

        toggle: function (node, expand) {
            node = $(node);

            if (!nodeIcon(node).is(".k-minus,.k-plus,.k-minus-disabled,.k-plus-disabled")) {
                return;
            }

            if (arguments.length == 1) {
                expand = !this._expanded(node);
            }

            this._expanded(node, expand);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);

            if (that.dragging) {
                that.dragging.destroy();
            }

            kendo.destroy(that.element);
        },

        _expanded: function(node, value) {
            var expandedAttr = kendo.attr("expanded"),
                dataItem = this.dataItem(node);

            if (arguments.length == 1) {
                return node.attr(expandedAttr) === "true" || (dataItem && dataItem.expanded);
            }

            if (nodeContents(node).data("animating")) {
                return;
            }

            if (dataItem) {
                dataItem.set("expanded", value);
            }

            if (value) {
                node.attr(expandedAttr, "true");
                node.attr("aria-expanded", "true");
            } else {
                node.removeAttr(expandedAttr);
                node.attr("aria-expanded", "false");
            }
        },

        _progress: function(node, showProgress) {
            var element = this.element;

            if (arguments.length == 1) {
                showProgress = node;

                if (showProgress) {
                    element.html(this.templates.loading);
                } else {
                    element.empty();
                }
            } else {
                nodeIcon(node).toggleClass("k-loading", showProgress);
            }
        },

        text: function (node, text) {
            var dataItem = this.dataItem(node),
                fieldBindings = this.options[bindings.text],
                level = dataItem.level(),
                length = fieldBindings.length,
                field = fieldBindings[Math.min(level, length-1)];

            if (text) {
                dataItem.set(field, text);
            } else {
                return dataItem[field];
            }
        },

        _objectOrSelf: function (node) {
            return $(node).closest("[data-role=treeview]").data("kendoTreeView") || this;
        },

        _dataSourceMove: function(nodeData, group, parentNode, callback) {
            var referenceDataItem,
                destTreeview = this._objectOrSelf(parentNode || group),
                destDataSource = destTreeview.dataSource;

            if (parentNode && parentNode[0] != destTreeview.element[0]) {
                referenceDataItem = destTreeview.dataItem(parentNode);

                if (!referenceDataItem.loaded()) {
                    destTreeview._progress(parentNode, true);
                    referenceDataItem.load();
                }

                if (parentNode != this.root) {
                    destDataSource = referenceDataItem.children;

                    if (!destDataSource || !(destDataSource instanceof HierarchicalDataSource)) {
                        referenceDataItem._initChildren();
                        destDataSource = referenceDataItem.children;
                    }
                }
            }

            nodeData = this._toObservableData(nodeData);

            return callback.call(this, destDataSource, nodeData);
        },

        _toObservableData: function(node) {
            var dataItem = node, dataSource, uid;

            if (node instanceof window.jQuery || isDomElement(node)) {
                dataSource = this._objectOrSelf(node).dataSource,

                uid = $(node).attr(kendo.attr("uid"));
                dataItem = dataSource.getByUid(uid);

                if (dataItem) {
                    dataItem = dataSource.remove(dataItem);
                }
            }

            return dataItem;
        },

        _insert: function(data, model, index) {
            if (!(model instanceof kendo.data.ObservableArray)) {
                if (!isArray(model)) {
                    model = [model];
                }
            } else {
                // items will be converted to new Node instances
                model = model.toJSON();
            }

            data.splice.apply(data, [ index, 0 ].concat(model));

            return this.findByUid(data[index].uid);
        },

        insertAfter: function (nodeData, referenceNode) {
            var group = referenceNode.parent(),
                parentNode;

            if (group.parent().is("li")) {
                parentNode = group.parent();
            }

            return this._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                return this._insert(dataSource.data(), model, referenceNode.index() + 1);
            });
        },

        insertBefore: function (nodeData, referenceNode) {
            var group = referenceNode.parent(),
                parentNode;

            if (group.parent().is("li")) {
                parentNode = group.parent();
            }

            return this._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                return this._insert(dataSource.data(), model, referenceNode.index());
            });
        },

        append: function (nodeData, parentNode) {
            var that = this,
                group = that.root;

            if (parentNode) {
                group = subGroup(parentNode);
            }

            return that._dataSourceMove(nodeData, group, parentNode, function (dataSource, model) {
                function add() {
                    var data = dataSource.data(),
                        index = Math.max(data.length, 0);

                    if (parentNode) {
                        that._expanded(parentNode, true);
                    }

                    return that._insert(data, model, index);
                }

                if (!dataSource.data()) {
                    dataSource.one(CHANGE, add);

                    return null;
                } else {
                    return add();
                }
            });
        },

        _remove: function (node, keepData) {
            var that = this,
                parentNode,
                prevSibling, nextSibling;

            node = $(node, that.element);

            parentNode = node.parent().parent();
            prevSibling = node.prev();
            nextSibling = node.next();

            node[keepData ? "detach" : "remove"]();

            if (parentNode.hasClass("k-item")) {
                updateNodeHtml(parentNode);
                that._updateNodeClasses(parentNode);
            }

            that._updateNodeClasses(prevSibling);
            that._updateNodeClasses(nextSibling);

            return node;
        },

        remove: function (node) {
            var dataItem = this.dataItem(node);
            if (dataItem) {
                this.dataSource.remove(dataItem);
            }
        },

        detach: function (node) {
            return this._remove(node, true);
        },

        findByText: function(text) {
            return $(this.element).find(".k-in").filter(function(i, element) {
                return $(element).text() == text;
            }).closest(NODE);
        },

        findByUid: function(uid) {
            return this.element.find(".k-item[" + kendo.attr("uid") + "=" + uid + "]");
        },

        _renderItem: function (options) {
            if (!options.group) {
                options.group = {};
            }

            options.treeview = this.options;

            options.r = this.templates;

            return this.templates.item(options);
        },

        _renderGroup: function (options) {
            var that = this;

            options.renderItems = function(options) {
                    var html = "",
                        i = 0,
                        items = options.items,
                        len = items ? items.length : 0,
                        group = options.group;

                    group.length = len;

                    for (; i < len; i++) {
                        options.group = group;
                        options.item = items[i];
                        options.item.index = i;
                        html += that._renderItem(options);
                    }

                    return html;
                };

            options.r = that.templates;

            return that.templates.group(options);
        }
    });

    function TreeViewDragAndDrop(treeview) {
        var that = this;

        that.treeview = treeview;
        that.hovered = treeview.element;

        that._draggable = new ui.Draggable(treeview.element, {
           filter: "div:not(.k-state-disabled) .k-in",
           hint: function(node) {
               return treeview.templates.dragClue({
                   item: treeview.dataItem(node),
                   treeview: treeview.options
               });
           },
           cursorOffset: {
               left: 10,
               top: kendo.support.touch || kendo.support.pointers ? -40 / kendo.support.zoomLevel() : 10
           },
           dragstart: proxy(that.dragstart, that),
           dragcancel: proxy(that.dragcancel, that),
           drag: proxy(that.drag, that),
           dragend: proxy(that.dragend, that)
        });
    }

    TreeViewDragAndDrop.prototype = {
        _removeTouchHover: function() {
            var that = this;

            if (kendo.support.touch && that.hovered) {
                that.hovered.find("." + KSTATEHOVER).removeClass(KSTATEHOVER);
                that.hovered = false;
            }
        },

        _hintStatus: function(newStatus) {
            var statusElement = this._draggable.hint.find(".k-drag-status")[0];

            if (newStatus) {
                statusElement.className = "k-icon k-drag-status " + newStatus;
            } else {
                return $.trim(statusElement.className.replace(/k-(icon|drag-status)/g, ""));
            }
        },

        dragstart: function (e) {
            var that = this,
                treeview = that.treeview,
                sourceNode = that.sourceNode = e.currentTarget.closest(NODE);

            if (treeview.trigger(DRAGSTART, { sourceNode: sourceNode[0] })) {
                e.preventDefault();
            }

            that.dropHint = $("<div class='k-drop-hint' />")
                .css(VISIBILITY, "hidden")
                .appendTo(treeview.element);
        },

        drag: function (e) {
            var that = this,
                treeview = that.treeview,
                sourceNode = that.sourceNode,
                dropTarget = that.dropTarget = $(kendo.eventTarget(e)),
                statusClass, closestTree = dropTarget.closest(".k-treeview"),
                hoveredItem, hoveredItemPos, itemHeight, itemTop, itemContent, delta,
                insertOnTop, insertOnBottom, addChild;

            if (!closestTree.length) {
                // dragging node outside of treeview
                statusClass = "k-denied";
                that._removeTouchHover();
            } else if ($.contains(sourceNode[0], dropTarget[0])) {
                // dragging node within itself
                statusClass = "k-denied";
            } else {
                // moving or reordering node
                statusClass = "k-insert-middle";

                hoveredItem = dropTarget.closest(".k-top,.k-mid,.k-bot");

                if (hoveredItem.length) {
                    itemHeight = hoveredItem.outerHeight();
                    itemTop = kendo.getOffset(hoveredItem).top;
                    itemContent = dropTarget.closest(".k-in");
                    delta = itemHeight / (itemContent.length > 0 ? 4 : 2);

                    insertOnTop = e.y.location < (itemTop + delta);
                    insertOnBottom = (itemTop + itemHeight - delta) < e.y.location;
                    that._removeTouchHover();
                    addChild = itemContent.length && !insertOnTop && !insertOnBottom;
                    that.hovered = addChild ? closestTree : false;

                    that.dropHint.css(VISIBILITY, addChild ? "hidden" : "visible");
                    itemContent.toggleClass(KSTATEHOVER, addChild);

                    if (addChild) {
                        statusClass = "k-add";
                    } else {
                        hoveredItemPos = hoveredItem.position();
                        hoveredItemPos.top += insertOnTop ? 0 : itemHeight;

                        that.dropHint
                            .css(hoveredItemPos)
                            [insertOnTop ? "prependTo" : "appendTo"](dropTarget.closest(NODE).children("div:first"));

                        if (insertOnTop && hoveredItem.hasClass("k-top")) {
                            statusClass = "k-insert-top";
                        }

                        if (insertOnBottom && hoveredItem.hasClass("k-bot")) {
                            statusClass = "k-insert-bottom";
                        }
                    }
                } else if (dropTarget[0] != that.dropHint[0]) {
                    if (closestTree[0] != treeview.element[0]) {
                        // moving node to different treeview without children
                        statusClass = "k-add";
                    } else {
                        statusClass = "k-denied";
                    }
                }
            }

            treeview.trigger(DRAG, {
                sourceNode: sourceNode[0],
                dropTarget: dropTarget[0],
                pageY: e.y.location,
                pageX: e.x.location,
                statusClass: statusClass.substring(2),
                setStatusClass: function (value) {
                    statusClass = value;
                }
            });

            if (statusClass.indexOf("k-insert") !== 0) {
                that.dropHint.css(VISIBILITY, "hidden");
            }

            that._hintStatus(statusClass);
        },

        dragcancel: function() {
            this.dropHint.remove();
        },

        dragend: function () {
            var that = this,
                treeview = that.treeview,
                dropPosition = "over",
                sourceNode = that.sourceNode,
                destinationNode,
                dropHint = that.dropHint,
                dropTarget = that.dropTarget,
                valid, dropPrevented;

            if (dropHint.css(VISIBILITY) == "visible") {
                dropPosition = dropHint.prevAll(".k-in").length > 0 ? "after" : "before";
                destinationNode = dropHint.closest(NODE);
            } else if (dropTarget) {
                destinationNode = dropTarget.closest(NODE);

                // moving node to root element
                if (!destinationNode.length) {
                    destinationNode = dropTarget.closest(".k-treeview");
                }
            }

            valid = that._hintStatus() != "k-denied";

            dropPrevented = treeview.trigger(DROP, {
                sourceNode: sourceNode[0],
                destinationNode: destinationNode[0],
                valid: valid,
                setValid: function(newValid) { valid = newValid; },
                dropTarget: dropTarget[0],
                dropPosition: dropPosition
            });

            dropHint.remove();
            that._removeTouchHover();

            if (!valid || dropPrevented) {
                that._draggable.dropped = valid;
                return;
            }

            that._draggable.dropped = true;

            // perform reorder / move
            if (dropPosition == "over") {
                sourceNode = treeview.append(sourceNode, destinationNode);
            } else if (dropPosition == "before") {
                sourceNode = treeview.insertBefore(sourceNode, destinationNode);
            } else if (dropPosition == "after") {
                sourceNode = treeview.insertAfter(sourceNode, destinationNode);
            }

            treeview.trigger(DRAGEND, {
                sourceNode: sourceNode && sourceNode[0],
                destinationNode: destinationNode[0],
                dropPosition: dropPosition
            });
        },

        destroy: function() {
            this._draggable.destroy();
        }
    };

    ui.plugin(TreeView);
})(window.kendo.jQuery);
