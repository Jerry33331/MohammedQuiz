// Central question bank for Mohammed Quiz - Movie Themed
// Each question: { id, category, question, choices[4], answerIndex, explanation }

const QUESTIONS = [
  // Action Movies Quiz (10 questions)
  {
    id: 1,
    category: "Action Movies",
    question: "Which actor plays John McClane in the Die Hard series?",
    choices: ["Arnold Schwarzenegger", "Bruce Willis", "Sylvester Stallone", "Harrison Ford"],
    answerIndex: 1,
    explanation: "Bruce Willis famously played John McClane in all five Die Hard films."
  },
  {
    id: 2,
    category: "Action Movies",
    question: "What is the name of the iconic car in the Back to the Future trilogy?",
    choices: ["DeLorean DMC-12", "Ford Mustang", "Chevrolet Camaro", "Pontiac Firebird"],
    answerIndex: 0,
    explanation: "The DeLorean DMC-12 was modified into a time machine in the Back to the Future films."
  },
  {
    id: 3,
    category: "Action Movies",
    question: "Which Marvel superhero says 'I am Iron Man'?",
    choices: ["Captain America", "Thor", "Tony Stark", "Hulk"],
    answerIndex: 2,
    explanation: "Tony Stark, played by Robert Downey Jr., is Iron Man and first says this line in the 2008 film."
  },
  {
    id: 4,
    category: "Action Movies",
    question: "What is the highest-grossing action movie of all time (unadjusted for inflation)?",
    choices: ["Avatar", "Avengers: Endgame", "Titanic", "The Dark Knight"],
    answerIndex: 1,
    explanation: "Avengers: Endgame (2019) earned over $2.79 billion worldwide, making it the highest-grossing action film."
  },
  {
    id: 5,
    category: "Action Movies",
    question: "In The Matrix, what color pill does Neo take?",
    choices: ["Red", "Blue", "Green", "White"],
    answerIndex: 0,
    explanation: "Neo takes the red pill, which reveals the truth about the Matrix."
  },
  {
    id: 6,
    category: "Action Movies",
    question: "Which actor played the role of Jason Bourne in the Bourne series?",
    choices: ["Matt Damon", "Brad Pitt", "Tom Cruise", "Liam Neeson"],
    answerIndex: 0,
    explanation: "Matt Damon portrayed Jason Bourne in five films from 2002 to 2016."
  },
  {
    id: 7,
    category: "Action Movies",
    question: "What is the name of the villain in the first James Bond film, Dr. No?",
    choices: ["Ernst Stavro Blofeld", "Dr. Julius No", "Auric Goldfinger", "Rosa Klebb"],
    answerIndex: 1,
    explanation: "Dr. Julius No is the main antagonist in the 1962 film Dr. No."
  },
  {
    id: 8,
    category: "Action Movies",
    question: "Which 1980s action film features the line 'I'll be back'?",
    choices: ["Die Hard", "Predator", "The Terminator", "Commando"],
    answerIndex: 2,
    explanation: "Arnold Schwarzenegger's character, the Terminator, says this iconic line in the 1984 film."
  },
  {
    id: 9,
    category: "Action Movies",
    question: "What is the name of the fictional African country in Black Panther?",
    choices: ["Wakanda", "Genovia", "Latveria", "Zamunda"],
    answerIndex: 0,
    explanation: "Wakanda is the technologically advanced African nation ruled by the Black Panther."
  },
  {
    id: 10,
    category: "Action Movies",
    question: "Which action star was a former bodybuilder before becoming an actor?",
    choices: ["Bruce Willis", "Arnold Schwarzenegger", "Keanu Reeves", "Tom Cruise"],
    answerIndex: 1,
    explanation: "Arnold Schwarzenegger was a professional bodybuilder and Mr. Olympia before his acting career."
  },

  // Comedy Movies Quiz (10 questions)
  {
    id: 11,
    category: "Comedy Movies",
    question: "Which comedy features the line 'You can't handle the truth!'?",
    choices: ["Airplane!", "A Few Good Men", "The Hangover", "Dumb and Dumber"],
    answerIndex: 1,
    explanation: "While A Few Good Men is a legal drama, Jack Nicholson's character delivers this famous line."
  },
  {
    id: 12,
    category: "Comedy Movies",
    question: "In Airplane!, what does the doctor say is wrong with the passengers?",
    choices: ["They're sick", "They're all going to die", "There's a sale at Sears", "They need coffee"],
    answerIndex: 2,
    explanation: "The running gag in Airplane! is that there's always a sale at Sears."
  },
  {
    id: 13,
    category: "Comedy Movies",
    question: "Which actor plays the character of Lloyd Christmas in Dumb and Dumber?",
    choices: ["Jim Carrey", "Jeff Daniels", "Ben Stiller", "Owen Wilson"],
    answerIndex: 0,
    explanation: "Jim Carrey plays Lloyd Christmas, while Jeff Daniels plays Harry Dunne."
  },
  {
    id: 14,
    category: "Comedy Movies",
    question: "What is the name of the fictional news organization in Anchorman?",
    choices: ["KVWN Channel 4", "WJM News", "KVWN News Team", "San Diego News"],
    answerIndex: 0,
    explanation: "KVWN Channel 4 is the fictional San Diego news station where Ron Burgundy works."
  },
  {
    id: 15,
    category: "Comedy Movies",
    question: "Which comedy film features a character named Brick Tamland?",
    choices: ["Anchorman", "Step Brothers", "Talladega Nights", "The Other Guys"],
    answerIndex: 0,
    explanation: "Brick Tamland, played by Steve Carell, is the lovable but dim-witted weatherman in Anchorman."
  },
  {
    id: 16,
    category: "Comedy Movies",
    question: "In The Hangover, what animal is missing from Mike Tyson's house?",
    choices: ["A tiger", "A lion", "A bear", "A monkey"],
    answerIndex: 0,
    explanation: "The group discovers Mike Tyson's pet tiger is missing from his house."
  },
  {
    id: 17,
    category: "Comedy Movies",
    question: "Which comedy features Will Ferrell as a character who believes he's an elf?",
    choices: ["Elf", "Anchorman", "Step Brothers", "Talladega Nights"],
    answerIndex: 0,
    explanation: "Will Ferrell plays Buddy, a human raised as an elf, in the 2003 film Elf."
  },
  {
    id: 18,
    category: "Comedy Movies",
    question: "What is the name of the fictional high school in Mean Girls?",
    choices: ["North Shore High", "Rydell High", "Hill Valley High", "Shermer High"],
    answerIndex: 0,
    explanation: "North Shore High School is the setting for the 2004 comedy Mean Girls."
  },
  {
    id: 19,
    category: "Comedy Movies",
    question: "Which actor plays the character of Ron Burgundy?",
    choices: ["Will Ferrell", "Steve Carell", "Paul Rudd", "David Koechner"],
    answerIndex: 0,
    explanation: "Will Ferrell plays the anchorman Ron Burgundy in Anchorman: The Legend of Ron Burgundy."
  },
  {
    id: 20,
    category: "Comedy Movies",
    question: "In Superbad, what is the name of the police officer played by Seth Rogen?",
    choices: ["Officer Michaels", "Officer McLovin", "Officer Hill", "Officer Rogan"],
    answerIndex: 1,
    explanation: "Officer McLovin is the fake name used by Fogell (Christopher Mintz-Plasse) in Superbad."
  },

  // Sci-Fi Movies Quiz (10 questions)
  {
    id: 21,
    category: "Sci-Fi Movies",
    question: "Which sci-fi franchise features the phrase 'May the Force be with you'?",
    choices: ["Star Trek", "Star Wars", "Dune", "The Matrix"],
    answerIndex: 1,
    explanation: "'May the Force be with you' is a famous quote from the Star Wars franchise."
  },
  {
    id: 22,
    category: "Sci-Fi Movies",
    question: "What is the name of the spaceship in the Star Trek series?",
    choices: ["USS Enterprise", "Millennium Falcon", "Death Star", "Nostromo"],
    answerIndex: 0,
    explanation: "The USS Enterprise is the primary starship in the Star Trek franchise."
  },
  {
    id: 23,
    category: "Sci-Fi Movies",
    question: "In The Matrix, what is the color of the pill Neo takes to discover the truth?",
    choices: ["Red", "Blue", "Green", "Yellow"],
    answerIndex: 0,
    explanation: "Neo takes the red pill to discover the truth about the Matrix."
  },
  {
    id: 24,
    category: "Sci-Fi Movies",
    question: "Which director is known for films like Inception and Interstellar?",
    choices: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Ridley Scott"],
    answerIndex: 1,
    explanation: "Christopher Nolan directed both Inception (2010) and Interstellar (2014)."
  },
  {
    id: 25,
    category: "Sci-Fi Movies",
    question: "What is the name of the artificial intelligence in 2001: A Space Odyssey?",
    choices: ["HAL 9000", "Skynet", "The Matrix", "JARVIS"],
    answerIndex: 0,
    explanation: "HAL 9000 is the sentient computer that controls the Discovery One spacecraft."
  },
  {
    id: 26,
    category: "Sci-Fi Movies",
    question: "In which sci-fi film does a character say 'I'll be back'?",
    choices: ["The Terminator", "Predator", "Alien", "Blade Runner"],
    answerIndex: 0,
    explanation: "Arnold Schwarzenegger's Terminator character says this iconic line in the 1984 film."
  },
  {
    id: 27,
    category: "Sci-Fi Movies",
    question: "What is the name of the planet where Luke Skywalker grows up?",
    choices: ["Tatooine", "Alderaan", "Coruscant", "Dagobah"],
    answerIndex: 0,
    explanation: "Luke Skywalker grows up on the desert planet Tatooine with his aunt and uncle."
  },
  {
    id: 28,
    category: "Sci-Fi Movies",
    question: "Which sci-fi film features the line 'E.T. phone home'?",
    choices: ["E.T. the Extra-Terrestrial", "Close Encounters of the Third Kind", "The Thing", "Men in Black"],
    answerIndex: 0,
    explanation: "This famous line is from the 1982 Steven Spielberg film E.T. the Extra-Terrestrial."
  },
  {
    id: 29,
    category: "Sci-Fi Movies",
    question: "What is the primary setting of the film Blade Runner?",
    choices: ["Los Angeles 2019", "New York 2100", "Tokyo 2050", "London 2049"],
    answerIndex: 0,
    explanation: "Blade Runner is set in a dystopian Los Angeles in the year 2019."
  },
  {
    id: 30,
    category: "Sci-Fi Movies",
    question: "Which actor plays the character of Neo in The Matrix?",
    choices: ["Tom Cruise", "Keanu Reeves", "Brad Pitt", "Johnny Depp"],
    answerIndex: 1,
    explanation: "Keanu Reeves plays Thomas Anderson, also known as Neo, in The Matrix trilogy."
  },

  // Horror Movies Quiz (10 questions)
  {
    id: 31,
    category: "Horror Movies",
    question: "Which horror film features the character Freddy Krueger?",
    choices: ["Halloween", "Friday the 13th", "A Nightmare on Elm Street", "Scream"],
    answerIndex: 2,
    explanation: "Freddy Krueger is the primary antagonist in A Nightmare on Elm Street and its sequels."
  },
  {
    id: 32,
    category: "Horror Movies",
    question: "In which horror film does a character say 'Here's Johnny!'?",
    choices: ["The Shining", "Psycho", "The Exorcist", "Halloween"],
    answerIndex: 0,
    explanation: "Jack Nicholson's character, Jack Torrance, says this line in The Shining (1980)."
  },
  {
    id: 33,
    category: "Horror Movies",
    question: "What is the name of the masked killer in the Scream series?",
    choices: ["Ghostface", "Michael Myers", "Jason Voorhees", "Leatherface"],
    answerIndex: 0,
    explanation: "Ghostface is the masked killer in the Scream franchise."
  },
  {
    id: 34,
    category: "Horror Movies",
    question: "Which horror film is based on Stephen King's novel about a haunted hotel?",
    choices: ["The Exorcist", "The Shining", "It", "Pet Sematary"],
    answerIndex: 1,
    explanation: "The Shining is based on Stephen King's 1977 novel of the same name."
  },
  {
    id: 35,
    category: "Horror Movies",
    question: "In Halloween, what is the name of the main antagonist?",
    choices: ["Michael Myers", "Jason Voorhees", "Freddy Krueger", "Leatherface"],
    answerIndex: 0,
    explanation: "Michael Myers is the masked killer in the Halloween franchise."
  },
  {
    id: 36,
    category: "Horror Movies",
    question: "Which horror film features the line 'They're heeeere'?",
    choices: ["Poltergeist", "The Amityville Horror", "Paranormal Activity", "The Conjuring"],
    answerIndex: 0,
    explanation: "This famous line is from the 1982 film Poltergeist."
  },
  {
    id: 37,
    category: "Horror Movies",
    question: "What is the name of the demon in The Exorcist?",
    choices: ["Pazuzu", "Legion", "Valak", "Asmodeus"],
    answerIndex: 0,
    explanation: "Pazuzu is the demon that possesses Regan MacNeil in The Exorcist."
  },
  {
    id: 38,
    category: "Horror Movies",
    question: "Which horror film features a group of camp counselors being stalked by a killer?",
    choices: ["Friday the 13th", "Halloween", "A Nightmare on Elm Street", "Scream"],
    answerIndex: 0,
    explanation: "Friday the 13th features Jason Voorhees stalking camp counselors at Camp Crystal Lake."
  },
  {
    id: 39,
    category: "Horror Movies",
    question: "In which horror film does a character get killed in the opening scene by a phone call?",
    choices: ["Scream", "When a Stranger Calls", "The Ring", "Urban Legend"],
    answerIndex: 0,
    explanation: "Scream opens with the iconic scene of Drew Barrymore's character being killed by a phone call from Ghostface."
  },
  {
    id: 40,
    category: "Horror Movies",
    question: "Which director is known for films like Get Out and Us?",
    choices: ["Jordan Peele", "James Wan", "Ari Aster", "M. Night Shyamalan"],
    answerIndex: 0,
    explanation: "Jordan Peele directed both Get Out (2017) and Us (2019)."
  },

  // Classic Movies Quiz (10 questions)
  {
    id: 41,
    category: "Classic Movies",
    question: "Which classic film features the line 'Frankly, my dear, I don't give a damn'?",
    choices: ["Casablanca", "Gone with the Wind", "The Wizard of Oz", "Citizen Kane"],
    answerIndex: 1,
    explanation: "Rhett Butler says this famous line to Scarlett O'Hara in Gone with the Wind (1939)."
  },
  {
    id: 42,
    category: "Classic Movies",
    question: "In which classic film does a character say 'There's no place like home'?",
    choices: ["The Wizard of Oz", "Gone with the Wind", "Casablanca", "It's a Wonderful Life"],
    answerIndex: 0,
    explanation: "Dorothy Gale says this line at the end of The Wizard of Oz (1939)."
  },
  {
    id: 43,
    category: "Classic Movies",
    question: "Which classic film won the first Academy Award for Best Picture?",
    choices: ["The Jazz Singer", "Wings", "All Quiet on the Western Front", "Cimarron"],
    answerIndex: 1,
    explanation: "Wings (1927) won the first Academy Award for Best Picture at the 1st Academy Awards."
  },
  {
    id: 44,
    category: "Classic Movies",
    question: "Who directed the classic film Citizen Kane?",
    choices: ["Alfred Hitchcock", "Orson Welles", "John Ford", "Frank Capra"],
    answerIndex: 1,
    explanation: "Orson Welles directed, co-wrote, produced, and starred in Citizen Kane (1941)."
  },
  {
    id: 45,
    category: "Classic Movies",
    question: "Which classic film features the character Atticus Finch?",
    choices: ["To Kill a Mockingbird", "12 Angry Men", "The Grapes of Wrath", "Of Mice and Men"],
    answerIndex: 0,
    explanation: "Atticus Finch is the main character in To Kill a Mockingbird (1962), played by Gregory Peck."
  },
  {
    id: 46,
    category: "Classic Movies",
    question: "In which classic film does a character say 'Play it, Sam. Play As Time Goes By'?",
    choices: ["Casablanca", "Gone with the Wind", "The African Queen", "Notorious"],
    answerIndex: 0,
    explanation: "Ilsa Lund says this line to Sam in Casablanca (1942)."
  },
  {
    id: 47,
    category: "Classic Movies",
    question: "Which classic film features the song 'Over the Rainbow'?",
    choices: ["The Sound of Music", "The Wizard of Oz", "Singin' in the Rain", "Mary Poppins"],
    answerIndex: 1,
    explanation: "'Over the Rainbow' is sung by Judy Garland as Dorothy in The Wizard of Oz (1939)."
  },
  {
    id: 48,
    category: "Classic Movies",
    question: "Who starred as Charlie Chaplin's character in The Tramp?",
    choices: ["Buster Keaton", "Charlie Chaplin", "Harold Lloyd", "Laurel and Hardy"],
    answerIndex: 1,
    explanation: "Charlie Chaplin created and played The Tramp character in many of his films."
  },
  {
    id: 49,
    category: "Classic Movies",
    question: "Which classic film is about a man who discovers what life would be like if he had never been born?",
    choices: ["It's a Wonderful Life", "Miracle on 34th Street", "The Philadelphia Story", "Mr. Smith Goes to Washington"],
    answerIndex: 0,
    explanation: "It's a Wonderful Life (1946) tells the story of George Bailey and his guardian angel."
  },
  {
    id: 50,
    category: "Classic Movies",
    question: "Which director is known for classic films like Psycho and Vertigo?",
    choices: ["Alfred Hitchcock", "Orson Welles", "John Ford", "Billy Wilder"],
    answerIndex: 0,
    explanation: "Alfred Hitchcock directed both Psycho (1960) and Vertigo (1958), among many other classics."
  }
];

module.exports = QUESTIONS;
