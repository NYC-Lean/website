/* ============================================================
   NYC Lean: events (single source of truth).
   The home page shows the next 3 upcoming events; the calendar
   page shows all upcoming, with past events listed below.
   Anything with a future date shows under "Upcoming"; once a
   date passes it moves to "Past" automatically.

   EDIT ME: add the next meetup at the top of the list:
     {
       date: "2026-06-07",   // YYYY-MM-DD (required)
       time: "2:00 PM",       // free text, "" if unknown
       location: "Mori",      // free text, "" if none / private
       locationUrl: "...",    // optional; makes the location a clickable map link
       title: "Weekend meetup",
       description: "..."     // optional, shown on the calendar page
     }
   For a talk, add a `talk` object instead of (or alongside) description
   to get a structured title / speaker / abstract template:
     {
       date: "2026-06-14",
       time: "2:00 PM",
       location: "The Pearl House",
       locationUrl: "...",
       title: "Weekend meetup",
       talk: {
         title: "...",        // talk title
         titleUrl: "...",     // optional; links the talk title (e.g. a blog post)
         speaker: "...",      // presenter's name
         speakerUrl: "...",   // optional; links the speaker's name
         abstract: "..."      // talk abstract
       }
     }
   Order does not matter; entries are sorted by date.

   History below was compiled from the NYC thread on the Lean Zulip.
   ============================================================ */
