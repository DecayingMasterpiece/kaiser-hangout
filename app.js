(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mobile = window.matchMedia("(max-width: 900px)");
  var ORDER = ["right", "wrong", "missed", "eight"];
  var room = null, flat = [], sel = -1;

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function src(n) { return "proof/" + (n.indexOf(".") > -1 ? n : n + ".webp"); }
  function media(n) {
    if (/\.mp4$/.test(n)) return '<video controls preload="metadata" playsinline src="' + src(n) + '"></video>';
    return '<img alt="Screenshot of the messages" src="' + src(n) + '">';
  }
  function proofs(list) { return list && list.length ? '<div class="proofs">' + list.map(media).join("") + "</div>" : ""; }
  function head(it) {
    return '<span class="stamp ' + it.cls + '">' + esc(it.stamp) + "</span>" +
      '<p class="who">' + esc(it.who) + "</p><h2 class=\"quote\">" + esc(it.q) + "</h2>";
  }

  var SPECIAL = {
    vs: function () {
      return '<p class="say">I\'ve got 8 things in room one that I got wrong, and some of them were pointed out by people who were making fun of me at the time. This is the part I care about most.</p>' +
        '<div class="vs"><div class="panel me"><h3>Me</h3><ul>' +
        "<li>Said sorry for \"slavery\" and changed the title</li>" +
        "<li>Told someone in that chat \"I think its my fault for making the video first before reaching out\"</li>" +
        "<li>Told them I'd stop brutally criticizing people and focus on their actions</li>" +
        "<li>Admitted I use AI on camera, when nobody had shown any proof</li>" +
        "<li>Admitted the comments were rage bait</li>" +
        "<li>Took back the clips and numbers in room one</li></ul></div>" +
        '<div class="panel him"><h3>8sty</h3><ul>' +
        "<li>\"Not 1 single time\", when the clip of \"100% legit\" exists</li>" +
        "<li>\"nobody is crashing out over his video lol, its just a shit video\"</li>" +
        "<li>\"no lol its a 1 sided beef\", after an 8 minute video about me</li>" +
        "<li>\"He's trying to farm drama for views\", 40 minutes after \"it makes me money\"</li>" +
        "<li>\"Apparently he ratted the people who bought it\", right after \"didn't know if it was true\"</li></ul></div></div>" +
        '<div class="note"><b>To be fair to him:</b> at the end of "I was wrong about everything?" he asks "did I get anything wrong? Because I don\'t believe that I\'m right about everything." So here\'s a list. I went through six of his videos from October 19 to November 4 and every message in these recordings, and I can\'t find him saying "I was wrong about this" about anything to do with me. If he has, send me the link and I\'ll put it at the top of this page.</div>' +
        proofs(["d_fault", "apology-post.webp", "crashing", "onesided", "farm", "8sty-never-said-legit.png"]);
    },
    kid: function () {
      return '<p class="say">One person in that chat told me they\'re 13. I\'m keeping that name covered, and I don\'t hold anything they said against them. I told them that when they said sorry, and it\'s still true.</p>' +
        proofs(["d_accepted", "d_apology"]) +
        '<p class="say">I said hello at 10:55. At 10:56 they said sorry, and nobody asked them to. We then talked for over half an hour, disagreed about a lot of it, and they gave me advice about my content that I\'m actually taking. It ended with "best of luck with the new content". That\'s how disagreeing is supposed to go.</p>' +
        '<p class="big">8sty, you\'re an adult. A 13-year-old in your own group chat did the thing you still haven\'t done.</p>' +
        '<p class="say">You\'ve got a job, you went to college, and you\'ve got a lot of kids watching how you handle this. You can think I\'m wrong about Swift and you can hate my videos. I\'d just like one honest sentence, "I was too confident, my bad", the same kind I\'ve been saying all over this page.</p>';
    },
    nothing: function () {
      return '<p class="say">Since my video came out, I went looking for everything 8sty has admitted he got wrong. Here\'s the complete list, I didn\'t cut anything.</p>' +
        '<div class="empty"><span>This space is intentionally blank.</span></div>' +
        '<p class="say">He said "100% legit" and then "Not 1 single time", and he still hasn\'t answered that. All he had to say was "yeah, I was too confident, my bad". That\'s 6 words, and I\'ve heard him say a lot more than that about skin cases.</p>' +
        proofs(["8sty-never-said-legit.png", "8sty-100-legit.mp4"]);
    },
    notime: function () {
      return '<p class="say">He has no time for this, he has a full time job. So I went through my recordings and counted the different minutes he posted in that chat while I was the topic: 8:56, 8:58, 8:59, 9:08, 9:09, 9:10, 9:13, 9:17, 9:18, 9:19 and 9:50. That\'s 11 in one night, and when I asked if "12 hrs of free for all" was the full time job, his answer was "Yes".</p>' +
        proofs(["notime", "clickbait", "dontengage", "farm"]);
    },
    theory: function () {
      return '<p class="say">Everything here is my opinion. I can\'t read his mind and he\'s free to tell me I\'m wrong. The dates are just the dates though.</p>' +
        '<ol class="story">' +
        '<li><time>October 28</time><p class="say">8sty: "this is why I think that Swift is 100% legit".</p></li>' +
        '<li><time>November 2</time><p class="say">8sty: "I am never saying that Swift is 100% legit".</p></li>' +
        '<li><time>November 3</time><p class="say">Corax uploads "The #1 Rivals Player is Being Protected...", going at 8sty\'s Swift video.</p></li>' +
        '<li><time>November 4</time><p class="say">8sty says he "literally can\'t respond" to it because of the slurs. The same day, he uploads "This rivals youtuber sucks", about me, where he says he doesn\'t want to give me attention and then gives me 8 minutes of it.</p></li>' +
        "</ol>" +
        '<p class="say">So here\'s what I think. People had real questions about his contradictions on Swift, and instead of answering them he gave his audience someone else to laugh at. A smaller guy with a slavery title is a much easier video than a frame count. I said this in a DM the same night, way before this page existed:</p>' +
        proofs(["t_timing"]) +
        '<p class="say">Maybe it\'s a coincidence and he just happened to watch my video that week. If it isn\'t, then pointing your audience at someone else so they stop asking about your own contradictions is scummy behaviour, and I\'d say that to him directly. He can clear it up any time by answering the frame counts.</p>';
    },
    scared: function () {
      return '<p class="say">Again, this is my opinion. I don\'t know what goes on in his life and I\'m not going to guess, so I\'m only going off what he does in public and in that chat.</p>' +
        '<p class="say">When someone criticizes him, he doesn\'t answer the point. He says it\'s AI, he says it\'s slurs, he says it\'s clickbait, he says he has no time, or he says "no lol". When he does look at a criticism, he stops the video 5 seconds before the numbers. And his advice to his friends about me was "js dont engage w his videos and he instantly loses".</p>' +
        '<p class="big">That doesn\'t look like someone who thinks I\'m wrong. To me it looks like someone who doesn\'t want to be shown he\'s wrong in front of his audience.</p>' +
        '<p class="say">I could be wrong about that too. This whole page shows what it looks like when you admit you\'re wrong, so you\'ve got a guide now, 8sty.</p>' +
        proofs(["dontengage", "hearq"]);
    },
    question: function () {
      return '<p class="say">This one isn\'t about Rivals. You can think my videos are terrible, and you can say so to my face. I\'d respect that a lot more. What I\'m asking about is the part where you say "big fan", "we should all jus be friends" and "means so much too me", and then go back to the chat.</p>' +
        '<p class="say">Some of you are kids and I don\'t hold it against you. I told Sketchy no hard feelings and I\'m not taking that back. I just want you to read your own messages next to mine and think about it for a second.</p>' +
        '<p class="big">If someone did this to you, what would you call them?</p>';
    },
    "final": function () {
      return '<p class="say">I was kind to you in your chat. I told Sketchy "no hard feelings" and I told someone else I wouldn\'t hold it against them. I\'m not asking anyone for an apology, and I\'m not asking anyone to go after any of you. I would just like you to read this and answer one question.</p>' +
        '<p class="big">Is treating someone normally a bad thing just because they spoke against your friend?</p>' +
        '<p class="say">And if any number in my video is wrong, tell me which one. Anyway, I\'ve got a novel to write, so see you.</p><p class="say sign">Kaiser</p>' +
        '<p class="say"><button class="link" data-modal="before">Before you say it</button></p>';
    }
  };

  function detailHTML(it) {
    var h = head(it);
    if (SPECIAL[it.kind]) return h + SPECIAL[it.kind]();
    if (it.kind === "room") {
      h += it.intro ? '<p class="say">' + esc(it.intro) + "</p>" : "";
      h += '<div class="room">' + it.sides.map(function (s) {
        return '<div class="side"><h4>' + esc(s.h) + "</h4>" + s.imgs.map(media).join("") + "</div>";
      }).join("") + "</div>";
      if (it.after) h += '<p class="say">' + esc(it.after) + "</p>";
      return h + proofs(it.proof);
    }
    if (it.kind === "single") return h + proofs(it.imgs) + '<p class="say">' + esc(it.after) + "</p>";
    if (it.kind === "gallery") {
      return h + '<p class="say">' + esc(it.intro) + '</p><div class="gallery">' + it.cards.map(function (c) {
        return "<figure>" + media(c[0]) + "<figcaption>" + esc(c[1]) + "</figcaption></figure>";
      }).join("") + "</div>";
    }
    (it.body || []).forEach(function (b) { h += '<p class="say">' + esc(b) + "</p>"; });
    if (it.stands) h += '<p class="stands"><b>Still stands.</b> ' + esc(it.stands) + "</p>";
    return h + proofs(it.proof);
  }

  function pager() {
    var last = sel === flat.length - 1, i = ORDER.indexOf(room);
    var label, go;
    if (!last) { label = "Next point"; }
    else if (i < ORDER.length - 1) { label = "Next room: " + ({ wrong: "Completely wrong", missed: "Completely missed", eight: "The 8sty special" })[ORDER[i + 1]]; go = ORDER[i + 1]; }
    else { label = "Back to the hangout"; go = "welcome"; }
    return '<div class="pager"><button class="next"' + (go ? ' data-go="' + go + '"' : ' data-next="1"') + ">" + esc(label) + " <span>→</span></button></div>";
  }

  function select(i, focus) {
    var items = $$(".item");
    var inline = mobile.matches;
    if (inline && sel === i) { // tap again to close
      var open = $(".inline"); if (open) open.remove();
      items[i].classList.remove("on"); items[i].setAttribute("aria-expanded", "false"); sel = -1; return;
    }
    $$(".inline").forEach(function (n) { n.remove(); });
    items.forEach(function (b) { b.classList.remove("on"); b.setAttribute("aria-expanded", "false"); });
    sel = i;
    items[i].classList.add("on"); items[i].setAttribute("aria-expanded", "true");
    var html = '<div class="pane">' + detailHTML(flat[i]) + pager() + "</div>";
    if (inline) {
      var d = document.createElement("div"); d.className = "inline"; d.innerHTML = html;
      items[i].insertAdjacentElement("afterend", d);
      window.scrollTo({ top: items[i].getBoundingClientRect().top + scrollY - 66, behavior: "auto" });
    } else {
      $("#detail").innerHTML = html; $("#detail").scrollTop = 0;
      var r = items[i].getBoundingClientRect(), s = $("#side").getBoundingClientRect();
      if (r.top < s.top + 8 || r.bottom > s.bottom - 8) items[i].scrollIntoView({ block: "center" });
    }
  }

  function openRoom(id) {
    room = id; var R = window.ROOMS[id]; flat = []; sel = -1;
    var h = '<div class="sidehead"><h1>' + esc(R.title) + "</h1><p>" + esc(R.intro) + "</p></div>";
    R.groups.forEach(function (g) {
      h += '<p class="gname">' + esc(g.name) + "</p>";
      g.items.forEach(function (it) {
        var n = flat.length; flat.push(it);
        h += '<button class="item" data-i="' + n + '" aria-expanded="false"><span class="dot ' + it.cls + '"></span><span class="txt"><small>' + esc(it.who) + "</small>" + esc(it.q) + "</span></button>";
      });
    });
    $("#side").innerHTML = h; $("#side").scrollTop = 0; $("#detail").innerHTML = "";
    if (!mobile.matches) select(0);
  }

  function go(id) {
    if (id !== "welcome" && !window.ROOMS[id]) id = "welcome";
    document.body.dataset.room = id;
    var w = id === "welcome";
    $("#welcome").hidden = !w; $("#roomview").hidden = w; $("#bar").hidden = w;
    $$("#tabs button").forEach(function (b) { b.classList.toggle("on", b.dataset.go === id); });
    if (!w) openRoom(id);
    window.scrollTo(0, 0);
  }
  function nav(id) { if (location.hash.slice(1) === id) go(id); else location.hash = id; }

  var MODAL = {
    story: function () {
      return '<h2 class="mh">How we got here</h2><p class="say">Times are on my clock, so they\'ll look different on yours.</p><ol class="story">' +
        window.STORY.map(function (s) { return "<li><time>" + esc(s[0]) + '</time><p class="say">' + esc(s[1]) + "</p>" + proofs(s[2]) + "</li>"; }).join("") + "</ol>";
    },
    before: function () {
      return '<h2 class="mh">Before you say it</h2>' +
        '<p class="say">Yes, this was your private chat. I told one of you that myself. Yes, I asked two of you for screenshots of my own messages and said it was for my journal, and in the chat, when someone joked about a leak, I said it wouldn\'t happen, about Azrian. Then I rejoined from the invite and I read what I read, so now you\'re seeing it.</p>' +
        '<p class="say">Here\'s what I kept out: the invite link, anything that wasn\'t about me or my video, and the name of the 13-year-old. If you think sharing this was wrong, that\'s fair. Put it in room one with the others.</p>' +
        '<p class="say note2">Screenshots are from my own screen recordings of Discord on November 5, 2026. Where Discord groups several messages under one name, I added the name in plain white above the crop so you can tell who said it. One handle is covered with a grey bar. Video clips are from 8sty\'s own uploads, used for commentary.</p>';
    }
  };
  function modal(id) { $("#modalbody").innerHTML = MODAL[id](); $("#modal").hidden = false; $(".sheet").scrollTop = 0; document.body.classList.add("locked"); }
  function closeModal() { $("#modal").hidden = true; document.body.classList.remove("locked"); }
  function lightbox(s) { $("#lb img").src = s; $("#lb").hidden = false; }

  // Very wide screenshots in the agree gallery get the whole row, so they stay readable.
  document.addEventListener("load", function (e) {
    if (e.target.tagName === "IMG" && e.target.closest(".gallery figure") && e.target.naturalWidth > 900) e.target.closest("figure").classList.add("wide");
  }, true);
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("#lb")) { $("#lb").hidden = true; return; }
    if (t.tagName === "IMG") { lightbox(t.src); return; }
    var m = t.closest("[data-modal]"); if (m) { modal(m.dataset.modal); return; }
    if (t.closest(".close") || t.id === "modal") { closeModal(); return; }
    var g = t.closest("[data-go]"); if (g) { closeModal(); nav(g.dataset.go); return; }
    if (t.closest("[data-next]")) { select(sel + 1); return; }
    var it = t.closest(".item"); if (it) select(+it.dataset.i);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { $("#lb").hidden = true; closeModal(); return; }
    if (!$("#modal").hidden || !$("#lb").hidden) return;
    if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") nav(ORDER[+e.key - 1]);
    if (!room || $("#roomview").hidden || mobile.matches || /^(VIDEO)$/.test(e.target.tagName)) return;
    if (e.key === "ArrowDown" && sel < flat.length - 1) { e.preventDefault(); select(sel + 1); }
    if (e.key === "ArrowUp" && sel > 0) { e.preventDefault(); select(sel - 1); }
  });
  window.addEventListener("hashchange", function () { go(location.hash.slice(1) || "welcome"); });
  mobile.addEventListener("change", function () { if (room && !$("#roomview").hidden) openRoom(room); });
  go(location.hash.slice(1) || "welcome");
})();
