const Lang = imports.lang;
const Main = imports.ui.main;
const MessageTray = imports.ui.messageTray;
const Util = imports.misc.util;

const NasaApodWebsiteURL = "https://apod.nasa.gov/apod/";

const LongNotification = new Lang.Class({
    Name: 'LongNotification',
    Extends: MessageTray.Notification,

    createBanner: function() {
        // Explanations are usually longer than default
        let banner = this.source.createBanner(this);
        banner.setExpandedLines(20);
        return banner;
    }
});

function notify(msg, details, transient) {
    // set notifications icon
    let source = new MessageTray.Source("NASA APOD", "saturn");
    // force expanded notification
    source.policy = new MessageTray.NotificationPolicy({ enable: true,
                                        enableSound: true,
                                        showBanners: true,
                                        forceExpanded: true,
                                        showInLockScreen: true,
                                        detailsInLockScreen: true
                                      });
    Main.messageTray.add(source);
    let notification = new LongNotification(source, msg, details);
    notification.setTransient(transient);
    // Add action to open NASA APOD website with default browser
    notification.addAction("NASA APOD website", Lang.bind(this, function() {
        Util.spawn(["xdg-open", NasaApodWebsiteURL]);
    }));
    source.notify(notification);
}

function notifyError(msg, details) {
    let prefix = 'NASA APOD extension error';
    if (details) {
        log(prefix + ': ' + msg + ': ' + details);
        Main.notify(prefix, msg + ': ' + details);
    } else {
        log(prefix + ': ' + msg);
        Main.notify(prefix, msg);
    }
}
