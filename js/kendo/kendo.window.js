(function ($, undefined) {
    /**
     * @name kendo.ui.Window.Description
     *
     * @section
     *  <p>
     *      The Window widget displays content in a modal or non-modal HTML window. By default, Windows can be moved,
     *      resized, and closed by users. Window content can also be defined with either static HTML or loaded dynamically with Ajax.
     *  </p>
     *  <p>
     *      A Window can be initialized from virtually any HTML element. During initialization, the targeted content will
     *      automatically be wrapped in the Window’s HTML div element.
     *  </p>
     *  <h3>Getting Started</h3>
     * @exampleTitle Create a simple HTML element with the Window content
     * @example
     *  <p id="window">
     *      Kendo window content
     *  </p>
     * @exampleTitle Initialize Window using a jQuery selector
     * @example
     * $("#window").kendoWindow();
     * @section
     *  <p>
     *      When a Window is initialized, it will automatically be displayed open near the
     *      location of the HTML element that was used to initialize the content.
     *  </p>
     *  <h3>Configuring Window behaviors</h3>
     *  <p>
     *      Window provides many configuration options that can be easily set during initialization.
     *      Among the properties that can be controlled:
     *  </p>
     *  <ul>
     *      <li>Minimum height/width</li>
     *      <li>Available user Window actions (close/refresh/maximize)</li>
     *      <li>Window title</li>
     *      <li>Draggable and Resizable behaviors</li>
     *  </ul>
     * @exampleTitle Create modal Window with all user actions enabled
     * @example
     *  $("#window").kendoWindow({
     *      draggable: false,
     *      resizable: false,
     *      width: "500px",
     *      height: "300px",
     *      title: "Modal Window",
     *      modal: true,
     *      actions: ["Refresh", "Maximize", "Close"]
     *  });
     * @section
     *  <p>
     *      The order of the values in the actions array determines the order in which the action buttons
     *      will be rendered in the Window title bar. The maximize action serves both as a button for expanding
     *      the Window to fill the screen and as a button to restore the Window to the previous size.
     *  </p>
     *  <h3>Positioning and Opening the Window</h3>
     *  <p>
     *      In some scenarios, it is preferable to center a Window rather than open it near the HTML element
     *      used to define the content. It’s also common to open a Window as the result of an action rather
     *      than on initial page load. The Window API provides methods for handling this and many more advanced
     *      Window scenarios. Please see the Window demo Methods tab for more details.
     *  </p>
     * @exampleTitle Centering a Window and opening on button click
     * @example
     *  <!-- Create Window HTML and a button to open Window -->
     *  <p id="window">
     *      Centered Kendo UI Window content
     *  </p>
     *  <button id="btnOpen">Open Window</button>
     * @exampleTitle
     * @example
     *  //Initialize Window, center, and configure button click action-->
     *  $(document).ready(function(){
     *      var window = $("#window").kendoWindow({
     *      title: "Centered Window",
     *      width: "200px",
     *      height: "200px",
     *      visible: false
     *  }).data("kendoWindow");
     *  });
     *
     *  $("#btnOpen").click(function(){
     *      var window = $("#window").data("kendoWindow");
     *      window.center();
     *      window.open();
     *  });
     * @section
     *  <h3>Loading Window content with Ajax</h3>
     *  <p>
     *      While any valid technique for loading Ajax content can be used, Window provides
     *      built-in support for asynchronously loading content from a URL. This URL should
     *      return a HTML fragment that can be loaded in a Window content area.
     *  </p>
     * @exampleTitle Load Window content asynchronously
     * @example
     *  <!-- Define a basic HTML element for the Window -->
     *  <div id="window"></div>
     * @exampleTitle
     * @example
     *  //Initialize and configure to load content async -->
     *  $(document).ready(function(){
     *      $("#window").kendoWindow({
     *        title: "Async Window Content",
     *        contentUrl: "html-content-snippet.html"
     *      });
     *  });
     */
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        Draggable = kendo.ui.Draggable,
        fx = kendo.fx,
        proxy = $.proxy,
        each = $.each,
        template = kendo.template,
        templates,
        // classNames
        KWINDOW = ".k-window",
        KWINDOWTITLEBAR = ".k-window-titlebar",
        KWINDOWCONTENT = ".k-window-content",
        KOVERLAY = ".k-overlay",
        LOADING = "k-loading",
        KHOVERSTATE = "k-state-hover",
        VISIBLE = ":visible",
        // events
        OPEN = "open",
        ACTIVATE = "activate",
        CLOSE = "close",
        REFRESH = "refresh",
        RESIZE = "resize",
        ERROR = "error",
        OVERFLOW = "overflow",
        localUrlRe = /^([a-z]+:)?\/\//i;

    function isLocalUrl(url) {
        return url && !localUrlRe.test(url);
    }

    function windowObject(element) {
        return element.children(KWINDOWCONTENT).data("kendoWindow");
    }

    function openedModalWindows() {
        return $(KWINDOW).filter(function() {
            var wnd = $(this);
            return wnd.is(VISIBLE) && windowObject(wnd).options.modal;
        });
    }


    var Window = Component.extend(/** @lends kendo.ui.Window.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Component
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Boolean} [modal] <false> Specifies whether the window should block interaction with other page elements.
         * @option {Boolean} [visible] <true> Specifies whether the window will be initially visible.
         * @option {Boolean} [draggable] <true> Specifies whether the users may move the window.
         * @option {Boolean} [resizable] <true> Specifies whether the users may to resize the window.
         * @option {Integer} [minWidth] <50> The minimum width that may be achieved by resizing the window.
         * @option {Integer} [minHeight] <50> The minimum height that may be achieved by resizing the window.
         * @option {String} [contentUrl] Specifies a URL that the window should load its content from. For remote URLs, a container iframe element is automatically created.
         * @option {Array<String>} [actions] <"Close"> The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize", "Maximize".
         * @option {String} [title] The text in the window title bar.
         * @option {Object} [animation] A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when the window opens.
         * @option {Animation} [animation.close] The animation that will be used when the window closes.
         */
        init: function(element, options) {
            var that = this,
                wrapper,
                windowActions = ".k-window-titlebar .k-window-action",
                titleBar, offset,
                isVisible = false;

            Component.fn.init.call(that, element, options);
            options = that.options;
            element = that.element;

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
            }

            if (!element.parent().is("body")) {
                if (element.is(VISIBLE)) {
                    offset = element.offset();
                    isVisible = true;
                } else {
                    var visibility = element.css("visibility"),
                        display = element.css("display");

                    element.css({ visibility: "hidden", display: "" });
                    offset = element.offset();

                    element.css({ visibility: visibility, display: display });
                }
            }

            wrapper = that.wrapper = element.closest(KWINDOW);

            if (!element.is(".k-content") || !wrapper[0]) {
                element.addClass("k-window-content k-content");
                createWindow(element, options);
                wrapper = that.wrapper = element.closest(KWINDOW);

                titleBar = that.wrapper.find(KWINDOWTITLEBAR);
                titleBar.css("margin-top", -titleBar.outerHeight());

                wrapper.css("padding-top", titleBar.outerHeight());

                if (options.width) {
                    wrapper.width(options.width);
                }

                if (options.height) {
                    wrapper.height(options.height);
                }

                if (!options.visible) {
                    wrapper.hide();
                }
            }

            if (offset) {
                if (isVisible) {
                    wrapper.css({ top: offset.top, left: offset.left });
                } else {
                   wrapper
                    .css({
                        top: offset.top,
                        left: offset.left,
                        visibility: "visible",
                        display: "none"
                    });
                }
            }

            wrapper.toggleClass("k-rtl", that.wrapper.closest(".k-rtl").length)
                   .appendTo(document.body);

            if (options.modal) {
                that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
            }

            wrapper
                .delegate(windowActions, "mouseenter", function () { $(this).addClass(KHOVERSTATE); })
                .delegate(windowActions, "mouseleave", function () { $(this).removeClass(KHOVERSTATE); })
                .delegate(windowActions, "click", proxy(that._windowActionHandler, that));

            if (options.resizable) {
                wrapper.delegate(KWINDOWTITLEBAR, "dblclick", proxy(that.toggleMaximization, that));

                each("n e s w se sw ne nw".split(" "), function(index, handler) {
                    wrapper.append(templates.resizeHandle(handler));
                });

                that.resizing = new WindowResizing(that);
            }

            if (options.draggable) {
                that.dragging = new WindowDragging(that);
            }

            that.bind([
                /**
                 * Fires when the window is opened (i.e. the open() method is called).
                 * @name kendo.ui.Window#open
                 * @event
                 * @param {Event} e
                 * @cancellable
                 */
                OPEN,
                /**
                 * Fires when the window has finished its opening animation
                 * @name kendo.ui.Window#activate
                 * @event
                 * @param {Event} e
                 */
                ACTIVATE,
                /**
                 * Fires when the window is being closed (by the user or through the close() method)
                 * @name kendo.ui.Window#close
                 * @event
                 * @param {Event} e
                 * @cancellable
                 */
                CLOSE,
                /**
                 * Fires when the window contents have been refreshed through AJAX.
                 * @name kendo.ui.Window#refresh
                 * @event
                 * @param {Event} e
                 */
                REFRESH,
                /**
                 * Fires when the window has been resized by the user.
                 * @name kendo.ui.Window#resize
                 * @event
                 * @param {Event} e
                 */
                RESIZE,
                /**
                 * Fires when an AJAX request for content fails.
                 * @name kendo.ui.Window#error
                 * @event
                 * @param {Event} e
                 */
                ERROR
            ], options);

            $(window).resize(proxy(that._onDocumentResize, that));

            if (isLocalUrl(options.contentUrl)) {
                that._ajaxRequest(options.contentUrl);
            }

            if (wrapper.is(VISIBLE)) {
                that.trigger(OPEN);
                that.trigger(ACTIVATE);
            }
        },

        options: {
            animation: {
                open: {
                    effects: { zoomIn: {}, fadeIn: {} },
                    duration: 350,
                    show: true
                },
                close: {
                    effects: { zoomOut: { properties: { scale: 0.7 } }, fadeOut: {} },
                    duration: 350,
                    hide: true
                }
            },
            title: "",
            actions: ["Close"],
            modal: false,
            resizable: true,
            draggable: true,
            minWidth: 50,
            minHeight: 50,
            visible: true
        },

        _overlay: function (visible) {
            var overlay = $("body > .k-overlay"),
                doc = $(document),
                wrapper = this.wrapper[0];

            if (overlay.length == 0) {
                overlay = $("<div class='k-overlay' />")
                    .toggle(visible)
                    .insertBefore(wrapper);
            } else {
                overlay.insertBefore(wrapper).toggle(visible);
            }

            return overlay;
        },

        _windowActionHandler: function (e) {
            var target = $(e.target).closest(".k-window-action").find(".k-icon"),
                that = this;

            each({
                "k-close": that.close,
                "k-maximize": that.maximize,
                "k-restore": that.restore,
                "k-refresh": that.refresh
            }, function (commandName, handler) {
                if (target.hasClass(commandName)) {
                    e.preventDefault();
                    handler.call(that);
                    return false;
                }
            });
        },

        /**
         * Centers the window within the viewport.
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * wnd.center();
         */
        center: function () {
            var wrapper = this.wrapper,
                documentWindow = $(window);

            wrapper.css({
                left: documentWindow.scrollLeft() + Math.max(0, (documentWindow.width() - wrapper.width()) / 2),
                top: documentWindow.scrollTop() + Math.max(0, (documentWindow.height() - wrapper.height()) / 2)
            });

            return this;
        },

        /**
         * Sets/gets the window title.
         * @param {String} title The new window title
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * // get the title
         * var title = wnd.title();
         *
         * // set the title
         * wnd.title("New title");
         */
        title: function (text) {
            var title = $(".k-window-titlebar > .k-window-title", this.wrapper);

            if (!text) {
                return title.text();
            }

            title.text(text);
            return this;
        },

        /**
         * Sets/gets the window content.
         * @param {String} content The new window content
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * // get the content
         * var content = wnd.content();
         *
         * // set the content
         * wnd.content("<p>New content</p>");
         */
        content: function (html) {
            var content = this.wrapper.children(KWINDOWCONTENT);

            if (!html) {
                return content.html();
            }

            content.html(html);
            return this;
        },

        /**
         * Opens the window
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * wnd.open();
         */
        open: function () {
            var that = this,
                wrapper = that.wrapper,
                showOptions = that.options.animation.open,
                contentElement = wrapper.children(KWINDOWCONTENT),
                initialOverflow = contentElement.css(OVERFLOW);

            if (!that.trigger(OPEN)) {
                if (that.options.modal) {
                    var overlay = that._overlay(false);

                    if (showOptions.duration) {
                        overlay.kendoStop().kendoAnimate({
                            effects: { fadeOut: { properties: { opacity: 0.5 } } },
                            duration: showOptions.duration,
                            show: true
                        });
                    } else {
                        overlay.css("opacity", 0.5).show();
                    }
                }

                if (!wrapper.is(VISIBLE)) {
                    contentElement.css(OVERFLOW, "hidden");
                    wrapper.show().kendoStop().kendoAnimate({
                        effects: showOptions.effects,
                        duration: showOptions.duration,
                        complete: function() {
                            that.trigger(ACTIVATE);
                            contentElement.css(OVERFLOW, initialOverflow);
                        }
                    });
                }
            }

            if (that.options.isMaximized) {
               $("html, body").css(OVERFLOW, "hidden");
            }

            return that;
        },

        /**
         * Closes the window
         * @example
         * var wnd = $("#window").data("kendoWindow");
         *
         * wnd.close();
         */
        close: function () {
            var that = this,
                wrapper = that.wrapper,
                options = that.options,
                hideOptions = options.animation.close,
                modalWindows,
                shouldHideOverlay, overlay;

            if (wrapper.is(VISIBLE) && !that.trigger(CLOSE)) {
                modalWindows = openedModalWindows();

                shouldHideOverlay = options.modal && modalWindows.length == 1;

                overlay = options.modal ? that._overlay(true) : $(undefined);

                if (shouldHideOverlay) {
                    if (hideOptions.duration) {
                        overlay.kendoStop().kendoAnimate({
                             effects: { fadeOut: { properties: { opacity: 0 } } },
                             duration: hideOptions.duration,
                             hide: true
                         });
                    } else {
                        overlay.hide();
                    }
                } else if (modalWindows.length) {
                    windowObject(modalWindows.eq(modalWindows.length - 2))._overlay(true);
                }

                wrapper.kendoStop().kendoAnimate({
                    effects: hideOptions.effects,
                    duration: hideOptions.duration,
                    complete: function() {
                        wrapper.hide();
                    }
                });
            }

            if (that.options.isMaximized) {
                $("html, body").css(OVERFLOW, "");
            }

            return that;
        },

        /**
         * Toggles the window between a maximized and restored state.
         */
        toggleMaximization: function (e) {
            if (e && $(e.target).closest(".k-window-action").length > 0) {
                return;
            }

            this[this.options.isMaximized ? "restore" : "maximize"]();
        },

        /**
         * Restores a maximized window to its previous size.
         */
        restore: function () {
            var that = this;

            if (!that.options.isMaximized) {
                return;
            }

            that.wrapper
                .css({
                    position: "absolute",
                    left: that.restorationSettings.left,
                    top: that.restorationSettings.top,
                    width: that.restorationSettings.width,
                    height: that.restorationSettings.height
                })
                .find(".k-resize-handle").show().end()
                .find(".k-window-titlebar .k-restore").addClass("k-maximize").removeClass("k-restore");

            $("html, body").css(OVERFLOW, "");

            that.options.isMaximized = false;

            that.trigger(RESIZE);

            return that;
        },

        /**
         * Maximizes a window so that it fills the entire screen.
         */
        maximize: function (e) {
            var that = this;

            if (that.options.isMaximized) {
                return;
            }

            var wrapper = that.wrapper;

            that.restorationSettings = {
                left: wrapper.position().left,
                top: wrapper.position().top,
                width: wrapper.width(),
                height: wrapper.height()
            };

            wrapper
                .css({ left: 0, top: 0, position: "fixed" })
                .find(".k-resize-handle").hide().end()
                .find(".k-window-titlebar .k-maximize").addClass("k-restore").removeClass("k-maximize");

            $("html, body").css(OVERFLOW, "hidden");

            that.options.isMaximized = true;

            that._onDocumentResize();

            return that;
        },

        _onDocumentResize: function () {
            if (!this.options.isMaximized) {
                return;
            }

            var wrapper = this.wrapper;

            wrapper
                .css({
                    width: $(window).width(),
                    height: $(window).height()
                });

            this.trigger(RESIZE);
        },

        /**
         * Refreshes the window content from a remote url.
         * @param {String} url The URL that the window should be refreshed from. If omitted, the window content is refreshed from the contentUrl that was supplied upon the window creation.
         * @param {Object} data Data to be sent to the server.
         */
        refresh: function (url, data) {
            var that = this;

            url = url || that.options.contentUrl;

            if (isLocalUrl(url)) {
                that._ajaxRequest(url, data);
            }

            return that;
        },

        _ajaxRequest: function (url, data) {
            var that = this,
                refreshIcon = that.wrapper.find(".k-window-titlebar .k-refresh"),
                loadingIconTimeout = setTimeout(function () {
                    refreshIcon.addClass(LOADING);
                }, 100);

            $.ajax({
                type: "GET",
                url: url,
                dataType: "html",
                data: data || {},
                cache: false,
                error: proxy(function (xhr, status) {
                    that.trigger(ERROR);
                }, that),
                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    refreshIcon.removeClass(LOADING);
                },
                success: proxy(function (data, textStatus) {
                    that.wrapper.children(KWINDOWCONTENT).html(data);

                    that.trigger(REFRESH);
                }, that)
            });
        },

        /**
         * Destroys the window and its modal overlay, if necessary. Useful for removing modal windows.
         */
        destroy: function () {
            var that = this,
                modalWindows,
                shouldHideOverlay;

            that.wrapper.remove();

            modalWindows = openedModalWindows();

            shouldHideOverlay = that.options.modal && !modalWindows.length;

            if (shouldHideOverlay) {
                that._overlay(false).remove();
            } else if (modalWindows.length > 0) {
                windowObject(modalWindows.eq(modalWindows.length - 2))._overlay(true);
            }
        }
    });

    templates = {
        wrapper: template("<div class='k-widget k-window'></div>"),
        titlebar: template(
            "<div class='k-window-titlebar k-header'>&nbsp;" +
                "<span class='k-window-title'>#= title #</span>" +
                "<div class='k-window-actions k-header'>" +
                "# for (var i = 0; i < actions.length; i++) { #" +
                    "<a href='\\#' class='k-window-action k-link'>" +
                        "<span class='k-icon k-#= actions[i].toLowerCase() #'>#= actions[i] #</span>" +
                    "</a>" +
                "# } #" +
                "</div>" +
            "</div>"
        ),
        iframe: template(
            "<iframe src='#= contentUrl #' title='#= title #' frameborder='0'" +
                " style='border:0;width:100%;height:100%;'>" +
                    "This page requires frames in order to show content" +
            "</iframe>"
        ),
        resizeHandle: template("<div class='k-resize-handle k-resize-#= data #'></div>")
    };

    function createWindow(element, options) {
        var contentHtml = $(element);

        if (typeof (options.scrollable) != "undefined" && options.scrollable === false) {
            contentHtml.attr("style", "overflow:hidden;");
        }

        if (options.contentUrl && !isLocalUrl(options.contentUrl)) {
            contentHtml.html(templates.iframe(options));
        }

        $(templates.wrapper(options))
            .append(templates.titlebar(options))
            .append(contentHtml)
            .appendTo(document.body);
    }

    function WindowResizing(wnd) {
        var that = this;

        that.owner = wnd;
        that._draggable = new Draggable(wnd.wrapper, {
            filter: ".k-resize-handle",
            group: wnd.wrapper.id + "-resizing",
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that)
        });
    }

    WindowResizing.prototype = /** @ignore */ {
        dragstart: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper;

            wnd.elementPadding = parseInt(wnd.wrapper.css("padding-top"));
            wnd.initialCursorPosition = wrapper.offset();

            wnd.resizeDirection = e.currentTarget.prop("className").replace("k-resize-handle k-resize-", "").split("");

            wnd.initialSize = {
                width: wnd.wrapper.width(),
                height: wnd.wrapper.height()
            };

            $("<div class='k-overlay' />").appendTo(wnd.wrapper);

            wrapper.find(".k-resize-handle").not(e.currentTarget).hide();

            $(document.body).css("cursor", e.currentTarget.css("cursor"));
        },
        drag: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper,
                resizeHandlers = {
                    "e": function () {
                        var width = e.pageX - wnd.initialCursorPosition.left;

                        wrapper.width((width < wnd.options.minWidth ? wnd.options.minWidth
                                    : (wnd.options.maxWidth && width > wnd.options.maxWidth) ? wnd.options.maxWidth
                                    : width));
                    },
                    "s": function () {
                        var height = e.pageY - wnd.initialCursorPosition.top - wnd.elementPadding;

                        wrapper
                            .height((height < wnd.options.minHeight ? wnd.options.minHeight
                                : (wnd.options.maxHeight && height > wnd.options.maxHeight) ? wnd.options.maxHeight
                                : height));
                    },
                    "w": function () {
                        var windowRight = wnd.initialCursorPosition.left + wnd.initialSize.width,
                            width = windowRight - e.pageX;

                        /// TODO: use Math.min / Math.max to sort these out
                        wrapper.css({
                            left: e.pageX (windowRight - wnd.options.minWidth) ? windowRight - wnd.options.minWidth
                                : e.pageX < (windowRight - wnd.options.maxWidth) ? windowRight - wnd.options.maxWidth
                                : e.pageX,
                            width: (width < wnd.options.minWidth ? wnd.options.minWidth
                                   : (wnd.options.maxWidth && width > wnd.options.maxWidth) ? wnd.options.maxWidth
                                   : width)
                        })
                    },
                    "n": function () {
                        var windowBottom = wnd.initialCursorPosition.top + wnd.initialSize.height,
                            height = windowBottom - e.pageY;

                        /// TODO: use Math.min / Math.max to sort these out
                        wrapper.css({
                            top: e.pageY > (windowBottom - wnd.options.minHeight) ? windowBottom - wnd.options.minHeight
                               : e.pageY < (windowBottom - wnd.options.maxHeight) ? windowBottom - wnd.options.maxHeight
                               : e.pageY,
                            height: (height < wnd.options.minHeight ? wnd.options.minHeight
                                  : (wnd.options.maxHeight && height > wnd.options.maxHeight) ? wnd.options.maxHeight
                                  : height)
                        });
                    }
                };

            each(wnd.resizeDirection, function () {
                resizeHandlers[this]();
            });

            wnd.trigger(RESIZE);
        },
        dragend: function (e) {
            var wnd = this.owner,
                wrapper = wnd.wrapper;

            wrapper
                .find(KOVERLAY).remove().end()
                .find(".k-resize-handle").not(e.currentTarget).show();

            $(document.body).css("cursor", "");

            if (e.keyCode == 27) {
                wrapper.css(wnd.initialCursorPosition)
                    .css(wnd.initialSize);
            }

            return false;
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
            dragend: proxy(that.dragend, that)
        });
    }

    WindowDragging.prototype = /** @ignore */{
        dragstart: function (e) {
            var wnd = this.owner;

            wnd.initialWindowPosition = wnd.wrapper.position();

            wnd.startPosition = {
                left: e.pageX - wnd.initialWindowPosition.left,
                top: e.pageY - wnd.initialWindowPosition.top
            };

            $(".k-resize-handle", wnd.wrapper).hide();

            $("<div class='k-overlay' />").appendTo(wnd.wrapper);

            $(document.body).css("cursor", e.currentTarget.css("cursor"));
        },
        drag: function (e) {
            var wnd = this.owner,
                coordinates = {
                    left: e.pageX - wnd.startPosition.left,
                    top: Math.max(e.pageY - wnd.startPosition.top, 0)
                };

            $(wnd.wrapper).css(coordinates);
        },
        dragend: function (e) {
            var wnd = this.owner;

            wnd.wrapper
                .find(".k-resize-handle").show().end()
                .find(KOVERLAY).remove();

            $(document.body).css("cursor", "");

            if (e.keyCode == 27) {
                e.currentTarget.closest(KWINDOW).css(wnd.initialWindowPosition);
            }

            return false;
        }
    };

    kendo.ui.plugin("Window", Window);

})(jQuery);
