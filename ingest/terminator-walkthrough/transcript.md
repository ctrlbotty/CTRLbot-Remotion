# CTRLbot Terminatior Tutorial: transcript

**Status: DRAFT.** Machine transcript from `faster-whisper 1.2.1` `medium.en`, not yet
checked against the recording. Correct it by hand against the frames in
`ingest/terminator-walkthrough/contact.html`, then change this line to `Status: corrected <date>`.
Once corrected it is the script of record, and a re-run of `npm run ingest:recording`
leaves it alone unless given `--force`.

- Source: `video input/CTRLbot Terminatior Tutorial.mp4` (8:39, h264 1460x1080 10fps, aac 44100 Hz mono)
- Narration: `public/narration/terminator-walkthrough/source-normalized.m4a`
- Word timings: `ingest/terminator-walkthrough/words.json`, in seconds on the narration track, which
  shares the recording's time base. Cut a narration edit list straight from them.

"Control Bot" is written **CTRLbot**. Product names past that, and anything misheard, are
corrected by hand. Filler and false starts stay: this is an index into what was said, not
a polished read.

---

## Timestamped transcript

| Time | Line |
| --- | --- |
| 0:00.3 | Welcome to CTRLbot. This will be a short walkthrough of our latest utility called CTRLbot Terminator. It's not as scary as it sounds. It's basically a terminal app for PC right now, and it does several things. It can scan your network. It can set up a server for testing. |
| 0:29.6 | It can connect to devices and allow you to communicate with them through their APIs. |
| 0:40.2 | You can also connect to devices using the USB to serial ports on your PC, or even set |
| 0:49.8 | up and connect to an SSH host. |
| 0:55.3 | So let's begin. |
| 0:56.0 | And we'll start with the scan, right? |
| 1:00.4 | You basically can scan any one of your network ports |
| 1:05.9 | and hit the scan button. |
| 1:09.0 | And right now there's no customization here. |
| 1:13.5 | Later feature sets will add more, |
| 1:17.7 | the ability to scan various certain subnets on a network. |
| 1:21.8 | For now, you can see it gives us |
| 1:23.8 | a lot of good information here, right? |
| 1:26.0 | You can get the host name, device name, manufacturer, |
| 1:31.3 | as well as Mac address. |
| 1:34.0 | And if you scroll over, you can see that there's even links |
| 1:36.8 | that you can go to directly to the website |
| 1:45.3 | and view a device webpage right there, right? |
| 1:51.2 | It's a real handy scan. |
| 1:54.4 | And you can see I got 50 devices on the network |
| 1:58.4 | and a lot of good information here. |
| 2:00.8 | And I can use these later |
| 2:03.3 | when I'm making these connections down the line. |
| 2:08.7 | Now let's take a look at our TCP server, right? |
| 2:13.3 | What this is really for, or why I created it, |
| 2:17.0 | but it could have a lot of different applications, |
| 2:19.0 | is for testing, creating a connection |
| 2:23.3 | so that you can test, say, our CTRLbot IoT app from it. |
| 2:29.9 | So here I'm going to create a connection in our app |
| 2:37.9 | and you can see down here on the bottom, |
| 2:40.0 | this gives you your IP address |
| 2:41.9 | and I can just copy that right over |
| 2:45.3 | And then I'm gonna add that in to my connection right here, |
| 2:49.3 | and you can see I can paste it |
| 2:50.7 | with our handy dandy CTRLbot mirror. |
| 2:55.2 | And this is mirroring our app on an Android tablet. |
| 3:00.2 | And you can see I have that IP address in there. |
| 3:04.4 | So at this point, I can create this server on my laptop |
| 3:10.2 | and then connect to that IP address |
| 3:13.5 | and the port right here. |
| 3:16.8 | And now you can see that I'm actually connected to it, |
| 3:19.9 | and I can send commands over to it, |
| 3:23.3 | and they show up over here, |
| 3:25.6 | and I can send commands back and forth, |
| 3:27.9 | like hello world, very popular command, test command. |
| 3:35.3 | And you can see that goes through |
| 3:37.2 | and shows up on our app inside the terminal. |
| 3:44.0 | Up here, you'll notice there's a little pin. |
| 3:45.8 | If you need to save any of these connections, you can always just pin it, |
| 3:50.7 | and then they'll be available for the next time so that you can have |
| 3:55.4 | various ports that you might need to connect to or create a server for. Now |
| 4:05.3 | we're going to go the other direction. Now we're going to connect to devices |
| 4:09.5 | that are on the network. For this, we'll connect to a Samsung display that's going to be at |
| 4:23.7 | this IP address and at this port. You see I'm connected here and I'm going to send the |
| 4:48.6 | power on to the display. |
| 4:54.5 | And then in my not released yet server device lab, |
| 5:02.1 | you can see that I'm able to see that power on command |
| 5:06.6 | coming through and I can send a display on back |
| 5:13.2 | to my connection in real time. |
| 5:16.3 | And that's just one way you can connect. |
| 5:20.6 | And this is a raw TCP connection. |
| 5:23.7 | So it's good for Telnet or any real port, TCP port. |
| 5:35.1 | Next, I'd like to show our COM ports, right? |
| 5:38.9 | And so this is a PC and you can connect a serial |
| 5:43.7 | via USB or Bluetooth. |
| 5:46.8 | A lot of people may not know that |
| 5:48.3 | depending on the capabilities of your machine. |
| 5:51.6 | What we're gonna do, I have two COM ports |
| 5:54.7 | that are USB.com that are set up, |
| 5:59.7 | and I'm gonna connect them to each other |
| 6:01.4 | so they can talk to each other. |
| 6:03.2 | So you can see right here, I have a little refresh button. |
| 6:05.3 | You might need a refresher to see all your COM ports. |
| 6:07.9 | And these are all the COM ports |
| 6:09.0 | that are showing up right here. |
| 6:10.8 | If I come in to, if I come down here to Device Manager, |
| 6:18.9 | You can see that you can find your ports right here. |
| 6:25.9 | And you can see that there's a COM12 |
| 6:28.5 | and COM9 are USB to serial ports. |
| 6:32.7 | So let's set that up. |
| 6:35.4 | And I'll just change it to something else. |
| 6:38.7 | And we fully support all the parameters |
| 6:41.0 | for most serial communication. |
| 6:44.0 | And then we're just gonna open that up. |
| 6:46.6 | On the other side, because these are connected to each other, I'll open up to 12. |
| 6:53.4 | Was it 38? Yeah it was. And we'll open up that. And now we are connected and |
| 7:03.6 | we can talk to each other. Look at that. And there's our whole hello world. Goodbye. |
| 7:13.0 | Well, it's not even buy, but hey, whatever, right? |
| 7:17.4 | And you can see we're connected. |
| 7:23.1 | Finally, I'd like to show that we have an SSH client as well. |
| 7:29.2 | So you're able to connect to an SSH client, |
| 7:32.5 | and you can do that right here. |
| 7:37.6 | We'll use our Luxel, right? |
| 7:40.4 | I could just copy that right over and put it in there. |
| 7:46.5 | All right, and you'll want to put in the credentials. |
| 7:55.6 | If you need to see them, |
| 7:56.9 | we have a nice little eye right there. |
| 7:58.7 | Okay, that looks correct. |
| 8:01.5 | And oh, okay, it looks like I'm connected. |
| 8:03.7 | Let's just see, I'll type in help. |
| 8:06.4 | Oh yes, we are connected to Luxall |
| 8:09.3 | and everything is showing up just great. |
| 8:12.4 | Great. |
| 8:13.2 | Well, this has been a short little walkthrough |
| 8:16.8 | of the terminal and we went over how to scan, |
| 8:20.9 | how to create a TCP server, |
| 8:23.4 | how to connect to a device via Telnet, |
| 8:27.1 | SSH client or through the serial com ports. |
| 8:31.8 | Thank you. |
