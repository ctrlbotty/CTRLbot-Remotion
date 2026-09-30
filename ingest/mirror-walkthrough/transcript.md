# CTRLbot Mirror Tutorial: transcript

**Status: corrected 2026-09-30.** Machine transcript from `faster-whisper 1.2.1` `medium.en`, checked
against the recording.
Fixed: capitalised Galaxy Continuity at 6:47.5; confirmed ADB, IoT, Epson and 169 against the stills.
Once corrected it is the script of record, and a re-run of `npm run ingest:recording`
leaves it alone unless given `--force`.

- Source: `video input/CTRLbot Mirror Tutorial.mp4` (8:29, h264 1840x1080 10fps, aac 44100 Hz mono)
- Narration: `public/narration/mirror-walkthrough/source-normalized.m4a`
- Word timings: `ingest/mirror-walkthrough/words.json`, in seconds on the narration track, which
  shares the recording's time base. Cut a narration edit list straight from them.

"Control Bot" is written **CTRLbot**. Product names past that, and anything misheard, are
corrected by hand. Filler and false starts stay: this is an index into what was said, not
a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:00.4 | Welcome to CTRLbot. This will be a walkthrough of one of our utilities called CTRLbot Mirror, |
| 0:09.7 | which is basically a way to mirror what is on your Android phone or tablet. |
| 0:18.2 | I've already done the install of the application, and this is just for PC and just for Android phones or tablets. |
| 0:26.8 | So I've done the basic installation, |
| 0:30.5 | but what we also have to do is we have to install ADB. |
| 0:33.8 | And these are tools for Android that help you |
| 0:38.7 | not only to connect to your device, |
| 0:41.0 | but also manage applications on it |
| 0:44.0 | and also control applications |
| 0:47.0 | like we will in a second here. |
| 0:49.6 | So first let's come here and we'll do the install. |
| 0:53.2 | All right, now that we have all this set up, |
| 1:09.9 | what we'll want to do is, |
| 1:12.4 | you'll want to go onto your device |
| 1:15.1 | and go into settings, about phone, build number, |
| 1:20.4 | which we'll tap seven times, go back to here |
| 1:24.7 | and I'll kind of give you a walkthrough |
| 1:26.5 | of that right now. |
| 1:28.6 | Once you have it all set up, |
| 1:30.2 | you'll be able to connect to it right through this. |
| 1:33.1 | In the initial time, you'll be asked to authorize |
| 1:37.0 | that connection on your device. |
| 1:39.3 | And once that's authorized, |
| 1:40.5 | you'll see that it's now green and ready, |
| 1:43.2 | and we can just click on it and start mirroring, right? |
| 1:49.6 | And here we are. |
| 1:51.1 | What you see right now is the basic setup. |
| 1:55.0 | It's framed with a rounded, but you can, we can, |
| 1:58.5 | let's pick one of these other ones here |
| 2:01.4 | so that we have something a little bit |
| 2:05.0 | a better fit for it. |
| 2:07.1 | And you can see we have the whole part right there. |
| 2:10.3 | And you can change other options here |
| 2:12.2 | like padding and shadow and such. |
| 2:16.2 | To kind of go through what the original tutorial |
| 2:20.7 | was talking about is that you're gonna wanna go |
| 2:24.4 | to settings, about, |
| 2:41.7 | and then you'll click on that build number |
| 2:46.8 | under software information, |
| 2:50.0 | and then you click on this seven times, |
| 2:52.4 | and then it'll turn on developer mode, right? |
| 2:55.9 | And developer mode, once it's hooked up, |
| 3:00.7 | then you'll just come back to your settings, |
| 3:07.2 | and you'll see developer options down at the bottom. |
| 3:10.5 | And this is where you can set up |
| 3:12.2 | and make sure that USB debugging mode is on |
| 3:16.5 | if you're connected to USB, |
| 3:17.9 | or if you wanted to connect through wirelessly, |
| 3:20.5 | you can do that here as well. |
| 3:22.7 | And if you pair over wirelessly, |
| 3:24.2 | you can do it through a code |
| 3:26.2 | as long as you're connected and on the same network. |
| 3:30.5 | So let's get to some of the other stuff. |
| 3:34.7 | You can see we have our IoT app right here. |
| 3:39.7 | And what basically this mirroring does, |
| 3:44.6 | it allows us to be able to do some copying and pasting |
| 3:50.4 | or some configurations that maybe you |
| 3:52.8 | wouldn't be able to do or it's cumbersome to do straight |
| 3:56.5 | from the panel. |
| 3:59.0 | So you can tell from devices here, |
| 4:03.8 | if I wanted to add a device, I could come in |
| 4:07.4 | and I could say add a Epson projector, right? |
| 4:11.7 | And if I did a scan of the network, |
| 4:23.6 | oh, I could see that my Epson projector is at, |
| 4:28.7 | let's just say 169. |
| 4:34.6 | Let me just come in and you can copy that. |
| 4:38.3 | And then you can just paste that right in here. |
| 4:40.8 | And there you go. |
| 4:42.0 | and then you'll be able to connect to the device that way. |
| 4:45.6 | And you can also copy the other way |
| 4:48.1 | or even type in anything manually from right here, |
| 4:52.0 | pretty easily, you know, |
| 4:54.9 | if you want to just put it in, right like that. |
| 4:59.9 | So that's just one of the many benefits to seeing this. |
| 5:05.3 | Additionally, if you wanted to take screenshots |
| 5:08.8 | of what you're working on, |
| 5:11.4 | You can come in here and just hit the screenshot button, and then you can see that |
| 5:18.1 | that screenshot of this image right here is being saved to a folder if you needed to do |
| 5:25.3 | that for any kind of troubleshooting or looking at anything else. You can also come in and |
| 5:33.2 | record it as video, and the video is going to record not just what you're going through, |
| 5:40.8 | right? Not just, but it's also going to record your voice. And this way you can do a whole tutorial |
| 5:47.8 | about this app or anything, right? Any app that you're building, |
| 5:54.8 | this is a really useful tool well beyond what, you know, CTRLbot itself is doing here. |
| 6:01.9 | And again, that'll be saved in that one folder. And you come in here and you can see |
| 6:07.2 | some of these options for capture, |
| 6:12.2 | for recording format, for streaming format, |
| 6:15.9 | and you can also set where these are being saved. |
| 6:25.1 | Moving down the line, you can see that there's also, |
| 6:28.8 | you have access to all the apps that are on this device |
| 6:32.3 | and this is a really great feature |
| 6:36.4 | because you can come in and you can delete, remove stuff in here that |
| 6:42.7 | sometimes you may not even be able to remove, right? Like, you know, you may |
| 6:47.5 | not be able to remove a Galaxy Continuity or, you know, some of the |
| 6:53.6 | things that are set up on here that have absolutely nothing to do |
| 6:59.1 | with, you know, what you want. There's a lot of garbageware on |
| 7:03.9 | here that comes with any kind of Android device, and this will allow you |
| 7:09.8 | to come in and really clean up your phone, your Android phone or tablet. It's |
| 7:16.6 | just a great feature, but it also allows you to really look at it |
| 7:22.2 | and to manage stuff from it. I think I need to keep all the |
| 7:33.9 | If you wanted to look at your images, |
| 7:36.5 | you'd be able to copy stuff over right here. |
| 7:39.9 | And you can also add packages and files |
| 7:43.6 | directly by just dragging, dropping into this area. |
| 7:47.7 | It has a lot more uses than just what you see. |
| 7:52.0 | You can also, we have also a shell, |
| 7:55.9 | and then you can also look at the logs |
| 7:58.2 | for the device if you want. |
| 7:59.6 | And you can also set up virtual devices. |
| 8:04.6 | So anyway, these are just some of the many |
| 8:07.6 | features that we have here |
| 8:11.5 | and you can see we also have, you can come back to this |
| 8:15.6 | setup if you're ever having problems. Thank you for |
| 8:22.1 | your time and just email me |
| 8:26.2 | if you have any questions. |
