(function (kWidget) {

var template = [
'<div class="c-speaker-container">',
    '<ul class="c-speaker-tabs">',
        '<li><a href="#">Speaker</a></li>',
        '<li><a href="#">Files</a></li>',
    '</ul>',
    '<div class="c-speaker-tab-content">',
        '<div>',
            '<img>',
            '<h3><small></small><a class="c-speaker-email">E-mail</a></h3>',
            '<p></p>',
        '</div>',
        '<div>Loading...</div>',
    '</div>',
'</div>'
].join('');

function ifPresent(field, html)
{
    if (!field)
        this.remove();
    else if (typeof html == "function")
        html.call(this);
    else
        this.html(html || field);
}

function SpeakerUI(kdp, api, entry, xml)
{
    var t = this,
        tmpl = $(template);

    t.kdp = kdp;
    t.api = api;
    t.entry = entry;
    t.config = t.parseXML(xml);

    t.container = tmpl;
    t.tabs = tmpl.find(".c-speaker-tabs a");
    t.tab_content = tmpl.find(".c-speaker-tab-content div");
    t.position(kdp.evaluate("{speakerInfo.widgetPosition}"));

    t.tabs.on("click", function (e) {
        t.changeTab($(this).is(".c-active") && -1 || $.inArray(this, t.tabs));
        e.preventDefault();
    });

    $.each([
        t.speakerTab,
        t.filesTab
    ], function (i, fn) {
        fn.call(t, t.tab_content.eq(i));
    });
}

SpeakerUI.prototype = {
    position: function (pos)
    {
        var t = this;

        switch(pos) {
        case "left":
        case "right":
            if (pos == "left")
                $(t.kdp).before(t.container);
            else
                $(t.kdp).css("float", "left").after(t.container);

            t.container.addClass("c-side").css("float", "left");
            t.tab_content.parent().height($(t.kdp).height() - t.container.find(".c-speaker-tabs").outerHeight() - 1);
            t.changeTab(0);
            t.side = true;
            break;
        default:
            $(t.kdp)[pos == "bottom" ? "after" : "before"](t.container.width($(t.kdp).width()));
        }
    },

    parseXML: function (xml)
    {
        var ret = {},
            doc = $($.parseXML(xml));

        $.each(["Name", "Email", "Biography", "Credentials", "Image", "Links", "Rss", "Files"], function (_, field) {
            ret[field] = doc.find(field).text();
        });

        return ret;
    },

    changeTab: function (i)
    {
        var t = this;

        t.tabs.removeClass("c-active");
        t.tab_content.hide();

        if (i != -1)
        {
            t.tabs.eq(i).addClass("c-active");
            t.tab_content.eq(i).show();
        }
    },

    removeTab: function (tab)
    {
        var t = this,
            index = $.inArray(tab.get(0), t.tab_content);

        tab.add(t.tabs.eq(index).parent()).remove();
    },

    speakerTab: function (tab)
    {
        var t = this,
            cfg = t.config;

        if (!cfg.Name)
            return t.removeTab(tab);

        //Image
        ifPresent.call(tab.find("img"), cfg.Image, function () {
            this.attr("src", kWidget.getKalturaThumbUrl({
                partner_id: t.kdp.evaluate("{configProxy.kw.partnerId}"),
                entry_id: cfg.Image,
                width: 130,
                height: 130
            })).attr("alt", cfg.Name);
        });

        //Name
        tab.find("h3").prepend(cfg.Name);
        ifPresent.call(tab.find("h3 small"), cfg.Credentials);

        //Email
        ifPresent.call(tab.find("a"), cfg.Email, function () {
            this.attr("href", "mailto:" + cfg.Email);
            if(!t.side) tab.find("h3").after(this);
        });

        //Bio
        tab.find("p").html(cfg.Biography.replace(/\n/g, "<br>"));
    },

    filesTab: function (tab)
    {
        var t = this,
            list = $("<ul/>");

        t.api.doRequest({
            service: "attachment_attachmentasset",
            action: "list",
            "filter:entryIdEqual": t.entry,
        }, function (data) {
            if (!data || !data.objects || !data.objects.length)
                return t.removeTab(tab);

            data.objects.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });

            t.api.doRequest($.map(data.objects, function (attachment) {
                return {
                    service: "attachment_attachmentasset",
                    action: "getUrl",
                    id: attachment.id
                };
            }), function (urls) {
                if (!$.isArray(urls))
                    urls = [0, urls];

                for (var i = 1; i < urls.length; i++)
                {
                    list.append($("<a/>", {
                        text: data.objects[i - 1].title,
                        href: urls[i],
                        target: "_blank"
                    }).wrap("<li/>").parent());
                }

                tab.empty().append(list);
            });
        });
    }
};

kWidget.addReadyCallback(function (playerId) {
    var kdp = document.getElementById(playerId),
        api = new kWidget.api({ wid: kdp.evaluate("{configProxy.kw.id}") }),
        entry = kdp.evaluate("{mediaProxy.entry.id}");

    kdp.kBind("changeMedia.speakerInfo", function () {
        api.doRequest({
            service: "metadata_metadata",
            action: "list",
            "filter:objectType": "KalturaMetadataFilter",
            "filter:objectIdEqual": entry
        }, function (data) {
            if ((data = data && data.objects && data.objects[0]))
                $(kdp).data("speaker", new SpeakerUI(kdp, api, entry, data.xml));
        });

        kdp.kUnbind(".speakerInfo");
    });
});

})(kWidget);