window.NYC_LEAN_EVENTS = [

  /* ---- upcoming ---- (add the next meetup here) */
  { date: "2026-06-28", time: "2:00 PM", location: "Tower 49", locationUrl: "https://www.google.com/maps/search/?api=1&query=Tower+49%2C+12+E+49th+St%2C+New+York%2C+NY", title: "Weekend meetup",
    talk: {
      title: "Numina Fuse",
      speaker: "Justin Asher",
      speakerUrl: "https://justinasher.me",
      abstract: "Numina Fuse is an autoformalization platform that enables users to interactively work with AI on their Lean projects. I will be going over the development and applications of Fuse."
    } },

  { date: "2026-06-21", time: "2:00 PM", location: "Tower 49", locationUrl: "https://www.google.com/maps/search/?api=1&query=Tower+49%2C+12+E+49th+St%2C+New+York%2C+NY", title: "Weekend meetup", description: "Open discussion, short lightning talks on what you're working on, and a hands-on session to close out. Bring a laptop." },

  { date: "2026-06-14", time: "2:00 PM", location: "The Pearl House", locationUrl: "https://maps.app.goo.gl/sVi6u4CqRtn2MrWDA", title: "Weekend meetup",
    talk: {
      title: "SampCert: Verified Differential Privacy in Lean",
      speaker: "Markus de Medeiros",
      speakerUrl: "https://www.markusde.ca",
      abstract: "Differential privacy is a suite of techniques for defining when, and how, a statistical program protects the privacy of its participants. Unfortunately, the history of differential privacy is mired with subtle implementation errors causing enormous privacy bugs. In this talk, I will go over the techniques we used to implement and verify differentially private programs in Lean."
    } },

  { date: "2026-06-07", time: "2:00 PM", location: "Tower 49", locationUrl: "https://www.google.com/maps/search/?api=1&query=Tower+49%2C+12+E+49th+St%2C+New+York%2C+NY", title: "Weekend meetup",
    talk: {
      title: "Formalizing the Gelfand-Naimark-Segal Construction in Lean",
      titleUrl: "/blog/formalizing-the-gns-construction",
      speaker: "Gregory Wickham",
      speakerUrl: "http://gregorywickham.com/",
      abstract: "The GNS construction builds a Hilbert space and a *-homomorphism from a C*-algebra into the bounded operators on that space, an essential step in the proof of the Gelfand-Naimark theorem. The formalization has been merged into Mathlib."
    } },

  { date: "2026-05-31", time: "3:00 PM", location: "The Pearl House", locationUrl: "https://maps.app.goo.gl/sVi6u4CqRtn2MrWDA", title: "Weekend meetup", description: "Open discussion, short lightning talks on who you are and what you're working on, planning for the month ahead and the group's future, and a hands-on session to close out. Bring a laptop." },

  /* ---- past ---- */
  { date: "2026-04-25", time: "12:00 PM", location: "Brooklyn Public Library, Cadman Plaza", title: "Textbook companion planning", description: "Scoped the Lean/Verso textbook companion, settling on Axler's Linear Algebra Done Right." },
  { date: "2026-04-19", time: "2:30 PM", location: "Mori", title: "Weekend meetup", description: "Discussed a community Lean companion to Evan Chen's Infinitely Large Napkin." },
  { date: "2026-04-12", time: "2:00 PM", location: "Stavros Niarchos Foundation Library", title: "Library meetup", description: "Work on a post about the beth numbers." },
  { date: "2026-04-05", time: "3:00 PM", location: "", title: "Weekend meetup", description: "Worked on rpylean and strict positivity of inductive types." },
  { date: "2026-03-01", time: "1:00 PM", location: "", title: "Weekend meetup", description: "Worked on rpylean." },
  { date: "2026-02-22", time: "2:00 PM", location: "", title: "Snow-day meetup", description: "" },
  { date: "2026-02-01", time: "1:30 PM", location: "Mori", title: "Weekend meetup", description: "" },
  { date: "2026-01-18", time: "2:00 PM", location: "", title: "Weekend meetup", description: "Discussed PrimeNumberTheoremAnd." },
  { date: "2026-01-10", time: "1:00 PM", location: "", title: "Weekend meetup", description: "Worked on PrimeNumberTheoremAnd." },
  { date: "2026-01-03", time: "3:00 PM", location: "Mori", title: "Weekend meetup", description: "" },
  { date: "2025-12-20", time: "1:00 PM", location: "Mori", title: "Weekend meetup", description: "Discussed finitely generated abelian groups." },
  { date: "2025-12-06", time: "3:00 PM", location: "Mori", title: "Weekend meetup", description: "" },
  { date: "2025-11-22", time: "5:00 PM", location: "Mori", title: "Weekend meetup", description: "" },
  { date: "2025-11-15", time: "", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-11-08", time: "11:00 AM", location: "Mori", title: "Weekend meetup", description: "Discussed L'Hôpital and FormalBook." },
  { date: "2025-11-02", time: "3:00 PM", location: "Mori", title: "Weekend meetup", description: "" },
  { date: "2025-10-25", time: "3:00 PM", location: "Mori", title: "Weekend meetup", description: "Looked at a Mathlib PR and the Rupert-shape problem." },
  { date: "2025-10-04", time: "1:00 PM", location: "Mori", title: "Weekend meetup", description: "" },
  { date: "2025-09-27", time: "", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-09-20", time: "", location: "", title: "Weekend meetup", description: "Shared a spectral-theorem formalization." },
  { date: "2025-09-07", time: "1:30 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-08-30", time: "1:30 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-08-16", time: "3:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-07-19", time: "2:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-07-13", time: "2:30 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-06-28", time: "2:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-06-14", time: "", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-06-07", time: "", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-05-25", time: "12:00 PM", location: "Union Square", title: "Weekend meetup", description: "Lean hacking at the Taiwan Festival." },
  { date: "2025-05-18", time: "1:30 PM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2025-05-03", time: "1:00 PM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2025-04-26", time: "", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-04-12", time: "1:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2025-04-05", time: "1:30 PM", location: "", title: "Weekend meetup", description: "Worked on rpylean." },
  { date: "2025-03-29", time: "1:15 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-03-22", time: "1:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-03-16", time: "5:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-03-01", time: "3:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-02-22", time: "1:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-02-08", time: "1:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-02-01", time: "1:00 PM", location: "", title: "Weekend meetup", description: "" },
  { date: "2025-01-25", time: "12:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "Worked on PrimeNumberTheoremAnd." },
  { date: "2025-01-18", time: "1:30 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "Finished a polynomial-span proof." },
  { date: "2025-01-11", time: "1:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2025-01-04", time: "1:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-12-29", time: "", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-12-07", time: "12:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-11-30", time: "3:15 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-11-23", time: "1:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-11-17", time: "3:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "Dispatched the last sorry on Carleson 5.2.9." },
  { date: "2024-11-09", time: "1:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-10-27", time: "1:00 PM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-10-20", time: "1:00 PM", location: "Madison Square Park", title: "Weekend meetup", description: "Discussed ImProver." },
  { date: "2024-10-12", time: "12:00 PM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2024-10-05", time: "1:00 PM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2024-09-29", time: "11:30 AM", location: "Stumptown Coffee (29th St)", title: "Weekend meetup", description: "Worked on a generating-functions formalization." },
  { date: "2024-09-22", time: "12:30 PM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2024-09-15", time: "1:00 PM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2024-09-08", time: "11:00 AM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "" },
  { date: "2024-08-31", time: "11:00 AM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2024-08-24", time: "11:00 AM", location: "Madison Square Park", title: "Weekend meetup", description: "" },
  { date: "2024-08-17", time: "11:00 AM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "Worked on generatingfunctionology." },
  { date: "2024-07-21", time: "11:15 AM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "Worked on Carleson lemma 5.2.9." },
  { date: "2024-07-13", time: "11:00 AM", location: "Stumptown Coffee, Ace Hotel", title: "Weekend meetup", description: "Figured out Carleson lemma 5.1.1." },
  { date: "2024-06-09", time: "1:00 PM", location: "Chelsea Market", title: "Weekend meetup", description: "" },
  { date: "2024-05-26", time: "1:00 PM", location: "Chelsea Market", title: "Weekend meetup", description: "Worked through Lean tutorial puzzles." },
  { date: "2024-05-05", time: "6:00 PM", location: "Veselka, East Village", title: "The first NYC Lean meetup", description: "The group's first in-person gathering." }
];
