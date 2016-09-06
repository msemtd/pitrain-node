# pitrain-node
Pi memorisation tool using the Major System and the CMU phonetic dictionary.

Using nodejs, express, jade/pug, JQuery, Ajax, etc.

* The /pi page allows user to grab digits of pi in blocks of 10 from the first 10000 digits
* the /scandig page allows the user to scan the CMU phonetic dictionary for words that appear as major digit sequences within a block of digits. Data is grabbed with Ajax and stuffed in a JQuery DataTables table.

## How it works

Memorising long sequences of digits is hard! Unless, of course, the digits follow some pattern so you can easily generate digits on demand from some starting condition - I'm not talking about those numbers! I'm talking about phone numbers or something like pi, e, or root-2 where the digit sequence is seemingly random and follows no recognisable pattern. For these, the human brain requires something less abstract to hook into in order to retain this dry, obscure data. It is much, much easier, as a human, to remember stories, songs, scenarios, feelings - something sensory and tangible. That's the type of information that our brains are wired for! A system is needed to encode the number sequence into something more memorable. Then to recall the digits the decoding just needs to be error free and unambiguous. The Mnemonic Major System is a pretty standard way of encoding numeric digits as consonant sounds. Then words can be chosen to fit the sequence of consonants, sentences built up from the words, and a narrative can be built to make very long sequences memorable.

There are way more sounds (aka phonemes - maybe 50 in English) than there are digits (10) so only "hard" consonants sounds are used and these can be freely interspersed with vowels and soft consonant sounds ("w", "y", etc.) so the mapping is loose in one direction and strict in the other; by that I mean that you may be able to make umpteen different words from a sequence of digits but going from the words back to the digits will always get the correct digits back (as long as your encoding is accurate and complete).

See https://en.wikipedia.org/wiki/Mnemonic_major_system for detail but in brief, the digit mappings are as follows...

* 1 = t, d, th
* 2 = n, ng
* 3 = m
* 4 = r
* 5 = l
* 6 = j, ch, sh
* 7 = k, g, (hard-c)
* 8 = f, v
* 9 = b, p
* 0 = s, z

In order to become proficient in the Major system, I decided to learn some digits of pi. "A hundred sounds doable!" I thought. This was the start of January 2016, and I set myself a deadline of learning this by World Pi Day on the 14th of March. I reached my goal of 100 digits in about a week so I carried on learning digits, ten at a time, and by pi day I had about 600 digits! I soon realised that what could be viewed as an arduous task, was an enjoyable and rewarding creative writing exercise! Somewhat closer to the restrictive patterns of song writing or creating haiku than free prose storytelling.

I have chosen to memorise in blocks of 10 digits. This restriction helps keep me on track: the words that I choose cannot cross a 10 digit boundary, and the little group of 3 to 5 words makes a little sentence or phrase. The phrase is usually silly or nonsense but I make sure that it is always memorable in the general ongoing narrative within its neighbours.

As a computer nerd, I quickly became interested in what I could possibly create to help me choose interesting words from the rich language we have. I had previously worked with  open source speech synthesis and speech recognition software as part of my Cheesoid robot project so I was familiar with the state-of-the-art. In trying to make text into recognisable speech and vice-versa, some amazingly useful resources have emerged, the most important of which is the Carnegie Mellon University (CMU) Pronouncing Dictionary (see http://www.speech.cs.cmu.edu/cgi-bin/cmudict).

## TODO: -

* Use Bower for JS packages on the browser side
* Dynamic use of JQuery DataTables for results paging on the browser
* CSS it up!

The old TODO list:-
* import and cache CMUdict, phonemes, major-mappings, etc. - DONE
* page for major system help - just link to wikipedia to start with
* provide form to query groups of digits and initiate searches for major mappings - DONE
** this is the early important one: need simple UI for querying blocks of pi digits (initially only in 10s) and working on those blocks - DONE
** fields: pi digit block start, pi digit block length, or text digits field entered by user
** buttons to select digits or work on digits - all async if possible - render to single page or multi page?
* page for CMU dict words search on a digit sequence - DONE
** minimum length filter - cache results? - DONE
*** show cache - cache to files - cache to CSV or TSV?
*** automatically create caches of files for 1000 digits with this system? Min 2 digit words
* CSV production with caching
* word choosing form - processes cached search
* use a templating engine within express - DONE
** just choose one? - using the default Jade/Pug but getting increasingly annoyed with it!
** I want async partials (I think!) - using AJAX to pass back blocks of data during scan
** single page would be rad
* authentication, etc.


