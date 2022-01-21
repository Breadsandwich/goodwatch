'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Shows', [
      {name: 'John Doe', description: 'some text', overallRating: 5.00, genre: 'example fantasy', createdAt: new Date(), updatedAt: new Date() },
      {name: 'euphoria', description: 'An American adaptation of the Israeli show of the same name, "Euphoria" follows the troubled life of 17-year-old Rue, a drug addict fresh from rehab with no plans to stay clean. Circling in Rues orbit are Jules, a transgender girl searching for where she belongs; Nate, a jock whose anger issues mask sexual insecurities; Chris, a football star who finds the adjustment from high school to college harder than expected; Cassie, whose sexual history continues to dog her.',overallRating: 4.20,watchStatus: '', genre: 'Drama', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Riverdale', description: 'Archie Andrews starts the school year with the world weighing on his shoulders. Hes decided he wants to pursue a future in the music business, but his recently ended clandestine relationship with the music teacher has left him without a mentor, and his friendship with Jughead Jones is in a bad place. Things look like they might be turning around when Veronica Lodge, a new girl, arrives. Despite the instant chemistry, Veronica is hesitant to risk a friendship with Betty.', overallRating: 3.35 ,watchStatus: '', genre: 'Drama', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Succession', description: 'Although he has no plans to step aside as the head of Waystar Royco, the international media conglomerate controlled by his family, aging patriarch Logan Roy is contemplating what the future holds. He has lingered in the limelight longer than even he thought he would, and now family members want to run the company as they see fit. Despite a best-laid succession plan, tempers flare over Logans intentions. Kendall Roy.', overallRating:4.40 ,watchStatus: '', genre: 'Drama', createdAt: new Date(), updatedAt: new Date()},
      {name: 'The Resident', description: 'Conrad Hawkins is one of Chastain Park Memorial Hospitals best doctors. Charming and arrogant, Conrad likes to take an unconventional approach whenever possible and believes its his personal duty to shatter the romantic illusions of the first-year residents. Dr. Devon Pravesh is an innocent idealist who leans on his finely tuned moral compass, but with Conrads help, he begins to realize that the practice of medicine is a business.', overallRating: 3.85, genre: 'Drama',watchStatus: '', createdAt: new Date(), updatedAt: new Date()},
      {name: 'New Amsterdam', description: 'Dr. Max Goodwin is brilliant, charming -- and the new medical director at Americas oldest public hospital. While hes set on tearing down the bureaucracy to provide exceptional care, the doctors and staff are not so sure. Theyve heard this before, and no one else has delivered on those promises. Not taking no for an answer, Max disrupts the status quo and proves he will stop at nothing to breathe new life into this understaffed.', overallRating: 4.00,watchStatus: '', genre: 'Drama', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Game of Thrones', description: 'George R.R. Martins best-selling book series "A Song of Ice and Fire" is brought to the screen as HBO sinks its considerable storytelling teeth into the medieval fantasy epic. Its the depiction of two powerful families -- kings and queens, knights and renegades, liars and honest men -- playing a deadly game for control of the Seven Kingdoms of Westeros, and to sit atop the Iron Throne.', overallRating: 4.6,watchStatus: '', genre: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Stranger Things', description: 'In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.', overallRating: 4.35,watchStatus: '', genre: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Star Trek: The Next Generation', description: 'Featuring a bigger and better USS Enterprise, this series is set 78 years after the original series -- in the 24th century. Instead of Capt. James Kirk, a less volatile and more mature Capt. Jean-Luc Picard heads the crew of various humans and alien creatures in their adventures in space -- the final frontier.', overallRating: 4.30,watchStatus: '', genre: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Outlander', description: 'After serving as a British Army nurse in World War II, Claire Randall is enjoying a second honeymoon in Scotland with husband Frank, an MI6 officer looking forward to a new career as an Oxford historian. Suddenly, Claire is transported to 1743 and into a mysterious world where her freedom and life are threatened. To survive.', overallRating: 4.2,watchStatus: '', genre: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'The 100', description: 'When nuclear Armageddon destroys civilization on Earth, the only survivors are those on the 12 international space stations in orbit at the time. Three generations later, the 4,000 survivors living on a space ark of linked stations see their resources dwindle and face draconian measures established to ensure humanitys future.', overallRating: 3.60, watchStatus: '',genre: 'Sci-Fi', createdAt: new Date(), updatedAt: new Date()},
      {name: 'Masterchef', description: 'Amateur chefs compete in a series of cooking challenges overseen by a panel of accomplished chefs. Each week they have to survive elimination and become a culinary master, earning the title of MasterChef.', overallRating: 3.50, genre: 'Food', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Hell\'s Kitchen', description: 'In the US, chefs compete against one another. Gordon Ramsay hosts the intense cooking competition where the winner will be given the chance to be a head chef, but first must prove themselves.', overallRating: 3.50, genre: 'Food', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Chef\'s Table', description: 'Some of the most renowned chefs in the world share their deeply personal stories, inspirations, and unique styles. Each chef\'s discipline and culinary talent is explored while he or she prepares an awe-inspiring creation.', overallRating: 4.20, genre: 'Food', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Anthony Bourdain: No Reservations', description: 'Bad-boy chef and best-selling author Anthony Bourdain hits both familiar culinary hotspots and out-of-the-way gems in his global quest for the ultimate dining experience. Along the way, Bourdain offers his perspective on both the food and the local customs he comes across in his travels..', overallRating: 4.40, genre: 'Food', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Good Eats', description: 'Equal parts smart and sardonic, creator and host Alton Brown uses a combination of classroom methods and wacky comedy sketches to explain not just how to whip up an excellent dish, but also why the ingredients interact as they do when you put them all together. Brown has said that the show\'s inspiration is to combine Julia Child, Mr. Wizard and "Monty Python."', overallRating: 4.40, genre: 'Food', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Die Hard', description:'Die Hard follows New York City police detective John McClane (Willis) who is caught up in a terrorist takeover of a Los Angeles skyscraper while visiting his estranged wife. Reginald VelJohnson, William Atherton, Paul Gleason, and Hart Bochner feature in supporting roles.', overallRating: 4.40, genre: 'Action', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Predator', description: 'It stars Arnold Schwarzenegger as the leader of an elite paramilitary rescue team on a mission to save hostages in guerrilla-held territory in a Central American rainforest, who encounter the deadly Predator (Kevin Peter Hall), a technologically advanced alien who stalks and hunts them down.', overallRating: 3.2, genre:'Action', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Nobody',description: 'Hutch Mansell fails to defend himself or his family when two thieves break into his suburban home one night. The aftermath of the incident soon strikes a match to his long-simmering rage. In a barrage of fists, gunfire and squealing tires, Hutch must now save his wife and son from a dangerous adversary -- and ensure that he will never be underestimated again.', overallRating: 4.50, genre: 'Action', createdAt: new Date(), updatedAt: new Date() },
      {name: 'Baby Driver', description: 'After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail. Baby is a young and partially hearing impaired getaway driver who can make any wild move while in motion with the right track playing.', overallRating: 4.20, genre: 'Action', createdAt: new Date(), updatedAt: new Date() },

      {name: 'Taken', description: 'A retired CIA agent travels across Europe and relies on his old skills to save his estranged daughter, who has been kidnapped while on a trip to Paris. Seventeen year-old Kim is the pride and joy of her father Bryan Mills.', overallRating: 3.50 , genre: 'Action', createdAt: new Date(), updatedAt: new Date()},




  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Shows', null, {});
  }
};
